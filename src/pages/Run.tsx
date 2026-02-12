import { MobileLayout } from "@/components/layout/MobileLayout";
import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Target, ChevronDown, CheckSquare, ListTodo, MapPin, Signal, Play, Pause, Square, Scan } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

type RunState = "mode-select" | "ready" | "running" | "paused";

const modes = [
  { id: "individual", name: "Individuel", image: "/images/individual-avatar.png" },
  { id: "team", name: "Équipe", image: "/images/team-avatar.png" },
];

const dailyQuests = [
  { id: 1, title: "Conquérant", description: "Capturer 2 tuiles.", progress: 100, completed: true },
  { id: 2, title: "Endurance", description: "Vitesse stable 5 min.", progress: 50, completed: false },
  { id: 3, title: "Exploration", description: "Courir dans une zone inconnue.", progress: 30, completed: false },
];

const communityChallenges = [
  { id: 1, title: "Esprit d'équipe", description: "Courir 50km en cumulé avec son clan.", participants: 1240 },
  { id: 2, title: "Winter Ark", description: "Maintenir une série de 7 jours.", participants: 850 },
];

export default function Run() {
  const navigate = useNavigate();
  const [runState, setRunState] = useState<RunState>("mode-select");
  const [selectedMode, setSelectedMode] = useState("individual");
  const [showQuests, setShowQuests] = useState(false);
  const [activeQuestTab, setActiveQuestTab] = useState<"quests" | "challenges">("quests");
  const [isScanning, setIsScanning] = useState(false);

  const [stats, setStats] = useState({ pace: "0'00\"", time: "00:00", distance: 0 });
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const waveIndividual =
    "M0,210L120,220C240,230,480,250,720,250C960,250,1200,230,1320,220L1440,210L1440,320L0,320Z";

  const waveTeam =
    "M0,200L160,210C320,220,560,240,800,240C1040,240,1240,220,1360,210L1440,200L1440,320L0,320Z";

  // Timer logic
  useEffect(() => {
    if (isScanning) {
      const timer = setTimeout(() => setIsScanning(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isScanning]);

  useEffect(() => {
    if (runState === "running") {
      timerRef.current = setInterval(() => {
        setElapsedSeconds((s) => {
          const newS = s + 1;
          const mins = Math.floor(newS / 60);
          const secs = newS % 60;
          const dist = newS * 0.003; // ~10.8 km/h simulated
          const paceTotal = dist > 0 ? newS / 60 / dist : 0;
          const pMins = Math.floor(paceTotal);
          const pSecs = Math.round((paceTotal - pMins) * 60);
          setStats({
            time: `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`,
            distance: dist,
            pace: `${pMins}'${String(pSecs).padStart(2, "0")}"`,
          });
          return newS;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [runState]);

  if (runState === "mode-select") {
    return (
      <MobileLayout hideNav>

        <div className="min-h-screen bg-gradient-to-b from-[#fff] to-[#e9ee9d] to-white p-6 animate-fade-in flex flex-col relative overflow-hidden">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center mb-8 self-start"
          >
            <ArrowLeft className="w-6 h-6 text-foreground" strokeWidth={2.5} />
          </button>

          {/* Title */}
          <h1 className="font-display text-3xl text-center mb-16 leading-tight tracking-tight">
            CHOISISSEZ VOTRE
            <br />
            MODE DE JEU
          </h1>

          {/* Mode carousel - centered with space for both bubbles */}
          <div className="flex-1 flex items-center justify-center mb-8">
            <div className="relative w-full max-w-md h-64">
              {modes.map((mode, index) => {
                const isActive = selectedMode === mode.id;

                // Calculate position: active centered, inactive offset to sides
                const leftPosition = isActive
                  ? "50%"
                  : index === 0
                    ? "20%"
                    : "80%";

                return (
                  <button
                    key={mode.id}
                    onClick={() => setSelectedMode(mode.id)}
                    className="absolute top-1/2 transition-all duration-500 ease-in-out"
                    style={{
                      left: leftPosition,
                      transform: `translate(-50%, -50%) scale(${isActive ? 1 : 0.7})`,
                      opacity: isActive ? 1 : 0.5,
                      zIndex: isActive ? 10 : 1,
                    }}
                  >
                    {/* Avatar circle */}
                    <div
                      className={cn(
                        "w-40 h-40 rounded-full flex items-center justify-center overflow-hidden transition-all duration-500",
                        isActive
                          ? "bg-white border-[6px] border-[#C4D600] shadow-2xl"
                          : "bg-white/60 border-4 border-[#C4D600]/40"
                      )}
                    >
                      <img
                        src={mode.image}
                        alt={mode.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Mode name - only show for active */}
                    {isActive && (
                      <div className="text-center">
                        <span className="font-display text-2xl font-bold">{mode.name}</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom section */}
          <div className="space-y-6 pb-8 z-10">
            {/* Set objective button */}
            <button className="w-full max-w-xs mx-auto flex items-center justify-center gap-2 border-2 border-foreground rounded-full px-6 py-3 bg-white">
              <Target className="w-5 h-5" />
              <span className="text-base font-semibold">Fixer un objectif</span>
            </button>

            {/* Start button */}
            <button
              onClick={() => setRunState("ready")}
              className="terrun-btn w-full max-w-xs mx-auto block text-lg font-bold py-4"
            >
              COMMENCER MAINTENANT
            </button>
          </div>
          <svg
            key={selectedMode}
            className="absolute top-0 left-0 w-full h-screen z-0"
            viewBox="0 0 1140 320"
            preserveAspectRatio="none"
          >
            <path fill="#FFFFFF">
              <animate
                attributeName="d"
                dur="0.6s"
                calcMode="spline"
                keySplines="0.4 0 0.2 1"
                keyTimes="0;1"
                fill="freeze"
                values={
                  selectedMode === "individual"
                    ? `${waveTeam};${waveIndividual}`
                    : `${waveIndividual};${waveTeam}`
                }
              />
            </path>
          </svg>




        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout hideNav>
      <div className="min-h-screen relative">
        {/* Map placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-muted via-background to-muted">
          <div className="absolute inset-0 opacity-30">
            {/* Grid pattern to simulate map */}
            <div className="grid grid-cols-8 grid-rows-12 h-full">
              {Array.from({ length: 96 }).map((_, i) => (
                <div key={i} className="border border-muted-foreground/10" />
              ))}
            </div>
          </div>

          {/* Territory zones */}
          <div className="absolute top-20 left-4 w-24 h-32 bg-terrun-purple/40 rounded-lg" />
          <div className="absolute top-40 right-8 w-32 h-24 bg-terrun-teal/40 rounded-lg" />

          {/* User position */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-8 h-8 bg-primary rounded-full shadow-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-foreground rounded-full" />
              </div>
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-primary" />
            </div>
          </div>
        </div>

        {/* Radar Animation Overlay */}
        {isScanning && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0 overflow-hidden">
            <div className="w-full h-full absolute animate-pulse bg-terrun-lime/5" />
            <div className="w-[500px] h-[500px] rounded-full border-2 border-terrun-lime/30 animate-ping absolute" />
            <div className="w-[300px] h-[300px] rounded-full border border-terrun-lime/50 animate-ping absolute delay-100" />
            <Scan className="w-12 h-12 text-terrun-lime animate-spin-slow opacity-50 absolute" />
          </div>
        )}

        {/* Top controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <button
            onClick={() => setRunState("mode-select")}
            className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center shadow-sm"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>

        {/* Quest/Challenge buttons */}
        <div className="absolute top-20 left-4 flex flex-col gap-3">
          <button
            onClick={() => {
              setShowQuests(true);
              setActiveQuestTab("quests");
            }}
            className="w-10 h-10 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg"
          >
            <CheckSquare className="w-5 h-5 text-[#D7FF00]" />
          </button>
          <button
            onClick={() => {
              setShowQuests(true);
              setActiveQuestTab("challenges");
            }}
            className="w-10 h-10 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg"
          >
            <ListTodo className="w-5 h-5 text-[#D7FF00]" />
          </button>
        </div>

        {/* Stats panel */}
        <div className="absolute bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm rounded-t-3xl pt-6 pb-8 px-6 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
          <p className="text-center text-primary font-light mb-6 tracking-[0.2em] text-[10px] uppercase">PRÊT À CONQUÉRIR</p>

          <div className="grid grid-cols-3 gap-4 text-center mb-6">
            <div>
              <p className="stat-value">{stats.pace}</p>
              <p className="stat-label">Allure moy.</p>
            </div>
            <div>
              <p className="stat-value">{stats.time}</p>
              <p className="stat-label">Temps</p>
            </div>
            <div>
              <p className="stat-value">{stats.distance.toFixed(2)}</p>
              <p className="stat-label">Distance (km)</p>
            </div>
          </div>

          {/* Action bar */}
          <div className="bg-black/80 backdrop-blur-md rounded-full px-6 py-3 flex items-center justify-between shadow-2xl relative">
            <button
              onClick={() => setIsScanning(true)}
              className="flex flex-col items-center justify-center w-16 h-full gap-1 active:scale-95 transition-transform"
            >
              <span className="text-[#D7FF00] opacity-70">
                <Scan className="w-5 h-5" />
              </span>
              <span className="text-[9px] text-white/70 font-medium text-center leading-tight tracking-widest">
                RADAR
              </span>
            </button>

            {runState === "ready" && (
              <button
                onClick={() => setRunState("running")}
                className="w-16 h-16 rounded-full bg-[#D7FF00] flex items-center justify-center -mt-8 shadow-[0_0_20px_rgba(215,255,0,0.4)] border-4 border-background transition-transform active:scale-95"
              >
                <Play className="w-7 h-7 text-black fill-current ml-1" />
              </button>
            )}

            {runState === "running" && (
              <button
                onClick={() => setRunState("paused")}
                className="w-16 h-16 rounded-full bg-[#D7FF00] flex items-center justify-center -mt-8 shadow-[0_0_20px_rgba(215,255,0,0.4)] border-4 border-background transition-transform active:scale-95"
              >
                <Pause className="w-7 h-7 text-black fill-current" />
              </button>
            )}

            {runState === "paused" && (
              <div className="flex gap-4 -mt-4 justify-center w-full absolute left-0 right-0 top-0 pointer-events-none animate-in fade-in zoom-in duration-300">
                <button
                  onClick={() => setRunState("running")}
                  className="w-14 h-14 rounded-full bg-[#D7FF00] flex items-center justify-center shadow-lg border-4 border-background pointer-events-auto transition-transform active:scale-95"
                >
                  <Play className="w-6 h-6 text-black fill-current ml-1" />
                </button>
                <button
                  onClick={() => navigate("/run/summary", { state: { distance: stats.distance, time: stats.time, pace: stats.pace, durationSeconds: elapsedSeconds } })}
                  className="w-14 h-14 rounded-full bg-black/70 backdrop-blur-md flex items-center justify-center shadow-lg border border-[#D7FF00]/30 pointer-events-auto transition-all hover:bg-black/80 active:scale-95 group"
                >
                  <Square className="w-5 h-5 text-[#D7FF00] fill-current opacity-90 group-hover:opacity-100" />
                </button>
              </div>
            )}

            <button className="flex flex-col items-center justify-center w-16 h-full gap-1">
              <span className="text-[#D7FF00]">
                <Target className="w-5 h-5" />
              </span>
              <span className="text-[9px] text-white/80 font-medium text-center leading-tight">
                CIBLER<br />UNE ZONE
              </span>
            </button>
          </div>
        </div>

        {/* Quests panel */}
        {showQuests && (
          <div className="absolute inset-0 bg-black/95 text-white z-50 animate-slide-up">
            <div className="p-4">
              <button
                onClick={() => setShowQuests(false)}
                className="mb-4"
              >
                <ChevronDown className="w-6 h-6" />
              </button>

              <h2 className="font-display text-2xl mb-4 uppercase">
                {activeQuestTab === "quests" ? "QUÊTES DU JOUR" : "DÉFIS COMMUNAUTAIRES"}
              </h2>

              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setActiveQuestTab("quests")}
                  className={cn(
                    "flex-1 py-3 rounded-full flex items-center justify-center gap-2 transition-all font-display text-sm",
                    activeQuestTab === "quests"
                      ? "bg-[#D7FF00] text-black"
                      : "bg-muted text-foreground"
                  )}
                >
                  <CheckSquare className="w-4 h-4" />
                  QUÊTES
                </button>
                <button
                  onClick={() => setActiveQuestTab("challenges")}
                  className={cn(
                    "flex-1 py-3 rounded-full flex items-center justify-center gap-2 transition-all font-display text-sm",
                    activeQuestTab === "challenges"
                      ? "bg-[#D7FF00] text-black"
                      : "bg-muted text-foreground"
                  )}
                >
                  <ListTodo className="w-4 h-4" />
                  DÉFIS
                </button>
              </div>

              <div className="space-y-3">
                {activeQuestTab === "quests" ? (
                  dailyQuests.map((quest) => (
                    <div key={quest.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm mb-1">{quest.title}</h3>
                          <p className="text-xs text-stone-400">
                            {quest.description}
                          </p>
                        </div>
                        <div
                          className={cn(
                            "w-5 h-5 rounded flex items-center justify-center ml-3",
                            quest.completed
                              ? "bg-[#D7FF00] text-black"
                              : "border border-white/20"
                          )}
                        >
                          {quest.completed && <span className="text-xs font-bold">✓</span>}
                        </div>
                      </div>
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#D7FF00]"
                          style={{ width: `${quest.progress}%` }}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  communityChallenges.map((challenge) => (
                    <div key={challenge.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <h3 className="font-semibold text-sm mb-1">{challenge.title}</h3>
                      <p className="text-xs text-stone-400 mb-3">{challenge.description}</p>
                      <div className="flex items-center gap-2 text-xs font-medium text-[#D7FF00]">
                        <span>●</span>
                        <span className="text-stone-300">{challenge.participants} participants</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </MobileLayout>
  );
}

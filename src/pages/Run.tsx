import { MobileLayout } from "@/components/layout/MobileLayout";
import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Target, ChevronDown, CheckSquare, ListTodo, MapPin, Signal, Play, Pause, Square } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

type RunState = "mode-select" | "ready" | "running" | "paused";

const modes = [
  { id: "individual", name: "Individuel", image: "/images/individual-avatar.png" },
  { id: "team", name: "Équipe", image: "/images/team-avatar.png" },
];

const dailyQuests = [
  { id: 1, title: "Daily 1 — Allure contrôlée", description: "Maintenir une allure régulière pendant 10 minutes.", progress: 100, completed: true },
  { id: 2, title: "Daily 2 — Petit défi de la journée", description: "Faire au moins 2 km aujourd'hui.", progress: 60, completed: false },
  { id: 3, title: "Daily 3 — Photo du jour", description: "Prendre une photo d'un lieu intéressant pendant ta course.", progress: 30, completed: false },
];

export default function Run() {
  const navigate = useNavigate();
  const [runState, setRunState] = useState<RunState>("mode-select");
  const [selectedMode, setSelectedMode] = useState("individual");
  const [showQuests, setShowQuests] = useState(false);
  const [activeQuestTab, setActiveQuestTab] = useState<"quests" | "challenges">("quests");
  
  const [stats, setStats] = useState({ pace: "0'00\"", time: "00:00", distance: 0 });
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const waveIndividual =
  "M0,210L120,220C240,230,480,250,720,250C960,250,1200,230,1320,220L1440,210L1440,320L0,320Z";

const waveTeam =
  "M0,200L160,210C320,220,560,240,800,240C1040,240,1240,220,1360,210L1440,200L1440,320L0,320Z";

  // Timer logic
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

        {/* Top controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <button
            onClick={() => setRunState("mode-select")}
            className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center"
          >
            <ChevronDown className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 bg-background rounded-full px-3 py-2 border border-border">
            <Signal className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">GPS</span>
            <span className="text-primary">✓</span>
          </div>
        </div>

        {/* Quest/Challenge buttons */}
        <div className="absolute top-20 left-4 flex flex-col gap-2">
          <button
            onClick={() => setShowQuests(true)}
            className="w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center"
          >
            <CheckSquare className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              setShowQuests(true);
              setActiveQuestTab("challenges");
            }}
            className="w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center"
          >
            <ListTodo className="w-5 h-5" />
          </button>
        </div>

        {/* Stats panel */}
        <div className="absolute bottom-0 left-0 right-0 bg-background rounded-t-3xl pt-4 pb-6 px-6 shadow-lg">
          <p className="text-center text-primary font-medium mb-4">Mode individuel</p>

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
          <div className="bg-foreground rounded-full p-2 flex items-center justify-between">
            <button className="flex flex-col items-center px-4 py-2">
              <span className="text-muted-foreground text-xl">🏃</span>
              <span className="text-[10px] text-muted-foreground">Individuel</span>
            </button>

            {runState === "ready" && (
              <button
                onClick={() => setRunState("running")}
                className="w-16 h-16 rounded-full bg-primary flex items-center justify-center -mt-6 shadow-lg"
              >
                <Play className="w-6 h-6 text-foreground fill-current ml-1" />
              </button>
            )}

            {runState === "running" && (
              <button
                onClick={() => setRunState("paused")}
                className="w-16 h-16 rounded-full bg-primary flex items-center justify-center -mt-6 shadow-lg"
              >
                <Pause className="w-6 h-6 text-foreground" />
              </button>
            )}

            {runState === "paused" && (
              <div className="flex gap-2 -mt-6">
                <button
                  onClick={() => setRunState("running")}
                  className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg"
                >
                  <Play className="w-5 h-5 text-foreground fill-current ml-0.5" />
                </button>
                <button
                  onClick={() => navigate("/run/summary", { state: { distance: stats.distance, time: stats.time, pace: stats.pace, durationSeconds: elapsedSeconds } })}
                  className="w-14 h-14 rounded-full bg-destructive flex items-center justify-center shadow-lg"
                >
                  <Square className="w-5 h-5 text-white fill-current" />
                </button>
              </div>
            )}

            <button className="flex flex-col items-center px-4 py-2">
              <span className="text-muted-foreground text-xl">📍</span>
              <span className="text-[10px] text-muted-foreground text-center leading-tight">
                Ajouter un
                <br />
                itinéraire
              </span>
            </button>
          </div>
        </div>

        {/* Quests panel */}
        {showQuests && (
          <div className="absolute inset-0 bg-background/95 z-50 animate-slide-up">
            <div className="p-4">
              <button
                onClick={() => setShowQuests(false)}
                className="mb-4"
              >
                <ChevronDown className="w-6 h-6" />
              </button>

              <h2 className="font-display text-2xl mb-4">QUÊTES DU JOUR</h2>

              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setActiveQuestTab("quests")}
                  className={cn(
                    "flex-1 py-3 rounded-full flex items-center justify-center gap-2 transition-all",
                    activeQuestTab === "quests"
                      ? "bg-foreground text-background"
                      : "bg-muted text-foreground"
                  )}
                >
                  <CheckSquare className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveQuestTab("challenges")}
                  className={cn(
                    "flex-1 py-3 rounded-full flex items-center justify-center gap-2 transition-all",
                    activeQuestTab === "challenges"
                      ? "bg-foreground text-background"
                      : "bg-muted text-foreground"
                  )}
                >
                  <ListTodo className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                {dailyQuests.map((quest) => (
                  <div key={quest.id} className="border-b border-border pb-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{quest.title}</h3>
                        <p className="text-xs text-muted-foreground">
                          {quest.description}
                        </p>
                      </div>
                      <div
                        className={cn(
                          "w-5 h-5 rounded border-2 flex items-center justify-center",
                          quest.completed
                            ? "bg-foreground border-foreground"
                            : "border-muted-foreground"
                        )}
                      >
                        {quest.completed && (
                          <span className="text-background text-xs">✓</span>
                        )}
                      </div>
                    </div>
                    <div className="terrun-progress">
                      <div
                        className="terrun-progress-bar"
                        style={{ width: `${quest.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </MobileLayout>
  );
}

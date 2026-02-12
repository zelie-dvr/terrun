import { MobileLayout } from "@/components/layout/MobileLayout";
import { Bell, Settings, Trophy, ChevronRight, ArrowLeft, Share2, Moon, Sun, Laptop } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme-provider";

type View = "main" | "solo" | "team";

const weekData = [
  { day: "L", value: 3000 },
  { day: "M", value: 5000 },
  { day: "M", value: 7000 },
  { day: "J", value: 10000, highlight: true },
  { day: "V", value: 6000 },
  { day: "S", value: 8000 },
  { day: "D", value: 4000 },
];

const places = [
  { name: "Tour Eiffel", location: "Paris", image: "🗼" },
  { name: "UFR Ingémédia", location: "Toulon", image: "🏫" },
  { name: "Monument aux morts de l'Armée d'Orient", location: "Marseille", image: "🏛️" },
  { name: "Pont des Marchands", location: "Narbonne", image: "🌉" },
];

const topTeams = [
  { name: "TERRUNNER83", members: 12, level: 114, color: "from-primary to-terrun-lime-light" },
  { name: "COUREURS2N8", members: 21, level: 110, color: "from-gray-300 to-gray-400" },
  { name: "URBANSTRIDES", members: 9, level: 93, color: "from-orange-300 to-orange-400" },
  { name: "RUNNNNNFORLIFE", members: 8, level: 92, color: "from-gray-400 to-gray-500" },
  { name: "ÇACOURTBIEN", members: 17, level: 80, color: "from-primary/60 to-primary" },
];

export default function Profile() {
  const { theme, setTheme } = useTheme();
  const [view, setView] = useState<View>("main");

  if (view === "solo") {
    return <SoloStats onBack={() => setView("main")} />;
  }

  if (view === "team") {
    return <TeamStats onBack={() => setView("main")} />;
  }

  const profile = {
    first_name: "Pierre",
    total_distance_km: 85, // Matches "Objectif du mois" progress
    total_runs: 42,
    total_time_seconds: 153000, // approx 42.5 hours
    monthly_goal_km: 100
  };

  return (
    <MobileLayout>
      <div className="p-4 animate-fade-in">
        {/* Avatar section */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-3">
            {/* Progress ring */}
            <svg className="w-28 h-28 -rotate-90">
              <circle
                cx="56"
                cy="56"
                r="50"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="6"
              />
              <circle
                cx="56"
                cy="56"
                r="50"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${0.89 * 314} 314`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-4xl">
                👩
              </div>
            </div>
            <span className="absolute top-0 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
              89%
            </span>
          </div>

          <h1 className="font-display text-2xl">Marie Dupont</h1>
          <p className="text-sm text-muted-foreground">Toulon, France</p>

          {/* Action buttons */}
          <div className="flex gap-4 mt-2">
            <button
              className="p-2"
              onClick={() => {
                const nextTheme = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
                setTheme(nextTheme);
              }}
            >
              {theme === "light" && <Sun className="w-5 h-5" />}
              {theme === "dark" && <Moon className="w-5 h-5" />}
              {theme === "system" && <Laptop className="w-5 h-5" />}
            </button>
            <button className="p-2">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats badges */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          <div className="terrun-badge">
            <span>ABONNÉS</span>
            <span className="font-bold">10</span>
          </div>
          <div className="terrun-badge">
            <span>NIV.</span>
            <span className="font-bold">6</span>
          </div>
        </div>


        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center">
            <img src="dist/images/icon_objectif.svg" className="w-6 h-6" alt="Target icon" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium mb-1">{Number(profile.total_distance_km).toFixed(0)}/{Number(profile.monthly_goal_km).toFixed(0)} KM</p>
            <div className="terrun-progress">
              <div className="terrun-progress-bar" style={{ width: `${Math.min(100, (Number(profile.total_distance_km) / Number(profile.monthly_goal_km)) * 100)}%` }} />
            </div>
          </div>
        </div>
        <div className="terrun-badge2 mb-3 mt-2">
          <span>DISTANCE ACCUMULÉE</span>
          <span className="font-display text-lg">132 KM</span>
        </div>


        {/* Progress section */}
        <div className="terrun-card">
          <h2 className="font-display text-xl mb-4">PROGRÈS</h2>

          {/* Jauge XP Niveau actuel */}
          <div className="terrun-badge justify-between w-full mb-3 relative overflow-hidden">
            {/* Jauge verte en arrière-plan à 70% par exemple */}
            <div className="absolute inset-0 w-[70%] bg-gradient-to-r from-[#fcfcfc] to-[#C6D300] rounded-full"></div>

            {/* Contenu par-dessus la jauge */}
            <div className="relative z-10 flex items-center gap-2">
              <span>NIVEAU 6</span>
            </div>
            <span className="relative z-10 font-display text-lg">700/1000 XP</span>
          </div>

          <button
            onClick={() => setView("solo")}
            className="w-full flex items-center justify-between p-3 mb-2 hover:bg-muted rounded-xl transition-colors"
          >
            <div className="flex items-center gap-2">
              <span>
                <img
                  src="dist/images/icon-solo.svg"
                  alt="Carte interactive"
                  className="block ml-1 w-4 object-cover"
                />
              </span>
              <span className="font-display text-lg">INDIVIDUEL</span>
            </div>
            <div className="flex items-center gap-3">
              <ChevronRight className="w-5 h-5" />
            </div>
          </button>

          <button
            onClick={() => setView("team")}
            className="w-full flex items-center justify-between p-3 hover:bg-muted rounded-xl transition-colors"
          >
            <div className="flex items-center gap-2">
              <span>
                <img
                  src="dist/images/icon-team.svg"
                  alt="Carte interactive"
                  className="block w-5 object-cover"
                />
              </span>
              <span className="font-display text-lg">ÉQUIPE</span>
            </div>
            <div className="flex items-center gap-3">
              <ChevronRight className="w-5 h-5" />
            </div>
          </button>
        </div>


      </div>
    </MobileLayout>
  );
}

function SoloStats({ onBack }: { onBack: () => void }) {
  const maxValue = Math.max(...weekData.map((d) => d.value));

  return (
    <MobileLayout>
      <div className="p-4 animate-fade-in">
        <div className="terrun-card mb-4">
          <div className="flex items-center justify-between mb-4">
            <button onClick={onBack} className="flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-display text-xl">SOLO</span>
            </button>
            <button className="p-2">
              <span className="text-xl">📊</span>
            </button>
          </div>

          <p className="text-sm text-muted-foreground mb-6">
            Tu es beaucoup plus investi que la semaine dernière. Continue sur
            cette lancée.
          </p>

          {/* Bar chart */}
          <div className="bg-muted rounded-xl p-4">
            <div className="flex items-end justify-between h-40 mb-2">
              {weekData.map((day, i) => (
                <div key={i} className="flex flex-col items-center gap-1 flex-1">
                  <div
                    className={cn(
                      "w-6 rounded-t transition-all",
                      day.highlight ? "bg-primary" : "bg-foreground"
                    )}
                    style={{ height: `${(day.value / maxValue) * 100}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              {weekData.map((day, i) => (
                <span key={i} className="flex-1 text-center">
                  {day.day}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Improvement indicator */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center">
            <span className="font-display text-2xl">📈</span>
          </div>
          <div>
            <p className="font-display text-4xl">+88%</p>
            <p className="text-sm text-muted-foreground">
              Les chiffres parlent d'eux-mêmes.
            </p>
          </div>
        </div>

        {/* Average pace */}
        <div className="terrun-card mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-display text-lg">ALLURE MOYENNE</h3>
            <span className="text-xl">⏱️</span>
          </div>
          <p className="text-xs text-muted-foreground mb-2">
            Données de votre dernière courses.
          </p>
          <p className="font-display text-5xl mb-3">5:27/KM</p>
          <button className="flex items-center gap-2 text-sm font-medium ml-auto">
            PARTAGER
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Titles */}
        <div className="terrun-card">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-display text-lg">TITRES</h3>
            <Trophy className="w-5 h-5" />
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Le meilleur de vos victoires, ici.
          </p>
          <div className="flex gap-2 mb-3">
            <div className="w-12 h-12 rounded-full bg-terrun-gold flex items-center justify-center text-xl">
              🏆
            </div>
            <div className="w-12 h-12 rounded-full bg-terrun-bronze flex items-center justify-center text-xl">
              🏆
            </div>
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-xl">
              🏆
            </div>
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-xl">
              🏆
            </div>
          </div>
          <button className="flex items-center gap-2 text-sm font-medium ml-auto">
            PARTAGER
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </MobileLayout>
  );
}

function TeamStats({ onBack }: { onBack: () => void }) {
  return (
    <MobileLayout>
      <div className="p-4 animate-fade-in">
        <div className="terrun-card mb-4">
          <div className="flex items-center justify-between mb-6">
            <button onClick={onBack} className="flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-display text-xl">TEAM</span>
            </button>
            <button className="p-2">
              <span className="text-xl">📊</span>
            </button>
          </div>

          {/* Team stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-muted rounded-xl p-4">
              <span className="text-3xl mb-2 block">⏱️</span>
              <p className="font-display text-3xl">10KM/H</p>
            </div>
            <div className="bg-muted rounded-xl p-4">
              <span className="text-3xl mb-2 block">👟</span>
              <p className="font-display text-3xl">140KM</p>
            </div>
          </div>
        </div>

        {/* Notable places */}
        <div className="terrun-card mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-display text-lg">LIEUX INSOLITES</h3>
            <span className="text-xl">🏔️</span>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            Données du dernier groupe.
          </p>

          <div className="space-y-3 mb-3">
            {places.map((place, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg">
                  {place.image}
                </div>
                <div>
                  <p className="font-medium text-sm">{place.name}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <span>📍</span> {place.location}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button className="flex items-center gap-2 text-sm font-medium ml-auto">
            PARTAGER
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Top teams */}
        <div className="terrun-card">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-display text-lg">CLASSEMENT TOP #5</h3>
            <Trophy className="w-5 h-5" />
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            Ensemble, plus forts.
          </p>

          <div className="space-y-2">
            {topTeams.map((team, i) => (
              <div
                key={i}
                className={cn(
                  "rounded-xl p-3 bg-gradient-to-r",
                  team.color
                )}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-display text-sm">{team.name}</p>
                    <p className="text-xs opacity-70 flex items-center gap-1">
                      <span>👥</span> {team.members}
                    </p>
                  </div>
                  <p className="font-display">NIV. {team.level}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}

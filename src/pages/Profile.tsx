import { MobileLayout } from "@/components/layout/MobileLayout";
import { Bell, Settings, Trophy, ChevronRight, ArrowLeft, Share2, Award, Gift, History, TrendingUp, Activity, MapPin, Compass, Zap, Users, BarChart3 } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Route, Map, Calendar } from "lucide-react";

type View = "main" | "solo" | "team";

const stats = [
  { icon: Route, label: "Total km parcourus", value: "132 km" },
  { icon: TrendingUp, label: "Meilleure allure", value: "4:32/km" },
  { icon: Map, label: "Territoires conquis", value: "87" },
  { icon: Trophy, label: "Meilleure position saison", value: "#8" },
]

const seasonHistory = [
  { season: "Saison 4 (actuelle)", rank: "#24", xp: "8,450 RUNITS", active: true },
  { season: "Saison 3", rank: "#12", xp: "14,200 RUNITS", active: false },
  { season: "Saison 2", rank: "#31", xp: "9,800 RUNITS", active: false },
  { season: "Saison 1", rank: "#8", xp: "16,500 RUNITS", active: false },
]

// const records = [
 // { label: "Plus de km en un mois^", value: "42 km" },
  // { label: "Plus de tuiles en un jour", value: "14" },
//  { label: "Plus longue serie de jours", value: "12 jours" },
 // { label: "Meilleure allure", value: "4:32/km" },
// ]

const badges = [
  { name: "Premier pas", icon: <Award />, unlocked: true },
  { name: "Marathonien", icon: <Activity />, unlocked: true },
  { name: "Endurant", icon: <Calendar />, unlocked: true },
  { name: "Éclaireur", icon: <Compass />, unlocked: true },
  { name: "Sprinteur", icon: <Zap />, unlocked: false },
  { name: "Territory Master", icon: <MapPin />, unlocked: false },
]

const rewards = [
  { name: "Avatar Premium Saison 3", claimed: true },
  { name: "Badge Or - Top 15", claimed: true },
  { name: "Titre: Sprinter d'Elite", claimed: false },
]

const monthContribution = {
  points: "370",
  tiles: "37",
  internalRank: "#3 / 12",
};

const teamPerformance = [
  { month: "Novembre", points: "370", tiles: "37", rank: "#3" },
  { month: "Octobre", points: "560", tiles: "56", rank: "#5" },
  { month: "Septembre", points: "326", tiles: "31", rank: "#2" },
  { month: "Aout", points: "768", tiles: "65", rank: "#4" },
];


export default function Profile() {
  const [view, setView] = useState<View>("main");

  if (view === "solo") {
    return <SoloStats onBack={() => setView("main")} />;
  }

  if (view === "team") {
    return <TeamTab onBack={() => setView("main")} />;
  }

  const profile = {
    first_name: "Victoire",
    total_distance_km: 12, // Matches "Objectif du mois" progress
    total_runs: 42,
    total_time_seconds: 153000, // approx 42.5 hours
    monthly_goal_km: 50
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
              <img 
                src="dist/images/individual-avatar.png" 
                alt="Profile" 
                className="w-26 h-26 object-cover rounded-full" 
              />
              </div>
            </div>
            <span className="absolute top-0 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
              89%
            </span>
          </div>

          <h1 className="font-display text-2xl">Victoire Dubust</h1>
          <p className="text-sm text-muted-foreground">Toulon, France</p>

          {/* Action buttons */}
          <div className="flex gap-4 mt-2">
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

        {/* Stats permanentes */}
        <section aria-label="Statistiques permanentes" className="mt-6 mb-5">
          <h2 className="font-display text-xl mb-4">
            STATS PERMANENTES
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-4"
              >
                <stat.icon className="h-5 w-5 text-accent" />
                <span className="text-xl font-black text-foreground">
                  {stat.value}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </section>


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
  useEffect(() => {
    // Quand le composant est monté, on scroll en haut
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [showAllSeasons, setShowAllSeasons] = useState(false);
  const displayedSeasons = showAllSeasons ? seasonHistory : seasonHistory.slice(0, 2);
  
  return (
    
    <MobileLayout>
      <div className="p-4 animate-fade-in flex flex-col gap-4">

        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <button onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-display text-xl">INDIVIDUEL</span>
          </button>
        </div>

        {/* Historique des saisons */}
        <section>
          <div className="mb-3 flex items-center gap-2">
            <History className="h-4 w-4 text-accent" />
            <h2 className="text-sm font-medium uppercase tracking-wide">
              Historique des saisons
            </h2>
          </div>

          <div className="flex flex-col gap-2">
            {displayedSeasons.map((s) => (
              <div
                key={s.season}
                className={cn(
                  "flex items-center justify-between rounded-xl border p-3",
                  s.active
                    ? "border-accent/40 bg-accent/5"
                    : "border-border bg-card"
                )}
              >
                <div>
                  <span className="text-sm font-semibold">{s.season}</span>
                  {s.active && (
                    <span className="ml-2 text-[10px] font-bold text-[#9AA800]">
                      EN COURS
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold">{s.rank}</span>
                  <span className="ml-2 text-xs text-muted-foreground">{s.xp}</span>
                </div>
              </div>
            ))}
          </div>

          {seasonHistory.length > 2 && (
          <div className="flex justify-end mt-2">
            <button
              onClick={() => setShowAllSeasons(!showAllSeasons)}
              className="text-xs text-gray-500 font-medium hover:text-[#000]"
            >
              {showAllSeasons ? "Voir moins" : "Voir plus"}
            </button>
          </div>
        )}
        </section>

        {/* Records
        <section>
          <div className="mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-accent" />
            <h2 className="text-sm font-medium uppercase tracking-wide">
              Records personnels
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {records.map((r) => (
              <div
                key={r.label}
                className="rounded-xl border border-border bg-card p-3"
              >
                <span className="text-lg font-black">{r.value}</span>
                <span className="mt-1 block text-[10px] text-muted-foreground">
                  {r.label}
                </span>
              </div>
            ))}
          </div>
        </section>*/}

        {/* Badges */}
        <section>
          <div className="mb-3 flex items-center gap-2">
            <Award className="h-4 w-4 text-accent" />
            <h2 className="text-sm font-medium uppercase tracking-wide">
              Trophées obtenus
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {badges.map((b) => (
              <div
                key={b.name}
                className={cn(
                  "flex flex-col items-center gap-1.5 rounded-xl border p-3",
                  b.unlocked
                    ? "border-accent/70 bg-card"
                    : "border-border bg-secondary opacity-30"
                )}
              >
                <span className="text-2xl">{b.icon}</span>
                <span className="text-center text-[10px] font-semibold">
                  {b.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Récompenses */}
        <section>
          <div className="mb-3 flex items-center gap-2">
            <Gift className="h-4 w-4 text-accent" />
            <h2 className="text-sm font-medium uppercase tracking-wide">
              Récompenses
            </h2>
          </div>

          <div className="flex flex-col gap-2">
            {rewards.map((r) => (
              <div
                key={r.name}
                className="flex items-center justify-between rounded-xl border border-border bg-card p-3"
              >
                <span className="text-sm font-semibold">{r.name}</span>
                {r.claimed ? (
                  <span className="rounded-full bg-accent/20 px-2.5 py-0.5 text-[10px] font-bold">
                    Obtenu
                  </span>
                ) : (
                  <button className="rounded-full bg-accent px-3 py-1 text-[10px] font-bold text-accent-foreground">
                    Réclamer
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </MobileLayout>
  )
}

function TeamTab({ onBack }: { onBack: () => void }) {
  useEffect(() => {
    // Quand le composant est monté, on scroll en haut
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <MobileLayout>
    <div className="flex flex-col gap-6 p-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
          <button onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-display text-xl">TEAM</span>
          </button>
        </div>

      {/* Team header */}
      <div className="rounded-2xl border border-accent/30 bg-accent/5 p-4">
        <div className="mb-2 flex items-center gap-2">
          <Users className="h-5 w-5 text-accent-foreground" />
          <h2 className="text-sm font-medium uppercase tracking-wide text-foreground">
            Contribution ce mois-ci
          </h2>
        </div>
        <p className="mb-4 text-xs text-muted-foreground">Equipe : IngeMedia</p>
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center gap-1 rounded-xl bg-card p-3">
            <Zap className="h-4 w-4 text-accent" />
            <span className="text-lg font-black text-foreground">{monthContribution.points}</span>
            <span className="text-[9px] font-medium uppercase text-muted-foreground">RUNITS</span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-xl bg-card p-3">
            <Map className="h-4 w-4 text-accent" />
            <span className="text-lg font-black text-foreground">{monthContribution.tiles}</span>
            <span className="text-[9px] font-medium uppercase text-muted-foreground">kilomètres</span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-xl bg-card p-3">
            <BarChart3 className="h-4 w-4 text-accent" />
            <span className="text-lg font-black text-foreground">{monthContribution.internalRank}</span>
            <span className="text-[9px] font-medium uppercase text-muted-foreground">Rang interne</span>
          </div>
        </div>
      </div>

      {/* Team stats summary */}
      <section aria-label="Statistiques equipe">
        <div className="mb-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-accent" />
          <h2 className="text-sm font-medium uppercase tracking-wide text-foreground">Statistiques équipe</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1 rounded-xl border border-border bg-card p-4">
            <span className="text-2xl font-black text-foreground">1 690</span>
            <span className="text-[10px] font-medium text-muted-foreground">RUNITS total équipe</span>
          </div>
          <div className="flex flex-col gap-1 rounded-xl border border-border bg-card p-4">
            <span className="text-2xl font-black text-foreground">169</span>
            <span className="text-[10px] font-medium text-muted-foreground">KM total équipe</span>
          </div>
        </div>
      </section>

      {/* Performance history */}
      <section aria-label="Historique des performances en team">
        <div className="mb-3 flex items-center gap-2">
          <History className="h-4 w-4 text-accent" />
          <h2 className="text-sm font-medium uppercase tracking-wide text-foreground">Historique performances</h2>
        </div>
        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary">
                <th className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Mois</th>
                <th className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">RUNITS</th>
                <th className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">KM</th>
                <th className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Rang</th>
              </tr>
            </thead>
            <tbody>
              {teamPerformance.map((perf, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-semibold text-foreground">{perf.month}</td>
                  <td className="px-4 py-3 text-muted-foreground">{perf.points}</td>
                  <td className="px-4 py-3 text-muted-foreground">{perf.tiles}</td>
                  <td className="px-4 py-3 font-bold text-foreground">{perf.rank}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Team internal ranking */}
      <section aria-label="Classement interne equipe">
        <div className="mb-3 flex items-center gap-2">
          <Trophy className="h-4 w-4 text-accent" />
          <h2 className="text-sm font-medium uppercase tracking-wide text-foreground">
            Classement Interne
          </h2>
        </div>

        <div className="space-y-3">
        {[
          { name: "Alex_Runner83", points: 530, rank: 1, avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=Alexandrzz",  icon: MapPin },
          { name: "SarahDesign", points: 420, rank: 2, avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=Alex", icon: MapPin },
          { name: "Victoire", points: 370, rank: 12, avatar:"dist/images/individual-avatar.png", icon: MapPin },
          { name: "Tom-Dev", points: 220, rank: 3, avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah", icon: MapPin },
          { name: "HectorCo", points: 150, rank: 4, avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=Alexjrjkikok", icon: MapPin },
        ]
          // Afficher d’abord les 4 premiers puis la Victoire
          .sort((a, b) => (a.rank <= 4 && b.rank <= 4 ? a.rank - b.rank : a.rank === 12 ? 1 : b.rank === 12 ? -1 : a.rank - b.rank))
          .map((contributor) => (
            <div
              key={contributor.rank}
              className={cn(
                "flex items-center justify-between p-3 bg-card rounded-xl border border-border shadow-sm relative overflow-hidden group",
                contributor.rank === 12 ? "bg-[#C4D600]/10 border-[#C4D600]" : ""
              )}
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#C4D600] opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="flex items-center gap-4">
                <span className="font-display text-2xl text-[#000] w-6 text-center italic">
                  #{contributor.rank}
                </span>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#C4D600]/10 border border-[#C4D600]/20 flex items-center justify-center">
                  <img
                  src={contributor.avatar}
                  alt={contributor.name}
                  className="w-full h-full object-cover"
                />
              </div>
                  <span className="font-bold text-base">{contributor.name}</span>
                </div>
              </div>

              <span className="font-display text-lg">
                {contributor.points}{" "}
                <span className="text-xs font-sans font-normal text-muted-foreground">RUNITS</span>
              </span>
            </div>
          ))}
      </div>
      </section>
    </div>
    </MobileLayout>
  );
}

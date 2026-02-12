import { MobileLayout } from "@/components/layout/MobileLayout";
import { useState } from "react";
import { Search, MessageCircle, Trophy, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";


type Tab = "amis" | "clan" | "classement";
type RankingTab = "solo" | "clans" | "entreprises";

const friends = [
  { name: "Romain", message: "On court à 18h ?", status: "online" },
  { name: "Sophie", message: "Envoyé mardi", status: "away" },
  { name: "Élise", message: "Vus", status: "away" },
  { name: "Malo", message: "Vus", status: "offline" },
  { name: "Maxime", message: "Envoyé Lundi", status: "away" },
];

const topContributors = [
  { rank: 1, name: "Pôle marketing", points: 1200, medal: "/images/Medaille1.svg" },
  { rank: 2, name: "Pôle communication", points: 980, medal: "/images/Medaille2.svg" },
  { rank: 3, name: "Pôle graphique", points: 850, medal: "/images/Medaille3.svg" },
];

type Geography = "ville" | "region" | "national";

const leaderboardData: Record<RankingTab, Record<Geography, { rank: number; name: string; xp: number; avatar?: string }[]>> = {
  solo: {
    ville: [
      { rank: 1, name: "Pierre-Olivier", xp: 2500, avatar: "👨‍💻" },
      { rank: 2, name: "TerRunner83", xp: 2100, avatar: "🏃" },
      { rank: 3, name: "Shadow_Aim", xp: 1800, avatar: "🎯" },
      { rank: 4, name: "Sacha", xp: 1500 },
      { rank: 5, name: "Perrine", xp: 1200 },
      { rank: 6, name: "Maxime", xp: 1100 },
    ],
    region: [
      { rank: 1, name: "SpeedDemon_13", xp: 12500, avatar: "🏎️" },
      { rank: 2, name: "MarseilleRunner", xp: 11800, avatar: "🌊" },
      { rank: 3, name: "NiceTrackStar", xp: 11200, avatar: "🌴" },
      { rank: 4, name: "AlpsClimber", xp: 10500 },
      { rank: 5, name: "Provencal", xp: 9800 },
      { rank: 6, name: "AzurSprinter", xp: 9200 },
    ],
    national: [
      { rank: 1, name: "ParisMarathoner", xp: 45000, avatar: "🗼" },
      { rank: 2, name: "LyonSpeed", xp: 42500, avatar: "🦁" },
      { rank: 3, name: "BordeauxRun", xp: 41000, avatar: "🍷" },
      { rank: 4, name: "LilleExpress", xp: 38000 },
      { rank: 5, name: "BreizhRunner", xp: 36500 },
      { rank: 6, name: "StrasbourgRun", xp: 35000 },
    ],
  },
  clans: {
    ville: [
      { rank: 1, name: "Squad Radiant", xp: 15400, avatar: "✨" },
      { rank: 2, name: "Toulon Urban Runners", xp: 14200, avatar: "🏙️" },
      { rank: 3, name: "Les Phénix du Var", xp: 12800, avatar: "🔥" },
      { rank: 4, name: "Running Heroes", xp: 11500 },
      { rank: 5, name: "Mistral Runners", xp: 10900 },
      { rank: 6, name: "Cap Garonne", xp: 10200 },
    ],
    region: [
      { rank: 1, name: "PACA Power", xp: 85000, avatar: "☀️" },
      { rank: 2, name: "Massilia Squad", xp: 82000, avatar: "⚓" },
      { rank: 3, name: "Riviera Runners", xp: 78000, avatar: "🌊" },
      { rank: 4, name: "Alpine Goats", xp: 75000 },
      { rank: 5, name: "Avignon Bridge", xp: 72000 },
      { rank: 6, name: "Varois Furieux", xp: 70000 },
    ],
    national: [
      { rank: 1, name: "French Elite", xp: 350000, avatar: "🇫🇷" },
      { rank: 2, name: "Paris United", xp: 320000, avatar: "🗼" },
      { rank: 3, name: "Lyon Lions", xp: 300000, avatar: "🦁" },
      { rank: 4, name: "Bordeaux Wine Run", xp: 280000 },
      { rank: 5, name: "Lille North Star", xp: 260000 },
      { rank: 6, name: "Marseille Champions", xp: 250000 },
    ],
  },
  entreprises: {
    ville: [
      { rank: 1, name: "Naval Group", xp: 75000, avatar: "⚓" },
      { rank: 2, name: "Univ. Toulon (Ingémédia)", xp: 62000, avatar: "🎓" },
      { rank: 3, name: "IKEA La Valette", xp: 58000, avatar: "🛋️" },
      { rank: 4, name: "Decathlon Ollioules", xp: 54000 },
      { rank: 5, name: "Orange Marine", xp: 51000 },
      { rank: 6, name: "Veolia", xp: 50200 },
    ],
    region: [
      { rank: 1, name: "CMA CGM", xp: 150000, avatar: "🚢" },
      { rank: 2, name: "Airbus Helicopters", xp: 145000, avatar: "🚁" },
      { rank: 3, name: "Amadeus Nice", xp: 130000, avatar: "✈️" },
      { rank: 4, name: "Thales Alenia", xp: 125000 },
      { rank: 5, name: "Schneider Electric", xp: 120000 },
      { rank: 6, name: "L'Occitane", xp: 115000 },
    ],
    national: [
      { rank: 1, name: "TotalEnergies", xp: 850000, avatar: "⛽" },
      { rank: 2, name: "LVMH", xp: 820000, avatar: "👜" },
      { rank: 3, name: "BNP Paribas", xp: 780000, avatar: "🏦" },
      { rank: 4, name: "Sanofi", xp: 750000 },
      { rank: 5, name: "Orange France", xp: 720000 },
      { rank: 6, name: "Renault Group", xp: 700000 },
    ],
  },
};

export default function Community() {
  const [activeTab, setActiveTab] = useState<Tab>("amis");
  const [rankingTab, setRankingTab] = useState<RankingTab>("solo");

  return (
    <MobileLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <header className="pt-6 pb-4 text-center">
          <h1 className="font-display text-3xl tracking-wide">COMMUNAUTÉ</h1>
        </header>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {(["amis", "clan", "classement"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-1 py-3 text-sm font-medium uppercase transition-all",
                activeTab === tab
                  ? "border-b-2 border-foreground text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-4">
          {activeTab === "amis" && <FriendsTab />}
          {activeTab === "clan" && <ClanTab />}
          {activeTab === "classement" && (
            <RankingTab activeTab={rankingTab} setActiveTab={setRankingTab} />
          )}
        </div>
      </div>
    </MobileLayout>
  );
}

function FriendsTab() {
  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Rechercher..."
          className="w-full bg-muted rounded-full py-3 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Friends list */}
      <div className="space-y-1">
        {friends.map((friend) => (
          <div
            key={friend.name}
            className="flex items-center justify-between p-3 hover:bg-muted transition-colors border-b border-muted-foreground/20 last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-muted-foreground/20 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-primary-foreground"
                >
                  <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5Z" />
                  <path d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6v1H4v-1Z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-sm">{friend.name}</p>
                <p className="text-xs text-muted-foreground">{friend.message}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "text-xs",
                  friend.status === "online"
                    ? "text-primary"
                    : friend.status === "away"
                      ? "text-muted-foreground"
                      : "text-muted-foreground/50"
                )}
              >
                {friend.status === "online"
                  ? "En ligne"
                  : friend.status === "away"
                    ? "Absent(e)"
                    : "Hors-ligne"}
              </span>
              <div className="relative">
                <MessageCircle className="w-5 h-5" />
                {friend.status === "online" && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-primary rounded-full" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ClanTab() {
  return (
    <div className="space-y-6">
      {/* Clan card */}
      <div className="terrun-card">
        <h2 className="font-display text-xl mb-4">CLAN : INGEMEDIA</h2>
        <div className="bg-muted rounded-xl p-4">
          <p className="text-sm text-muted-foreground mb-2">
            Challenge en cours : objectif mensuel
          </p>
          <div className="mb-2">
            {/* Jauge fond (100%) */}
            <div className="w-full h-3 bg-white/100 rounded-full overflow-hidden">
              {/* Jauge progression */}
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: "75%" }}
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium bg-primary px-2 py-0.5 rounded">
              75%
            </span>
            <span className="text-sm text-muted-foreground">750 / 1000 km</span>
          </div>
        </div>
      </div>

      {/* Top contributors */}
      <div>
        <h3 className="font-display text-lg mb-3">TOP CONTRIBUTEURS</h3>
        <div className="space-y-2">
          {topContributors.map((contributor) => (
            <div
              key={contributor.rank}
              className="flex items-center justify-between p-3 bg-card rounded-xl border border-border"
            >
              <div className="flex items-center gap-3">
                <img
                  src={contributor.medal}
                  alt="medal"
                  className="w-6 h-6"
                />

                <span className="font-medium">{contributor.name}</span>
              </div>
              <span className="font-display text-lg">{contributor.points} pts</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RankingTab({
  activeTab,
  setActiveTab,
}: {
  activeTab: RankingTab;
  setActiveTab: (tab: RankingTab) => void;
}) {
  const [geoTab, setGeoTab] = useState<Geography>("ville");
  const currentData = leaderboardData[activeTab][geoTab];
  const [first, second, third, ...rest] = currentData;

  return (
    <div className="space-y-6">
      {/* Category Tabs (Segmented Control) */}
      <div className="bg-muted p-1 rounded-2xl flex relative">
        {(["solo", "clans", "entreprises"] as RankingTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 py-2 text-sm font-medium rounded-xl transition-all duration-200 capitalize relative z-10",
              activeTab === tab
                ? "bg-background text-foreground shadow-sm ring-1 ring-black/5"
                : "text-muted-foreground hover:text-foreground/80"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Geography Filter (Dropdown) */}
      <div className="relative">
        <select
          value={geoTab}
          onChange={(e) => setGeoTab(e.target.value as Geography)}
          className="w-full appearance-none bg-card border border-border rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
        >
          <option value="ville">Ma ville</option>
          <option value="region">Ma région</option>
          <option value="national">National</option>
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      </div>

      {/* Season countdown */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <img
          src="/images/icon_sablier.svg"
          alt="Couronne argent"
          className="w-7 h-7 drop-shadow-lg"
        />
        <span>
          Fin de saison dans : <strong className="text-foreground">7j 8h 46mn</strong>
        </span>
      </div>

      {/* Podium amélioré */}
      <div className="flex items-end justify-center gap-3 py-6">
        {/* 2nd place */}
        <div className="flex flex-col items-center">
          {/* Couronne argent */}
          <div className="mb-2">
            <img
              src="/images/Couronne-02.svg"
              alt="Couronne argent"
              className="w-15 h-10 drop-shadow-lg"
            />
          </div>

          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-b from-gray-200 to-gray-300 border-4 border-gray-400 flex items-center justify-center mb-3 shadow-lg overflow-hidden">
            {second.avatar?.startsWith("/") ? (
              <img src={second.avatar} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-3xl">{second.avatar}</span>
            )}
          </div>

          {/* Podium box */}
          <div className="bg-gradient-to-b from-gray-200 to-gray-300 rounded-t-2xl px-4 py-4 text-center w-24 h-32 flex flex-col items-center justify-end shadow-xl border-t-4 border-gray-400">
            <p className="font-display text-3xl font-bold text-gray-700">#2</p>
            <p className="text-xs font-semibold mt-1 whitespace-nowrap">{second.name}</p>
            <p className="text-xs text-gray-600 mt-1 font-medium whitespace-nowrap">{second.xp.toLocaleString()} XP</p>
          </div>
        </div>

        {/* 1st place */}
        <div className="flex flex-col items-center -mb-6">
          {/* Couronne or */}
          <div className="mb-2">
            <img
              src="/images/Couronne-01.svg"
              alt="Couronne or"
              className="w-15 h-10 drop-shadow-lg"
            />
          </div>

          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-b from-yellow-200 via-yellow-300 to-yellow-400 border-4 border-primary flex items-center justify-center mb-3 shadow-2xl ring-4 ring-primary/30 overflow-hidden">
            {first.avatar?.startsWith("/") ? (
              <img src={first.avatar} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-4xl">{first.avatar}</span>
            )}
          </div>

          {/* Podium box */}
          <div className="bg-gradient-to-b from-foreground via-gray-900 to-black text-background rounded-t-2xl px-4 py-5 text-center w-28 h-40 flex flex-col items-center justify-end shadow-2xl border-t-4 border-primary">
            <p className="font-display text-4xl font-bold text-primary">#1</p>
            <p className="text-sm font-bold mt-1 whitespace-nowrap">{first.name}</p>
            <p className="text-sm text-primary font-bold mt-1 whitespace-nowrap">{first.xp.toLocaleString()} XP</p>
          </div>
        </div>

        {/* 3rd place */}
        <div className="flex flex-col items-center">
          {/* Couronne bronze */}
          <div className="mb-2">
            <img
              src="/images/Couronne-03.svg"
              alt="Couronne bronze"
              className="w-15 h-10 drop-shadow-lg"
            />
          </div>

          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-b from-orange-200 to-orange-300 border-4 border-orange-400 flex items-center justify-center mb-3 shadow-lg overflow-hidden">
            {third.avatar?.startsWith("/") ? (
              <img src={third.avatar} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-3xl">{third.avatar}</span>
            )}
          </div>

          {/* Podium box */}
          <div className="bg-gradient-to-b from-orange-200 to-orange-300 rounded-t-2xl px-3 py-3 text-center w-24 h-24 flex flex-col items-center justify-end shadow-xl border-t-4 border-orange-400">
            <p className="font-display text-2xl font-bold text-orange-800 leading-none">#3</p>
            <p className="text-[10px] font-semibold mt-1 whitespace-nowrap leading-tight">{third.name}</p>
            <p className="text-[10px] text-orange-700 mt-0.5 font-medium whitespace-nowrap leading-tight">{third.xp.toLocaleString()} XP</p>
          </div>
        </div>
      </div>

      {/* Rest of ranking */}
      <div className="space-y-2">
        {rest.map((user) => (
          <div
            key={user.rank}
            className="flex items-center justify-between p-3 bg-card rounded-xl border border-border"
          >
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground font-medium w-6">
                {user.rank}.
              </span>
              <span className="font-medium">{user.name}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {user.xp.toLocaleString()} XP
            </span>
          </div>
        ))}

        {/* User's rank */}
        <div className="flex items-center justify-between p-3 bg-foreground text-background rounded-xl">
          <div className="flex items-center gap-3">
            <span className="font-medium w-6">24.</span>
            <span className="font-medium">Moi</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-primary font-medium">1,200 XP</span>
            <span className="text-primary">↑</span>
          </div>
        </div>
      </div>
    </div>
  );
}

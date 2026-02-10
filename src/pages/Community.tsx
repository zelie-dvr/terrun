import { MobileLayout } from "@/components/layout/MobileLayout";
import { useState } from "react";
import { Search, MessageCircle, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Trophy } from "lucide-react";

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
  { rank: 1, name: "Pôle marketing", points: 1200, medal: "dist/images/Medaille1.svg" },
  { rank: 2, name: "Pôle communication", points: 980, medal: "dist/images/Medaille2.svg" },
  { rank: 3, name: "Pôle graphique", points: 850, medal: "dist/images/Medaille3.svg" },
];

const soloRanking = [
  { rank: 1, name: "Champion", xp: 15400, avatar: "👩" },
  { rank: 2, name: "Challenger", xp: 14200, avatar: "👩" },
  { rank: 3, name: "Outsider", xp: 13800, avatar: "👩" },
  { rank: 4, name: "Sacha", xp: 12500 },
  { rank: 5, name: "Perrine", xp: 11900 },
  { rank: 6, name: "Maxime", xp: 11200 },
];

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
  return (
    <div className="space-y-6">
      {/* Sub-tabs */}
      <div className="flex gap-2">
        {(["solo", "clans", "entreprises"] as RankingTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all capitalize",
              activeTab === tab
                ? "bg-foreground text-background"
                : "bg-muted text-foreground"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Season countdown */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <img
        src="dist/images/icon_sablier.svg"
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
        src="dist/images/Couronne-02.svg"
        alt="Couronne argent"
        className="w-15 h-10 drop-shadow-lg"
      />
    </div>
    
    {/* Avatar */}
    <div className="w-20 h-20 rounded-full bg-gradient-to-b from-gray-200 to-gray-300 border-4 border-gray-400 flex items-center justify-center mb-3 shadow-lg">
    <img
      src="dist/images/avatar2.png"
      alt="medal"
    />
    </div>
    
    {/* Podium box */}
    <div className="bg-gradient-to-b from-gray-200 to-gray-300 rounded-t-2xl px-4 py-4 text-center w-24 h-32 flex flex-col items-center justify-end shadow-xl border-t-4 border-gray-400">
      <p className="font-display text-3xl font-bold text-gray-700">#2</p>
      <p className="text-xs font-semibold mt-1 whitespace-nowrap">Challenger</p>
      <p className="text-xs text-gray-600 mt-1 font-medium whitespace-nowrap">14,200 XP</p>
    </div>
  </div>

  {/* 1st place */}
  <div className="flex flex-col items-center -mb-6">
    {/* Couronne or */}
      <div className="mb-2">
        <img
          src="dist/images/Couronne-01.svg"
          alt="Couronne argent"
          className="w-15 h-10 drop-shadow-lg"
        />
      </div>
    
    {/* Avatar */}
    <div className="w-24 h-24 rounded-full bg-gradient-to-b from-yellow-200 via-yellow-300 to-yellow-400 border-4 border-primary flex items-center justify-center mb-3 shadow-2xl ring-4 ring-primary/30">
    <img
      src="dist/images/individual-avatar.png"
      alt="medal"
    />
    </div>
    
    {/* Podium box */}
    <div className="bg-gradient-to-b from-foreground via-gray-900 to-black text-background rounded-t-2xl px-4 py-5 text-center w-28 h-40 flex flex-col items-center justify-end shadow-2xl border-t-4 border-primary">
      <p className="font-display text-4xl font-bold text-primary">#1</p>
      <p className="text-sm font-bold mt-1 whitespace-nowrap">Champion</p>
      <p className="text-sm text-primary font-bold mt-1 whitespace-nowrap">15,400 XP</p>
    </div>
  </div>

  {/* 3rd place */}
  <div className="flex flex-col items-center">
    {/* Couronne bronze */}
<div className="mb-2">
  <img
    src="dist/images/Couronne-03.svg"
    alt="Couronne argent"
    className="w-15 h-10 drop-shadow-lg"
  />
</div>
    
    {/* Avatar */}
    <div className="w-20 h-20 rounded-full bg-gradient-to-b from-orange-200 to-orange-300 border-4 border-orange-400 flex items-center justify-center mb-3 shadow-lg">
    <img
      src="dist/images/avatar2.png"
      alt="medal"
    />
    </div>
    
    {/* Podium box */}
    <div className="bg-gradient-to-b from-orange-200 to-orange-300 rounded-t-2xl px-3 py-3 text-center w-24 h-24 flex flex-col items-center justify-end shadow-xl border-t-4 border-orange-400">
      <p className="font-display text-2xl font-bold text-orange-800 leading-none">#3</p>
      <p className="text-[10px] font-semibold mt-1 whitespace-nowrap leading-tight">Outsider</p>
      <p className="text-[10px] text-orange-700 mt-0.5 font-medium whitespace-nowrap leading-tight">13,800 XP</p>
    </div>
  </div>
</div>

      {/* Rest of ranking */}
      <div className="space-y-2">
        {soloRanking.slice(3).map((user) => (
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
            <span className="text-primary font-medium">8,450 XP</span>
            <span className="text-primary">↑</span>
          </div>
        </div>
      </div>
    </div>
  );
}

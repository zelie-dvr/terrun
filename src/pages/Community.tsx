import { MobileLayout } from "@/components/layout/MobileLayout";
import { useState } from "react";
import { Search, MessageCircle, Trophy } from "lucide-react";
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
  { rank: 1, name: "Pôle marketing", points: 1200, medal: "🥇" },
  { rank: 2, name: "Pôle comm.", points: 980, medal: "🥈" },
  { rank: 3, name: "Pôle graphique", points: 850, medal: "🥉" },
];

const soloRanking = [
  { rank: 1, name: "Champion", xp: 15400, avatar: "👩" },
  { rank: 2, name: "Challenger", xp: 14200, avatar: "👩" },
  { rank: 3, name: "Outsider", xp: 13800, avatar: "👩" },
  { rank: 4, name: "Lisa", xp: 12500 },
  { rank: 5, name: "Zélie", xp: 11900 },
  { rank: 6, name: "Aurélie", xp: 11200 },
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
            className="flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-muted-foreground/20 flex items-center justify-center">
                <span className="text-muted-foreground">👤</span>
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
          <div className="terrun-progress mb-2">
            <div className="terrun-progress-bar" style={{ width: "75%" }} />
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
                <span className="text-xl">{contributor.medal}</span>
                <span className="font-medium">{contributor.name}</span>
              </div>
              <span className="font-display text-lg">{contributor.points} pts</span>
            </div>
          ))}
        </div>
      </div>

      {/* Last message */}
      <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
        <MessageCircle className="w-5 h-5 text-muted-foreground" />
        <p className="text-sm">
          <span className="font-medium">Dernier message : </span>
          <span className="text-muted-foreground">
            "On court à 18h ?" - Romain
          </span>
        </p>
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
        <span>⏳</span>
        <span>
          Fin de saison dans : <strong className="text-foreground">7j 8h 46mn</strong>
        </span>
      </div>

      {/* Podium */}
      <div className="flex items-end justify-center gap-2 py-4">
        {/* 2nd place */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-terrun-silver/30 border-2 border-terrun-silver flex items-center justify-center mb-2">
            <span className="text-2xl">👩</span>
          </div>
          <div className="bg-muted-foreground/20 rounded-t-xl px-4 py-3 text-center h-20 w-20 flex flex-col justify-end">
            <p className="font-display text-lg">#2</p>
            <p className="text-xs">Challenger</p>
            <p className="text-xs text-muted-foreground">14,200 XP</p>
          </div>
        </div>

        {/* 1st place */}
        <div className="flex flex-col items-center -mb-4">
          <span className="text-2xl mb-1">👑</span>
          <div className="w-20 h-20 rounded-full bg-primary/30 border-4 border-primary flex items-center justify-center mb-2">
            <span className="text-3xl">👩</span>
          </div>
          <div className="bg-foreground text-background rounded-t-xl px-6 py-4 text-center h-28 w-24 flex flex-col justify-end">
            <p className="font-display text-2xl">#1</p>
            <p className="text-xs font-medium">Champion</p>
            <p className="text-sm text-primary">15,400 XP</p>
          </div>
        </div>

        {/* 3rd place */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-terrun-bronze/30 border-2 border-terrun-bronze flex items-center justify-center mb-2">
            <span className="text-2xl">👩</span>
          </div>
          <div className="bg-terrun-bronze/20 rounded-t-xl px-4 py-3 text-center h-16 w-20 flex flex-col justify-end">
            <p className="font-display text-lg">#3</p>
            <p className="text-xs">Outsider</p>
            <p className="text-xs text-muted-foreground">13,800 XP</p>
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

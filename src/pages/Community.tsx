import { MobileLayout } from "@/components/layout/MobileLayout";
import { useState } from "react";
import { Search, MessageCircle, Trophy, ChevronDown, UserPlus, Target, MessageSquare, Palette, Users, Map, Clock, Send, User, ChevronUp, Minus, Gift, Sparkles, Zap, Mountain, Activity, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";


type Tab = "amis" | "team" | "classement";
type RankingTab = "solo" | "teams" | "entreprises";

const friends = [
  {
    name: "Romain",
    lastMessage: "On court à 18h ?",
    time: "14:30",
    unread: 2,
    avatar: "R",
    isOnline: true,
  },
  {
    name: "Sophie",
    lastMessage: "Je viens de capturer ta zone au port !",
    time: "12:15",
    unread: 1,
    avatar: "S",
    isOnline: true,
  },
  {
    name: "Élise",
    lastMessage: "Demain 7h pour la séance Winter Ark ?",
    time: "Hier",
    unread: 0,
    avatar: "E",
    isOnline: false,
  },
  {
    name: "Malo",
    lastMessage: "T'as vu mon nouveau record de vitesse ?",
    time: "Hier",
    unread: 0,
    avatar: "M",
    isOnline: false,
  },
  {
    name: "Maxime",
    lastMessage: "Objectif Radiant en marche, bien joué !",
    time: "Lun",
    unread: 0,
    avatar: "X",
    isOnline: true,
  },
]

const topContributors = [
  { rank: 1, name: "Alex_Runner83", points: 1200, icon: Target },
  { rank: 2, name: "SarahDesign", points: 980, icon: MessageSquare },
  { rank: 3, name: "Tom-Dev", points: 850, icon: Palette },
];

const teamChat = [
  { id: 1, time: "18:30", user: "Alex_Runner83", message: "Go raid le port ce soir ?" },
  { id: 2, time: "18:32", user: "SarahDesign", message: "J'suis chaude ! J'arrive dans 10min." },
  { id: 3, time: "18:35", user: "Tom-Dev", message: "Attention, y'a du monde zone Nord." },
  { id: 4, time: "18:36", user: "Alex_Runner83", message: "Ok on se regroupe point alpha." },
  { id: 5, time: "18:38", user: "KevinSpeed", message: "J'arrive en renfort !" },
];

type Geography = "ville" | "region" | "national";

const leaderboardData: Record<RankingTab, Record<Geography, { rank: number; name: string; xp: number; avatar?: string; tier: "souverain" | "conquerant" | "sentinelle" | "eclaireur"; trend: "up" | "down" | "stable"; specialty?: "speed" | "elevation" | "endurance" }[]>> = {
  solo: {
    ville: [
      { rank: 1, name: "Flash_Gordon", xp: 2850, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Flash", tier: "souverain", trend: "stable" },
      { rank: 2, name: "TerRunner83", xp: 2100, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=TerRunner", tier: "conquerant", trend: "up" },
      { rank: 3, name: "Shadow_Aim", xp: 1800, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shadow", tier: "conquerant", trend: "down" },
      { rank: 4, name: "Sacha", xp: 1500, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sacha", tier: "sentinelle", trend: "up" },
      { rank: 5, name: "Perrine", xp: 1200, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Perrine", tier: "sentinelle", trend: "stable" },
      { rank: 6, name: "Maxime", xp: 1100, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maxime", tier: "sentinelle", trend: "down" },
      { rank: 12, name: "Victoire", xp: 1200, avatar: "dist/images/individual-avatar.png", tier: "eclaireur", trend: "up" },
    ],
    region: [
      { rank: 1, name: "SpeedDemon_13", xp: 12500, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Speed", tier: "souverain", trend: "up" },
      { rank: 2, name: "MarseilleRunner", xp: 11800, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marseille", tier: "conquerant", trend: "stable" },
      { rank: 3, name: "NiceTrackStar", xp: 11200, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nice", tier: "conquerant", trend: "up" },
      { rank: 4, name: "AlpsClimber", xp: 10500, tier: "sentinelle", trend: "down" },
      { rank: 5, name: "Provencal", xp: 9800, tier: "sentinelle", trend: "stable" },
      { rank: 6, name: "AzurSprinter", xp: 9200, tier: "sentinelle", trend: "up" },
      { rank: 12, name: "Victoire", xp: 4500, avatar: "dist/images/individual-avatar.png", tier: "eclaireur", trend: "up" },
    ],
    national: [
      { rank: 1, name: "ParisMarathoner", xp: 150000, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Paris", tier: "souverain", trend: "stable" },
      { rank: 2, name: "LyonSpeed", xp: 142000, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lyon", tier: "conquerant", trend: "up" },
      { rank: 3, name: "BordeauxRun", xp: 138000, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bordeaux", tier: "conquerant", trend: "down" },
      { rank: 4, name: "LilleExpress", xp: 125000, tier: "sentinelle", trend: "stable" },
      { rank: 5, name: "BreizhRunner", xp: 110000, tier: "sentinelle", trend: "up" },
      { rank: 6, name: "StrasbourgRun", xp: 95000, tier: "sentinelle", trend: "down" },
    ],
  },
  teams: {
    ville: [
      { rank: 1, name: "Squad Radiant", xp: 15400, avatar: "✨", tier: "souverain", trend: "up" },
      { rank: 2, name: "Toulon Urban Runners", xp: 14200, avatar: "🏙️", tier: "conquerant", trend: "stable" },
      { rank: 3, name: "Les Phénix du Var", xp: 12800, avatar: "🔥", tier: "conquerant", trend: "down" },
      { rank: 4, name: "Running Heroes", xp: 11500, tier: "sentinelle", trend: "up" },
      { rank: 5, name: "Mistral Runners", xp: 10900, tier: "sentinelle", trend: "stable" },
      { rank: 6, name: "Cap Garonne", xp: 10200, tier: "sentinelle", trend: "down" },
    ],
    region: [
      { rank: 1, name: "PACA Power", xp: 85000, avatar: "☀️", tier: "souverain", trend: "stable" },
      { rank: 2, name: "Massilia Squad", xp: 82000, avatar: "⚓", tier: "conquerant", trend: "up" },
      { rank: 3, name: "Riviera Runners", xp: 78000, avatar: "🌊", tier: "conquerant", trend: "down" },
      { rank: 4, name: "Alpine Goats", xp: 75000, tier: "sentinelle", trend: "stable" },
      { rank: 5, name: "Avignon Bridge", xp: 72000, tier: "sentinelle", trend: "up" },
      { rank: 6, name: "Varois Furieux", xp: 70000, tier: "sentinelle", trend: "down" },
    ],
    national: [
      { rank: 1, name: "French Elite", xp: 350000, avatar: "🇫🇷", tier: "souverain", trend: "stable" },
      { rank: 2, name: "Paris United", xp: 320000, avatar: "🗼", tier: "souverain", trend: "up" },
      { rank: 3, name: "Lyon Lions", xp: 300000, avatar: "🦁", tier: "conquerant", trend: "down" },
      { rank: 4, name: "Bordeaux Wine Run", xp: 280000, tier: "sentinelle", trend: "stable" },
      { rank: 5, name: "Lille North Star", xp: 260000, tier: "sentinelle", trend: "up" },
      { rank: 6, name: "Marseille Champions", xp: 250000, tier: "sentinelle", trend: "down" },
    ],
  },
  entreprises: {
    ville: [
      { rank: 1, name: "Naval Group", xp: 75000, avatar: "⚓", tier: "souverain", trend: "stable" },
      { rank: 2, name: "Univ. Toulon (Ingémédia)", xp: 62000, avatar: "🎓", tier: "conquerant", trend: "up" },
      { rank: 3, name: "IKEA La Valette", xp: 58000, avatar: "🛋️", tier: "conquerant", trend: "down" },
      { rank: 4, name: "Decathlon Ollioules", xp: 54000, tier: "sentinelle", trend: "stable" },
      { rank: 5, name: "Orange Marine", xp: 51000, tier: "sentinelle", trend: "up" },
      { rank: 6, name: "Veolia", xp: 50200, tier: "eclaireur", trend: "down" },
    ],
    region: [
      { rank: 1, name: "CMA CGM", xp: 150000, avatar: "🚢", tier: "souverain", trend: "stable" },
      { rank: 2, name: "Airbus Helicopters", xp: 145000, avatar: "🚁", tier: "conquerant", trend: "up" },
      { rank: 3, name: "Amadeus Nice", xp: 130000, avatar: "✈️", tier: "conquerant", trend: "down" },
      { rank: 4, name: "Thales Alenia", xp: 125000, tier: "sentinelle", trend: "stable" },
      { rank: 5, name: "Schneider Electric", xp: 120000, tier: "sentinelle", trend: "up" },
      { rank: 6, name: "L'Occitane", xp: 115000, tier: "eclaireur", trend: "down" },
    ],
    national: [
      { rank: 1, name: "TotalEnergies", xp: 850000, avatar: "⛽", tier: "souverain", trend: "stable" },
      { rank: 2, name: "LVMH", xp: 820000, avatar: "👜", tier: "souverain", trend: "up" },
      { rank: 3, name: "BNP Paribas", xp: 780000, avatar: "🏦", tier: "conquerant", trend: "down" },
      { rank: 4, name: "Sanofi", xp: 750000, tier: "sentinelle", trend: "stable" },
      { rank: 5, name: "Orange France", xp: 720000, tier: "sentinelle", trend: "up" },
      { rank: 6, name: "Renault Group", xp: 700000, tier: "eclaireur", trend: "down" },
    ],
  },
};

export default function Community() {
  const [activeTab, setActiveTab] = useState<Tab>("amis");
  const [rankingTab, setRankingTab] = useState<RankingTab>("solo");

  return (
    <MobileLayout>
      <div className="animate-fade-in relative">
        {/* Header */}
        <header className="pt-6 pb-4 text-center">
          <h1 className="font-display text-3xl tracking-wide">COMMUNAUTÉ</h1>
        </header>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {(["amis", "team", "classement"] as Tab[]).map((tab) => (
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
          {activeTab === "team" && <TeamTab />}
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
    <div className="flex flex-col gap-3" aria-label="Amis">
      {/* Search & Add */}
      <div className="relative mb-2 flex items-center gap-2">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Rechercher..."
          className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          aria-label="Rechercher un ami"
        />
        <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-[#C4D600] hover:text-black transition-colors">
          <UserPlus className="w-5 h-5" />
        </button>
      </div>

      {/* Friends list */}
      {friends.map((friend, i) => (
        <button
          key={i}
          className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 text-left transition-colors hover:bg-secondary"
        >
          {/* Avatar */}
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-foreground">
            {friend.avatar}
            {friend.isOnline && (
              <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-card bg-[#C4D600]" />
            )}
          </div>

          {/* Info */}
          <div className="min-w-0 flex-1">
            <span className="text-sm font-bold text-foreground">{friend.name}</span>
            <p className="truncate text-xs text-muted-foreground">{friend.lastMessage}</p>
          </div>

          {/* Time + unread badge */}
          {(friend.time || friend.unread > 0) && (
            <div className="flex flex-col items-center gap-1 text-right">
              {friend.time && (
                <span className="text-[10px] text-muted-foreground">{friend.time}</span>
              )}
              {friend.unread > 0 && (
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                  {friend.unread}
                </div>
              )}
            </div>
          )}
        </button>
      ))}
    </div>
  )
}

function TeamTab() {
  return (
    <div className="space-y-6 pb-24">
      {/* Clan card */}
      <div className="terrun-card relative overflow-hidden">
        <h2 className="font-display text-xl mb-4 uppercase tracking-wide">TEAM : INGEMEDIA</h2>

        {/* Challenge en cours - Light Mode */}
        <div className="bg-card border border-border shadow-sm rounded-xl p-5 relative overflow-hidden group">
          <p className="text-sm font-bold text-muted-foreground mb-3 uppercase tracking-wider relative z-10 flex items-center justify-between">
            Challenge en cours
            <span className="text-[10px] bg-[#C4D600] text-black px-1.5 py-0.5 rounded font-black">MENSUEL</span>
          </p>

          <div className="mb-3 relative z-10">
            {/* Jauge fond */}
            <div className="w-full h-4 bg-muted rounded-full overflow-hidden">
              {/* Jauge progression */}
              <div
                className="h-full bg-[#C4D600] shadow-[0_0_10px_#C4D600] rounded-full transition-all duration-1000 ease-out"
                style={{ width: "75%" }}
              />
            </div>
          </div>

          <div className="flex justify-between items-end relative z-10">
            <div>
              <span className="text-3xl font-display text-foreground block leading-none">75%</span>
              <span className="text-xs font-bold text-[#9AA800]">+12% cette semaine</span>
            </div>
            <span className="text-sm font-medium text-muted-foreground">750 / 800 km</span>
          </div>
        </div>
      </div>

      {/* Ma contribution */}
      <div className="bg-card rounded-2xl p-5 border border-border flex items-center justify-between shadow-sm">
        <div className="flex flex-col">
          <span className="font-display text-sm uppercase tracking-wider text-muted-foreground mb-1">MA CONTRIBUTION</span>
          <div className="flex items-baseline gap-2">
            <p className="font-display text-2xl">45.5</p>
            <p className="text-sm font-medium text-muted-foreground">KM</p>
          </div>
        </div>
        <div className="text-right">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#C4D600]/10 border border-[#C4D600]/20">
            <span className="font-display text-lg text-[#9AA800]">23%</span>
          </div>
        </div>
      </div>

      {/* Stats du Clan */}
      <div>
        <h3 className="font-display text-lg mb-3 uppercase tracking-wide">STATS DU CLAN</h3>
        <div className="bg-card rounded-xl p-4 border border-border grid grid-cols-3 gap-4 shadow-sm">
          <div className="flex flex-col items-center justify-center text-center group">
            <div className="w-10 h-10 rounded-full bg-[#C4D600]/10 border border-[#C4D600]/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5 text-[#9AA800]" />
            </div>
            <p className="font-display text-xl font-bold">13</p>
            <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-wide">Membres</p>
          </div>
          <div className="flex flex-col items-center justify-center text-center border-l border-border/50 group">
            <div className="w-10 h-10 rounded-full bg-[#C4D600]/10 border border-[#C4D600]/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Map className="w-5 h-5 text-[#9AA800]" />
            </div>
            <p className="font-display text-xl font-bold">37</p>
            <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-wide">KM²</p>
          </div>
          <div className="flex flex-col items-center justify-center text-center border-l border-border/50 group">
            <div className="w-10 h-10 rounded-full bg-[#C4D600]/10 border border-[#C4D600]/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Trophy className="w-5 h-5 text-[#9AA800]" />
            </div>
            <p className="font-display text-xl font-bold">#5</p>
            <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-wide">Régional</p>
          </div>
        </div>
      </div>

      {/* Top Runners */}
      <div>
        <h3 className="font-display text-lg mb-3 uppercase tracking-wide">CLASSEMENT DE L'ÉQUIPE</h3>
        <div className="space-y-3">
          {topContributors.map((contributor) => (
            <div
              key={contributor.rank}
              className="flex items-center justify-between p-3 bg-card rounded-xl border border-border shadow-sm relative overflow-hidden group"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#9AA800] opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="flex items-center gap-4">
                <span className="font-display text-2xl text-[#000] w-6 text-center italic">#{contributor.rank}</span>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#C4D600]/10 border border-[#C4D600]/20 flex items-center justify-center">
                    <contributor.icon className="w-5 h-5 text-[#9AA800]" />
                  </div>
                  <span className="font-bold text-base">{contributor.name}</span>
                </div>
              </div>
              <span className="font-display text-lg">{contributor.points} <span className="text-xs font-sans font-normal text-muted-foreground">RUNITS</span></span>
            </div>
          ))}

          {/* Voir plus (Non-clickable) */}
          <div className="text-right pt-1">
            <span className="text-xs text-gray-500 font-medium hover:text-[#000]">
              Voir plus
            </span>
          </div>
        </div>
      </div>

      {/* Activité Récente */}
      <div>
        <h3 className="font-display text-lg mb-3 uppercase tracking-wide">ACTIVITÉ RÉCENTE</h3>
        <div className="bg-card rounded-xl border border-border overflow-hidden shadow-md">
          <div className="p-4 border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#000] mt-1 shrink-0" />
              <div>
                <p className="text-sm leading-relaxed"><span className="font-bold text-[#9AA800]">SarahDesign</span> a capturé <span className="font-bold text-white bg-black/80 px-2 py-0.5 rounded text-xs uppercase tracking-wide">Port de Toulon</span></p>
                <p className="text-xs text-muted-foreground mt-1 font-medium">il y a 2h</p>
              </div>
            </div>
          </div>
          <div className="p-4 border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#00] mt-1 shrink-0" />
              <div>
                <p className="text-sm leading-relaxed">Nouveau membre : <span className="font-bold text-[#9AA800]">KevinSpeed</span></p>
                <p className="text-xs text-muted-foreground mt-1 font-medium">il y a 5h</p>
              </div>
            </div>
          </div>
          <div className="p-4 last:border-0 hover:bg-muted/30 transition-colors">
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#000] mt-1 shrink-0" />
              <div>
                <p className="text-sm font-bold text-[#9AA800]">Objectif hebdomadaire atteint !</p>
                <p className="text-xs text-muted-foreground mt-1 font-medium">hier</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat du Clan (Live) */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm border border-border flex flex-col h-96">
        {/* Header */}
        <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-white dark:bg-zinc-900 z-10">
          <h3 className="font-display text-lg uppercase tracking-wide flex items-center gap-2">
            CHAT DE LA TEAM
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C4D600] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C4D600]"></span>
            </span>
          </h3>
          <span className="text-[10px] font-bold bg-[#C4D600] text-black px-1.5 py-0.5 rounded animate-pulse">LIVE</span>
        </div>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50 dark:bg-black/20 text-sm">
          {teamChat.map((msg) => (
            <div key={msg.id} className="flex gap-3 group">
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 border border-[#C4D600]/50 flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-black dark:text-white cursor-pointer hover:underline">{msg.user}</span>
                  <span className="text-xs text-zinc-400 font-medium">{msg.time}</span>
                </div>
                <p className="text-zinc-700 dark:text-zinc-300 mt-0.5 leading-relaxed">
                  {msg.message}
                </p>
              </div>
            </div>
          ))}
          <div className="h-2"></div>
        </div>

        {/* Console Input Area */}
        <div className="p-3 bg-zinc-900 border-t border-zinc-800">
          <div className="flex items-center gap-2 bg-zinc-800/50 p-1 rounded-full border border-zinc-700/50 focus-within:border-[#C4D600]/50 focus-within:bg-zinc-800 transition-all">
            <input
              type="text"
              placeholder="Envoyer un message tactique..."
              className="flex-1 bg-transparent text-white placeholder:text-zinc-500 text-sm px-4 py-1.5 outline-none font-medium"
            />
            <button className="w-8 h-8 rounded-full bg-[#C4D600] hover:bg-[#C4D600] flex items-center justify-center shrink-0 transition-all transform active:scale-95 shadow-[0_0_10px_#C4D600] hover:shadow-[0_0_15px_#C4D600]">
              <Send className="w-3.5 h-3.5 text-black -ml-0.5" />
            </button>
          </div>
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
  const [showRewardInfo, setShowRewardInfo] = useState(false);
  const currentData = leaderboardData[activeTab][geoTab];

  // Configuration for the Ascension Widget based on Geography
  const ascensionData: Record<Geography, { rank: string; change: string; trend: "up" | "down"; label: string; points: string }> = {
    ville: {
      rank: "#3",
      change: "+1 place",
      trend: "up",
      label: "Top 1% Toulon",
      points: "0,35 20,30 40,25 60,15 80,10 100,5"
    },
    region: {
      rank: "#12",
      change: "+3 places",
      trend: "up",
      label: "Top 5% régional",
      points: "0,35 20,25 40,30 60,15 80,20 100,5"
    },
    national: {
      rank: "#154",
      change: "-10 places",
      trend: "down",
      label: "Top 15% National",
      points: "0,10 20,15 40,10 60,25 80,30 100,35"
    }
  };

  const currentAscension = ascensionData[geoTab];

  // Sort data and extract Top 3 + Rest
  const sortedData = [...currentData].sort((a, b) => a.rank - b.rank);
  const first = sortedData.find(d => d.rank === 1);
  const second = sortedData.find(d => d.rank === 2);
  const third = sortedData.find(d => d.rank === 3);
  const rest = sortedData.filter(d => d.rank > 3);

  const getAvatarUrl = (seed: string | undefined, name: string) => {
    if (seed?.startsWith("http") || seed?.startsWith("/")) return seed;
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`;
  };

  const TrendIcon = ({ trend }: { trend: "up" | "down" | "stable" }) => {
    if (trend === "up") return <TrendingUp className="w-3 h-3 text-green-500" />;
    if (trend === "down") return <TrendingUp className="w-3 h-3 text-red-500 rotate-180" />;
    return <Minus className="w-3 h-3 text-muted-foreground" />;
  };

  const SpecialtyIcon = ({ type }: { type?: "speed" | "elevation" | "endurance" }) => {
    if (type === "speed") return <Zap className="w-3 h-3 text-yellow-500 fill-yellow-500" />;
    if (type === "elevation") return <Mountain className="w-3 h-3 text-stone-500 fill-stone-500" />;
    if (type === "endurance") return <Activity className="w-3 h-3 text-blue-500" />;
    return type ? <Zap className="w-3 h-3 text-gray-400" /> : null;
  };

  const TierLabel = ({ tier }: { tier: string }) => {
    switch (tier) {
      case "souverain": return <span className="font-display text-[14px] bg-[#C4D600] text-black px-3 py-0.5 rounded font-bold uppercase tracking-wide shadow-[0_0_8px_#C4D600]">SOUVERAIN</span>;
      case "conquerant": return <span className="font-display text-[14px] bg-zinc-800 text-white border border-zinc-600 px-2 py-0.5 rounded font-bold uppercase tracking-wide">CONQUÉRANT</span>;
      case "sentinelle": return <span className="font-display text-[14px] bg-zinc-100 text-zinc-600 border border-zinc-200 px-1.5 py-0.5 rounded font-bold uppercase tracking-wide">SENTINELLE</span>;
      default: return <span className="font-display text-[10px] text-zinc-400 font-bold uppercase tracking-wide">ÉCLAIREUR</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Category Tabs (Segmented Control) */}
      <div className="bg-muted p-1 rounded-2xl flex relative">
        {(["solo", "teams", "entreprises"] as RankingTab[]).map((tab) => (
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

      {/* Season countdown & Rewards */}
      <div className="flex items-center justify-between text-sm text-muted-foreground relative">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-[#9AA800]" />
          <span>
            Fin de saison : <strong className="text-foreground">7j 8h</strong>
          </span>
        </div>

        <button
          onClick={() => setShowRewardInfo(!showRewardInfo)}
          className="flex items-center gap-1.5 text-xs font-bold text-[#9AA800] hover:underline bg-[#C4D600]/10 px-2 py-1 rounded-full transition-colors"
        >
          <Gift className="w-3.5 h-3.5" />
          RÉCOMPENSES
        </button>

        {showRewardInfo && (
          <div className="absolute top-8 right-0 bg-popover text-popover-foreground border border-border p-3 rounded-xl shadow-xl z-30 w-64 animate-in fade-in zoom-in-95 duration-200">
            <p className="text-xs font-bold mb-1">Récompense actuelle :</p>
            <p className="text-sm text-[#C4D600]">Titre "Conquérant de Toulon"</p>
            <p className="text-xs text-muted-foreground">+ Badge de profil Or</p>
          </div>
        )}
      </div>

      {/* ASCENSION WIDGET (Dynamique) */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-zinc-100 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-wide mb-1">ASCENSION</p>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-xl font-bold">{currentAscension.rank}</span>
            <span className={cn(
              "text-xs font-medium px-1.5 py-0.5 rounded",
              currentAscension.trend === "up" ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100"
            )}>
              {currentAscension.change}
            </span>
          </div>
          <p className="text-[10px] text-zinc-400 mt-0.5">{currentAscension.label}</p>
        </div>
        <div className="h-10 w-24">
          {/* Dynamic SVG Sparkline */}
          <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
            <polyline
              fill="none"
              stroke="#C4D600"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={currentAscension.points}
              className="drop-shadow-[0_2px_4px_rgba(215,255,0,0.4)]"
            />
            {/* Dot at the end (coordinate depends on last point of string) */}
            <circle
              cx="100"
              cy={currentAscension.points.split(" ").pop()?.split(",")[1]}
              r="3"
              fill="#000"
            />
          </svg>
        </div>
      </div>

      {/* Podium amélioré */}
      <div className="flex items-end justify-center gap-2 py-4">
        {/* 2nd place - Conquérant */}
        {second && (
          <div className="flex flex-col items-center z-10 w-[28%]">
            <span>
                <img src="dist/images/Couronne-02.svg" alt="CouronneArgent" className="w-10 mb-2"/>
              </span>
            <div className="w-16 h-16 rounded-full border-2 border-zinc-300 p-0.5 bg-background overflow-hidden relative shadow-md grayscale-[0.2]">
              <img
                src={getAvatarUrl(second.avatar, second.name)}
                alt={second.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="text-center mt-2 flex flex-col items-center w-full">
              <TierLabel tier={second.tier} />
              <p className="font-bold text-xs truncate w-full mt-1">{second.name}</p>
              <p className="text-[10px] text-muted-foreground font-display text-lg">{second.xp.toLocaleString()}</p>
            </div>
          </div>
        )
        }

        {/* 1st place - Souverain */}
        {
          first && (
            <div className="flex flex-col items-center z-20 w-[35%] -mb-2">
              <span>
                <img src="dist/images/Couronne-01.svg" alt="CouronneDoree" className="w-11 mb-2"/>
              </span>
              <div className="w-24 h-24 rounded-full border-[3px] border-[#C4D600] p-1 bg-background overflow-hidden relative shadow-[0_0_25px_rgba(215,255,0,0.4)]">
                <img
                  src={getAvatarUrl(first.avatar, first.name)}
                  alt={first.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="text-center mt-3 scale-110 flex flex-col items-center w-full">
                <TierLabel tier={first.tier} />
                <p className="font-bold text-sm truncate w-full mt-1 text-[#99a700e4] drop-shadow-sm">{first.name}</p>
                <p className="text-foreground font-bold font-display text-lg">{first.xp.toLocaleString()}</p>
              </div>
            </div>
          )
        }

        {/* 3rd place - Conquérant */}
        {
          third && (
            <div className="flex flex-col items-center z-10 w-[28%]">
              <span>
                <img src="dist/images/Couronne-03.svg" alt="CouronneRouge" className="w-10 mb-2"/>
              </span>
              <div className="w-16 h-16 rounded-full border-2 border-zinc-300 p-0.5 bg-background overflow-hidden relative shadow-md grayscale-[0.2]">
                <img
                  src={getAvatarUrl(third.avatar, third.name)}
                  alt={third.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="text-center mt-2 flex flex-col items-center w-full">
                <TierLabel tier={third.tier} />
                <p className="font-bold text-xs truncate w-full mt-1">{third.name}</p>
                <p className="text-[10px] text-muted-foreground font-display text-lg">{third.xp.toLocaleString()}</p>
              </div>
            </div>
          )
        }
      </div >

      {/* Rest of ranking */}
      < div className="bg-card rounded-2xl border border-border overflow-hidden" >
        {
          rest.map((user, index) => (
            <div
              key={user.rank}
              className={cn(
                "flex items-center gap-3 p-3 border-b border-border last:border-0 transition-colors relative",
                user.rank === 12 ? "bg-[#C4D600]/10" : "hover:bg-muted/20"
              )}
            >
              {user.rank === 12 && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#C4D600]" />}

              {/* Rank & Trend */}
              <div className="flex items-center gap-1 min-w-[3rem]">
                <div className="w-4 flex justify-center"><TrendIcon trend={user.trend} /></div>
                <span className={cn("text-sm font-bold w-6 text-center", user.rank === 12 ? "text-black" : "text-muted-foreground")}>{user.rank}</span>
              </div>

              {/* Avatar */}
              <div className="w-9 h-9 rounded-full bg-muted overflow-hidden shrink-0 border border-border">
                <img
                  src={getAvatarUrl(user.avatar, user.name)}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name & Specialty */}
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center gap-1.5">
                  <span className={cn("font-medium text-sm truncate", user.rank === 12 && "font-bold text-black")}>{user.name}</span>
                  <SpecialtyIcon type={user.specialty} />
                </div>
                {user.rank === 12 ? (
                  <p className="text-[10px] font-bold text-zinc-500 animate-pulse">+150 RUNITS pour dépasser le #11</p>
                ) : (
                  <p className="text-[10px] text-muted-foreground capitalize font-medium">{user.tier}</p>
                )}
              </div>

              <span className="font-display text-lg">
                {user.xp.toLocaleString()}
              </span>
              <span className="text-xs font-sans font-normal text-muted-foreground">RUNITS</span>
            </div>
          ))
        }

        {/* Placeholder for empty list */}
        {
          rest.length === 0 && (
            <div className="p-8 text-center text-muted-foreground text-sm">
              Aucun autre participant.
            </div>
          )
        }
      </div >


    </div >
  );
}

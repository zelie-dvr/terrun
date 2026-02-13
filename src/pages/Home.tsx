import { Bell, ChevronDown, Pencil, ArrowUpRight, MapPin } from "lucide-react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { useState, useEffect, ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export default function Home() {
  const { user } = useAuth();
  const [period, setPeriod] = useState("Ce mois");
  // Hardcoded profile data for presentation
  const profile = {
    first_name: "Pierre",
    total_distance_km: 12, // Matches "Objectif du mois" progress
    total_runs: 42,
    total_time_seconds: 153000, // approx 42.5 hours
    monthly_goal_km: 50
  };

  /* 
  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => setProfile(data));
  }, [user]);
  */

  const firstName = "Victoire";

  return (
    <MobileLayout>
      <div className="p-4 space-y-6 animate-fade-in">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-primary overflow-hidden shadow-md">
              <img src="dist/images/individual-avatar.png" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <span className="font-medium text-lg">
              Salut, <span className="font-bold text-primary dark:text-terrun-lime-500">{firstName}</span> 👋
            </span>
          </div>
          <button className="relative p-2 hover:bg-muted/50 rounded-full transition-colors">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-4 h-4 bg-destructive rounded-full text-[10px] text-white flex items-center justify-center">
              3
            </span>
          </button>
        </header>

        {/* Récapitulatifs */}
        <section className="terrun-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium">Récapitulatif du mois</h2>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="stat-value">{Number(profile.total_distance_km).toFixed(1)} KM</p>
              <p className="stat-label">Ce mois-ci</p>
            </div>
            <div>
              <p className="stat-value">1 200</p>
              <p className="stat-label">Runits</p>
            </div>
            <div>
              <p className="stat-value">15</p>
              <p className="stat-label">Classement</p>
            </div>
          </div>
        </section>

        {/* Objectifs du mois */}
        <section className="terrun-card">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-medium">Objectif du mois</h2>
            <button className="flex items-center gap-1 text-sm border rounded-full px-3 py-1">
              Changer
              <Pencil className="w-3 h-3" />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center">
              <img src="../public/images/icon_objectif.svg" className="w-6 h-6" alt="Target icon" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium mb-1">{Number(profile.total_distance_km).toFixed(0)}/{Number(profile.monthly_goal_km).toFixed(0)} KM</p>
              <div className="terrun-progress">
                <div className="terrun-progress-bar" style={{ width: `${Math.min(100, (Number(profile.total_distance_km) / Number(profile.monthly_goal_km)) * 100)}%` }} />
              </div>
            </div>
          </div>
        </section>

        {/* Défis */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">DÉFIS</h2>
            <button className="text-sm text-gray-500 font-medium hover:underline">Voir tout</button>
          </div>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar -mx-4 px-4 pb-2">
            <ChallengeCard
              icon={<img src="../public/images/Run.svg" />}
              title="Explorer 5 parcours"
              description="Valider 5 circuits créés par la communauté."
              color="from-orange-500/20 to-orange-500/5"
              borderColor="border-orange-500/20"
              iconColor="text-orange-500"
              iconBg="bg-orange-500/20"
            />
            <ChallengeCard
              icon={<img src="../public/images/Team.svg" />}
              title="Esprit d'équipe"
              description="Inviter un ami à rejoindre Terrun ou courir à deux."
              color="from-blue-500/20 to-blue-500/5"
              borderColor="border-blue-500/20"
              iconColor="text-blue-500"
              iconBg="bg-blue-500/20"
            />
          </div>
        </section>

        {/* Carte interactive */}
        <section aria-label="Carte interactive">
      <h2 className="mb-1 text-lg font-black uppercase tracking-wide text-foreground">
        Carte Interactive
      </h2>
      <p className="mb-3 text-xs text-muted-foreground">
        Prenez connaissance des avancées des zones conquises, perdues ou contestées.
      </p>

      <div className="relative overflow-hidden rounded-2xl border border-border">
        {/* Map container */}
        <div className="relative h-56 bg-secondary">
          {/* Grid overlay */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 240" fill="none" aria-hidden="true">
            {/* Lignes verticales */}
            {Array.from({ length: 20 }).map((_, i) => (
              <line key={`v-${i}`} x1={i * 20} y1="0" x2={i * 20} y2="240" stroke="hsl(var(--border))" strokeWidth="0.5" />
            ))}
            {/* Lignes horizontales */}
            {Array.from({ length: 12 }).map((_, i) => (
              <line key={`h-${i}`} x1="0" y1={i * 20} x2="400" y2={i * 20} stroke="hsl(var(--border))" strokeWidth="0.5" />
            ))}

            {/* Zones conquises */}
            <rect x="200" y="40" width="80" height="80" fill="hsl(var(--terrun-lime))" opacity="0.35" rx="4" />
            <rect x="280" y="80" width="60" height="60" fill="hsl(var(--terrun-lime))" opacity="0.25" rx="4" />
            <rect x="220" y="120" width="40" height="60" fill="hsl(var(--terrun-lime))" opacity="0.3" rx="4" />

            {/* Zones contestées */}
            <rect x="100" y="60" width="60" height="80" fill="#fb923c" opacity="0.25" rx="4" />
            <rect x="60" y="100" width="40" height="60" fill="#a9d5d2" opacity="0.2" rx="4" />
            <rect x="140" y="140" width="60" height="40" fill="#a9d5d2" opacity="0.25" rx="4" />

            {/* Rues */}
            <line x1="0" y1="100" x2="400" y2="100" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.08" />
            <line x1="180" y1="0" x2="180" y2="240" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.08" />
          </svg>

          {/* Marker central */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="h-4 w-4 rounded-full bg-accent shadow-lg ring-4 ring-accent/20" />
              <div className="absolute -inset-2 animate-ping rounded-full bg-accent/30" />
            </div>
          </div>

          {/* Bouton carte */}
          <button
            className="absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
            aria-label="Ouvrir la carte"
          >
            <MapPin className="h-5 w-5" />
          </button>
        </div>

        {/* Légende */}
        <div className="flex items-center gap-4 border-t border-border bg-card px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-sm bg-accent/40" />
            <span className="text-[10px] font-medium text-muted-foreground">Zones conquises</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-sm bg-[#a9d5d2]" />
            <span className="text-[10px] font-medium text-muted-foreground">Zones perdues</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-sm bg-orange-300/50" />
            <span className="text-[10px] font-medium text-muted-foreground">Zones adverses</span>
          </div>
        </div>
      </div>
    </section>

        {/* Événements locaux */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="section-title">ÉVÈNEMENTS LOCAUX</h2>
            <button className="text-sm text-gray-500 font-medium hover:underline">Voir tout</button>
          </div>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar -mx-4 px-4">
            <EventCard
              image="/mourillon-run.jpg"
              distance="5 KM"
              date="14 dec"
              title="Rendez-vous au Mourillon"
            />
            <EventCard
              image="/solstice-run.jpg"
              distance="10 KM"
              date="21 dec"
              title="Course du Solstice"
            />
          </div>
        </section>
      </div>
    </MobileLayout>
  );
}

function ChallengeCard({
  icon,
  title,
  description,
  color = "from-primary/10 to-transparent",
  borderColor = "border-border",
  iconColor = "text-primary",
  iconBg = "bg-primary/20"

}: {
  icon: ReactNode;
  title: string;
  description: string;
  color?: string;
  borderColor?: string;
  iconColor?: string;
  iconBg?: string;
}) {
  return (
    <div className={`min-w-[220px] p-4 rounded-2xl border ${borderColor} bg-gradient-to-br ${color} backdrop-blur-sm shadow-sm flex-shrink-0 flex flex-col justify-between h-[160px] relative overflow-hidden group hover:shadow-md transition-all duration-300`}>
      <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
        <span className="text-6xl grayscale">{icon}</span>
      </div>

      <div>
        <div className="flex items-start justify-between mb-3">
          <div className={`w-14 h-10 rounded-xl flex items-center justify-center text-xl`}>
            {icon}
          </div>
        </div>
        <h3 className="font-bold text-base mb-1 leading-tight">{title}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
      </div>

      <button className="mt-3 w-full bg-black hover:bg-black/90 text-white text-xs font-semibold py-2 rounded-lg border border-black shadow-sm transition-colors">
        RELEVER LE DÉFI
      </button>
    </div>
  );
}

function EventCard({
  image,
  distance,
  date,
  title,
}: {
  image: string;
  distance: string;
  date: string;
  title: string;
}) {
  const isImage = image.startsWith("/") || image.startsWith("http");

  return (
    <div className="min-w-[240px] rounded-2xl overflow-hidden relative h-40 bg-muted flex-shrink-0">
      {isImage ? (
        <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-30">
          {image}
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
      <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded shadow-sm">
        {distance}
      </div>
      <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm text-foreground text-xs font-medium px-2 py-1 rounded shadow-sm">
        {date}
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-white shadow-sm">{title}</p>
          <ArrowUpRight className="w-4 h-4 text-white drop-shadow-md" />
        </div>
      </div>
    </div>
  );
}

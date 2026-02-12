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

  const firstName = "Pierre-Olivier";

  return (
    <MobileLayout>
      <div className="p-4 space-y-6 animate-fade-in">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-primary overflow-hidden shadow-md">
              <img src="/profile-picture.jpg" alt="Profile" className="w-full h-full object-cover" />
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
            <h2 className="font-medium">Récapitulatif</h2>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="stat-value">{Number(profile.total_distance_km).toFixed(1)} KM</p>
              <p className="stat-label">Ce mois-ci</p>
            </div>
            <div>
              <p className="stat-value">1 200 XP</p>
              <p className="stat-label">Points</p>
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
        <section>
          <h2 className="section-title mb-3">CARTE INTERACTIVE</h2>
          <div className="w-full h-64 rounded-2xl overflow-hidden relative">
            <img
              src="/map-interactive.png"
              alt="Carte interactive"
              className="block w-full h-full object-cover"
            />
            {/* Légende */}
            <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-sm border border-white/20">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_rgba(215,255,0,0.6)]" style={{ backgroundColor: "#D7FF00" }}></div>
                  <span className="text-[10px] font-medium leading-none text-black">Zones capturées</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.4)]"></div>
                  <span className="text-[10px] font-medium leading-none text-black">Zones contestées</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.4)]"></div>
                  <span className="text-[10px] font-medium leading-none text-black">Zones des autres</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Événements locaux */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="section-title">ÉVÈNEMENTS LOCAUX</h2>
            <button className="text-sm text-muted-foreground">Voir tout</button>
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
import { Bell, ChevronDown, Pencil, ArrowUpRight, MapPin } from "lucide-react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export default function Home() {
  const { user } = useAuth();
  const [period, setPeriod] = useState("Ce mois");
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => setProfile(data));
  }, [user]);

  const firstName = profile?.first_name || user?.user_metadata?.first_name || "Runner";

  return (
    <MobileLayout>
      <div className="p-4 space-y-6 animate-fade-in">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-terrun-lime-light border-2 border-primary flex items-center justify-center">
              <span className="text-lg">👩</span>
            </div>
            <span className="font-medium">
              Salut, <span className="font-semibold">{firstName}</span> 👋
            </span>
          </div>
          <button className="relative p-2">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-4 h-4 bg-destructive rounded-full text-[10px] text-white flex items-center justify-center">
              3
            </span>
          </button>
        </header>

        {/* Récapitulatifs */}
        <section className="terrun-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium">Récapitulatifs</h2>
            <button className="flex items-center gap-1 text-sm border rounded-full px-3 py-1">
              {period}
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="stat-value">{profile ? `${Number(profile.total_distance_km).toFixed(1)} KM` : "—"}</p>
              <p className="stat-label">Ce mois-ci</p>
            </div>
            <div>
              <p className="stat-value">{profile ? `${profile.total_runs} RUNS` : "—"}</p>
              <p className="stat-label">Total</p>
            </div>
            <div>
              <p className="stat-value">{profile ? `${Math.floor(profile.total_time_seconds / 3600)}H:${String(Math.floor((profile.total_time_seconds % 3600) / 60)).padStart(2, "0")}M` : "—"}</p>
              <p className="stat-label">Temps d'activité</p>
            </div>
          </div>
        </section>

        {/* Objectifs du mois */}
        <section className="terrun-card">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-medium">Objectifs du mois</h2>
            <button className="flex items-center gap-1 text-sm border rounded-full px-3 py-1">
              Changer
              <Pencil className="w-3 h-3" />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-sm">🎯</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium mb-1">{profile ? `${Number(profile.total_distance_km).toFixed(0)}/${Number(profile.monthly_goal_km).toFixed(0)} KM` : "—"}</p>
              <div className="terrun-progress">
                <div className="terrun-progress-bar" style={{ width: `${profile ? Math.min(100, (Number(profile.total_distance_km) / Number(profile.monthly_goal_km)) * 100) : 0}%` }} />
              </div>
            </div>
          </div>
        </section>

        {/* Défis */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="section-title">DÉFIS</h2>
            <button className="text-sm text-muted-foreground">Voir tout</button>
          </div>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar -mx-4 px-4">
            <ChallengeCard
              icon="🏃"
              badge="5 PAR."
              title="Explorer 5 parcours Terrun"
              description="Valider 5 circuits créés par la communauté."
            />
            <ChallengeCard
              icon="👥"
              badge="SOCIAL"
              title="Social"
              description="Inviter un ami à rejoindre Terrun ou courir à deux."
            />
          </div>
        </section>

        {/* Carte interactive */}
        <section>
          <h2 className="section-title mb-1">CARTE INTERACTIVE</h2>
          <p className="text-sm text-muted-foreground mb-3">
            Prenez connaissance des avancées...
          </p>
          <div className="relative rounded-2xl overflow-hidden h-52 bg-muted">
            <div className="absolute inset-0 bg-gradient-to-br from-terrun-purple/30 via-transparent to-terrun-teal/30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 bg-primary rounded-full shadow-lg animate-pulse" />
            </div>
            <button className="absolute bottom-4 right-4 w-12 h-12 bg-foreground rounded-full flex items-center justify-center shadow-lg">
              <MapPin className="w-5 h-5 text-background" />
            </button>
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
              image="🏃‍♂️"
              distance="5 KM"
              date="14 dec"
              title="Rendez-vous au Mourillon"
            />
            <EventCard
              image="🌅"
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
  badge,
  title,
  description,
}: {
  icon: string;
  badge: string;
  title: string;
  description: string;
}) {
  return (
    <div className="min-w-[200px] terrun-card flex-shrink-0">
      <div className="flex items-start gap-2 mb-3">
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-xl">
          {icon}
        </div>
        <span className="text-[10px] bg-primary/20 px-2 py-0.5 rounded-full font-medium">
          {badge}
        </span>
      </div>
      <h3 className="font-semibold text-sm mb-1">{title}</h3>
      <p className="text-xs text-muted-foreground mb-3">{description}</p>
      <button className="terrun-btn-primary w-full text-xs py-2">
        COMMENCER
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
  return (
    <div className="min-w-[240px] rounded-2xl overflow-hidden relative h-40 bg-muted flex-shrink-0">
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
      <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
        {distance}
      </div>
      <div className="absolute top-3 right-3 bg-background text-foreground text-xs font-medium px-2 py-1 rounded">
        {date}
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-white">{title}</p>
          <ArrowUpRight className="w-4 h-4 text-white" />
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-30">
        {image}
      </div>
    </div>
  );
}

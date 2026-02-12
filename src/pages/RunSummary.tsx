import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Pencil } from "lucide-react";
import { toast } from "sonner";

export default function RunSummary() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const location = useLocation();
  const runData = location.state as {
    distance: number;
    time: string;
    pace: string;
    durationSeconds: number;
  } | null;

  const [title, setTitle] = useState("Course sans titre");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [saving, setSaving] = useState(false);

  const distance = runData?.distance ?? 0;
  const time = runData?.time ?? "00:00";
  const pace = runData?.pace ?? "0'00\"";
  const durationSeconds = runData?.durationSeconds ?? 0;

  const xpEarned = Math.round(distance * 50 + durationSeconds * 0.1);
  const territory = (distance * 0.02).toFixed(2);

  const handleSave = async () => {
    if (!user) {
      toast.error("Connectez-vous pour sauvegarder");
      return;
    }
    setSaving(true);
    const { error } = await supabase.from("runs").insert({
      user_id: user.id,
      title,
      description: description || null,
      mode: "individual",
      distance_km: distance,
      duration_seconds: durationSeconds,
      avg_pace: pace,
      territory_km2: parseFloat(territory),
      xp_earned: xpEarned,
      is_public: isPublic,
    } as any);

    if (error) {
      toast.error("Erreur lors de la sauvegarde");
      console.error(error);
    } else {
      navigate(`/?saved=true&xp=${xpEarned}`);
    }
    setSaving(false);
  };

  return (
    <MobileLayout hideNav>
      <div className="min-h-screen bg-background p-4 animate-fade-in">
        {/* Map preview */}
        <div className="rounded-2xl overflow-hidden h-48 bg-muted mb-6 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-transparent to-primary/20" />
          <div className="absolute bottom-3 left-3 text-sm font-medium text-foreground">Zone parcourue</div>
        </div>

        {/* Key stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="terrun-card text-center">
            <p className="text-xs text-muted-foreground mb-1">Territoire conquis</p>
            <p className="stat-value">{territory} km²</p>
          </div>
          <div className="terrun-card text-center">
            <p className="text-xs text-muted-foreground mb-1">XP gagnés</p>
            <p className="stat-value text-primary">+{xpEarned}</p>
          </div>
        </div>

        {/* Run stats */}
        <div className="terrun-card mb-6">
          <p className="text-sm text-muted-foreground mb-3">Course individuel</p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="stat-value">{pace}</p>
              <p className="stat-label">Allure moy.</p>
            </div>
            <div>
              <p className="stat-value">{time}</p>
              <p className="stat-label">Temps</p>
            </div>
            <div>
              <p className="stat-value">{distance.toFixed(2)}</p>
              <p className="stat-label">Distance (km)</p>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="flex items-center gap-2 mb-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 bg-transparent font-semibold text-lg border-b border-border focus:outline-none focus:border-primary"
          />
          <Pencil className="w-4 h-4 text-muted-foreground" />
        </div>

        {/* Description */}
        <textarea
          placeholder="Décrivez votre course…"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-card border border-border rounded-xl p-3 text-sm mb-4 resize-none h-20 focus:outline-none focus:ring-2 focus:ring-primary"
        />

        {/* Visibility toggle */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm">Visible sur mon profil</span>
          <button
            onClick={() => setIsPublic(!isPublic)}
            className={`w-12 h-6 rounded-full transition-colors ${isPublic ? "bg-primary" : "bg-muted"}`}
          >
            <div className={`w-5 h-5 rounded-full bg-foreground transition-transform ${isPublic ? "translate-x-6" : "translate-x-0.5"}`} />
          </button>
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="terrun-btn w-full disabled:opacity-50"
        >
          {saving ? "SAUVEGARDE..." : "SAUVEGARDER L'ACTIVITÉ"}
        </button>
      </div>
    </MobileLayout>
  );
}

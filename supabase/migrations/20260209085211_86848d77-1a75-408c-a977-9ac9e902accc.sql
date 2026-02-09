
-- Profiles table (needed to link runs to users)
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  level INTEGER NOT NULL DEFAULT 1,
  total_xp INTEGER NOT NULL DEFAULT 0,
  total_distance_km NUMERIC(10,2) NOT NULL DEFAULT 0,
  total_runs INTEGER NOT NULL DEFAULT 0,
  total_time_seconds INTEGER NOT NULL DEFAULT 0,
  monthly_goal_km NUMERIC(10,2) DEFAULT 50,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- Runs table
CREATE TABLE public.runs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT DEFAULT 'Course sans titre',
  description TEXT,
  mode TEXT NOT NULL DEFAULT 'individual',
  distance_km NUMERIC(10,2) NOT NULL DEFAULT 0,
  duration_seconds INTEGER NOT NULL DEFAULT 0,
  avg_pace TEXT,
  territory_km2 NUMERIC(10,4) DEFAULT 0,
  xp_earned INTEGER NOT NULL DEFAULT 0,
  gps_trace JSONB,
  is_public BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.runs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view public runs" ON public.runs FOR SELECT USING (is_public = true OR auth.uid() = user_id);
CREATE POLICY "Users can insert own runs" ON public.runs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own runs" ON public.runs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own runs" ON public.runs FOR DELETE USING (auth.uid() = user_id);

-- Daily quests tracking
CREATE TABLE public.quest_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  quest_id TEXT NOT NULL,
  progress INTEGER NOT NULL DEFAULT 0,
  completed BOOLEAN NOT NULL DEFAULT false,
  quest_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, quest_id, quest_date)
);

ALTER TABLE public.quest_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own quests" ON public.quest_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own quests" ON public.quest_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own quests" ON public.quest_progress FOR UPDATE USING (auth.uid() = user_id);

-- Function to update profile stats after a run
CREATE OR REPLACE FUNCTION public.update_profile_after_run()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.profiles SET
    total_distance_km = total_distance_km + NEW.distance_km,
    total_runs = total_runs + 1,
    total_time_seconds = total_time_seconds + NEW.duration_seconds,
    total_xp = total_xp + NEW.xp_earned,
    updated_at = now()
  WHERE user_id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_run_inserted
  AFTER INSERT ON public.runs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_profile_after_run();

-- Updated_at trigger for profiles
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

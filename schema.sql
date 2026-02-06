-- Extensões
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela principal de usuários
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  nome TEXT,
  quiz_data JSONB NOT NULL, -- Todos dados do quiz
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP,
  total_days_active INT DEFAULT 0,
  current_streak INT DEFAULT 0
);

-- Tabela progresso diário
CREATE TABLE public.user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  peso_atual DECIMAL(5,2),
  tomou_bebida BOOLEAN DEFAULT FALSE,
  energia_nivel INT CHECK (energia_nivel BETWEEN 1 AND 10),
  anotacoes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Tabela medidas corporais
CREATE TABLE public.measurements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  peso DECIMAL(5,2),
  busto DECIMAL(5,2),
  cintura DECIMAL(5,2),
  quadril DECIMAL(5,2),
  coxa DECIMAL(5,2),
  braco DECIMAL(5,2),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela fotos progresso
CREATE TABLE public.photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  photo_url TEXT NOT NULL,
  week_number INT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela conquistas/badges
CREATE TABLE public.achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  badge_type TEXT NOT NULL, -- 'first_week', '7_days_streak', '5kg_lost', etc
  unlocked_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, badge_type)
);

-- Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.measurements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

-- Policies: Usuários só acessam próprios dados
CREATE POLICY "Users view own data" ON public.users
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "Users manage own progress" ON public.user_progress
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users manage own measurements" ON public.measurements
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users manage own photos" ON public.photos
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users manage own achievements" ON public.achievements
  FOR ALL USING (auth.uid() = user_id);

-- Storage bucket para fotos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('user-photos', 'user-photos', false)
ON CONFLICT (id) DO NOTHING;

-- Policy storage
CREATE POLICY "Users upload own photos" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'user-photos' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users view own photos" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'user-photos' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Índices para performance
CREATE INDEX idx_user_progress_user_date ON public.user_progress(user_id, date DESC);
CREATE INDEX idx_measurements_user_date ON public.measurements(user_id, date DESC);
CREATE INDEX idx_photos_user_week ON public.photos(user_id, week_number);

-- Supabase Realtime: Canlı Ziyaretçi Sayacı
-- Bu SQL'i Supabase SQL Editor'da çalıştırın.

-- Ziyaretçi oturumları tablosu
CREATE TABLE IF NOT EXISTS visitor_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL UNIQUE,
  ip_hash TEXT,
  user_agent TEXT,
  page_path TEXT DEFAULT '/',
  last_seen_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Aktif ziyaretçi view'u (son 5 dakika)
CREATE OR REPLACE VIEW active_visitors AS
SELECT COUNT(*) as count
FROM visitor_sessions
WHERE last_seen_at > NOW() - INTERVAL '5 minutes';

-- RLS (Row Level Security)
ALTER TABLE visitor_sessions ENABLE ROW LEVEL SECURITY;

-- Anon key ile okuma izni
CREATE POLICY "Allow anonymous read" ON visitor_sessions
  FOR SELECT USING (true);

-- Service role ile yazma izni
CREATE POLICY "Allow service role write" ON visitor_sessions
  FOR ALL USING (true);

-- Realtime: bu tablodaki değişiklikleri dinle
ALTER PUBLICATION supabase_realtime ADD TABLE visitor_sessions;

-- Otomatik temizlik: 30 dakikadan eski oturumları sil
CREATE OR REPLACE FUNCTION cleanup_old_sessions()
RETURNS void AS $$
BEGIN
  DELETE FROM visitor_sessions WHERE last_seen_at < NOW() - INTERVAL '30 minutes';
END;
$$ LANGUAGE plpgsql;

-- pg_cron ile periyodik temizlik (opsiyonel, Supabase'de pg_cron eklentisi varsa)
-- SELECT cron.schedule('cleanup-sessions', '*/5 * * * *', 'SELECT cleanup_old_sessions()');

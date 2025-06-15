
-- Create subscribers table to track subscription information
CREATE TABLE public.subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  stripe_customer_id TEXT,
  subscribed BOOLEAN NOT NULL DEFAULT false,
  subscription_tier TEXT,
  subscription_end TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own subscription info
CREATE POLICY "select_own_subscription" ON public.subscribers
FOR SELECT
USING (user_id = auth.uid() OR email = auth.email());

-- Create policy for edge functions to update subscription info
CREATE POLICY "update_own_subscription" ON public.subscribers
FOR UPDATE
USING (true);

-- Create policy for edge functions to insert subscription info
CREATE POLICY "insert_subscription" ON public.subscribers
FOR INSERT
WITH CHECK (true);

-- Add subscription status to profiles for easy access
ALTER TABLE public.profiles ADD COLUMN subscription_status TEXT DEFAULT 'free';
ALTER TABLE public.profiles ADD COLUMN subscription_end TIMESTAMPTZ;

-- Create content access table
CREATE TABLE public.content_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type TEXT NOT NULL, -- 'quiz', 'theory', 'solved_examples', 'short_quiz', 'exam'
  requires_subscription BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default content access rules
INSERT INTO public.content_access (content_type, requires_subscription) VALUES
('quiz', false),
('theory', false),
('solved_examples', false),
('short_quiz', true),
('exam', true);

-- Enable RLS on content_access
ALTER TABLE public.content_access ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read content access rules
CREATE POLICY "content_access_read" ON public.content_access
FOR SELECT
USING (true);


-- Create enum types for user roles and grades
CREATE TYPE user_role AS ENUM ('parent', 'student', 'admin');
CREATE TYPE grade_level AS ENUM ('K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');

-- Create profiles table for all users
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  role user_role NOT NULL,
  country TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create students table for additional student-specific information
CREATE TABLE public.students (
  id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  grade grade_level NOT NULL,
  school_name TEXT,
  subjects TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create parent_student_relationships table
CREATE TABLE public.parent_student_relationships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  relationship_type TEXT DEFAULT 'parent',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(parent_id, student_id)
);

-- Create student_progress table
CREATE TABLE public.student_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  topic TEXT NOT NULL,
  progress_type TEXT NOT NULL, -- 'theory', 'solved_examples', 'quiz', 'short_quiz', 'exam'
  score INTEGER,
  total_questions INTEGER,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parent_student_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for students
CREATE POLICY "Students can view their own data" ON public.students
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Students can update their own data" ON public.students
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for parent_student_relationships
CREATE POLICY "Parents can view their children" ON public.parent_student_relationships
  FOR SELECT USING (auth.uid() = parent_id);

CREATE POLICY "Students can view their parents" ON public.parent_student_relationships
  FOR SELECT USING (auth.uid() = student_id);

-- RLS Policies for student_progress
CREATE POLICY "Students can view their own progress" ON public.student_progress
  FOR SELECT USING (
    auth.uid() IN (SELECT id FROM public.students WHERE id = student_id)
  );

CREATE POLICY "Parents can view their children's progress" ON public.student_progress
  FOR SELECT USING (
    auth.uid() IN (
      SELECT parent_id FROM public.parent_student_relationships 
      WHERE student_id = student_progress.student_id
    )
  );

CREATE POLICY "Students can insert their own progress" ON public.student_progress
  FOR INSERT WITH CHECK (
    auth.uid() IN (SELECT id FROM public.students WHERE id = student_id)
  );

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, email, first_name, last_name, role, country)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')::user_role,
    COALESCE(NEW.raw_user_meta_data->>'country', 'UK')
  );
  
  -- If user is a student, create student record
  IF COALESCE(NEW.raw_user_meta_data->>'role', 'student') = 'student' THEN
    INSERT INTO public.students (id, grade, school_name)
    VALUES (
      NEW.id,
      COALESCE(NEW.raw_user_meta_data->>'grade', 'K')::grade_level,
      COALESCE(NEW.raw_user_meta_data->>'school_name', '')
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

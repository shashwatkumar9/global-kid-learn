
-- Create table for educational content (theory, solved examples)
CREATE TABLE public.educational_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subject TEXT NOT NULL,
  grade TEXT NOT NULL,
  curriculum TEXT NOT NULL,
  country TEXT NOT NULL,
  content_type TEXT NOT NULL CHECK (content_type IN ('theory', 'solved_examples')),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  difficulty_level TEXT DEFAULT 'beginner' CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  is_premium BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for questions (quizzes, exams, short tests)
CREATE TABLE public.questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subject TEXT NOT NULL,
  grade TEXT NOT NULL,
  curriculum TEXT NOT NULL,
  country TEXT NOT NULL,
  question_type TEXT NOT NULL CHECK (question_type IN ('quiz', 'exam', 'short_quiz')),
  question_text TEXT NOT NULL,
  options JSONB NOT NULL, -- Array of answer options
  correct_answer TEXT NOT NULL,
  explanation TEXT,
  difficulty_level TEXT DEFAULT 'beginner' CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  is_premium BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for user test results
CREATE TABLE public.test_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  subject TEXT NOT NULL,
  grade TEXT NOT NULL,
  curriculum TEXT NOT NULL,
  test_type TEXT NOT NULL CHECK (test_type IN ('quiz', 'exam', 'short_quiz')),
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  time_taken INTEGER, -- in seconds
  answers JSONB NOT NULL, -- user's answers
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies for educational_content
ALTER TABLE public.educational_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Educational content is viewable by everyone" 
  ON public.educational_content 
  FOR SELECT 
  USING (true);

-- Add RLS policies for questions
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Questions are viewable by everyone" 
  ON public.questions 
  FOR SELECT 
  USING (true);

-- Add RLS policies for test_results
ALTER TABLE public.test_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own test results" 
  ON public.test_results 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own test results" 
  ON public.test_results 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Insert sample educational content for Grade 1 Common Core subjects
INSERT INTO public.educational_content (subject, grade, curriculum, country, content_type, title, content, is_premium) VALUES
('Mathematics', 'Grade 1', 'Common Core', 'USA', 'theory', 'Introduction to Numbers 1-20', 
'Understanding numbers from 1 to 20 is fundamental for Grade 1 students. In this comprehensive lesson, we explore counting, number recognition, and basic number relationships that form the foundation of mathematical learning.

**What are Numbers?**
Numbers are symbols we use to represent quantities. For first graders, we start with the most basic numbers: 1 through 20. Each number represents a specific amount or quantity that we can count, see, and understand through concrete examples.

**Counting and Number Recognition**
Learning to count is more than just memorizing a sequence. Students need to understand that each number represents one more than the previous number. When we count 1, 2, 3, 4, 5, we are adding one more each time. This concept of "one more" is crucial for understanding number patterns and later addition concepts.

**Visual Representation**
Numbers can be represented in many ways:
- Using fingers (1 finger = 1, 2 fingers = 2, etc.)
- Counting objects like blocks, toys, or snacks
- Number lines that show the sequence from 1 to 20
- Ten frames that help visualize numbers up to 10 and beyond

**Number Relationships**
First graders learn that numbers have relationships with each other:
- Some numbers are bigger than others (5 is bigger than 3)
- Some numbers are smaller than others (2 is smaller than 7)
- Numbers come in a specific order (4 comes after 3 and before 5)

**Practical Applications**
Understanding numbers 1-20 helps students in daily life:
- Counting toys or snacks
- Understanding ages and birthdays
- Following recipes with family
- Playing number games

**Common Core Standards Alignment**
This content aligns with Common Core Standards K.CC.A.1 (Count to 100 by ones and tens) and K.CC.A.2 (Count forward from a given number within the known sequence).

**Building Number Sense**
Number sense is the ability to understand what numbers mean and how they work together. For Grade 1 students, this includes:
- Recognizing numbers in different contexts
- Understanding that numbers represent quantities
- Comparing numbers to determine which is larger or smaller
- Understanding number patterns and sequences

**Assessment and Practice**
Regular practice with number recognition and counting helps build fluency. Students should practice:
- Counting objects in their environment
- Writing numbers 1-20
- Identifying numbers when shown randomly
- Comparing sets of objects to determine "more," "less," or "equal"

This foundational knowledge prepares students for more advanced mathematical concepts including addition, subtraction, and place value understanding.', false),

('English Language Arts', 'Grade 1', 'Common Core', 'USA', 'theory', 'Phonics and Beginning Reading', 
'Phonics instruction forms the cornerstone of reading development for Grade 1 students. This comprehensive approach teaches students the relationship between letters and sounds, enabling them to decode written words and become independent readers.

**Understanding Phonics**
Phonics is the method of teaching reading by correlating sounds with letters or groups of letters. For first graders, this means learning that each letter of the alphabet has one or more sounds associated with it. This systematic approach provides students with the tools they need to sound out unfamiliar words.

**Letter-Sound Correspondence**
The foundation of phonics instruction begins with teaching students that letters represent sounds. Students learn:
- Each letter has a name (like "bee" for the letter B)
- Each letter makes one or more sounds (like /b/ for the letter B)
- These sounds can be combined to make words

**Consonant Sounds**
First graders typically start with consonant sounds because they are generally more consistent than vowel sounds:
- Single consonants: b, c, d, f, g, h, j, k, l, m, n, p, q, r, s, t, v, w, x, y, z
- Each consonant has a primary sound that students learn first
- Some consonants like "c" and "g" have multiple sounds depending on the letters that follow

**Vowel Sounds**
Vowel instruction includes both short and long vowel sounds:
- Short vowels: a (as in cat), e (as in bed), i (as in sit), o (as in hot), u (as in cup)
- Long vowels: a (as in cake), e (as in bee), i (as in kite), o (as in boat), u (as in cube)
- The concept that vowels can make different sounds depending on the word pattern

**Blending Sounds**
Once students know individual letter sounds, they learn to blend them together:
- Start with simple three-letter words (CVC pattern): cat, dog, sun
- Practice blending sounds smoothly from left to right
- Understand that blending sounds creates recognizable words

**Sight Words**
Alongside phonics instruction, students learn high-frequency sight words:
- Common words that appear frequently in texts
- Words that may not follow regular phonics patterns
- Examples include: the, and, is, you, to, have, they

**Reading Fluency Development**
Phonics instruction supports reading fluency by:
- Providing decoding strategies for unknown words
- Building confidence in independent reading
- Increasing reading speed and accuracy over time

**Common Core Alignment**
This instruction aligns with Common Core Standards including:
- RF.1.2: Demonstrate understanding of spoken words, syllables, and sounds
- RF.1.3: Know and apply grade-level phonics and word analysis skills in decoding words

**Multisensory Learning Approaches**
Effective phonics instruction engages multiple senses:
- Visual: seeing letters and words
- Auditory: hearing sounds and words
- Kinesthetic: tracing letters and manipulating letter tiles
- Tactile: feeling textured letters or writing in sand

**Assessment and Progress Monitoring**
Regular assessment helps track student progress:
- Letter sound identification assessments
- Nonsense word reading to test pure phonics skills
- Running records to monitor reading accuracy and fluency
- Observation during guided reading activities

**Home Support Strategies**
Families can support phonics learning at home:
- Reading together daily
- Playing sound games and rhyming activities
- Practicing letter sounds during daily activities
- Encouraging invented spelling during writing activities

This systematic approach to phonics provides Grade 1 students with essential tools for becoming successful, independent readers who can tackle increasingly complex texts throughout their educational journey.', false);

-- Insert sample questions for Grade 1 Mathematics
INSERT INTO public.questions (subject, grade, curriculum, country, question_type, question_text, options, correct_answer, explanation, is_premium) VALUES
('Mathematics', 'Grade 1', 'Common Core', 'USA', 'quiz', 'Count the apples in the picture. How many apples are there?', 
'["3 apples", "4 apples", "5 apples", "6 apples"]', '5 apples', 'Count each apple one by one: 1, 2, 3, 4, 5. There are 5 apples total.', false),

('Mathematics', 'Grade 1', 'Common Core', 'USA', 'quiz', 'Which number comes after 7?', 
'["6", "8", "9", "10"]', '8', 'When counting in order, the number that comes after 7 is 8. The sequence is: 6, 7, 8, 9.', false),

('Mathematics', 'Grade 1', 'Common Core', 'USA', 'exam', 'Sarah has 3 stickers. Her friend gives her 2 more stickers. How many stickers does Sarah have now?', 
'["4 stickers", "5 stickers", "6 stickers", "7 stickers"]', '5 stickers', 'Start with 3 stickers, then add 2 more: 3 + 2 = 5 stickers total.', true);

-- Insert sample questions for Grade 1 English Language Arts
INSERT INTO public.questions (subject, grade, curriculum, country, question_type, question_text, options, correct_answer, explanation, is_premium) VALUES
('English Language Arts', 'Grade 1', 'Common Core', 'USA', 'quiz', 'What sound does the letter "B" make?', 
'["/b/ as in ball", "/d/ as in dog", "/p/ as in pig", "/t/ as in top"]', '/b/ as in ball', 'The letter B makes the /b/ sound, like the beginning sound in the word "ball".', false),

('English Language Arts', 'Grade 1', 'Common Core', 'USA', 'quiz', 'Which word rhymes with "cat"?', 
'["dog", "hat", "sun", "car"]', 'hat', 'Cat and hat both end with the same -at sound, so they rhyme.', false);

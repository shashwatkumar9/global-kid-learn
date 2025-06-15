
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: string;
  question_text: string;
  options: string[];
  correct_answer: string;
  explanation: string;
  is_premium: boolean;
}

export const useQuizLogic = (subject: string, grade: string, curriculum: string) => {
  const { toast } = useToast();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuestions();
  }, [subject, grade, curriculum]);

  const loadQuestions = async () => {
    try {
      const { data } = await supabase
        .from('questions')
        .select('*')
        .eq('subject', subject)
        .eq('grade', grade)
        .eq('curriculum', curriculum)
        .eq('question_type', 'quiz')
        .order('created_at', { ascending: true });

      const transformedQuestions: Question[] = (data || []).map(question => ({
        id: question.id,
        question_text: question.question_text,
        options: Array.isArray(question.options) 
          ? question.options.map(option => String(option))
          : [],
        correct_answer: question.correct_answer,
        explanation: question.explanation || '',
        is_premium: question.is_premium || false,
      }));

      setQuestions(transformedQuestions);
    } catch (error) {
      console.error('Error loading questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (!selectedAnswer) {
      toast({
        title: "Please select an answer",
        description: "You must select an answer before proceeding.",
        variant: "destructive",
      });
      return;
    }

    const newAnswers = { ...answers, [currentQuestionIndex]: selectedAnswer };
    setAnswers(newAnswers);
    setSelectedAnswer('');

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      submitQuiz(newAnswers);
    }
  };

  const submitQuiz = async (finalAnswers: Record<number, string>) => {
    try {
      const score = questions.reduce((total, question, index) => {
        return total + (finalAnswers[index] === question.correct_answer ? 1 : 0);
      }, 0);

      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('test_results').insert({
          user_id: user.id,
          subject,
          grade,
          curriculum,
          test_type: 'quiz',
          score,
          total_questions: questions.length,
          answers: finalAnswers,
        });
      }

      setShowResults(true);
      
      toast({
        title: "Quiz Completed!",
        description: `You scored ${score} out of ${questions.length} questions.`,
      });
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  const calculateScore = () => {
    return questions.reduce((total, question, index) => {
      return total + (answers[index] === question.correct_answer ? 1 : 0);
    }, 0);
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setSelectedAnswer('');
    setShowResults(false);
  };

  return {
    questions,
    currentQuestionIndex,
    selectedAnswer,
    answers,
    showResults,
    quizStarted,
    loading,
    currentQuestion: questions[currentQuestionIndex],
    startQuiz,
    handleAnswerSelect,
    handleNextQuestion,
    calculateScore,
    resetQuiz,
  };
};


import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { ContentAccess } from "@/components/ContentAccess";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, XCircle, RotateCcw, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: string;
  question_text: string;
  options: string[];
  correct_answer: string;
  explanation: string;
  is_premium: boolean;
}

const SubjectGradeCurriculumQuizPage = () => {
  const { subjectName, gradeName, curriculumName } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [loading, setLoading] = useState(true);

  const formatName = (name: string | undefined) => 
    name?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || '';

  const subject = formatName(subjectName);
  const grade = formatName(gradeName);
  const curriculum = formatName(curriculumName);

  useEffect(() => {
    loadQuestions();
  }, [subjectName, gradeName, curriculumName]);

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

      // Transform the data to match our Question interface
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

      // Save test result if user is logged in
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading quiz questions...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate(`/subjects/${subjectName}/grades/${gradeName}/curriculums/${curriculumName}`)} 
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Course</span>
          </Button>
        </div>

        <ContentAccess contentType="quiz">
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                {subject} Quiz - {grade}
              </h1>
              <p className="text-xl text-gray-600">
                Test your knowledge of {curriculum} curriculum concepts
              </p>
            </div>

            {!quizStarted && !showResults && (
              <Card>
                <CardHeader>
                  <CardTitle>Quiz Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">{questions.length}</div>
                        <p className="text-gray-600">Questions</p>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">10-15</div>
                        <p className="text-gray-600">Minutes</p>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-600">Free</div>
                        <p className="text-gray-600">Access</p>
                      </div>
                    </div>
                    <Button onClick={startQuiz} className="w-full" size="lg">
                      Start Quiz
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {quizStarted && !showResults && currentQuestion && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Question {currentQuestionIndex + 1} of {questions.length}</CardTitle>
                    <Badge variant={currentQuestion.is_premium ? "default" : "secondary"}>
                      {currentQuestion.is_premium ? "Premium" : "Free"}
                    </Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold">{currentQuestion.question_text}</h3>
                    <div className="space-y-3">
                      {currentQuestion.options.map((option, index) => (
                        <Button
                          key={index}
                          variant={selectedAnswer === option ? "default" : "outline"}
                          onClick={() => handleAnswerSelect(option)}
                          className="w-full text-left justify-start h-auto py-4"
                        >
                          <span className="mr-3 w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm">
                            {String.fromCharCode(65 + index)}
                          </span>
                          {option}
                        </Button>
                      ))}
                    </div>
                    <Button 
                      onClick={handleNextQuestion} 
                      className="w-full"
                      disabled={!selectedAnswer}
                    >
                      {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {showResults && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="w-6 h-6 text-yellow-500" />
                    <span>Quiz Results</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-600 mb-2">
                        {calculateScore()} / {questions.length}
                      </div>
                      <p className="text-xl text-gray-600">
                        {Math.round((calculateScore() / questions.length) * 100)}% Correct
                      </p>
                    </div>

                    <div className="space-y-4">
                      {questions.map((question, index) => (
                        <div key={question.id} className="border rounded-lg p-4">
                          <div className="flex items-start space-x-3">
                            {answers[index] === question.correct_answer ? (
                              <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-500 mt-1" />
                            )}
                            <div className="flex-1">
                              <h4 className="font-semibold mb-2">{question.question_text}</h4>
                              <div className="text-sm space-y-1">
                                <p><strong>Your answer:</strong> {answers[index]}</p>
                                <p><strong>Correct answer:</strong> {question.correct_answer}</p>
                                {question.explanation && (
                                  <p className="text-gray-600 mt-2">{question.explanation}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex space-x-4">
                      <Button onClick={resetQuiz} variant="outline" className="flex-1 flex items-center space-x-2">
                        <RotateCcw className="w-4 h-4" />
                        <span>Retake Quiz</span>
                      </Button>
                      <Button 
                        onClick={() => navigate(`/subjects/${subjectName}/grades/${gradeName}/curriculums/${curriculumName}/theory`)}
                        className="flex-1"
                      >
                        Review Theory
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {questions.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No Quiz Questions Available</h3>
                  <p className="text-gray-500">Quiz questions for this combination are coming soon.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </ContentAccess>
      </div>
    </div>
  );
};

export default SubjectGradeCurriculumQuizPage;

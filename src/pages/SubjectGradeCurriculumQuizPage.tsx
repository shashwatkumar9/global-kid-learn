
import { useParams, useNavigate } from 'react-router-dom';
import { ContentAccess } from "@/components/ContentAccess";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useQuizLogic } from "@/hooks/useQuizLogic";
import { QuizOverview } from "@/components/quiz/QuizOverview";
import { QuizQuestion } from "@/components/quiz/QuizQuestion";
import { QuizResults } from "@/components/quiz/QuizResults";
import { EmptyQuizState } from "@/components/quiz/EmptyQuizState";

const SubjectGradeCurriculumQuizPage = () => {
  const { subjectName, gradeName, curriculumName } = useParams();
  const navigate = useNavigate();

  const formatName = (name: string | undefined) => 
    name?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || '';

  const subject = formatName(subjectName);
  const grade = formatName(gradeName);
  const curriculum = formatName(curriculumName);

  const {
    questions,
    currentQuestionIndex,
    selectedAnswer,
    answers,
    showResults,
    quizStarted,
    loading,
    currentQuestion,
    startQuiz,
    handleAnswerSelect,
    handleNextQuestion,
    calculateScore,
    resetQuiz,
  } = useQuizLogic(subject, grade, curriculum);

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

            {!quizStarted && !showResults && questions.length > 0 && (
              <QuizOverview questionsCount={questions.length} onStartQuiz={startQuiz} />
            )}

            {quizStarted && !showResults && currentQuestion && (
              <QuizQuestion
                question={currentQuestion}
                currentIndex={currentQuestionIndex}
                totalQuestions={questions.length}
                selectedAnswer={selectedAnswer}
                onAnswerSelect={handleAnswerSelect}
                onNext={handleNextQuestion}
              />
            )}

            {showResults && (
              <QuizResults
                questions={questions}
                answers={answers}
                score={calculateScore()}
                onRetake={resetQuiz}
                onReviewTheory={() => navigate(`/subjects/${subjectName}/grades/${gradeName}/curriculums/${curriculumName}/theory`)}
              />
            )}

            {questions.length === 0 && <EmptyQuizState />}
          </div>
        </ContentAccess>
      </div>
    </div>
  );
};

export default SubjectGradeCurriculumQuizPage;

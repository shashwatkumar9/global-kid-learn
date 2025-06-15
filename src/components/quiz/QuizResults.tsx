
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, RotateCcw, Trophy } from "lucide-react";

interface Question {
  id: string;
  question_text: string;
  options: string[];
  correct_answer: string;
  explanation: string;
  is_premium: boolean;
}

interface QuizResultsProps {
  questions: Question[];
  answers: Record<number, string>;
  score: number;
  onRetake: () => void;
  onReviewTheory: () => void;
}

export const QuizResults = ({
  questions,
  answers,
  score,
  onRetake,
  onReviewTheory,
}: QuizResultsProps) => {
  return (
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
              {score} / {questions.length}
            </div>
            <p className="text-xl text-gray-600">
              {Math.round((score / questions.length) * 100)}% Correct
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
            <Button onClick={onRetake} variant="outline" className="flex-1 flex items-center space-x-2">
              <RotateCcw className="w-4 h-4" />
              <span>Retake Quiz</span>
            </Button>
            <Button onClick={onReviewTheory} className="flex-1">
              Review Theory
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

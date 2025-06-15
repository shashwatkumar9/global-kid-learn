
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Question {
  id: string;
  question_text: string;
  options: string[];
  correct_answer: string;
  explanation: string;
  is_premium: boolean;
}

interface QuizQuestionProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedAnswer: string;
  onAnswerSelect: (answer: string) => void;
  onNext: () => void;
}

export const QuizQuestion = ({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
  onNext,
}: QuizQuestionProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Question {currentIndex + 1} of {totalQuestions}</CardTitle>
          <Badge variant={question.is_premium ? "default" : "secondary"}>
            {question.is_premium ? "Premium" : "Free"}
          </Badge>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">{question.question_text}</h3>
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswer === option ? "default" : "outline"}
                onClick={() => onAnswerSelect(option)}
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
            onClick={onNext} 
            className="w-full"
            disabled={!selectedAnswer}
          >
            {currentIndex === totalQuestions - 1 ? 'Finish Quiz' : 'Next Question'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

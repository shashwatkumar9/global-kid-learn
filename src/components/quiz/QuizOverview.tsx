
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface QuizOverviewProps {
  questionsCount: number;
  onStartQuiz: () => void;
}

export const QuizOverview = ({ questionsCount, onStartQuiz }: QuizOverviewProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quiz Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{questionsCount}</div>
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
          <Button onClick={onStartQuiz} className="w-full" size="lg">
            Start Quiz
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

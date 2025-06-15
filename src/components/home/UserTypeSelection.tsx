
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BookOpen, Users } from "lucide-react";

export const UserTypeSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
      <Card className="text-center p-8 hover:shadow-lg transition-shadow">
        <CardHeader>
          <BookOpen className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <CardTitle className="text-2xl">For Students</CardTitle>
          <CardDescription className="text-lg">
            Access learning materials, take quizzes, and track your progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            size="lg" 
            className="w-full" 
            onClick={() => navigate("/auth")}
          >
            Start Learning
          </Button>
        </CardContent>
      </Card>

      <Card className="text-center p-8 hover:shadow-lg transition-shadow">
        <CardHeader>
          <Users className="w-16 h-16 text-purple-500 mx-auto mb-4" />
          <CardTitle className="text-2xl">For Parents</CardTitle>
          <CardDescription className="text-lg">
            Monitor your child's progress and manage their learning journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            size="lg" 
            className="w-full" 
            onClick={() => navigate("/auth")}
          >
            Parent Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

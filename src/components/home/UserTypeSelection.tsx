
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BookOpen, Users, Crown, Lock } from "lucide-react";

export const UserTypeSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
      <Card className="text-center p-8 hover:shadow-lg transition-shadow border-2 border-blue-200">
        <CardHeader>
          <Users className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <CardTitle className="text-2xl flex items-center justify-center space-x-2">
            <span>For Parents</span>
            <Crown className="w-6 h-6 text-yellow-500" />
          </CardTitle>
          <CardDescription className="text-lg">
            Subscribe to unlock premium features and create child accounts with progress tracking
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">What you get:</h3>
            <ul className="text-sm text-blue-700 space-y-1 text-left">
              <li>• Create unlimited child accounts</li>
              <li>• Access to all premium content</li>
              <li>• Detailed progress tracking</li>
              <li>• Advanced quizzes and exams</li>
              <li>• Parent dashboard</li>
            </ul>
          </div>
          <Button 
            size="lg" 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600" 
            onClick={() => navigate("/auth?type=parent")}
          >
            Start with Subscription
          </Button>
        </CardContent>
      </Card>

      <Card className="text-center p-8 hover:shadow-lg transition-shadow border-2 border-gray-200 relative">
        <div className="absolute top-4 right-4">
          <Lock className="w-5 h-5 text-gray-400" />
        </div>
        <CardHeader>
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <CardTitle className="text-2xl text-gray-600">For Students</CardTitle>
          <CardDescription className="text-lg text-gray-500">
            Student accounts are created by parents after subscription
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">Student features:</h3>
            <ul className="text-sm text-gray-600 space-y-1 text-left">
              <li>• Access learning materials</li>
              <li>• Take interactive quizzes</li>
              <li>• Track personal progress</li>
              <li>• Complete assignments</li>
              <li>• View achievements</li>
            </ul>
          </div>
          <Button 
            size="lg" 
            className="w-full" 
            variant="outline"
            onClick={() => navigate("/auth?type=student")}
          >
            <Lock className="w-4 h-4 mr-2" />
            Student Login
          </Button>
          <p className="text-xs text-gray-500">
            Login credentials provided by parent after subscription
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

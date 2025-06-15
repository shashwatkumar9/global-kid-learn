
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { 
  BookOpen, 
  Timer,
  Calculator,
  Lightbulb,
  Crown,
  Lock,
  FileText
} from "lucide-react";

export const ContentCategories = () => {
  const navigate = useNavigate();
  const { subscribed } = useSubscription();

  const contentCategories = [
    {
      title: "Quiz",
      description: "Interactive quizzes to test your knowledge",
      icon: Calculator,
      color: "bg-blue-500",
      route: "/quiz",
      free: true
    },
    {
      title: "Theory",
      description: "Comprehensive theory lessons and concepts",
      icon: BookOpen,
      color: "bg-green-500",
      route: "/theory",
      free: true
    },
    {
      title: "Solved Examples",
      description: "Step-by-step solutions and examples",
      icon: Lightbulb,
      color: "bg-yellow-500",
      route: "/solved-examples",
      free: true
    },
    {
      title: "Short Tests",
      description: "Quick assessment tests (15 minutes)",
      icon: Timer,
      color: "bg-orange-500",
      route: "/short-quiz",
      free: false
    },
    {
      title: "Exams",
      description: "Full exam simulations (60 minutes)",
      icon: FileText,
      color: "bg-purple-500",
      route: "/exam",
      free: false
    }
  ];

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-center mb-8">Learning Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contentCategories.map((category) => {
          const IconComponent = category.icon;
          const isPremium = !category.free;
          const hasAccess = category.free || subscribed;
          
          return (
            <Card 
              key={category.title}
              className={`hover:shadow-lg transition-shadow cursor-pointer ${
                isPremium && !subscribed ? 'border-yellow-200' : ''
              }`}
              onClick={() => navigate(category.route)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  {isPremium && (
                    <div className="flex items-center space-x-1">
                      {subscribed ? (
                        <Crown className="w-4 h-4 text-yellow-500" />
                      ) : (
                        <Lock className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  )}
                </div>
                <CardTitle className="flex items-center justify-between">
                  <span>{category.title}</span>
                  {isPremium && !subscribed && (
                    <Badge variant="outline">Premium</Badge>
                  )}
                </CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full" 
                  variant={hasAccess ? "default" : "outline"}
                >
                  {hasAccess ? "Start Learning" : "Upgrade Required"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

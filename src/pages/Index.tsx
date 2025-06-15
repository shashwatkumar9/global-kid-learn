
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { 
  BookOpen, 
  Users, 
  GraduationCap, 
  LogIn, 
  UserCheck,
  Crown,
  Lock,
  FileText,
  Timer,
  Calculator,
  Lightbulb
} from "lucide-react";

const Index = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();
  const { subscribed, subscriptionTier } = useSubscription();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    
    if (user) {
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      setProfile(profileData);
    }
  };

  const handleDashboardNavigation = () => {
    if (profile?.role === "student") {
      navigate("/student-dashboard");
    } else if (profile?.role === "parent") {
      navigate("/parent-dashboard");
    } else if (profile?.role === "admin") {
      navigate("/admin-panel");
    }
  };

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                K12Expert
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  {subscribed && (
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center space-x-1">
                      <Crown className="w-3 h-3" />
                      <span>Premium</span>
                    </Badge>
                  )}
                  <span className="text-sm text-gray-600">
                    Welcome, {profile?.first_name}!
                  </span>
                  <Button onClick={handleDashboardNavigation} size="sm">
                    <UserCheck className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => navigate("/subscription")}
                  >
                    {subscribed ? "Manage" : "Upgrade"}
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button variant="outline" onClick={() => navigate("/auth")} size="sm">
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                  <Button onClick={() => navigate("/subscription")} size="sm">
                    Subscribe
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Master K-12 Learning
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Comprehensive learning platform with interactive quizzes, theory lessons, and practice exams 
            for students from Kindergarten to Grade 12.
          </p>
          
          {!user && (
            <div className="flex justify-center space-x-4">
              <Button 
                size="lg" 
                onClick={() => navigate("/auth")}
                className="bg-gradient-to-r from-blue-600 to-purple-600"
              >
                Get Started Free
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => navigate("/subscription")}
              >
                View Plans
              </Button>
            </div>
          )}
        </div>

        {/* Content Categories */}
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

        {/* User Type Selection */}
        {!user && (
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
        )}

        {/* Features Section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-center mb-8">Why Choose K12Expert?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2">Comprehensive Content</h4>
              <p className="text-gray-600">Theory, examples, quizzes, and exams for all K-12 grades</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold mb-2">Progress Tracking</h4>
              <p className="text-gray-600">Monitor learning progress with detailed analytics</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold mb-2">Parent Dashboard</h4>
              <p className="text-gray-600">Parents can monitor and manage their children's learning</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;

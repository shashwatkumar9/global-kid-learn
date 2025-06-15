
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, 
  Trophy, 
  Clock, 
  BarChart3, 
  LogOut,
  User,
  GraduationCap,
  Globe
} from "lucide-react";

const StudentDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [studentData, setStudentData] = useState<any>(null);
  const [progress, setProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      setUser(user);

      // Get profile data
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileData?.role !== "student") {
        navigate("/");
        return;
      }

      setProfile(profileData);

      // Get student specific data
      const { data: studentInfo } = await supabase
        .from("students")
        .select("*")
        .eq("id", user.id)
        .single();

      setStudentData(studentInfo);

      // Get progress data
      const { data: progressData } = await supabase
        .from("student_progress")
        .select("*")
        .eq("student_id", user.id)
        .order("created_at", { ascending: false });

      setProgress(progressData || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const subjects = ["Mathematics", "Science", "English", "History", "Geography"];
  const progressTypes = ["Theory", "Solved Examples", "Quizzes", "Short Tests", "Exams"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Student Dashboard</h1>
                <p className="text-xs text-gray-500">Welcome back, {profile?.first_name}!</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="flex items-center space-x-1">
                <Globe className="w-3 h-3" />
                <span>{profile?.country}</span>
              </Badge>
              <Badge variant="outline">Grade {studentData?.grade}</Badge>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white mb-8">
          <h2 className="text-2xl font-bold mb-2">Hello, {profile?.first_name}!</h2>
          <p className="text-blue-100">Ready to continue your learning journey?</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Progress</p>
                  <p className="text-2xl font-bold">{progress.length}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed Quizzes</p>
                  <p className="text-2xl font-bold">{progress.filter(p => p.progress_type === 'quiz').length}</p>
                </div>
                <Trophy className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Study Hours</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <Clock className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Current Grade</p>
                  <p className="text-2xl font-bold">{studentData?.grade}</p>
                </div>
                <BookOpen className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Available Subjects */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Available Subjects</span>
              </CardTitle>
              <CardDescription>Choose a subject to start learning</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {subjects.map((subject) => (
                <div key={subject} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <span className="font-medium">{subject}</span>
                  <Button size="sm" variant="outline">
                    Start Learning
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Learning Materials */}
          <Card>
            <CardHeader>
              <CardTitle>Learning Materials</CardTitle>
              <CardDescription>Access different types of learning content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {progressTypes.map((type) => (
                <div key={type} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <span className="font-medium">{type}</span>
                  <Button size="sm" variant="outline">
                    Access
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Progress */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Progress</CardTitle>
              <CardDescription>Your latest learning activities</CardDescription>
            </CardHeader>
            <CardContent>
              {progress.length > 0 ? (
                <div className="space-y-4">
                  {progress.slice(0, 5).map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{item.subject} - {item.topic}</h4>
                        <p className="text-sm text-gray-600">{item.progress_type}</p>
                      </div>
                      <div className="text-right">
                        {item.score && item.total_questions && (
                          <div className="space-y-1">
                            <p className="text-sm font-medium">
                              {item.score}/{item.total_questions}
                            </p>
                            <Progress 
                              value={(item.score / item.total_questions) * 100} 
                              className="w-20"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">
                  No progress recorded yet. Start learning to see your progress here!
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;


import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  UserPlus, 
  BarChart3, 
  LogOut,
  GraduationCap,
  Globe,
  Calendar,
  Trophy
} from "lucide-react";

const ParentDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [children, setChildren] = useState<any[]>([]);
  const [childProgress, setChildProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [connectingChild, setConnectingChild] = useState(false);
  const [childEmail, setChildEmail] = useState("");
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

      if (profileData?.role !== "parent") {
        navigate("/");
        return;
      }

      setProfile(profileData);

      // Get children data
      const { data: relationships } = await supabase
        .from("parent_student_relationships")
        .select(`
          *,
          students (
            *,
            profiles (*)
          )
        `)
        .eq("parent_id", user.id);

      const childrenData = relationships?.map(rel => ({
        ...rel.students,
        profile: rel.students.profiles
      })) || [];

      setChildren(childrenData);

      // Get progress for all children
      if (childrenData.length > 0) {
        const childIds = childrenData.map(child => child.id);
        const { data: progressData } = await supabase
          .from("student_progress")
          .select("*")
          .in("student_id", childIds)
          .order("created_at", { ascending: false });

        setChildProgress(progressData || []);
      }
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

  const connectChild = async (e: React.FormEvent) => {
    e.preventDefault();
    setConnectingChild(true);

    try {
      // Find student by email
      const { data: studentProfile } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", childEmail)
        .eq("role", "student")
        .single();

      if (!studentProfile) {
        toast({
          title: "Student not found",
          description: "No student account found with this email address.",
          variant: "destructive",
        });
        return;
      }

      // Check if relationship already exists
      const { data: existing } = await supabase
        .from("parent_student_relationships")
        .select("id")
        .eq("parent_id", user.id)
        .eq("student_id", studentProfile.id)
        .single();

      if (existing) {
        toast({
          title: "Already connected",
          description: "This student is already connected to your account.",
          variant: "destructive",
        });
        return;
      }

      // Create relationship
      const { error } = await supabase
        .from("parent_student_relationships")
        .insert({
          parent_id: user.id,
          student_id: studentProfile.id
        });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Student has been connected to your account.",
      });

      setChildEmail("");
      getUser(); // Refresh data
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setConnectingChild(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Parent Dashboard</h1>
                <p className="text-xs text-gray-500">Welcome back, {profile?.first_name}!</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="flex items-center space-x-1">
                <Globe className="w-3 h-3" />
                <span>{profile?.country}</span>
              </Badge>
              <Badge variant="outline">{children.length} Children</Badge>
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
          <p className="text-blue-100">Monitor your children's learning progress and achievements.</p>
        </div>

        {/* Connect Child Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <UserPlus className="h-5 w-5" />
              <span>Connect a Child</span>
            </CardTitle>
            <CardDescription>
              Enter your child's email address to connect their account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={connectChild} className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="childEmail">Child's Email Address</Label>
                <Input
                  id="childEmail"
                  type="email"
                  value={childEmail}
                  onChange={(e) => setChildEmail(e.target.value)}
                  placeholder="Enter child's email"
                  required
                />
              </div>
              <div className="flex items-end">
                <Button type="submit" disabled={connectingChild}>
                  {connectingChild ? "Connecting..." : "Connect Child"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Children Overview */}
        {children.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {children.map((child) => {
              const childProgressData = childProgress.filter(p => p.student_id === child.id);
              const totalActivities = childProgressData.length;
              const quizzes = childProgressData.filter(p => p.progress_type === 'quiz').length;
              const avgScore = childProgressData.length > 0 
                ? childProgressData.reduce((sum, p) => sum + (p.score || 0), 0) / childProgressData.length 
                : 0;

              return (
                <Card key={child.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <GraduationCap className="h-5 w-5" />
                      <span>{child.profile.first_name} {child.profile.last_name}</span>
                    </CardTitle>
                    <CardDescription>
                      Grade {child.grade} • {child.school_name || "No school specified"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <p className="text-2xl font-bold text-blue-600">{totalActivities}</p>
                          <p className="text-sm text-gray-600">Total Activities</p>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <p className="text-2xl font-bold text-green-600">{quizzes}</p>
                          <p className="text-sm text-gray-600">Quizzes Completed</p>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Average Score</span>
                          <span className="text-sm text-gray-600">{avgScore.toFixed(1)}%</span>
                        </div>
                        <Progress value={avgScore} className="h-2" />
                      </div>

                      <Button className="w-full" variant="outline">
                        View Detailed Progress
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Children Connected</h3>
              <p className="text-gray-600 mb-4">
                Connect your children's accounts to start monitoring their progress.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Recent Activity */}
        {childProgress.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Recent Activity</span>
              </CardTitle>
              <CardDescription>Latest learning activities from all your children</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {childProgress.slice(0, 10).map((activity) => {
                  const child = children.find(c => c.id === activity.student_id);
                  return (
                    <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Trophy className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">
                            {child?.profile.first_name} completed {activity.progress_type}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {activity.subject} - {activity.topic}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        {activity.score && activity.total_questions && (
                          <div className="space-y-1">
                            <p className="text-sm font-medium">
                              {activity.score}/{activity.total_questions}
                            </p>
                            <Badge variant="outline">
                              {Math.round((activity.score / activity.total_questions) * 100)}%
                            </Badge>
                          </div>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(activity.completed_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default ParentDashboard;

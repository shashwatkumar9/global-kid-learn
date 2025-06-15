import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateChildAccount } from "@/components/CreateChildAccount";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Users, 
  UserPlus, 
  TrendingUp, 
  Crown,
  Lock,
  CreditCard
} from "lucide-react";

const ParentDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [children, setChildren] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { subscribed, subscriptionTier, checkSubscription } = useSubscription();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
    if (subscribed) {
      getChildren();
    }
  }, [subscribed]);

  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/auth?type=parent");
      return;
    }
    setUser(user);
    
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    setProfile(profileData);
    setLoading(false);
  };

  const getChildren = async () => {
    if (!user) return;
    
    try {
      // Get children linked to this parent
      const { data: relationships } = await supabase
        .from("parent_student_relationships")
        .select(`
          student_id,
          students (
            id,
            grade,
            school_name,
            profiles (
              first_name,
              last_name,
              username
            )
          )
        `)
        .eq("parent_id", user.id);
      
      setChildren(relationships || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load children data",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate("/")} className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Parent Dashboard
              </h1>
              <p className="text-gray-600">Welcome back, {profile?.first_name}!</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {subscribed && (
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center space-x-1">
                <Crown className="w-3 h-3" />
                <span>{subscriptionTier || 'Premium'}</span>
              </Badge>
            )}
            <Button variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>

        {/* Subscription Status */}
        {!subscribed ? (
          <Card className="mb-8 border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-orange-800">
                <Lock className="w-5 h-5" />
                <span>Subscription Required</span>
              </CardTitle>
              <CardDescription className="text-orange-700">
                You need an active subscription to create child accounts and access premium features.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button 
                  onClick={() => navigate("/subscription")} 
                  className="bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Subscribe Now
                </Button>
                <Button onClick={checkSubscription} variant="outline">
                  Refresh Status
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="mb-8 border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-800">
                <Crown className="w-5 h-5" />
                <span>Premium Access Active</span>
              </CardTitle>
              <CardDescription className="text-green-700">
                You have full access to all features. Create child accounts and track their progress.
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        {/* Main Content */}
        <Tabs defaultValue="children" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="children">My Children</TabsTrigger>
            <TabsTrigger value="progress">Progress Overview</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="children" className="space-y-6">
            {subscribed ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Create Child Account */}
                <CreateChildAccount onChildCreated={getChildren} />
                
                {/* Existing Children */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="h-5 w-5" />
                      <span>Your Children ({children.length})</span>
                    </CardTitle>
                    <CardDescription>
                      Manage your children's accounts and view their progress
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {children.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <UserPlus className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                        <p>No children accounts yet</p>
                        <p className="text-sm">Create your first child account to get started</p>
                      </div>
                    ) : (
                      children.map((relationship: any) => {
                        const student = relationship.students;
                        const studentProfile = student.profiles;
                        return (
                          <Card key={student.id} className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-semibold">
                                  {studentProfile.first_name} {studentProfile.last_name}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  Username: {studentProfile.username}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Grade: {student.grade === "K" ? "Kindergarten" : `Grade ${student.grade}`}
                                </p>
                                {student.school_name && (
                                  <p className="text-sm text-gray-600">
                                    School: {student.school_name}
                                  </p>
                                )}
                              </div>
                              <Button size="sm" variant="outline">
                                <TrendingUp className="w-4 h-4 mr-2" />
                                View Progress
                              </Button>
                            </div>
                          </Card>
                        );
                      })
                    )}
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="text-center py-12">
                <Lock className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Subscription Required</h3>
                <p className="text-gray-500 mb-6">Subscribe to create child accounts and access all features</p>
                <Button 
                  onClick={() => navigate("/subscription")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Subscribe Now
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle>Progress Overview</CardTitle>
                <CardDescription>
                  Track your children's learning progress across all subjects
                </CardDescription>
              </CardHeader>
              <CardContent>
                {subscribed ? (
                  <div className="text-center py-8 text-gray-500">
                    <TrendingUp className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    <p>Progress tracking will appear here</p>
                    <p className="text-sm">Create child accounts to start tracking progress</p>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Lock className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    <p className="text-gray-500">Subscribe to view progress tracking</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account and subscription settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    onClick={() => navigate("/subscription")} 
                    variant="outline"
                    className="justify-start"
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Manage Subscription
                  </Button>
                  <Button 
                    onClick={checkSubscription} 
                    variant="outline"
                    className="justify-start"
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Refresh Status
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ParentDashboard;

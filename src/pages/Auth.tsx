
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Users, BookOpen, ArrowLeft, Crown, Lock, AlertCircle } from "lucide-react";

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [searchParams] = useSearchParams();
  const userType = searchParams.get("type") || "parent";
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    firstName: "",
    lastName: "",
    country: "UK",
    grade: "K",
    schoolName: ""
  });

  const countries = [
    "UK", "Ireland", "USA", "India", "South Africa", "Germany", 
    "Netherlands", "Canada", "Australia", "New Zealand", "UAE", 
    "Saudi Arabia", "Singapore", "France", "Italy", "Brazil", 
    "Nigeria", "Ghana", "Tanzania", "Egypt"
  ];

  const grades = ["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        // For parents, redirect to subscription after signup
        if (userType === "parent") {
          const metadata = {
            username: formData.username,
            first_name: formData.firstName,
            last_name: formData.lastName,
            role: "parent",
            country: formData.country,
          };

          const { error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
              data: metadata,
              emailRedirectTo: `${window.location.origin}/subscription`
            }
          });

          if (error) throw error;

          toast({
            title: "Account Created!",
            description: "Please check your email to verify your account, then you'll be redirected to subscribe.",
          });
        } else {
          // Students cannot sign up directly
          toast({
            title: "Student Registration Not Available",
            description: "Student accounts must be created by a parent with an active subscription.",
            variant: "destructive"
          });
        }
      } else {
        // Sign in flow
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        toast({
          title: "Welcome back!",
          description: "Successfully signed in.",
        });

        navigate("/");
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-4 flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Button>

        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              {userType === "parent" ? (
                <>
                  <Users className="w-6 h-6 text-blue-600" />
                  <Crown className="w-5 h-5 text-yellow-500" />
                </>
              ) : (
                <>
                  <BookOpen className="w-6 h-6 text-purple-600" />
                  <Lock className="w-5 h-5 text-gray-400" />
                </>
              )}
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {userType === "parent" ? "Parent Access" : "Student Access"}
            </CardTitle>
            <CardDescription>
              {userType === "parent" 
                ? (isSignUp ? "Create account and subscribe for premium features" : "Sign in to manage your children's learning")
                : "Access your learning materials and track progress"
              }
            </CardDescription>
          </CardHeader>

          <CardContent>
            {userType === "student" && isSignUp && (
              <Alert className="mb-6 border-orange-200 bg-orange-50">
                <AlertCircle className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-orange-800">
                  Student accounts are created by parents after subscription. Please ask your parent to create your account.
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleAuth} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="Enter your password"
                  required
                />
              </div>

              {isSignUp && userType === "parent" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={formData.username}
                      onChange={(e) => setFormData({...formData, username: e.target.value})}
                      placeholder="Choose a username"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        placeholder="First name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        placeholder="Last name"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select value={formData.country} onValueChange={(value) => setFormData({...formData, country: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country} value={country}>{country}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading || (userType === "student" && isSignUp)}
              >
                {loading ? "Please wait..." : 
                  userType === "parent" 
                    ? (isSignUp ? "Create Account & Subscribe" : "Sign In") 
                    : (isSignUp ? "Registration Not Available" : "Sign In")
                }
              </Button>
            </form>

            <div className="mt-6 text-center">
              {userType === "parent" && (
                <Button
                  variant="link"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-sm"
                >
                  {isSignUp 
                    ? "Already have an account? Sign in" 
                    : "Don't have an account? Sign up"
                  }
                </Button>
              )}
              
              {userType === "student" && (
                <div className="space-y-2">
                  {!isSignUp && (
                    <Button
                      variant="link"
                      onClick={() => setIsSignUp(true)}
                      className="text-sm text-gray-500"
                    >
                      Don't have credentials? Ask your parent
                    </Button>
                  )}
                  <Button
                    variant="link"
                    onClick={() => navigate("/auth?type=parent")}
                    className="text-sm"
                  >
                    Are you a parent? Click here
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;

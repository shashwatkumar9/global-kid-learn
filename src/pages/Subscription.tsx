
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Crown, Users, BookOpen, BarChart3, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Subscription = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth?type=parent");
        return;
      }
      setUser(user);
      
      // Check subscription status
      try {
        const { data, error } = await supabase.functions.invoke('check-subscription');
        if (!error && data) {
          setIsSubscribed(data.subscribed);
        }
      } catch (error) {
        console.error('Error checking subscription:', error);
      }
    };
    
    checkUser();
  }, [navigate]);

  const handleSubscribe = async () => {
    if (!user) {
      navigate("/auth?type=parent");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout');
      
      if (error) throw error;
      
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create checkout session. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      
      if (error) throw error;
      
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to open customer portal. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const features = [
    "Unlimited child/student accounts",
    "Access to all premium content",
    "Advanced quizzes and assessments",
    "Detailed progress tracking",
    "Parent dashboard with analytics",
    "Priority customer support",
    "No advertisements",
    "Offline content download"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Crown className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            K12Expert Premium
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Unlock the full potential of your child's education with our comprehensive learning platform
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Pricing Card */}
          <Card className="border-2 border-blue-200 shadow-lg">
            <CardHeader className="text-center pb-2">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Crown className="h-8 w-8 text-yellow-500" />
                <CardTitle className="text-2xl">Premium Plan</CardTitle>
              </div>
              <div className="text-center">
                <span className="text-4xl font-bold text-blue-600">$29.99</span>
                <span className="text-gray-600">/month</span>
              </div>
              <CardDescription className="text-center mt-2">
                Everything you need for comprehensive K-12 education
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3 mb-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              {isSubscribed ? (
                <div className="space-y-3">
                  <Badge className="w-full py-2 bg-green-100 text-green-800 justify-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Currently Subscribed
                  </Badge>
                  <Button 
                    onClick={handleManageSubscription} 
                    disabled={loading}
                    className="w-full"
                    variant="outline"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : null}
                    Manage Subscription
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={handleSubscribe} 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  size="lg"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Crown className="w-5 h-5 mr-2" />
                  )}
                  {loading ? "Processing..." : "Subscribe Now"}
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Benefits Card */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-6 w-6 text-blue-600" />
                <span>Why Choose Premium?</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start space-x-3">
                <Users className="h-8 w-8 text-blue-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Multiple Children</h3>
                  <p className="text-gray-600 text-sm">Create accounts for all your children and track their individual progress.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <BookOpen className="h-8 w-8 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Comprehensive Content</h3>
                  <p className="text-gray-600 text-sm">Access to all subjects, grades, and curricula from multiple countries.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <BarChart3 className="h-8 w-8 text-purple-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Advanced Analytics</h3>
                  <p className="text-gray-600 text-sm">Detailed insights into your child's learning patterns and progress.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Money Back Guarantee */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">30-Day Money Back Guarantee</h3>
            <p className="text-gray-600">
              Try K12Expert Premium risk-free. If you're not completely satisfied, get a full refund within 30 days.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Subscription;

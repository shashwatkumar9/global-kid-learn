
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { 
  Check, 
  Crown, 
  ArrowLeft,
  Loader2,
  RefreshCw
} from "lucide-react";

const Subscription = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { 
    subscribed, 
    subscriptionTier, 
    subscriptionEnd, 
    loading,
    checkSubscription,
    createCheckout,
    openCustomerPortal 
  } = useSubscription();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/auth");
      return;
    }
    setUser(user);
  };

  const handleSubscribe = (plan: 'monthly' | 'yearly') => {
    createCheckout(plan);
  };

  const plans = [
    {
      name: "Monthly",
      price: "$3.99",
      period: "per month",
      plan: "monthly" as const,
      features: [
        "Access to Short Tests",
        "Access to Exams", 
        "Progress Tracking",
        "Parent Dashboard",
        "Create Child Accounts",
        "Cancel Anytime"
      ]
    },
    {
      name: "Yearly",
      price: "$34.99",
      period: "per year",
      plan: "yearly" as const,
      popular: true,
      savings: "Save $12/year",
      features: [
        "Access to Short Tests",
        "Access to Exams",
        "Progress Tracking", 
        "Parent Dashboard",
        "Create Child Accounts",
        "Best Value"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Button variant="ghost" onClick={() => navigate("/")} className="flex items-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={checkSubscription}
            disabled={loading}
            className="flex items-center space-x-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            <span>Refresh Status</span>
          </Button>
        </div>

        {/* Current Subscription Status */}
        {subscribed && (
          <Card className="mb-8 border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-800">
                <Crown className="w-5 h-5" />
                <span>Active Subscription</span>
              </CardTitle>
              <CardDescription className="text-green-700">
                You have an active {subscriptionTier} subscription
                {subscriptionEnd && ` until ${new Date(subscriptionEnd).toLocaleDateString()}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button onClick={openCustomerPortal} variant="outline">
                  Manage Subscription
                </Button>
                <Button onClick={checkSubscription} variant="ghost" size="sm">
                  Refresh Status
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Choose Your Plan
          </h1>
          <p className="text-gray-600 text-lg">
            Unlock premium features for enhanced learning experience
          </p>
        </div>

        {/* Free Features */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Free Features</CardTitle>
            <CardDescription>Available to all users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Quiz Access</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Theory Lessons</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Solved Examples</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`relative ${plan.popular ? 'border-blue-500 shadow-lg scale-105' : ''}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">
                  Most Popular
                </Badge>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="text-3xl font-bold text-blue-600">
                  {plan.price}
                  <span className="text-sm text-gray-500 font-normal"> {plan.period}</span>
                </div>
                {plan.savings && (
                  <Badge variant="secondary" className="w-fit mx-auto">
                    {plan.savings}
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => handleSubscribe(plan.plan)}
                  disabled={subscribed}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {subscribed ? "Current Plan" : "Subscribe Now"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subscription;

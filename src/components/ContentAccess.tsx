
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Lock, Crown } from "lucide-react";

interface ContentAccessProps {
  contentType: string;
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export const ContentAccess = ({ contentType, children, title, description }: ContentAccessProps) => {
  const [requiresSubscription, setRequiresSubscription] = useState(false);
  const [loading, setLoading] = useState(true);
  const { subscribed } = useSubscription();
  const navigate = useNavigate();

  useEffect(() => {
    checkContentAccess();
  }, [contentType]);

  const checkContentAccess = async () => {
    try {
      const { data, error } = await supabase
        .from('content_access')
        .select('requires_subscription')
        .eq('content_type', contentType)
        .single();

      if (error) {
        console.error('Error checking content access:', error);
        setRequiresSubscription(false);
      } else {
        setRequiresSubscription(data.requires_subscription);
      }
    } catch (error) {
      console.error('Error:', error);
      setRequiresSubscription(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>;
  }

  // If content doesn't require subscription or user is subscribed, show content
  if (!requiresSubscription || subscribed) {
    return <>{children}</>;
  }

  // Show premium content gate
  return (
    <Card className="text-center py-12">
      <CardContent className="space-y-6">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
          <Crown className="w-8 h-8 text-white" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">
            {title || `${contentType.charAt(0).toUpperCase() + contentType.slice(1)} - Premium Feature`}
          </h3>
          <p className="text-gray-600">
            {description || `Access to ${contentType} requires a premium subscription.`}
          </p>
        </div>

        <div className="flex items-center justify-center space-x-2">
          <Lock className="w-4 h-4 text-gray-400" />
          <Badge variant="outline">Premium Only</Badge>
        </div>

        <div className="space-y-2">
          <Button 
            onClick={() => navigate("/subscription")}
            className="bg-gradient-to-r from-blue-600 to-purple-600"
          >
            <Crown className="w-4 h-4 mr-2" />
            Upgrade to Premium
          </Button>
          <p className="text-sm text-gray-500">
            Starting at $3.99/month
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

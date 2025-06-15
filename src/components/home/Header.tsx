
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { 
  GraduationCap, 
  LogIn, 
  UserCheck,
  Crown
} from "lucide-react";

interface HeaderProps {
  user: any;
  profile: any;
  onDashboardNavigation: () => void;
}

export const Header = ({ user, profile, onDashboardNavigation }: HeaderProps) => {
  const navigate = useNavigate();
  const { subscribed } = useSubscription();

  return (
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
                <Button onClick={onDashboardNavigation} size="sm">
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
  );
};

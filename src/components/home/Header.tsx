
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { 
  GraduationCap, 
  UserCheck,
  Crown,
  Phone,
  FileText,
  CreditCard,
  Users,
  LogIn
} from "lucide-react";
import { ContinentCountriesMenu } from "./ContinentCountriesMenu";
import { SubjectsGradesMenu } from "./SubjectsGradesMenu";
import { GlobalSearch } from "./GlobalSearch";

interface HeaderProps {
  user: any;
  profile: any;
  onDashboardNavigation: () => void;
}

export const Header = ({ user, profile, onDashboardNavigation }: HeaderProps) => {
  const navigate = useNavigate();
  const { subscribed } = useSubscription();

  return (
    <div className="w-full">
      {/* Top Navigation Bar */}
      <div className="bg-gray-50 border-b border-gray-200 relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12 text-sm">
            <div className="flex items-center space-x-6">
              <a href="/about" className="text-gray-600 hover:text-blue-600 flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>About Us</span>
              </a>
              <a href="/pricing" className="text-gray-600 hover:text-blue-600 flex items-center space-x-1">
                <CreditCard className="w-4 h-4" />
                <span>Pricing</span>
              </a>
              <SubjectsGradesMenu />
            </div>
            <div className="flex items-center space-x-6">
              <a href="/terms" className="text-gray-600 hover:text-blue-600 flex items-center space-x-1">
                <FileText className="w-4 h-4" />
                <span>Terms & Conditions</span>
              </a>
              <a href="/contact" className="text-gray-600 hover:text-blue-600 flex items-center space-x-1">
                <Phone className="w-4 h-4" />
                <span>Contact Us</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <GraduationCap className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  K12Expert
                </span>
              </div>
              <div className="w-full max-w-sm lg:max-w-md">
                <GlobalSearch />
              </div>
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
                <div className="flex items-center space-x-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => navigate("/auth?type=student")}
                    className="text-blue-600 border-blue-600 hover:bg-blue-50"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Student Login
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => navigate("/auth?type=parent")}
                    className="bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Parent Login
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Countries Menu Bar */}
      <div className="bg-white border-b border-gray-200 relative z-30">
        <ContinentCountriesMenu />
      </div>
    </div>
  );
};

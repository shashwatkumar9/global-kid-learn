
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Settings, 
  BookOpen, 
  Globe, 
  UserCheck, 
  FileText, 
  Zap 
} from "lucide-react";

const SystemSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="h-5 w-5" />
          <span>System Settings</span>
        </CardTitle>
        <CardDescription>
          Configure platform settings and preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button className="w-full justify-start" variant="outline">
          <Settings className="w-4 h-4 mr-2" />
          Platform Configuration
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <BookOpen className="w-4 h-4 mr-2" />
          Curriculum Settings
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <Zap className="w-4 h-4 mr-2" />
          Notification Management
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <Globe className="w-4 h-4 mr-2" />
          Stripe Integration
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <UserCheck className="w-4 h-4 mr-2" />
          User Role Management
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <FileText className="w-4 h-4 mr-2" />
          SEO & Analytics
        </Button>
      </CardContent>
    </Card>
  );
};

export default SystemSettings;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Shield, 
  Users, 
  BookOpen, 
  BarChart3, 
  Settings, 
  Eye,
  Lock,
  Globe
} from "lucide-react";

const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple demo login - in production this would connect to Supabase auth
    if (credentials.username === "admin" && credentials.password === "k12expert") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials. Demo: admin / k12expert");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
          <CardHeader className="text-center pb-2">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                K12Expert
              </span>
            </div>
            <CardTitle className="text-2xl text-gray-800">Admin Panel</CardTitle>
            <CardDescription className="text-gray-600">
              Secure access for K12Expert administrators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter admin username"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter admin password"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Lock className="w-4 h-4 mr-2" />
                Access Admin Panel
              </Button>
            </form>
            
            <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-800 text-center">
                <strong>Demo Credentials:</strong><br />
                Username: admin | Password: k12expert
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">K12Expert Admin</h1>
                <p className="text-xs text-gray-500">Administrative Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => window.open('/', '_blank')}>
                <Eye className="w-4 h-4 mr-2" />
                View Site
              </Button>
              <Button variant="outline" size="sm" onClick={() => setIsLoggedIn(false)}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Students</p>
                  <p className="text-2xl font-bold">12,456</p>
                </div>
                <Users className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Active Parents</p>
                  <p className="text-2xl font-bold">8,923</p>
                </div>
                <Shield className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Course Materials</p>
                  <p className="text-2xl font-bold">2,340</p>
                </div>
                <BookOpen className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Countries Covered</p>
                  <p className="text-2xl font-bold">20</p>
                </div>
                <Globe className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>User Management</span>
              </CardTitle>
              <CardDescription>
                Manage students, parents, and admin accounts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                View All Students
              </Button>
              <Button className="w-full justify-start" variant="outline">
                Manage Parent Accounts
              </Button>
              <Button className="w-full justify-start" variant="outline">
                Admin User Roles
              </Button>
            </CardContent>
          </Card>

          {/* Content Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Content Management</span>
              </CardTitle>
              <CardDescription>
                Manage curriculum, quizzes, and learning materials
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                Upload Course Materials
              </Button>
              <Button className="w-full justify-start" variant="outline">
                Create Quiz Questions
              </Button>
              <Button className="w-full justify-start" variant="outline">
                Manage Exam Papers
              </Button>
            </CardContent>
          </Card>

          {/* Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Analytics & Reports</span>
              </CardTitle>
              <CardDescription>
                Track usage, performance, and engagement metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                Student Performance Reports
              </Button>
              <Button className="w-full justify-start" variant="outline">
                Usage Analytics
              </Button>
              <Button className="w-full justify-start" variant="outline">
                Country-wise Statistics
              </Button>
            </CardContent>
          </Card>

          {/* System Settings */}
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
                Platform Configuration
              </Button>
              <Button className="w-full justify-start" variant="outline">
                Curriculum Settings
              </Button>
              <Button className="w-full justify-start" variant="outline">
                Notification Management
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;

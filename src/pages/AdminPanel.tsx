
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Users, 
  BookOpen, 
  BarChart3, 
  Settings, 
  Eye,
  Lock,
  Globe,
  Plus,
  Edit,
  Trash,
  Save,
  FileText,
  HelpCircle,
  Navigation,
  Menu,
  UserCheck
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Content Management States
  const [contentForm, setContentForm] = useState({
    title: "",
    content: "",
    content_type: "theory",
    subject: "",
    grade: "",
    curriculum: "",
    country: "United States",
    difficulty_level: "beginner",
    is_premium: false
  });

  // Quiz Management States
  const [quizForm, setQuizForm] = useState({
    question_text: "",
    options: ["", "", "", ""],
    correct_answer: "",
    explanation: "",
    question_type: "multiple_choice",
    subject: "",
    grade: "",
    curriculum: "",
    country: "United States",
    difficulty_level: "beginner",
    is_premium: false
  });

  // User Monitoring States
  const [users, setUsers] = useState([]);
  const [userLogins, setUserLogins] = useState([]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (credentials.username === "k12expert_admin9" && credentials.password === "Smackdown_k12910") {
      setIsLoggedIn(true);
      toast({
        title: "Login Successful",
        description: "Welcome to K12Expert Admin Panel",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials",
        variant: "destructive",
      });
    }
  };

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleContentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('educational_content')
        .insert([contentForm]);
      
      if (error) throw error;
      
      toast({
        title: "Content Added",
        description: "Educational content has been successfully added.",
      });
      
      setContentForm({
        title: "",
        content: "",
        content_type: "theory",
        subject: "",
        grade: "",
        curriculum: "",
        country: "United States",
        difficulty_level: "beginner",
        is_premium: false
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add content.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleQuizSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('questions')
        .insert([{
          ...quizForm,
          options: quizForm.options.filter(option => option.trim() !== "")
        }]);
      
      if (error) throw error;
      
      toast({
        title: "Question Added",
        description: "Quiz question has been successfully added.",
      });
      
      setQuizForm({
        question_text: "",
        options: ["", "", "", ""],
        correct_answer: "",
        explanation: "",
        question_type: "multiple_choice",
        subject: "",
        grade: "",
        curriculum: "",
        country: "United States",
        difficulty_level: "beginner",
        is_premium: false
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add question.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUsers();
    }
  }, [isLoggedIn]);

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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="navigation">Navigation</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm font-medium">Total Students</p>
                      <p className="text-2xl font-bold">{users.filter(u => u.role === 'student').length}</p>
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
                      <p className="text-2xl font-bold">{users.filter(u => u.role === 'parent').length}</p>
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
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Add Educational Content</span>
                </CardTitle>
                <CardDescription>
                  Create new theory content, solved examples, and learning materials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContentSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={contentForm.title}
                        onChange={(e) => setContentForm({...contentForm, title: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="content_type">Content Type</Label>
                      <Select 
                        value={contentForm.content_type} 
                        onValueChange={(value) => setContentForm({...contentForm, content_type: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="theory">Theory</SelectItem>
                          <SelectItem value="solved_examples">Solved Examples</SelectItem>
                          <SelectItem value="practical">Practical</SelectItem>
                          <SelectItem value="reference">Reference</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={contentForm.subject}
                        onChange={(e) => setContentForm({...contentForm, subject: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="grade">Grade</Label>
                      <Input
                        id="grade"
                        value={contentForm.grade}
                        onChange={(e) => setContentForm({...contentForm, grade: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="curriculum">Curriculum</Label>
                      <Input
                        id="curriculum"
                        value={contentForm.curriculum}
                        onChange={(e) => setContentForm({...contentForm, curriculum: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="difficulty">Difficulty Level</Label>
                      <Select 
                        value={contentForm.difficulty_level} 
                        onValueChange={(value) => setContentForm({...contentForm, difficulty_level: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={contentForm.content}
                      onChange={(e) => setContentForm({...contentForm, content: e.target.value})}
                      rows={8}
                      required
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="is_premium"
                      checked={contentForm.is_premium}
                      onChange={(e) => setContentForm({...contentForm, is_premium: e.target.checked})}
                    />
                    <Label htmlFor="is_premium">Premium Content</Label>
                  </div>
                  <Button type="submit" disabled={loading}>
                    <Save className="w-4 h-4 mr-2" />
                    {loading ? "Saving..." : "Save Content"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quiz" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <HelpCircle className="h-5 w-5" />
                  <span>Add Quiz Question</span>
                </CardTitle>
                <CardDescription>
                  Create quiz questions, short quizzes, and exam questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleQuizSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="question_type">Question Type</Label>
                      <Select 
                        value={quizForm.question_type} 
                        onValueChange={(value) => setQuizForm({...quizForm, question_type: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                          <SelectItem value="true_false">True/False</SelectItem>
                          <SelectItem value="short_answer">Short Answer</SelectItem>
                          <SelectItem value="essay">Essay</SelectItem>
                          <SelectItem value="fill_blank">Fill in the Blank</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quiz_subject">Subject</Label>
                      <Input
                        id="quiz_subject"
                        value={quizForm.subject}
                        onChange={(e) => setQuizForm({...quizForm, subject: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quiz_grade">Grade</Label>
                      <Input
                        id="quiz_grade"
                        value={quizForm.grade}
                        onChange={(e) => setQuizForm({...quizForm, grade: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quiz_curriculum">Curriculum</Label>
                      <Input
                        id="quiz_curriculum"
                        value={quizForm.curriculum}
                        onChange={(e) => setQuizForm({...quizForm, curriculum: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="question_text">Question</Label>
                    <Textarea
                      id="question_text"
                      value={quizForm.question_text}
                      onChange={(e) => setQuizForm({...quizForm, question_text: e.target.value})}
                      rows={3}
                      required
                    />
                  </div>
                  {quizForm.question_type === "multiple_choice" && (
                    <div className="space-y-2">
                      <Label>Answer Options</Label>
                      {quizForm.options.map((option, index) => (
                        <Input
                          key={index}
                          placeholder={`Option ${index + 1}`}
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...quizForm.options];
                            newOptions[index] = e.target.value;
                            setQuizForm({...quizForm, options: newOptions});
                          }}
                        />
                      ))}
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="correct_answer">Correct Answer</Label>
                    <Input
                      id="correct_answer"
                      value={quizForm.correct_answer}
                      onChange={(e) => setQuizForm({...quizForm, correct_answer: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="explanation">Explanation (Optional)</Label>
                    <Textarea
                      id="explanation"
                      value={quizForm.explanation}
                      onChange={(e) => setQuizForm({...quizForm, explanation: e.target.value})}
                      rows={3}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="quiz_premium"
                      checked={quizForm.is_premium}
                      onChange={(e) => setQuizForm({...quizForm, is_premium: e.target.checked})}
                    />
                    <Label htmlFor="quiz_premium">Premium Question</Label>
                  </div>
                  <Button type="submit" disabled={loading}>
                    <Save className="w-4 h-4 mr-2" />
                    {loading ? "Saving..." : "Save Question"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>User Management & Monitoring</span>
                </CardTitle>
                <CardDescription>
                  Monitor user logins and track parent/student activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Country</TableHead>
                      <TableHead>Subscription</TableHead>
                      <TableHead>Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          {user.first_name} {user.last_name}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={user.role === 'parent' ? 'default' : 'secondary'}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.country}</TableCell>
                        <TableCell>
                          <Badge variant={user.subscription_status === 'active' ? 'default' : 'outline'}>
                            {user.subscription_status || 'free'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(user.created_at).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="navigation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Navigation className="h-5 w-5" />
                  <span>Navigation Management</span>
                </CardTitle>
                <CardDescription>
                  Manage menu items, navigation bar, and footer elements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="w-full justify-start" variant="outline">
                    <Menu className="w-4 h-4 mr-2" />
                    Edit Header Menu
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Navigation className="w-4 h-4 mr-2" />
                    Manage Navigation
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Globe className="w-4 h-4 mr-2" />
                    Edit Footer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
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
                <Button className="w-full justify-start" variant="outline">
                  Stripe Integration
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminPanel;

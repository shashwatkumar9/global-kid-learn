import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, 
  Users, 
  Globe, 
  Trophy, 
  CheckCircle, 
  Clock, 
  FileText, 
  User, 
  Menu,
  Search,
  Calendar
} from "lucide-react";

const Index = () => {
  const [selectedCountry, setSelectedCountry] = useState("UK");
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      
      // Get user profile to determine role
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      
      setProfile(profileData);
    }
  };

  const handleUserLogin = () => {
    if (user && profile) {
      // Redirect based on user role
      if (profile.role === "student") {
        navigate("/student-dashboard");
      } else if (profile.role === "parent") {
        navigate("/parent-dashboard");
      } else {
        navigate("/");
      }
    } else {
      navigate("/auth");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  const countries = [
    "UK", "Ireland", "USA", "India", "South Africa", "Germany", 
    "Netherlands", "Canada", "Australia", "New Zealand", "UAE", 
    "Saudi Arabia", "Singapore", "France", "Italy", "Brazil", 
    "Nigeria", "Ghana", "Tanzania", "Egypt"
  ];

  const learningMaterials = [
    {
      title: "Theory & Basics",
      description: "Comprehensive foundational concepts and principles",
      icon: BookOpen,
      color: "bg-blue-500",
      subjects: "All subjects covered"
    },
    {
      title: "Solved Examples",
      description: "Step-by-step solutions and practical applications",
      icon: CheckCircle,
      color: "bg-green-500",
      subjects: "Interactive walkthroughs"
    },
    {
      title: "Interactive Quizzes",
      description: "Instant feedback with detailed explanations",
      icon: Trophy,
      color: "bg-yellow-500",
      subjects: "Real-time scoring"
    },
    {
      title: "Short Quiz Tests",
      description: "Quick assessments for topic mastery",
      icon: Clock,
      color: "bg-purple-500",
      subjects: "Timed challenges"
    },
    {
      title: "Annual & Term Exams",
      description: "Comprehensive examination preparation",
      icon: FileText,
      color: "bg-red-500",
      subjects: "Full curriculum coverage"
    }
  ];

  const subjects = [
    "Mathematics", "Science", "English", "History", "Geography", 
    "Physics", "Chemistry", "Biology", "Computer Science", "Art"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Globe className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  K12Expert.com
                </span>
              </div>
              
              <div className="hidden md:flex items-center space-x-6">
                <a href="#curricula" className="text-gray-700 hover:text-blue-600 transition-colors">Curricula</a>
                <a href="#subjects" className="text-gray-700 hover:text-blue-600 transition-colors">Subjects</a>
                <a href="#materials" className="text-gray-700 hover:text-blue-600 transition-colors">Materials</a>
                <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {user && profile ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    Welcome, {profile.first_name}!
                  </span>
                  <Button variant="outline" size="sm" onClick={handleUserLogin}>
                    <User className="w-4 h-4 mr-2" />
                    Go to Dashboard
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Button variant="outline" size="sm" onClick={handleUserLogin}>
                    <User className="w-4 h-4 mr-2" />
                    Parent Login
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleUserLogin}>
                    <Users className="w-4 h-4 mr-2" />
                    Student Login
                  </Button>
                </>
              )}
              <Menu className="h-6 w-6 md:hidden text-gray-700" />
            </div>
          </div>
        </div>
      </nav>

      {/* Curriculum Selection Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="font-semibold">Select Your Country:</span>
              <select 
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="bg-white/20 border border-white/30 rounded-lg px-3 py-1 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                {countries.map((country) => (
                  <option key={country} value={country} className="text-gray-800">
                    {country}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="hidden lg:flex items-center space-x-2">
              <Search className="w-4 h-4" />
              <input 
                placeholder="Search subjects, topics..."
                className="bg-white/20 border border-white/30 rounded-lg px-3 py-1 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-fade-in">
            Master Every Subject
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
            Comprehensive K-12 education covering {countries.length} countries' curricula with interactive learning materials, instant assessments, and expert guidance.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Badge variant="secondary" className="px-4 py-2 text-lg bg-blue-100 text-blue-800">
              {countries.length} Countries
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-lg bg-green-100 text-green-800">
              All Standards K-12
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-lg bg-purple-100 text-purple-800">
              {subjects.length}+ Subjects
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-lg bg-orange-100 text-orange-800">
              5 Learning Types
            </Badge>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all" onClick={handleUserLogin}>
              Start Learning Now
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-2 hover:bg-blue-50 transform hover:scale-105 transition-all">
              Explore Curricula
            </Button>
          </div>
        </div>
      </section>

      {/* Learning Materials Section */}
      <section id="materials" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              5 Types of Learning Materials
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From foundational concepts to comprehensive examinations, our platform covers every aspect of learning with interactive and engaging content.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {learningMaterials.map((material, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center pb-2">
                  <div className={`${material.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <material.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-800">
                    {material.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 mb-4">
                    {material.description}
                  </CardDescription>
                  <Badge variant="outline" className="text-sm">
                    {material.subjects}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Countries Coverage */}
      <section id="curricula" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Global Curriculum Coverage
          </h2>
          <p className="text-xl mb-12 opacity-90 max-w-3xl mx-auto">
            Comprehensive educational content aligned with national standards across 20 countries, ensuring students get the most relevant and up-to-date learning materials.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {countries.map((country, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 border-white/30 backdrop-blur-sm cursor-pointer transition-all transform hover:scale-105 ${
                  selectedCountry === country 
                    ? 'bg-white/20 border-white' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
                onClick={() => setSelectedCountry(country)}
              >
                <span className="font-semibold text-sm md:text-base">{country}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects Grid */}
      <section id="subjects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Complete Subject Coverage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every major subject from kindergarten through grade 12, tailored to your country's specific curriculum requirements.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {subjects.map((subject, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50 border-0">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 text-sm md:text-base">
                    {subject}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Why Choose K12Expert?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Multi-User Access</h3>
              <p className="text-gray-600">Separate dashboards for parents, students, and administrators with role-based permissions and progress tracking.</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Instant Assessment</h3>
              <p className="text-gray-600">Real-time quiz feedback, progress tracking, and comprehensive performance analytics for continuous improvement.</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Global Standards</h3>
              <p className="text-gray-600">Curriculum-aligned content for 20 countries, ensuring students meet local educational requirements and standards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Learning?
          </h2>
          <p className="text-xl mb-12 opacity-90">
            Join thousands of students and parents who are already experiencing the future of education with K12Expert.com
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 transform hover:scale-105 transition-all" onClick={handleUserLogin}>
              <Calendar className="w-5 h-5 mr-2" />
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-2 border-white text-white hover:bg-white/10 transform hover:scale-105 transition-all">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Globe className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold">K12Expert.com</span>
              </div>
              <p className="text-gray-400">
                Empowering students worldwide with comprehensive, curriculum-aligned educational content.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Learning Materials</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Theory & Basics</li>
                <li>Solved Examples</li>
                <li>Interactive Quizzes</li>
                <li>Assessment Tests</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Access</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Parent Dashboard</li>
                <li>Student Portal</li>
                <li>Admin Panel</li>
                <li>Progress Tracking</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Documentation</li>
                <li>Community</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 K12Expert.com. All rights reserved. Transforming education globally.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;


import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/home/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { ContentCategories } from "@/components/home/ContentCategories";
import { UserTypeSelection } from "@/components/home/UserTypeSelection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { FeaturedSubjects } from "@/components/home/FeaturedSubjects";
import { FeaturedCurriculums } from "@/components/home/FeaturedCurriculums";
import { StatsSection } from "@/components/home/StatsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { Footer } from "@/components/home/Footer";

const Index = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    
    if (user) {
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      setProfile(profileData);
    }
  };

  const handleDashboardNavigation = () => {
    if (profile?.role === "student") {
      navigate("/student-dashboard");
    } else if (profile?.role === "parent") {
      navigate("/parent-dashboard");
    } else if (profile?.role === "admin") {
      navigate("/admin-panel");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header 
        user={user} 
        profile={profile} 
        onDashboardNavigation={handleDashboardNavigation} 
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <HeroSection user={user} />
        <ContentCategories />
        {!user && <UserTypeSelection />}
        <FeaturesSection />
      </main>

      <FeaturedSubjects />
      <FeaturedCurriculums />
      <StatsSection />
      <TestimonialsSection />

      <Footer />
    </div>
  );
};

export default Index;


import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface HeroSectionProps {
  user: any;
}

export const HeroSection = ({ user }: HeroSectionProps) => {
  const navigate = useNavigate();

  return (
    <div className="text-center mb-16">
      <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
        Master K-12 Learning
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
        Comprehensive learning platform with interactive quizzes, theory lessons, and practice exams 
        for students from Kindergarten to Grade 12.
      </p>
      
      {!user && (
        <div className="flex justify-center space-x-4">
          <Button 
            size="lg" 
            onClick={() => navigate("/auth")}
            className="bg-gradient-to-r from-blue-600 to-purple-600"
          >
            Get Started Free
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            onClick={() => navigate("/subscription")}
          >
            View Plans
          </Button>
        </div>
      )}
    </div>
  );
};


import { ContentAccess } from "@/components/ContentAccess";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Crown, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Exam = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Button variant="ghost" onClick={() => navigate("/")} className="flex items-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Button>
        </div>

        <ContentAccess 
          contentType="exam"
          title="Exams - Premium Feature"
          description="Comprehensive exam simulations available for premium subscribers"
        >
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 flex items-center justify-center space-x-2">
                <Crown className="w-8 h-8" />
                <span>Exams</span>
              </h1>
              <p className="text-gray-600 text-lg">
                Comprehensive exam simulations and practice tests
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {['Mathematics', 'Science', 'English', 'History', 'Geography'].map((subject) => (
                <Card key={subject} className="hover:shadow-lg transition-shadow border-purple-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-purple-600" />
                      <span>{subject}</span>
                      <Crown className="w-4 h-4 text-purple-600" />
                    </CardTitle>
                    <CardDescription>
                      Full exam simulation (60 minutes)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500">
                      Start Exam
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </ContentAccess>
      </div>
    </div>
  );
};

export default Exam;

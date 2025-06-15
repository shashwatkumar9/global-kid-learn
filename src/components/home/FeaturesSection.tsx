
import { BookOpen, BarChart3, Users } from "lucide-react";

export const FeaturesSection = () => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      <h3 className="text-2xl font-bold text-center mb-8">Why Choose K12Expert?</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-6 h-6 text-blue-600" />
          </div>
          <h4 className="font-semibold mb-2">Comprehensive Content</h4>
          <p className="text-gray-600">Theory, examples, quizzes, and exams for all K-12 grades</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-6 h-6 text-green-600" />
          </div>
          <h4 className="font-semibold mb-2">Progress Tracking</h4>
          <p className="text-gray-600">Monitor learning progress with detailed analytics</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
          <h4 className="font-semibold mb-2">Parent Dashboard</h4>
          <p className="text-gray-600">Parents can monitor and manage their children's learning</p>
        </div>
      </div>
    </div>
  );
};

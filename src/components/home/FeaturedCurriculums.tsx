
import * as React from "react";
import { GraduationCap, Award, BookOpen } from "lucide-react";

const featuredCurriculums = [
  {
    name: "International Baccalaureate (IB)",
    countries: ["UK", "Singapore", "UAE", "Netherlands"],
    description: "Rigorous international curriculum preparing students for global universities",
    icon: Award,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200"
  },
  {
    name: "Advanced Placement (AP)",
    countries: ["USA", "Canada"],
    description: "College-level courses offering university credit opportunities",
    icon: GraduationCap,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200"
  },
  {
    name: "GCSE & A-Levels",
    countries: ["UK", "Singapore", "UAE"],
    description: "British curriculum with comprehensive assessment system",
    icon: BookOpen,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200"
  },
  {
    name: "Common Core",
    countries: ["USA"],
    description: "Standards-based education focusing on critical thinking",
    icon: BookOpen,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200"
  },
  {
    name: "CBSE",
    countries: ["India", "UAE", "Singapore"],
    description: "Central Board curriculum with emphasis on holistic development",
    icon: Award,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200"
  },
  {
    name: "HSC (NSW)",
    countries: ["Australia"],
    description: "Higher School Certificate preparing for ATAR rankings",
    icon: GraduationCap,
    color: "text-teal-600",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200"
  }
];

export const FeaturedCurriculums = () => {
  return (
    <div className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Popular Curriculums
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Supporting major international and national curricula worldwide
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCurriculums.map((curriculum) => {
            const Icon = curriculum.icon;
            return (
              <div 
                key={curriculum.name}
                className={`bg-white ${curriculum.borderColor} border rounded-xl p-6 hover:shadow-xl transition-all duration-200 cursor-pointer group hover:scale-105`}
              >
                <div className="flex items-start mb-4">
                  <div className={`w-12 h-12 ${curriculum.bgColor} rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className={`w-6 h-6 ${curriculum.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold ${curriculum.color} mb-2`}>
                      {curriculum.name}
                    </h3>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {curriculum.countries.map((country) => (
                        <span 
                          key={country}
                          className={`text-xs px-2 py-1 ${curriculum.bgColor} ${curriculum.color} rounded-full border ${curriculum.borderColor}`}
                        >
                          {country}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  {curriculum.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

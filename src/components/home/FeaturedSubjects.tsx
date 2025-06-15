
import * as React from "react";
import { BookOpen, Calculator, Beaker, Globe, Palette, Music } from "lucide-react";

const featuredSubjects = [
  {
    name: "Mathematics",
    icon: Calculator,
    description: "From basic arithmetic to advanced calculus",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200"
  },
  {
    name: "Science",
    icon: Beaker,
    description: "Physics, Chemistry, Biology, and Earth Science",
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200"
  },
  {
    name: "English",
    icon: BookOpen,
    description: "Literature, Grammar, Writing, and Reading",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200"
  },
  {
    name: "Social Studies",
    icon: Globe,
    description: "History, Geography, Civics, and Economics",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200"
  },
  {
    name: "Arts",
    icon: Palette,
    description: "Visual Arts, Creative Writing, and Design",
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200"
  },
  {
    name: "Music",
    icon: Music,
    description: "Music Theory, Instruments, and Composition",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200"
  }
];

export const FeaturedSubjects = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Subjects
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive K-12 curriculum covering all essential subjects with interactive content
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredSubjects.map((subject) => {
            const Icon = subject.icon;
            return (
              <div 
                key={subject.name}
                className={`${subject.bgColor} ${subject.borderColor} border rounded-xl p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer group`}
              >
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 ${subject.bgColor} rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className={`w-6 h-6 ${subject.color}`} />
                  </div>
                  <h3 className={`text-xl font-semibold ${subject.color}`}>
                    {subject.name}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm">
                  {subject.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

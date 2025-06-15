
import * as React from "react";
import { Users, BookOpen, GraduationCap, Trophy } from "lucide-react";

const stats = [
  {
    icon: Users,
    number: "50,000+",
    label: "Active Students",
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    icon: BookOpen,
    number: "1,200+",
    label: "Curriculum Topics",
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    icon: GraduationCap,
    number: "85+",
    label: "Countries Supported",
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    icon: Trophy,
    number: "95%",
    label: "Success Rate",
    color: "text-orange-600",
    bgColor: "bg-orange-50"
  }
];

export const StatsSection = () => {
  return (
    <div className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Trusted by Students Worldwide
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Join thousands of students who are excelling in their studies with K12Expert
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.label}
                className="text-center group"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-200 group-hover:scale-105">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-blue-100 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

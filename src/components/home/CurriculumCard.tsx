
import * as React from "react";
import { Curriculum } from "@/data/continentData";

interface CurriculumCardProps {
  curriculum: Curriculum;
}

export const CurriculumCard = ({ curriculum }: CurriculumCardProps) => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
      <h5 className="font-semibold text-lg mb-3 text-blue-700 border-b border-blue-200 pb-2">
        {curriculum.name}
      </h5>
      
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2 flex items-center">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          Subjects
        </p>
        <div className="space-y-1 max-h-24 overflow-y-auto">
          {curriculum.subjects.map((subject) => (
            <div 
              key={subject}
              className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded hover:bg-blue-100 cursor-pointer transition-colors border border-blue-200"
            >
              {subject}
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2 flex items-center">
          <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
          Grades
        </p>
        <div className="flex flex-wrap gap-1">
          {curriculum.grades.map((grade) => (
            <span 
              key={grade}
              className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full hover:bg-orange-200 cursor-pointer transition-colors border border-orange-200"
            >
              {grade}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

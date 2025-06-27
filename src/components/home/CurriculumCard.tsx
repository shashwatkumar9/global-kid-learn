
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Curriculum, Country } from "@/data/continentData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, GraduationCap } from "lucide-react";

interface CurriculumCardProps {
  curriculum: Curriculum;
  country: Country;
  continent: string;
}

export const CurriculumCard = ({ curriculum, country, continent }: CurriculumCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const continentSlug = continent.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const countrySlug = country.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const curriculumSlug = curriculum.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    navigate(`/${continentSlug}/${countrySlug}/${curriculumSlug}`);
  };

  return (
    <Card 
      className="hover:shadow-lg transition-all duration-200 cursor-pointer border-l-4 border-l-blue-500 hover:border-l-blue-600"
      onClick={handleClick}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-blue-700 hover:text-blue-800 transition-colors">
          {curriculum.name}
        </CardTitle>
        <CardDescription className="text-xs">
          Click to explore curriculum details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <div className="flex items-center space-x-1 mb-2">
            <BookOpen className="w-3 h-3 text-green-600" />
            <span className="text-xs font-medium text-gray-700">Subjects</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {curriculum.subjects.slice(0, 3).map((subject) => (
              <Badge key={subject} variant="secondary" className="text-xs px-1 py-0">
                {subject}
              </Badge>
            ))}
            {curriculum.subjects.length > 3 && (
              <Badge variant="outline" className="text-xs px-1 py-0">
                +{curriculum.subjects.length - 3}
              </Badge>
            )}
          </div>
        </div>
        
        <div>
          <div className="flex items-center space-x-1 mb-2">
            <GraduationCap className="w-3 h-3 text-purple-600" />
            <span className="text-xs font-medium text-gray-700">Grades</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {curriculum.grades.slice(0, 4).map((grade) => (
              <Badge key={grade} variant="outline" className="text-xs px-1 py-0">
                {grade}
              </Badge>
            ))}
            {curriculum.grades.length > 4 && (
              <Badge variant="outline" className="text-xs px-1 py-0">
                +{curriculum.grades.length - 4}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

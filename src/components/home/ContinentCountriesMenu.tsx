
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const continentData = {
  "North America": {
    color: "text-blue-600",
    bgColor: "hover:bg-blue-50",
    hoverColor: "group-hover:text-blue-700",
    countries: [
      {
        name: "USA",
        curriculums: [
          { name: "Common Core", subjects: ["Math", "English Language Arts", "Science", "Social Studies"], grades: ["K-5", "6-8", "9-12"] },
          { name: "AP", subjects: ["AP Calculus", "AP Physics", "AP Chemistry", "AP Biology", "AP History"], grades: ["9-12"] },
          { name: "SAT Prep", subjects: ["Math", "Reading", "Writing", "Essay"], grades: ["9-12"] },
        ],
      },
      {
        name: "Canada",
        curriculums: [
          { name: "Ontario", subjects: ["Functions", "Advanced Functions", "Physics", "Chemistry", "Biology"], grades: ["9-12"] },
          { name: "British Columbia", subjects: ["Pre-Calculus", "Calculus", "Physics", "Chemistry", "English"], grades: ["9-12"] },
          { name: "Alberta", subjects: ["Mathematics", "Science", "Social Studies", "English"], grades: ["K-12"] },
        ],
      },
      {
        name: "Mexico",
        curriculums: [
          { name: "SEP", subjects: ["Matemáticas", "Ciencias", "Español", "Historia", "Geografía"], grades: ["1-12"] },
          { name: "Bachillerato", subjects: ["Mathematics", "Physics", "Chemistry", "Biology"], grades: ["10-12"] },
        ],
      },
    ],
  },
  "Europe": {
    color: "text-green-600",
    bgColor: "hover:bg-green-50",
    hoverColor: "group-hover:text-green-700",
    countries: [
      {
        name: "UK",
        curriculums: [
          { name: "GCSE", subjects: ["Mathematics", "English", "Science", "History", "Geography"], grades: ["9-11"] },
          { name: "A-Levels", subjects: ["Further Maths", "Chemistry", "Physics", "Biology", "Economics"], grades: ["12-13"] },
          { name: "IB", subjects: ["Mathematics HL", "English A", "Sciences", "Humanities"], grades: ["11-12"] },
        ],
      },
      {
        name: "Ireland",
        curriculums: [
          { name: "Junior Cycle", subjects: ["Mathematics", "English", "Irish", "Science", "History"], grades: ["7-9"] },
          { name: "Leaving Certificate", subjects: ["Higher Level Maths", "Applied Maths", "Physics", "Chemistry", "Biology"], grades: ["10-12"] },
        ],
      },
      {
        name: "Germany",
        curriculums: [
          { name: "Gymnasium", subjects: ["Mathematik", "Physik", "Chemie", "Biologie", "Deutsch"], grades: ["5-12"] },
          { name: "Abitur", subjects: ["Advanced Mathematics", "Sciences", "Languages", "Social Studies"], grades: ["11-12"] },
        ],
      },
      {
        name: "Netherlands",
        curriculums: [
          { name: "VWO", subjects: ["Wiskunde", "Natuurkunde", "Scheikunde", "Biologie", "Nederlands"], grades: ["7-12"] },
          { name: "HAVO", subjects: ["Mathematics", "Sciences", "Languages", "Economics"], grades: ["7-11"] },
        ],
      },
      {
        name: "France",
        curriculums: [
          { name: "Baccalauréat", subjects: ["Mathématiques", "Physique-Chimie", "SVT", "Français", "Histoire"], grades: ["6-12"] },
          { name: "International Sections", subjects: ["Mathematics", "Sciences", "Languages"], grades: ["6-12"] },
        ],
      },
      {
        name: "Italy",
        curriculums: [
          { name: "Liceo Scientifico", subjects: ["Matematica", "Fisica", "Chimica", "Biologia", "Italiano"], grades: ["9-13"] },
          { name: "Esame di Stato", subjects: ["Mathematics", "Sciences", "Languages", "Humanities"], grades: ["13"] },
        ],
      },
      {
        name: "Spain",
        curriculums: [
          { name: "ESO", subjects: ["Matemáticas", "Física y Química", "Biología", "Lengua", "Historia"], grades: ["7-10"] },
          { name: "Bachillerato", subjects: ["Mathematics", "Physics", "Chemistry", "Biology"], grades: ["11-12"] },
        ],
      },
      {
        name: "Switzerland",
        curriculums: [
          { name: "Maturité", subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "Languages"], grades: ["9-12"] },
          { name: "Federal VET", subjects: ["Applied Mathematics", "Sciences", "Technology"], grades: ["9-12"] },
        ],
      },
    ],
  },
  "Asia & Middle East": {
    color: "text-purple-600",
    bgColor: "hover:bg-purple-50",
    hoverColor: "group-hover:text-purple-700",
    countries: [
      {
        name: "India",
        curriculums: [
          { name: "CBSE", subjects: ["Mathematics", "Science", "Social Science", "English", "Hindi"], grades: ["1-12"] },
          { name: "ICSE", subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English"], grades: ["1-12"] },
          { name: "State Boards", subjects: ["Mathematics", "Science", "Languages", "Social Studies"], grades: ["1-12"] },
        ],
      },
      {
        name: "UAE",
        curriculums: [
          { name: "Ministry of Education", subjects: ["Mathematics", "Science", "Arabic", "English", "Islamic Studies"], grades: ["K-12"] },
          { name: "IB", subjects: ["Mathematics", "Sciences", "Languages", "Humanities"], grades: ["11-12"] },
          { name: "British Curriculum", subjects: ["Mathematics", "Physics", "Chemistry", "Biology"], grades: ["K-13"] },
        ],
      },
      {
        name: "Saudi Arabia",
        curriculums: [
          { name: "Saudi National", subjects: ["Mathematics", "Science", "Arabic", "Islamic Studies", "English"], grades: ["K-12"] },
          { name: "International Schools", subjects: ["Mathematics", "Physics", "Chemistry", "Biology"], grades: ["K-12"] },
        ],
      },
      {
        name: "Singapore",
        curriculums: [
          { name: "O-Levels", subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English"], grades: ["9-10"] },
          { name: "A-Levels", subjects: ["H2 Mathematics", "H2 Physics", "H2 Chemistry", "H2 Biology"], grades: ["11-12"] },
          { name: "IB", subjects: ["Mathematics HL", "Sciences", "Languages"], grades: ["11-12"] },
        ],
      },
      {
        name: "Japan",
        curriculums: [
          { name: "High School", subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "Japanese"], grades: ["10-12"] },
          { name: "International Baccalaureate", subjects: ["Mathematics", "Sciences", "Languages"], grades: ["11-12"] },
        ],
      },
      {
        name: "South Korea",
        curriculums: [
          { name: "CSAT", subjects: ["Mathematics", "Science", "Korean", "English", "Social Studies"], grades: ["10-12"] },
          { name: "High School", subjects: ["Advanced Mathematics", "Physics", "Chemistry", "Biology"], grades: ["10-12"] },
        ],
      },
      {
        name: "China",
        curriculums: [
          { name: "Gaokao", subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "Chinese"], grades: ["10-12"] },
          { name: "International Schools", subjects: ["Mathematics", "Sciences", "English", "Chinese"], grades: ["K-12"] },
        ],
      },
      {
        name: "Qatar",
        curriculums: [
          { name: "Qatar National", subjects: ["Mathematics", "Science", "Arabic", "English", "Islamic Studies"], grades: ["K-12"] },
          { name: "International Schools", subjects: ["Mathematics", "Physics", "Chemistry", "Biology"], grades: ["K-12"] },
        ],
      },
    ],
  },
  "Oceania": {
    color: "text-orange-600",
    bgColor: "hover:bg-orange-50",
    hoverColor: "group-hover:text-orange-700",
    countries: [
      {
        name: "Australia",
        curriculums: [
          { name: "HSC (NSW)", subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English"], grades: ["11-12"] },
          { name: "VCE (Victoria)", subjects: ["Mathematical Methods", "Specialist Mathematics", "Physics", "Chemistry"], grades: ["11-12"] },
          { name: "ATAR", subjects: ["Mathematics", "Sciences", "English", "Humanities"], grades: ["11-12"] },
        ],
      },
      {
        name: "New Zealand",
        curriculums: [
          { name: "NCEA", subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English"], grades: ["11-13"] },
          { name: "Cambridge International", subjects: ["Mathematics", "Sciences", "Languages"], grades: ["9-13"] },
        ],
      },
      {
        name: "Fiji",
        curriculums: [
          { name: "Form 7", subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English"], grades: ["11-13"] },
          { name: "SPFSC", subjects: ["Mathematics", "Sciences", "Languages"], grades: ["12-13"] },
        ],
      },
    ],
  },
  "Africa": {
    color: "text-red-600",
    bgColor: "hover:bg-red-50",
    hoverColor: "group-hover:text-red-700",
    countries: [
      {
        name: "South Africa",
        curriculums: [
          { name: "CAPS", subjects: ["Mathematics", "Physical Sciences", "Life Sciences", "English", "Afrikaans"], grades: ["R-12"] },
          { name: "IEB", subjects: ["Mathematics", "Science", "Languages", "Commerce"], grades: ["R-12"] },
        ],
      },
      {
        name: "Nigeria",
        curriculums: [
          { name: "WAEC", subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English"], grades: ["7-12"] },
          { name: "JAMB", subjects: ["Mathematics", "English", "Sciences", "Arts"], grades: ["12"] },
        ],
      },
      {
        name: "Ghana",
        curriculums: [
          { name: "WASSCE", subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English"], grades: ["10-12"] },
          { name: "Senior High School", subjects: ["Core Mathematics", "Sciences", "Languages"], grades: ["10-12"] },
        ],
      },
      {
        name: "Kenya",
        curriculums: [
          { name: "KCSE", subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English"], grades: ["9-12"] },
          { name: "8-4-4 System", subjects: ["Mathematics", "Sciences", "Languages", "Humanities"], grades: ["1-12"] },
        ],
      },
      {
        name: "Tanzania",
        curriculums: [
          { name: "NECTA", subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English"], grades: ["1-12"] },
          { name: "Advanced Level", subjects: ["Mathematics", "Sciences", "Languages"], grades: ["11-12"] },
        ],
      },
      {
        name: "Egypt",
        curriculums: [
          { name: "Thanaweya Amma", subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "Arabic"], grades: ["10-12"] },
          { name: "International Schools", subjects: ["Mathematics", "Sciences", "English", "Arabic"], grades: ["K-12"] },
        ],
      },
      {
        name: "Morocco",
        curriculums: [
          { name: "Baccalauréat", subjects: ["Mathématiques", "Physique", "Chimie", "Biologie", "Arabe"], grades: ["10-12"] },
          { name: "International Schools", subjects: ["Mathematics", "Sciences", "French", "Arabic"], grades: ["K-12"] },
        ],
      },
    ],
  },
  "South America": {
    color: "text-teal-600",
    bgColor: "hover:bg-teal-50",
    hoverColor: "group-hover:text-teal-700",
    countries: [
      {
        name: "Brazil",
        curriculums: [
          { name: "ENEM", subjects: ["Matemática", "Ciências da Natureza", "Português", "História", "Geografia"], grades: ["10-12"] },
          { name: "Ensino Médio", subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "Portuguese"], grades: ["10-12"] },
        ],
      },
      {
        name: "Argentina",
        curriculums: [
          { name: "Bachillerato", subjects: ["Matemática", "Física", "Química", "Biología", "Español"], grades: ["10-12"] },
          { name: "International Schools", subjects: ["Mathematics", "Sciences", "Spanish", "English"], grades: ["K-12"] },
        ],
      },
      {
        name: "Chile",
        curriculums: [
          { name: "PSU", subjects: ["Matemática", "Ciencias", "Lenguaje", "Historia"], grades: ["9-12"] },
          { name: "International Baccalaureate", subjects: ["Mathematics", "Sciences", "Languages"], grades: ["11-12"] },
        ],
      },
      {
        name: "Colombia",
        curriculums: [
          { name: "ICFES", subjects: ["Matemáticas", "Ciencias", "Español", "Inglés", "Sociales"], grades: ["9-11"] },
          { name: "International Schools", subjects: ["Mathematics", "Sciences", "Spanish", "English"], grades: ["K-11"] },
        ],
      },
    ],
  },
};

export const ContinentCountriesMenu = () => {
  return (
    <div className="bg-gradient-to-r from-slate-50 via-blue-50 to-purple-50 border-b border-gray-200 shadow-sm relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center py-4">
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-1">
              {Object.entries(continentData).map(([continent, continentInfo]) => (
                <NavigationMenuItem key={continent}>
                  <NavigationMenuTrigger 
                    className={`text-sm font-semibold ${continentInfo.color} ${continentInfo.bgColor} border border-gray-200 rounded-lg px-4 py-2 shadow-sm transition-all duration-200 hover:shadow-md hover:scale-105 group`}
                  >
                    <span className={continentInfo.hoverColor}>{continent}</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[1200px] p-0 bg-white shadow-2xl border rounded-lg overflow-hidden">
                      <div className="flex">
                        {/* Countries Column */}
                        <div className="w-56 bg-gray-50 border-r border-gray-200">
                          <div className={`p-4 ${continentInfo.bgColor} border-b border-gray-200`}>
                            <h3 className={`font-bold text-lg ${continentInfo.color}`}>
                              {continent}
                            </h3>
                            <p className="text-xs text-gray-600">Select a country</p>
                          </div>
                          <div className="p-2">
                            {continentInfo.countries.map((country) => (
                              <div 
                                key={country.name}
                                className="group/country relative"
                              >
                                <div className="p-3 hover:bg-white hover:shadow-sm rounded-lg cursor-pointer transition-all duration-200 border border-transparent hover:border-gray-200 mb-1">
                                  <div className="font-medium text-gray-800 group-hover/country:text-blue-600">
                                    {country.name}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {country.curriculums.length} curriculum{country.curriculums.length > 1 ? 's' : ''}
                                  </div>
                                </div>
                                
                                {/* Country Details - Shows on hover */}
                                <div className="absolute left-full top-0 ml-1 w-[920px] bg-white border border-gray-200 rounded-lg shadow-xl opacity-0 invisible group-hover/country:opacity-100 group-hover/country:visible transition-all duration-300 z-50">
                                  <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
                                    <h4 className="font-bold text-xl text-blue-700">{country.name}</h4>
                                    <p className="text-sm text-gray-600">Educational Curriculums & Programs</p>
                                  </div>
                                  
                                  <div className="p-4 grid grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                                    {country.curriculums.map((curriculum) => (
                                      <div 
                                        key={curriculum.name} 
                                        className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
                                      >
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
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Default view when no country is hovered */}
                        <div className="flex-1 p-8 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
                          <div className="text-center">
                            <div className={`w-16 h-16 ${continentInfo.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 border-2 ${continentInfo.color.replace('text-', 'border-')}`}>
                              <span className={`text-2xl font-bold ${continentInfo.color}`}>
                                {continent.charAt(0)}
                              </span>
                            </div>
                            <h4 className={`text-xl font-semibold ${continentInfo.color} mb-2`}>
                              Explore {continent}
                            </h4>
                            <p className="text-gray-600 text-sm">
                              Hover over any country to see detailed curriculum information, subjects, and grade levels.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </div>
  );
};

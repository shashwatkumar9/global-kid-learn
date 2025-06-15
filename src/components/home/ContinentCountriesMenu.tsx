
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
    ],
  },
  "Europe": {
    color: "text-green-600",
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
    ],
  },
  "Asia & Middle East": {
    color: "text-purple-600",
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
    ],
  },
  "Oceania": {
    color: "text-orange-600",
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
    ],
  },
  "Africa": {
    color: "text-red-600",
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
    ],
  },
  "South America": {
    color: "text-teal-600",
    countries: [
      {
        name: "Brazil",
        curriculums: [
          { name: "ENEM", subjects: ["Matemática", "Ciências da Natureza", "Português", "História", "Geografia"], grades: ["10-12"] },
          { name: "Ensino Médio", subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "Portuguese"], grades: ["10-12"] },
        ],
      },
    ],
  },
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-xs font-medium leading-none">{title}</div>
          {children && <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
            {children}
          </p>}
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

// Get all countries with their continent colors
const getAllCountriesWithColors = () => {
  const countries: Array<{ name: string; color: string; data: any }> = [];
  Object.entries(continentData).forEach(([continent, continentInfo]) => {
    continentInfo.countries.forEach(country => {
      countries.push({
        name: country.name,
        color: continentInfo.color,
        data: country
      });
    });
  });
  return countries;
};

export const ContinentCountriesMenu = () => {
  const allCountries = getAllCountriesWithColors();

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex flex-wrap justify-center gap-2">
        {allCountries.map((country) => (
          <NavigationMenuItem key={country.name}>
            <NavigationMenuTrigger className={`text-base font-semibold ${country.color} hover:${country.color.replace('text-', 'bg-').replace('-600', '-50')}`}>
              {country.name}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[800px] p-6 bg-white shadow-lg border">
                <h2 className={`font-bold text-xl mb-4 ${country.color} border-b border-gray-200 pb-2`}>
                  {country.name} - Curriculums & Subjects
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  {country.data.curriculums.map((curriculum: any) => (
                    <div key={curriculum.name} className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-lg mb-3 text-blue-700 border-b border-blue-200 pb-2">
                        {curriculum.name}
                      </h3>
                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-600 mb-2">Subjects:</p>
                        <ul className="grid grid-cols-1 gap-1">
                          {curriculum.subjects.map((subject: string) => (
                            <ListItem 
                              key={subject} 
                              href={`/subjects/${subject.toLowerCase().replace(/ /g, '-')}`} 
                              title={subject}
                              className="text-sm py-1 hover:bg-blue-50"
                            />
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-2">Grades:</p>
                        <div className="flex flex-wrap gap-1">
                          {curriculum.grades.map((grade: string) => (
                            <span 
                              key={grade} 
                              className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 cursor-pointer"
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
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

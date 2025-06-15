
import * as React from "react";
import { Country } from "@/data/continentData";
import { CurriculumCard } from "./CurriculumCard";

interface CountryDetailsProps {
  country: Country;
}

export const CountryDetails = ({ country }: CountryDetailsProps) => {
  return (
    <div className="bg-white">
      <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200 sticky top-0 bg-white z-10">
        <h4 className="font-bold text-xl text-blue-700">{country.name}</h4>
        <p className="text-sm text-gray-600">Educational Curriculums & Programs</p>
      </div>
      
      <div className="p-4 grid grid-cols-3 gap-4">
        {country.curriculums.map((curriculum) => (
          <CurriculumCard key={curriculum.name} curriculum={curriculum} />
        ))}
      </div>
    </div>
  );
};

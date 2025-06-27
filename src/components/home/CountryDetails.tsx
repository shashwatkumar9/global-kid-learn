
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Country } from "@/data/continentData";
import { CurriculumCard } from "./CurriculumCard";

interface CountryDetailsProps {
  country: Country;
  continent: string;
}

export const CountryDetails = ({ country, continent }: CountryDetailsProps) => {
  const navigate = useNavigate();

  const handleCountryClick = () => {
    const continentSlug = continent.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const countrySlug = country.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    navigate(`/${continentSlug}/${countrySlug}`);
  };

  return (
    <div className="bg-white">
      <div 
        className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200 sticky top-0 bg-white z-10 cursor-pointer hover:bg-opacity-80 transition-colors"
        onClick={handleCountryClick}
      >
        <h4 className="font-bold text-xl text-blue-700 hover:underline">{country.name}</h4>
        <p className="text-sm text-gray-600">
          {country.curriculums.length} Educational Curriculum{country.curriculums.length > 1 ? 's' : ''} & Programs • Click to explore
        </p>
      </div>
      
      <div className="p-4 grid grid-cols-3 gap-4">
        {country.curriculums.map((curriculum) => (
          <CurriculumCard 
            key={curriculum.name} 
            curriculum={curriculum} 
            country={country}
            continent={continent}
          />
        ))}
      </div>
    </div>
  );
};

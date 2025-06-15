
import * as React from "react";
import { Country } from "@/data/continentData";
import { CountryDetails } from "./CountryDetails";

interface CountryItemProps {
  country: Country;
}

export const CountryItem = ({ country }: CountryItemProps) => {
  return (
    <div className="group/country relative">
      <div className="p-3 hover:bg-white hover:shadow-sm rounded-lg cursor-pointer transition-all duration-200 border border-transparent hover:border-gray-200 mb-1">
        <div className="font-medium text-gray-800 group-hover/country:text-blue-600">
          {country.name}
        </div>
        <div className="text-xs text-gray-500">
          {country.curriculums.length} curriculum{country.curriculums.length > 1 ? 's' : ''}
        </div>
      </div>
      
      <CountryDetails country={country} />
    </div>
  );
};


import * as React from "react";
import { Country } from "@/data/continentData";
import { cn } from "@/lib/utils";

interface CountryItemProps {
  country: Country;
  onMouseEnter: () => void;
  isActive: boolean;
}

export const CountryItem = ({ country, onMouseEnter, isActive }: CountryItemProps) => {
  return (
    <div 
      className={cn(
        "p-3 rounded-lg cursor-pointer transition-all duration-200 border border-transparent mb-1 group",
        isActive ? "bg-white shadow-sm border-gray-200" : "hover:bg-gray-100"
      )}
      onMouseEnter={onMouseEnter}
    >
      <div className={cn(
        "font-medium text-gray-800",
        isActive ? "text-blue-600" : "group-hover:text-blue-600"
      )}>
        {country.name}
      </div>
      <div className="text-xs text-gray-500">
        {country.curriculums.length} curriculum{country.curriculums.length > 1 ? 's' : ''}
      </div>
    </div>
  );
};

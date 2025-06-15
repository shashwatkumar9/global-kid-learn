
import * as React from "react";
import { continentData } from "@/data/continentData";
import { ContinentButton } from "./ContinentButton";

export const ContinentCountriesMenu = () => {
  return (
    <div className="bg-gradient-to-r from-slate-50 via-blue-50 to-purple-50 border-b border-gray-200 shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center py-4">
          <div className="flex space-x-1">
            {Object.entries(continentData).map(([continent, continentInfo]) => (
              <ContinentButton 
                key={continent} 
                continent={continent} 
                continentInfo={continentInfo} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

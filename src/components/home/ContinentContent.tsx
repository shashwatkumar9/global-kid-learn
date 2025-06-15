
import * as React from "react";
import { ContinentInfo, Country } from "@/data/continentData";
import { CountryItem } from "./CountryItem";
import { CountryDetails } from "./CountryDetails";

interface ContinentContentProps {
  continent: string;
  continentInfo: ContinentInfo;
}

export const ContinentContent = ({ continent, continentInfo }: ContinentContentProps) => {
  const [hoveredCountry, setHoveredCountry] = React.useState<Country | null>(null);

  return (
    <div 
      className="absolute top-full left-0 right-0 bg-white shadow-lg border rounded-lg overflow-hidden mx-auto w-full"
      onMouseLeave={() => setHoveredCountry(null)}
    >
      <div className="flex max-h-[450px]">
        {/* Countries Column */}
        <div className="w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto">
          <div className={`p-4 ${continentInfo.bgColor.replace('hover:','')} border-b border-gray-200 sticky top-0 bg-gray-50 z-10`}>
            <h3 className={`font-bold text-lg ${continentInfo.color}`}>
              {continent}
            </h3>
            <p className="text-xs text-gray-600">Select a country</p>
          </div>
          <div className="p-2">
            {continentInfo.countries.map((country) => (
              <CountryItem 
                key={country.name} 
                country={country} 
                onMouseEnter={() => setHoveredCountry(country)}
                isActive={hoveredCountry?.name === country.name}
              />
            ))}
          </div>
        </div>
        
        {/* Details Column */}
        <div className="flex-1 overflow-y-auto">
          {hoveredCountry ? (
            <CountryDetails country={hoveredCountry} />
          ) : (
            <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-white p-8">
              <div className="text-center">
                <div className={`w-16 h-16 ${continentInfo.bgColor.replace('hover:','')} rounded-full flex items-center justify-center mx-auto mb-4 border-2 ${continentInfo.color.replace('text-', 'border-')}`}>
                  <span className={`text-2xl font-bold ${continentInfo.color}`}>
                    {continent.charAt(0)}
                  </span>
                </div>
                <h4 className={`text-xl font-semibold ${continentInfo.color} mb-2`}>
                  Explore {continent}
                </h4>
                <p className="text-gray-600 text-sm">
                  Hover over any country to see detailed curriculum information.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

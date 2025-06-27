
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ContinentInfo, Country } from "@/data/continentData";
import { CountryItem } from "./CountryItem";
import { CountryDetails } from "./CountryDetails";

interface ContinentContentProps {
  continent: string;
  continentInfo: ContinentInfo;
}

export const ContinentContent = ({ continent, continentInfo }: ContinentContentProps) => {
  const [hoveredCountry, setHoveredCountry] = React.useState<Country | null>(null);
  const navigate = useNavigate();

  const handleContinentClick = () => {
    const continentSlug = continent.toLowerCase().replace(/[^a-z0-9]/g, '-');
    navigate(`/${continentSlug}`);
  };

  return (
    <div 
      className="absolute top-full left-0 right-0 bg-white shadow-lg border rounded-lg overflow-hidden mx-auto w-full"
      onMouseLeave={() => setHoveredCountry(null)}
    >
      <div className="flex max-h-[450px]">
        {/* Countries Column */}
        <div className="w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto">
          <div 
            className={`p-4 ${continentInfo.bgColor.replace('hover:','')} border-b border-gray-200 sticky top-0 bg-gray-50 z-10 cursor-pointer hover:bg-opacity-80 transition-colors`}
            onClick={handleContinentClick}
          >
            <h3 className={`font-bold text-lg ${continentInfo.color} hover:underline`}>
              {continent}
            </h3>
            <p className="text-xs text-gray-600">Click to explore or select a country</p>
          </div>
          <div className="p-2">
            {continentInfo.countries.map((country) => (
              <CountryItem 
                key={country.name} 
                country={country} 
                continent={continent}
                onMouseEnter={() => setHoveredCountry(country)}
                isActive={hoveredCountry?.name === country.name}
              />
            ))}
          </div>
        </div>
        
        {/* Details Column */}
        <div className="flex-1 overflow-y-auto">
          {hoveredCountry ? (
            <CountryDetails 
              country={hoveredCountry} 
              continent={continent} 
            />
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
                <p className="text-gray-600 text-sm mb-4">
                  Hover over any country to see detailed curriculum information,<br />
                  or click the continent title above to explore all countries.
                </p>
                <button 
                  onClick={handleContinentClick}
                  className={`px-4 py-2 rounded-lg text-white font-medium transition-colors ${continentInfo.bgColor.replace('hover:bg-', 'bg-').replace('-50', '-600')} hover:${continentInfo.bgColor.replace('hover:bg-', 'bg-').replace('-50', '-700')}`}
                >
                  View All Countries in {continent}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

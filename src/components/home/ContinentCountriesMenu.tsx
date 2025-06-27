
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { continentData } from "@/data/continentData";
import { ContinentContent } from "./ContinentContent";

export const ContinentCountriesMenu = () => {
  const [activeContinent, setActiveContinent] = React.useState<string | null>(null);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  const handleMouseEnter = (continent: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setActiveContinent(continent);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setActiveContinent(null);
    }, 200);
  };

  const cancelMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const handleContinentClick = (continent: string) => {
    const continentSlug = continent.toLowerCase().replace(/[^a-z0-9]/g, '-');
    navigate(`/${continentSlug}`);
  };

  React.useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div 
      className="bg-gradient-to-r from-slate-50 via-blue-50 to-purple-50 border-b border-gray-200 shadow-sm"
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center py-4 space-x-1">
          {Object.entries(continentData).map(([continent, continentInfo]) => (
            <button
              key={continent}
              onMouseEnter={() => handleMouseEnter(continent)}
              onClick={() => handleContinentClick(continent)}
              className={`group text-sm font-semibold border rounded-lg px-4 py-2 transition-all duration-200 focus:outline-none cursor-pointer ${continentInfo.bgColor} ${activeContinent === continent ? 'shadow-md scale-105 border-gray-200 ' + continentInfo.bgColor.replace('hover:','') : 'border-transparent shadow-sm'}`}
            >
              <span className={`${continentInfo.color} ${continentInfo.hoverColor} ${activeContinent === continent ? continentInfo.hoverColor.replace('group-hover:','') : ''}`}>
                {continent}
              </span>
            </button>
          ))}
        </div>
        
        <div 
          onMouseEnter={cancelMouseLeave} 
          onMouseLeave={handleMouseLeave}
          className="absolute top-full left-0 w-full z-50 data-[state=closed]:hidden data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
          data-state={activeContinent ? 'open' : 'closed'}
        >
          {activeContinent && (
              <ContinentContent 
                continent={activeContinent}
                continentInfo={continentData[activeContinent as keyof typeof continentData]}
              />
          )}
        </div>
      </div>
    </div>
  );
};

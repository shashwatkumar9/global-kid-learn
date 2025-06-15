
import * as React from "react";
import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { ContinentInfo } from "@/data/continentData";
import { CountryItem } from "./CountryItem";

interface ContinentNavItemProps {
  continent: string;
  continentInfo: ContinentInfo;
}

export const ContinentNavItem = ({ continent, continentInfo }: ContinentNavItemProps) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger 
        className={`text-sm font-semibold ${continentInfo.color} ${continentInfo.bgColor} border border-gray-200 rounded-lg px-4 py-2 shadow-sm transition-all duration-200 hover:shadow-md data-[state=open]:scale-105 hover:scale-105 [&>svg]:hidden focus:ring-0 focus:ring-offset-0`}
      >
        <span className={continentInfo.hoverColor}>{continent}</span>
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="w-[1200px] bg-white shadow-lg border rounded-lg overflow-visible">
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
                  <CountryItem key={country.name} country={country} />
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
  );
};

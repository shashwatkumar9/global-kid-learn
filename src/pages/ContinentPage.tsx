
import { useParams, Link } from 'react-router-dom';
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { continentData } from "@/data/continentData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Users, BookOpen } from "lucide-react";

const ContinentPage = () => {
  const { continentName } = useParams();
  
  const continentKey = Object.keys(continentData).find(
    key => key.toLowerCase().replace(/[^a-z0-9]/g, '-') === continentName
  );
  
  const continent = continentKey ? continentData[continentKey as keyof typeof continentData] : null;

  if (!continent) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header user={null} profile={null} onDashboardNavigation={() => {}} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-center">Continent Not Found</h1>
          <p className="text-center mt-4">
            <Link to="/" className="text-blue-600 hover:underline">Return to Home</Link>
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={null} profile={null} onDashboardNavigation={() => {}} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold capitalize mb-4">{continentKey}</h1>
          <p className="text-lg text-gray-600">
            Explore educational curriculums and programs across {continentKey}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {continent.countries.map((country) => (
            <Card key={country.name} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Globe className="w-8 h-8 text-blue-600" />
                  <div>
                    <CardTitle>{country.name}</CardTitle>
                    <CardDescription>
                      {country.curriculums.length} curriculum{country.curriculums.length > 1 ? 's' : ''} available
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  {country.curriculums.slice(0, 3).map((curriculum) => (
                    <div key={curriculum.name} className="flex items-center space-x-2 text-sm text-gray-600">
                      <BookOpen className="w-4 h-4" />
                      <span>{curriculum.name}</span>
                    </div>
                  ))}
                  {country.curriculums.length > 3 && (
                    <p className="text-sm text-gray-500">
                      +{country.curriculums.length - 3} more curriculums
                    </p>
                  )}
                </div>
                <Link 
                  to={`/${continentName}/${country.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Users className="w-4 h-4" />
                  <span>Explore {country.name}</span>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContinentPage;

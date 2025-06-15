
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { 
  GraduationCap, 
  LogIn, 
  UserCheck,
  Crown,
  Phone,
  FileText,
  CreditCard,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface HeaderProps {
  user: any;
  profile: any;
  onDashboardNavigation: () => void;
}

const countries = [
  {
    name: "UK",
    curriculums: [
      { name: "GCSE", subjects: ["Mathematics", "English", "Science", "History", "Geography"] },
      { name: "A-Levels", subjects: ["Further Maths", "Chemistry", "Physics", "Biology", "Economics"] },
      { name: "IB", subjects: ["Mathematics HL", "English A", "Sciences", "Humanities"] },
    ],
  },
  {
    name: "Ireland",
    curriculums: [
      { name: "Junior Cycle", subjects: ["Mathematics", "English", "Irish", "Science", "History"] },
      { name: "Leaving Certificate", subjects: ["Higher Level Maths", "Applied Maths", "Physics", "Chemistry", "Biology"] },
    ],
  },
  {
    name: "USA",
    curriculums: [
      { name: "Common Core", subjects: ["Math", "English Language Arts", "Science", "Social Studies"] },
      { name: "AP", subjects: ["AP Calculus", "AP Physics", "AP Chemistry", "AP Biology", "AP History"] },
      { name: "SAT Prep", subjects: ["Math", "Reading", "Writing", "Essay"] },
    ],
  },
  {
    name: "India",
    curriculums: [
      { name: "CBSE", subjects: ["Mathematics", "Science", "Social Science", "English", "Hindi"] },
      { name: "ICSE", subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English"] },
      { name: "State Boards", subjects: ["Mathematics", "Science", "Languages", "Social Studies"] },
    ],
  },
  {
    name: "South Africa",
    curriculums: [
      { name: "CAPS", subjects: ["Mathematics", "Physical Sciences", "Life Sciences", "English", "Afrikaans"] },
      { name: "IEB", subjects: ["Mathematics", "Science", "Languages", "Commerce"] },
    ],
  },
  {
    name: "Germany",
    curriculums: [
      { name: "Gymnasium", subjects: ["Mathematik", "Physik", "Chemie", "Biologie", "Deutsch"] },
      { name: "Abitur", subjects: ["Advanced Mathematics", "Sciences", "Languages", "Social Studies"] },
    ],
  },
  {
    name: "Netherlands",
    curriculums: [
      { name: "VWO", subjects: ["Wiskunde", "Natuurkunde", "Scheikunde", "Biologie", "Nederlands"] },
      { name: "HAVO", subjects: ["Mathematics", "Sciences", "Languages", "Economics"] },
    ],
  },
  {
    name: "Canada",
    curriculums: [
      { name: "Ontario", subjects: ["Functions", "Advanced Functions", "Physics", "Chemistry", "Biology"] },
      { name: "British Columbia", subjects: ["Pre-Calculus", "Calculus", "Physics", "Chemistry", "English"] },
      { name: "Alberta", subjects: ["Mathematics", "Science", "Social Studies", "English"] },
    ],
  },
  {
    name: "Australia",
    curriculums: [
      { name: "HSC (NSW)", subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English"] },
      { name: "VCE (Victoria)", subjects: ["Mathematical Methods", "Specialist Mathematics", "Physics", "Chemistry"] },
      { name: "ATAR", subjects: ["Mathematics", "Sciences", "English", "Humanities"] },
    ],
  },
  {
    name: "New Zealand",
    curriculums: [
      { name: "NCEA", subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English"] },
      { name: "Cambridge International", subjects: ["Mathematics", "Sciences", "Languages"] },
    ],
  },
  {
    name: "UAE",
    curriculums: [
      { name: "Ministry of Education", subjects: ["Mathematics", "Science", "Arabic", "English", "Islamic Studies"] },
      { name: "IB", subjects: ["Mathematics", "Sciences", "Languages", "Humanities"] },
      { name: "British Curriculum", subjects: ["Mathematics", "Physics", "Chemistry", "Biology"] },
    ],
  },
  {
    name: "Saudi Arabia",
    curriculums: [
      { name: "Saudi National", subjects: ["Mathematics", "Science", "Arabic", "Islamic Studies", "English"] },
      { name: "International Schools", subjects: ["Mathematics", "Physics", "Chemistry", "Biology"] },
    ],
  },
  {
    name: "Singapore",
    curriculums: [
      { name: "O-Levels", subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English"] },
      { name: "A-Levels", subjects: ["H2 Mathematics", "H2 Physics", "H2 Chemistry", "H2 Biology"] },
      { name: "IB", subjects: ["Mathematics HL", "Sciences", "Languages"] },
    ],
  },
  {
    name: "France",
    curriculums: [
      { name: "Baccalauréat", subjects: ["Mathématiques", "Physique-Chimie", "SVT", "Français", "Histoire"] },
      { name: "International Sections", subjects: ["Mathematics", "Sciences", "Languages"] },
    ],
  },
  {
    name: "Italy",
    curriculums: [
      { name: "Liceo Scientifico", subjects: ["Matematica", "Fisica", "Chimica", "Biologia", "Italiano"] },
      { name: "Esame di Stato", subjects: ["Mathematics", "Sciences", "Languages", "Humanities"] },
    ],
  },
  {
    name: "Brazil",
    curriculums: [
      { name: "ENEM", subjects: ["Matemática", "Ciências da Natureza", "Português", "História", "Geografia"] },
      { name: "Ensino Médio", subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "Portuguese"] },
    ],
  },
  {
    name: "Nigeria",
    curriculums: [
      { name: "WAEC", subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English"] },
      { name: "JAMB", subjects: ["Mathematics", "English", "Sciences", "Arts"] },
    ],
  },
  {
    name: "Ghana",
    curriculums: [
      { name: "WASSCE", subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English"] },
      { name: "Senior High School", subjects: ["Core Mathematics", "Sciences", "Languages"] },
    ],
  },
  {
    name: "Tanzania",
    curriculums: [
      { name: "NECTA", subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English"] },
      { name: "Advanced Level", subjects: ["Mathematics", "Sciences", "Languages"] },
    ],
  },
  {
    name: "Egypt",
    curriculums: [
      { name: "Thanaweya Amma", subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "Arabic"] },
      { name: "International Schools", subjects: ["Mathematics", "Sciences", "English", "Arabic"] },
    ],
  },
];

const allSubjects = [
  { title: "Mathematics", href: "/subjects/mathematics", description: "From algebra to calculus, master all mathematical concepts." },
  { title: "Physics", href: "/subjects/physics", description: "Explore mechanics, thermodynamics, and quantum physics." },
  { title: "Chemistry", href: "/subjects/chemistry", description: "Learn organic, inorganic, and physical chemistry." },
  { title: "Biology", href: "/subjects/biology", description: "Study life sciences, genetics, and human biology." },
  { title: "English", href: "/subjects/english", description: "Improve reading, writing, and literature skills." },
  { title: "History", href: "/subjects/history", description: "Learn about world events and historical periods." },
  { title: "Geography", href: "/subjects/geography", description: "Understand physical and human geography concepts." },
  { title: "Economics", href: "/subjects/economics", description: "Study micro and macroeconomics principles." },
  { title: "Computer Science", href: "/subjects/computer-science", description: "Programming, algorithms, and computer systems." },
  { title: "Languages", href: "/subjects/languages", description: "Foreign languages and linguistics." },
];

const allGrades = [
  { title: "Primary (K-5)", href: "/grades/k-5", description: "Foundation learning for young students." },
  { title: "Middle School (6-8)", href: "/grades/6-8", description: "Building core academic skills." },
  { title: "High School (9-12)", href: "/grades/9-12", description: "Advanced topics and exam preparation." },
  { title: "A-Levels", href: "/grades/a-levels", description: "Advanced level qualifications." },
  { title: "IB Programme", href: "/grades/ib", description: "International Baccalaureate curriculum." },
  { title: "University Prep", href: "/grades/university-prep", description: "Preparation for higher education." },
];

export const Header = ({ user, profile, onDashboardNavigation }: HeaderProps) => {
  const navigate = useNavigate();
  const { subscribed } = useSubscription();

  return (
    <div className="w-full">
      {/* Top Navigation Bar */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-10 text-sm">
            <div className="flex items-center space-x-6">
              <a href="/about" className="text-gray-600 hover:text-blue-600 flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>About Us</span>
              </a>
              <a href="/pricing" className="text-gray-600 hover:text-blue-600 flex items-center space-x-1">
                <CreditCard className="w-4 h-4" />
                <span>Pricing</span>
              </a>
            </div>
            <div className="flex items-center space-x-6">
              <a href="/terms" className="text-gray-600 hover:text-blue-600 flex items-center space-x-1">
                <FileText className="w-4 h-4" />
                <span>Terms & Conditions</span>
              </a>
              <a href="/contact" className="text-gray-600 hover:text-blue-600 flex items-center space-x-1">
                <Phone className="w-4 h-4" />
                <span>Contact Us</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                K12Expert
              </span>
            </div>
            
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Countries & Curriculums</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[1200px] gap-4 p-6 md:grid-cols-4 lg:grid-cols-5">
                      {countries.map((country) => (
                        <div key={country.name} className="flex flex-col">
                          <h3 className="font-bold text-base mb-3 text-blue-600 px-3">{country.name}</h3>
                          {country.curriculums.map((curriculum) => (
                            <div key={curriculum.name} className="mb-3">
                              <h4 className="font-semibold text-sm mb-2 px-3 text-gray-700">{curriculum.name}</h4>
                              <ul className="flex flex-col space-y-1">
                                {curriculum.subjects.slice(0, 3).map((subject) => (
                                  <ListItem 
                                    key={subject} 
                                    href={`/subjects/${subject.toLowerCase().replace(/ /g, '-')}`} 
                                    title={subject}
                                    className="text-xs py-1"
                                  />
                                ))}
                                {curriculum.subjects.length > 3 && (
                                  <ListItem 
                                    href={`/country/${country.name.toLowerCase()}/curriculum/${curriculum.name.toLowerCase()}`}
                                    title={`+${curriculum.subjects.length - 3} more`}
                                    className="text-xs py-1 text-blue-500"
                                  />
                                )}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Subjects</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[600px] gap-3 p-4 md:w-[700px] md:grid-cols-2 lg:w-[800px]">
                      {allSubjects.map((subject) => (
                        <ListItem
                          key={subject.title}
                          title={subject.title}
                          href={subject.href}
                        >
                          {subject.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Grades & Levels</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[500px] gap-3 p-4 md:w-[600px] lg:w-[700px] lg:grid-cols-2">
                      {allGrades.map((grade) => (
                        <ListItem key={grade.title} title={grade.title} href={grade.href}>
                          {grade.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  {subscribed && (
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center space-x-1">
                      <Crown className="w-3 h-3" />
                      <span>Premium</span>
                    </Badge>
                  )}
                  <span className="text-sm text-gray-600">
                    Welcome, {profile?.first_name}!
                  </span>
                  <Button onClick={onDashboardNavigation} size="sm">
                    <UserCheck className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => navigate("/subscription")}
                  >
                    {subscribed ? "Manage" : "Upgrade"}
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button variant="outline" onClick={() => navigate("/auth")} size="sm">
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                  <Button onClick={() => navigate("/subscription")} size="sm">
                    Subscribe
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          {children && <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>}
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

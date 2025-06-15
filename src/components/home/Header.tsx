
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { 
  GraduationCap, 
  LogIn, 
  UserCheck,
  Crown
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

const learningPaths = [
  {
    country: "USA",
    curriculums: [
      { name: "Common Core", subjects: ["Math", "Science", "History"] },
      { name: "AP", subjects: ["Calculus", "Physics", "US History"] },
    ],
  },
  {
    country: "UK",
    curriculums: [
      { name: "GCSE", subjects: ["Mathematics", "Biology", "Geography"] },
      { name: "A-Levels", subjects: ["Further Maths", "Chemistry", "Economics"] },
    ],
  },
  {
    country: "Canada",
    curriculums: [
      { name: "Ontario", subjects: ["Functions", "Physics", "Canadian History"] },
      { name: "British Columbia", subjects: ["Pre-Calculus", "Chemistry", "Social Studies"] },
    ],
  },
];

const subjects: { title: string; href: string; description: string }[] = [
  { title: "Mathematics", href: "/subjects/mathematics", description: "From algebra to calculus, master all concepts." },
  { title: "Science", href: "/subjects/science", description: "Explore biology, chemistry, and physics." },
  { title: "History", href: "/subjects/history", description: "Learn about world events and historical figures." },
  { title: "English", href: "/subjects/english", description: "Improve your reading, writing, and literature skills." },
];

const grades: { title: string; href: string; description: string }[] = [
    { title: "Elementary (K-5)", href: "/grades/k-5", description: "Fun and engaging lessons for young learners." },
    { title: "Middle School (6-8)", href: "/grades/6-8", description: "Building foundational knowledge for higher education." },
    { title: "High School (9-12)", href: "/grades/9-12", description: "Advanced topics and exam preparation." },
];

export const Header = ({ user, profile, onDashboardNavigation }: HeaderProps) => {
  const navigate = useNavigate();
  const { subscribed } = useSubscription();

  return (
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
                <NavigationMenuTrigger>Curriculums</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[600px] gap-3 p-4 md:w-[700px] md:grid-cols-3 lg:w-[900px]">
                    {learningPaths.map((path) => (
                      <div key={path.country} className="flex flex-col">
                        <h3 className="font-bold text-lg mb-2 text-gray-800 px-3">{path.country}</h3>
                        {path.curriculums.map((curriculum) => (
                          <div key={curriculum.name} className="mb-2">
                            <h4 className="font-semibold text-sm mb-1 px-3 text-gray-600">{curriculum.name}</h4>
                            <ul className="flex flex-col">
                              {curriculum.subjects.map((subject) => (
                                <ListItem key={subject} href={`/subjects/${subject.toLowerCase().replace(/ /g, '-')}`} title={subject} />
                              ))}
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
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {subjects.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Grades</NavigationMenuTrigger>
                <NavigationMenuContent>
                   <ul className="grid w-[300px] gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-1">
                    {grades.map((grade) => (
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

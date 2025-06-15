
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const allSubjects = [
  { title: "Mathematics", href: "/subjects/mathematics", description: "From algebra to calculus, master all mathematical concepts.", category: "STEM" },
  { title: "Physics", href: "/subjects/physics", description: "Explore mechanics, thermodynamics, and quantum physics.", category: "STEM" },
  { title: "Chemistry", href: "/subjects/chemistry", description: "Learn organic, inorganic, and physical chemistry.", category: "STEM" },
  { title: "Biology", href: "/subjects/biology", description: "Study life sciences, genetics, and human biology.", category: "STEM" },
  { title: "Computer Science", href: "/subjects/computer-science", description: "Programming, algorithms, and computer systems.", category: "STEM" },
  { title: "English", href: "/subjects/english", description: "Improve reading, writing, and literature skills.", category: "Languages" },
  { title: "History", href: "/subjects/history", description: "Learn about world events and historical periods.", category: "Humanities" },
  { title: "Geography", href: "/subjects/geography", description: "Understand physical and human geography concepts.", category: "Humanities" },
  { title: "Economics", href: "/subjects/economics", description: "Study micro and macroeconomics principles.", category: "Social Sciences" },
  { title: "Business Studies", href: "/subjects/business", description: "Learn business fundamentals and entrepreneurship.", category: "Social Sciences" },
  { title: "Art & Design", href: "/subjects/art", description: "Creative expression and visual arts.", category: "Arts" },
  { title: "Music", href: "/subjects/music", description: "Theory, composition, and performance.", category: "Arts" },
  { title: "Physical Education", href: "/subjects/pe", description: "Health, fitness, and sports science.", category: "Health & PE" },
  { title: "Psychology", href: "/subjects/psychology", description: "Understanding human behavior and mind.", category: "Social Sciences" },
  { title: "Philosophy", href: "/subjects/philosophy", description: "Critical thinking and ethical reasoning.", category: "Humanities" },
];

const allGrades = [
  { title: "Primary (K-5)", href: "/grades/k-5", description: "Foundation learning for young students.", ages: "5-11 years" },
  { title: "Elementary (1-5)", href: "/grades/1-5", description: "Core academic skills development.", ages: "6-11 years" },
  { title: "Middle School (6-8)", href: "/grades/6-8", description: "Building intermediate academic skills.", ages: "11-14 years" },
  { title: "High School (9-12)", href: "/grades/9-12", description: "Advanced topics and exam preparation.", ages: "14-18 years" },
  { title: "GCSE (9-11)", href: "/grades/gcse", description: "General Certificate of Secondary Education.", ages: "14-16 years" },
  { title: "A-Levels (12-13)", href: "/grades/a-levels", description: "Advanced level qualifications.", ages: "16-18 years" },
  { title: "IB Programme (11-12)", href: "/grades/ib", description: "International Baccalaureate curriculum.", ages: "16-18 years" },
  { title: "AP Courses (9-12)", href: "/grades/ap", description: "Advanced Placement for US students.", ages: "14-18 years" },
  { title: "University Prep", href: "/grades/university-prep", description: "Preparation for higher education.", ages: "17-18 years" },
];

const subjectsByCategory = allSubjects.reduce((acc, subject) => {
  if (!acc[subject.category]) {
    acc[subject.category] = [];
  }
  acc[subject.category].push(subject);
  return acc;
}, {} as Record<string, typeof allSubjects>);

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

export const SubjectsGradesMenu = () => {
  return (
    <div className="flex space-x-8">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-base font-semibold">Subjects</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[800px] p-6">
                <div className="grid grid-cols-3 gap-6">
                  {Object.entries(subjectsByCategory).map(([category, subjects]) => (
                    <div key={category} className="flex flex-col">
                      <h3 className="font-bold text-base mb-3 text-blue-600 border-b border-gray-200 pb-2">
                        {category}
                      </h3>
                      <ul className="space-y-2">
                        {subjects.map((subject) => (
                          <ListItem
                            key={subject.title}
                            title={subject.title}
                            href={subject.href}
                            className="text-sm"
                          >
                            {subject.description}
                          </ListItem>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-base font-semibold">Grades & Levels</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[600px] p-6">
                <div className="grid grid-cols-2 gap-4">
                  {allGrades.map((grade) => (
                    <ListItem key={grade.title} title={grade.title} href={grade.href}>
                      <div className="space-y-1">
                        <p>{grade.description}</p>
                        <p className="text-xs text-blue-600">Age: {grade.ages}</p>
                      </div>
                    </ListItem>
                  ))}
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

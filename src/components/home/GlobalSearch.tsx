
import * as React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Search, Book, GraduationCap, Globe, Library, BookOpen, Users, MapPin, Building } from "lucide-react";
import { allSubjects, allGrades } from "./SubjectsGradesMenu";
import { continentData } from "@/data/continentData";
import { useNavigate } from "react-router-dom";

// Base subjects and grades
const subjects = allSubjects.map(item => ({ ...item, type: 'Subject' as const, icon: Book }));
const grades = allGrades.map(item => ({ ...item, type: 'Grade' as const, icon: GraduationCap }));

// Continents with new hierarchical structure
const continents = Object.keys(continentData).map(continent => ({
  title: continent,
  href: `/${continent.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
  description: `Educational systems across ${continent}`,
  type: 'Continent' as const,
  icon: MapPin,
}));

// Countries with new hierarchical structure
const countries = Object.entries(continentData).flatMap(([continentName, continent]) => 
  continent.countries.map(country => ({
    title: `${country.name} (${continentName})`,
    href: `/${continentName.toLowerCase().replace(/[^a-z0-9]/g, '-')}/${country.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
    description: `${country.curriculums.length} curriculum${country.curriculums.length > 1 ? 's' : ''} available`,
    type: 'Country' as const,
    icon: Globe,
  }))
);

// Curriculums with new hierarchical structure
const curriculums = Object.entries(continentData).flatMap(([continentName, continent]) => 
  continent.countries.flatMap(country => 
    country.curriculums.map(curriculum => ({
      title: `${curriculum.name} - ${country.name}`,
      href: `/${continentName.toLowerCase().replace(/[^a-z0-9]/g, '-')}/${country.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}/${curriculum.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      description: `${curriculum.subjects.length} subjects, ${curriculum.grades.length} grades`,
      type: 'Curriculum' as const,
      icon: Library,
    }))
  )
).filter((v,i,a)=>a.findIndex(t=>(t.title === v.title))===i);

// Subject-specific content within curriculums
const curriculumSubjects = Object.entries(continentData).flatMap(([continentName, continent]) => 
  continent.countries.flatMap(country => 
    country.curriculums.flatMap(curriculum =>
      curriculum.subjects.map(subject => ({
        title: `${subject} - ${curriculum.name} (${country.name})`,
        href: `/${continentName.toLowerCase().replace(/[^a-z0-9]/g, '-')}/${country.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}/${curriculum.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}/${subject.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        description: `${subject} curriculum content for ${curriculum.name}`,
        type: 'Curriculum Subject' as const,
        icon: BookOpen,
      }))
    )
  )
).filter((v,i,a)=>a.findIndex(t=>(t.title === v.title))===i);

// Grade-specific content within curriculums
const curriculumGrades = Object.entries(continentData).flatMap(([continentName, continent]) => 
  continent.countries.flatMap(country => 
    country.curriculums.flatMap(curriculum =>
      curriculum.grades.map(grade => ({
        title: `${grade} - ${curriculum.name} (${country.name})`,
        href: `/${continentName.toLowerCase().replace(/[^a-z0-9]/g, '-')}/${country.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}/${curriculum.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}/${grade.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        description: `${grade} level content in ${curriculum.name}`,
        type: 'Curriculum Grade' as const,
        icon: GraduationCap,
      }))
    )
  )
).filter((v,i,a)=>a.findIndex(t=>(t.title === v.title))===i);

// Specific content examples (USA Common Core detailed)
const specificContent = [
  {
    title: 'Mathematics Grade K - Common Core (USA)',
    href: '/north-america/usa/common-core/grade-k/mathematics',
    description: 'Kindergarten Mathematics with Common Core standards',
    type: 'Specific Content' as const,
    icon: BookOpen,
  },
  {
    title: 'Mathematics Grade 1 - Common Core (USA)',
    href: '/north-america/usa/common-core/grade-1/mathematics',
    description: 'First Grade Mathematics with Common Core standards',
    type: 'Specific Content' as const,
    icon: BookOpen,
  },
  {
    title: 'Mathematics Grade 2 - Common Core (USA)',
    href: '/north-america/usa/common-core/grade-2/mathematics',
    description: 'Second Grade Mathematics with Common Core standards',
    type: 'Specific Content' as const,
    icon: BookOpen,
  },
  {
    title: 'English Language Arts Grade K - Common Core (USA)',
    href: '/north-america/usa/common-core/grade-k/english-language-arts',
    description: 'Kindergarten English Language Arts with Common Core standards',
    type: 'Specific Content' as const,
    icon: BookOpen,
  },
  {
    title: 'Science Grade K - Next Generation Science (USA)',
    href: '/north-america/usa/next-generation-science-standards/grade-k/science',
    description: 'Kindergarten Science with Next Generation Science Standards',
    type: 'Specific Content' as const,
    icon: BookOpen,
  },
];

export const GlobalSearch = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => unknown) => {
    setOpen(false);
    command();
  };

  return (
    <>
      <Button
        variant="outline"
        className="relative w-full justify-start text-muted-foreground sm:w-48 md:w-64 lg:w-96"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        <span className="hidden sm:inline-block">Search...</span>
        <span className="inline-block sm:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search for continents, countries, curriculums, subjects, grades..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          <CommandGroup heading="Continents & Regions">
            {continents.map((item) => (
              <CommandItem
                key={item.href}
                onSelect={() => runCommand(() => navigate(item.href))}
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          
          <CommandSeparator />
          <CommandGroup heading="Countries">
            {countries.slice(0, 15).map((item) => (
              <CommandItem
                key={item.href}
                onSelect={() => runCommand(() => navigate(item.href))}
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          
          <CommandSeparator />
          <CommandGroup heading="Curriculums & Programs">
            {curriculums.slice(0, 15).map((item) => (
              <CommandItem
                key={item.href}
                onSelect={() => runCommand(() => navigate(item.href))}
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          
          <CommandSeparator />
          <CommandGroup heading="Subjects by Curriculum">
            {curriculumSubjects.slice(0, 15).map((item) => (
              <CommandItem
                key={item.href}
                onSelect={() => runCommand(() => navigate(item.href))}
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          
          <CommandSeparator />
          <CommandGroup heading="Grades by Curriculum">
            {curriculumGrades.slice(0, 15).map((item) => (
              <CommandItem
                key={item.href}
                onSelect={() => runCommand(() => navigate(item.href))}
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          
          <CommandSeparator />
          <CommandGroup heading="Specific Content Pages">
            {specificContent.map((item) => (
              <CommandItem
                key={item.href}
                onSelect={() => runCommand(() => navigate(item.href))}
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          
          <CommandSeparator />
          <CommandGroup heading="General Subjects">
            {subjects.slice(0, 10).map((item) => (
              <CommandItem
                key={item.href}
                onSelect={() => runCommand(() => navigate(item.href))}
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          
          <CommandSeparator />
          <CommandGroup heading="Grade Levels">
            {grades.slice(0, 10).map((item) => (
              <CommandItem
                key={item.href}
                onSelect={() => runCommand(() => navigate(item.href))}
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

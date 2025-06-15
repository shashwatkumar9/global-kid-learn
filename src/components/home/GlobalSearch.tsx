
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
import { Search, Book, GraduationCap, Globe, Library } from "lucide-react";
import { allSubjects, allGrades } from "./SubjectsGradesMenu";
import { continentData } from "@/data/continentData";
import { useNavigate } from "react-router-dom";

const subjects = allSubjects.map(item => ({ ...item, type: 'Subject' as const, icon: Book }));
const grades = allGrades.map(item => ({ ...item, type: 'Grade' as const, icon: GraduationCap }));

const countries = Object.values(continentData).flatMap(continent => 
  continent.countries.map(country => ({
    title: country.name,
    href: `/countries/${country.name.toLowerCase().replace(/ /g, '-')}`,
    description: `Curriculum: ${country.curriculums[0]?.name || 'Various'}`,
    type: 'Country' as const,
    icon: Globe,
  }))
);

const curriculums = Object.values(continentData).flatMap(continent => 
  continent.countries.flatMap(country => 
    country.curriculums.map(curriculum => ({
      title: curriculum.name,
      href: `/curriculums/${curriculum.name.toLowerCase().replace(/ /g, '-').replace(/\(|\)/g, '')}`,
      description: `Used in ${country.name}`,
      type: 'Curriculum' as const,
      icon: Library,
    }))
  )
).filter((v,i,a)=>a.findIndex(t=>(t.title === v.title))===i);

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
        <CommandInput placeholder="Search for subjects, grades, countries..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Subjects">
            {subjects.map((item) => (
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
          <CommandGroup heading="Grades & Levels">
            {grades.map((item) => (
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
            {countries.map((item) => (
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
          <CommandGroup heading="Curriculums">
            {curriculums.map((item) => (
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

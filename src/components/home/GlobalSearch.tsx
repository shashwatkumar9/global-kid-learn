
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
import { Search, Book, GraduationCap, Globe, Library, BookOpen, Users } from "lucide-react";
import { allSubjects, allGrades } from "./SubjectsGradesMenu";
import { continentData } from "@/data/continentData";
import { useNavigate } from "react-router-dom";

// Base subjects and grades
const subjects = allSubjects.map(item => ({ ...item, type: 'Subject' as const, icon: Book }));
const grades = allGrades.map(item => ({ ...item, type: 'Grade' as const, icon: GraduationCap }));

// Countries
const countries = Object.values(continentData).flatMap(continent => 
  continent.countries.map(country => ({
    title: country.name,
    href: `/countries/${country.name.toLowerCase().replace(/ /g, '-')}`,
    description: `Curriculum: ${country.curriculums[0]?.name || 'Various'}`,
    type: 'Country' as const,
    icon: Globe,
  }))
);

// Curriculums with country names in brackets
const curriculums = Object.values(continentData).flatMap(continent => 
  continent.countries.flatMap(country => 
    country.curriculums.map(curriculum => ({
      title: `${curriculum.name} (${country.name})`,
      href: `/curriculums/${curriculum.name.toLowerCase().replace(/ /g, '-').replace(/\(|\)/g, '')}`,
      description: `Used in ${country.name} - Covers ${curriculum.subjects.join(', ')}`,
      type: 'Curriculum' as const,
      icon: Library,
    }))
  )
).filter((v,i,a)=>a.findIndex(t=>(t.title === v.title))===i);

// Subject-Grade combinations
const subjectGradeCombinations = allSubjects.flatMap(subject =>
  allGrades.map(grade => ({
    title: `${subject.title} - ${grade.title}`,
    href: `/subjects/${subject.title.toLowerCase().replace(/ /g, '-')}/grades/${grade.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
    description: `${subject.title} curriculum for ${grade.title}`,
    type: 'Subject-Grade' as const,
    icon: BookOpen,
  }))
);

// Subject-Curriculum combinations
const subjectCurriculumCombinations = allSubjects.flatMap(subject =>
  Object.values(continentData).flatMap(continent =>
    continent.countries.flatMap(country =>
      country.curriculums
        .filter(curriculum => curriculum.subjects.some(s => s.toLowerCase().includes(subject.title.toLowerCase()) || subject.title.toLowerCase().includes(s.toLowerCase())))
        .map(curriculum => ({
          title: `${subject.title} - ${curriculum.name} (${country.name})`,
          href: `/subjects/${subject.title.toLowerCase().replace(/ /g, '-')}/curriculums/${curriculum.name.toLowerCase().replace(/ /g, '-').replace(/\(|\)/g, '')}`,
          description: `${subject.title} in ${curriculum.name} curriculum from ${country.name}`,
          type: 'Subject-Curriculum' as const,
          icon: Users,
        }))
    )
  )
).filter((v,i,a)=>a.findIndex(t=>(t.title === v.title))===i);

// Grade-Curriculum combinations
const gradeCurriculumCombinations = allGrades.flatMap(grade =>
  Object.values(continentData).flatMap(continent =>
    continent.countries.flatMap(country =>
      country.curriculums
        .filter(curriculum => curriculum.grades.some(g => g.toLowerCase().includes(grade.title.toLowerCase()) || grade.title.toLowerCase().includes(g.toLowerCase())))
        .map(curriculum => ({
          title: `${grade.title} - ${curriculum.name} (${country.name})`,
          href: `/grades/${grade.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}/curriculums/${curriculum.name.toLowerCase().replace(/ /g, '-').replace(/\(|\)/g, '')}`,
          description: `${grade.title} level in ${curriculum.name} curriculum from ${country.name}`,
          type: 'Grade-Curriculum' as const,
          icon: Users,
        }))
    )
  )
).filter((v,i,a)=>a.findIndex(t=>(t.title === v.title))===i);

// Subject-Grade-Curriculum combinations
const subjectGradeCurriculumCombinations = allSubjects.flatMap(subject =>
  allGrades.flatMap(grade =>
    Object.values(continentData).flatMap(continent =>
      continent.countries.flatMap(country =>
        country.curriculums
          .filter(curriculum => 
            curriculum.subjects.some(s => s.toLowerCase().includes(subject.title.toLowerCase()) || subject.title.toLowerCase().includes(s.toLowerCase())) &&
            curriculum.grades.some(g => g.toLowerCase().includes(grade.title.toLowerCase()) || grade.title.toLowerCase().includes(g.toLowerCase()))
          )
          .map(curriculum => ({
            title: `${subject.title} - ${grade.title} - ${curriculum.name} (${country.name})`,
            href: `/subjects/${subject.title.toLowerCase().replace(/ /g, '-')}/grades/${grade.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}/curriculums/${curriculum.name.toLowerCase().replace(/ /g, '-').replace(/\(|\)/g, '')}`,
            description: `${subject.title} for ${grade.title} in ${curriculum.name} curriculum from ${country.name}`,
            type: 'Subject-Grade-Curriculum' as const,
            icon: Library,
          }))
      )
    )
  )
).filter((v,i,a)=>a.findIndex(t=>(t.title === v.title))===i);

// Specific US curriculum content pages
const usSpecificPages = [
  // Common Core Mathematics by Grade
  {
    title: 'Mathematics - Grade K - Common Core (USA)',
    href: '/subjects/mathematics/grades/grade-k/curriculums/common-core',
    description: 'Kindergarten Mathematics with Common Core standards',
    type: 'Specific Content' as const,
    icon: BookOpen,
  },
  {
    title: 'Mathematics - Grade 1 - Common Core (USA)',
    href: '/subjects/mathematics/grades/grade-1/curriculums/common-core',
    description: 'First Grade Mathematics with Common Core standards',
    type: 'Specific Content' as const,
    icon: BookOpen,
  },
  {
    title: 'Mathematics - Grade 2 - Common Core (USA)',
    href: '/subjects/mathematics/grades/grade-2/curriculums/common-core',
    description: 'Second Grade Mathematics with Common Core standards',
    type: 'Specific Content' as const,
    icon: BookOpen,
  },
  // English Language Arts by Grade
  {
    title: 'English Language Arts - Grade K - Common Core (USA)',
    href: '/subjects/english-language-arts/grades/grade-k/curriculums/common-core',
    description: 'Kindergarten English Language Arts with Common Core standards',
    type: 'Specific Content' as const,
    icon: BookOpen,
  },
  {
    title: 'English Language Arts - Grade 1 - Common Core (USA)',
    href: '/subjects/english-language-arts/grades/grade-1/curriculums/common-core',
    description: 'First Grade English Language Arts with Common Core standards',
    type: 'Specific Content' as const,
    icon: BookOpen,
  },
  // Science by Grade
  {
    title: 'Science - Grade K - Next Generation Science Standards (USA)',
    href: '/subjects/science/grades/grade-k/curriculums/next-generation-science-standards',
    description: 'Kindergarten Science with Next Generation Science Standards',
    type: 'Specific Content' as const,
    icon: BookOpen,
  },
  {
    title: 'Science - Grade 1 - Next Generation Science Standards (USA)',
    href: '/subjects/science/grades/grade-1/curriculums/next-generation-science-standards',
    description: 'First Grade Science with Next Generation Science Standards',
    type: 'Specific Content' as const,
    icon: BookOpen,
  },
  // Theory pages
  {
    title: 'Counting and Cardinality Basics - Grade K Math',
    href: '/subjects/mathematics/grades/grade-k/curriculums/common-core/theory',
    description: 'Kindergarten Math theory on counting and number basics',
    type: 'Theory Content' as const,
    icon: Book,
  },
  {
    title: 'Addition and Subtraction Within 20 - Grade 1 Math',
    href: '/subjects/mathematics/grades/grade-1/curriculums/common-core/theory',
    description: 'First Grade Math theory on addition and subtraction',
    type: 'Theory Content' as const,
    icon: Book,
  },
  {
    title: 'Place Value and Three-Digit Numbers - Grade 2 Math',
    href: '/subjects/mathematics/grades/grade-2/curriculums/common-core/theory',
    description: 'Second Grade Math theory on place value concepts',
    type: 'Theory Content' as const,
    icon: Book,
  },
  // Quiz pages
  {
    title: 'Grade K Math Quiz - Common Core',
    href: '/subjects/mathematics/grades/grade-k/curriculums/common-core/quiz',
    description: 'Kindergarten Mathematics quiz questions',
    type: 'Quiz Content' as const,
    icon: BookOpen,
  },
  {
    title: 'Grade 1 Math Quiz - Common Core',
    href: '/subjects/mathematics/grades/grade-1/curriculums/common-core/quiz',
    description: 'First Grade Mathematics quiz questions',
    type: 'Quiz Content' as const,
    icon: BookOpen,
  },
  {
    title: 'Grade 2 Math Quiz - Common Core',
    href: '/subjects/mathematics/grades/grade-2/curriculums/common-core/quiz',
    description: 'Second Grade Mathematics quiz questions',
    type: 'Quiz Content' as const,
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
        <CommandInput placeholder="Search for subjects, grades, countries, curriculums..." />
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
          
          <CommandSeparator />
          <CommandGroup heading="US Curriculum Content">
            {usSpecificPages.slice(0, 15).map((item) => (
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
          <CommandGroup heading="Subject + Grade Combinations">
            {subjectGradeCombinations.slice(0, 20).map((item) => (
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
          <CommandGroup heading="Subject + Curriculum Combinations">
            {subjectCurriculumCombinations.slice(0, 20).map((item) => (
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
          <CommandGroup heading="Grade + Curriculum Combinations">
            {gradeCurriculumCombinations.slice(0, 20).map((item) => (
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
          <CommandGroup heading="Subject + Grade + Curriculum Combinations">
            {subjectGradeCurriculumCombinations.slice(0, 15).map((item) => (
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

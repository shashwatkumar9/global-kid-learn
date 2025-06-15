export const continentData = {
  "North America": {
    color: "text-blue-600",
    bgColor: "hover:bg-blue-50",
    hoverColor: "group-hover:text-blue-700",
    countries: [
      {
        name: "USA",
        curriculums: [
          { 
            name: "Common Core", 
            subjects: [
              "Mathematics", 
              "English Language Arts"
            ], 
            grades: [
              "Grade K", 
              "Grade 1", 
              "Grade 2", 
              "Grade 3", 
              "Grade 4", 
              "Grade 5", 
              "Grade 6", 
              "Grade 7", 
              "Grade 8", 
              "Grade 9", 
              "Grade 10", 
              "Grade 11", 
              "Grade 12"
            ] 
          },
          { 
            name: "Next Generation Science Standards", 
            subjects: [
              "Science", 
              "Physical Science", 
              "Life Science", 
              "Earth Science", 
              "Engineering"
            ], 
            grades: [
              "Grade K", 
              "Grade 1", 
              "Grade 2", 
              "Grade 3", 
              "Grade 4", 
              "Grade 5", 
              "Grade 6", 
              "Grade 7", 
              "Grade 8", 
              "Grade 9", 
              "Grade 10", 
              "Grade 11", 
              "Grade 12"
            ] 
          },
          { 
            name: "AP", 
            subjects: [
              "AP Calculus AB", 
              "AP Calculus BC", 
              "AP Statistics", 
              "AP Physics 1", 
              "AP Physics 2", 
              "AP Physics C", 
              "AP Chemistry", 
              "AP Biology", 
              "AP Environmental Science", 
              "AP History", 
              "AP English Language", 
              "AP English Literature", 
              "AP Psychology", 
              "AP Economics"
            ], 
            grades: [
              "Grade 9", 
              "Grade 10", 
              "Grade 11", 
              "Grade 12"
            ] 
          },
          { 
            name: "SAT Prep", 
            subjects: [
              "SAT Math", 
              "SAT Reading", 
              "SAT Writing", 
              "SAT Essay"
            ], 
            grades: [
              "Grade 9", 
              "Grade 10", 
              "Grade 11", 
              "Grade 12"
            ] 
          },
        ],
      },
      {
        name: "Canada",
        curriculums: [
          { name: "Ontario", subjects: ["Functions", "Advanced Functions", "Physics", "Chemistry", "Biology"], grades: ["9-12"] },
          { name: "British Columbia", subjects: ["Pre-Calculus", "Calculus", "Physics", "Chemistry", "English"], grades: ["9-12"] },
          { name: "Alberta", subjects: ["Mathematics", "Science", "Social Studies", "English"], grades: ["K-12"] },
        ],
      },
      {
        name: "Mexico",
        curriculums: [
          { name: "SEP", subjects: ["Matemáticas", "Ciencias", "Español", "Historia", "Geografía"], grades: ["1-12"] },
          { name: "Bachillerato", subjects: ["Mathematics", "Physics", "Chemistry", "Biology"], grades: ["10-12"] },
        ],
      },
    ],
  },
  "Europe": {
    color: "text-green-600",
    bgColor: "hover:bg-green-50",
    hoverColor: "group-hover:text-green-700",
    countries: [
      {
        name: "UK",
        curriculums: [
          { name: "GCSE", subjects: ["Mathematics", "English", "Science", "History", "Geography"], grades: ["9-11"] },
          { name: "A-Levels", subjects: ["Further Maths", "Chemistry", "Physics", "Biology", "Economics"], grades: ["12-13"] },
          { name: "IB", subjects: ["Mathematics HL", "English A", "Sciences", "Humanities"], grades: ["11-12"] },
        ],
      },
      {
        name: "Ireland",
        curriculums: [
          { name: "Junior Cycle", subjects: ["Mathematics", "English", "Irish", "Science", "History"], grades: ["7-9"] },
          { name: "Leaving Certificate", subjects: ["Higher Level Maths", "Applied Maths", "Physics", "Chemistry", "Biology"], grades: ["10-12"] },
        ],
      },
      {
        name: "Germany",
        curriculums: [
          { name: "Gymnasium", subjects: ["Mathematik", "Physik", "Chemie", "Biologie", "Deutsch"], grades: ["5-12"] },
          { name: "Abitur", subjects: ["Advanced Mathematics", "Sciences", "Languages", "Social Studies"], grades: ["11-12"] },
        ],
      },
      {
        name: "Netherlands",
        curriculums: [
          { name: "VWO", subjects: ["Wiskunde", "Natuurkunde", "Scheikunde", "Biologie", "Nederlands"], grades: ["7-12"] },
          { name: "HAVO", subjects: ["Mathematics", "Sciences", "Languages", "Economics"], grades: ["7-11"] },
        ],
      },
      {
        name: "France",
        curriculums: [
          { name: "Baccalauréat", subjects: ["Mathématiques", "Physique-Chimie", "SVT", "Français", "Histoire"], grades: ["6-12"] },
          { name: "International Sections", subjects: ["Mathematics", "Sciences", "Languages"], grades: ["6-12"] },
        ],
      },
      {
        name: "Italy",
        curriculums: [
          { name: "Liceo Scientifico", subjects: ["Matematica", "Fisica", "Chimica", "Biologia", "Italiano"], grades: ["9-13"] },
          { name: "Esame di Stato", subjects: ["Mathematics", "Sciences", "Languages", "Humanities"], grades: ["13"] },
        ],
      },
      {
        name: "Spain",
        curriculums: [
          { name: "ESO", subjects: ["Matemáticas", "Física y Química", "Biología", "Lengua", "Historia"], grades: ["7-10"] },
          { name: "Bachillerato", subjects: ["Mathematics", "Physics", "Chemistry", "Biology"], grades: ["11-12"] },
        ],
      },
      {
        name: "Switzerland",
        curriculums: [
          { name: "Maturité", subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "Languages"], grades: ["9-12"] },
          { name: "Federal VET", subjects: ["Applied Mathematics", "Sciences", "Technology"], grades: ["9-12"] },
        ],
      },
    ],
  },
  "Asia & Middle East": {
    color: "text-purple-600",
    bgColor: "hover:bg-purple-50",
    hoverColor: "group-hover:text-purple-700",
    countries: [
      {
        name: "India",
        curriculums: [
          { name: "CBSE", subjects: ["Mathematics", "Science", "Social Science", "English", "Hindi"], grades: ["1-12"] },
          { name: "ICSE", subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English"], grades: ["1-12"] },
          { name: "State Boards", subjects: ["Mathematics", "Science", "Languages", "Social Studies"], grades: ["1-12"] },
        ],
      },
      {
        name: "UAE",
        curriculums: [
          { name: "Ministry of Education", subjects: ["Mathematics", "Science", "Arabic", "English", "Islamic Studies"], grades: ["K-12"] },
          { name: "IB", subjects: ["Mathematics", "Sciences", "Languages", "Humanities"], grades: ["11-12"] },
          { name: "British Curriculum", subjects: ["Mathematics", "Physics", "Chemistry", "Biology"], grades: ["K-13"] },
        ],
      },
      {
        name: "Saudi Arabia",
        curriculums: [
          { name: "Saudi National", subjects: ["Mathematics", "Science", "Arabic", "Islamic Studies", "English"], grades: ["K-12"] },
          { name: "International Schools", subjects: ["Mathematics", "Physics", "Chemistry", "Biology"], grades: ["K-12"] },
        ],
      },
      {
        name: "Singapore",
        curriculums: [
          { name: "O-Levels", subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English"], grades: ["9-10"] },
          { name: "A-Levels", subjects: ["H2 Mathematics", "H2 Physics", "H2 Chemistry", "H2 Biology"], grades: ["11-12"] },
          { name: "IB", subjects: ["Mathematics HL", "Sciences", "Languages"], grades: ["11-12"] },
        ],
      },
      {
        name: "Japan",
        curriculums: [
          { name: "High School", subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "Japanese"], grades: ["10-12"] },
          { name: "International Baccalaureate", subjects: ["Mathematics", "Sciences", "Languages"], grades: ["11-12"] },
        ],
      },
      {
        name: "South Korea",
        curriculums: [
          { name: "CSAT", subjects: ["Mathematics", "Science", "Korean", "English", "Social Studies"], grades: ["10-12"] },
          { name: "High School", subjects: ["Advanced Mathematics", "Physics", "Chemistry", "Biology"], grades: ["10-12"] },
        ],
      },
      {
        name: "China",
        curriculums: [
          { name: "Gaokao", subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "Chinese"], grades: ["10-12"] },
          { name: "International Schools", subjects: ["Mathematics", "Sciences", "English", "Chinese"], grades: ["K-12"] },
        ],
      },
      {
        name: "Qatar",
        curriculums: [
          { name: "Qatar National", subjects: ["Mathematics", "Science", "Arabic", "English", "Islamic Studies"], grades: ["K-12"] },
          { name: "International Schools", subjects: ["Mathematics", "Physics", "Chemistry", "Biology"], grades: ["K-12"] },
        ],
      },
    ],
  },
  "Oceania": {
    color: "text-orange-600",
    bgColor: "hover:bg-orange-50",
    hoverColor: "group-hover:text-orange-700",
    countries: [
      {
        name: "Australia",
        curriculums: [
          { name: "HSC (NSW)", subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English"], grades: ["11-12"] },
          { name: "VCE (Victoria)", subjects: ["Mathematical Methods", "Specialist Mathematics", "Physics", "Chemistry"], grades: ["11-12"] },
          { name: "ATAR", subjects: ["Mathematics", "Sciences", "English", "Humanities"], grades: ["11-12"] },
        ],
      },
      {
        name: "New Zealand",
        curriculums: [
          { name: "NCEA", subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English"], grades: ["11-13"] },
          { name: "Cambridge International", subjects: ["Mathematics", "Sciences", "Languages"], grades: ["9-13"] },
        ],
      },
      {
        name: "Fiji",
        curriculums: [
          { name: "Form 7", subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English"], grades: ["11-13"] },
          { name: "SPFSC", subjects: ["Mathematics", "Sciences", "Languages"], grades: ["12-13"] },
        ],
      },
    ],
  },
  "Africa": {
    color: "text-red-600",
    bgColor: "hover:bg-red-50",
    hoverColor: "group-hover:text-red-700",
    countries: [
      {
        name: "South Africa",
        curriculums: [
          { name: "CAPS", subjects: ["Mathematics", "Physical Sciences", "Life Sciences", "English", "Afrikaans"], grades: ["R-12"] },
          { name: "IEB", subjects: ["Mathematics", "Science", "Languages", "Commerce"], grades: ["R-12"] },
        ],
      },
      {
        name: "Nigeria",
        curriculums: [
          { name: "WAEC", subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English"], grades: ["7-12"] },
          { name: "JAMB", subjects: ["Mathematics", "English", "Sciences", "Arts"], grades: ["12"] },
        ],
      },
      {
        name: "Ghana",
        curriculums: [
          { name: "WASSCE", subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English"], grades: ["10-12"] },
          { name: "Senior High School", subjects: ["Core Mathematics", "Sciences", "Languages"], grades: ["10-12"] },
        ],
      },
      {
        name: "Kenya",
        curriculums: [
          { name: "KCSE", subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English"], grades: ["9-12"] },
          { name: "8-4-4 System", subjects: ["Mathematics", "Sciences", "Languages", "Humanities"], grades: ["1-12"] },
        ],
      },
      {
        name: "Tanzania",
        curriculums: [
          { name: "NECTA", subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English"], grades: ["1-12"] },
          { name: "Advanced Level", subjects: ["Mathematics", "Sciences", "Languages"], grades: ["11-12"] },
        ],
      },
      {
        name: "Egypt",
        curriculums: [
          { name: "Thanaweya Amma", subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "Arabic"], grades: ["10-12"] },
          { name: "International Schools", subjects: ["Mathematics", "Sciences", "English", "Arabic"], grades: ["K-12"] },
        ],
      },
      {
        name: "Morocco",
        curriculums: [
          { name: "Baccalauréat", subjects: ["Mathématiques", "Physique", "Chimie", "Biologie", "Arabe"], grades: ["10-12"] },
          { name: "International Schools", subjects: ["Mathematics", "Sciences", "French", "Arabic"], grades: ["K-12"] },
        ],
      },
    ],
  },
  "South America": {
    color: "text-teal-600",
    bgColor: "hover:bg-teal-50",
    hoverColor: "group-hover:text-teal-700",
    countries: [
      {
        name: "Brazil",
        curriculums: [
          { name: "ENEM", subjects: ["Matemática", "Ciências da Natureza", "Português", "História", "Geografia"], grades: ["10-12"] },
          { name: "Ensino Médio", subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "Portuguese"], grades: ["10-12"] },
        ],
      },
      {
        name: "Argentina",
        curriculums: [
          { name: "Bachillerato", subjects: ["Matemática", "Física", "Química", "Biología", "Español"], grades: ["10-12"] },
          { name: "International Schools", subjects: ["Mathematics", "Sciences", "Spanish", "English"], grades: ["K-12"] },
        ],
      },
      {
        name: "Chile",
        curriculums: [
          { name: "PSU", subjects: ["Matemática", "Ciencias", "Lenguaje", "Historia"], grades: ["9-12"] },
          { name: "International Baccalaureate", subjects: ["Mathematics", "Sciences", "Languages"], grades: ["11-12"] },
        ],
      },
      {
        name: "Colombia",
        curriculums: [
          { name: "ICFES", subjects: ["Matemáticas", "Ciencias", "Español", "Inglés", "Sociales"], grades: ["9-11"] },
          { name: "International Schools", subjects: ["Mathematics", "Sciences", "Spanish", "English"], grades: ["K-11"] },
        ],
      },
    ],
  },
};

export type ContinentData = typeof continentData;
export type ContinentInfo = ContinentData[keyof ContinentData];
export type Country = ContinentInfo['countries'][0];
export type Curriculum = Country['curriculums'][0];

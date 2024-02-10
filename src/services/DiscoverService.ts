
export enum CompanyType {
  DATABASE = 'Database',
  ANALYTICS = 'Analytics',
  CLOUD = 'Cloud',
  PERFORMANCE = 'Performance',
}

export const companies = [
  {
    id: 1,
    name: "Asana",
    type: CompanyType.DATABASE,
    description: "check us out",
    offices: 2,
    localEmployees: 35,
    totalEmployees: 35,
    image: null,
  },
  {
    id: 2,
    name: "Teamwork",
    type: CompanyType.CLOUD,
    description: "we work as a unit",
    offices: 2,
    localEmployees: 0,
    totalEmployees: 12,
    image: null,
  },
  {
    id: 3,
    name: "Zoho Projects",
    type: CompanyType.DATABASE,
    description: "we are a cool company",
    offices: 5,
    localEmployees: 105,
    totalEmployees: 256,
    image: null,
  },
  {
    id: 4,
    name: "Celoxis",
    type: CompanyType.DATABASE,
    description: "we do good work",
    offices: 1,
    localEmployees: 41,
    totalEmployees: 41,
    image: null,
  },
  {
    id: 5,
    name: "Ganttpro",
    type: CompanyType.ANALYTICS,
    description: "trust this place",
    offices: 23,
    localEmployees: 45,
    totalEmployees: 1024,
    image: null,
  },
];

export function getCompanies(page = 0, count = 5){
  return companies.filter((item, idx) => idx >= page * count && idx < (page + 1) * count);
}

export function getCompany(id){
  return companies.find(item => item.id === id);
}



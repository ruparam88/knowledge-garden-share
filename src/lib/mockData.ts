
import { Resource, User } from "@/types";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Alex Johnson",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "2",
    name: "Sam Taylor",
    avatarUrl: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: "3",
    name: "Jordan Smith",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
  },
];

export const mockResources: Resource[] = [
  {
    id: "1",
    title: "React Hooks Overview",
    description: "A comprehensive guide to React hooks and their use cases",
    type: "markdown",
    content: "# React Hooks\n\nReact Hooks are functions that let you use state and other React features without writing a class.\n\n## useState\n\n```jsx\nconst [state, setState] = useState(initialState);\n```\n\n## useEffect\n\n```jsx\nuseEffect(() => {\n  // Side effects code\n  return () => {\n    // Cleanup code\n  };\n}, [dependencies]);\n```",
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2023-05-15T10:30:00Z",
    createdBy: "1",
    tags: ["react", "javascript", "hooks"],
  },
  {
    id: "2",
    title: "SQL Query Examples",
    description: "Common SQL queries for PostgreSQL databases",
    type: "code",
    content: "-- Select all records from a table\nSELECT * FROM users;\n\n-- Join tables\nSELECT users.name, orders.product_id\nFROM users\nJOIN orders ON users.id = orders.user_id;\n\n-- Group by with count\nSELECT category, COUNT(*) as total\nFROM products\nGROUP BY category;",
    createdAt: "2023-06-20T14:15:00Z",
    updatedAt: "2023-06-20T14:15:00Z",
    createdBy: "2",
    tags: ["sql", "database", "postgresql"],
  },
  {
    id: "3",
    title: "Project Planning Template",
    description: "Excel template for project planning and tracking",
    type: "spreadsheet",
    content: "/spreadsheets/project-planning.xlsx",
    createdAt: "2023-07-10T09:45:00Z",
    updatedAt: "2023-07-10T09:45:00Z",
    createdBy: "3",
    tags: ["project management", "template", "planning"],
  },
  {
    id: "4",
    title: "API Documentation",
    description: "Documentation for the company REST API",
    type: "pdf",
    content: "/pdfs/api-documentation.pdf",
    createdAt: "2023-08-05T16:20:00Z",
    updatedAt: "2023-08-05T16:20:00Z",
    createdBy: "1",
    tags: ["api", "documentation", "rest"],
  },
  {
    id: "5",
    title: "Product Roadmap",
    description: "Q3 product roadmap presentation",
    type: "presentation",
    content: "/presentations/q3-roadmap.pptx",
    createdAt: "2023-09-12T11:10:00Z",
    updatedAt: "2023-09-12T11:10:00Z",
    createdBy: "2",
    tags: ["product", "roadmap", "planning"],
  },
];

export const getResourceById = (id: string): Resource | undefined => {
  return mockResources.find(resource => resource.id === id);
};

export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getResourcesByTag = (tag: string): Resource[] => {
  return mockResources.filter(resource => resource.tags.includes(tag));
};

export const searchResources = (query: string): Resource[] => {
  const lowerCaseQuery = query.toLowerCase();
  return mockResources.filter(resource => 
    resource.title.toLowerCase().includes(lowerCaseQuery) || 
    resource.description.toLowerCase().includes(lowerCaseQuery) || 
    resource.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
  );
};

// This file simulates our backend database.
// In a real app, you'd fetch this data from an API.

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
}

export interface User {
  id: string;
  name: string;
  major: string;
  graduation: string;
  work: string;
  coords: {
    latitude: number;
    longitude: number;
  };
}

// --- Logged-in User Data ---
export const MY_PROFILE: User = {
  id: "u1",
  name: "Devin Thenuwara", // Pulled from your project summary
  major: "Stats and Data Science", // Inferred from project summary
  graduation: "2026",
  work: "UT Austin",
  coords: { latitude: 30.2849, longitude: -97.7341 },
};

// --- App Data ---
export const MY_FRIENDS: User[] = [
  {
    id: "u2",
    name: "Alex Smith",
    major: "Computer Science",
    graduation: "2025",
    work: "Dell",
    coords: { latitude: 30.2672, longitude: -97.7431 },
  },
  {
    id: "u3",
    name: "Jamie Lee",
    major: "Marketing",
    graduation: "2026",
    work: "UT Library",
    coords: { latitude: 30.2861, longitude: -97.7394 },
  },
];

export const ALL_USERS: User[] = [
  // Includes friends and non-friends to search for
  ...MY_FRIENDS,
  {
    id: "u4",
    name: "Chris Johnson",
    major: "Physics",
    graduation: "2027",
    work: "Student Media",
    coords: { latitude: 30.2889, longitude: -97.7354 },
  },
  {
    id: "u5",
    name: "Morgan White",
    major: "Finance",
    graduation: "2025",
    work: "H-E-B Digital",
    coords: { latitude: 30.2648, longitude: -97.7494 },
  },
];

export const ALL_JOBS: Job[] = [
  {
    id: "j1",
    title: "Research Assistant",
    company: "UT Austin",
    location: "UT Austin - Liberal Arts",
    description:
      "Assist professor with data analysis for a criminal justice study. Requires knowledge of R and data science principles.",
  },
  {
    id: "j2",
    title: "Software Intern (React Native)",
    company: "Dell",
    location: "Downtown Austin",
    description:
      "Join the mobile development team to build and maintain internal applications using React Native. Great mentorship opportunity.",
  },
  {
    id: "j3",
    title: "Marketing Assistant",
    company: "Student Media",
    location: "Campus Area",
    description:
      "Help manage social media accounts and create promotional materials for campus events. Flexible hours.",
  },
  {
    id: "j4",
    title: "Data Science Intern",
    company: "H-E-B Digital",
    location: "East Austin",
    description:
      "Work with the data science team on customer behavior models. Experience with Python (Pandas, Scikit-learn) preferred.",
  },
];
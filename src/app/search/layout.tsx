import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Search - Home Fitness",
  description: "Search for home fitness articles, workout tips, and exercise guides. Find budget-friendly gym setups, family workouts, and bodyweight training routines.",
  keywords: "search home fitness, find workout tips, exercise search, home gym search, fitness article search, workout guide search, cheap home gym, home gym setup, small space gym ideas, home workout gear, no gym equipment, affordable home gym, indoor kid workouts, fun family fitness, kids exercise ideas, bodyweight muscle building, no equipment strength, home workouts, no gear fitness, home fitness motivation, stay consistent, 5-minute workout, fitness hacks",
  openGraph: {
    title: "Search - Home Fitness",
    description: "Search for home fitness articles, workout tips, and exercise guides.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Search - Home Fitness",
    description: "Search for home fitness articles, workout tips, and exercise guides.",
  }
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 
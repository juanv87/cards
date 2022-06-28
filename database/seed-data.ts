interface SeedData {
  entries: SeedEntry[];
}
interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
  title: string;
  meaning: string;
  phrase: string;
}

export const seedData: SeedData = {
  entries: [],
};

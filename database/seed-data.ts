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
  list: string;
  languaje: string;
  fav: boolean;
  slugTitleValue: string;
}

export const seedData: SeedData = {
  entries: [],
};

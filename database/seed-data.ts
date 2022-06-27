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
  entries: [
    {
      title: "Titulo 1",
      meaning: "dgsdfgdfgd",
      phrase: "dfgsdfgdfsh",
      description:
        "Lipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
      status: "finished",
      createdAt: Date.now(),
    },
    {
      title: "Titulo 2",
      meaning: "jhgfkghjlkghjflg",
      phrase: "dcxcvbcvncvb",
      description:
        "Lipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
      status: "finished",
      createdAt: Date.now() - 1000000,
    },
    {
      title: "Titulo 3",
      meaning: "rteyrtujgfjdfk",
      phrase: "fgdfghdfghfdg",
      description:
        "Lipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
      status: "finished",
      createdAt: Date.now() - 10000,
    },
  ],
};

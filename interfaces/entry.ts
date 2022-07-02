export interface Entry {
  _id: string;
  title: string;
  description: string;
  status: EntryStatus;
  createdAt: number;
  meaning: string;
  phrase: string;
  list: string;
  fav: boolean;
  languaje?: string;
  slugTitleValue: string;
  memoCount: number;
}

export type EntryStatus = "pending" | "in-progress" | "finished" | "publish";

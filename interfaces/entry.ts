export interface Entry {
  id: string;
  title: string;
  description: string;
  status?: EntryStatus;
  createdAt?: number;
  meaning: string;
  phrase: string;
  list: string;
  fav: boolean;
  languaje?: string;
  slugTitleValue: string;
  imagen: string;
  memoCount: number;
  userId: string;
}

export type EntryStatus = "pending" | "in-progress" | "finished" | "publish";

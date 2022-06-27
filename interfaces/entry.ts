export interface Entry {
  _id: string;
  description?: string;
  createdAt: number;
  status?: EntryStatus;
  title: string;
  meaning: string;
  phrase: string;
  type?: string;
}

export type EntryStatus = "pending" | "in-progress" | "finished";

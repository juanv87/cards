export interface List {
  _id: string;
  title: string;
  description?: string;
  createdAt: number;
  status: ListStatus;
  slugTitleValue: string;
  chosenEmoji: string;
}

export type ListStatus = "pending" | "in-progress" | "finished" | "publish";

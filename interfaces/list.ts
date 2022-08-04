export interface List {
  id: string;
  title: string;
  description?: string;
  createdAt: number;
  status: ListStatus;
  slugTitleValue: string;
  chosenEmoji?: string;
  pinned: boolean;
  userId: string;
}

export type ListStatus = "pending" | "in-progress" | "finished" | "publish";

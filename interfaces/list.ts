export interface List {
  _id: string;
  title: string;
  description?: string;
  createdAt: number;
  status?: ListStatus;
}

export type ListStatus = "pending" | "in-progress" | "finished";

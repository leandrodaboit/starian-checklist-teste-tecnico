export interface Task {
  id: number;
  title: string;
  completed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateTask {
  title: string;
  completed?: boolean;
}

export interface UpdateTask {
  id?: number;
  title?: string;
  completed?: boolean;
}

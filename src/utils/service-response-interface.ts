
export interface ServiceResponse {
  status_code: number;
  message: string | object;
}

// export interface ITaskService {
//   createTask(title: string, description: string): Task;
//   getAllTasks(): Task[];
//   getTaskById(id: number): Task | undefined;
//   updateTask(
//     id: number,
//     title?: string,
//     description?: string,
//     completed?: boolean,
//   ): Task;
//   deleteTask(id: number): void;
// }

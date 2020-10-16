import { Task } from './task.model';

export interface Board {
  key?: string;
  id?: string;
  title?: string;
  priority?: number;
  tasks?: Task[];
}

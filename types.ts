
export interface Task {
  id: string;
  title: string;
  department: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
  status: 'to-do' | 'process' | 'completed';
}

export interface Stat {
  label: string;
  value: number;
  color: string;
}

export interface FolderStat {
  name: string;
  value: number;
  color: string;
}

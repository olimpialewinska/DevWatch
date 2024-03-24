export interface Day {
  id: string;
  date: string;
  user_id: string;
  time: number;
  created_at: string;
  details: DayDetails[];
}

export interface DayDetailsUpdate {
  [key: string]: number;
}

export interface DayDetails {
  id: string;
  app_name: string;
  user_id: string;
  app_open_time: number;
  created_at: string;
}
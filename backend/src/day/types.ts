export interface DayCreate {
  [x: string]: any;
}

export interface DayUpdate {
  time: number;
  details: DayDetailsUpdate;
}

export interface DayDetailsUpdate {
  [key: string]: number;
}


export interface ChartResponse {
  labels: string[];
  times: number[];
}

export interface TodayPieChart extends ChartResponse {
  date: Date | null;
}

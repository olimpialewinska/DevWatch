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

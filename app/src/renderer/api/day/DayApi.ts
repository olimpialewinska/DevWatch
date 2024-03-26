import { Pagination } from "@/renderer/types/Pagination";
import Api from "../Api";
import {
  BarChart,
  Day,
  DayDetailsUpdate,
  PieChart,
} from "@/renderer/types/Day";

export class DayApi {
  static async getHistory(limit: number, offset: number) {
    const { data: days } = await Api.get<Pagination<Day>>("day/history", {
      params: { limit, offset },
    });
    return days;
  }

  static async dayStart() {
    const { data: day } = await Api.post<Day>("/day");
    return day;
  }

  static async updateTimer(
    id: string,
    time: number,
    details: DayDetailsUpdate
  ) {
    const { data: day } = await Api.patch<Day>(`/day/${id}/`, {
      time,
      details,
    });
    return day;
  }

  static async delete(id: string) {
    const { data: day } = await Api.delete<Day>(`/day/${id}`);
    return day;
  }

  static async getById(id: string) {
    const { data: day } = await Api.get<Day>(`/day/${id}`);
    return day;
  }

  static async getBarChartLastWeek() {
    const { data: data } = await Api.get<BarChart>("/day/bar-chart-last-week");
    return data;
  }

  static async getAppsPieChartToday() {
    const { data: data } = await Api.get<PieChart>("/day/pie-chart-apps-today");
    return data;
  }

  static async getAverageWorkingTimeInMonths() {
    const { data: data } = await Api.get<BarChart>(
      "/day/average-working-time-in-months"
    );
    return data;
  }

  static async numberOfAppsOpened7Days() {
    const { data: data } = await Api.get<BarChart>(
      "/day/numbers-of-apps-7-days"
    );
    return data;
  }

  static async totalWorkingTimeInMonths() {
    const { data: data } = await Api.get<BarChart>(
      "/day/total-working-time-in-months"
    );
    return data;
  }

  static async distributionOfUsedApplications() {
    const { data: data } = await Api.get<PieChart>(
      "/day/distribution-of-used-applications"
    );
    return data;
  }
}

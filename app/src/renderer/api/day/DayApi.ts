import { Pagination } from "@/renderer/types/Pagination";
import Api from "../Api";
import { Day } from "@/renderer/types/Day";

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

  static async updateTimer(id: string, time: number) {
    const { data: day } = await Api.patch<Day>(`/day/${id}/`, { time });
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
}

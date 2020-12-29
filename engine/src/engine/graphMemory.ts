import { Point } from "../sharedTypes/dbModelTypes";
import { ValuesType } from "./types";

export interface GraphType {
  id: string;
  points: Point[];
}

class GraphMemory {
  private memo: GraphType[];
  private lastRecTime: Date = new Date();

  constructor() {
    this.reset();
  }

  public reset() {
    this.memo = [
      {
        id: "temperature",
        points: [],
      },
    ];

    this.lastRecTime = new Date();
  }

  public addValue(programRunTime: number, value: number) {
    const now = new Date();
    if (now.getTime() - this.lastRecTime.getTime() > 60000) {
      // 1 per minute
      this.lastRecTime = now;

      const randVal = value + (programRunTime / 300000) * Math.random() + Math.random() * 50 - 25;

      this.memo[0].points.push({ x: programRunTime, y: value });
    }
  }

  public getGraphs() {
    return this.memo;
  }
}

export default new GraphMemory();

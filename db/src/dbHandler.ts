import client from "./dbClient";
import { GraphModel } from "./graphModel";
import { IGraph } from "./graphTypes";

class dbHandler {
  async addData(): Promise<void> {
    client.connect();

    const data: IGraph[] = [
      {
        name: "graph 1",
        description: "graph 1 description",
        graphType: "model",
        color: { r: 230, g: 30, b: 30, a: 0.9 },
        points: [
          { x: 0, y: 20 },
          { x: 1, y: 40 },
          { x: 2, y: 90 },
          { x: 3, y: 150 },
          { x: 4, y: 210 },
          { x: 5, y: 290 },
          { x: 7, y: 370 },
          { x: 8, y: 500 },
          { x: 9, y: 650 },
        ],
      },
      {
        name: "graph 2",
        description: "graph 2 description",
        graphType: "model",
        color: { r: 30, g: 230, b: 30, a: 0.9 },
        points: [
          { x: 1, y: 70 },
          { x: 2, y: 170 },
          { x: 3, y: 300 },
          { x: 4, y: 480 },
          { x: 5, y: 610 },
          { x: 7, y: 800 },
          { x: 8, y: 920 },
          { x: 9, y: 1020 },
        ],
      },
    ];

    try {
      console.log("adding data");

      for (const entry of data) {
        await GraphModel.create(entry);
        console.log(`created ${entry.name}`);
      }
      client.disconnect();
    } catch (e) {
      console.error(e);
    }
  }
}

const db = new dbHandler();
export default db;

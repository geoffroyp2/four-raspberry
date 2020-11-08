import { ProgramInfo, SensorValues } from "../interfaces/programInterfaces";
import com, { i2cCom } from "./i2cCom";
import db from "./db";

class Program {
  // constants
  com: i2cCom = com;
  refreshInterval: number = 1000; //ms

  // program variables
  running: boolean = false;
  programStartTime: Date | null = null;
  lastRefresh: Date | null = null;
  currentProgram: ProgramInfo | null = null;
  currentSensorValues: SensorValues | null = null;
  currentTargetTemp: number = 0;

  //
  getPrograms(): ProgramInfo[] {
    // lookup program infos in the database and return them to populate the UI selects
    return db;
  }

  selectProgram(id: number): ProgramInfo {
    // load program in memory and returns it
    this.currentProgram = db[id];
    // return this.currentProgram;
    return {
      id: this.currentProgram.id,
      name: this.currentProgram.name,
      description: this.currentProgram?.description,
      graph: this.currentProgram.graph,
    };
  }

  start(): void {
    if (!this.running) {
      this.programStartTime = new Date();
      this.running = true;

      console.log("Program started");
      this.run();
    }
  }

  run(): void {
    //Main loop
    if (this.running) {
      setTimeout(() => {
        this.refreshTargetTemp();
        com.sendTargetValues({
          temp: this.currentTargetTemp,
          oxy: Math.random() * 60 + 30,
        });
        this.currentSensorValues = com.requestSensorValues();
        if (this.running) this.run();
      }, this.refreshInterval);
    }
  }

  pause(): void {
    if (this.running) {
      this.running = false;
      console.log("Program paused");
    }
  }
  stop(): void {
    if (this.running) {
      this.running = false;
      console.log("Program stopped");
    }
  }
  restartFromLast(): void {}

  getTargetTemp(): number {
    //called from the UI

    this.refreshTargetTemp();
    return this.currentTargetTemp || 0;
  }

  getSensorValues(): SensorValues {
    // called from the UI
    return (
      (this.currentSensorValues && {
        temp: this.currentSensorValues.temp,
        oxy: this.currentSensorValues.oxy,
      }) || { temp: 0, oxy: 0 }
    );
  }

  refreshTargetTemp(): void {
    // calculate new TargetValues from current program graph
    // for now only calculates target

    if (this.running) {
      const now = new Date();
      this.lastRefresh = now;
      const programFullTime = now.getTime() - this.programStartTime!.getTime();

      const graph = this.currentProgram!.graph.points;
      let i = 1;
      for (; i < graph.length; i++) if (graph[i].x > programFullTime) break;

      const pente =
        (graph[i].y - graph[i - 1].y) / (graph[i].x - graph[i - 1].x);
      const yOrigine = graph[i].y - pente * graph[i].x;
      this.currentTargetTemp = programFullTime * pente + yOrigine;
    }
  }
}

const program = new Program();
export default program;

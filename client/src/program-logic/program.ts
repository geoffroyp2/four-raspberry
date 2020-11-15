import { SensorValues, Point } from "../interfaces/programInterfaces";
import com from "./i2cCom";
import db from "../db/handler";
import graphEditor from "./graphEdit";
import { Graph } from "../interfaces/Igraph";

// import { addData } from "../db/client";

/*

--------- TODO ---------

-- db of programs
-- selection/edition of items in db
-- pause functionnalities: (complete pause & pause + time still running)
-- program end and record in db 
-- current cursor on graph
-- display something different when not connected to 2nd raspberry + "connect" button


-- restart from last recorded point

*/

export class Program {
  // --------------------
  // ------ Fields ------
  // --------------------

  // constants
  public graphEdit: graphEditor = new graphEditor(this);
  private runLoopInterval: number = 1000; //ms

  // program variables
  public currentProgram: Graph | null = null;

  public running: boolean = false;
  public paused: boolean = false;
  private programStartTime: Date | null = null;
  private lastRefresh: Date | null = null;
  private currentSensorValues: SensorValues | null = null;
  private currentTargetTemp: number = 0;
  private pauseTotalTime: number = 0;

  // Recorded values
  public currentTempRecord: Point[] = [];
  public currentOxyRecord: Point[] = [];

  //cached elements from database
  public modelGraphs: { [id: string]: Graph } = {};
  public currentSelectedProgram: Graph | null = null;

  //UI calls
  public updateReceived: boolean = false;

  // --------------------
  // -- Program Select --
  // --------------------

  public loadModelGraphs(callback: () => void) {
    db.getModelGraphs((graphs: Graph[]): void => {
      if (graphs.length > 0) {
        graphs.forEach((g) => (this.modelGraphs[g._id] = g));
        this.currentSelectedProgram = this.modelGraphs[graphs[0]._id];
        callback();
      } else {
        console.error("No model graph results");
      }
    });
  }

  public selectProgram(id: string): void {
    // load program in memory and returns it
    this.currentProgram = this.modelGraphs[id];
  }

  // ---------------------
  // -- Program Control --
  // ---------------------

  public start(): void {
    if (!this.running) {
      if (this.paused) {
        this.running = true;
        this.paused = false;
        console.log("Program unpaused");
        this.run();
      } else {
        this.programStartTime = new Date();
        this.running = true;

        this.currentTempRecord = [];
        this.currentOxyRecord = [];

        console.log("Program started");
        this.run();
      }
    }
  }

  public pause(): void {
    if (this.running) {
      this.running = false;
      this.paused = true;
      console.log("Program paused");
    }
  }

  public stop(): void {
    if (this.running) {
      this.running = false;
      console.log("Program stopped");
    }
  }

  public restartFromLast(): void {
    // Restart from last recorded point
  }

  private run(): void {
    //Main loop
    if (this.running) {
      setTimeout(() => {
        this.refreshTargetTemp();
        com.sendTargetValues({
          temp: this.currentTargetTemp,
          oxy: Math.random() * 60 + 30,
        });
        this.recordSensorValues();
        if (this.running) this.run();
      }, this.runLoopInterval);
    }
  }

  // -------------------
  // -- Sensor Values --
  // -------------------

  public getTargetTemp(): number {
    //called from the UI

    this.refreshTargetTemp();
    return this.currentTargetTemp || 0;
  }

  private recordSensorValues(): void {
    this.currentSensorValues = com.requestSensorValues();
    this.currentTempRecord.push({
      x:
        new Date().getTime() -
        this.programStartTime!.getTime() -
        this.pauseTotalTime,
      y: this.currentSensorValues.temp,
    });
  }

  public getSensorValues(): SensorValues {
    // called from the UI
    return (
      (this.currentSensorValues && {
        temp: this.currentSensorValues.temp,
        oxy: this.currentSensorValues.oxy,
      }) || { temp: 0, oxy: 0 }
    );
  }

  private refreshTargetTemp(): void {
    // calculate new TargetValues from current program graph
    // for now only calculates target

    if (this.running) {
      const now = new Date();
      this.lastRefresh = now;
      const programFullTime = now.getTime() - this.programStartTime!.getTime();

      const points = this.currentProgram!.points;
      let i = 1;
      for (; i < points.length; i++) if (points[i].x > programFullTime) break;

      const pente =
        (points[i].y - points[i - 1].y) / (points[i].x - points[i - 1].x);
      const yOrigine = points[i].y - pente * points[i].x;
      this.currentTargetTemp = programFullTime * pente + yOrigine;
    }
  }
}

export default new Program();

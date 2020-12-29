import { Reference } from "../sharedTypes/dbModelTypes";

export class ReferenceHandler {
  public ref: Reference;

  public targetTemp: number = 0;

  constructor(ref: Reference) {
    console.log(`New Reference graph: ${ref.name}`);

    this.ref = ref;
  }

  public refreshTargetTemp(time: number): void {
    const points = this.ref.points;

    // find index for current time
    let idx = 1;
    for (; idx < points.length; idx++) {
      if (points[idx].x > time) break;
    }

    // calculate interpolation
    const pente = (points[idx].y - points[idx - 1].y) / (points[idx].x - points[idx - 1].x);
    const yOrigine = points[idx].y - pente * points[idx].x;
    this.targetTemp = time * pente + yOrigine;
  }
}

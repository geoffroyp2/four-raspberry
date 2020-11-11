import { IGraphDocument } from "./types";

export async function setLastUpdated(this: IGraphDocument): Promise<void> {
  const now = new Date();
  if (!this.lastUpdated || this.lastUpdated < now) {
    this.lastUpdated = now;
    await this.save();
  }
}

// TODO: addPoint();

import { IGraphDocument } from "./types";

export async function setLastUpdated(this: IGraphDocument): Promise<void> {
  const now = new Date();
  const lastUpdated = new Date(this.lastUpdated);
  if (!this.lastUpdated || lastUpdated < now) {
    this.lastUpdated = now.toISOString();
    await this.save();
  }
}

// TODO: addPoint();

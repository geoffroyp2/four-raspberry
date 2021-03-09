import { GQLSubscribe } from "../network/GQLClient";
import { commandSubscriptionQuery, liveSubscriptionQuery } from "../network/queries";
import { Target } from "../types/APITypes";

class State {
  public target: Target = {};

  constructor() {
    GQLSubscribe(liveSubscriptionQuery, (data) => {
      console.log(data);
    });
  }

  start() {
    console.log("started");
  }
}

export default new State();

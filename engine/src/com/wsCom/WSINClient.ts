import { client, connection } from "websocket";
import { WSINFormat } from "../utils/WSINFormatter";

export class WSINClient {
  private wsClient: client;
  private wsConnection: connection;
  private onMessageCB: (values: any) => void;

  private lastUpdate: Date = new Date();

  constructor(onMessageCB: (values: any) => void) {
    this.wsClient = new client();
    this.onMessageCB = onMessageCB;

    this.wsClient.on("connectFailed", () => {
      console.log("WS IN connection failed");
    });

    this.wsClient.on("connect", (connect) => {
      this.wsConnection = connect;
      console.log("WS IN connected");
      connect.on("error", () => {
        "WS IN connection error";
      });
      connect.on("close", () => {
        "WS IN connection close";
      });
      connect.on("message", (mes) => {
        const now = new Date();
        if (now.getTime() - this.lastUpdate.getTime() > 10 && mes.type == "utf8") {
          this.lastUpdate = now;
          const values = JSON.parse(mes.utf8Data).Signal[0].Value;
          this.onMessageCB(WSINFormat(values));
        }
      });
    });
  }

  public connect() {
    this.wsClient.connect("ws://192.168.0.120:2501");
  }

  public getStatus(): boolean {
    return this.wsConnection.connected;
  }
}

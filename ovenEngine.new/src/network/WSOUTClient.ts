import { client, connection } from "websocket";
import { WSOUTFormat } from "../utils/WSOUTFormatter";

class WSOUTClient {
  private wsClient: client;
  private wsConnection: connection | undefined;

  constructor() {
    this.wsClient = new client();

    this.wsClient.on("connectFailed", () => {
      console.log("WS OUT connection failed");
    });

    this.wsClient.on("connect", (connect: connection) => {
      this.wsConnection = connect;
      console.log("WS OUT connected");
      connect.on("error", () => {
        "WS OUT connection error";
      });
      connect.on("close", () => {
        "WS OUT connection close";
      });
      connect.on("message", (mes) => {
        console.log(mes);
      });
    });

    this.connect();
  }

  public connect() {
    this.wsClient.connect("ws://192.168.0.120:2502");
  }

  public getStatus(): boolean {
    return this.wsConnection !== undefined && this.wsConnection.connected;
  }

  public sendTemperature(temp: number) {
    if (this.wsConnection?.connected) {
      this.wsConnection.send(WSOUTFormat(temp));
    }
  }
}

export default WSOUTClient;

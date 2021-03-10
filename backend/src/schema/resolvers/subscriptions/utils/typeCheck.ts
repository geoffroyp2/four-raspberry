import { CommandNameType } from "./types";

export const isValidCommand = (input: any): input is CommandNameType => {
  return (
    input === "start" ||
    input === "stop" ||
    input === "pause" ||
    input === "ping" ||
    input === "monitoring" ||
    input === "targetId"
  );
};

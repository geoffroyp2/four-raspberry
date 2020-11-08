import { ProgramInfo } from "../interfaces/programInterfaces";

const db: ProgramInfo[] = [...Array(6)].map((prog, progIdx) => {
  return {
    id: progIdx,
    name: `courbe ${progIdx}`,
    description: `description pour le programme #${progIdx}`,
    graph: {
      color: {
        r: Math.floor(Math.random() * 210),
        g: Math.floor(Math.random() * 210),
        b: Math.floor(Math.random() * 210),
        a: 0.9,
      },
      points: [...Array(100)].map((p, i) => {
        return {
          x: i * 1000 * 60 * 10,
          y:
            0.2 * i +
            Math.random() *
              10 *
              (Math.random() * 10 * ((i * progIdx + 5) / 1000) -
                5 * ((i * progIdx + 5) / 1000)),
        };
      }),
    },
  };
});

export default db;

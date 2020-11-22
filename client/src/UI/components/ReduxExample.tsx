import React, { useEffect } from "react";
import { FormControl, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectedGraph, initGraphs, allGraphs, selectGraph } from "../redux/reducers/graphs/graphSlice";

import db from "../../db/handler";
import { Graph } from "../../interfaces/Igraph";

const Four = () => {
  const g = useSelector(selectedGraph);
  const allg = useSelector(allGraphs);
  const dispatch = useDispatch();

  useEffect(() => {
    db.getAllGraphs((res: Graph[]) => {
      dispatch(initGraphs(res));
    });
  }, [dispatch]);

  return (
    <div>
      {g ? (
        <Table>
          <thead>
            <tr>
              <th>name</th>
              <th>description</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{g.name}</td>
              <td>{g.description}</td>
              <td>{g.date}</td>
            </tr>
          </tbody>
        </Table>
      ) : (
        <div>LOADING</div>
      )}
      <FormControl as="select" onChange={(e) => dispatch(selectGraph(e.target.value))}>
        {Object.values(allg).map((g) => (
          <option value={g._id}>{g.name}</option>
        ))}
      </FormControl>
    </div>
  );
};

export default Four;

import React from "react";
import { TableRow, TableCell } from "@material-ui/core";
import CustomerDelete from "./CustomerDelete";

const Customer = ({ data, stateRefresh }) => {
  const { id, image, name, birthday, gender, job } = data;
  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>
        <img src={image} alt="Ee" />
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{birthday}</TableCell>
      <TableCell>{gender}</TableCell>
      <TableCell>{job}</TableCell>
      <TableCell>
        <CustomerDelete stateRefresh={stateRefresh} row={data} />
      </TableCell>
    </TableRow>
  );
};

export default Customer;

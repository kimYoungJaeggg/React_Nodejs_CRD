import React, { useState, useEffect } from "react";
import Customer from "./components/Customer";
import CustomerAdd from "./components/CustomerAdd";
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  withStyles,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { alpha } from "@material-ui/core/styles/colorManipulator";

import MenuIcon from "@material-ui/icons/Menu";

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [filterName, setfilterName] = useState("");
  const [isProcess, setIsProcess] = useState(false);
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    if (!isProcess) {
      callApi()
        .then((res) => setCustomers(res))
        .catch((err) => console.log(err))
        .finally(() => setIsProcess(false));
    }
  };

  const callApi = async () => {
    setIsProcess(true);
    const response = await fetch("/api/customers");
    const body = await response.json();

    return body;
  };
  const stateRefresh = () => {
    setCustomers([]);
    callApi()
      .then((res) => setCustomers(res))
      .catch((err) => console.log(err));
  };
  const handleValueChange = (e) => {
    setfilterName(e.target.value);
  };
  const filteredComponent = (data) => {
    console.log(data);
    console.log(filterName);

    const _data = data.filter((c) => {
      return c.name.indexOf(filterName) > -1;
    });
    console.log("_data", _data);
    return _data.map((row) => {
      console.log("몇번그림?");
      return <Customer key={row.id} data={row} stateRefresh={stateRefresh} />;
    });
  };

  return (
    <>
      <Paper>
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography color="inherit">고객 관리 시스템</Typography>
            <div>
              <div>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="검색하기"
                value={filterName}
                onChange={handleValueChange}
              />
            </div>
          </Toolbar>
        </AppBar>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>아이디</TableCell>
              <TableCell>사진</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
              <TableCell>설정</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>{customers && filteredComponent(customers)}</TableBody>
        </Table>
      </Paper>
      <CustomerAdd stateRefresh={stateRefresh} />
    </>
  );
};

export default App;

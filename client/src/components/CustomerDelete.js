import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
} from "@material-ui/core";

const CustomerDelete = ({ stateRefresh, row }) => {
  const [open, setOpen] = useState(false);

  function deleteCustomer(id) {
    const url = "/api/customers/" + id;
    fetch(url, {
      method: "DELETE",
    });
    stateRefresh();
  }
  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        삭제
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>삭제경고</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>선택한 고객 정보가 삭제됩니다.</Typography>
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              deleteCustomer(row.id);
            }}
          >
            삭제
          </Button>

          <Button variant="outlined" color="primary" onClick={handleClose}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomerDelete;

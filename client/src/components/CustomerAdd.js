import React, { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@material-ui/core";

const CustomerAdd = ({ stateRefresh }) => {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState({
    file: null,
    userName: "",
    birthday: "",
    gender: "",
    job: "",
    fileName: "",
  });
  const { file, userName, birthday, gender, job, fileName } = profile;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addCustomer() //
      .then((response) => {
        console.log(response);
        stateRefresh();
      });
    setProfile({
      file: null,
      userName: "",
      birthday: "",
      gender: "",
      job: "",
      fileName: "",
    });
    setOpen(false);
  };
  const handleClose = () => {
    setProfile({
      file: null,
      userName: "",
      birthday: "",
      gender: "",
      job: "",
      fileName: "",
    });
    setOpen(false);
  };
  const handleFileChange = (e) => {
    setProfile({
      ...profile,
      file: e.target.files[0],
      fileName: e.target.value,
    });
  };
  const handleValueChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const addCustomer = () => {
    const url = "/api/customers";
    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", userName);
    formData.append("birthday", birthday);
    formData.append("gender", gender);
    formData.append("job", job);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return axios.post(url, formData, config);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        고객 추가하기
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>고객 추가</DialogTitle>
        <DialogContent>
          <input
            style={{ display: "none" }}
            accept="image/*"
            id="raised-button-file"
            type="file"
            file={file}
            value={fileName}
            onChange={handleFileChange}
          />
          <label htmlFor="raised-button-file">
            <Button
              variant="contained"
              color="primary"
              component="span"
              name="file"
            >
              {fileName === "" ? "프로필 이미지 선택" : fileName}
            </Button>
          </label>
          <br />
          <TextField
            label="이름"
            type="text"
            name="userName"
            value={userName}
            onChange={handleValueChange}
          />
          <br />

          <TextField
            label="생년월일"
            type="text"
            name="birthday"
            value={birthday}
            onChange={handleValueChange}
          />
          <br />

          <TextField
            label="성별"
            type="text"
            name="gender"
            value={gender}
            onChange={handleValueChange}
          />
          <br />

          <TextField
            label="직업"
            type="text"
            name="job"
            value={job}
            onChange={handleValueChange}
          />
          <br />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFormSubmit}
          >
            추가
          </Button>

          <Button variant="outlined" color="primary" onClick={handleClose}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomerAdd;

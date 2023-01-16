import { FormControl, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch } from "react-redux";
import { handleAmountChange } from "../redux/actions";
import './textField.css'

const TextFieldComp = () => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(handleAmountChange(e.target.value));
  };

  return (
    <Box mt={8} width="80%" ml={14}>
      <FormControl className="formcon" fullWidth size="small">
        <TextField
          className="textF"
          onChange={handleChange}
          variant="outlined"
          label="Amount of Questions"
          type="number"
          size="small"
        />
      </FormControl>
    </Box>
  );
};

export default TextFieldComp;
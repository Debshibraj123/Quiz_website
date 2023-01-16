import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  handleCategoryChange,
  handleDifficultyChange,
  handleTypeChange,
} from "../redux/actions";
import './selectField.css'


const SelectField = (props) => {
  const { label, options } = props;
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
    switch (label) {
      case "Category":
        dispatch(handleCategoryChange(e.target.value));
        break;
      case "Difficulty":
        dispatch(handleDifficultyChange(e.target.value));
        break;
      case "Type":
        dispatch(handleTypeChange(e.target.value));
        break;
      default:
        return;
    }
  };

  return (
    <Box>
      <FormControl  className= "form-control" size="small"  >
        <InputLabel className="input-label">{label}</InputLabel>
        <Select className="select" value={value} label={label} onChange={handleChange}>
          {options.map(({ id, name }) => (
            <MenuItem className="menu-item" value={id} key={id}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectField;
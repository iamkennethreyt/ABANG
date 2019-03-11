import React from "react";
import PropTypes from "prop-types";

import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  type,
  onChange,
  defaultValue,
  multiline,
  rows,
  disabled
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel htmlFor={name}>{placeholder}</InputLabel>
      <Input
        name={name}
        type={type}
        id={name}
        error={error && true}
        onChange={onChange}
        defaultValue={defaultValue}
        value={value}
        placeholder={placeholder}
        multiline={multiline}
        rows={rows}
        disabled={disabled}
      />
      {error && (
        <FormHelperText id={name} error>
          {error}
        </FormHelperText>
      )}
    </FormControl>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  multiline: PropTypes.bool,
  rows: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

TextFieldGroup.defaultProps = {
  type: "text"
};

export default TextFieldGroup;

import React from "react";
import { FieldAttributes, useField } from "formik";
import { TextField } from "@material-ui/core";
type FormikInputProps = {
  label: string;
  type?: string;
  multiline?: boolean;
  minRows?: number;
  maxRows?: number;
} & FieldAttributes<{}>;

const FormikInput: React.FC<FormikInputProps> = ({
  label,
  type = "text",
  multiline,
  minRows,
  maxRows,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <React.Fragment>
      <TextField
        label={label}
        type={type}
        multiline={multiline}
        minRows={minRows}
        maxRows={maxRows}
        {...field}
        variant="outlined"
        autoComplete="off"
        fullWidth
      />
      {meta.touched && meta.error ? (
        <div style={{ color: "red", marginTop: "5px" }}>{meta.error}</div>
      ) : null}
    </React.Fragment>
  );
};

export default FormikInput;

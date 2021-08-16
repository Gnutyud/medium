import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import { ErrorMessage, Field } from "formik";

function FormikTags(props: any) {
  const handleKeyDown = (event: any) => {
    switch (event.key) {
      case ",":
      case "enter": {
        event.preventDefault();
        event.stopPropagation();
        if (event.target.value.length > 0) {
          props.setFieldValue("tagList", [
            ...props.tagList,
            event.target.value,
          ]);
        }

        break;
      }
      default:
    }
  };

  return (
    <div>
      <Autocomplete
        multiple
        freeSolo
        id="tags-outlined"
        options={[]}
        getOptionLabel={(option) => option.title || option}
        value={props.tagList}
        onChange={(event, newValue) => props.setFieldValue("tagList", newValue)}
        filterSelectedOptions
        renderInput={(params: any) => {
          params.inputProps.onKeyDown = handleKeyDown;
          return (
            <>
              <Field
                name="tagList"
                {...params}
                variant="outlined"
                label="Enter tags"
                margin="normal"
                fullWidth
                component={TextField}
              />
              <div>
                <ErrorMessage name="tagList" />
              </div>
            </>
          );
        }}
      />
    </div>
  );
}

export default FormikTags;

import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import { FieldInputProps, FormikProps } from 'formik';

interface Props {
  field: FieldInputProps<any>;
  form: FormikProps<any>;
}

function FormikTags({ field, form }: Props) {
  const handleKeyDown = (event: any) => {
    switch (event.key) {
      case ',':
      case 'enter': {
        event.preventDefault();
        event.stopPropagation();
        if (event.target.value.length > 0) {
          // form.setFieldValue("tagList", [...field.name, event.target.value]);
          form.setFieldValue('tagList', [...field.value, event.target.value]);
        }

        break;
      }
      default:
    }
  };

  return (
    <Autocomplete
      {...field}
      multiple
      freeSolo
      id="tags-outlined"
      options={[]}
      getOptionLabel={(option) => option.title || option}
      onChange={(event, newValue) => form.setFieldValue(field.name, newValue)}
      filterSelectedOptions
      renderInput={(params: any) => {
        params.inputProps.onKeyDown = handleKeyDown;
        return (
          <>
            <TextField
              style={{ marginTop: '0px' }}
              name="tagList"
              {...params}
              variant="outlined"
              label="Enter tags"
              margin="normal"
              fullWidth
            />
          </>
        );
      }}
    />
  );
}

export default FormikTags;

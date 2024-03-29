import React from "react";
import { useField } from "formik";
import { TFieldText, IValidate } from "../types";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import * as Yup from "yup";

const FieldContainer = styled("div")`
  min-height: 3.5rem;
  display: flex;
  & > .MuiTextField-root {
    .MuiInputBase-root {
      height: 100%;
      padding-left: 1rem;
    }
  }
`;

export const FieldText = ({
  name,
  label,
  multiline,
  disabled,
  autoFocus,
  onChange,
}: TFieldText) => {
  const [input, meta] = useField(name);
  React.useEffect(() => {
    if (onChange instanceof Function) {
      onChange(input.value);
    }
  }, [input.value, onChange]);
  return (
    <FieldContainer className={`Field ${name}`}>
      <TextField
        fullWidth
        {...(disabled && { disabled: true })}
        {...(autoFocus && { autoFocus: true })}
        name={name}
        label={`${label}${meta.error ? " - " + meta.error : ""}`}
        value={input.value}
        {...(multiline && { multiline: true, rows: 4 })}
        onChange={input.onChange}
        {...(meta.error && { error: true })}
      />
    </FieldContainer>
  );
};

const rulesDefault: Required<TFieldText["rules"]> = {
  required: false,
  min: 1,
  max: 256,
};

const getSchema = (rulesIn: TFieldText["rules"]): any => {
  const rulesOut: Required<TFieldText["rules"]> = {
    ...rulesDefault,
    ...rulesIn,
  };

  let result: any = Yup.string()
    .min(rulesOut.min, "Слишком короткое")
    .max(rulesOut.max, "Слишком длинное");

  if (rulesOut.required) {
    result = result.required("Обязательное поле");
  }

  return result;
};

export const validateText: IValidate = (field: TFieldText) => {
  const { value, ...other } = field;
  let val = "";
  if (typeof value === "string") val = value;
  const result = { schema: getSchema(field["rules"]), ...other, value: val };
  return result;
};

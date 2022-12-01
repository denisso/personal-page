import { useField } from "formik";
import { TFieldText, IValidate } from "../types";
import TextField from "@mui/material/TextField";
import * as Yup from "yup";

export const FieldText = ({
    name,
    label,
    multiline,
    disabled,
    autoFocus,
}: TFieldText) => {
    const [input, meta] = useField(name);
    return (
        <div className={`Field ${name}`}>
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
        </div>
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
    const { value,  ...other } = field;
    let val = "";
    if (typeof value === "string") val = value;
    const result = { schema: getSchema(field["rules"]), ...other, value: val };
    return result;
};

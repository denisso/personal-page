import React from "react"
import { FieldText } from "./Text";
import { TField, TFieldEmail, IValidate } from "..";
import * as Yup from "yup";

export const FieldEmail = (props: TField) => <FieldText {...props} />;

const rulesDefault: Required<TFieldEmail["rules"]> = {
    required: false,
};

const getSchema = (rulesIn: TFieldEmail["rules"]): any => {
    const rulesOut: Required<TFieldEmail["rules"]> = {
        ...rulesDefault,
        ...rulesIn,
    };

    let result: any = Yup.string().email("Неправильный email");

    if (rulesOut.required) {
        result = result.required("Обязательное поле");
    }

    return result;
};

export const validateEmail: IValidate = (field: TFieldEmail) => {
    const { value, ...other } = field;
    let val = "";
    if (typeof value === "string") val = value;
    const result = { schema: getSchema(field["rules"]), ...other, value: val };
    return result;
};

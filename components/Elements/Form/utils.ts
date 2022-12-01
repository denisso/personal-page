import * as Yup from "yup";
import { TSchema, TField, IValidate } from "./types";
import { validateText } from "./Fields/Text";
import { validateEmail } from "./Fields/Email";
import { FormikValues } from "formik";

const validate: { [type: string]: IValidate } = {
    text: validateText,
    email: validateEmail,
};

export interface IGetDatas {
    (schema: TSchema): {
        initialValues: FormikValues;
        validationSchema: any;
        fields: Array<TField & { type: string }>;
    };
}

export const getDatas: IGetDatas = (schema) => {
    const initialValues: FormikValues = {};
    const shemaShape: any = {};
    const fields: Array<TField & { type: string }> = [];
    for (const field of schema) {
        const type: string = Object.keys(field)[0];
        const f: any = field;
        const { schema, name, value, ...others } = validate[type](f[type]);
        shemaShape[name] = schema;
        initialValues[name] = value;
        fields.push({ type, name, ...others });
    }
    return {
        initialValues,
        validationSchema: Yup.object(shemaShape),
        fields,
    };
};

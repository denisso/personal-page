import React from "react";
import { Formik, Form as FForm } from "formik";
import { getDatas } from "./utils";
import { TSchema } from ".";
import { Fields } from "./Fields";
import styled from "styled-components";

type TFormProps = {
    onSubmit?: (values?: any, actions?: any) => void;
    schema: TSchema;
    direction?: "column" | "row";
    className?: string;
    children?: React.ReactNode;
};

interface IForm {
    (props: TFormProps): JSX.Element;
}

const FormContainer = styled(FForm)`
    &default {
        display: flex;
        flex-direction: column;
        align-items: stretch;

        gap: 1rem;
        .Fields {
            flex-grow: 1;
            flex-shrink: 1;
            overflow-y: visible;
            z-index: 100;
        }
        .Controls {
            flex-shrink: 0;
        }
    }
`;


const dummySubmit = () =>false;

/**
 * class hierarchy
 * Custom class from utside
 * - div.Fields - section for inputs elements
 * - - div.Field {name} - container for each field
 * - - - MuiFormControl-root
 * - - - - label.MuiInputLabel-root
 * - - - - div.MuiInputBase-root
 * - - - - - input[name={name}].MuiInputBase-input
 * - div.Controls - section for controls elements
 * - - OUR Custom components
 */

/**
 * Form with minimum styles, schema generator and etc
 * @param param0
 * @returns
 */
export const Form: IForm = ({ onSubmit, schema, className, children }) => {
    const { initialValues, validationSchema, fields } = React.useMemo(() => {
        return getDatas(schema);
    }, [schema]);

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit || dummySubmit}
            validationSchema={validationSchema}
        >
            <FormContainer className={className || "default"}>
                <Fields fields={fields} className="Fields" />
                <div className="Controls">{children}</div>
            </FormContainer>
        </Formik>
    );
};

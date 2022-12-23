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

const Container = styled("div")<{ direction: TFormProps["direction"] }>`
    display: flex;
    flex-direction: ${({ direction }) => direction};
    align-items: ${({ direction }) =>
        direction === "row" ? "center" : "stretch"};
    gap: 1rem;
    .Input {
        flex-grow: 1;
        flex-shrink: 1;
        overflow-y: visible;
        z-index: 100;
    }
    .Control {
        flex-shrink: 0;
    }
`;

const dummySubmit = () => undefined
/**
 * Form with minimum styles, schema generator and etc
 * @param param0
 * @returns
 */
export const Form: IForm = ({
    onSubmit,
    schema,
    className,
    children,
    direction = "column",
}) => {
    const { initialValues, validationSchema, fields } = React.useMemo(() => {
        return getDatas(schema);
    }, [schema]);

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit || dummySubmit}
            validationSchema={validationSchema}
        >
            <FForm className={className}>
                <Container direction={direction}>
                    <div className="Input">
                        <Fields fields={fields} />
                    </div>
                    <div className="Control">{children}</div>
                </Container>
            </FForm>
        </Formik>
    );
};

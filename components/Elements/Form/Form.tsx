import React from "react";
import { Formik, Form as FForm } from "formik";
import { getDatas } from "./utils";
import { TSchema } from ".";
import { Fields } from "./Fields";
import styled from "styled-components";

type TFormProps = {
    onSubmit: (values: any, actions: any) => void;
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

    .Body {
        padding-top: 1rem;
        flex-grow: 1;
        flex-shrink: 1;
        overflow-y: auto;
    }
    .Footer {
        flex-shrink: 0;
    }
`;
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
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            <FForm className={className}>
                <Container direction={direction}>
                    <div className="Body">
                        <Fields fields={fields} />
                    </div>
                    <div className="Footer">{children}</div>
                </Container>
            </FForm>
        </Formik>
    );
};

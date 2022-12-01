import React from "react";
import { FieldText } from "./Text";
import { TField } from "../types";
import { FieldEmail } from "./Email";
import styled from "styled-components";
import { TFormStatus } from "..";
import { useFormikContext } from "formik";
const Container = styled("div")`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1rem;
`;

export const Fields = ({
    fields,
}: {
    fields: Array<TField & { type: string }>;
}) => {
    const { status } = useFormikContext() as { status: TFormStatus };

    return (
        <Container className="FormFields">
            {fields.map(({ ...props }: TField & { type: string }) =>
                props.type === "text" ? (
                    <FieldText
                        key={props.name}
                        {...props}
                        {...(status?.disabled && { disabled: true })}
                    />
                ) : props.type === "email" ? (
                    <FieldEmail
                        key={props.name}
                        {...props}
                        {...(status?.disabled && { disabled: true })}
                    />
                ) : (
                    <></>
                )
            )}
        </Container>
    );
};

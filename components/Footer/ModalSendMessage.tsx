import React from "react";
import {
    TSchema,
    Form,
    TStateLabels,
    BtnSubmit,
    ESubmitStates,
} from "../Elements/Form";
import { Modal, useModal } from "../../features/modal";
import Button from "@mui/material/Button";
import styled from "styled-components";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import axios from "axios";
import { FormikHelpers } from "formik";

const Container = styled("div")`
    display: flex;
    flex-direction: column;
    .Header {
        flex-shrink: 0;
        display: flex;
        gap: 1rem;
        align-items: center;
        justify-content: center;
        margin-bottom: 1rem;
        .Icon {
            height: 3rem;
            width: 3rem;
        }
        .Title {
            font-size: 2rem;
            font-weight: bold;
        }
    }
    .Form {
        flex-shrink: 1;
        .Buttons {
            display: flex;
            justify-content: space-between;
            .ButtonItem {
                display: flex;
                gap: 1rem;
                align-items: center;
                &.Successful {
                    .IconWrapper {
                        padding: 0.3rem;
                        border-radius: 50%;
                        background-color: ${({ theme }) =>
                            theme.palette.color2[800]};
                        .Icon {
                            color: ${({ theme }) => theme.palette.colorRoot};
                            height: 1.5rem;
                            width: 1.5rem;
                            display: block;
                        }
                    }
                }
            }
        }
    }
`;

const schema: TSchema = [
    { text: { name: "name", label: "Имя", rules: { required: true, min: 2 } } },
    { email: { name: "email", label: "Почта", rules: { required: true } } },
    {
        text: {
            name: "message",
            label: "Сообщение",
            multiline: true,
            rules: { required: true, min: 8 },
        },
    },
];

type TFormValues = {
    name: string;
    email: string;
    message: string;
};

const stateLabels: TStateLabels = {
    Initial: "Отправить",
    Pending: "Отправляется...",
    Successful: "Отправлено",
    Error: "Неудача, отправить снова",
};
export const ModalSendMessage = () => {
    const { isModalOpen, closeModal } = useModal({ modal: "sendMassage" });
    const [stateSubmit, setStateSubmit] = React.useState<ESubmitStates>(
        ESubmitStates.Initial
    );
    const onSubmit = React.useCallback(
        (values: TFormValues, { setStatus }: FormikHelpers<TFormValues>) => {
            setStatus({ disabled: true });
            setStateSubmit(ESubmitStates.Pending);

            axios
                .post("/.netlify/functions/send-contact-email", {
                    contactName: values.name,
                    contactEmail: values.email,
                    message: values.message,
                })
                .then(() => {
                    setStateSubmit(ESubmitStates.Successful);
                })
                .catch(() => {
                    setStateSubmit(ESubmitStates.Error);
                    setStatus({ disabled: false });
                });
        },
        []
    );
    const handleCanel = () => {
        closeModal();
        setTimeout(() => setStateSubmit(ESubmitStates.Initial), 300);
    };
    return (
        <Modal open={isModalOpen}>
            <Container>
                <div className="Header">
                    <AssignmentOutlinedIcon className="Icon" />
                    <div className="Title">Отправить сообщение</div>
                </div>
                <Form
                    schema={schema}
                    onSubmit={onSubmit}
                    className="Form SendMessage"
                >
                    <div className="Buttons">
                        <BtnSubmit
                            stateSubmit={stateSubmit}
                            stateLabels={stateLabels}
                        />
                        <Button variant="outlined" onClick={handleCanel}>
                            Закрыть
                        </Button>
                    </div>
                </Form>
            </Container>
        </Modal>
    );
};

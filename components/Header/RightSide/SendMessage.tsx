import * as React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SendSharpIcon from "@mui/icons-material/SendSharp";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import TelegramIcon from "@mui/icons-material/Telegram";
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import styled from "styled-components";
import { Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import { openModal } from "../../../features/modal";

const Container = styled("div")`
    height: var(--iconHeight);
    width: var(--iconHeight);

    .SpeedDialButton {
        position: relative;
        height: var(--iconHeight);
        width: var(--iconHeight);

        .MuiButtonBase-root {
            height: var(--iconHeight);
            width: var(--iconHeight);
            background-color: transparent;
            box-shadow: none;
            .MuiSvgIcon-root {
                height: var(--iconHeight);
                width: var(--iconHeight);
                fill: var(--colorHIaT);
                transition: fill var(--transition);
                &:hover {
                    fill: var(--colorHIaTHover);
                }
            }
        }
        .MuiSpeedDial-actions {
            position: absolute;
            top: 100%;
            .MuiSpeedDialAction-staticTooltipLabel {
                user-select: none;
                cursor: pointer;
                white-space: nowrap;
                color: var(--colorText);
            }
        }
    }
`;

const actions = [
    {
        icon: <AssignmentOutlinedIcon />,
        name: "Использовать форму сайта",
        id: "sendForm",
    },

    {
        icon: (
            <a
                href="https://t.me/DenisReactWebCoder"
                rel="noreferrer"
                target="_blank"
                aria-label="Отправить связаться через канал телеграм"
            >
                <TelegramIcon />
            </a>
        ),
        name: "Отправить через телеграм",
        id: "sendTelegram",
    },
    {
        icon: (
            <a
                href="mailto:mr_dramm@mail.ru"
                rel="noreferrer"
                target="_blank"
                aria-label="Отправить письмо по электронной почте на адрес mr_dramm@mail.ru"
            >
                <MailOutlineIcon />
            </a>
        ),
        name: "Локальный почтовый агент",
        id: "sendMail",
    },
    {
        icon: <ContentCopyIcon />,
        name: "Скопировать почтовый адрес в буфер",
        id: "copyMail",
    },
];

export const SendMessage = () => {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();

    const handleOpen = () => setOpen(!open);
    const handleClose = (id: string) => {
        setOpen(false);
        if (id === "sendForm") {
            dispatch(openModal({ modal: "sendMassage" }));
        }
        if (id === "copyMail") {
            const email = "mr_dramm@mail.ru";
            navigator?.clipboard?.writeText(email);
        }
    };

    return (
        <Container>
            <Tooltip title={open ? "" : "Отправить сообщение"}>
                <SpeedDial
                    ariaLabel="SpeedDialButtonHeader"
                    className="SpeedDialButton"
                    icon={<SendSharpIcon />}
                    onClick={handleOpen}
                    open={open}
                    direction="down"
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            tooltipOpen
                            onClick={() => handleClose(action.id)}
                        />
                    ))}
                </SpeedDial>
            </Tooltip>
        </Container>
    );
};

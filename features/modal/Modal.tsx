import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import { default as ModalMUI } from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import styled from "styled-components";
type TModalProps = {
    children: React.ReactNode;
    open: boolean;
    className?: boolean;
};

const Container = styled("div")`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1300;
    display: flex;
    justify-content: center;
    align-items: center;
    ${({ theme }) => theme.breakpoints.down("sm")} {
        height: 100%;
    }
    .DefaultStyles {
        transition: width var(--transition);
        padding: 1rem;
        background-color: ${({ theme }) => theme.palette.colorRoot};
        margin: 0 auto;
        width: 100%;
        ${({ theme }) => theme.breakpoints.down("sm")} {
            border-radius: none;
            height: 100%;
        }
        ${({ theme }) => theme.breakpoints.up("sm")} {
            border-radius: var(--borderRadiusBlock);
        }
        ${({ theme }) => theme.breakpoints.between("sm", "lg")} {
            width: 80%;
        }
        ${({ theme }) => theme.breakpoints.between("lg", "xl")} {
            width: 60%;
        }
        ${({ theme }) => theme.breakpoints.up("xl")} {
            width: 1000px;
        }
    }
`;
export const Modal = ({ children, open, className }: TModalProps) => {
    return (
        <div>
            <ModalMUI
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Container className="Container">
                        <div
                            className={`InnerBlock${
                                className ? className : " DefaultStyles"
                            }`}
                        >
                            {children}
                        </div>
                    </Container>
                </Fade>
            </ModalMUI>
        </div>
    );
};

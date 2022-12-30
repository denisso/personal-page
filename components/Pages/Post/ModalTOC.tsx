import React from "react";
import { Modal, useModal, modalDefaultStyle } from "../../../features/modal";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { PostContext } from "./PostContext";

const ModalStyled = styled(Modal)`
    ${modalDefaultStyle}
    height: 90%;
    display: flex;
    flex-direction: column;
    .List {
        overflow-y: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: calc(100% - 4rem);
        .Gap {
            flex: 1;
        }
        .Box {
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 0.4rem;
            background: ${({ theme }) => theme.palette.color1[300]};
            border-radius: 0.5rem;
            .Item {
                padding: 0.5rem 1rem;
                border-radius: var(--borderRadiusBlock);
                transition: var(--transition) background-color;

                &:hover,
                &.active {
                    background-color: ${({ theme }) =>
                        theme.palette.color1[900]};
                    color: ${({ theme }) => theme.palette.color1[200]};
                }
                display: flex;
                gap: 0.5rem;
                align-items: center;
                .Item-Entity {
                    width: 0.8rem;
                    height: 0.8rem;
                    padding: 0 0.1rem;
                    &.Level1 {
                        background-color: ${({ theme }) =>
                            theme.palette.color1[800]};
                    }
                    &.Level2 {
                        background-color: ${({ theme }) =>
                            theme.palette.color1[700]};
                    }
                    &.Level3 {
                        background-color: ${({ theme }) =>
                            theme.palette.color1[600]};
                    }
                    &.Level4 {
                        background-color: ${({ theme }) =>
                            theme.palette.color1[500]};
                    }
                    &.Level5 {
                        background-color: ${({ theme }) =>
                            theme.palette.color1[400]};
                    }
                    &.Level6 {
                        background-color: ${({ theme }) =>
                            theme.palette.color1[300]};
                    }
                }
                .Link {
                    flex: 1;
                }
            }
        }
    }
    .Controls {
        flex: 1;
        display: flex;
        justify-content: center;
        padding-top: 1rem;
    }
`;

type TItemHeader = {
    hash: string;
    content: string;
    active: boolean;
    level: number;
    closeCallback: () => void;
};
const ItemHeader = ({
    content,
    hash,
    active,
    level,
    closeCallback,
}: TItemHeader) => {
    const ref = React.useRef<HTMLAnchorElement>(null);
    React.useEffect(() => {
        if (active) {
            ref.current?.scrollIntoView();
        }
    }, [active]);
    return (
        <a
            ref={ref}
            href={`#${hash}`}
            className={"Link Item" + (active ? " active" : "")}
            onClick={closeCallback}
        >
            {Array(level - 1)
                .fill(0)
                .map((_, i) => (
                    <div
                        key={`Level${i + 1}`}
                        className={`Item-Entity Level${i + 1}`}
                    ></div>
                ))}

            <div className="Content">{content}</div>
        </a>
    );
};
export const ModalTOC = () => {
    const { isModalOpen, closeModal } = useModal({ modal: "modalTOC" });
    const { current, headers } = React.useContext(PostContext);

    return (
        <ModalStyled open={isModalOpen}>
            <div className="List">
                <div className="Gap"></div>
                <div className="Box">
                    {headers.current.map(({ content, hash, level }, i) => (
                        <ItemHeader
                            content={content}
                            hash={hash}
                            active={i === current}
                            level={level || 1}
                            key={hash}
                            closeCallback={closeModal}
                        />
                    ))}
                </div>
                <div className="Gap"></div>
            </div>
            <div className="Controls">
                <Button
                    variant="outlined"
                    onClick={closeModal}
                    className="ButtonClose"
                >
                    Закрыть
                </Button>
            </div>
        </ModalStyled>
    );
};

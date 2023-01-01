import React from "react";
import { Modal, useModal } from "../../features/modal";
import styled from "styled-components";
import { TMenuItem } from "../../lib/types";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { TSchema, Form } from "../Elements/Form";
import { FallbackLoading } from "../Elements/FallbackLoading";
import { Chips, TChip } from "../Elements/Chips";
import { useSelector } from "react-redux";
import { selectState } from "../../features/state";
import { styleOneLine } from "../Elements/Form/StylesCases/oneline";
const ModalStyled = styled(Modal)`
    transition: width var(--transition), height var(--transition);
    padding: 1rem;
    background-color: ${({ theme }) => theme.palette.colorRoot};
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    ${({ theme }) => theme.breakpoints.down("sm")} {
        border-radius: 0;
        width: 100%;
        height: 100%;
    }
    ${({ theme }) => theme.breakpoints.up("sm")} {
        border-radius: var(--borderRadiusBlock);
        height: 90%;
    }
    ${({ theme }) => theme.breakpoints.between("sm", "lg")} {
        width: 90%;
    }
    ${({ theme }) => theme.breakpoints.between("lg", "xl")} {
        width: 85%;
    }
    ${({ theme }) => theme.breakpoints.up("xl")} {
        width: 1400px;
    }
    .FirstLine {
        width: 100%;
        .FormNav {
            ${styleOneLine}
            .ButtonReset {
                flex: 1;
            }
        }
    }

    .Items {
        transition: height var(--transition);
        flex: 1;
        overflow-y: hidden;
        .List {
            margin-top: 0.5rem;
            overflow-y: auto;
            height: 100%;
        }
    }
`;

export const ModalNav = () => {
    const { isModalOpen, closeModal } = useModal({ modal: "navMenu" });

    const [filter, setFilter] = React.useState("");
    const [loading, setLoading] = React.useState(true);
    const schema: TSchema = React.useMemo(() => {
        return [
            {
                text: {
                    name: "filter",
                    label: "Фильтр категорий меню",
                    autoFocus: true,
                    value: "",
                    onChange: (filter) => {
                        setFilter(filter);
                    },
                },
            },
        ];
    }, [setFilter]);
    const [items, setItems] = React.useState<Array<TMenuItem>>([]);

    const { menu } = useSelector(selectState);
    React.useEffect(() => {
        if (Array.isArray(menu) && menu.length) {
            setItems(
                menu.filter((item) =>
                    item?.title?.toLowerCase()?.includes(filter?.toLowerCase())
                )
            );
            setLoading(false);
        }
    }, [menu, setItems, filter, setLoading]);

    const handleCanel = () => {
        closeModal();
    };
    return (
        <ModalStyled open={isModalOpen}>
            <div className="FirstLine">
                <Form schema={schema} className="FormNav">
                    <div className="Buttons">
                        <Button
                            className="ButtonReset"
                            variant="contained"
                            type="reset"
                            disabled={filter === "" && true}
                        >
                            Сбросить
                        </Button>
                        <Button onClick={handleCanel} className="ButtonClose">
                            <CloseIcon className="Icon" />
                        </Button>
                    </div>
                </Form>
            </div>
            <div className="State">
                Выберите интересующую категорию. Число рядом с названием
                категории это количество статей.
            </div>
            <div className="Items">
                {loading ? (
                    <FallbackLoading />
                ) : items?.length ? (
                    <div className="List">
                        <Chips
                            list={items as Array<TChip>}
                            callback={closeModal}
                        />
                    </div>
                ) : !items?.length && filter !== "" ? (
                    <>По фильтру {filter} ничего не найдено</>
                ) : (
                    <>Сейчас нет ниодной категории для выбора</>
                )}
            </div>
        </ModalStyled>
    );
};

import React from "react";
import { Modal, useModal } from "../../features/modal";
import styled from "styled-components";
import axios, { AxiosResponse, AxiosError } from "axios";
import { TMenu, TMenuItem } from "../../lib/types";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import {
    TSchema,
    Form,
    ESubmitStates,
    BtnSubmit,
    TStateLabels,
} from "../Elements/Form";
import { Chips, TChip } from "../Elements/Chips";
import { updateState } from "../../features/state";
import { useDispatch } from "react-redux";

const getMenu = () : Promise<TMenu["menu"]> => {
    return new Promise((resolve, reject) =>
        axios
            .get("/api/menu/getmenu")
            .then(({ data }: AxiosResponse<TMenu>) => {
                resolve(data.menu);
            })
            .catch((err: AxiosError) => reject(err.message))
    );
};

const ModalStyled = styled(Modal)`
    transition: width var(--transition), height var(--transition);
    padding: 1rem;
    background-color: ${({ theme }) => theme.palette.colorRoot};
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    ${({ theme }) => theme.breakpoints.down("sm")} {
        border-radius: none;
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

        .Buttons {
            margin-left: 1rem;
            display: flex;
            gap: 1rem;
            .BtnClose {
                padding: 0;
                .Icon {
                    height: 3rem;
                    width: 3rem;
                }
            }
        }
    }

    .Items {
        transition: height var(--transition);
        flex: 1;
        overflow-y: hidden;
        .List {
            overflow-y: auto;
            height: 100%;
        }
    }
`;

const schema: TSchema = [
    {
        text: {
            name: "filter",
            label: "Фильтр меню",
            autoFocus: true,
        },
    },
];

type TFormValues = {
    filter: string;
};
const stateLabels: TStateLabels = {
    Initial: "Применить",
    Pending: "",
    Error: "Неудача, Искать снова",
};

export const ModalNav = () => {
    const { isModalOpen, closeModal } = useModal({ modal: "navMenu" });
    const [stateSubmit, setStateSubmit] = React.useState<ESubmitStates>(
        ESubmitStates.Initial
    );
    const itemsCache = React.useRef<Array<TMenuItem>>([]);
    const filterVal = React.useRef<string>("");
    const [items, setItems] = React.useState<Array<TMenuItem>>([]);
    const dispatch = useDispatch()
    React.useEffect(() => {
        getMenu()
            .then((items: TMenu["menu"]) => {
                itemsCache.current = items;
                const result = items.reduce((p, e) => {
                    if (e.type === "category") {
                        p.articles += e.total
                    }
                    return p
                }, { articles: 0 })
                dispatch(updateState(result))
                setItems(
                    itemsCache.current.filter((item) =>
                        item.title.includes(filterVal.current)
                    )
                );
            })
            .catch(() => "not implemented yet");
    }, [setItems, dispatch]);
    const onSubmit = React.useCallback(
        ({ filter }: TFormValues) => {
            // submit
            filterVal.current = filter;
            if (filter.trim() !== "") {
                setItems(
                    itemsCache.current.filter((item) =>
                        item.title.toLowerCase().includes(filter.toLowerCase())
                    )
                );
            } else {
                setItems(itemsCache.current);
            }
        },
        [setItems]
    );
    const handleCanel = () => {
        closeModal();
        setTimeout(() => setStateSubmit(ESubmitStates.Initial), 300);
    };
    return (
        <ModalStyled open={isModalOpen}>
            <div className="FirstLine">
                <Form
                    schema={schema}
                    onSubmit={onSubmit}
                    className="Form SendMessage"
                    direction="row"
                >
                    <div className="Buttons">
                        <BtnSubmit
                            stateSubmit={stateSubmit}
                            stateLabels={stateLabels}
                        />

                        <Button onClick={handleCanel} className="BtnClose">
                            <CloseIcon className="Icon" />
                        </Button>
                    </div>
                </Form>
            </div>
            <div className="Items">
                <div className="List">
                    <Chips list={items as Array<TChip>} callback={closeModal} />
                </div>
            </div>
        </ModalStyled>
    );
};

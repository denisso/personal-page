import React from "react";
import { Modal, useModal } from "../../features/modal";
import styled from "styled-components";
import { TMenuItem } from "../../lib/types";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import {
    TSchema,
    Form,
    ESubmitStates,
    TStateLabels,
    BtnSubmit,
} from "../Elements/Form";
import { FormikHelpers } from "formik";

import { Chips, TChip } from "../Elements/Chips";
import { useSelector } from "react-redux";
import { selectState } from "../../features/state";

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
            margin-top: 0.5rem;
            overflow-y: auto;
            height: 100%;
        }
    }
`;

type TFormValues = {
    filter: string;
};
const stateLabels: TStateLabels = {
    Initial: "Сбросить",
};

export const ModalNav = () => {
    const { isModalOpen, closeModal } = useModal({ modal: "navMenu" });
    const [stateSubmit, setStateSubmit] = React.useState<ESubmitStates>(
        ESubmitStates.Initial
    );

    const [filter, setFilter] = React.useState("");
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
        if (menu instanceof Object)
            if (Array.isArray(menu))
                setItems(
                    menu.filter((item) =>
                        item?.title
                            ?.toLowerCase()
                            ?.includes(filter?.toLowerCase())
                    )
                );
    }, [menu, setItems, filter]);
    const onSubmit = React.useCallback(
        (values: TFormValues, action: FormikHelpers<TFormValues>) => {
            action.resetForm({ values: { filter: "" } });
        },
        []
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
                    className="Form SendMessage"
                    direction="row"
                    onSubmit={onSubmit}
                >
                    <div className="Buttons">
                        <BtnSubmit
                            stateSubmit={stateSubmit}
                            stateLabels={stateLabels}
                            disabled={filter === "" && true}
                        />

                        <Button onClick={handleCanel} className="BtnClose">
                            <CloseIcon className="Icon" />
                        </Button>
                    </div>
                </Form>
            </div>
            <div className="State">
                Выберите интересующую категорию. Число рядом с названием
                категориеи это количество статей.
            </div>
            <div className="Items">
                <div className="List">
                    <Chips list={items as Array<TChip>} callback={closeModal} />
                </div>
            </div>
        </ModalStyled>
    );
};

import React from "react";
import { Modal, useModal } from "../../features/modal";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { TPropsGeneric } from "../../lib/types";
import { EntitiesLinks } from "../Elements/EntitiesLinks";
import axios, { AxiosResponse, AxiosError } from "axios";
import { TResponseGeneric } from "../../lib/types";
import Pagination from "@mui/material/Pagination";
import CloseIcon from "@mui/icons-material/Close";
import {
    TSchema,
    Form,
    ESubmitStates,
    BtnSubmit,
    TStateLabels,
} from "../Elements/Form";
import { FormikHelpers } from "formik";
import { useSelector } from "react-redux";
import { selectArticles } from "../../features/state";
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
        .FormSearch {
            ${styleOneLine}
        }
    }

    .Result {
        transition: height var(--transition);
        flex: 1;
        overflow-y: hidden;
        .ResultList {
            overflow-y: auto;
            height: 100%;
        }
    }

    .Pagination {
        display: flex;
        justify-content: center;
        margin-top: 1rem;
    }
`;

interface ISearchRequest {
    (search: string, token?: string): Promise<TResponseGeneric>;
}

const searchRequest: ISearchRequest = (search, token) => {
    return new Promise((resolve, reject) => {
        axios(`/api/search?search=${search}&access-token=${token}`)
            .then(({ data }: AxiosResponse<TResponseGeneric>) => {
                resolve(data);
            })
            .catch((err: AxiosError) => reject(err.message));
    });
};

type TFormValues = {
    search: string;
};
const stateLabels: TStateLabels = {
    Initial: "Искать",
    Pending: "",
    Error: "Неудача, Искать снова",
};

const ModalSearch = () => {
    const { isModalOpen, closeModal } = useModal({ modal: "search" });
    const articles = useSelector(selectArticles);
    const [result, setResult] = React.useState<Array<TPropsGeneric>>([]);
    const [stateSubmit, setStateSubmit] = React.useState<ESubmitStates>(
        ESubmitStates.Initial
    );
    const [search, setSearch] = React.useState<string>("");
    const schema: TSchema = [
        {
            text: {
                name: "search",
                label: "Строка поиска",
                autoFocus: true,
                rules: { required: true, min: 4 },
                value: search,
            },
        },
    ];
    const onSubmit = React.useCallback(
        (values: TFormValues, { setStatus }: FormikHelpers<TFormValues>) => {
            setStatus({ disabled: true });
            setStateSubmit(ESubmitStates.Pending);
            setSearch(values.search);
            searchRequest(values.search)
                .then((result: TResponseGeneric) => {
                    setStateSubmit(ESubmitStates.Successful);
                    if (Array.isArray(result.data)) {
                        setResult(result.data);
                    }
                    setStatus({ disabled: false });
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
        <ModalStyled open={isModalOpen}>
            <div className="FirstLine">
                <Form
                    schema={schema}
                    onSubmit={onSubmit}
                    className="FormSearch"
                >
                    <div className="Buttons">
                        <BtnSubmit
                            className="ButtonSubmit"
                            stateSubmit={stateSubmit}
                            stateLabels={stateLabels}
                        />

                        <Button onClick={handleCanel} className="ButtonClose">
                            <CloseIcon className="Icon" />
                        </Button>
                    </div>
                </Form>
                <div className="Info">
                    Всего: {articles.articles} найдено: {result.length} Запрос:{" "}
                    {search}{" "}
                </div>
            </div>

            <div className="Result">
                <EntitiesLinks
                    linked={result}
                    className="ResultList"
                    callbackClick={closeModal}
                />
            </div>
            <div className="Pagination">
                <Pagination count={10} disabled />
            </div>
        </ModalStyled>
    );
};

export default ModalSearch;

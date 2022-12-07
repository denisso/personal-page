import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { openModal, selectModal } from "./sliceModal";
export type TModalHookProps = {
    allClosed: "Все окна закрыты";
    navMenu: "Меню навигации";
    sendMassage: "Отправить сообщение автору";
    chooseHeader: "Выбор заголовка содержимого";
    search: "Поиск по сайту";
};

export const useModal = (arg?: { modal: keyof TModalHookProps }) => {
    const isModalOpen: boolean = useSelector(selectModal(arg));
    const dispatch = useDispatch();
    const closeModal = React.useCallback(() => {
        dispatch(openModal({ modal: "allClosed" }));
    }, [dispatch]);
    return { isModalOpen, closeModal };
};

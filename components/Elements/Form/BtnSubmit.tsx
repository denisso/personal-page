import React from "react"
import { Button } from "@mui/material";
import { CircularProgress } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

export enum ESubmitStates {
    Initial = "Не отправлено",
    Pending = "Отправляется",
    Successful = "Успешно",
    Error = "Ошибка отправки",
}

export type TStateLabels = {
    Initial: string;
    Pending?: string;
    Successful?: string;
    Error?: string;
};

type TBtnSubmitProps = {
    stateSubmit: ESubmitStates;
    className?: string;
    disabled?: boolean;
    stateLabels: TStateLabels;
};

export const BtnSubmit = ({
    stateSubmit,
    stateLabels,
    disabled
}: TBtnSubmitProps) => {
    return (
        <>
            {stateSubmit === ESubmitStates.Initial ? (
                <Button
                    variant="contained"
                    type="submit"
                    className="ButtonItem"
                    disabled={disabled}
                >
                    {stateLabels.Initial}
                </Button>
            ) : stateSubmit === ESubmitStates.Pending ? (
                <div className={`ButtonItem Pending`}>
                    <CircularProgress /> {stateLabels.Pending}
                </div>
            ) : stateSubmit === ESubmitStates.Successful ? (
                stateLabels.Successful ? (
                    <div className="ButtonItem Successful">
                        <div className="IconWrapper">
                            <CheckIcon className="Icon" />
                        </div>
                        {stateLabels.Successful}
                    </div>
                ) : (
                    <Button
                        variant="contained"
                        type="submit"
                        className="ButtonItem"
                    >
                        {stateLabels.Initial}
                    </Button>
                )
            ) : stateSubmit === ESubmitStates.Error ? (
                <Button
                    variant="contained"
                    type="submit"
                    className="ButtonItem"
                >
                    {stateLabels.Error}
                </Button>
            ) : (
                <></>
            )}
        </>
    );
};

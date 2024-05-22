import React from "react"
import { Button } from "@mui/material";
import { CircularProgress } from "@mui/material";
// import CheckIcon from "@mui/icons-material/Check";

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
    className = "ButtonSubmit",
    disabled
}: TBtnSubmitProps) => {
    return (
        <>
            {stateSubmit === ESubmitStates.Initial ? (
                <Button
                    variant="contained"
                    type="submit"
                    className={className}
                    disabled={disabled}
                >
                    {stateLabels.Initial}
                </Button>
            ) : stateSubmit === ESubmitStates.Pending ? (
                <div className={`${className} Pending`}>
                    <CircularProgress /> {stateLabels.Pending}
                </div>
            ) : stateSubmit === ESubmitStates.Successful ? (
                stateLabels.Successful ? (
                    <div className={`${className} Successful`}>
                        {/* <div className="IconWrapper">
                            <CheckIcon className="Icon" />
                        </div> */}
                        {stateLabels.Successful}
                    </div>
                ) : (
                    <Button
                        variant="contained"
                        type="submit"
                        className={className}
                    >
                        {stateLabels.Initial}
                    </Button>
                )
            ) : stateSubmit === ESubmitStates.Error ? (
                <Button
                    variant="contained"
                    type="submit"
                    className={className}
                >
                    {stateLabels.Error}
                </Button>
            ) : (
                <></>
            )}
        </>
    );
};

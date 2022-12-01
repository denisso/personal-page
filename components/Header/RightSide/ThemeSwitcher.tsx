import { useSelector, useDispatch } from "react-redux";
import { selectThemeName, switchMode } from "../../../features/theme/themeSlice";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import styled from "styled-components";
import Tooltip from "@mui/material/Tooltip";
const Component = styled("div")`
    display: flex;
    justify-content: flex-start;
    border-radius: 4rem;

    height: var(--iconHeight);
    width: var(--iconHeight);
    transition: color var(--transition), border-color var(--transition);
    user-select: none;
    cursor: pointer;
    position: relative;
    .Icon {
        height: var(--iconHeight);
        width: var(--iconHeight);
        position: absolute;
        fill: var(--colorHIaT);
        transition: fill var(--transition);
        &:hover {
            fill: var(--colorHIaTHover);
        }
    }
    &[data-theme="dark"] {
        justify-content: flex-end;
        .LightModeIcon {
            opacity: 0;
            z-index: -1;
        }
        .DarkModeIcon {
            opacity: 1;
        }
    }
    &[data-theme="light"] {
        justify-content: flex-end;
        .LightModeIcon {
            opacity: 1;
        }
        .DarkModeIcon {
            opacity: 0;
            z-index: -1;
        }
    }
`;

export const ThemeSwitcher = ({ className }: { className?: string }) => {
    const themeName: string = useSelector(selectThemeName);
    const dispatch = useDispatch();

    const onToggleMode = () => {
        dispatch(
            switchMode({
                themeName: themeName === "light" ? "dark" : "light",
            })
        );
    };
    return (
        <Component
            className={className}
            data-theme={themeName}
            onClick={onToggleMode}
        >
            <Tooltip title="Сменить на темную">
                <LightModeIcon className="Icon LightModeIcon" />
            </Tooltip>
            <Tooltip title="Сменить на светлую">
                <DarkModeIcon className="Icon DarkModeIcon" />
            </Tooltip>
        </Component>
    );
};

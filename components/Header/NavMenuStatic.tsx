import styled from "styled-components";
// import ArrowDropDown from "../../assets/arrovDown.svg";

const Container = styled("div")`
    position: relative;
    background-color: ${({ theme }) => theme.palette.colorRoot};
    overflow: hidden;
    .itemHover {
        display: flex;
        align-items: center;
        transition: color var(--transition);
        user-select: none;
        cursor: pointer;
        .text {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .icon {
            width: 1rem;
            height: 1rem;
            flex-shrink: 0;
            fill: ${({ theme }) => theme.palette.color1[500]};
            transition: fill var(--transition), transform var(--transition);
        }
    }
    &:hover {
        overflow: visible;
        color: ${({ theme }) => theme.palette.color1[800]};

        .icon {
            fill: ${({ theme }) => theme.palette.color1[800]};
            transform: rotate(90deg);
        }
    }
    &:hover .navItems {
        opacity: 1;
    }
    .navItems {
        display: flex;
        flex-direction: column;
        opacity: 0;
        transition: opacity var(--transition);
        position: absolute;
        top: 100%;
        border: solid;
        background-color: ${({ theme }) => theme.palette.colorRoot};
        .navItem {
            padding: 0.5rem;
            white-space: nowrap;
            transition: background-color var(--transition);
            &:hover {
                background-color: ${({ theme }) => theme.palette.color1[300]};
            }
        }
    }
`;
type Props = {
    className: string;
};
export const NavMenuStatic = ({ className }: Props) => {
    // const title =
    //     (Array.isArray(menu) &&
    //         menu?.find((menuItem: TMenuItem) => menuItem.current === true)
    //             ?.title) ||
    //     "";
    return (
        <>
            <Container className={className}>
                {/* <div className="itemHover">
                    <ArrowDropDown className="icon" />
                    <span className="text">{title}</span>
                </div>
                <div className="navItems">
                    {menu instanceof Array &&
                        menu.map((e, i) => (
                            <Link key={e.url} href={e.url}>
                                <a
                                    className="navItem"
                                    {...(e.current && {
                                        style: { display: "none" },
                                    })}
                                >
                                    {e.title}
                                </a>
                            </Link>
                        ))}
                </div> */}
            </Container>
        </>
    );
};

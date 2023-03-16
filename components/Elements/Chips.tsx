import styled from "styled-components";
import Chip from "@mui/material/Chip";
import { TEntities } from "../../lib/types";
import Badge from "@mui/material/Badge";
import Link from "next/link";

const Container = styled("div")`
    display: flex;
    gap: 1rem;
    align-items: center;

    .Content {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        padding: 0.1rem 0;
        align-items: center;
        justify-content: left;
        .ChipStyle {
            font-size: 0.9rem;
            height: 1.6rem;
            display: flex;
            align-items: center;
            .MuiChip-label {
                padding-top: 0.2rem;
            }
            .MuiChip-icon {
                display: flex;
                align-items: center;

                .MuiBadge-badge {
                    font-size: 0.8rem;
                    position: static;
                    transform: none;
                    flex-wrap: nowrap;
                    white-space: nowrap;
                    padding: 0;
                    display: block;
                    padding: 0.2rem 0.4rem;
                    background-color: ${({ theme }) =>
                        theme?.palette?.color2[900]};
                    border-radius: 0.4rem;
                }
            }
        }
    }
`;

export type TChip = {
    total?: number;
    slug: string;
    title: string;
    type?: keyof TEntities;
};

export type TChipsProps = {
    list: Array<TChip>;
    callback?: (...args: any[]) => void;
};

export const Chips = ({ list, callback }: TChipsProps) => {

    if (!list || !list?.length) return <></>;
    return (
        <Container>
            <div className="Content">
                {Array.isArray(list) &&
                    list.map(
                        (chip: TChip) =>
                            chip?.slug && (
                                <Link
                                    key={chip?.slug}
                                    href={`/${chip?.type.toLowerCase()}/${chip?.slug}`}
                                    passHref
                                >
                                    <Chip
                                        onClick={callback}
                                        className="ChipStyle"
                                        color="primary"
                                        label={chip.title}
                                        {...(chip?.total
                                            ? {
                                                  icon: (
                                                      <Badge
                                                          max={Infinity}
                                                          badgeContent={
                                                              chip?.total
                                                          }
                                                          sx={{
                                                              position:
                                                                  "static",
                                                          }}
                                                      />
                                                  ),
                                              }
                                            : {})}
                                    />
                                </Link>
                            )
                    )}
            </div>
        </Container>
    );
};

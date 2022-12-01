import { Chips } from "./Chips";
import { TRefLinks } from "../../lib/types";
import { TChip } from "./Chips";
export const EntitiesRefs = ({ refs }: { refs: TRefLinks }) => {
    if (!Array.isArray(refs) || !refs.length) return <></>;
    return <Chips list={refs as Array<TChip>} />
};

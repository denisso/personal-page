import { useContextGlobal } from "../ContextGlobal";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export const BackdropCustom = () => {
  const context = useContextGlobal()
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={context?.openBackDrop}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

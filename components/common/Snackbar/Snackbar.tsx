import { Alert } from "@mui/material";
import { StyledSnackBar } from "./Snackbar.style";
import { SnackbarProps } from "types/snackbar";

export default function SnackBar(
  props: SnackbarProps & { closeSnackbar: () => void }
) {
  return (
    <StyledSnackBar
      onClose={props.closeSnackbar}
      autoHideDuration={3000}
      {...props}
    ></StyledSnackBar>
  );
}

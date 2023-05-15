export interface SnackbarProps {
  open: boolean;
  message: string;
  anchorOrigin: {
    vertical: "bottom" | "top";
    horizontal: "center" | "left" | "right";
  };
}

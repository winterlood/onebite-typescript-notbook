import SnackBar from "components/common/Snackbar";
import React, { useContext, useState } from "react";
import { ReactElement } from "react";
import { SnackbarProps } from "types/snackbar";

export const SnackbarContext = React.createContext<{
  openSnackbar: (data: Pick<SnackbarProps, "message" | "anchorOrigin">) => void;
} | null>(null);

export default function SnackbarContextProvider({
  children,
}: {
  children: ReactElement | ReactElement[];
}) {
  const [state, setState] = useState<SnackbarProps>();

  const openSnackbar = (
    data: Pick<SnackbarProps, "message" | "anchorOrigin">
  ) => {
    setState({
      open: true,
      ...data,
    });
  };

  const closeSnackbar = () => {
    console.log("close snackbar");
    if (state) {
      setState({
        ...state,
        open: false,
      });
    }
  };

  return (
    <SnackbarContext.Provider
      value={{
        openSnackbar,
      }}
    >
      {children}
      {state && <SnackBar {...state} closeSnackbar={closeSnackbar} />}
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  const context = useContext(SnackbarContext);
  if (!context) throw Error("[CONTEXT ERROR] SnackbarProvider");
  return context.openSnackbar;
}

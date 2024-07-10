import { useMemo } from "react";
import Swal from "sweetalert2";
import useGetLabel from "./useGetLabel";

const useShowErrorMessage = () => {
  const isClient = useMemo(() => typeof window === "object", []);
  if (!isClient) return;
  const { getLabel } = useGetLabel();

  const showError = (title: string):void => {
    Swal.fire({
      title,
      text: getLabel("error.message"),
      icon: "error",
    });
  };

  return {
    showError
  }
};

export default useShowErrorMessage;

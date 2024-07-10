import { useMemo } from "react";
import Swal from "sweetalert2";
import useGetLabel from "./useGetLabel";

const useShowErrorMessage = (title: string) => {
  const isClient = useMemo(() => typeof window === "object", []);
  if (!isClient) return;
  const { getLabel } = useGetLabel();

  Swal.fire({
    title,
    text: getLabel("error.message"),
    icon: "error",
  });
};

export default useShowErrorMessage;

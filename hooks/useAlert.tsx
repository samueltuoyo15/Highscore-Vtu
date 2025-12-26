import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

type AlertProps = {
  title?: string;
  text?: string;
  icon?: "success" | "error" | "warning" | "info" | "question";
  showConfirmButton?: boolean;
  confirmButtonText?: string;
  confirmButtonColor?: string;
  timer?: number;
  onConfirm?: () => void;
  didClose?: () => void;
};

export const useAlert = () => {
  const showSuccess = (message: string, title: string = "Success!") => {
    return MySwal.fire({
      title,
      text: message,
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#9333ea",
    });
  };

  const showError = (message: string, title: string = "Error!") => {
    return MySwal.fire({
      title,
      text: message,
      icon: "error",
      confirmButtonText: "OK",
      confirmButtonColor: "#dc2626",
    });
  };

  const showWarning = (message: string, title: string = "Warning!") => {
    return MySwal.fire({
      title,
      text: message,
      icon: "warning",
      confirmButtonText: "OK",
      confirmButtonColor: "#f59e0b",
    });
  };

  const showInfo = (message: string, title: string = "Info") => {
    return MySwal.fire({
      title,
      text: message,
      icon: "info",
      confirmButtonText: "OK",
      confirmButtonColor: "#3b82f6",
    });
  };

  const showConfirm = (message: string, title: string = "Are you sure?") => {
    return MySwal.fire({
      title,
      text: message,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      confirmButtonColor: "#9333ea",
      cancelButtonColor: "#6b7280",
    });
  };

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showConfirm,
  };
};

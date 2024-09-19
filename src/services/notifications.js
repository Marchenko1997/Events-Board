import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const successfullNotification = (title) => {
  return toast.success(title, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const failedNotification = (title) => {
  return toast.error(title, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

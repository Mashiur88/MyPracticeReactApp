import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const showToast = ({
  type = "info",
  message = "This is a toast notification",
  position = "top-right",
  autoClose = 1000,
  hideProgressBar = false,
  closeOnClick = true,
  pauseOnHover = true,
  draggable = true,
}) => {
  toast[type](message, {
    position,
    autoClose,
    hideProgressBar,
    closeOnClick,
    pauseOnHover,
    draggable,
  });
};

const CustomToastContainer = () => {
  return <ToastContainer />;
};

export { showToast, CustomToastContainer };

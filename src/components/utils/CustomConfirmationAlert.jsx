import Swal from "sweetalert2";

const CustomConfirmationAlert = ({
    title = "Alert",
    text = "This is a message",
    icon = "info",
    showCancelButton = false,
    confirmButtonText = "OK",
    cancelButtonText = "Cancel",
    confirmButtonColor = "#3085d6",
    cancelButtonColor = "#d33",
    onConfirm = () => {},
    onCancel = () => {},
}) => {
    Swal.fire({
      title,
      text,
      icon,
      showCancelButton,
      confirmButtonText,
      cancelButtonText,
      confirmButtonColor,
      cancelButtonColor,
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        onCancel();
      }
    });
};

export default CustomConfirmationAlert;

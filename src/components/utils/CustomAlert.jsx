import Swal from "sweetalert2";

const CustomAlert = ({
  title = "Alert",
  text = "This is a message",
  icon = "info",   // 'success', 'error', 'warning', 'info', 'question'
  confirmButtonText = "Ok",
  confirmButtonColor = "#3085d6",
  timer = 5000,
  onConfirm = () => {}
}) => {
  Swal.fire({
    title,
    text,
    icon,
    confirmButtonText,
    confirmButtonColor,
    timer,
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
    }
  });
};

export default CustomAlert;

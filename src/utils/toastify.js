import { toast } from "react-toastify";

const notifySuccess = (msg) => {
  toast.success(msg, {
    position: "top-center", // You can change the position
    autoClose: 5000, // Time in milliseconds
  });
};

const notifyError = (msg) => {
  toast.error(msg, {
    position: "top-center",
    autoClose: 5000,
  });
};

export { notifySuccess, notifyError };

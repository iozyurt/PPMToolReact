import { infoNotification } from "../../components/utilities/Notification";

const notification = (param) => (store) => (next) => (action) => {
  infoNotification();
  return next(action);
};

export default notification;

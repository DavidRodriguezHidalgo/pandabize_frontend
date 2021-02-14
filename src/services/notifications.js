import { NotificationManager } from "react-notifications";

export const createNotification = (type, message, title) => {
  switch (type) {
    case "info":
      return NotificationManager.info(message, title, 5000);
    case "success":
      return NotificationManager.success(message, title, 5000);
    case "warning":
      return NotificationManager.warning(message, title, 5000);
    case "error":
      return NotificationManager.error(message, title, 5000);
    default:
      return NotificationManager.info(message, title, 5000);
  }
};

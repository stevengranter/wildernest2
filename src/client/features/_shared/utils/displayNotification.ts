import { NotificationData, notifications } from "@mantine/notifications"

export function displayNotification(notificationData: NotificationData) {
  notifications.show({
    ...notificationData,
    position: "bottom-right",
  })
}

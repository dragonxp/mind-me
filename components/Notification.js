import * as Notifications from 'expo-notifications';

// running notifications in foreground
Notifications.setNotificationHandler({
	handleNotification: async () => {
		return {
			shouldShowAlert: true
		}
	}
})

const triggerNotification = async (content, date) => {
    await Notifications.scheduleNotificationAsync({
        content,
        trigger: date,
    });
}

export { triggerNotification }
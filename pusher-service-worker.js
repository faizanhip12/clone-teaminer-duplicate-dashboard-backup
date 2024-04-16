importScripts('https://js.pusher.com/beams/service-worker.js')

const beamsClient = new PusherPushNotifications.Client({
  instanceId: 'f90d76b2-9fc6-42cf-ab0c-4ebdf0371b85'
})

self.addEventListener('push', event => {
  const payload = event.data ? event.data.json() : {}
  console.log(payload);

  const title = payload.notification.title || 'Push Notification'
  console.log(title);
  const options = {
    body: payload.notification.body || '',
    icon: payload.notification.icon || '/icon.png'
  }

  console.log(options);

  event.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener('notificationclick', event => {
  console.log(event);
  event.notification.close()

  // Add custom handling for notification click event, if needed
})

beamsClient.start()

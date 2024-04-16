
// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: "AIzaSyCfFoN-u9BQ7pxm8nAnE-Mz7RXPQlEiDMs",
  authDomain: "notification-d4d56.firebaseapp.com",
  projectId: "notification-d4d56",
  storageBucket: "notification-d4d56.appspot.com",
  messagingSenderId: "936449005846",
  appId: "1:936449005846:web:4705edc1ff35eb58d69837"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
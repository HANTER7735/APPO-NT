const firebaseConfig = {
    apiKey: "AIzaSyDIwgQdJfJzAfHi4ThGX7tKrLp9i4oO9UQ",
    authDomain: "dental-5a854.firebaseapp.com",
    databaseURL: "https://dental-5a854-default-rtdb.firebaseio.com",
    projectId: "dental-5a854",
    storageBucket: "dental-5a854.appspot.com",
    messagingSenderId: "148228469706",
    appId: "1:148228469706:web:a0cba55fdde566931bd533"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();


  const functions = require('firebase-functions');
  const admin = require('firebase-admin');
  const SibApiV3Sdk = require('sib-api-v3-sdk');
  
  admin.initializeApp();
  
  const apiKey = SibApiV3Sdk.ApiClient.instance.authentications['api-key'];
  apiKey.apiKey = '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';
  
  exports.notifyDoctorOnNewAppointment = functions.database
    .ref('/appointments/{appointmentId}')
    .onCreate((snapshot, context) => {
      const appointment = snapshot.val();
  
      const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
      const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  
      sendSmtpEmail.subject = 'New Appointment Booked';
      sendSmtpEmail.htmlContent = `<html><body>
                                   <p>New Appointment:</p>
                                   <p>Patient: ${appointment.name}</p>
                                   <p>Date: ${appointment.date}</p>
                                   <p>Time: ${appointment.time}</p>
                                   </body></html>`;
      sendSmtpEmail.sender = { email: 'dentalclinick42@gmail.com' };
      sendSmtpEmail.to = [{ email: 'mohammadsa2003hd@gmail.com' }];
  
      return apiInstance.sendTransacEmail(sendSmtpEmail)
        .then(function (data) {
          console.log('Email sent successfully:', data);
        })
        .catch(function (error) {
          console.error('Error sending email:', error);
        });
    });
  
  
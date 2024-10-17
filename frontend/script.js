const statusDiv = document.getElementById('status');

// Function to send emails
async function sendEmails() {
  const emails = document.getElementById('emails').value.split(',');
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  statusDiv.innerHTML = 'Sending emails...';

  try {
    const response = await fetch('http://localhost:3000/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emails, subject, message }),
    });

    const result = await response.json();
    statusDiv.innerHTML = result.success
      ? 'Emails sent successfully!'
      : 'Failed to send emails.';
  } catch (error) {
    statusDiv.innerHTML = 'Error: ' + error.message;
  }
}

// Function to send messages
async function sendMessages() {
  const numbers = document.getElementById('emails').value.split(','); // Reusing input for phone numbers
  const message = document.getElementById('message').value;

  statusDiv.innerHTML = 'Sending messages...';

  try {
    const response = await fetch('http://localhost:3000/send-message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ numbers, message }),
    });

    const result = await response.json();
    statusDiv.innerHTML = result.success
      ? 'Messages sent successfully!'
      : 'Failed to send messages.';
  } catch (error) {
    statusDiv.innerHTML = 'Error: ' + error.message;
  }
}

// Event listeners for the buttons
document.getElementById('sendEmailButton').addEventListener('click', sendEmails);
document.getElementById('sendMessageButton').addEventListener('click', sendMessages);

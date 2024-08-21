import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports'; // Make sure this file is available after amplify pull

Amplify.configure(awsconfig);

document.getElementById('signInForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const user = await Auth.signIn(username, password);
        document.getElementById('authMessage').innerText = `Hello, ${user.username}! Redirecting...`;
        
        // Redirect to the main page after successful sign-in
        window.location.href = 'index.html';
    } catch (error) {
        document.getElementById('authMessage').innerText = `Error: ${error.message}`;
    }
});

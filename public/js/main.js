// This file can contain client-side JavaScript code if needed
console.log('Main JS loaded');

// Example of a timeout for flash messages
document.addEventListener('DOMContentLoaded', () => {
    const flashMessages = document.querySelectorAll('.bg-green-100, .bg-red-100');
    if (flashMessages.length > 0) {
        setTimeout(() => {
            flashMessages.forEach(message => {
                message.style.opacity = '0';
                message.style.transition = 'opacity 1s';
                setTimeout(() => {
                    message.remove();
                }, 1000);
            });
        }, 3000);
    }
});
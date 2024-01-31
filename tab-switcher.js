document.getElementById('tabNumber').addEventListener('keyup', function(event) {
    if (event.keyCode === 13) { // keyCode 13 is the Enter key
        var tabNumber = parseInt(this.value) - 1; // Subtract 1 to align with zero-based indexing
        var errorElement = document.getElementById('error');

        // Use the chrome.tabs API to get the list of tabs
        chrome.tabs.query({currentWindow: true}, (tabs) => {
            if (!isNaN(tabNumber) && tabNumber >= 0 && tabNumber < tabs.length) {
                // Hide the error message if valid number
                errorElement.style.display = 'none';

                // Send message to background.js for tab switching
                chrome.runtime.sendMessage({tabNumber: tabNumber});
            } else {
                // Show the error message if invalid number
                errorElement.style.display = 'block';
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('zoomToggle');
    
    // Retrieve saved toggle state when popup opens
    chrome.storage.local.get(['zoomMode'], function(result) {
      toggle.checked = result.zoomMode || false;
    });
    
    // Save toggle state when changed
    toggle.addEventListener('change', function() {
      const isZoomMode = this.checked;
      
      // Save to local storage
      chrome.storage.local.set({zoomMode: isZoomMode}, function() {
        // Send message to active tab
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {
            action: "toggleZoomMode",
            isZoomMode: isZoomMode
          });
        });
      });
    });
  });
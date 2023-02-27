// uses timeout because it does not load when it does not have this and i cant seem to use onload events probably because most things seem to be handled by javascript
setTimeout(function () {

  // Select the element
  const element = document.querySelector("body > gradio-app").shadowRoot.querySelector("#img2maskimg");

  // Set initial values for zoom level and panning
  let zoomLevel = 1;
  let panX = 0;
  let panY = 0;

  // Add event listener for mousewheel
  element.addEventListener("wheel", (e) => {
    // Check if Shift key is held down
    if (e.shiftKey) {
      // Prevent default scrolling behavior
      e.preventDefault();

      // Calculate new zoom level
      const newZoomLevel = e.deltaY > 0 ? zoomLevel * 0.9 : zoomLevel * 1.1;

      // Limit zoom level to between 1 and 10
      zoomLevel = Math.max(1, Math.min(newZoomLevel, 10));

      // Update element style with new zoom level
      element.style.transform = `scale(${zoomLevel}) translate(${panX}px, ${panY}px)`;

      // Make element above all other elements
      element.style.zIndex = "9999";
    }
    if (e.ctrlKey) {

      // Prevent default behavior of the event if Ctrl key is held down
      e.preventDefault();
      // Get the input element and its value
      const input = document.querySelector("body > gradio-app").shadowRoot.querySelector("#img2maskimg > div.h-60.bg-gray-200 > div > div.z-50.top-10.right-2.justify-end.flex.gap-1.absolute > span > input");
      let value = parseFloat(input.value);

      // Determine scroll direction and update input value accordingly
      if (e.deltaY > 0) {
        value -= 3;
      } else {
        value += 3;
      }
      // Set the new input value
      input.value = value;
      const changeEvent = new Event('change');
      input.dispatchEvent(changeEvent);
    }

  });

  // Add event listener for keydown
  document.addEventListener("keydown", (e) => {
    // Check if Shift key is held down
    if (e.shiftKey) {
      // Check if R key is pressed
      if (e.key === "r") {
        // Reset zoom level and panning
        zoomLevel = 1;
        panX = 0;
        panY = 0;

        // Update element style with new zoom level and panning
        element.style.transform = `scale(${zoomLevel}) translate(${panX}px, ${panY}px)`;
      }
    }
  });

  // Add event listener for mousedown
  element.addEventListener("mousedown", (e) => {
    // Check if Shift key is held down
    if (e.shiftKey) {
      // Set initial values for mouse position and panning
      const startX = e.clientX;
      const startY = e.clientY;
      const startPanX = panX;
      const startPanY = panY;

      // Add event listener for mousemove
      document.addEventListener("mousemove", handleMouseMove);

      // Add event listener for mouseup
      document.addEventListener("mouseup", handleMouseUp);

      // Prevent default dragging behavior
      e.preventDefault();

      // Define function for handling mousemove
      function handleMouseMove(e) {
        // Calculate new panning values
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        panX = startPanX + deltaX;
        panY = startPanY + deltaY;

        // Update element style with new panning values and disable pointer events
        element.style.transform = `scale(${zoomLevel}) translate(${panX}px, ${panY}px)`;
        element.style.pointerEvents = "none";
      }

      // Get the button element and store it in a variable
      const button = document.querySelector("body > gradio-app").shadowRoot.querySelector("#img2maskimg > div.h-60.bg-gray-200 > div > div.z-50.top-2.right-2.justify-end.flex.gap-1.absolute > button:nth-child(1)");

      // Define function for handling mouseup
      function handleMouseUp() {
        // Create and cache a new mouse event
        const event = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true
        });

        // Dispatch the click event using the cached button element
        button.dispatchEvent(event);

        // Set pointer events back to their original value
        element.style.pointerEvents = "auto";

        // Remove event listeners for mousemove and mouseup
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      }

    }
  });
}, 3000);
// uses timeout because it other on dom events dont work (havent tested them all through)
setTimeout(function () {
  // Main variables
  const element = document.querySelector("body > gradio-app").shadowRoot.querySelector("#img2maskimg");
  element.style.zIndex = "9999";
  const button = document.querySelector("body > gradio-app").shadowRoot.querySelector("#img2maskimg > div.h-60.bg-gray-200 > div > div.z-50.top-2.right-2.justify-end.flex.gap-1.absolute > button:nth-child(1)");
  let activeMenu = null;
  let zoomLevel = 1;
  let panX = 0;
  let panY = 0;


  // Helper Functions
  function getHoveredElementWorkAround(event) {
    const [targetElement] = event.composedPath().filter(element => !element.shadowRoot);
    return targetElement;
  }
  function createContextMenu(options, event) {
    // Remove the active menu if it exists
    if (activeMenu) {
      activeMenu.remove();
    }

    const menu = document.createElement("div");
    menu.classList.add("context-menu");

    // Loop through the options and create a menu item for each one
    options.forEach((option) => {
      const menuItem = document.createElement("button");
      menuItem.innerText = option.label;
      menuItem.style.background = "#ffffff";
      menuItem.style.width = "100%"

      menuItem.addEventListener("click", () => {
        option.callback(event);
        menu.remove();
      });
      menu.appendChild(menuItem);
    });

    // Position the menu at the mouse pointer
    document.body.appendChild(menu);
    menu.style.left = `${event.pageX}px`;
    menu.style.top = `${event.pageY}px`;
    menu.style.position = "absolute";
    menu.style.minWidth = "33vw";
    menu.style.width = "auto";
    menu.style.height = "auto";
    menu.style.background = "#000000";
    menu.style.zIndex = "400"

    // Listen for clicks outside the menu and close it if necessary
    const closeMenu = () => {
      menu.remove();
      document.removeEventListener("click", closeMenu);
    };
    document.addEventListener("click", closeMenu);

    // Set the active menu to the new menu
    activeMenu = menu;
  }
  function getContextMenuOptions(element) {
    const classNames = Array.from(element.classList); // Get an array of all the class names on the element
    const nodeName = element.nodeName || null
    const id = element.id || null;



    const optionsByClass = {
      link: [
        {
          label: "Open Link",
          callback: () => {
            // Code to open the link
          },
        },
        {
          label: "Copy Link Address",
          callback: () => {
            // Code to copy the link address
          },
        },
      ],
      image: [
        {
          label: "Save Image",
          callback: () => {
            // Code to save the image
          },
        },
        {
          label: "Copy Image Address",
          callback: () => {
            // Code to copy the image address
          },
        },
      ],
    };
    const optionsById = {
      txt2img_sampling: [
        {
          label: "this is just a test to see if this works",
          callback: () => {
            // Code to handle Option 1
          },
        },
        {
          label: "Option 2",
          callback: () => {
            // Code to handle Option 2
          },
        },
      ],
    };
    const optionsBynodeName = {
      SELECT: [
        {
          label: "copy value",
          callback: () => {
            const valueToCopy = element.selectedOptions[0].value;
            navigator.clipboard.writeText(valueToCopy)
              .then(() => {
                console.log('Copied to clipboard:', valueToCopy);
              })
              .catch((error) => {
                console.error('Failed to copy to clipboard:', error);
              });
          },

        }
      ],
      INPUT: [
        {
          label: "copy value",
          callback: () => {
            const valueToCopy = element.value;
            navigator.clipboard.writeText(valueToCopy)
              .then(() => {
                console.log('Copied to clipboard:', valueToCopy);
              })
              .catch((error) => {
                console.error('Failed to copy to clipboard:', error);
              });
          },
        }
      ],
    };
    const defaultOptions1 = [
      {
        label: "Option 1",
        callback: () => {
          // Code to handle Option 1
        },
      },
      {
        label: "Option 2",
        callback: () => {
          // Code to handle Option 2
        },
      },
    ];
    
    // use concat if u want to append more default options before checking elements
    let options = defaultOptions1;
    classNames.forEach((name) => {
      if (optionsByClass[name]) {
        options = options.concat(optionsByClass[name]);
      }
    });
    if (optionsBynodeName[nodeName]) {
      options = options.concat(optionsBynodeName[nodeName]);
    }
    if (optionsById[id]) {
      options = options.concat(optionsById[id]);
    }
    return options;
  }
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

  // Main listeners
  element.addEventListener("wheel", (e) => {
    if (e.shiftKey) {
      e.preventDefault();
      const newZoomLevel = e.deltaY > 0 ? zoomLevel * 0.9 : zoomLevel * 1.1;
      zoomLevel = Math.max(1, Math.min(newZoomLevel, 10));
      element.style.transform = `scale(${zoomLevel}) translate(${panX}px, ${panY}px)`;
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
  element.addEventListener("mousedown", (e) => {
    // Check if Shift key is held down
    if (e.shiftKey) {
      // Set initial values for mouse position and panning
      const startX = e.clientX;
      const startY = e.clientY;
      const startPanX = panX;
      const startPanY = panY;

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      e.preventDefault();
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
      handleMouseUp()
    }
  });
  document.querySelector("body > gradio-app").shadowRoot.addEventListener("contextmenu", (event) => {
    event.preventDefault(); // Prevent the browser's default context menu from appearing
    const hoveredElement = getHoveredElementWorkAround(event); // Get the hovered element using the provided function
    const options = getContextMenuOptions(hoveredElement);
    createContextMenu(options, event, getHoveredElementWorkAround(event));
  });
}, 3000);
(async () => {
  // Wait for the specified delay
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // LocalStorage functions
  // Save the config to localStorage
  function saveConfigToLocalStorage(config) {
    localStorage.setItem("hotkeyConfig", JSON.stringify(config));
  }

  // Retrieve the config from localStorage and return as an object
  function getConfigFromLocalStorage() {
    return JSON.parse(localStorage.getItem("hotkeyConfig") || false);
  }


  // Check all keys in LocalStorage
  function checkAndSetDefaultConfig() {
    const config = getConfigFromLocalStorage();
    const defaultKeys = Object.keys(defaultHotkeysConfig);

    if (defaultKeys.length !== Object.keys(config).length) {
      return saveConfigToLocalStorage(defaultHotkeysConfig);
    }

    for (const key of defaultKeys) {
      if (!Object.keys(config).includes(key)) {
        return saveConfigToLocalStorage(defaultHotkeysConfig);
      }
    }

    return config;
  }


  // Update the config, and save it to localStorage
  const updateConfigAndSave = (key, value) =>
    saveConfigToLocalStorage({ ...getConfigFromLocalStorage(), [key]: value });

  // Default hotkeys configuration
  const defaultHotkeysConfig = {
    undo: "KeyZ",
    resetZoom: "KeyR",
    overlap: "KeyO",
    fitToScreen: "KeyS",
    openBrushSetting: "KeyQ",
    openBrushPanelUnderMouse: "KeyT",
    moveKey: "KeyF",
    toggleCanvasOpacity: "KeyC",
    toggleBrushOpacity: "KeyV",
    brushOpacity: 0.5,
    canvasOpacity: 0.4,
    moveByKey: false,
  };
  let isMoving = false;

  // Variables for mouse position tracking
  let mouseX, mouseY;

  // Check if the config is saved in localStorage and checks the amount of keys,
  // and If there is no configuration or it is incorrect, save the default config
  checkAndSetDefaultConfig();

  // Load hotkeys configuration from localStorage or use default configuration
  let hotkeysConfig = getConfigFromLocalStorage() || defaultHotkeysConfig;

  // Save the default configuration to localStorage if it's not already saved
  const sketchID = "#img2img_sketch";
  const inpaintID = "#img2maskimg";
  const inpaintSketchID = "#inpaint_sketch";
  const img2imgTabsID = "#mode_img2img .tab-nav";

  // Wait for the elements to be loaded
  const [sketchEl, inpaintEl, inpaintSketchEl, img2imgTabs] = await Promise.all(
    [
      document.querySelector(sketchID),
      document.querySelector(inpaintID),
      document.querySelector(inpaintSketchID),
      document.querySelector(img2imgTabsID),
    ]
  );

  /**
   * Prompts the user to enter a valid hotkey and returns the corresponding key code.
   * Validates the input against a regex pattern and a list of reserved hotkeys.
   * Returns null if the user cancels the prompt.
   */

  function askForHotkey() {
    const validKeys = /^[A-Za-zА]{1}$/; // A regex pattern to match a string containing 'Key' followed by a single alphabetical character
    const reservedKeys = [
      hotkeysConfig.resetZoom,
      hotkeysConfig.overlap,
      hotkeysConfig.openBrushSetting,
      hotkeysConfig.openBrushPanelUnderMouse,
      hotkeysConfig.undo,
      hotkeysConfig.moveKey,
      hotkeysConfig.toggleCanvasOpacity,
      hotkeysConfig.toggleBrushOpacity,
      hotkeysConfig.fitToScreen,
    ];

    let hotkey = "";
    let hotkeyCode = "";

    while (!validKeys.test(hotkey)) {
      hotkey = window.prompt("Please enter a valid hotkey:");
      hotkeyCode = "Key" + hotkey.toUpperCase();

      if (!hotkey) return null; // User canceled the prompt

      if (!validKeys.test(hotkey)) {
        window.alert("Invalid hotkey. Please enter 1 alphabetical character.");
      } else if (reservedKeys.includes(hotkeyCode) || hotkey === " ") {
        window.alert(
          "This hotkey is not able to be used. Please enter a different hotkey."
        );
        hotkey = "";
        hotkeyCode = "";
      }
    }

    return hotkeyCode;
  }

  function updateHotkeyAndSave(action, hotkey) {
    if (hotkey) {
      hotkeysConfig[action] = hotkey;
      updateConfigAndSave(hotkeysConfig);
    }
  }

  // Variables for canvas and brush opacity
  let canvasOpacity = 1;
  let brushOpacity = 1;

  /**
   * Toggles between two different move methods in an application depending on the current configuration in the hotkeysConfig object.
   * Updates the configuration and shows a notification alert to the user indicating the currently selected move method.
   */
  // TODO: im pretty sure this still requires shift to be held even with using the key so u might need to modify this
  function changeMoveMode() {
    hotkeysConfig.moveByKey = !hotkeysConfig.moveByKey;
    updateConfigAndSave("moveByKey", hotkeysConfig.moveByKey);
    const moveMethod = hotkeysConfig.moveByKey ? "KEY" : "SHIFT + mouse drag";
    const alertMessage = `The move method has been changed to ${moveMethod}.\n`;
    const instruction = hotkeysConfig.moveByKey ?
      "Click the key and hold. the image will follow the mouse as long as you hold down the button." :
      "Hold down Shift and drag with the left, right or middle mouse button.";
    alert(alertMessage + instruction);
  }

  // Change Opacity Level
  function askOpacityLevel() {
    let newOpacityLevel;

    newOpacityLevel = prompt(`Enter a new opacity level (10-70):
The higher the transparency level, the more transparent your mask will be:
10 - The mask is barely transparent
      70 - The mask is very transparent.`);

    if (newOpacityLevel === "") return NaN;

    newOpacityLevel = +newOpacityLevel;

    if (
      newOpacityLevel < 10 ||
      newOpacityLevel > 70 ||
      isNaN(newOpacityLevel)
    ) {
      alert("Invalid opacity level. Please enter a number between 10 and 70.");
      return NaN;
    }
    newOpacityLevel = 1 - newOpacityLevel / 100;
    return parseFloat(newOpacityLevel.toFixed(2));
  }


  function changeCanvasOpacityLevel() {
    const newOpacityLevel = askOpacityLevel();

    if (isNaN(newOpacityLevel)) return;

    hotkeysConfig["canvasOpacity"] = newOpacityLevel;
    updateConfigAndSave("canvasOpacity", newOpacityLevel);
  }

  function changeBrushOpacityLevel() {
    const newOpacityLevel = askOpacityLevel();

    if (isNaN(newOpacityLevel)) return;

    hotkeysConfig["brushOpacity"] = newOpacityLevel;


    updateConfigAndSave("brushOpacity", newOpacityLevel);
  }

  /**
   * An object containing several functions that update the hotkey configuration and save it when called.
   * Includes functions for undo, resetting zoom, overlapping images, opening brush settings and panels, and setting the move key.
   * Also includes a function to toggle between two different move methods in an application.
   */

  const actions = {
    undo: () => updateHotkeyAndSave("undo", askForHotkey()),
    resetZoom: () => updateHotkeyAndSave("resetZoom", askForHotkey()),
    overlap: () => updateHotkeyAndSave("overlap", askForHotkey()),
    fitToScreen: () => updateHotkeyAndSave("fitToScreen", askForHotkey()),
    openBrushSetting: () =>
      updateHotkeyAndSave("openBrushSetting", askForHotkey()),
    openBrushPanelUnderMouse: () => {
      updateHotkeyAndSave("openBrushPanelUnderMouse", askForHotkey());
    },
    setMoveKey: () => updateHotkeyAndSave("moveKey", askForHotkey()),
    changeMoveMode: () => changeMoveMode(),
    changeCanvasOpacityKey: () =>
      updateHotkeyAndSave("toggleCanvasOpacity", askForHotkey()),
    changeBrushOpacityKey: () =>
      updateHotkeyAndSave("toggleBrushOpacity", askForHotkey()),
    changeCanvasOpacityLevel: () => changeCanvasOpacityLevel(),
    changeBrushOpacityLevel: () => changeBrushOpacityLevel(),
  };

  // This code creates a context menu as a div element and appends it to the body of the document,
  // and returns the resulting menu element.
  const contextMenu = (() => {
    const menu = document.createElement("div");
    menu.style.listStyleType = "None";
    menu.className = "context-menu";
    menu.style.zIndex = "999";
    document.body.appendChild(menu);
    return menu;
  })();

  /**
   * Generates HTML markup for context menu items based on an array of item objects.
   * The generated markup includes the label of each item and its associated hotkey (if any).
   * If the associated hotkey is a boolean, "Shift" or "Key" will be used based on the current move method in the hotkeysConfig object.
   * Get last char, "KeyZ" we get Z , "Digit1" we get 1
   */
  const generateContextMenuItems = (items) => {
    const groupedItems = [
      {
        title: "Canvas Moving",
        items: [items[8], items[1]],
      },
      {
        title: "Control",
        items: items.slice(2, 6),
      },
      {
        title: "Color panel",
        items: items.slice(6, 8),
      },
      {
        title: "Mask transparency",
        items: items.slice(9),
      },
    ];

    return groupedItems
      .map((group) => {
        const groupItems = group.items
          .map((item) => {
            if (item.action === "changeMoveMode") {
              return `<li data-action="${item.action}">
               ${hotkeysConfig.moveByKey
                  ? "Toggle drag mode to <b>Shift + mouse drag</b>"
                  : `Toggle drag mode to <b>${hotkeysConfig.moveKey.charAt(
                    hotkeysConfig.moveKey.length - 1
                  )}</b> key`
                }
             </li>`;
            }
            if (typeof item.hotkey === "number") {
              return `<li data-action="${item.action}">
               <span><b>${item.hotkey * 100}</b> - </span> 
               ${item.label}
             </li>`;
            }

            return `<li data-action="${item.action}">
               <span><b>${item.hotkey.charAt(
              item.hotkey.length - 1
            )} - </b></span> 
               ${item.label}
             </li>`;
          })
          .join("");

        return `<h3>${group.title}</h3><ul>${groupItems}</ul>${group.title !== "Прозрачность" ? "<hr>" : ""
          }`;
      })
      .join("");
  };

  /**
   * Adds an event listener to the `document` for the `contextmenu` event.
   * When triggered, the function generates and displays a context menu with items based on the element that was clicked.
   * The generated menu items include labels and hotkeys for various actions in the application.
   */

  // Timer to close the context menu after a short delay
  let timeoutId;
  document.addEventListener("contextmenu", (e) => {
    let menuItems = [];
    if (
      e.target.closest(sketchID) ||
      e.target.closest(inpaintID) ||
      e.target.closest(inpaintSketchID)
    ) {
      e.preventDefault();
      menuItems = [
        {
          action: "Change hotkeys", // The action to perform when the item is clicked
          hotkey: "key⚙", // The hotkey to display next to the item in this case. It's the gear icon
          label: "Change hotkeys", // The text to display for the item
        },
        {
          action: "changeMoveMode",
          hotkey: hotkeysConfig.moveByKey,
          label: " current drag-drop mode. Click to Change Move mode",
        },
        // handle undo hotkey
        {
          action: "undo",
          hotkey: hotkeysConfig.undo,
          label: "Undo",
        },
        {
          action: "resetZoom",
          hotkey: hotkeysConfig.resetZoom,
          label: "Reset Zoom",
        },
        {
          action: "overlap",
          hotkey: hotkeysConfig.overlap,
          label: "Toggle Overlap",
        },
        {
          action: "fitToScreen",
          hotkey: hotkeysConfig.fitToScreen,
          label: "Fit to screen",
        },
        {
          action: "openBrushSetting",
          hotkey: hotkeysConfig.openBrushSetting,
          label: "Open color panel",
        },
        {
          action: "openBrushPanelUnderMouse",
          hotkey: hotkeysConfig.openBrushPanelUnderMouse,
          label: "Puts a color bar next to the mouse",
        },
        {
          action: "setMoveKey",
          hotkey: hotkeysConfig.moveKey,
          label: "Key to move the image",
        },
        {
          action: "changeCanvasOpacityKey",
          hotkey: hotkeysConfig.toggleCanvasOpacity,
          label: "Key to toggle opacity mode",
        },
        {
          action: "changeBrushOpacityKey",
          hotkey: hotkeysConfig.toggleBrushOpacity,
          label: "Key to toggle brush opacity mode",
        },
        {
          action: "changeCanvasOpacityLevel",
          hotkey: hotkeysConfig.canvasOpacity,
          label: "Change canvas opacity level",
        },
        {
          action: "changeBrushOpacityLevel",
          hotkey: hotkeysConfig.brushOpacity,
          label: "Change brush opacity level",
        },
      ];
    } else if (
      e.target.closest(inpaintID) ||
      e.target.closest(inpaintSketchID)
    ) {
      e.preventDefault();
      menuItems = [];
    } else {
      contextMenu.style.display = "none";
      return;
    }

    contextMenu.innerHTML = generateContextMenuItems(menuItems);
    contextMenu.style.display = "block";
    contextMenu.style.left = `${e.pageX}px`;
    contextMenu.style.top = `${e.pageY}px`;

    timeoutId = setTimeout(() => {
      contextMenu.style.display = "none";
    }, 800);
  });

  contextMenu.addEventListener("click", (e) => {
    // remove the event listeners
    const action = e.target.closest("li").dataset.action;
    // Check if the action exists in the actions object and run the corresponding function
    if (actions.hasOwnProperty(action)) {
      actions[action]();
    }
  });

  // Hide the context menu on left-click
  document.addEventListener("click", () => {
    contextMenu.style.display = "none";
  });

  // Hide the context menu on left-click

  contextMenu.addEventListener("mouseleave", () => {
    timeoutId = setTimeout(() => {
      contextMenu.style.display = "none";
    }, 300);
  });
  contextMenu.addEventListener("mouseenter", () => {
    clearTimeout(timeoutId);
  });


  //helper functions
  // get active tab
  function getActiveTab() {
    const tabs = img2imgTabs.querySelectorAll("button");

    for (let tab of tabs) {
      if (tab.classList.contains("selected")) {
        return tab;
      }
    }
  }

  // Get tab ID
  function getTabId() {
    // Get active tab to avoid some bug
    const activeTab = getActiveTab();

    // Create a lookup object for tab IDs
    const tabIdLookup = {
      "Sketch": sketchID,
      "Inpaint sketch": inpaintSketchID,
      "Inpaint": inpaintID
    };

    // Return the corresponding tab ID or undefined if not found
    return tabIdLookup[activeTab.innerText];
  }

  /**
   * Trigger undo action on the active tab when Ctrl + Z is pressed.
   * @param {string} elemId - The ID of the element to target.
   */

  // Get Active main tab to prevent "Undo" on text2img from being disabled
  function getActiveMainTab() {
    const selectedTab = document.querySelector(
      "#tabs .tab-nav button.selected"
    );
    return selectedTab;
  }

  /**
   * Apply zoom and pan functionality to a target element.
   * @param {HTMLElement} targetElement - The element to apply zoom and pan functionality to.
   * @param {string} elemId - The ID of the element to target.
   */

  function applyZoomAndPan(targetElement, elemId) {
    let [zoomLevel, panX, panY] = [1, 0, 0];

    // Manipulation with canvas , opacity mode

    // Simulate clicking and releasing the mouse on the canvas
    // Emulate mouse click on canvas
    function simulateClickAndMouseUp(x, y, canvas) {
      const mousedownEvent = new MouseEvent("mousedown", {
        clientX: x,
        clientY: y,
        bubbles: true,
        cancelable: true,
      });

      const mouseupEvent = new MouseEvent("mouseup", {
        clientX: x,
        clientY: y,
        bubbles: true,
        cancelable: true,
      });

      canvas.dispatchEvent(mousedownEvent);
      canvas.dispatchEvent(mouseupEvent);
    }

    // Set the opacity of the brush
    function setBrushOpacity(opacity) {
      const canvas = document.querySelector(
        `${inpaintID} canvas[key="interface"]`
      );

      const ctx = canvas.getContext("2d");
      ctx.globalAlpha = opacity;
    }

    // Set the opacity of the canvas
    function setCanvasOpacity(opacity) {
      const canvasEmu = document.querySelector(
        `${inpaintID} canvas[key="interface"]`
      );
      const canvas = document.querySelector(`${inpaintID} canvas[key="temp"]`);
      const ctx = canvas.getContext("2d");
      const undoBtn = document.querySelector(
        `${inpaintID} button[aria-label="Undo"]`
      );

      ctx.globalAlpha = opacity;
      if (opacity < 1) {
        // Creates a stack of false lines, but otherwise it will cancel the last line. The user will have to additionally press cancel
        simulateClickAndMouseUp(0, 0, canvasEmu);
      }
      simulateClickAndMouseUp(0, 0, canvasEmu);

      setTimeout(() => {
        undoBtn.click();
      }, 100);
    }

    // Position the color input element under the mouse cursor.
    function positionColorInputUnderMouse(colorInput) {
      colorInput.style.position = "absolute";
      colorInput.style.visibility = "hidden";

      const canvas = document.querySelector(
        `${elemId} canvas[key="interface"]`
      );
      const style = window.getComputedStyle(canvas);
      let marginLeft = style.getPropertyValue("margin-left");
      marginLeft = +marginLeft.split("px")[0];

      if (isNaN(marginLeft)) {
        marginLeft = 0;
      }

      colorInput.style.left =
        mouseX + marginLeft - targetElement.clientWidth + "px";
      colorInput.style.top = mouseY - 40 - colorInput.offsetHeight + "px";
    }

    // Toggle the brush panel's visibility and optionally position it under the mouse cursor.
    function toggleBrushPanel(openUnderMouse = false) {
      const colorID = getTabId();

      if (colorID === inpaintID) {
        return;
      }

      const colorBtn = document.querySelector(
        `${colorID} button[aria-label="Select brush color"]`
      );

      const colorInput = document.querySelector(
        `${colorID} input[aria-label="Brush color"]`
      );

      if (!colorInput) {
        colorBtn && colorBtn.click();
      }

      // Open color menu
      setTimeout(() => {
        const colorInput = document.querySelector(
          `${colorID} input[aria-label="Brush color"]`
        );

        if (openUnderMouse) {
          positionColorInputUnderMouse(colorInput);
        }

        colorInput && colorInput.click();
      }, 0);
    }

    // undo last action
    function undoActiveTab(e) {
      // document.addEventListener("keydown", (e) => {
      const isUndoKey = e.code === hotkeysConfig.undo;
      const isCtrlPressed = e.ctrlKey;

      const activeTab = getTabId();
      const activeMainTab = getActiveMainTab();

      if (canvasOpacity < 1 && "Inpaint" === getActiveTab().innerText) {
        setCanvasOpacity(1, elemId);
        canvasOpacity = 1;
      }

      if (
        isUndoKey &&
        isCtrlPressed &&
        activeMainTab &&
        activeMainTab.textContent.trim() === "img2img"
      ) {
        e.preventDefault();
        const undoBtn = document.querySelector(
          `${elemId} button[aria-label="Undo"]`
        );
        if (undoBtn && activeTab === elemId) {
          undoBtn.click();
        }
      }
      // });
    }

    // Reset the zoom level and pan position of the target element to their initial values.
    function resetZoom() {
      zoomLevel = 1;
      panX = 0;
      panY = 0;
      targetElement.style.transform = `scale(${zoomLevel}) translate(${panX}px, ${panY}px)`;

      targetElement.style.width = "";
      targetElement.style.height = "";
    }

    // Toggle the zIndex of the target element between two values, allowing it to overlap or be overlapped by other elements
    function toggleOverlap(forced = "") {
      const zIndex1 = "0";
      const zIndex2 = "998";

      targetElement.style.zIndex =
        targetElement.style.zIndex !== zIndex2 ? zIndex2 : zIndex1;

      if (forced === "off") {
        targetElement.style.zIndex = zIndex1;
      } else if (forced === "on") {
        targetElement.style.zIndex = zIndex2;
      }
    }

    // Adjust the brush size based on the deltaY value from a mouse wheel event.
    function adjustBrushSize(elemId, deltaY) {
      const input =
        document.querySelector(`${elemId} input[aria-label='Brush radius']`) ||
        document.querySelector(`${elemId} button[aria-label="Use brush"]`);
      input.click();
      input.value = parseFloat(input.value) + (deltaY > 0 ? -3 : 3);
      input.dispatchEvent(new Event("change"));
    }

    //Reset Zoom when upload image, To get rid of the bug, the picture becomes cropped
    fileInput = document.querySelector(
      `${elemId} input[type="file"][accept="image/*"].svelte-116rqfv`
    );
    fileInput.addEventListener("click", function () {
      resetZoom();
    });

    // Update the zoom level and pan position of the target element based on the values of the zoomLevel, panX and panY variables.
    function updateZoom(newZoomLevel) {
      // Clamp the zoom level between 0.5 and 10
      newZoomLevel = Math.max(0.5, Math.min(newZoomLevel, 10));

      targetElement.style.transform = `scale(${newZoomLevel}) translate(${panX}px, ${panY}px)`;

      // Update the target element's transform property to apply the new zoom level

      return newZoomLevel;
    }

    function changeZoomLevel(operation, e) {
      // Check if the shift key is pressed
      if (e.shiftKey) {
        e.preventDefault();
        // Calculate the delta based on the current zoom level
        // - Use 0.1 if the zoom level is below 3
        // - Use 0.5 if the zoom level is 3 or above
        const delta = zoomLevel >= 3 ? 0.5 : 0.1;

        // Update the zoom level based on the operation
        // - Add the delta if the operation is "+"
        // - Subtract the delta if the operation is "-"
        zoomLevel = updateZoom(
          zoomLevel + (operation === "+" ? delta : -delta)
        );
      }
    }

    /**
     * This function fits the target element to the screen by calculating
     * the required scale and offsets. It also updates the global variables
     * zoomLevel, panX, and panY to reflect the new state.
     */

    function fitToScreen() {
      resetZoom();

      const canvas = document.querySelector(
        `${elemId} canvas[key="interface"]`
      );

      if (canvas.offsetWidth > 862) {
        targetElement.style.width = canvas.offsetWidth + "px";
      }

      // Get element and screen dimensions
      const elementWidth = targetElement.offsetWidth;
      const elementHeight = targetElement.offsetHeight;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      // Get element's coordinates relative to the page
      const elementRect = targetElement.getBoundingClientRect();
      const elementY = elementRect.y;
      const elementX = elementRect.x;

      // Calculate scale and offsets
      const scaleX = screenWidth / elementWidth;
      const scaleY = screenHeight / elementHeight;
      const scale = Math.min(scaleX, scaleY);

      // Get the current transformOrigin
      const computedStyle = window.getComputedStyle(targetElement);
      const transformOrigin = computedStyle.transformOrigin;
      const [originX, originY] = transformOrigin.split(" ");
      const originXValue = parseFloat(originX);
      const originYValue = parseFloat(originY);

      // Calculate offsets with respect to the transformOrigin
      const offsetX =
        (screenWidth - elementWidth * scale) / 2 -
        elementX -
        originXValue * (1 - scale);
      const offsetY =
        (screenHeight - elementHeight * scale) / 2 -
        elementY -
        originYValue * (1 - scale);

      // Apply scale and offsets to the element
      targetElement.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;

      // Update global variables
      zoomLevel = scale;
      panX =
        (screenWidth - elementWidth * scale - elementX) / 2 +
        originXValue / 2.5;
      panY =
        (screenHeight - elementHeight * scale - elementY) / 2 +
        originYValue / 2;

      toggleOverlap("on");
    }

    // + and - (also numpad key ) to change zoom level
    // Reset zoom when pressing R key and toggle overlap when pressing O key
    // Open brush panel when pressing Q
    // Open brush panel under mouse when pressing T
    // Undo last action when pressing Ctrl + Z
    function handleKeyDown(event) {
      switch (event.code) {
        case hotkeysConfig.resetZoom:
          resetZoom();
          break;
        case hotkeysConfig.overlap:
          toggleOverlap();
          break;
        case hotkeysConfig.openBrushSetting:
          toggleBrushPanel();
          break;
        case hotkeysConfig.openBrushPanelUnderMouse:
          toggleBrushPanel(true);
          break;
        case hotkeysConfig.undo:
          undoActiveTab(event);
          break;
        // Keys that replace the zoom with the wheel
        case hotkeysConfig.fitToScreen:
          fitToScreen();
          break;
        case "Equal":
        case "NumpadAdd":
          changeZoomLevel("+", event);
          break;
        case "Minus":
        case "NumpadSubtract":
          changeZoomLevel("-", event);
          break;

        case hotkeysConfig.toggleCanvasOpacity:
          if ("Inpaint" === getActiveTab().innerText) {
            if (canvasOpacity === 1) {
              setCanvasOpacity(hotkeysConfig.canvasOpacity, inpaintID);
              canvasOpacity = hotkeysConfig.canvasOpacity;
            } else {
              canvasOpacity = 1;
              setCanvasOpacity(1, inpaintID);
            }
          }
          break;
        case hotkeysConfig.toggleBrushOpacity:
          if ("Inpaint" === getActiveTab().innerText) {
            if (brushOpacity === 1) {
              setBrushOpacity(hotkeysConfig.brushOpacity);
              brushOpacity = hotkeysConfig.brushOpacity;
            } else {
              brushOpacity = 1;
              setBrushOpacity(1);
            }
          }
          break;
      }
    }

    // Get Mouse position
    function getMousePosition(e) {
      mouseX = e.offsetX;
      mouseY = e.offsetY;
    }

    targetElement.addEventListener("mousemove", getMousePosition);
    //Handle events only inside the targetElement
    function handleMouseEnter() {
      document.addEventListener("keydown", handleKeyDown);
    }

    function handleMouseLeave() {
      document.removeEventListener("keydown", handleKeyDown);
    }

    // Add mouse event handlers
    targetElement.addEventListener("mouseenter", handleMouseEnter);
    targetElement.addEventListener("mouseleave", handleMouseLeave);

    // Reset zoom when click on another tab
    img2imgTabs.addEventListener("click", (e) => {
      if (e.target.classList.contains("svelte-1g805jl")) {
        toggleOverlap("off");
        resetZoom();
      }
    });

    targetElement.addEventListener("wheel", (e) => {
      // change zoom level
      const operation = e.deltaY > 0 ? "-" : "+";
      changeZoomLevel(operation, e);

      // Handle brush size adjustment with ctrl key pressed
      if (e.ctrlKey) {
        e.preventDefault();
        // Increase or decrease brush size based on scroll direction
        adjustBrushSize(elemId, e.deltaY);
      }
    });

    /**
     * Handle the move event for pan functionality. Updates the panX and panY variables and applies the new transform to the target element.
     * @param {MouseEvent} e - The mouse event.
     */
    function handleMoveKeyDown(e) {
      if (hotkeysConfig.moveByKey && e.code === hotkeysConfig.moveKey) {
        isMoving = true;
      }
    }

    function handleMoveKeyUp(e) {
      if (hotkeysConfig.moveByKey && e.code === hotkeysConfig.moveKey) {
        isMoving = false;
      }
    }

    document.addEventListener("keydown", handleMoveKeyDown);
    document.addEventListener("keyup", handleMoveKeyUp);

    function handleMoveByKey(e) {
      if (isMoving) {
        panX += e.movementX;
        panY += e.movementY;
        targetElement.style.transform = `scale(${zoomLevel}) translate(${panX}px, ${panY}px)`;
        targetElement.style.pointerEvents = "none";
      } else {
        targetElement.style.pointerEvents = "auto";
      }
    }

    function handleMoveByMouse(e) {
      e.preventDefault();
      panX += e.movementX;
      panY += e.movementY;
      targetElement.style.transform = `scale(${zoomLevel}) translate(${panX}px, ${panY}px)`;
      targetElement.style.pointerEvents = "none";
    }

    // Handle the end event for pan functionality. Removes the event listeners. Enables pointer event
    function handleEnd() {
      document.removeEventListener("mousemove", handleMoveByMouse);
      document.removeEventListener("mouseup", handleEnd);
      targetElement.style.pointerEvents = "auto";
    }

    function targetElementHandler(e) {
      if (e.shiftKey) {
        e.preventDefault();
        document.addEventListener("mousemove", handleMoveByMouse);
        document.addEventListener("mouseup", handleEnd);

        // remove key listener
        document.removeEventListener("mousemove", handleMoveByKey);
      }
    }

    document.addEventListener("mousemove", () => {
      if (hotkeysConfig.moveByKey) {
        document.addEventListener("mousemove", handleMoveByKey);

        // remove shift listeners
        document.removeEventListener("mousemove", handleMoveByMouse);
        document.removeEventListener("mouseup", handleEnd);
        targetElement.removeEventListener("mousedown", targetElementHandler);
      } else {
        targetElement.addEventListener("mousedown", targetElementHandler);
      }
    });
  }

  applyZoomAndPan(sketchEl, sketchID);
  applyZoomAndPan(inpaintEl, inpaintID);
  applyZoomAndPan(inpaintSketchEl, inpaintSketchID);
})();

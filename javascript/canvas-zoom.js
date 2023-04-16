// Main
(async () => {
  // Wait for the specified delay
  await new Promise((resolve) => setTimeout(resolve, 3000));
  class Toast {
    constructor(message, duration) {
      this.message = message;
      this.duration = duration;
      this.id = Toast.instances.length;
      this.toast = document.createElement("div");
      this.toast.className = "toast";
      this.toast.setAttribute("data-id", this.id);
      this.toast.innerText = this.message;
      this.body = document.body;
      this.body.appendChild(this.toast);
      Toast.instances.push(this);
    }

    setMessage(message) {
      this.message = message;
      this.toast.innerText = this.message;
      this.show();
    }

    show(duration = this.duration) {
      this.toast.classList.add("show");

      // Calculate the bottom position of the toast
      const toasts = document.querySelectorAll(".toast.show");
      const numToasts = toasts.length;
      const offset = numToasts * (this.toast.offsetHeight + 10) + 20;
      this.toast.style.bottom = `${offset}px`;

      setTimeout(() => {
        this.hide();
      }, duration);
    }

    hide() {
      this.toast.classList.remove("show");
      requestAnimationFrame(() => {
        setTimeout(() => {
          this.toast.remove();
          Toast.instances.splice(this.id, 1);
        }, 500);
      });
    }
  }

  Toast.instances = [];

  // toast to tell the user that the extentions is loaded
  const toast = new Toast("Canvas Zoom is loaded", 3000);
  toast.show();
  // timout
  setTimeout(() => {
    toast.setMessage("reuse the toast");
  }, 3000);

  // LocalStorage functions
  // Save the config to localStorage
  function saveConfigToLocalStorage(config) {
    localStorage.setItem("hotkeyConfig", JSON.stringify(config));
  }

  // Retrieve the config from localStorage and return as an object
  function getConfigFromLocalStorage() {
    return JSON.parse(localStorage.getItem("hotkeyConfig") || false);
  }

  function getCustomConfigFromLocalStorage() {
    return JSON.parse(localStorage.getItem("customHotkeyConfig") || false);
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
    brushOutline: false,
  };
  let isMoving = false;
  let isMouseOverCanvas = true;
  let contextMenu;

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
  const rangeGroupId = "#img2img_column_size";
  const img2imgPromptId = "#img2img_prompt textarea";
  const img2imgNegPromptId = "#img2img_neg_prompt textarea";

  // Wait for the elements to be loaded
  const [
    sketchEl,
    inpaintEl,
    inpaintSketchEl,
    img2imgTabs,
    rangeGroup,
    img2imgPrompt,
    img2imgNegPrompt,
  ] = await Promise.all([
    document.querySelector(sketchID),
    document.querySelector(inpaintID),
    document.querySelector(inpaintSketchID),
    document.querySelector(img2imgTabsID),
    document.querySelector(rangeGroupId),
    document.querySelector(img2imgPromptId),
    document.querySelector(img2imgNegPromptId),
  ]);

  // Create a div element for the cursor circle
  const cursorCircle = document.createElement("div");
  cursorCircle.classList.add("cursor-circle");
  document.body.appendChild(cursorCircle);

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

      if (!hotkey || hotkey.trim() === "") {
        window.alert("Invalid hotkey. Please enter 1 alphabetical character.");
        return null; // User canceled the prompt
      }

      hotkey = hotkey.trim();

      if (!validKeys.test(hotkey)) {
        window.alert("Invalid hotkey. Please enter 1 alphabetical character.");
      } else {
        hotkeyCode = "Key" + hotkey.toUpperCase();

        if (reservedKeys.includes(hotkeyCode)) {
          window.alert(
            "This hotkey is not able to be used. Please enter a different hotkey."
          );
          hotkey = "";
          hotkeyCode = "";
        }
      }
    }

    contextMenu.style.display = "none";
    return hotkeyCode;
  }

  function updateHotkeyAndSave(action, hotkey) {
    if (hotkey) {
      hotkeysConfig[action] = hotkey;
      updateConfigAndSave(action, hotkey);
    }
  }

  // Variables for canvas and brush opacity
  let canvasOpacity = 1;
  let brushOpacity = 1;

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

    contextMenu.style.display = "none";

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
    contextMenu.style.display = "none";
  }

  function toggleBrushOutline() {
    const brushOutline = !getConfigFromLocalStorage().brushOutline;

    alert(
      `You toggle Outline brush to:  ${
        !hotkeysConfig["brushOutline"] ? "Enabled" : "Disabled"
      }`
    );

    contextMenu.style.display = "none";
    hotkeysConfig.brushOutline = brushOutline;
    updateConfigAndSave("brushOutline", brushOutline);

    if (!brushOutline) {
      cursorCircle.style.display = "none";
    }
  }

  // Load custom hotkeys from customHotkeys.js file
  function loadCustomHotkeys() {
    customHotkeysConfig = getCustomConfigFromLocalStorage();

    if (!customHotkeysConfig) {
      alert(
        "Custom hotkeys config not found. Please set your custom hotkeys in customHotkeys.js file"
      );
      return;
    }

    hotkeysConfig = customHotkeysConfig;
    saveConfigToLocalStorage(customHotkeysConfig);
    contextMenu.style.display = "none";

    alert("Custom hotkeys successfully loaded");
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
    changeCanvasOpacityKey: () =>
      updateHotkeyAndSave("toggleCanvasOpacity", askForHotkey()),
    changeBrushOpacityKey: () =>
      updateHotkeyAndSave("toggleBrushOpacity", askForHotkey()),
    changeCanvasOpacityLevel: () => changeCanvasOpacityLevel(),
    changeBrushOpacityLevel: () => changeBrushOpacityLevel(),
    loadCustomHotkeys: () => loadCustomHotkeys(),
    toggleBrushOutline: () => toggleBrushOutline(),
  };

  // This code creates a context menu as a div element and appends it to the body of the document,
  // and returns the resulting menu element.
  contextMenu = (() => {
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
    // Remove "Change hotkeys" item
    items.splice(0, 1);

    const groupedItems = [
      {
        title: "Canvas Moving",
        items: [items[8]],
      },
      {
        title: "Control",
        items: items.slice(0, 4),
      },
      {
        title: "Color panel",
        items: items.slice(5, 8),
      },
      {
        title: "Mask transparency",
        items: items.slice(9),
      },
    ];

    const loadCustomHotkeysItem = `<li data-action="${items[4].action}">
               <span><b>${items[4].hotkey.charAt(
                 items[4].hotkey.length - 1
               )}</b></span><b>
               ${items[4].label}
               </b>
             </li><hr>`;

    return (
      loadCustomHotkeysItem +
      groupedItems
        .map((group) => {
          const groupItems = group.items
            .map((item) => {
              if (typeof item.hotkey === "number") {
                return `<li data-action="${item.action}">
               <span><b>${100 - item.hotkey * 100}</b> - </span> 
               ${item.label}
             </li>`;
              }

              if (typeof item.hotkey === "boolean") {
                return `<li data-action="${item.action}">
               <span> Outline at Brush now  <b>${
                 hotkeysConfig["brushOutline"] ? "Enabled" : "Disabled"
               }</b> </span> 
               Click to toggle outline
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

          return `<h3>${group.title}</h3><ul>${groupItems}</ul>${
            group.title !== "Mask transparency" ? "<hr>" : ""
          }`;
        })
        .join("")
    );
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
          action: "loadCustomHotkeys",
          hotkey: "",
          label: "Load custom hotkeys from customHotkeys.js file",
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
          action: "toggleBrushOutline",
          hotkey: hotkeysConfig.brushOutline,
          label: " .Click to toggle brush outline",
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
    if (!e.target.closest("li")) {
      return;
    }

    const action = e.target.closest("li").dataset.action;

    // Check if the action exists in the actions object and run the corresponding function
    if (actions.hasOwnProperty(action)) {
      actions[action]();
    }
  });

  // Hide the context menu on left-click
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".context-menu")) contextMenu.style.display = "none";
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
  function getActiveTab(all = false) {
    const tabs = img2imgTabs.querySelectorAll("button");

    if (all) return tabs;

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
      Sketch: sketchID,
      "Inpaint sketch": inpaintSketchID,
      Inpaint: inpaintID,
    };

    // Return the corresponding tab ID or undefined if not found
    return tabIdLookup[activeTab.innerText];
  }
  // Get Active main tab to prevent "Undo" on text2img from being disabled
  function getActiveMainTab() {
    const selectedTab = document.querySelector(
      "#tabs .tab-nav button.selected"
    );
    return selectedTab;
  }

  /**
   * The restoreImgRedMask function displays a red mask around an image to indicate the aspect ratio.
   * If the image display property is set to 'none', the mask breaks. To fix this, the function
   * temporarily sets the display property to 'block' and then hides the mask again after 300 milliseconds
   * to avoid breaking the canvas. Additionally, the function adjusts the mask to work correctly on
   * very long images.
   *
   * The function works as follows:
   * 1. Check if the mainTabId is defined.
   * 2. Find the mainTab and the image element.
   * 3. Reset the transform property of the imageARPreview element.
   * 4. If the width of the mainTab is greater than 865, calculate the new transform values
   *    for the imageARPreview element based on the mainTab's transform values.
   * 5. Show the red mask by setting the display property to 'block' if it is 'none'.
   * 6. Clear any existing timers and set a new timer to hide the mask after 300ms.
   */

  function restoreImgRedMask() {
    const mainTabId = getTabId();

    if (mainTabId !== undefined) {
      const mainTab = document.querySelector(mainTabId);

      let timer;
      const img = mainTab.querySelector("img");
      const imageARPreview = document.querySelector("#imageARPreview");

      if (img && imageARPreview) {
        imageARPreview.style.transform = "";
        if (parseFloat(mainTab.style.width) > 865) {
          const str = mainTab.style.transform;
          const regex = /[-+]?[0-9]*\.?[0-9]+/g;
          const numbers = str.match(regex).map(Number);

          const [posX, posY, zoom] = numbers;

          const transformOrigin =
            window.getComputedStyle(mainTab).transformOrigin;
          const [originX, originY] = transformOrigin.split(" ");
          const originYValue = parseFloat(originY);

          const offsetY = originYValue * (1 - zoom);

          imageARPreview.style.transform = `translate(${posX}px, ${-offsetY}px) scale(${zoom})`;
        }

        if (img.style.display == "none") {
          img.style.display = "block";

          if (timer) {
            clearTimeout(timer);
          }

          timer = setTimeout(() => {
            img.style.display = "none";
          }, 300);
        }
      }
    }
  }

  // Apply functionality to the range inputs
  rangeGroup.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", restoreImgRedMask);
  });

  /**
   * Apply zoom and pan functionality to a target element.
   * @param {HTMLElement} targetElement - The element to apply zoom and pan functionality to.
   * @param {string} elemId - The ID of the element to target.
   */

  function applyZoomAndPan(targetElement, elemId) {
    let [zoomLevel, panX, panY] = [1, 0, 0];

    // Change cursor position on mousemove
    function changeCursorCords(e) {
      if (getTabId() !== inpaintID || !hotkeysConfig.brushOutline) {
        cursorCircle.style.display = "none";
        cursorCircle.classList.remove("enabled");
        return;
      }

      const { clientX, clientY } = e;
      cursorCircle.style.left = `${clientX}px`;
      cursorCircle.style.top = `${clientY + window.scrollY}px`;

      cursorCircle.style.display = "block";
      cursorCircle.classList.add("enabled");
    }

    // Remove cursor display on mouseout
    function removeCursorDisplay() {
      cursorCircle.style.display = "none";
      cursorCircle.classList.remove("enabled");
    }

    function attachEventListeners(canvas, input) {
      canvas.addEventListener("mousemove", changeCursorCords);
      canvas.addEventListener("mouseout", removeCursorDisplay);
      input.addEventListener("change", () => {
        setCircleSize(elemId);
      });
    }

    targetElement.addEventListener("mousemove", (e) => {
      const canvas = targetElement.querySelector(`canvas[key="interface"]`);
      const input = targetElement.querySelector(
        `${elemId} input[aria-label='Brush radius']`
      );

      if (getTabId() !== inpaintID || !hotkeysConfig.brushOutline) {
        cursorCircle.style.display = "none";
        return;
      }

      if (!input) {
        adjustBrushSize(elemId, 0, true);
      }

      if (!cursorCircle.classList.contains("enabled") && canvas && input) {
        attachEventListeners(canvas, input);
      }
    });

    targetElement.addEventListener("mouseout", () => {
      if (getTabId() !== inpaintID) return;
      cursorCircle.style.display = "none";
    });

    // Cancel the traces on all keys except the left one
    function disableCanvasTraces() {
      let cancelTraceHandler = (e) => {
        if (e.button !== 0) {
          e.stopImmediatePropagation();
        }
      };

      let canvas = targetElement.querySelector(`canvas[key="interface"]`);

      if (canvas) {
        if (!canvas.classList.contains("disableTrace")) {
          canvas.addEventListener("mousedown", cancelTraceHandler, true);
          canvas.classList.add("disableTrace");
        }
      }
    }

    targetElement.addEventListener("mousedown", disableCanvasTraces, true);

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

      canvas.addEventListener("mousemove", () => {
        isMouseOverCanvas = true;
      });

      canvas.addEventListener("mouseleave", () => {
        isMouseOverCanvas = false;
      });

      const style = window.getComputedStyle(canvas);
      let marginLeft = style.getPropertyValue("margin-left");
      marginLeft = +marginLeft.split("px")[0];

      if (isNaN(marginLeft)) {
        marginLeft = 0;
      }

      if (!isMouseOverCanvas) {
        colorInput.style.left = mouseX - targetElement.clientWidth + "px";
        colorInput.style.top = mouseY - 40 - colorInput.offsetHeight + "px";
      } else {
        colorInput.style.left =
          mouseX + marginLeft - targetElement.clientWidth + "px";
        colorInput.style.top = mouseY - 40 - colorInput.offsetHeight + "px";
      }
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

    function fixCanvas() {
      // Get active Tab
      const activeTab = getActiveTab().textContent.trim();

      // Do only if not Inpaint tab
      if (activeTab !== "img2img") {
        const img = targetElement.querySelector(`${elemId} img`);

        // Check if img exists
        if (img && img.style.display !== "none") {
          // To restore cler func we need to clone img
          // This tag doesn't do anything useful, but it breaks a lot of things
          img.style.display = "none";
          img.style.visibility = "hidden";
        }
      }
    }

    // Reset the zoom level and pan position of the target element to their initial values.

    function resetZoom() {
      zoomLevel = 1;
      panX = 0;
      panY = 0;

      setCircleSize(elemId);
      fixCanvas();

      targetElement.style.transform = `scale(${zoomLevel}) translate(${panX}px, ${panY}px)`;

      // If the canvas is wider than 860px, fit it to the element
      const canvas = document.querySelector(
        `${elemId} canvas[key="interface"]`
      );

      toggleOverlap("off");

      if (
        canvas &&
        parseFloat(canvas.style.width) > 865 &&
        parseFloat(targetElement.style.width) > 865
      ) {
        fitToElement();
        return;
      }

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

    function setCircleSize(elemId) {
      const input =
        document.querySelector(`${elemId} input[aria-label='Brush radius']`) ||
        document.querySelector(`${elemId} button[aria-label="Use brush"]`);

      const canvas = targetElement.querySelector(
        `${elemId} canvas[key='interface']`
      );

      if (!input) return;

      const brushSize = parseFloat(input.value);
      const adjustedBrushSize = brushSize >= 50 ? brushSize * 0.95 : brushSize;

      // Calculate the circle size based on the canvas size
      const canvasWidth = canvas.clientWidth;
      const canvasHeight = canvas.clientHeight;
      const circleWidth = Math.min(adjustedBrushSize, canvasWidth);
      const circleHeight = Math.min(adjustedBrushSize, canvasHeight);

      cursorCircle.style.width = `${zoomLevel * circleWidth * 0.95}px`;
      cursorCircle.style.height = `${zoomLevel * circleHeight * 0.95}px`;
    }

    // Adjust the brush size based on the deltaY value from a mouse wheel event.
    function adjustBrushSize(elemId, deltaY, withotValue = false) {
      // Get brush input element
      const input =
        document.querySelector(`${elemId} input[aria-label='Brush radius']`) ||
        document.querySelector(`${elemId} button[aria-label="Use brush"]`);

      if (input) {
        input.click();
        if (!withotValue) {
          input.value = parseFloat(input.value) + (deltaY > 0 ? -3 : 3);
          input.dispatchEvent(new Event("change"));
        }

        setCircleSize(elemId);
      }
    }

    //Reset Zoom when upload image, To get rid of the bug, the picture becomes cropped
    fileInput = document.querySelector(
      `${elemId} input[type="file"][accept="image/*"].svelte-116rqfv`
    );

    fileInput.addEventListener("click", function () {
      resetZoom();
    });

    fileInput.addEventListener("change", (e) => {
      setTimeout(() => {
        setCircleSize(elemId);
        disableCanvasTraces();
      }, 200);

      isMouseOverCanvas = true;
    });

    // Update the zoom level and pan position of the target element based on the values of the zoomLevel, panX and panY variables.
    function updateZoom(newZoomLevel) {
      // Clamp the zoom level between 0.5 and 10
      newZoomLevel = Math.max(0.5, Math.min(newZoomLevel, 10));

      targetElement.style.transform = `scale(${newZoomLevel}) translate(${panX}px, ${panY}px)`;

      // Update the target element's transform property to apply the new zoom level

      toggleOverlap("on");
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

        setCircleSize(elemId);
      }
    }

    /**
     * This function fits the target element to the screen by calculating
     * the required scale and offsets. It also updates the global variables
     * zoomLevel, panX, and panY to reflect the new state.
     */

    function fitToElement() {
      //Reset Zoom
      targetElement.style.transform = `translate(${0}px, ${0}px) scale(${1})`;

      // Get element and screen dimensions
      const elementWidth = targetElement.offsetWidth;
      const elementHeight = targetElement.offsetHeight;
      const parentElement = targetElement.parentElement;
      const screenWidth = parentElement.clientWidth;
      const screenHeight = parentElement.clientHeight;

      // Get element's coordinates relative to the parent element
      const elementRect = targetElement.getBoundingClientRect();
      const parentRect = parentElement.getBoundingClientRect();
      const elementX = elementRect.x - parentRect.x;

      // Calculate scale and offsets
      const scaleX = screenWidth / elementWidth;
      const scaleY = screenHeight / elementHeight;
      const scale = Math.min(scaleX, scaleY);

      const transformOrigin =
        window.getComputedStyle(targetElement).transformOrigin;
      const [originX, originY] = transformOrigin.split(" ");
      const originXValue = parseFloat(originX);

      const offsetX =
        (screenWidth - elementWidth * scale) / 2 - originXValue * (1 - scale);
      // Apply scale and offsets to the element
      targetElement.style.transform = `translate(${offsetX}px, 0px) scale(${scale})`;

      // Update global variables
      zoomLevel = scale;
      panX = offsetX;
      panY = 0;

      setCircleSize(elemId);
      toggleOverlap("off");
    }

    function fitToScreen() {
      resetZoom();

      const canvas = document.querySelector(
        `${elemId} canvas[key="interface"]`
      );

      if (!canvas) return;

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

      setCircleSize(elemId);
      toggleOverlap("on");
    }

    // Blur prompt Textarea
    function blurTextArea() {
      img2imgPrompt.blur();
      img2imgNegPrompt.blur();
    }

    // + and - (also numpad key ) to change zoom level
    // Reset zoom when pressing R key and toggle overlap when pressing O key
    // Open brush panel when pressing Q
    // Open brush panel under mouse when pressing T
    // Undo last action when pressing Ctrl + Z
    function handleKeyDown(event) {
      blurTextArea();
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
      resetZoom();
      if (e.target.classList.contains("svelte-1g805jl")) {
        setTimeout(() => {
          resetZoom();
          disableCanvasTraces();

          const canvas = document.querySelector(
            `${elemId} canvas[key="interface"]`
          );

          if (canvas) {
            canvas.addEventListener("mousemove", () => {
              isMouseOverCanvas = true;
            });

            canvas.addEventListener("mouseleave", () => {
              isMouseOverCanvas = false;
            });
          } else {
            isMouseOverCanvas = true;
          }
        }, 0);
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
      if (e.code === hotkeysConfig.moveKey) {
        isMoving = true;
      }
    }

    function handleMoveKeyUp(e) {
      if (e.code === hotkeysConfig.moveKey) {
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
      if (e.shiftKey) {
        e.preventDefault();
        panX += e.movementX;
        panY += e.movementY;
        targetElement.style.transform = `scale(${zoomLevel}) translate(${panX}px, ${panY}px)`;
        targetElement.style.pointerEvents = "none";

        disableCanvasTraces();
      }
    }

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
      }
    }

    targetElement.addEventListener("mousedown", targetElementHandler, true);
    document.addEventListener("mousemove", handleMoveByKey);
  }

  applyZoomAndPan(sketchEl, sketchID);
  applyZoomAndPan(inpaintEl, inpaintID);
  applyZoomAndPan(inpaintSketchEl, inpaintSketchID);
})();

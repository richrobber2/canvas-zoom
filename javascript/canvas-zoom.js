// Main
onUiLoaded(() => {
  async function init() {
    // LocalStorage functions
    const localStorageHelper = {
      saveConfig: (key, config) => localStorage.setItem(key, JSON.stringify(config)),
      getConfig: (key) => JSON.parse(localStorage.getItem(key) || false),
    };

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
      togglePipette: "KeyA",
      brushOpacity: 0.5,
      canvasOpacity: 0.4,
      brushOutline: false,
    };

    function checkAndSetDefaultConfig() {
      const config = localStorageHelper.getConfig("hotkeyConfig");
      const defaultKeys = Object.keys(defaultHotkeysConfig);

      if (defaultKeys.length !== Object.keys(config).length || defaultKeys.some((key) => !Object.keys(config).includes(key))) {
        localStorageHelper.saveConfig("hotkeyConfig", defaultHotkeysConfig);
        return defaultHotkeysConfig;
      }

      return config;
    }

    const updateConfigAndSave = (key, value) => {
      const config = {
        ...localStorageHelper.getConfig("hotkeyConfig"),
        [key]: value,
      };
      localStorageHelper.saveConfig("hotkeyConfig", config);
    };

    // Other variables and constants
    let isMoving = false;
    let contextMenu;
    let mouseX, mouseY;

    // Variables for canvas and brush opacity
    let canvasOpacity = 1;
    let brushOpacity = 1;

    checkAndSetDefaultConfig();
    let hotkeysConfig = localStorageHelper.getConfig("hotkeyConfig") || defaultHotkeysConfig;
    localStorage.setItem("brushOutline", hotkeysConfig.brushOutline);

    // Element IDs
    const elementIDs = {
      sketch: "#img2img_sketch",
      inpaint: "#img2maskimg",
      inpaintSketch: "#inpaint_sketch",
      img2imgTabs: "#mode_img2img .tab-nav",
      rangeGroup: "#img2img_column_size",
      img2imgPrompt: "#img2img_prompt textarea",
      img2imgNegPrompt: "#img2img_neg_prompt textarea",
      img2imgDemRaw: "#img2img_dimensions_row",
      sendToInpainBtn: "#image_buttons_img2img #inpaint_tab",
      sendToInpainBtnT2I: "#image_buttons_txt2img #inpaint_tab",
    };

    async function getElements() {
      const elements = await Promise.all(Object.values(elementIDs).map((id) => document.querySelector(id)));

      return Object.fromEntries(Object.keys(elementIDs).map((key, index) => [key, elements[index]]));
    }

    const elements = await getElements();

    /**
     * Prompts the user to enter a valid hotkey and returns the corresponding key code.
     * Validates the input against a regex pattern and a list of reserved hotkeys.
     * Returns null if the user cancels the prompt.
     */
    function askForHotkey(currentAction) {
      const validKeys = /^[A-Za-zА]{1}$/; // A regex pattern to match a string containing 'Key' followed by a single alphabetical character

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

          // Check for conflicts
          const conflictingAction = Object.entries(hotkeysConfig).find(([action, key]) => action !== currentAction && key === hotkeyCode);

          if (conflictingAction) {
            const [conflictingActionName, conflictingKey] = conflictingAction;
            const currentActionKey = hotkeysConfig[currentAction];

            window.alert(`Hotkey conflict detected: '${hotkey.toUpperCase()}' is already assigned to '${conflictingActionName}'. The hotkeys will be swapped.`);

            // Swap hotkeys
            hotkeysConfig[currentAction] = hotkeyCode;
            hotkeysConfig[conflictingActionName] = currentActionKey;
          } else {
            // Update hotkeysConfig with new hotkeyCode
            hotkeysConfig[currentAction] = hotkeyCode;
          }

          // Save the updated hotkeysConfig to localStorage
          localStorageHelper.saveConfig("hotkeyConfig", hotkeysConfig);
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

    function askOpacityLevel() {
      const newOpacityLevel = parseInt(prompt("Enter a new opacity level (10-70):"), 10);

      if (isNaN(newOpacityLevel) || newOpacityLevel < 10 || newOpacityLevel > 70) {
        alert("Invalid opacity level. Please enter a number between 10 and 70.");
        return NaN;
      }

      contextMenu.style.display = "none";
      return parseFloat((1 - newOpacityLevel / 100).toFixed(2));
    }

    function changeCanvasOpacityLevel() {
      const newOpacityLevel = askOpacityLevel();

      if (!isNaN(newOpacityLevel)) {
        hotkeysConfig["canvasOpacity"] = newOpacityLevel;
        updateConfigAndSave("canvasOpacity", newOpacityLevel);
      }
    }

    function changeBrushOpacityLevel() {
      const newOpacityLevel = askOpacityLevel();

      if (!isNaN(newOpacityLevel)) {
        hotkeysConfig["brushOpacity"] = newOpacityLevel;
        updateConfigAndSave("brushOpacity", newOpacityLevel);
        contextMenu.style.display = "none";
      }
    }

    function toggleBrushOutline() {
      const brushOutline = hotkeysConfig.brushOutline;

      contextMenu.style.display = "none";
      hotkeysConfig.brushOutline = !brushOutline;
      updateConfigAndSave("brushOutline", !brushOutline);
      localStorage.setItem("brushOutline", !brushOutline);

      alert(`You toggle Outline brush to:  ${hotkeysConfig["brushOutline"] ? "Enabled" : "Disabled"}`);
    }

    function loadCustomHotkeys() {
      const customHotkeysConfig = JSON.parse(localStorage.getItem("customHotkeyConfig"));

      if (!customHotkeysConfig) {
        alert("Custom hotkeys config not found. Please set your custom hotkeys in customHotkeys.js file");
        return;
      }

      hotkeysConfig = customHotkeysConfig;
      localStorage.setItem("configsHotkey", JSON.stringify(customHotkeysConfig));
      contextMenu.style.display = "none";

      alert("Custom hotkeys successfully loaded");
    }

    function fillCanvasWithColor() {
      localStorage.setItem("fillCanvasBrushColor", "true");
      contextMenu.style.display = "none";
    }

    function toggleIntegrationWithControlNet() {
      const isIntegrated = localStorage.getItem("integrationCanvasZoomInControlNet") === "true";

      if (!isIntegrated) {
        alert("ControlNet Integration Enabled");
        localStorage.setItem("integrationCanvasZoomInControlNet", true);
      } else {
        alert("ControlNet Integration Disabled");
        localStorage.setItem("integrationCanvasZoomInControlNet", false);
      }

      contextMenu.style.display = "none";
    }

    /**
     * An object containing several functions that update the hotkey configuration and save it when called.
     * Includes functions for undo, resetting zoom, overlapping images, opening brush settings and panels, and setting the move key.
     * Also includes a function to toggle between two different move methods in an application.
     */

    const actions = {
      undo: () => updateHotkeyAndSave("undo", askForHotkey("undo")),
      resetZoom: () => updateHotkeyAndSave("resetZoom", askForHotkey("resetZoom")),
      overlap: () => updateHotkeyAndSave("overlap", askForHotkey("overlap")),
      fitToScreen: () => updateHotkeyAndSave("fitToScreen", askForHotkey("fitToScreen")),
      openBrushSetting: () => updateHotkeyAndSave("openBrushSetting", askForHotkey("openBrushSetting")),
      openBrushPanelUnderMouse: () => updateHotkeyAndSave("openBrushPanelUnderMouse", askForHotkey("openBrushPanelUnderMouse")),
      setMoveKey: () => updateHotkeyAndSave("moveKey", askForHotkey("moveKey")),
      changeCanvasOpacityKey: () => updateHotkeyAndSave("toggleCanvasOpacity", askForHotkey("toggleCanvasOpacity")),
      changeBrushOpacityKey: () => updateHotkeyAndSave("toggleBrushOpacity", askForHotkey("toggleBrushOpacity")),
      changeCanvasOpacityLevel: changeCanvasOpacityLevel,
      changeBrushOpacityLevel: changeBrushOpacityLevel,
      loadCustomHotkeys: loadCustomHotkeys,
      toggleBrushOutline: toggleBrushOutline,
      togglePipette: () => updateHotkeyAndSave("togglePipette", askForHotkey("togglePipette")),
      fillCanvasColor: fillCanvasWithColor,
      toggleIntegration: toggleIntegrationWithControlNet,
    };

    // This code creates a context menu as a div element and appends it to the body of the document,
    // and returns the resulting menu element.

    /* the light theme uses rgba while dark uses rgb, this is absolutely a hack */
    const themeName = getComputedStyle(document.querySelector("body")).backgroundColor.includes("rgba") ? "cm-light" : "cm-dark";

    contextMenu = (() => {
      const menu = document.createElement("div");
      menu.style.listStyleType = "None";
      menu.className = `context-menu ${themeName}`;
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
      const fakeItems = [...items];
      // Remove "Change hotkeys" item
      fakeItems.splice(0, 1);

      const groupedItems = [
        {
          title: "Canvas Moving",
          items: [fakeItems[11]],
        },
        {
          title: "Control",
          items: fakeItems.slice(0, 4),
        },
        {
          title: "Color panel",
          items: fakeItems.slice(7, 11),
        },
        {
          title: "Mask transparency",
          items: fakeItems.slice(12),
        },
      ];

      const loadCustomHotkeysItem =
        `<li data-action="${items[5].action}">
               <span><b>${items[5].hotkey.charAt(items[5].hotkey.length - 1)}</b></span><b>
               ${items[5].label}
               </b>
             </li>` +
        `<li data-action="${items[6].action}">
               <span><b>${items[6].hotkey.charAt(items[6].hotkey.length - 1)}</b></span><b>
               ${items[6].label}
               </b>
             </li>` +
        `<li data-action="${items[7].action}">
               <span><b>${items[7].hotkey.charAt(items[7].hotkey.length - 1)}</b></span><b>
               ${items[7].label}
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
                  <b>${hotkeysConfig["brushOutline"] ? "Disable" : "Enable"}</b>
               <span>Brush Outline </span> 
             </li>`;
                }

                return `<li data-action="${item.action}">
               <span><b>${item.hotkey.charAt(item.hotkey.length - 1)} - </b></span> 
               ${item.label}
             </li>`;
              })
              .join("");

            return `<h3>${group.title}</h3><ul>${groupItems}</ul>${group.title !== "Mask transparency" ? "<hr>" : ""}`;
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
      const isTargetRelevant = e.target.closest(elementIDs.sketch) || e.target.closest(elementIDs.inpaint) || e.target.closest(elementIDs.inpaintSketch);

      if (!isTargetRelevant) {
        contextMenu.style.display = "none";
        return;
      }

      // Define context menu items
      const menuItems = [
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
          action: "toggleIntegration",
          hotkey: "",
          label: "Enable integration with ControlNet (after enabling, reload the page)",
        },
        {
          action: "loadCustomHotkeys",
          hotkey: "",
          label: "Load custom hotkeys from customHotkeys.js file",
        },
        {
          action: "fillCanvasColor",
          hotkey: "",
          label: "Fill the canvas with the color of the brush",
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
          action: "togglePipette",
          hotkey: hotkeysConfig.togglePipette,
          label: "Toggle Pipette",
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

      e.preventDefault();
      contextMenu.innerHTML = generateContextMenuItems(menuItems);
      contextMenu.style.display = "block";
      contextMenu.style.left = `${e.pageX}px`;
      contextMenu.style.top = `${e.pageY}px`;

      timeoutId = setTimeout(() => {
        contextMenu.style.display = "none";
      }, 800);
    });

    contextMenu.addEventListener("click", (e) => {
      const listItem = e.target.closest("li");
      if (!listItem) return;

      const action = listItem.dataset.action;
      if (actions.hasOwnProperty(action)) actions[action]();
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".context-menu")) contextMenu.style.display = "none";
    });

    contextMenu.addEventListener("mouseleave", () => {
      timeoutId = setTimeout(() => {
        contextMenu.style.display = "none";
      }, 300);
    });

    contextMenu.addEventListener("mouseenter", () => {
      clearTimeout(timeoutId);
    });

    // Helper functions
    // Get active tab
    function getActiveTab(all = false) {
      const tabs = elements.img2imgTabs.querySelectorAll("button");

      if (all) return tabs;

      for (let tab of tabs) {
        if (tab.classList.contains("selected")) {
          return tab;
        }
      }
    }

    // Get tab ID
    function getTabId() {
      const activeTab = getActiveTab();
      const tabIdLookup = {
        Sketch: elementIDs.sketch,
        "Inpaint sketch": elementIDs.inpaintSketch,
        Inpaint: elementIDs.inpaint,
      };
      return tabIdLookup[activeTab.innerText];
    }

    // Get Active main tab to prevent "Undo" on text2img from being disabled
    function getActiveMainTab() {
      const selectedTab = document.querySelector("#tabs .tab-nav button.selected");
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

      if (!mainTabId) return;

      const mainTab = document.querySelector(mainTabId);
      const img = mainTab.querySelector("img");
      const imageARPreview = document.querySelector("#imageARPreview");

      if (!img || !imageARPreview) return;

      imageARPreview.style.transform = "";
      if (parseFloat(mainTab.style.width) > 865) {
        const transformValues = mainTab.style.transform.match(/[-+]?[0-9]*\.?[0-9]+/g).map(Number);
        const [posX, , zoom] = transformValues;

        const [originX, originY] = window.getComputedStyle(mainTab).transformOrigin.split(" ");
        const offsetY = parseFloat(originY) * (1 - zoom);

        imageARPreview.style.transform = `translate(${posX}px, ${-offsetY}px) scale(${zoom})`;
      }

      if (img.style.display !== "none") return;

      img.style.display = "block";

      setTimeout(() => {
        img.style.display = "none";
      }, 300);
    }

    // Apply functionality to the range inputs
    const rangeInputs = elements.rangeGroup
      ? elements.rangeGroup.querySelectorAll("input")
      : [document.querySelector("#img2img_width input[type='range']"), document.querySelector("#img2img_height input[type='range']")];

    rangeInputs.forEach((input) => {
      if (input) {
        input.addEventListener("input", restoreImgRedMask);
      }
    });

    //Apply zoom and pan functionality to a target element

    // Add button to img2img to get width and height
    const clonedDiv = elements.img2imgDemRaw.children[0].cloneNode(true);
    clonedDiv.classList.add("get-img-dem");
    const getImgDataBtn = clonedDiv.querySelector("button");
    getImgDataBtn.innerHTML = "<i>📏</i>";
    getImgDataBtn.id = "img2img_res_get_btn";
    getImgDataBtn.title = "Get the width and height from the picture";
    elements.img2imgDemRaw.appendChild(clonedDiv);

    // Zoom And Pan
    function applyZoomAndPan(targetElement, elemId) {
      let [zoomLevel, panX, panY] = [1, 0, 0];
      let fullScreenMode = false;

      getImgDataBtn.addEventListener("click", () => {
        const tabID = getTabId();
        const canvas = document.querySelector(`${tabID} canvas`);
        const img = document.querySelector("#img2img_image img");
        const imgUpload = document.querySelector("#img_inpaint_base img");

        let rightWidth, rightHeight;

        if (img) {
          rightWidth = img.naturalWidth;
          rightHeight = img.naturalHeight;
        } else if (canvas && tabID) {
          rightWidth = canvas.width;
          rightHeight = canvas.height;
        } else if (getActiveTab().innerText === "Inpaint upload") {
          rightWidth = imgUpload.naturalWidth;
          rightHeight = imgUpload.naturalHeight;
        }

        if (rightWidth && rightHeight) {
          const [rangeWidth, rangeHeight] = document.querySelectorAll("#img2img_width input[type='range'], #img2img_height input[type='range']");
          const [inputWidth, inputHeight] = document.querySelectorAll("#img2img_width input[type='number'], #img2img_height input[type='number']");

          rangeWidth.value = inputWidth.value = rightWidth;
          rangeHeight.value = inputHeight.value = rightHeight;

          const changeEvent = new Event("change");
          const inputEvent = new Event("input");

          for (const el of [rangeWidth, rangeHeight, inputWidth, inputHeight]) {
            el.dispatchEvent(changeEvent);
            el.dispatchEvent(inputEvent);
          }
        }
      });

      function getTabElFromText(tabName) {
        const tabMap = {
          inpaint: elementIDs.inpaint,
          sketch: elementIDs.sketch,
          "inpaint sketch": elementIDs.inpaintSketch,
        };
        return tabMap[tabName.trim().toLowerCase()];
      }

      function getSendButtons(elemId) {
        const tabString = {
          [elementIDs.inpaint]: "inpaint",
          [elementIDs.sketch]: "sketch",
          [elementIDs.inpaintSketch]: "inpaint_sketch",
        }[elemId];

        const queryString = `#img2img_copy_to_${tabString}`;
        return document.querySelectorAll(queryString + " button");
      }

      const sendButtons = getSendButtons(elemId);

      sendButtons.forEach((button) => {
        if (button.innerText === "img2img") return;

        button.addEventListener("click", (e) => {
          const sendToTabName = getTabElFromText(button.innerText);

          if (sendToTabName) {
            const closeBtn =
              document.querySelector(`${sendToTabName} button[aria-label='Remove Image']`) ||
              document.querySelector(`${sendToTabName} button[aria-label='Clear']`);
            if (closeBtn) closeBtn.click();
          }
        });
      });

      // Manipulation with canvas , opacity mode
      function setBrushOpacity(opacity) {
        const canvas = document.querySelector(`${elementIDs.inpaint} canvas[key="interface"]`);
        canvas.getContext("2d").globalAlpha = opacity;
      }

      function setCanvasOpacity(opacity) {
        const canvas = document.querySelector(`${elementIDs.inpaint} canvas[key="temp"]`);
        const ctx = canvas.getContext("2d");
        const redrawBtn = document.querySelector(`${elementIDs.inpaint} button[aria-label="Redraw"]`);

        const transparentMask = localStorage.getItem("transparentMask") === "true";
        ctx.globalCompositeOperation = transparentMask ? "source-over" : "xor";
        ctx.globalAlpha = transparentMask ? 1 : opacity;
        localStorage.setItem("transparentMask", !transparentMask);

        setTimeout(() => {
          redrawBtn.click();
        }, 0);
      }

      function positionColorInputUnderMouse(colorInput) {
        colorInput.style.position = "absolute";
        colorInput.style.visibility = "hidden";

        const canvas = document.querySelector(`${elemId} canvas[key="interface"]`);
        const isMouseOverCanvas = localStorage.getItem("overCanvas") === "true";
        const marginLeft = parseInt(window.getComputedStyle(canvas).getPropertyValue("margin-left")) || 0;

        colorInput.style.left = mouseX - targetElement.clientWidth + marginLeft * (isMouseOverCanvas ? 1 : 0) + "px";
        colorInput.style.top = mouseY - 40 - colorInput.offsetHeight + "px";
      }

      function toggleBrushPanel(openUnderMouse = false, openColorMenu = true) {
        const colorID = getTabId();
        const colorBtn = document.querySelector(`${colorID} button[aria-label="Select brush color"]`);

        if (!document.querySelector(`${colorID} input[aria-label="Brush color"]`)) {
          colorBtn && colorBtn.click();
        }

        setTimeout(() => {
          const colorInput = document.querySelector(`${colorID} input[aria-label="Brush color"]`);
          if (openUnderMouse) {
            positionColorInputUnderMouse(colorInput);
          }
          if (openColorMenu) colorInput && colorInput.click();
        }, 0);
      }

      //Fix white canvas when change width
      function setImgDisplayToNone() {
        const img = targetElement.querySelector(`${elemId} img`);
        if (img) img.style.display = "none";
      }

      //Restore undo func
      function restoreUndo() {
        const img = targetElement.querySelector(`${elemId} img`);
        const imgDataSource = img.getAttribute("data-source");
        const isUpload = img.getAttribute("data-isupload");

        if (imgDataSource && img.src !== imgDataSource && isUpload === "false") {
          img.style.display = "none";
          img.src = imgDataSource;
        }
      }

      // Undo last action
      function undoLastAction(e) {
        const isUndoKey = e.code === hotkeysConfig.undo;
        const isCtrlPressed = e.ctrlKey;
        const isAuxButton = e.button >= 3;
        const activeTab = getTabId();

        // Set opacity to 1, to avoid bugs
        if (canvasOpacity < 1 && "Inpaint" === getActiveTab().innerText) {
          setCanvasOpacity(1, elemId);
          setBrushOpacity(1);
          canvasOpacity = 1;
          brushOpacity = 1;
        }

        if (((isUndoKey && isCtrlPressed) || isAuxButton) && activeTab) {
          e.preventDefault();
          const undoBtn = document.querySelector(`${elemId} button[aria-label="Undo"]`);
          if (undoBtn && activeTab === elemId) {
            restoreUndo();
            undoBtn.click();
          }
        }
      }

      // Fix canvas issues for non-Inpaint tabs
      function fixCanvas() {
        const activeTab = getActiveTab().textContent.trim();

        if (activeTab !== "img2img") {
          const img = targetElement.querySelector(`${elemId} img`);

          if (img && img.style.display !== "none") {
            img.style.display = "none";
            img.style.visibility = "hidden";
          }
        }
      }

      // Reset the zoom level and pan position of the target element to their initial values
      function resetZoom() {
        zoomLevel = 1;
        panX = 0;
        panY = 0;

        fixCanvas();
        targetElement.style.transform = `scale(${zoomLevel}) translate(${panX}px, ${panY}px)`;

        const canvas = document.querySelector(`${elemId} canvas[key="interface"]`);

        toggleOverlap("off");
        fullScreenMode = false;

        if (canvas && parseFloat(canvas.style.width) > 865 && parseFloat(targetElement.style.width) > 865) {
          fitToElement();
          return;
        }

        targetElement.style.width = "";
        if (canvas) {
          targetElement.style.height = canvas.style.height;
        }
      }

      // Toggle the zIndex of the target element between two values, allowing it to overlap or be overlapped by other elements
      function toggleOverlap(forced = "") {
        const zIndex1 = "0";
        const zIndex2 = "998";

        targetElement.style.zIndex = targetElement.style.zIndex !== zIndex2 ? zIndex2 : zIndex1;

        if (forced === "off") {
          targetElement.style.zIndex = zIndex1;
        } else if (forced === "on") {
          targetElement.style.zIndex = zIndex2;
        }
      }

      // Adjust the brush size based on the deltaY value from a mouse wheel event
      function adjustBrushSize(elemId, deltaY, withoutValue = false, percentage = 5) {
        const input =
          document.querySelector(`${elemId} input[aria-label='Brush radius']`) || document.querySelector(`${elemId} button[aria-label="Use brush"]`);

        if (input) {
          input.click();
          if (!withoutValue) {
            const maxValue = parseFloat(input.getAttribute("max")) || 100;
            const changeAmount = maxValue * (percentage / 100);
            const newValue = parseFloat(input.value) + (deltaY > 0 ? -changeAmount : changeAmount);
            input.value = Math.min(Math.max(newValue, 0), maxValue);
            input.dispatchEvent(new Event("change"));
          }
        }
      }

      fileInput = document.querySelector(`${elemId} input[type="file"][accept="image/*"].svelte-116rqfv`);
      fileInput.addEventListener("click", resetZoom);

      // Update the zoom level and pan position of the target element based on the values of the zoomLevel, panX and panY variables
      function updateZoom(newZoomLevel, mouseX, mouseY) {
        newZoomLevel = Math.max(0.5, Math.min(newZoomLevel, 15));
        panX += mouseX - (mouseX * newZoomLevel) / zoomLevel;
        panY += mouseY - (mouseY * newZoomLevel) / zoomLevel;

        targetElement.style.transformOrigin = "0 0";
        targetElement.style.transform = `translate(${panX}px, ${panY}px) scale(${newZoomLevel})`;

        setImgDisplayToNone();
        toggleOverlap("on");
        return newZoomLevel;
      }

      // Change the zoom level based on user interaction
      function changeZoomLevel(operation, e) {
        if (e.shiftKey) {
          e.preventDefault();

          let zoomPosX, zoomPosY;
          let delta = 0.2;
          if (zoomLevel > 7) {
            delta = 0.9;
          } else if (zoomLevel > 2) {
            delta = 0.6;
          }

          if (e.clientX && e.clientY) {
            zoomPosX = e.clientX;
            zoomPosY = e.clientY;
          } else {
            zoomPosX = 0;
            zoomPosY = 0;
          }

          fullScreenMode = false;
          zoomLevel = updateZoom(
            zoomLevel + (operation === "+" ? delta : -delta),
            zoomPosX - targetElement.getBoundingClientRect().left,
            zoomPosY - targetElement.getBoundingClientRect().top
          );
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

        const transformOrigin = window.getComputedStyle(targetElement).transformOrigin;
        const [originX, originY] = transformOrigin.split(" ");
        const originXValue = parseFloat(originX);
        const originYValue = parseFloat(originY);

        const offsetX = (screenWidth - elementWidth * scale) / 2 - originXValue * (1 - scale);
        const offsetY = (screenHeight - elementHeight * scale) / 2.5 - originYValue * (1 - scale);

        // Apply scale and offsets to the element
        targetElement.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;

        // Update global variables
        zoomLevel = scale;
        panX = offsetX;
        panY = offsetY;
        toggleOverlap("off");
      }

      function fitToScreen() {
        const canvas = document.querySelector(`${elemId} canvas[key="interface"]`);

        if (!canvas) return;

        if (canvas.offsetWidth > 862) {
          targetElement.style.width = canvas.offsetWidth + "px";
        }

        if (fullScreenMode) {
          resetZoom();
          fullScreenMode = false;
          return;
        }

        resetZoom();

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
        const offsetX = (screenWidth - elementWidth * scale) / 2 - elementX - originXValue * (1 - scale);
        const offsetY = (screenHeight - elementHeight * scale) / 2 - elementY - originYValue * (1 - scale);

        // Apply scale and offsets to the element
        targetElement.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;

        // Update global variables
        zoomLevel = scale;
        panX = offsetX;
        panY = offsetY;

        toggleOverlap("on");
        fullScreenMode = true;
      }

      function clearMask() {
        const closeBtn = document.querySelector("#img2maskimg button[aria-label='Clear']");

        if (closeBtn) {
          closeBtn.click();
        }
      }

      elements.sendToInpainBtn.addEventListener("click", clearMask);
      elements.sendToInpainBtnT2I.addEventListener("click", clearMask);

      // Blur prompt Textarea
      function blurTextArea() {
        elements.img2imgPrompt.blur();
        elements.img2imgNegPrompt.blur();
      }

      // Handle keydown events
      function handleKeyDown(event) {
        const hotkeyActions = {
          [hotkeysConfig.undo]: undoLastAction,
          [hotkeysConfig.resetZoom]: resetZoom,
          [hotkeysConfig.overlap]: toggleOverlap,
          [hotkeysConfig.fitToScreen]: fitToScreen,
          [hotkeysConfig.openBrushSetting]: () => toggleBrushPanel(),
          [hotkeysConfig.openBrushPanelUnderMouse]: () => toggleBrushPanel(true),
          [hotkeysConfig.toggleCanvasOpacity]: toggleCanvasOpacity,
          [hotkeysConfig.toggleBrushOpacity]: toggleBrushOpacity,
          [hotkeysConfig.togglePipette]: togglePipette,
        };

        blurTextArea();
        const action = hotkeyActions[event.code];
        if (action) {
          event.preventDefault();
          action(event);
        } else if (["Equal", "NumpadAdd", "Minus", "NumpadSubtract"].includes(event.code)) {
          event.preventDefault();
          changeZoomLevel(event.code === "Minus" || event.code === "NumpadSubtract" ? "-" : "+", event);
        }
      }

      // Get Mouse position
      function getMousePosition(e) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
      }

      targetElement.addEventListener("auxclick", undoLastAction);
      targetElement.addEventListener("mousemove", getMousePosition);

      // Handle events only inside the targetElement
      let isKeyDownHandlerAttached = false;

      function handleMouseMove() {
        if (!isKeyDownHandlerAttached) {
          document.addEventListener("keydown", handleKeyDown);
          isKeyDownHandlerAttached = true;
        }
      }

      function handleMouseLeave() {
        if (isKeyDownHandlerAttached) {
          document.removeEventListener("keydown", handleKeyDown);
          isKeyDownHandlerAttached = false;
        }
      }

      // Add mouse event handlers
      targetElement.addEventListener("mousemove", handleMouseMove);
      targetElement.addEventListener("mouseleave", handleMouseLeave);

      // Reset zoom when click on another tab
      elements.img2imgTabs.addEventListener("click", resetZoom);

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

      // Combined togglePipette, toggleCanvasOpacity, and toggleBrushOpacity functions into hotkeyActions object
      function togglePipette() {
        const colorPickerEnabled = localStorage.getItem("colorPickerEnable") === "true";
        localStorage.setItem("colorPickerEnable", !colorPickerEnabled);
        if (colorPickerEnabled) toggleBrushPanel(false, false);
      }

      function toggleCanvasOpacity() {
        if (getActiveTab().innerText === "Inpaint") {
          canvasOpacity = canvasOpacity === 1 ? hotkeysConfig.canvasOpacity : 1;
          setCanvasOpacity(canvasOpacity, elementIDs.inpaint);
          setBrushOpacity(canvasOpacity === 1 ? 1 : hotkeysConfig.brushOpacity);
        }
      }

      function toggleBrushOpacity() {
        if (getActiveTab().innerText === "Inpaint") {
          brushOpacity = brushOpacity === 1 ? hotkeysConfig.brushOpacity : 1;
          setBrushOpacity(brushOpacity);
        }
      }

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

      function updatePanPosition(movementX, movementY) {
        let panSpeed = 1.5;

        if (zoomLevel > 8) {
          panSpeed = 2.5;
        }

        panX = panX + movementX * panSpeed;
        panY = panY + movementY * panSpeed;

        targetElement.style.transform = `translate(${panX}px, ${panY}px) scale(${zoomLevel})`;
        toggleOverlap("on");
      }

      function handleMoveByKey(e) {
        if (isMoving) {
          updatePanPosition(e.movementX, e.movementY);
          targetElement.style.pointerEvents = "none";
        } else {
          targetElement.style.pointerEvents = "auto";
        }
      }

      function handleMoveByMouse(e) {
        if (e.shiftKey) {
          e.preventDefault();
          updatePanPosition(e.movementX, e.movementY);
          targetElement.style.pointerEvents = "none";
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

      targetElement.addEventListener("mousedown", targetElementHandler);
      document.addEventListener("mousemove", handleMoveByKey);
    }
    applyZoomAndPan(elements.sketch, elementIDs.sketch);
    applyZoomAndPan(elements.inpaint, elementIDs.inpaint);
    applyZoomAndPan(elements.inpaintSketch, elementIDs.inpaintSketch);

    // Integration ControlNet
    const integrateControlNet = localStorage.getItem("integrationCanvasZoomInControlNet");
    if (integrateControlNet === "true") {
      const t2icontolNetMainID = "#txt2img_controlnet";
      const t2icontolNetMainEl = document.querySelector(t2icontolNetMainID);
      const i2icontolNetMainID = "#img2img_controlnet";
      const i2icontolNetMainEl = document.querySelector(i2icontolNetMainID);

      t2icontolNetMainEl.addEventListener(
        "click",
        async () => {
          const maxElements = 10;
          for (let i = 0; i < maxElements; i++) {
            const t2iControlNetElID = `#txt2img_controlnet_ControlNet-${i}_input_image`;
            const t2iControlNetEl = await waitForElement(t2iControlNetElID);
            if (t2iControlNetEl) {
              applyZoomAndPan(t2iControlNetEl, t2iControlNetElID);
            } else {
              break;
            }
          }
        },
        { once: true }
      );

      i2icontolNetMainEl.addEventListener(
        "click",
        async () => {
          const maxElements = 10;
          for (let i = 0; i < maxElements; i++) {
            const i2iControlNetElID = `#img2img_controlnet_ControlNet-${i}_input_image`;
            const i2iControlNetEl = await waitForElement(i2iControlNetElID);
            if (i2iControlNetEl) {
              applyZoomAndPan(i2iControlNetEl, i2iControlNetElID);
            } else {
              break;
            }
          }
        },
        { once: true }
      );
    }
  }

  init();
});

// help func
// The function that returns the promis, which is resolved after the element appears on the page
function waitForElement(id) {
  return new Promise((resolve) => {
    const checkForElement = () => {
      const element = document.querySelector(id);
      if (element) {
        resolve(element);
      } else {
        setTimeout(checkForElement, 100); // Checking every 100 ms
      }
    };
    checkForElement();
  });
}

// Main
onUiLoaded(() => {
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
      saveConfigToLocalStorage({
        ...getConfigFromLocalStorage(),
        [key]: value,
      });

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
    localStorage.setItem("brushOutline", hotkeysConfig.brushOutline);

    // Save the default configuration to localStorage if it's not already saved
    const sketchID = "#img2img_sketch";
    const inpaintID = "#img2maskimg";
    const inpaintSketchID = "#inpaint_sketch";
    const img2imgTabsID = "#mode_img2img .tab-nav";
    const rangeGroupID = "#img2img_column_size";
    const img2imgPromptID = "#img2img_prompt textarea";
    const img2imgNegPromptID = "#img2img_neg_prompt textarea";
    const img2imgDemRawID = "#img2img_dimensions_row";
    const sendToInpainBtnID = "#image_buttons_img2img #inpaint_tab";

    // Wait for the elements to be loaded
    const [
      sketchEl,
      inpaintEl,
      inpaintSketchEl,
      img2imgTabs,
      rangeGroup,
      img2imgPrompt,
      img2imgNegPrompt,
      img2imgDemRaw,
      sendToInpainBtn,
    ] = await Promise.all([
      document.querySelector(sketchID),
      document.querySelector(inpaintID),
      document.querySelector(inpaintSketchID),
      document.querySelector(img2imgTabsID),
      document.querySelector(rangeGroupID),
      document.querySelector(img2imgPromptID),
      document.querySelector(img2imgNegPromptID),
      document.querySelector(img2imgDemRawID),
      document.querySelector(sendToInpainBtnID),
    ]);

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
        hotkeysConfig.togglePipette,
      ];

      let hotkey = "";
      let hotkeyCode = "";

      while (!validKeys.test(hotkey)) {
        hotkey = window.prompt("Please enter a valid hotkey:");

        if (!hotkey || hotkey.trim() === "") {
          window.alert(
            "Invalid hotkey. Please enter 1 alphabetical character."
          );
          return null; // User canceled the prompt
        }

        hotkey = hotkey.trim();

        if (!validKeys.test(hotkey)) {
          window.alert(
            "Invalid hotkey. Please enter 1 alphabetical character."
          );
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
        alert(
          "Invalid opacity level. Please enter a number between 10 and 70."
        );
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
      localStorage.setItem("brushOutline", true);

      if (!brushOutline) {
        localStorage.setItem("brushOutline", false);
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
      togglePipette: () => updateHotkeyAndSave("togglePipette", askForHotkey()),
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
          items: [items[9]],
        },
        {
          title: "Control",
          items: items.slice(0, 4),
        },
        {
          title: "Color panel",
          items: items.slice(5, 9),
        },
        {
          title: "Mask transparency",
          items: items.slice(10),
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
      if (!e.target.closest(".context-menu"))
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
    if (rangeGroup) {
      rangeGroup.querySelectorAll("input").forEach((input) => {
        input.addEventListener("input", restoreImgRedMask);
      });
    } else {
      // For vlad webui
      const img2ImgWidth = document.querySelector(
        "#img2img_width input[type='range']"
      );
      const img2ImgHeight = document.querySelector(
        "#img2img_height input[type='range']"
      );

      if (img2ImgWidth && img2ImgHeight) {
        img2ImgWidth.addEventListener("input", restoreImgRedMask);
        img2ImgHeight.addEventListener("input", restoreImgRedMask);
      }
    }

    /**
     * Apply zoom and pan functionality to a target element.
     * @param {HTMLElement} targetElement - The element to apply zoom and pan functionality to.
     * @param {string} elemId - The ID of the element to target.
     */

    // Add button to img2img to get width and height
    const clonedDiv = img2imgDemRaw.children[0].cloneNode(true);
    clonedDiv.classList.add("get-img-dem");
    const getImgDataBtn = clonedDiv.querySelector("button");
    getImgDataBtn.innerHTML = "<i>📏</i>";
    getImgDataBtn.id = "img2img_res_get_btn";
    getImgDataBtn.title = "Get the width and height from the picture";
    img2imgDemRaw.appendChild(clonedDiv);

    // Zoom And Pan

    function applyZoomAndPan(targetElement, elemId) {
      let [zoomLevel, panX, panY] = [1, 0, 0];
      let fullScreenMode = false;

      // Enable img2img img data
      getImgDataBtn.addEventListener("click", (e) => {
        const tabID = getTabId();
        const canvas = document.querySelector(`${tabID} canvas`);
        const img = document.querySelector("#img2img_image img");
        const imgUpload = document.querySelector("#img_inpaint_base img");

        let rightWidth, rightHeight;

        if (img) {
          rightWidth = img.naturalWidth;
          rightHeight = img.naturalHeight;
        }

        if (canvas && tabID) {
          rightWidth = canvas.width;
          rightHeight = canvas.height;
        }

        if (getActiveTab().innerText === "Inpaint upload") {
          rightWidth = imgUpload.naturalWidth;
          rightHeight = imgUpload.naturalHeight;
        }

        if (canvas || img || imgUpload) {
          const rangeWidth = document.querySelector(
            "#img2img_width input[type='range']"
          );
          const rangeHeight = document.querySelector(
            "#img2img_height input[type='range']"
          );

          const inputWidth = document.querySelector(
            "#img2img_width input[type='number']"
          );

          const inputHeight = document.querySelector(
            "#img2img_height input[type='number']"
          );

          rangeWidth.value = rightWidth;
          rangeHeight.value = rightHeight;

          inputWidth.value = rightWidth;
          inputHeight.value = rightHeight;

          // Создание и отправка события изменения (change) для элементов rangeWidth и rangeHeight
          const changeEvent = new Event("change");

          rangeWidth.dispatchEvent(changeEvent);
          rangeHeight.dispatchEvent(changeEvent);

          // Создание и отправка события ввода (input) для элементов inputWidth и inputHeight
          const inputEvent = new Event("input");

          inputWidth.dispatchEvent(inputEvent);
          inputHeight.dispatchEvent(inputEvent);
        }
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
        const canvas = document.querySelector(
          `${inpaintID} canvas[key="temp"]`
        );
        const ctx = canvas.getContext("2d");
        const redrawBtn = document.querySelector(
          `${inpaintID} button[aria-label="Redraw"]`
        );

        const transparentMask =
          localStorage.getItem("transparentMask") === "true";

        if (transparentMask) {
          ctx.globalCompositeOperation = "source-over";
          ctx.globalAlpha = 1;
          localStorage.setItem("transparentMask", false);
          setTimeout(() => {
            redrawBtn.click();
          }, 0);
        } else {
          ctx.globalAlpha = opacity;
          localStorage.setItem("transparentMask", true);
          ctx.globalCompositeOperation = "xor";
          setTimeout(() => {
            redrawBtn.click();
          }, 0);
        }

        // ctx.globalAlpha = opacity;
        // // if (opacity < 1) {
        // //   // Creates a stack of false lines, but otherwise it will cancel the last line. The user will have to additionally press cancel
        // //   simulateClickAndMouseUp(0, 0, canvasEmu);
        // // }
        // // simulateClickAndMouseUp(0, 0, canvasEmu);
        // ctx.globalAlpha = opacity;
        // setTimeout(() => {
        //   redrawBtn.click();
        // }, 0);
      }

      // Position the color input element under the mouse cursor.
      function positionColorInputUnderMouse(colorInput) {
        colorInput.style.position = "absolute";
        colorInput.style.visibility = "hidden";

        const canvas = document.querySelector(
          `${elemId} canvas[key="interface"]`
        );

        const isMouseOverCanvas = localStorage.getItem("overCanvas") === "true";

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

      function changeLineColors() {
        const colorBtn = document.querySelector(
          `${colorID} button[aria-label="Select brush color"]`
        );
        const colorInput = document.querySelector(
          `${colorID} input[aria-label="Brush color"]`
        );
        if (!colorInput) {
          colorBtn && colorBtn.click();
        }

        if (colorInput.classList.contains("Marked")) {
          return;
        }

        // Open color menu
        setTimeout(() => {
          const colorInput = document.querySelector(
            `${colorID} input[aria-label="Brush color"]`
          );

          colorInput.classList.add("Marked");
        }, 0);
      }

      // Toggle the brush panel's visibility and optionally position it under the mouse cursor.
      function toggleBrushPanel(openUnderMouse = false, openColorMenu = true) {
        const colorID = getTabId();

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

          if (openColorMenu) colorInput && colorInput.click();
        }, 0);
      }
      //Fix white canvas when change width
      function setImgDisplayToNone() {
        const img = targetElement.querySelector(`${elemId} img`);

        if (img) {
          img.style.display = "none";
        }
      }

      //Restore undo func
      function restoreUndo() {
        const img = targetElement.querySelector(`${elemId} img`);

        const imgData = img.src;
        const imgDataSource = img.getAttribute("data-source");
        const isUpload = img.getAttribute("data-isupload");

        if (
          imgDataSource &&
          imgData !== imgDataSource &&
          isUpload === "false"
        ) {
          img.style.display = "none";
          img.src = imgDataSource;
        }
      }

      // undo last action
      function undoLastAction(e) {
        // document.addEventListener("keydown", (e) => {
        const isUndoKey = e.code === hotkeysConfig.undo;
        const isCtrlPressed = e.ctrlKey;
        const isAuxButton = e.button >= 3;

        const activeTab = getTabId();

        if (canvasOpacity < 1 && "Inpaint" === getActiveTab().innerText) {
          setCanvasOpacity(1, elemId);
          setBrushOpacity(1);
          canvasOpacity = 1;
          brushOpacity = 1;
        }

        if (((isUndoKey && isCtrlPressed) || isAuxButton) && activeTab) {
          e.preventDefault();
          const undoBtn = document.querySelector(
            `${elemId} button[aria-label="Undo"]`
          );
          if (undoBtn && activeTab === elemId) {
            restoreUndo();
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

        fixCanvas();
        targetElement.style.transform = `scale(${zoomLevel}) translate(${panX}px, ${panY}px)`;

        // If the canvas is wider than 860px, fit it to the element
        const canvas = document.querySelector(
          `${elemId} canvas[key="interface"]`
        );

        toggleOverlap("off");
        fullScreenMode = false;

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

      // Adjust the brush size based on the deltaY value from a mouse wheel event.
      function adjustBrushSize(
        elemId,
        deltaY,
        withoutValue = false,
        percentage = 4
      ) {
        // Get brush input element
        const input =
          document.querySelector(
            `${elemId} input[aria-label='Brush radius']`
          ) ||
          document.querySelector(`${elemId} button[aria-label="Use brush"]`);

        if (input) {
          input.click();
          if (!withoutValue) {
            const maxValue = parseFloat(input.getAttribute("max")) || 100;
            const changeAmount = maxValue * (percentage / 100);
            const newValue =
              parseFloat(input.value) +
              (deltaY > 0 ? -changeAmount : changeAmount);

            // Make sure the new value is within the allowed range (0, maxValue)
            input.value = Math.min(Math.max(newValue, 0), maxValue);

            input.dispatchEvent(new Event("change"));
          }
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
          disableCanvasTraces();
        }, 200);

        isMouseOverCanvas = true;
      });

      // Update the zoom level and pan position of the target element based on the values of the zoomLevel, panX and panY variables.
      function updateZoom(newZoomLevel, mouseX, mouseY) {
        // Clamp the zoom level between 0.5 and 15
        newZoomLevel = Math.max(0.5, Math.min(newZoomLevel, 15));

        // Calculate the new panX and panY based on the mouse position
        panX += mouseX - (mouseX * newZoomLevel) / zoomLevel;
        panY += mouseY - (mouseY * newZoomLevel) / zoomLevel;

        targetElement.style.transformOrigin = "0 0";
        targetElement.style.transform = `translate(${panX}px, ${panY}px) scale(${newZoomLevel})`;

        // Update the target element's transform property to apply the new zoom level
        setImgDisplayToNone();
        toggleOverlap("on");
        return newZoomLevel;
      }

      function changeZoomLevel(operation, e) {
        // Check if the shift key is pressed
        if (e.shiftKey) {
          e.preventDefault();

          // Calculate the delta based on the current zoom level
          let delta = 0.3;
          if (zoomLevel > 7) {
            delta = 1;
          } else if (zoomLevel > 3) {
            delta = 0.7;
          }

          // Update the zoom level based on the operation
          fullScreenMode = false;
          zoomLevel = updateZoom(
            zoomLevel + (operation === "+" ? delta : -delta),
            e.clientX - targetElement.getBoundingClientRect().left,
            e.clientY - targetElement.getBoundingClientRect().top
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

        const transformOrigin =
          window.getComputedStyle(targetElement).transformOrigin;
        const [originX, originY] = transformOrigin.split(" ");
        const originXValue = parseFloat(originX);
        const originYValue = parseFloat(originY);

        const offsetX =
          (screenWidth - elementWidth * scale) / 2 - originXValue * (1 - scale);
        const offsetY =
          (screenHeight - elementHeight * scale) / 2.5 -
          originYValue * (1 - scale);

        // Apply scale and offsets to the element
        targetElement.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;

        // Update global variables
        zoomLevel = scale;
        panX = offsetX;
        panY = offsetY;
        toggleOverlap("off");
      }

      sendToInpainBtn.addEventListener("click", (e) => {
        const closeBtn = document.querySelector(
          "#img2maskimg button[aria-label='Clear']"
        );

        if (closeBtn) {
          closeBtn.click();
        }
      });

      function fitToScreen() {
        const canvas = document.querySelector(
          `${elemId} canvas[key="interface"]`
        );

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
        panX = offsetX;
        panY = offsetY;

        toggleOverlap("on");
        fullScreenMode = true;
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
            undoLastAction(event);
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
          case hotkeysConfig.togglePipette:
            const colorPickerEnabled =
              localStorage.getItem("colorPickerEnable") === "true";
            if (colorPickerEnabled) {
              localStorage.setItem("colorPickerEnable", false);
            } else {
              localStorage.setItem("colorPickerEnable", true);
              toggleBrushPanel(false, false);
            }
            break;

          case hotkeysConfig.toggleCanvasOpacity:
            if ("Inpaint" === getActiveTab().innerText) {
              if (canvasOpacity === 1) {
                setCanvasOpacity(hotkeysConfig.canvasOpacity, inpaintID);
                setBrushOpacity(hotkeysConfig.brushOpacity);
                canvasOpacity = hotkeysConfig.canvasOpacity;
                brushOpacity = hotkeysConfig.brushOpacity;
              } else {
                canvasOpacity = 1;
                setCanvasOpacity(1, inpaintID);
                setBrushOpacity(1);
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

      targetElement.addEventListener("auxclick", undoLastAction);
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
});

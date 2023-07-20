onUiLoaded(async () => {
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
  const tabNameToElementId = {
    "Inpaint sketch": elementIDs.inpaintSketch,
    Inpaint: elementIDs.inpaint,
    Sketch: elementIDs.sketch,
  };

  // Helper functions

  function zoomFakeWheelEvent(targetElement, sign, oldEvent) {
    const rect = targetElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const event = new WheelEvent("wheel", {
      bubbles: true,
      cancelable: true,
      view: window,
      detail: sign === "-" ? 1 : -1,
      screenX: centerX,
      screenY: centerY,
      clientX: centerX,
      clientY: centerY,
      ctrlKey: oldEvent.ctrlKey,
      altKey: oldEvent.altKey,
      shiftKey: oldEvent.shiftKey,
      metaKey: oldEvent.ctrlKey,
      button: 0,
      buttons: 0,
      relatedTarget: null,
      deltaMode: sign === "-" ? 1 : -1,
      deltaX: 0,
      deltaY: sign === "-" ? 1 : -1,
      deltaZ: 0
    });

    targetElement.dispatchEvent(event);
  }

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

  // Get active tab
  function getActiveTab(elements, all = false) {
    const tabs = elements.img2imgTabs.querySelectorAll("button");

    if (all) return tabs;

    for (let tab of tabs) {
      if (tab.classList.contains("selected")) {
        return tab;
      }
    }
  }

  // Get tab ID
  function getTabId(elements) {
    const activeTab = getActiveTab(elements);
    return tabNameToElementId[activeTab.innerText];
  }

  // Wait until opts loaded
  async function waitForOpts() {
    for (; ;) {
      if (window.opts && Object.keys(window.opts).length) {
        return window.opts;
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  // Function for defining the "Ctrl", "Shift" and "Alt" keys
  function isModifierKey(event, key) {
    switch (key) {
      case "Ctrl":
        return event.ctrlKey;
      case "Shift":
        return event.shiftKey;
      case "Alt":
        return event.altKey;
      default:
        return false;
    }
  }


  // Check if hotkey is valid
  function isValidHotkey(value) {
    const specialKeys = ["Ctrl", "Alt", "Shift", "Disable"];
    return (
      (typeof value === "string" && value.length === 1 && /[a-z]/i.test(value)) ||
      specialKeys.includes(value)
    );
  }

  // Normalize hotkey
  function normalizeHotkey(hotkey) {
    return hotkey.length === 1 ? "Key" + hotkey.toUpperCase() : hotkey;
  }

  // Format hotkey for display
  function formatHotkeyForDisplay(hotkey) {
    return hotkey.startsWith("Key") ? hotkey.slice(3) : hotkey;
  }

  // Create hotkey configuration with the provided options
  function createHotkeyConfig(defaultHotkeysConfig, hotkeysConfigOpts) {
    const result = {}; // Resulting hotkey configuration
    const usedKeys = new Set(); // Set of used hotkeys

    // Iterate through defaultHotkeysConfig keys
    for (const key in defaultHotkeysConfig) {
      const userValue = hotkeysConfigOpts[key]; // User-provided hotkey value
      const defaultValue = defaultHotkeysConfig[key]; // Default hotkey value

      // Apply appropriate value for undefined, boolean, or object userValue
      if (
        userValue === undefined ||
        typeof userValue === "boolean" ||
        typeof userValue === "object" ||
        typeof userValue === "number" ||
        userValue.startsWith("#", 0) ||
        userValue === "disable"
      ) {
        result[key] = userValue === undefined ? defaultValue : userValue;
      } else if (isValidHotkey(userValue)) {
        const normalizedUserValue = normalizeHotkey(userValue);

        // Check for conflicting hotkeys
        if (!usedKeys.has(normalizedUserValue)) {
          usedKeys.add(normalizedUserValue);
          result[key] = normalizedUserValue;
        } else {
          console.error(
            `Hotkey: ${formatHotkeyForDisplay(
              userValue
            )} for ${key} is repeated and conflicts with another hotkey. The default hotkey is used: ${formatHotkeyForDisplay(
              defaultValue
            )}`
          );
          result[key] = defaultValue;
        }
      } else {
        console.error(
          `Hotkey: ${formatHotkeyForDisplay(
            userValue
          )} for ${key} is not valid. The default hotkey is used: ${formatHotkeyForDisplay(
            defaultValue
          )}`
        );
        result[key] = defaultValue;
      }
    }

    return result;
  }

  function disableFunctions(config, disabledFunctions) {
    disabledFunctions.forEach((funcName) => {
      if (functionMap.hasOwnProperty(funcName)) {
        const key = functionMap[funcName];
        config[key] = "disable";
      }
    });

    return config;
  }

  // Clear mask when send to inpaint
  function clearMask() {
    const closeBtn = document.querySelector(
      "#img2maskimg button[aria-label='Clear']"
    );

    if (closeBtn) {
      closeBtn.click();
    }
  }

  // Make right opacity
  function makeRightOpacity(opacity) {
    if (opacity === 1) {
      return 1;
    }
    return (100 - opacity) / 100;
  }

  // Manipulation with canvas , opacity mode
  function setBrushOpacity(opacity) {
    opacity = makeRightOpacity(opacity);
    const canvas = document.querySelector(
      `${elementIDs.inpaint} canvas[key="interface"]`
    );
    canvas.getContext("2d").globalAlpha = opacity;
  }

  function setCanvasOpacity(opacity) {
    const canvas = document.querySelector(
      `${elementIDs.inpaint} canvas[key="temp"]`
    );
    const ctx = canvas.getContext("2d");
    const redrawBtn = document.querySelector(
      `${elementIDs.inpaint} button[aria-label="Redraw"]`
    );
    opacity = makeRightOpacity(opacity);

    const transparentMask = localStorage.getItem("transparentMask") === "true";
    ctx.globalCompositeOperation = transparentMask ? "source-over" : "xor";
    ctx.globalAlpha = transparentMask ? 1 : opacity;
    localStorage.setItem("transparentMask", !transparentMask);

    setTimeout(() => {
      redrawBtn.click();
    }, 0);
  }

  /**
   * The restoreImgRedMask function displays a red mask around an image to indicate the aspect ratio.
   * If the image display property is set to 'none', the mask breaks. To fix this, the function
   * temporarily sets the display property to 'block' and then hides the mask again after 300 milliseconds
   * to avoid breaking the canvas. Additionally, the function adjusts the mask to work correctly on
   * very long images.
   */
  function restoreImgRedMask(elements) {
    const mainTabId = getTabId(elements);

    if (!mainTabId) return;

    const mainTab = gradioApp().querySelector(mainTabId);
    const img = mainTab.querySelector("img");
    const imageARPreview = gradioApp().querySelector("#imageARPreview");

    if (!img || !imageARPreview) return;

    imageARPreview.style.transform = "";
    if (parseFloat(mainTab.style.width) > 865) {
      const transformString = mainTab.style.transform;
      const scaleMatch = transformString.match(
        /scale\(([-+]?[0-9]*\.?[0-9]+)\)/
      );
      let zoom = 1; // default zoom

      if (scaleMatch && scaleMatch[1]) {
        zoom = Number(scaleMatch[1]);
      }

      imageARPreview.style.transformOrigin = "0 0";
      imageARPreview.style.transform = `scale(${zoom})`;
    }

    if (img.style.display !== "none") return;

    img.style.display = "block";

    setTimeout(() => {
      img.style.display = "none";
    }, 400);
  }

  const hotkeysConfigOpts = await waitForOpts();

  // Default config
  const defaultHotkeysConfig = {
    canvas_hotkey_zoom: "Alt",
    canvas_hotkey_adjust: "Ctrl",
    canvas_hotkey_reset: "KeyR",
    canvas_hotkey_fullscreen: "KeyS",
    canvas_hotkey_move: "KeyF",
    canvas_hotkey_overlap: "KeyO",
    canvas_zoom_hotkey_open_colorpanel: "KeyQ",
    canvas_zoom_hotkey_pin_colorpanel: "KeyT",
    canvas_zoom_hotkey_dropper: "KeyA",
    canvas_zoom_hotkey_fill: "KeyH",
    canvas_zoom_hotkey_transparency: "KeyC",
    canvas_zoom_hide_btn: true,
    canvas_show_tooltip: true,
    canvas_zoom_mask_clear: true,
    canvas_blur_prompt: false,
    canvas_zoom_draw_staight_lines: false,
    canvas_zoom_brush_outline: false,
    canvas_zoom_enable_integration: false,
    canvas_zoom_add_buttons: false,
    canvas_zoom_inpaint_brushcolor: "#000000",
    canvas_zoom_transparency_level: 60,
    canvas_zoom_disabled_functions: [],
  };

  const functionMap = {
    "Zoom": "canvas_hotkey_zoom",
    "Adjust brush size": "canvas_hotkey_adjust",
    "Moving canvas": "canvas_hotkey_move",
    "Fullscreen": "canvas_hotkey_fullscreen",
    "Reset Zoom": "canvas_hotkey_reset",
    "Overlap": "canvas_hotkey_overlap",
    "Open color panel": "canvas_zoom_hotkey_open_colorpanel",
    "Pin color panel": "canvas_zoom_hotkey_pin_colorpanel",
    "Dropper": "canvas_zoom_hotkey_dropper",
    "Fill": "canvas_zoom_hotkey_fill",
    "Transparency Mode": "canvas_zoom_hotkey_transparency",
  };

  // Loading the configuration from opts
  const preHotkeysConfig = createHotkeyConfig(
    defaultHotkeysConfig,
    hotkeysConfigOpts
  );

  // Disable functions that are not needed by the user
  const hotkeysConfig = disableFunctions(
    preHotkeysConfig,
    preHotkeysConfig.canvas_zoom_disabled_functions
  );

  // Init localStorageVariables
  localStorage.setItem("brushOutline", hotkeysConfig.canvas_zoom_brush_outline);
  localStorage.setItem(
    "brush_color",
    hotkeysConfig.canvas_zoom_inpaint_brushcolor
  );

  let isMoving = false;
  let mouseX, mouseY;
  let activeElement;

  // Variables for canvas and brush opacity
  let canvasOpacity = 1;
  let brushOpacity = 1;

  const elements = Object.fromEntries(
    Object.keys(elementIDs).map((id) => [
      id,
      gradioApp().querySelector(elementIDs[id]),
    ])
  );

  const elemData = {};

  // Apply functionality to the range inputs. Restore redmask and correct for long images.
  const rangeInputs = elements.rangeGroup
    ? Array.from(elements.rangeGroup.querySelectorAll("input"))
    : [
      gradioApp().querySelector("#img2img_width input[type='range']"),
      gradioApp().querySelector("#img2img_height input[type='range']"),
    ];

  for (const input of rangeInputs) {
    input?.addEventListener("input", () => restoreImgRedMask(elements));
  }

  // Get buttons for sending images to clear inpaint mask
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

  // Add button to img2img to get width and height
  const isGetSizeImgBtnExists = document.querySelector(
    "#img2img_detect_image_size_btn"
  );

  let clonedDiv, getImgDataBtn;

  if (!isGetSizeImgBtnExists) {
    clonedDiv = elements.img2imgDemRaw.children[0].cloneNode(true);
    clonedDiv.classList.add("get-img-dem");
    getImgDataBtn = clonedDiv.querySelector("button");

    getImgDataBtn.innerHTML = "<i>📏</i>";
    getImgDataBtn.id = "img2img_res_get_btn";
    getImgDataBtn.title = "Get the width and height from the picture";
    elements.img2imgDemRaw.appendChild(clonedDiv);
  }

  function applyZoomAndPan(elemId) {
    const targetElement = gradioApp().querySelector(elemId);

    if (!targetElement) {
      console.log("Element not found");
      return;
    }

    targetElement.style.transformOrigin = "0 0";
    elemData[elemId] = {
      zoom: 1,
      panX: 0,
      panY: 0,
    };

    const sendButtons = getSendButtons(elemId);
    let fullScreenMode = false;

    //Fix white canvas when change width
    function setImgDisplayToNone() {
      const img = targetElement.querySelector(`${elemId} img`);
      if (img) img.style.display = "none";
    }

    // Clear mask when send through buttons
    if (hotkeysConfig.canvas_zoom_mask_clear) {
      sendButtons.forEach((button) => {
        if (button.innerText === "img2img") return;

        button.addEventListener("click", (e) => {
          const sendToTabName = getTabElFromText(button.innerText);

          if (sendToTabName) {
            const closeBtn =
              document.querySelector(
                `${sendToTabName} button[aria-label='Remove Image']`
              ) ||
              document.querySelector(
                `${sendToTabName} button[aria-label='Clear']`
              );
            if (closeBtn) closeBtn.click();
          }
        });
      });

      elements.sendToInpainBtn.addEventListener("click", clearMask);
      elements.sendToInpainBtnT2I.addEventListener("click", clearMask);
    }

    // Create give size button
    if (!isGetSizeImgBtnExists) {
      getImgDataBtn.addEventListener("click", () => {
        const tabID = getTabId(elements);
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
          const [rangeWidth, rangeHeight] = document.querySelectorAll(
            "#img2img_width input[type='range'], #img2img_height input[type='range']"
          );
          const [inputWidth, inputHeight] = document.querySelectorAll(
            "#img2img_width input[type='number'], #img2img_height input[type='number']"
          );

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
    }

    // Create tooltip
    function createTooltip() {
      let toolTipElemnt
      if (targetElement.querySelector(".image-container")) {
        toolTipElemnt = targetElement.querySelector(".image-container");
      } else {
        toolTipElemnt = targetElement.querySelector("div[data-testid='image']");
      }

      // const toolTipElemnt = targetElement.querySelector(".image-container");
      const tooltip = document.createElement("div");
      tooltip.className = "canvas-tooltip--extension";

      // Creating an item of information
      const info = document.createElement("i");
      info.className = "canvas-tooltip-info--extension";
      info.textContent = "";

      // Create a container for the contents of the tooltip
      const tooltipContent = document.createElement("div");
      tooltipContent.className = "canvas-tooltip-content--extension";

      // Define an array with hotkey information and their actions
      const hotkeysInfo = [
        { configKey: "canvas_hotkey_zoom", action: "Zoom canvas", keySuffix: " + wheel" },
        { configKey: "canvas_hotkey_adjust", action: "Adjust brush size", keySuffix: " + wheel" },
        { configKey: "canvas_hotkey_reset", action: "Reset zoom" },
        { configKey: "canvas_hotkey_fullscreen", action: "Fullscreen mode" },
        { configKey: "canvas_hotkey_move", action: "Move canvas" },
        { configKey: "canvas_hotkey_overlap", action: "Overlap" },
        { configKey: "canvas_zoom_hotkey_open_colorpanel", action: "Open color panel" },
        { configKey: "canvas_zoom_hotkey_pin_colorpanel", action: "Pin color panel" },
        { configKey: "canvas_zoom_hotkey_dropper", action: "Toggle dropper" },
        { configKey: "canvas_zoom_hotkey_fill", action: "Fill canvas" },
        { configKey: "canvas_zoom_hotkey_transparency", action: "Transparency mode" },
      ];

      // Create hotkeys array with disabled property based on the config values
      const hotkeys = hotkeysInfo.map((info) => {
        const configValue = hotkeysConfig[info.configKey];
        const key = info.keySuffix
          ? `${configValue}${info.keySuffix}`
          : configValue.charAt(configValue.length - 1);
        return {
          key,
          action: info.action,
          disabled: configValue === "disable",
        };
      });

      for (const hotkey of hotkeys) {
        if (hotkey.disabled) {
          continue;
        }

        const p = document.createElement("p");
        p.innerHTML = `<b>${hotkey.key}</b> - ${hotkey.action}`;
        tooltipContent.appendChild(p);
      }

      // Add information and content elements to the tooltip element
      tooltip.appendChild(info);
      tooltip.appendChild(tooltipContent);

      // Add a hint element to the target element
      toolTipElemnt.appendChild(tooltip);
    }

    // Create button for devices without keyboard
    function createFuncButtons() {
      let buttonContainer;
      if (targetElement.querySelector(".image-container")) {
        buttonContainer = targetElement.querySelector(".image-container");
      } else {
        buttonContainer = targetElement.querySelector("div[data-testid='image']");
      }

      const button = document.createElement("button");
      button.className = "fullscreen-btn-main";
      button.innerHTML = `<p class="fullscreen-btn">F</p>`;

      const dropperBtn = document.createElement("button");
      dropperBtn.className = "dropper-btn-main";
      dropperBtn.innerHTML = `<p class="dropper-btn">P</p>`;

      // Add an event listener to the button
      button.addEventListener("click", function () {
        // Call the fitToScreen function here
        fitToScreen(true);
      });

      // Add an event listener to the button
      dropperBtn.addEventListener("click", function () {
        // Call the fitToScreen function here
        toggleDropper();
      });

      // Add the button to the target element
      buttonContainer.appendChild(button);
      buttonContainer.appendChild(dropperBtn);
    }

    //Show tool tip if setting enable
    if (hotkeysConfig.canvas_show_tooltip) {
      createTooltip();
    }

    if (hotkeysConfig.canvas_zoom_add_buttons) {
      createFuncButtons();
    }

    // In the course of research, it was found that the tag img is very harmful when zooming and creates white canvases. This hack allows you to almost never think about this problem, it has no effect on webui.
    function fixCanvas() {
      const activeTab = getActiveTab(elements).textContent.trim();

      if (activeTab !== "img2img") {
        const img = targetElement.querySelector(`${elemId} img`);

        if (img && img.style.display !== "none") {
          img.style.display = "none";
          img.style.visibility = "hidden";
        }
      }
    }

    // Reset the zoom level and pan position of the target element to their initial values
    function resetZoom(_ = "", isMobile = false) {
      elemData[elemId] = {
        zoomLevel: 1,
        panX: 0,
        panY: 0,
      };

      fixCanvas();
      targetElement.style.transform = `scale(${elemData[elemId].zoomLevel}) translate(${elemData[elemId].panX}px, ${elemData[elemId].panY}px)`;

      const canvas = gradioApp().querySelector(
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

      if (isMobile) {
        fitToElement();
        return
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

      targetElement.style.zIndex =
        targetElement.style.zIndex !== zIndex2 ? zIndex2 : zIndex1;

      if (forced === "off") {
        targetElement.style.zIndex = zIndex1;
      } else if (forced === "on") {
        targetElement.style.zIndex = zIndex2;
      }
    }

    // Adjust the brush size based on the deltaY value from a mouse wheel event
    function adjustBrushSize(
      elemId,
      deltaY,
      withoutValue = false,
      percentage = 5
    ) {
      const input =
        gradioApp().querySelector(
          `${elemId} input[aria-label='Brush radius']`
        ) ||
        gradioApp().querySelector(`${elemId} button[aria-label="Use brush"]`);

      if (input) {
        input.click();
        if (!withoutValue) {
          const maxValue = parseFloat(input.getAttribute("max")) || 100;
          const changeAmount = maxValue * (percentage / 100);
          const newValue =
            parseFloat(input.value) +
            (deltaY > 0 ? -changeAmount : changeAmount);
          input.value = Math.min(Math.max(newValue, 0), maxValue);
          input.dispatchEvent(new Event("change"));
        }
      }
    }

    // Reset zoom when uploading a new image
    const fileInput = gradioApp().querySelector(
      `${elemId} input[type="file"][accept="image/*"].svelte-116rqfv`
    );
    fileInput.addEventListener("click", resetZoom);


    // Update the zoom level and pan position of the target element based on the values of the zoomLevel, panX and panY variables
    function updateZoom(newZoomLevel, mouseX, mouseY) {
      newZoomLevel = Math.max(0.5, Math.min(newZoomLevel, 15));

      elemData[elemId].panX +=
        mouseX - (mouseX * newZoomLevel) / elemData[elemId].zoomLevel;
      elemData[elemId].panY +=
        mouseY - (mouseY * newZoomLevel) / elemData[elemId].zoomLevel;

      targetElement.style.transformOrigin = "0 0";
      targetElement.style.transform = `translate(${elemData[elemId].panX}px, ${elemData[elemId].panY}px) scale(${newZoomLevel})`;

      toggleOverlap("on");
      setImgDisplayToNone();
      return newZoomLevel;
    }

    // Change the zoom level based on user interaction
    function changeZoomLevel(operation, e) {

      if (isModifierKey(e, hotkeysConfig.canvas_hotkey_zoom)) {
        e.preventDefault();

        let zoomPosX, zoomPosY;
        let delta = 0.2;

        if (elemData[elemId].zoomLevel > 7) {
          delta = 0.9;
        } else if (elemData[elemId].zoomLevel > 2) {
          delta = 0.6;
        }

        zoomPosX = e.clientX;
        zoomPosY = e.clientY;

        fullScreenMode = false;
        elemData[elemId].zoomLevel = updateZoom(
          elemData[elemId].zoomLevel +
          (operation === "+" ? delta : -delta),
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
      elemData[elemId].zoomLevel = scale;
      elemData[elemId].panX = offsetX;
      elemData[elemId].panY = offsetY;

      fullScreenMode = false;
      toggleOverlap("off");
    }

    /**
     * This function fits the target element to the screen by calculating
     * the required scale and offsets. It also updates the global variables
     * zoomLevel, panX, and panY to reflect the new state.
     */

    // Fullscreen mode
    function fitToScreen(isMobile = false) {
      const canvas = gradioApp().querySelector(
        `${elemId} canvas[key="interface"]`
      );

      if (!canvas) return;

      if (canvas.offsetWidth > 862 || isMobile) {
        targetElement.style.width = canvas.offsetWidth + "px";
      }

      if (fullScreenMode) {

        if (isMobile) {
          resetZoom("", true);
        } else {
          resetZoom();
        }

        fullScreenMode = false;
        return;
      }

      //Reset Zoom
      targetElement.style.transform = `translate(${0}px, ${0}px) scale(${1})`;

      // Get scrollbar width to right-align the image
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      // Get element and screen dimensions
      const elementWidth = targetElement.offsetWidth;
      const elementHeight = targetElement.offsetHeight;
      const screenWidth = window.innerWidth - scrollbarWidth;
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
      elemData[elemId].zoomLevel = scale;
      elemData[elemId].panX = offsetX;
      elemData[elemId].panY = offsetY;

      fullScreenMode = true;
      toggleOverlap("on");
    }

    function toggleOpacityMode() {
      if (getActiveTab(elements).innerText === "Inpaint") {
        canvasOpacity =
          canvasOpacity === 1
            ? hotkeysConfig.canvas_zoom_transparency_level
            : 1;
        setCanvasOpacity(canvasOpacity);
        setBrushOpacity(
          canvasOpacity === 1 ? 1 : hotkeysConfig.canvas_zoom_transparency_level
        );
      }
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
      const isCtrlPressed = e.ctrlKey || e.metaKey;
      const isAuxButton = e.button >= 3;
      const activeTab = getTabId(elements);

      // Set opacity to 1, to avoid bugs
      if (canvasOpacity > 1 && "Inpaint" === getActiveTab(elements).innerText) {
        setCanvasOpacity(1);
        setBrushOpacity(1);
        canvasOpacity = 1;
        brushOpacity = 1;
      }

      if (isCtrlPressed || isAuxButton) {
        e.preventDefault();
        const undoBtn = document.querySelector(
          `${elemId} button[aria-label="Undo"]`
        );
        if (undoBtn && activeTab === elemId) {
          restoreUndo();
          undoBtn.click();
        }
      }
    }

    // Toggle dropper
    function toggleDropper() {
      const colorPickerEnabled =
        localStorage.getItem("colorPickerEnable") === "true";
      localStorage.setItem("colorPickerEnable", !colorPickerEnabled);
    }


    //Hide canvas btns
    function hideCanvasButtons(hide = false) {
      const funcBtns = document.querySelector(`${activeElement} button[aria-label='Undo']`).parentElement
      const artistsBtns = document.querySelector(`${activeElement} .brush`).parentElement
      const tooltip = document.querySelector(`${activeElement} .canvas-tooltip-info--extension`)

      // const undoBtn = document.querySelector(`${activeElement} button[aria-label='Undo']`)
      // const clearBtn = document.querySelector(`${activeElement} button[aria-label='Clear']`)

      if (hide) {
        artistsBtns.classList.add("canvas-buttons-hidden")
        funcBtns.classList.add("canvas-buttons-hidden")
        tooltip.classList.add("canvas-buttons-hidden")

        artistsBtns.classList.remove("canvas-buttons-visible")
        funcBtns.classList.remove("canvas-buttons-visible")
        tooltip.classList.remove("canvas-buttons-visible")
      } else {
        artistsBtns.classList.remove("canvas-buttons-hidden")
        funcBtns.classList.remove("canvas-buttons-hidden")
        tooltip.classList.remove("canvas-buttons-hidden")

        artistsBtns.classList.add("canvas-buttons-visible")
        funcBtns.classList.add("canvas-buttons-visible")
        tooltip.classList.add("canvas-buttons-visible")
      }

    }

    function pinColorPanelToMouse(colorInput) {
      return new Promise((resolve) => {
        colorInput.style.position = "absolute";
        colorInput.style.visibility = "hidden";

        const canvas = document.querySelector(
          `${elemId} canvas[key="interface"]`
        );
        const isMouseOverCanvas = localStorage.getItem("overCanvas") === "true";
        const marginLeft =
          parseInt(
            window.getComputedStyle(canvas).getPropertyValue("margin-left")
          ) || 0;

        colorInput.style.left =
          mouseX -
          targetElement.clientWidth +
          marginLeft * (isMouseOverCanvas ? 1 : 0) +
          "px";
        colorInput.style.top = mouseY - 40 - colorInput.offsetHeight + "px";

        // Wait for the next frame to ensure the element has been moved
        requestAnimationFrame(() => {
          resolve();
        });
      });
    }

    async function openBrushPanel(
      openUnderMouse = false,
      openColorMenu = true
    ) {
      const colorID = elemId;
      const colorBtn = document.querySelector(
        `${colorID} button[aria-label="Select brush color"]`
      );

      if (
        !document.querySelector(`${colorID} input[aria-label="Brush color"]`)
      ) {
        colorBtn && colorBtn.click();
      }

      setTimeout(async () => {
        const colorInput = document.querySelector(
          `${colorID} input[aria-label="Brush color"]`
        );
        if (openUnderMouse) {
          await pinColorPanelToMouse(colorInput);
        }
        if (openColorMenu) colorInput && colorInput.click();
      }, 0);
    }

    // Fill canvas with color
    function fillCanvasWithColor() {
      openBrushPanel(false, false);
      localStorage.setItem("fillCanvasBrushColor", "true");

      const canvas = document.querySelector(
        `${elemId} canvas[key="interface"]`
      );
      canvas.dispatchEvent(new MouseEvent('mousemove', { clientX: 1, clientY: 1 }));
    }


    // Handle keydown events
    function handleKeyDown(event) {

      // Disable key locks to make pasting from the buffer work correctly
      if ((event.ctrlKey && event.code === 'KeyV') || (event.ctrlKey && event.code === 'KeyC') || event.code === "F5") {
        console.log("work")
        return
      }

      // before activating shortcut, ensure user is not actively typing in an input field
      if (!hotkeysConfig.canvas_blur_prompt) {
        if (event.target.nodeName === 'TEXTAREA' || event.target.nodeName === 'INPUT') {
          return
        }
      }


      const hotkeyActions = {
        [hotkeysConfig.canvas_hotkey_reset]: resetZoom,
        [hotkeysConfig.canvas_hotkey_overlap]: toggleOverlap,
        [hotkeysConfig.canvas_hotkey_fullscreen]: fitToScreen,
        [hotkeysConfig.canvas_zoom_hotkey_open_colorpanel]: () =>
          openBrushPanel(false, true),
        [hotkeysConfig.canvas_zoom_hotkey_pin_colorpanel]: () =>
          openBrushPanel(true, true),
        [hotkeysConfig.canvas_zoom_hotkey_dropper]: toggleDropper,
        [hotkeysConfig.canvas_zoom_hotkey_fill]: fillCanvasWithColor,
        [hotkeysConfig.canvas_zoom_hotkey_transparency]: toggleOpacityMode,
        ["KeyZ"]: undoLastAction,
      };

      const action = hotkeyActions[event.code];
      if (action) {
        event.preventDefault();
        action(event);
      } else if (
        ["Equal", "NumpadAdd", "Minus", "NumpadSubtract"].includes(event.code)
      ) {
        event.preventDefault();

        const operationKey = event.code === "Minus" || event.code === "NumpadSubtract" ? "-" : "+"
        zoomFakeWheelEvent(targetElement, operationKey, event)
      }

      if (
        isModifierKey(event, hotkeysConfig.canvas_hotkey_zoom) ||
        isModifierKey(event, hotkeysConfig.canvas_hotkey_adjust)
      ) {
        event.preventDefault();
      }


      if (event.code === "ShiftLeft" && hotkeysConfig.canvas_zoom_draw_staight_lines) {
        window.drawStraightLine = true;
      }

    }

    // Get Mouse position
    function getMousePosition(e) {
      mouseX = e.offsetX;
      mouseY = e.offsetY;
    }

    targetElement.addEventListener("mousemove", getMousePosition);
    targetElement.addEventListener("auxclick", undoLastAction);

    // Handle events only inside the targetElement
    let isKeyDownHandlerAttached = false;
    let hideTimeout;
    let buttonsHidden = false;

    function handleMouseMove() {
      if (!isKeyDownHandlerAttached) {
        document.addEventListener("keydown", handleKeyDown);
        isKeyDownHandlerAttached = true;

        activeElement = elemId;
      }



      if (window.isDrawing && hotkeysConfig.canvas_zoom_hide_btn) {
        if (!buttonsHidden) {
          hideCanvasButtons(true);
          buttonsHidden = true;
        }
      } else {
        if (buttonsHidden) {
          hideCanvasButtons(false);
          buttonsHidden = false;
        }
      }
    }

    function handleMouseLeave() {
      if (isKeyDownHandlerAttached) {
        document.removeEventListener("keydown", handleKeyDown);
        isKeyDownHandlerAttached = false;

        activeElement = null;
      }
    }

    // Add mouse event handlers
    targetElement.addEventListener("mousemove", handleMouseMove);
    targetElement.addEventListener("mouseleave", handleMouseLeave);

    // Reset zoom when click on another tab
    elements.img2imgTabs.addEventListener("click", resetZoom);
    elements.img2imgTabs.addEventListener("click", () => {
      // targetElement.style.width = "";
      if (parseInt(targetElement.style.width) > 865) {
        setTimeout(fitToElement, 0);
      }
    });

    targetElement.addEventListener("wheel", (e) => {
      // change zoom level
      if (!window.applyZoomAndPan) {
        const operation = e.deltaY > 0 ? "-" : "+";
        changeZoomLevel(operation, e);
      }

      // Handle brush size adjustment with ctrl key pressed
      if (isModifierKey(e, hotkeysConfig.canvas_hotkey_adjust)) {
        e.preventDefault();

        // Increase or decrease brush size based on scroll direction
        adjustBrushSize(elemId, e.deltaY);
      }
    });

    // Handle the move event for pan functionality. Updates the panX and panY variables and applies the new transform to the target element.
    function handleMoveKeyDown(e) {
      // Disable key locks to make pasting from the buffer work correctly
      if ((e.ctrlKey && e.code === 'KeyV') || (e.ctrlKey && event.code === 'KeyC') || e.code === "F5") {
        console.log("work")
        return
      }

      // before activating shortcut, ensure user is not actively typing in an input field
      if (!hotkeysConfig.canvas_blur_prompt) {
        if (e.target.nodeName === 'TEXTAREA' || e.target.nodeName === 'INPUT') {
          return
        }
      }

      if (e.code === hotkeysConfig.canvas_hotkey_move) {
        if (!e.ctrlKey && !e.metaKey && isKeyDownHandlerAttached) {
          e.preventDefault();
          document.activeElement.blur();
          isMoving = true;
        }
      }
    }

    function handleMoveKeyUp(e) {
      if (e.code === hotkeysConfig.canvas_hotkey_move) {
        isMoving = false;
      }

      if (e.code === "ShiftLeft") {
        window.drawStraightLine = false;
      }
    }

    document.addEventListener("keydown", handleMoveKeyDown);
    document.addEventListener("keyup", handleMoveKeyUp);

    // Detect zoom level and update the pan speed.
    function updatePanPosition(movementX, movementY) {
      let panSpeed = 2;

      if (elemData[elemId].zoomLevel > 8) {
        panSpeed = 3.5;
      }

      elemData[elemId].panX += movementX * panSpeed;
      elemData[elemId].panY += movementY * panSpeed;

      // Delayed redraw of an element
      requestAnimationFrame(() => {
        targetElement.style.transform = `translate(${elemData[elemId].panX}px, ${elemData[elemId].panY}px) scale(${elemData[elemId].zoomLevel})`;
        toggleOverlap("on");
      });


    }

    function handleMoveByKey(e) {
      if (isMoving && elemId === activeElement) {
        updatePanPosition(e.movementX, e.movementY);
        targetElement.style.pointerEvents = "none";
      } else {
        targetElement.style.pointerEvents = "auto";
      }
    }

    function handleEnd() {
      document.removeEventListener("mousemove", handleMoveByMouse);
      document.removeEventListener("mouseup", handleEnd);
      targetElement.style.pointerEvents = "auto";
    }

    function handleMoveByMouse(e) {
      if (e.shiftKey && elemId === activeElement) {
        e.preventDefault();
        updatePanPosition(e.movementX, e.movementY);
        targetElement.style.pointerEvents = "none";
      }
    }

    function targetElementHandler(e) {
      if (e.shiftKey) {
        e.preventDefault();
        document.addEventListener("mousemove", handleMoveByMouse);
        document.addEventListener("mouseup", handleEnd);
      }
    }

    // Prevents sticking to the mouse
    window.onblur = function () {
      isMoving = false;
    };

    gradioApp().addEventListener("mousemove", handleMoveByKey);
    // targetElement.addEventListener("mousedown", targetElementHandler);
  }

  applyZoomAndPan(elementIDs.sketch);
  applyZoomAndPan(elementIDs.inpaint);
  applyZoomAndPan(elementIDs.inpaintSketch);

  //Enable ControlNet Integration
  // Integration ControlNet
  const integrateControlNet = hotkeysConfig.canvas_zoom_enable_integration;
  if (integrateControlNet === true) {
    const t2icontolNetMainID = "#txt2img_controlnet";
    const t2icontolNetMainEl = document.querySelector(t2icontolNetMainID);
    const i2icontolNetMainID = "#img2img_controlnet";
    const i2icontolNetMainEl = document.querySelector(i2icontolNetMainID);

    if (t2icontolNetMainEl) {
      t2icontolNetMainEl.addEventListener(
        "click",
        async () => {
          const maxElements = 10;
          for (let i = 0; i < maxElements; i++) {
            const t2iControlNetElID = `#txt2img_controlnet_ControlNet-${i}_input_image`;
            const t2iControlNetEl = await waitForElement(t2iControlNetElID);
            if (t2iControlNetEl) {
              applyZoomAndPan(t2iControlNetElID);
            } else {
              break;
            }
          }
        },
        { once: true }
      );
    }

    if (i2icontolNetMainEl) {
      i2icontolNetMainEl.addEventListener(
        "click",
        async () => {
          const maxElements = 10;
          for (let i = 0; i < maxElements; i++) {
            const i2iControlNetElID = `#img2img_controlnet_ControlNet-${i}_input_image`;
            const i2iControlNetEl = await waitForElement(i2iControlNetElID);
            if (i2iControlNetEl) {
              applyZoomAndPan(i2iControlNetElID);
            } else {
              break;
            }
          }
        },
        { once: true }
      );
    }

    // Integration with Regional Prompter
    if (integrateControlNet === true) {
      const RPId = "#RP_main";
      const RPEl = document.querySelector(RPId);

      if (RPEl) {
        RPEl.addEventListener(
          "click",
          async () => {
            const RPMaskId = "#polymask";
            const RPMaskEl = await waitForElement(RPMaskId);

            if (RPMaskEl) {
              applyZoomAndPan(RPMaskId);
            }
          },
          { once: true }
        );
      }
    }

    // Integration with Latent Couple / twoshot_tabs
    if (integrateControlNet === true) {
      const T2I = "div#tab_txt2img";
      const I2I = "div#tab_img2img";
      const Tab = "div#script_twoshot_tabs";
      const Canvas = "div#twoshot_canvas_sketch";

      //Text to Image Implementation
      const LCT2IID = T2I + " " + Tab;
      const LCT2IEl = document.querySelector(LCT2IID);
      const LCT2TMaskID = LCT2IID + " " + Canvas;

      if (LCT2IEl) {
        LCT2IEl.addEventListener(
          "click",
          async () => {
            const LCT2TMaskEl = await waitForElement(LCT2TMaskID);
            if (LCT2TMaskEl) {
              applyZoomAndPan(LCT2TMaskID);
            }
          },
          { once: true }
        );
      }

      //Image to Image Implementation
      const LCI2IID = I2I + " " + Tab;
      const LCI2IEl = document.querySelector(LCI2IID);
      const LCI2IMaskID = LCI2IID + " " + Canvas;

      if (LCI2IEl) {
        LCI2IEl.addEventListener(
          "click",
          async () => {
            const LCI2IMaskEl = await waitForElement(LCI2IMaskID);
            if (LCI2IMaskEl) {
              applyZoomAndPan(LCI2IMaskID);
            }
          },
          { once: true }
        );
      }
    }
  }
});
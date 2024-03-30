/**
 * onUiLoaded is a function that is called when the UI is loaded.
 * @param {Function} callback - The function to be called when the UI is loaded.
 * @returns {void}
 * @example
 */
onUiLoaded(async () => {
  const elementIDs = {
    img2img: "#img2img_img2img_tab",
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
    sendToInpainBtnNew: "#img2img_send_to_inpaint",
    sendToInpainBtnT2INew: "#txt2img_send_to_inpaint"
  };
  const tabNameToElementId = {
    "Inpaint sketch": elementIDs.inpaintSketch,
    Inpaint: elementIDs.inpaint,
    Sketch: elementIDs.sketch,
  };

  // Helper functions

  function checkIsDefault(elements, elemID) {
    return Object.values(elements).some(value => value.includes(elemID));
  }

  function hasHorizontalScrollbar(element) {
    return element.scrollWidth > element.clientWidth;
  }

  /**
   * Dispatches a synthetic wheel event to simulate zoom operation.
   * @param {Element} targetElement - The target element for the event.
   * @param {string} sign - "+" or "-" sign to determine the zoom direction.
   * @param {Event} oldEvent - The original event.
   */
  const zoomFakeWheelEvent = (targetElement, sign, oldEvent) => {
    const rect = targetElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const detailValue = sign === "-" ? 1 : -1;

    const event = new WheelEvent("wheel", {
      bubbles: true,
      cancelable: true,
      view: window,
      detail: detailValue,
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
      deltaMode: detailValue,
      deltaX: 0,
      deltaY: detailValue,
      deltaZ: 0
    });

    targetElement.dispatchEvent(event);
  };

  /**
   * Waits for an element to be present in the DOM.
   * @param {string} id - The id of the element.
   * @return {Promise<Element>} A promise that resolves with the element when it's present in the DOM.
   */
  const waitForElement = (id) => new Promise(resolve => {
    const checkForElement = () => {
      const element = document.querySelector(id);
      if (element) return resolve(element);
      setTimeout(checkForElement, 100);
    };

    checkForElement();
  });

  /**
   * Retrieves the active tab from a set of tabs.
   * @param {Object} elements - The element that contains the tabs.
   * @param {boolean} all - Optional. If true, all tabs are returned.
   * @return {Element} The active tab element.
   */
  const getActiveTab = (elements, all = false) => {
    const tabs = elements.img2imgTabs.querySelectorAll("button");
    return all ? tabs : Array.from(tabs).find(tab => tab.classList.contains("selected"));
  };

  /**
   * Retrieves the ID of the active tab.
   * @param {Object} elements - The element that contains the tabs.
   * @return {string} The ID of the active tab.
   */
  const getTabId = (elements) => tabNameToElementId[getActiveTab(elements).innerText];

  /**
   * Waits until the opts object is loaded.
   * @return {Promise<Object>} A promise that resolves with the opts object.
   */
  const waitForOpts = async () => {
    while (!window.opts || !Object.keys(window.opts).length) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    return window.opts;
  };

  /**
   * Checks if the key event matches a given modifier key.
   * @param {KeyboardEvent} event - The key event.
   * @param {string} key - The name of the modifier key. Can be "Ctrl", "Shift", or "Alt".
   * @return {boolean} True if the event's key is the specified modifier key, false otherwise.
   */
  const isModifierKey = (event, key) => ({
    "Ctrl": event.ctrlKey,
    "Shift": event.shiftKey,
    "Alt": event.altKey
  }[key] || false);

  /**
   * Checks if a provided hotkey is valid.
   * @param {string} value - The value to check.
   * @return {boolean} Whether the provided hotkey is valid.
   */
  const isValidHotkey = value => {
    const specialKeys = ["Ctrl", "Alt", "Shift", "Disable"];
    return /^[a-z]$/i.test(value) || specialKeys.includes(value);
  };

  /**
   * Normalizes a provided hotkey.
   * @param {string} hotkey - The hotkey to normalize.
   * @return {string} The normalized hotkey.
   */
  const normalizeHotkey = hotkey => hotkey.length === 1 ? `Key${hotkey.toUpperCase()}` : hotkey;

  /**
   * Formats a hotkey for display.
   * @param {string} hotkey - The hotkey to format.
   * @return {string} The formatted hotkey.
   */
  const formatHotkeyForDisplay = hotkey => hotkey.startsWith("Key") ? hotkey.slice(3) : hotkey;

  /**
   * Creates a hotkey configuration using the provided options.
   * @param {Object} defaultHotkeysConfig - The default hotkey configuration.
   * @param {Object} hotkeysConfigOpts - The user-provided hotkey configuration options.
   * @return {Object} The resulting hotkey configuration.
   */
  const createHotkeyConfig = (defaultHotkeysConfig, hotkeysConfigOpts) => {
    const result = {};
    const usedKeys = new Set();
    const invalidTypes = new Set(["boolean", "object", "number"]);

    for (const key in defaultHotkeysConfig) {
      const userValue = hotkeysConfigOpts[key];
      const defaultValue = defaultHotkeysConfig[key];

      if (key === "canvas_zoom_undo_extra_key") {
        result[key] = userValue
        continue
      }

      // if(key === "canvas_zoom_inc_brush_size" || key === "canvas_zoom_dec_brush_size")

      if (userValue === undefined || invalidTypes.has(typeof userValue) || userValue.startsWith("#") || userValue === "disable") {
        result[key] = userValue === undefined ? defaultValue : userValue;
      } else if (isValidHotkey(userValue)) {
        const normalizedUserValue = normalizeHotkey(userValue);

        if (!usedKeys.has(normalizedUserValue)) {
          usedKeys.add(normalizedUserValue);
          result[key] = normalizedUserValue;
        } else {
          console.error(`Hotkey: ${formatHotkeyForDisplay(userValue)} for ${key} is repeated and conflicts with another hotkey. The default hotkey is used: ${formatHotkeyForDisplay(defaultValue)}`);
          result[key] = defaultValue;
        }
      } else {
        if (key === "canvas_zoom_inc_brush_size" || key === "canvas_zoom_dec_brush_size") {
          result[key] = defaultValue;
        } else {
          console.error(`Hotkey: ${formatHotkeyForDisplay(userValue)} for ${key} is not valid. The default hotkey is used: ${formatHotkeyForDisplay(defaultValue)}`);
          result[key] = defaultValue;
        }
      }
    }

    return result;
  };

  /**
   * Disables specified functions in the configuration.
   * @param {Object} config - The configuration object.
   * @param {Array<string>} disabledFunctions - The array of functions to be disabled.
   * @return {Object} The updated configuration object.
   */
  const disableFunctions = (config, disabledFunctions) => {
    disabledFunctions.forEach(funcName => {
      const key = functionMap[funcName];
      if (key) config[key] = "disable";
    });
    return config;
  };
  /**
   * Clears the mask of the inpaint image.
   */
  const clearMask = () => {
    const closeBtn = document.querySelector("#img2maskimg button[aria-label='Clear']");
    closeBtn?.click();
  };

  /**
   * Adjusts the opacity value.
   * @param {number} opacity - The opacity value.
   * @return {number} The adjusted opacity.
   */
  const adjustOpacity = opacity => opacity === 1 ? 1 : (100 - opacity) / 100;

  /**
   * Sets the opacity of the brush.
   * @param {number} opacity - The opacity value.
   */
  const setBrushOpacity = opacity => {
    const canvas = document.querySelector(`${elementIDs.inpaint} canvas[key="interface"]`);
    canvas.getContext("2d").globalAlpha = adjustOpacity(opacity);
  };

  /**
   * Sets the opacity of the canvas.
   * @param {number} opacity - The opacity value.
   */
  const setCanvasOpacity = opacity => {
    const canvas = document.querySelector(`${elementIDs.inpaint} canvas[key="temp"]`);
    const redrawBtn = document.querySelector(`${elementIDs.inpaint} button[aria-label="Redraw"]`);
    const ctx = canvas.getContext("2d");
    const transparentMask = localStorage.getItem("transparentMask") === "true";

    opacity = adjustOpacity(opacity);
    ctx.globalCompositeOperation = transparentMask ? "source-over" : "xor";
    ctx.globalAlpha = transparentMask ? 1 : opacity;
    localStorage.setItem("transparentMask", !transparentMask);

    requestAnimationFrame(() => redrawBtn.click());
  };

  /**
   * The restoreImgRedMask function displays a red mask around an image to indicate the aspect ratio.
   * If the image display property is set to 'none', the mask breaks. To fix this, the function
   * temporarily sets the display property to 'block' and then hides the mask again after 300 milliseconds
   * to avoid breaking the canvas. Additionally, the function adjusts the mask to work correctly on
   * very long images.
   */
  /**
   * Restores the image red mask for a given element.
   * @param {Object} elements - The object containing references to the different elements.
   */
  const restoreImgRedMask = elements => {
    const mainTabId = getTabId(elements);
    if (!mainTabId) return;

    const mainTab = gradioApp().querySelector(mainTabId);
    const img = mainTab?.querySelector("img");
    const imageARPreview = gradioApp().querySelector("#imageARPreview");

    if (!img || !imageARPreview) return;

    imageARPreview.style.transform = "";
    if (parseFloat(mainTab.style.width) > 865) {
      const scaleMatch = mainTab.style.transform.match(/scale\(([-+]?[0-9]*\.?[0-9]+)\)/);
      const zoom = scaleMatch && scaleMatch[1] ? Number(scaleMatch[1]) : 1; // default zoom
      imageARPreview.style.transformOrigin = "0 0";
      imageARPreview.style.transform = `scale(${zoom})`;
    }

    if (img.style.display !== "none") return;

    img.style.display = "block";
    setTimeout(() => { img.style.display = "none"; }, 400);
  };


  const hotkeysConfigOpts = await waitForOpts();

  // Default config
  const defaultHotkeysConfig = {
    canvas_hotkey_zoom: "Alt",
    canvas_hotkey_adjust: "Ctrl",
    canvas_zoom_undo_extra_key: "Ctrl",
    canvas_zoom_hotkey_undo: "KeyZ",
    canvas_hotkey_reset: "KeyR",
    canvas_hotkey_fullscreen: "KeyS",
    canvas_hotkey_move: "KeyF",
    canvas_hotkey_overlap: "KeyO",
    canvas_zoom_hotkey_open_colorpanel: "KeyQ",
    canvas_zoom_hotkey_pin_colorpanel: "KeyT",
    canvas_zoom_hotkey_dropper: "KeyA",
    canvas_zoom_hotkey_fill: "KeyH",
    canvas_zoom_hotkey_transparency: "KeyC",
    canvas_zoom_inc_brush_size: "BracketRight",
    canvas_zoom_dec_brush_size: "BracketLeft",
    canvas_zoom_hide_btn: true,
    canvas_show_tooltip: true,
    canvas_auto_expand: true,
    canvas_zoom_mask_clear: true,
    canvas_zoom_enable_integration: true,
    canvas_zoom_brush_opacity: false,
    canvas_blur_prompt: false,
    canvas_zoom_draw_staight_lines: false,
    canvas_zoom_brush_outline: false,
    canvas_zoom_add_buttons: false,
    canvas_zoom_inpaint_brushcolor: "#000000",
    canvas_zoom_transparency_level: 70,
    canvas_zoom_brush_size_change: 5,
    canvas_zoom_brush_size: 200,
    canvas_zoom_disabled_functions: [],
  };

  const functionMap = {
    "Zoom": "canvas_hotkey_zoom",
    "Adjust brush size": "canvas_hotkey_adjust",
    "Moving canvas": "canvas_hotkey_move",
    "Undo": "canvas_zoom_hotkey_undo",
    "Fullscreen": "canvas_hotkey_fullscreen",
    "Reset Zoom": "canvas_hotkey_reset",
    "Overlap": "canvas_hotkey_overlap",
    "Open color panel": "canvas_zoom_hotkey_open_colorpanel",
    "Pin color panel": "canvas_zoom_hotkey_pin_colorpanel",
    "Dropper": "canvas_zoom_hotkey_dropper",
    "Fill": "canvas_zoom_hotkey_fill",
    "Transparency Mode": "canvas_zoom_hotkey_transparency",
    // "Increase brush size": "canvas_hotkey_inc_brush_size",
    // "Decrease brush size": "canvas_hotkey_dec_brush_size",
  };

  // Disable funcs
  const preHotkeysConfig = disableFunctions(hotkeysConfigOpts, hotkeysConfigOpts.canvas_zoom_disabled_functions)

  // Disable unnecessary user functions
  const hotkeysConfig = createHotkeyConfig(defaultHotkeysConfig, preHotkeysConfig);


  // Variables for moving and opacity
  let isMoving = false;
  let activeElement;
  let canvasOpacity = 1;
  let brushOpacity = 1;

  window.maskOpacity = hotkeysConfig.canvas_zoom_transparency_level / 100
  window.maxBrushSize = hotkeysConfig.canvas_zoom_brush_size

  // Element data holder
  const elemData = {};

  // Retrieve elements
  const elements = Object.fromEntries(Object.entries(elementIDs).map(([id, selector]) => [id, gradioApp().querySelector(selector)]));

  // Apply functionality to the range inputs, restore redmask and correct for long images
  const rangeInputs = elements.rangeGroup ? Array.from(elements.rangeGroup.querySelectorAll("input")) : [gradioApp().querySelector("#img2img_width input[type='range']"), gradioApp().querySelector("#img2img_height input[type='range']")];
  rangeInputs.forEach(input => input?.addEventListener("input", () => restoreImgRedMask(elements)));
  function getTabElFromText(tabName) {
    const tabMap = {
      inpaint: elementIDs.inpaint,
      sketch: elementIDs.sketch,
      "inpaint sketch": elementIDs.inpaintSketch,
    };
    return tabMap[tabName.trim().toLowerCase()];
  }

  function getSendButtons(elemId) {
    const tabMap = {
      [elementIDs.inpaint]: "inpaint",
      [elementIDs.sketch]: "sketch",
      [elementIDs.inpaintSketch]: "inpaint_sketch",
      [elementIDs.img2img]: "img2img",
    };
    const tabString = tabMap[elemId];
    return document.querySelectorAll(`#img2img_copy_to_${tabString} button`);
  }

  const isGetSizeImgBtnExists = !!document.querySelector("#img2img_detect_image_size_btn");
  let getImgDataBtn, clonedDiv;

  if (!isGetSizeImgBtnExists) {
    clonedDiv = elements.img2imgDemRaw.children[0].cloneNode(true);
    clonedDiv.classList.add("get-img-dem");

    getImgDataBtn = clonedDiv.querySelector("button");
    getImgDataBtn.innerHTML = "<i>📏</i>";
    getImgDataBtn.id = "img2img_res_get_btn";
    getImgDataBtn.title = "Get the width and height from the picture";

    elements.img2imgDemRaw.appendChild(clonedDiv);
  }

  const canvasColor = await waitForOpts();
  // Initialize localStorage variables
  localStorage.setItem("brushOutline", hotkeysConfig.canvas_zoom_brush_outline);

  // console.log(canvasColor.img2img_inpaint_mask_brush_color,canvasColor.img2img_sketch_default_brush_color,canvasColor.canvas_zoom_inpaint_brushcolor)

  // img2img_sketch_default_brush_color, img2img_inpaint_mask_brush_color.

  if (canvasColor.img2img_inpaint_mask_brush_color) {
    localStorage.setItem("brush_color", canvasColor.img2img_inpaint_mask_brush_color);
  } else {
    localStorage.setItem("brush_color", hotkeysConfig.canvas_zoom_inpaint_brushcolor);
  }

  if (canvasColor.img2img_sketch_default_brush_color) {
    localStorage.setItem("sketch_brush_color", canvasColor.img2img_sketch_default_brush_color);
  }

  function applyZoomAndPan(elementID, isExtension = true) {
    const targetElement = gradioApp().querySelector(elementID);

    if (!targetElement) {
      console.error("Element not found");
      return;
    }

    targetElement.style.transformOrigin = "0 0";
    elemData[elementID] = {
      zoom: 1,
      panX: 0,
      panY: 0,
    };

    const allButtons = [...getSendButtons(elementID), ...getSendButtons(elementIDs.img2img)];

    let fullScreenMode = false;

    //Fix white canvas when change width
    function setImgDisplayToNone() {
      const img = targetElement.querySelector(`${elementID} img`);
      if (img) img.style.display = "none";
    }

    if (hotkeysConfig.canvas_zoom_mask_clear) {
      allButtons.forEach((button) => {
        if (button.innerText !== "img2img") {
          button.addEventListener("click", () => {
            const sendToTabName = getTabElFromText(button.innerText);

            if (sendToTabName) {
              const closeBtn = document.querySelector(
                `${sendToTabName} button[aria-label='Remove Image']`
              ) || document.querySelector(
                `${sendToTabName} button[aria-label='Clear']`
              );

              closeBtn?.click();
            }
          });
        }
      });

      if (elements.sendToInpainBtn) {
        elements.sendToInpainBtn.addEventListener("click", clearMask);
        elements.sendToInpainBtnT2I.addEventListener("click", clearMask);
      }
      else {
        elements.sendToInpainBtnNew.addEventListener("click", clearMask);
        elements.sendToInpainBtnT2INew.addEventListener("click", clearMask);
      }
    }

    if (!isGetSizeImgBtnExists) {
      getImgDataBtn.addEventListener("click", () => {
        const tabID = getTabId(elements);
        const canvas = document.querySelector(`${tabID} canvas`);
        const img = document.querySelector("#img2img_image img");
        const imgUpload = document.querySelector("#img_inpaint_base img");
    
        const rightWidth = img?.naturalWidth || canvas?.width || imgUpload?.naturalWidth;
        const rightHeight = img?.naturalHeight || canvas?.height || imgUpload?.naturalHeight;
    
        if (rightWidth && rightHeight) {
          const elements = document.querySelectorAll("#img2img_width input, #img2img_height input");
          const [rangeWidth, inputWidth, rangeHeight, inputHeight] = elements;
    
          [rangeWidth, inputWidth].forEach(el => el.value = rightWidth);
          [rangeHeight, inputHeight].forEach(el => el.value = rightHeight);
    
          [...elements].forEach(el => {
            el.dispatchEvent(new Event("change"));
            el.dispatchEvent(new Event("input"));
          });
        }
      });
    }
    

    function createTooltip() {
      const toolTipElemnt = targetElement.querySelector(".image-container") || targetElement.querySelector("div[data-testid='image']");

      const tooltip = document.createElement("div");
      tooltip.className = "canvas-tooltip--extension";

      const info = document.createElement("i");
      info.className = "canvas-tooltip-info--extension";

      const tooltipContent = document.createElement("div");
      tooltipContent.className = "canvas-tooltip-content--extension";

      const hotkeysInfo = [
        { configKey: "canvas_hotkey_zoom", action: "Zoom canvas", keySuffix: " + wheel" },
        { configKey: "canvas_hotkey_adjust", action: "Adjust brush size", keySuffix: " + wheel" },
        { configKey: "canvas_zoom_hotkey_undo", action: "Undo last action", keyPrefix: `${hotkeysConfig.canvas_zoom_undo_extra_key} + ` },
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

      const hotkeys = hotkeysInfo.map((info) => {
        const configValue = hotkeysConfig[info.configKey];

        let key = configValue.slice(-1);

        if (info.keySuffix) {
          key = `${configValue}${info.keySuffix}`;
        }

        if (info.keyPrefix && info.keyPrefix !== "None + ") {
          key = `${info.keyPrefix}${configValue[3]}`;
        }

        return {
          key,
          action: info.action,
          disabled: configValue === "disable",
        };
      });

      hotkeys
        .filter(hotkey => !hotkey.disabled)
        .forEach(hotkey => {
          const p = document.createElement("p");
          p.innerHTML = `<b>${hotkey.key}</b> - ${hotkey.action}`;
          tooltipContent.appendChild(p);
        });

      tooltip.append(info, tooltipContent);
      toolTipElemnt.appendChild(tooltip);
    }

    /**
   * Function to create fullscreen and dropper buttons and attach them to the target element
   * @returns {void}
   */
    function createFuncButtons() {
      const buttonContainer = targetElement.querySelector(".image-container") || targetElement.querySelector("div[data-testid='image']");

      const fullscreenBtn = document.createElement("button");
      fullscreenBtn.className = "fullscreen-btn-main";
      fullscreenBtn.innerHTML = `<p class="fullscreen-btn">F</p>`;
      fullscreenBtn.addEventListener("click", () => fitToScreen(true));

      const dropperBtn = document.createElement("button");
      dropperBtn.className = "dropper-btn-main";
      dropperBtn.innerHTML = `<p class="dropper-btn">P</p>`;
      dropperBtn.addEventListener("click", toggleDropper);

      buttonContainer.append(fullscreenBtn, dropperBtn);
    }

    if (hotkeysConfig.canvas_show_tooltip) {
      createTooltip();
    }

    if (hotkeysConfig.canvas_zoom_add_buttons) {
      createFuncButtons();
    }

    /**
     * Function to fix canvas display issues by hiding image when not in "img2img" mode
     * @returns {void}
     */
    function fixCanvas() {
      const activeTab = getActiveTab(elements).textContent.trim();

      if (activeTab !== "img2img") {
        const img = targetElement.querySelector(`${elementID} img`);

        if (img && img.style.display !== "none") {
          img.style.display = "none";
          img.style.visibility = "hidden";
        }
      }
    }

    /**
     * Function to reset the zoom level and pan position of the target element to their initial values
     * @param {string} _ - ignored parameter
     * @param {boolean} isMobile - indicates whether the application is running on a mobile device
     * @returns {void}
     */
    function resetZoom(_ = "", isMobile = false) {
      elemData[elementID] = {
        zoomLevel: 1,
        panX: 0,
        panY: 0,
      };

      if (isExtension) {
        targetElement.style.overflow = "hidden";
      }

      targetElement.isZoomed = false;

      fixCanvas();

      targetElement.style.transform = `scale(${elemData[elementID].zoomLevel}) translate(${elemData[elementID].panX}px, ${elemData[elementID].panY}px)`;

      const canvas = gradioApp().querySelector(`${elementID} canvas[key="interface"]`);

      toggleOverlap("off");
      fullScreenMode = false;

      const closeBtn = targetElement.querySelector("button[aria-label='Remove Image']");
      if (closeBtn) {
        closeBtn.addEventListener("click", resetZoom);
      }

      if (canvas && isExtension) {
        const parentElement = targetElement.closest('[id^="component-"]');
        if (
          canvas &&
          parseFloat(canvas.style.width) > parentElement.offsetWidth &&
          parseFloat(targetElement.style.width) > parentElement.offsetWidth
        ) {
          fitToElement();
          return;
        }

      }

      if (
        canvas &&
        !isExtension &&
        parseFloat(canvas.style.width) > 865 &&
        parseFloat(targetElement.style.width) > 865
      ) {
        fitToElement();
        return;
      }

      if (isMobile) {
        fitToElement();
        return;
      }

      targetElement.style.width = "";
      if (canvas) {
        // targetElement.style.height = canvas.style.height;
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
      `${elementID} input[type="file"][accept="image/*"].svelte-116rqfv`
    );
    fileInput.addEventListener("click", resetZoom);

    /**
     * Updates the zoom level of a specified element, adjusts panX and panY coordinates, and applies style transformations.
     * @param {number} level - The desired zoom level.
     * @param {number} x - The X-coordinate.
     * @param {number} y - The Y-coordinate.
     * @returns {number} The clamped zoom level.
     */
    const updateZoom = (level, x, y) => {
      const { panX, panY, zoomLevel } = elemData[elementID];

      const clampedLevel = Math.max(0.1, Math.min(level, 15));

      Object.assign(elemData[elementID], {
        panX: panX + x - (x * clampedLevel) / zoomLevel,
        panY: panY + y - (y * clampedLevel) / zoomLevel,
      });

      Object.assign(targetElement.style, {
        transformOrigin: "0 0",
        transform: `translate(${elemData[elementID].panX}px, ${elemData[elementID].panY}px) scale(${clampedLevel})`,
      });

      toggleOverlap("on");
      setImgDisplayToNone();

      if (isExtension) {
        targetElement.style.overflow = "visible";
      }

      return clampedLevel;
    };


    /**
     * Changes the zoom level of a specified element based on user interaction and hotkey configuration.
     * @param {string} operation - Specifies the type of operation ('+' to zoom in, '-' to zoom out).
     * @param {object} e - The event object.
     */
    const changeZoomLevel = (operation, e) => {
      if (!isModifierKey(e, hotkeysConfig.canvas_hotkey_zoom)) return;

      e.preventDefault();

      let { zoomLevel } = elemData[elementID];

      if (!zoomLevel) {
        zoomLevel = 1;
        elemData[elementID].zoomLevel = zoomLevel;
      }

      const delta = zoomLevel > 7 ? 0.9 : zoomLevel > 2 ? 0.6 : 0.2;

      const zoomPos = {
        x: e.clientX,
        y: e.clientY,
      };

      fullScreenMode = false;
      const rect = targetElement.getBoundingClientRect();

      elemData[elementID].zoomLevel = updateZoom(
        zoomLevel + (operation === "+" ? delta : -delta),
        zoomPos.x - rect.left,
        zoomPos.y - rect.top
      );

      targetElement.isZoomed = true;
    };

    /**
   * This function fits the target element to the screen by calculating
   * the required scale and offsets. It also updates the global variables
   * zoomLevel, panX, and panY to reflect the new state.
   */

    function fitToElement() {
      //Reset Zoom
      targetElement.style.transform = `translate(${0}px, ${0}px) scale(${1})`;

      let parentElement;

      if (isExtension) {
        parentElement = targetElement.closest('[id^="component-"]');
      } else {
        parentElement = targetElement.parentElement;
      }

      // Get element and screen dimensions
      const elementWidth = targetElement.offsetWidth;
      const elementHeight = targetElement.offsetHeight;
      // const parentElement = targetElement.parentElement;
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
      elemData[elementID].zoomLevel = scale;
      elemData[elementID].panX = offsetX;
      elemData[elementID].panY = offsetY;

      fullScreenMode = false;
      toggleOverlap("off");
    }

    // Adjusts element size and position for optimal screen fit
    function fitToScreen(isMobile = false) {
      const { querySelector } = gradioApp();
      const canvas = querySelector(`${elementID} canvas[key="interface"]`);

      if (!canvas) return;

      const canvasWidth = canvas.offsetWidth;
      if (canvasWidth > 862 || isExtension || isMobile) {
        targetElement.style.width = `${canvasWidth + 2}px`;
      }

      if (isExtension) targetElement.style.overflow = "visible";

      if (fullScreenMode) {
        resetZoom("", isMobile);
        fullScreenMode = false;
        return;
      }

      targetElement.style.transform = "translate(0px, 0px) scale(1)";

      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      const { offsetWidth: elementWidth, offsetHeight: elementHeight } = targetElement;
      const screenWidth = window.innerWidth - scrollbarWidth;
      const screenHeight = window.innerHeight;
      const { y: elementY, x: elementX } = targetElement.getBoundingClientRect();

      const scaleX = screenWidth / elementWidth;
      const scaleY = screenHeight / elementHeight;
      const scale = Math.min(scaleX, scaleY);

      const { transformOrigin } = window.getComputedStyle(targetElement);
      const [originX, originY] = transformOrigin.split(" ").map(parseFloat);

      const offsetX = (screenWidth - elementWidth * scale) / 2 - elementX - originX * (1 - scale);
      const offsetY = (screenHeight - elementHeight * scale) / 2 - elementY - originY * (1 - scale);

      targetElement.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;

      elemData[elementID] = { zoomLevel: scale, panX: offsetX, panY: offsetY };

      fullScreenMode = true;
      toggleOverlap("on");
    }


    /**
     * Toggles the opacity mode for the canvas and brush.
     */
    const toggleOpacityMode = () => {
      if (getActiveTab(elements).innerText !== "Inpaint") return;

      canvasOpacity = canvasOpacity === 1 ? hotkeysConfig.canvas_zoom_transparency_level : 1;
      setCanvasOpacity(canvasOpacity);
      setBrushOpacity(canvasOpacity);
    };

    /**
    * Restores the source of an image to its original state, in case of an undo operation.
    */
    //Restore undo func
    function restoreUndo() {
      const img = targetElement.querySelector(`${elementID} img`);
      const imgDataSource = img.getAttribute("data-source");
      const isUpload = img.getAttribute("data-isupload");

      if (imgDataSource && img.src !== imgDataSource && isUpload === "false") {
        img.style.display = "none";
        img.src = imgDataSource;
      }
    }

    /**
     * Undo the last action performed by the user, considering keypress and mouse events.
     * @param {object} e - The event object.
     */

    // Undo last action
    function undoLastAction(e) {
      // Determine if the control key or equivalent is pressed
      const { canvas_zoom_undo_extra_key } = hotkeysConfig;
      let isCtrlPressed = isModifierKey(e, canvas_zoom_undo_extra_key);
      const isAuxButton = e.button >= 3; // Check for auxiliary button clicks
    
      // Override control press condition if set to "None" or an auxiliary button is used
      if (canvas_zoom_undo_extra_key === "None" || isAuxButton) {
        isCtrlPressed = true;
      } else if (!isCtrlPressed) return; // Exit if the required key is not pressed
    
      // Locate the undo button within the active tab
      const undoBtn = document.querySelector(`${activeElement} button[aria-label="Undo"]`);
    
      // Ensure canvas and brush opacity are reset to prevent bugs
      if (canvasOpacity > 1 && getActiveTab(elements).innerText === "Inpaint") {
        setCanvasOpacity(1);
        setBrushOpacity(1);
        canvasOpacity = brushOpacity = 1;
      }
    
      // Perform the undo action if conditions are met
      if (isCtrlPressed && undoBtn && activeElement === elementID) {
        e.preventDefault(); // Prevent default action to ensure undo functionality is executed
        restoreUndo(); // Restore the last action
        undoBtn.click(); // Simulate a click on the undo button
      }
    }
    

    // Toggle dropper
    function toggleDropper() {
      const colorPickerEnabled =
        localStorage.getItem("colorPickerEnable") === "true";
      localStorage.setItem("colorPickerEnable", !colorPickerEnabled);
    }



    /**
     * Toggles the visibility of certain canvas buttons and tooltips.
     * @param {boolean} hide - Specifies whether to hide (true) or show (false) the elements.
     */
    function hideCanvasButtons(hide = false) {
      const funcBtns = document.querySelector(`${activeElement} button[aria-label='Undo']`)?.parentElement;
      const artistsBtns = document.querySelector(`${activeElement} .brush`)?.parentElement;
      const tooltip = document.querySelector(`${activeElement} .canvas-tooltip-info--extension`);

      const elements = [funcBtns, artistsBtns, tooltip];

      elements.forEach(element => {
        if (hide) {
          element.classList.remove("canvas-buttons-visible");
          element.classList.add("canvas-buttons-hidden");
        } else {
          element.classList.remove("canvas-buttons-hidden");
          element.classList.add("canvas-buttons-visible");
        }
      });
    }


    /**
     * Moves a color input panel to the current mouse position.
     * @param {HTMLElement} colorInput - The color input panel to move.
     * @returns {Promise} A promise that resolves when the next frame is requested.
     */
    const pinColorPanelToMouse = (colorInput) => new Promise((resolve) => {
      colorInput.style.position = "absolute";
      colorInput.style.visibility = "hidden";

      const canvas = document.querySelector(`${elementID} canvas[key="interface"]`);
      const isMouseOverCanvas = localStorage.getItem("overCanvas") === "true";
      const marginLeft = parseInt(window.getComputedStyle(canvas).getPropertyValue("margin-left")) || 0;

      colorInput.style.left = `${mouseX - targetElement.clientWidth + marginLeft * (isMouseOverCanvas ? 1 : 0)}px`;
      colorInput.style.top = `${mouseY - 40 - colorInput.offsetHeight}px`;

      requestAnimationFrame(resolve);
    });

    /**
     * Opens the brush panel under the mouse pointer and optionally triggers the color menu.
     * @param {boolean} openUnderMouse - Whether to open the brush panel under the mouse.
     * @param {boolean} openColorMenu - Whether to trigger the color menu.
     */
    const openBrushPanel = async (openUnderMouse = false, openColorMenu = true) => {
      const colorBtn = document.querySelector(`${elementID} button[aria-label="Select brush color"]`);

      if (!document.querySelector(`${elementID} input[aria-label="Brush color"]`)) colorBtn?.click();

      setTimeout(async () => {
        const colorInput = document.querySelector(`${elementID} input[aria-label="Brush color"]`);

        if (openUnderMouse) await pinColorPanelToMouse(colorInput);
        if (openColorMenu) colorInput?.click();
      }, 0);
    };

    /**
     * Fills the canvas with the currently selected color.
     */
    const fillCanvasWithColor = () => {
      openBrushPanel(false, false);
      localStorage.setItem("fillCanvasBrushColor", "true");

      const canvas = document.querySelector(`${elementID} canvas[key="interface"]`);
      canvas.dispatchEvent(new MouseEvent('mousemove', { clientX: 1, clientY: 1 }));
    };


    /**
     * Handles key down events to trigger corresponding canvas actions.
     * @param {KeyboardEvent} event - The keyboard event object.
     */
    const handleKeyDown = (event) => {
      // Basic validation to ensure the event object exists and is of the correct type
      if (!event || typeof event !== 'object' || !event.code) {
        console.warn('handleKeyDown was called without a valid event object.');
        return; // Exit the function if the event is not valid
      }

      // Ensure hotkeysConfig exists and is an object
      if (typeof hotkeysConfig !== 'object') {
        console.warn('hotkeysConfig is not defined or not an object.');
        return; // Exit if hotkeysConfig is not correctly defined
      }

      const allowedKeys = ['KeyV', 'KeyC', 'F5'];
      const isCtrlPressed = event.ctrlKey;
      const isTyping = ['TEXTAREA', 'INPUT'].includes(event.target.nodeName);

      if (isTyping && !hotkeysConfig.canvas_blur_prompt || isCtrlPressed && allowedKeys.includes(event.code)) return;

      const hotkeyActions = {
        [hotkeysConfig.canvas_hotkey_reset]: resetZoom,
        [hotkeysConfig.canvas_hotkey_overlap]: toggleOverlap,
        [hotkeysConfig.canvas_hotkey_fullscreen]: fitToScreen,
        [hotkeysConfig.canvas_zoom_hotkey_open_colorpanel]: () => openBrushPanel(false, true),
        [hotkeysConfig.canvas_zoom_hotkey_pin_colorpanel]: () => openBrushPanel(true, true),
        [hotkeysConfig.canvas_zoom_hotkey_dropper]: toggleDropper,
        [hotkeysConfig.canvas_zoom_hotkey_fill]: fillCanvasWithColor,
        [hotkeysConfig.canvas_zoom_hotkey_transparency]: toggleOpacityMode,
        [hotkeysConfig.canvas_zoom_hotkey_undo]: undoLastAction,
        [hotkeysConfig.canvas_zoom_dec_brush_size]: () => adjustBrushSize(elementID, 100, false, hotkeysConfig.canvas_zoom_brush_size_change),
        [hotkeysConfig.canvas_zoom_inc_brush_size]: () => adjustBrushSize(elementID, -100, false, hotkeysConfig.canvas_zoom_brush_size_change),
      };

      const action = hotkeyActions[event.code];
      if (action) {
        event.preventDefault();
        action(event);
      } else if (["Equal", "NumpadAdd", "Minus", "NumpadSubtract"].includes(event.code)) {
        event.preventDefault();
        // Ensure targetElement exists before calling zoomFakeWheelEvent
        if (typeof targetElement !== 'undefined') {
          zoomFakeWheelEvent(targetElement, event.code.startsWith('Minus') ? '-' : '+', event);
        } else {
          console.warn('targetElement is undefined, cannot perform zoom operation.');
        }
      }

      if ((isModifierKey(event, hotkeysConfig.canvas_hotkey_zoom) || isModifierKey(event, hotkeysConfig.canvas_hotkey_adjust)) && event.preventDefault) {
        event.preventDefault();
      }

      if (event.code === "ShiftLeft" && hotkeysConfig.canvas_zoom_draw_staight_lines) {
        window.drawStraightLine = true;
      }
    };


    // Get mouse position 
    const getMousePosition = ({ offsetX, offsetY }) => {
      mouseX = offsetX;
      mouseY = offsetY;
    };

    // We make the transparency of the brush and the transparency of the mask the same

    function matchBrushOpacity() {
      const canvas = document.querySelector(`${elementIDs.inpaint} canvas[key="interface"]`);
      if (canvas && brushOpacity !== hotkeysConfig.canvas_zoom_transparency_level) {
        setBrushOpacity(100 - hotkeysConfig.canvas_zoom_transparency_level)
        brushOpacity = hotkeysConfig.canvas_zoom_transparency_level
      }
    }

    if (hotkeysConfig.canvas_zoom_brush_opacity) {
      targetElement.addEventListener("mousemove", matchBrushOpacity)
    }

    // Simulation of the function to put a long image into the screen.
    // We detect if an image has a scroll bar or not, make a fullscreen to reveal the image, then reduce it to fit into the element.
    // We hide the image and show it to the user when it is ready.

    targetElement.isExpanded = false;
    function autoExpand() {
      const canvas = document.querySelector(`${elementID} canvas[key="interface"]`);
      if (canvas) {
        if (hasHorizontalScrollbar(targetElement) && targetElement.isExpanded === false) {
          targetElement.style.visibility = "hidden";
          setTimeout(() => {
            fitToScreen();
            resetZoom();
            targetElement.style.visibility = "visible";
            targetElement.isExpanded = true;
          }, 10);
        }
      }
    }

    //observers
    // Creating an observer with a callback function to handle DOM changes
    const observer = new MutationObserver((mutationsList, observer) => {
      for (let mutation of mutationsList) {
        // If the style attribute of the canvas has changed, by observation it happens only when the picture changes
        if (mutation.type === 'attributes' && mutation.attributeName === 'style' &&
          mutation.target.tagName.toLowerCase() === 'canvas') {
          targetElement.isExpanded = false;
          setTimeout(resetZoom, 10);
        }
      }
    });

    // Apply auto expand if enabled
    if (hotkeysConfig.canvas_auto_expand && (!window.applyZoomAndPan || isExtension)) {
      targetElement.addEventListener("mousemove", autoExpand);
      // Set up an observer to track attribute changes
      observer.observe(targetElement, { attributes: true, childList: true, subtree: true });
    }

    targetElement.addEventListener("mousemove", getMousePosition);
    targetElement.addEventListener("auxclick", undoLastAction);

    // Handle events only inside the targetElement
    let isKeyDownHandlerAttached = false;
    let hideTimeout;
    let buttonsHidden = false;

    /**
     * Handles mouse move events to control canvas operations.
     */
    const handleMouseMove = (event) => {
      // Ensure there is an event and it has the necessary attributes
      if (!event || typeof event !== 'object') {
        console.warn('handleMouseMove was called without a valid event object.');
        return; // Exit the function if the event is not valid
      }

      // Proceed with attaching the key down handler if it's not already attached
      if (!isKeyDownHandlerAttached) {
        document.addEventListener("keydown", handleKeyDown);
        isKeyDownHandlerAttached = true;
        activeElement = elementID;
      }

      const shouldHideButtons = window.isDrawing && hotkeysConfig.canvas_zoom_hide_btn;

      try {
        if (shouldHideButtons !== buttonsHidden) {
          hideCanvasButtons(shouldHideButtons);
          buttonsHidden = shouldHideButtons;
        }
      } catch (error) {
        // Log the error for debugging purposes, if necessary
        console.error("Error in handling mouse move:", error);
        // A small hack, as it is necessary that this check works like this
        // There's no need to report a problem because there isn't one.
      }
    };


    targetElement.addEventListener("mouseout", () => {
      const canvas = targetElement.querySelector(`${elementID} canvas`)
      if (canvas) {
        hideCanvasButtons(false)
      }

    })

    /**
     * Handles mouse leave events to remove key down events and reset active element.
     */
    const handleMouseLeave = () => {
      if (!isKeyDownHandlerAttached) return;

      document.removeEventListener("keydown", handleKeyDown);
      isKeyDownHandlerAttached = false;
      activeElement = null;
    };


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

    /**
     * Event listener for wheel event on the target element to handle zoom and brush size adjustment.
     */
    targetElement.addEventListener("wheel", (e) => {
      // Early return if modifier key is not pressed or if it's not the default canvas and zoom/pan is disabled
      if (!checkIsDefault(elementIDs, elementID) || !window.applyZoomAndPan) {
        changeZoomLevel(e.deltaY > 0 ? "-" : "+", e);
      } else if (isModifierKey(e, hotkeysConfig.canvas_hotkey_adjust)) {
        e.preventDefault(); // Prevent the default wheel action (scroll/zoom) when adjusting brush size
        adjustBrushSize(elementID, e.deltaY, false, hotkeysConfig.canvas_zoom_brush_size_change);
      }
    });


    /**
     * Handles key down events to trigger moving operations on the canvas.
     * @param {KeyboardEvent} event - The keyboard event object.
     */
    const handleMoveKeyDown = (e) => {
      const allowedKeys = ['KeyV', 'KeyC', 'F5'];
      const isCtrlPressed = e.ctrlKey || e.metaKey; // Combine Ctrl and Meta (Cmd) keys
      const isTyping = ['TEXTAREA', 'INPUT'].includes(e.target.nodeName);

      const shouldPreventDefault =
        (isTyping && !hotkeysConfig.canvas_blur_prompt) || (isCtrlPressed && allowedKeys.includes(e.code));

      if (shouldPreventDefault || e.code !== hotkeysConfig.canvas_hotkey_move || !isKeyDownHandlerAttached) {
        return;
      }

      e.preventDefault();
      document.activeElement.blur();
      isMoving = true;
    };

    /**
     * Handles key up events to stop moving operations on the canvas.
     * @param {KeyboardEvent} event - The keyboard event object.
     */
    const handleMoveKeyUp = (e) => {
      if (e.code === hotkeysConfig.canvas_hotkey_move) isMoving = false;
      if (e.code === "ShiftLeft") window.drawStraightLine = false;
    };


    document.addEventListener("keydown", handleMoveKeyDown);
    document.addEventListener("keyup", handleMoveKeyUp);

    /**
     * Updates pan position based on mouse movements and redraws the target element.
     * @param {number} movementX - The amount of horizontal movement.
     * @param {number} movementY - The amount of vertical movement.
     */
    const updatePanPosition = (movementX, movementY) => {
      // Initialize default values if not set
      const elem = elemData[elementID];
      elem.zoomLevel = elem.zoomLevel || 1;
      elem.panX = elem.panX || 0;
      elem.panY = elem.panY || 0;

      // Adjust pan speed based on zoom level
      const panSpeed = elem.zoomLevel > 8 ? 3.5 : 2;

      // Update pan position
      elem.panX += movementX * panSpeed;
      elem.panY += movementY * panSpeed;

      // Redraw the target element
      requestAnimationFrame(() => {
        targetElement.style.transform = `translate(${elem.panX}px, ${elem.panY}px) scale(${elem.zoomLevel})`;
        toggleOverlap("on");
      });
    };



    /**
     * Handles the movement of the canvas element by keyboard input.
     * @param {KeyboardEvent} e - The keyboard event object.
     */
    function handleMoveByKey(e) {
      if (isMoving && elementID === activeElement) {
        updatePanPosition(e.movementX, e.movementY);
        targetElement.style.pointerEvents = "none";

        if (isExtension) {
          targetElement.style.overflow = "visible";
        }

      } else {
        targetElement.style.pointerEvents = "auto";
      }
    }

    /**
     * Handles the end of the canvas movement operation.
     */
    const handleEnd = () => {
      document.removeEventListener("mousemove", handleMoveByMouse);
      document.removeEventListener("mouseup", handleEnd);
      targetElement.style.pointerEvents = "auto";
    };

/**
 * Optimizes the movement of the canvas element by mouse input.
 * @param {MouseEvent} e - The mouse event object.
 */
    const handleMoveByMouse = (e) => {
      // Check if the shift key is pressed and the correct element is active without directly comparing to a global variable.
      if (!e.shiftKey || elementID !== activeElement) return;

      e.preventDefault();
      updatePanPosition(e.movementX, e.movementY);
      targetElement.style.cssText = `pointer-events: none; ${isExtension ? 'overflow: visible;' : ''}`;
    };


    function targetElementHandler(e) {
      if (e.shiftKey) {
        e.preventDefault();
        document.addEventListener("mousemove", handleMoveByMouse);
        document.addEventListener("mouseup", handleEnd);
      }
    }

    // Checks for extension
    function checkForOutBox() {
      const parentElement = targetElement.closest('[id^="component-"]');
      if (parentElement.offsetWidth < targetElement.offsetWidth && !targetElement.isExpanded) {
        resetZoom();
        targetElement.isExpanded = true;
      }

      if (parentElement.offsetWidth < targetElement.offsetWidth && elemData[elementID].zoomLevel == 1) {
        resetZoom();
      }

      if (parentElement.offsetWidth < targetElement.offsetWidth && targetElement.offsetWidth * elemData[elementID].zoomLevel > parentElement.offsetWidth && elemData[elementID].zoomLevel < 1 && !targetElement.isZoomed) {
        resetZoom();
      }
    }

    if (isExtension) {
      targetElement.addEventListener("mousemove", checkForOutBox);
    }

    // Prevents sticking to the mouse
    window.onblur = function () {
      isMoving = false;
    };

    window.addEventListener('resize', (e) => {
      resetZoom();

      if (isExtension) {
        targetElement.isExpanded = false;
        targetElement.isZoomed = false;
      }
    });

    gradioApp().addEventListener("mousemove", handleMoveByKey);
    // targetElement.addEventListener("mousedown", targetElementHandler);

    // Additional trigger if the main trigger has failed
    targetElement.addEventListener("mouseup", (e) => {
      window.isDrawing = false
    })
  }

  applyZoomAndPan(elementIDs.sketch, false);
  applyZoomAndPan(elementIDs.inpaint, false);
  applyZoomAndPan(elementIDs.inpaintSketch, false);

  // Make Canvas zoom func global, like in build in extension
  // Temp disable have bugs :(
  // if (!window.applyZoomAndPan) {
  //   window.applyZoomAndPan = applyZoomAndPan
  // }

  /**
   * Adds event listeners to elements for enabling zoom and pan integration.
   * @param {string} id - The id of the main element.
   * @param {Array} elementIDs - An array of element IDs to which the event listeners should be added.
   */
  // Make the function global so that other extensions can take advantage of this solution
  const applyZoomAndPanIntegration = async (id, elementIDs) => {
    // Check if the id is meant to target an element directly or is a special case
    if (id.toLocaleLowerCase() === "none") {
      for (const elementID of elementIDs) {
        const el = await waitForElement(elementID);
        // Verify each element exists before attempting to apply zoom and pan functionalities
        if (!el) {
          console.warn(`Element ${elementID} not found.`);
          continue; // Skip to the next elementID if the current one doesn't exist
        }
        applyZoomAndPan(elementID);
      }
      return;
    }

    const mainEl = document.querySelector(id);
    // Ensure the main element exists before attaching the event listener
    if (!mainEl) {
      console.warn(`Main element ${id} not found.`);
      return;
    }

    mainEl.addEventListener("click", async () => {
      for (const elementID of elementIDs) {
        const el = await waitForElement(elementID);
        // Again, verify each dynamically awaited element exists before applying functionalities
        if (!el) {
          console.warn(`Element ${elementID} not found after click event.`);
          continue; // Skip to the next elementID if the current one doesn't exist after click
        }
        applyZoomAndPan(elementID);
      }
    }, { once: true });
  };




  // Enable Extensions Integration
  const integrateControlNet = hotkeysConfig.canvas_zoom_enable_integration;
  if (integrateControlNet) {
    // Add integration with ControlNet txt2img One TAB
    applyZoomAndPanIntegration("#txt2img_controlnet", ["#txt2img_controlnet_ControlNet_input_image"]);

    // Add integration with ControlNet img2img One TAB
    applyZoomAndPanIntegration("#img2img_controlnet", ["#img2img_controlnet_ControlNet_input_image"]);

    // Add integration with Regional Prompter
    applyZoomAndPanIntegration("#RP_main", ["#polymask"]);

    // Add integration with Latent Couple txt2img
    applyZoomAndPanIntegration("div#tab_txt2img div#script_twoshot_tabs", ["div#tab_txt2img div#script_twoshot_tabs div#twoshot_canvas_sketch"]);

    // Add integration with Latent Couple img2img
    applyZoomAndPanIntegration("div#tab_img2img div#script_twoshot_tabs", ["div#tab_img2img div#script_twoshot_tabs div#twoshot_canvas_sketch"]);

    // Add integration with Inpaint Anything      
    applyZoomAndPanIntegration("None", ["#ia_sam_image", "#ia_sel_mask"]);

    // Add by template, if you have a tab then add its class as the first argument, if you have a tab then add none at the beginning
    // Add your integration and open PR 😊

  }

  // The controlNet author has implemented this functionality in new versions
  if (!window.applyZoomAndPanIntegration && integrateControlNet) {
    // Add integration with ControlNet txt2img Tabs
    applyZoomAndPanIntegration("#txt2img_controlnet",
      Array.from({ length: 10 }, (_, i) => `#txt2img_controlnet_ControlNet-${i}_input_image`));

    // Add integration with ControlNet img2img Tabs
    applyZoomAndPanIntegration("#img2img_controlnet",
      Array.from({ length: 10 }, (_, i) => `#img2img_controlnet_ControlNet-${i}_input_image`));
  }

  // if(window.applyZoomAndPanIntegration){
  window.applyZoomAndPanIntegration = applyZoomAndPanIntegration
  // }



});
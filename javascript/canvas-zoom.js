(async () => {
  // Wait for the specified delay
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // LocalStorage functions

  // Save the config to localStorage
  function saveConfigToLocalStorage(config) {
    localStorage.setItem("hotkeysConfig", JSON.stringify(config));
  }

  // Retrieve the config from localStorage and return as an object
  function getConfigFromLocalStorage() {
    const configString = localStorage.getItem("hotkeysConfig");
    return JSON.parse(configString);
  }

  // Update the config, and save it to localStorage
  function updateConfigAndSave(key, value) {
    const config = getConfigFromLocalStorage();
    config[key] = value;
    saveConfigToLocalStorage(config);
  }
  let hotkeysConfig;
  const configFromLocalStorage = getConfigFromLocalStorage();

  if (configFromLocalStorage == null) {
    hotkeysConfig = {
      undo: "z",
      resetZoom: "r",
      overlap: "o",
      openBrushSetting: "q",
    };
    saveConfigToLocalStorage(hotkeysConfig);
  } else {
    hotkeysConfig = getConfigFromLocalStorage();
  }

  const sketchID = "#img2img_sketch";
  const inpaintID = "#img2maskimg";
  const inpaintSketchID = "#inpaint_sketch";
  const img2imgTabsID = "#mode_img2img .tab-nav";

  const [sketchEl, inpaintEl, inpaintSketchEl, img2imgTabs] = await Promise.all(
    [
      document.querySelector(sketchID),
      document.querySelector(inpaintID),
      document.querySelector(inpaintSketchID),
      document.querySelector(img2imgTabsID),
    ]
  );
  function askForHotkey() {
    const validKeys = /^[A-Za-z0-9]{1}$/; // A regex pattern to match a string containing a single alphanumeric character
    const reservedKeys = [
      hotkeysConfig.resetZoom,
      hotkeysConfig.overlap,
      hotkeysConfig.openBrushSetting,
      hotkeysConfig.undo,
    ];

    let hotkey = "";

    while (!validKeys.test(hotkey)) {
      hotkey = window.prompt("Please enter a valid hotkey:");

      if (!hotkey) {
        // User canceled the prompt
        return null;
      }

      if (!validKeys.test(hotkey)) {
        window.alert("Invalid hotkey. Please enter 1 alphanumeric character.");
      } else if (reservedKeys.includes(hotkey)) {
        window.alert(
          "This hotkey is already in use. Please enter a different hotkey."
        );
        hotkey = "";
      } else if (hotkey === " ") {
        window.alert(
          "This hotkey is not able to be used. Please enter a different hotkey."
        );
        hotkey = "";
      }
    }

    return hotkey;
  }

  function updateHotkeyAndSave(action, hotkey) {
    if (hotkey !== null) {
      hotkeysConfig[action] = hotkey;
      updateConfigAndSave(action, hotkey);
    }
  }

  const actions = {
    settings: () => {
      createModal({
        title: "Settings",
        content: "Settings content",
        actions: [{ label: "Close" }],
      });
    },
    undo: () => updateHotkeyAndSave("undo", askForHotkey()),
    resetZoom: () => updateHotkeyAndSave("resetZoom", askForHotkey()),
    overlap: () => updateHotkeyAndSave("overlap", askForHotkey()),
    openBrushSetting: () =>
      updateHotkeyAndSave("openBrushSetting", askForHotkey()),
  };

  // create an array to hold the modal elements
  const modals = [];
  function createModal({ title = "", content = "", actions = [] }) {
    // Close any existing modals
    modals.forEach((modal) => modal.remove());
    // Create modal elements
    const modal = document.createElement("div");
    const modalOverlay = document.createElement("div");
    const modalContainer = document.createElement("div");
    const modalTitle = document.createElement("h3");
    const modalContent = document.createElement("div");
    const modalActions = document.createElement("div");

    // Set class names
    modal.className = "modal";
    modalOverlay.className = "modal-overlay";
    modalContainer.className = "modal-container";
    modalTitle.className = "modal-title";
    modalContent.className = "modal-content";
    modalActions.className = "modal-actions";

    // Set the title and content
    modalTitle.textContent = title;
    modalContent.innerHTML = content;

    // Add actions
    actions.forEach((action) => {
      const button = document.createElement("button");
      button.textContent = action.label;
      button.className = action.class || "";

      modalActions.appendChild(button);
      // add the modal to the modals array
      modals.push(modal);
    });

    // Assemble the modal
    modalContainer.appendChild(modalTitle);
    modalContainer.appendChild(modalContent);
    modalContainer.appendChild(modalActions);
    modal.appendChild(modalOverlay);
    modal.appendChild(modalContainer);
    document.body.appendChild(modal);

    // Close the modal
    function closeModal() {
      modal.remove();
    }

    // Close the modal when clicking outside the container
    modalOverlay.addEventListener("click", closeModal);
    return modal;
  }

  const contextMenu = (() => {
    const menu = document.createElement("div");
    menu.style.listStyleType = "None";
    menu.className = "context-menu";
    menu.style.zIndex = "99999";
    document.body.appendChild(menu);
    return menu;
  })();

  const generateContextMenuItems = (items) =>
    items
      .map(
        (item) =>
          `<li data-action="${item.action}">
             <span><b>${item.hotkey.toUpperCase()}</b></span>
             ${item.label}
           </li>`
      )
      .join("");

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
          hotkey: "⚙", // The hotkey to display next to the item in this case. It's the gear icon
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
          action: "openBrushSetting",
          hotkey: hotkeysConfig.openBrushSetting,
          label: "Open color panel",
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
  let timeoutId;
  contextMenu.addEventListener("mouseleave", () => {
    // Set the timer for 1 second, after which the item will disappear
    timeoutId = setTimeout(() => {
      contextMenu.style.display = "none";
    }, 200);
  });

  contextMenu.addEventListener("mouseenter", () => {
    // If the mouse returns to an item before the timer has expired, cancel it
    clearTimeout(timeoutId);
  });

  /**
   * Trigger undo action on the active tab when Ctrl + Z is pressed.
   * @param {string} elemId - The ID of the element to target.
   */
  function undoActiveTab(elemId) {
    document.addEventListener("keydown", (e) => {
      const isUndoKey =
        e.key.toLowerCase() === hotkeysConfig.undo.toLowerCase();
      const isCtrlPressed = e.ctrlKey;

      if (isUndoKey && isCtrlPressed) {
        e.preventDefault();
        const undoBtn = document.querySelector(
          `${elemId} button[aria-label="Undo"]`
        );
        if (undoBtn) {
          undoBtn.click();
        }
      }
    });
  }

  /**
   * Apply zoom and pan functionality to a target element.
   * @param {HTMLElement} targetElement - The element to apply zoom and pan functionality to.
   * @param {string} elemId - The ID of the element to target.
   */
  function applyZoomAndPan(targetElement, elemId) {
    let [zoomLevel, panX, panY] = [1, 0, 0];

    function toggleBrushPanel() {
      let colorId;
      // Get active tab to avoid some bug
      function getActiveTab() {
        const tabs = img2imgTabs.querySelectorAll("button");

        for (let tab of tabs) {
          if (tab.classList.contains("selected")) {
            return tab;
          }
        }
      }
      const activeTab = getActiveTab();
      // Select current color panel
      if (activeTab.innerText === "Sketch") {
        colorId = sketchID;
      } else if (activeTab.innerText === "Inpaint sketch") {
        colorId = inpaintSketchID;
      } else {
        return;
      }

      const colorBtn = document.querySelector(
        `${colorId} button[aria-label="Select brush color"]`
      );

      const colorInput = document.querySelector(
        `${colorId} input[aria-label="Brush color"]`
      );

      if (!colorInput) {
        colorBtn ? colorBtn.click() : null;
      }

      // Open color menu
      setTimeout(() => {
        const colorInput = document.querySelector(
          `${colorId} input[aria-label="Brush color"]`
        );
        colorInput ? colorInput.click() : colorBtn;
      }, 0);
    }

    function resetZoom() {
      zoomLevel = 1;
      panX = 0;
      panY = 0;
      targetElement.style.transform = `scale(${zoomLevel}) translate(${panX}px, ${panY}px)`;
    }

    function toggleOverlap() {
      const zIndex1 = "0";
      const zIndex2 = "99999";

      targetElement.style.zIndex =
        targetElement.style.zIndex !== zIndex2 ? zIndex2 : zIndex1;
    }

    //Toggle overlap when click on box modal by right mouse
    // Thanks XpucT for idea
    const modalBoxEl = document.querySelector("#lightboxModal");

    modalBoxEl.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      toggleOverlap();
    });

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

    /**
     * Disable overlap when open context menu open
     **/
    // targetElement.addEventListener("contextmenu", (e) => {
    //   e.preventDefault();
    //   targetElement.style.zIndex = 0;
    // });

    undoActiveTab(elemId);

    // Reset zoom when pressing R key and toggle overlap when pressing O key
    // Open brush panel when pressing Q
    document.addEventListener("keydown", (e) => {
      switch (e.key.toLowerCase()) {
        case hotkeysConfig.resetZoom:
          resetZoom();
          break;
        case hotkeysConfig.overlap:
          toggleOverlap();
          break;
        case hotkeysConfig.openBrushSetting:
          toggleBrushPanel();
          break;
      }
    });

    // Reset zoom when click on another tab
    img2imgTabs.addEventListener("click", (e) => {
      if (e.target.classList.contains("svelte-1g805jl")) {
        toggleOverlap(false);
        resetZoom();
      }
    });

    targetElement.addEventListener("wheel", (e) => {
      if (e.shiftKey) {
        e.preventDefault();

        // Handle zooming with shift key pressed
        const startZoomLevel = zoomLevel;

        // Calculate new zoom level based on scroll direction and current zoom level
        // - Add or subtract 0.1 if the zoom level is below 3
        // - Add or subtract 0.5 if the zoom level is 3 or above
        const delta = zoomLevel >= 3 ? 0.5 : 0.1;
        zoomLevel =
          e.deltaY > 0 ? startZoomLevel - delta : startZoomLevel + delta;

        // Clamp the zoom level between 0.5 and 10
        zoomLevel = Math.max(0.5, Math.min(zoomLevel, 10));

        // Update the target element's transform property to apply the new zoom level
        targetElement.style.transform = `scale(${zoomLevel}) translate(${panX}px, ${panY}px)`;
      } else if (e.ctrlKey) {
        e.preventDefault();
        // Handle brush size adjustment with ctrl key pressed
        // Increase or decrease brush size based on scroll direction
        adjustBrushSize(elemId, e.deltaY);
      }
    });

    /**
     * Handle the move event for pan functionality. Updates the panX and panY variables and applies the new transform to the target element.
     * @param {MouseEvent} e - The mouse event.
     */
    function handleMove(e) {
      e.preventDefault();
      panX += e.movementX;
      panY += e.movementY;
      targetElement.style.transform = `scale(${zoomLevel}) translate(${panX}px, ${panY}px)`;
      targetElement.style.pointerEvents = "none";
    }

    /**
     * Handle the end event for pan functionality. Removes the event listeners. Enables pointer events.
     */
    function handleEnd() {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleEnd);
      targetElement.style.pointerEvents = "auto";
    }
    targetElement.addEventListener("mousedown", (e) => {
      if (e.shiftKey) {
        e.preventDefault();
        document.addEventListener("mousemove", handleMove);
        document.addEventListener("mouseup", handleEnd);
      }
    });
  }

  applyZoomAndPan(sketchEl, sketchID);
  applyZoomAndPan(inpaintEl, inpaintID);
  applyZoomAndPan(inpaintSketchEl, inpaintSketchID);
})();

(async () => {
  // Wait for the specified delay
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const hotkeysConfig = {
    undo: "z",
    resetZoom: "r",
    overlap: "o",
    openBrushSettingHotkey: "q",
  };

  const sketchID = "#img2img_sketch";
  const inpaintID = "#img2maskimg";
  const inpaintSketchID = "#inpaint_sketch";
  const img2imgTabsID = "#mode_img2img .tab-nav";

  const [sketchEl, inpaintEl, inpaintSketchEl, img2imgTabs] = await Promise.all([
    document.querySelector(sketchID),
    document.querySelector(inpaintID),
    document.querySelector(inpaintSketchID),
    document.querySelector(img2imgTabsID),
  ]);
  function askForHotkey() {
    const validKeys = /^[A-Za-z0-9]{1}$/; // A regex pattern to match a string containing a single alphanumeric character
    const reservedKeys = [
      hotkeysConfig.resetZoom,
      hotkeysConfig.overlap,
      hotkeysConfig.openBrushSettingHotkey,
      hotkeysConfig.undo
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
        window.alert("This hotkey is already in use. Please enter a different hotkey.");
        hotkey = "";
      } else if (hotkey === " ") {
        window.alert("This hotkey is not able to be used. Please enter a different hotkey.");
        hotkey = "";
      }
    }
  
    return hotkey;
  }
  
  // Define action functions for modal creation
  const actions = {
    settings: () => {
      createModal({
        title: "Settings",
        content: "Settings content",
        actions: [
          {
            label: "Close",
          },
        ],
      });
    },
    undo: () => {
      const hotkey = askForHotkey();
      if (hotkey !== null) {
        // Update the hotkey in the config
        hotkeysConfig.undo = hotkey;
      }
    },
    resetZoom: () => {
      const hotkey = askForHotkey();
      if (hotkey !== null) {
        // Update the hotkey in the config
        hotkeysConfig.resetZoom = hotkey;
      }
    },
    overlap: () => {
      const hotkey = askForHotkey();
      if (hotkey !== null) {
        // Update the hotkey in the config
        hotkeysConfig.overlap = hotkey;
      }
    },
};

// create an array to hold the modal elements
const modals = [];
function createModal({ title = '', content = '', actions = [] }) {
  // Close any existing modals
  modals.forEach(modal => modal.remove());
  // Create modal elements
  const modal = document.createElement('div');
  const modalOverlay = document.createElement('div');
  const modalContainer = document.createElement('div');
  const modalTitle = document.createElement('h3');
  const modalContent = document.createElement('div');
  const modalActions = document.createElement('div');

  // Set class names
  modal.className = 'modal';
  modalOverlay.className = 'modal-overlay';
  modalContainer.className = 'modal-container';
  modalTitle.className = 'modal-title';
  modalContent.className = 'modal-content';
  modalActions.className = 'modal-actions';

  // Set the title and content
  modalTitle.textContent = title;
  modalContent.innerHTML = content;

  // Add actions
  actions.forEach(action => {
    const button = document.createElement('button');
    button.textContent = action.label;
    button.className = action.class || '';

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
  modalOverlay.addEventListener('click', closeModal);
  return modal;
}



const contextMenu = (() => {
  const menu = document.createElement("div");
  menu.className = "context-menu";
  document.body.appendChild(menu);
  return menu;
})();

const generateContextMenuItems = (items) =>
  items
    .map(
      (item) =>
        `<li data-action="${item.action}">
             <span>${item.hotkey.toUpperCase()}</span>
             ${item.label}
           </li>`
    )
    .join("");

document.addEventListener("contextmenu", (e) => {
  let menuItems = [];
  if (e.target.closest(sketchID)) {
    e.preventDefault();
    menuItems = [
      {
        action: "settings", // The action to perform when the item is clicked
        hotkey: "⚙", // The hotkey to display next to the item in this case. It's the gear icon
        label: "Settings", // The text to display for the item
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
    ];
  } else if (e.target.closest(inpaintID) || e.target.closest(inpaintSketchID)) {
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
    actions[action]()
  }
});

// Hide the context menu on left-click
document.addEventListener("click", () => {
  contextMenu.style.display = "none";
});

/**
 * Trigger undo action on the active tab when Ctrl + Z is pressed.
 * @param {string} elemId - The ID of the element to target.
 */
function undoActiveTab(elemId) {
  document.addEventListener("keydown", (e) => {
    // undo based on hotkeys config upper and lower case
    if (e.key === hotkeysConfig.undo || e.key === hotkeysConfig.undo.toUpperCase()) {
      if (e.ctrlKey) {
        const undoBtn = document.querySelector(
          `${elemId} button[aria-label="Undo"]`
        );
        if (undoBtn) {
          undoBtn.click();
        }
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


  // helper functions
  /**
   * Reset zoom and pan to default values.
   */
  function resetZoom() {
    zoomLevel = 1;
    panX = 0;
    panY = 0;
    targetElement.style.transform = `scale(${zoomLevel}) translate(${panX}px, ${panY}px)`;
  }

  /**
   * Toggle element overlap.
   * @param {boolean} [overlap=true] - Whether to overlap elements or not.
   */
  function toggleOverlap(overlap = true) {
    const zIndex1 = "0";
    const zIndex2 = "99999";

    if (overlap === false) {
      targetElement.style.zIndex = zIndex1;
      return;
    }

    targetElement.style.zIndex =
      targetElement.style.zIndex !== zIndex2 ? zIndex2 : zIndex1;
  }

  /**
   * Adjust brush size.
   * @param {string} elemId - The ID of the element to target.
   * @param {number} deltaY - The scroll delta.
   */
  function adjustBrushSize(elemId, deltaY) {
    const input = document.querySelector(`${elemId} input[aria-label='Brush radius']`);

    if (input == null) {
      document.querySelector(`${elemId} button[aria-label="Use brush"]`).click();
    }

    let value = parseFloat(input.value);
    value += deltaY > 0 ? -3 : 3;
    input.value = value;
    const changeEvent = new Event("change");
    input.dispatchEvent(changeEvent);
  }

  undoActiveTab(elemId);

  // Reset zoom when pressing R key and toggle overlap when pressing O key
  document.addEventListener("keydown", (e) => {
    // use hotkeys config upper and lower case
    if (e.key === hotkeysConfig.resetZoom || e.key === hotkeysConfig.resetZoom.toUpperCase()) {
      resetZoom();
    }
    if (e.key === hotkeysConfig.toggleOverlap || e.key === hotkeysConfig.toggleOverlap.toUpperCase()) {
      toggleOverlap();
    }
  });

  // Open brush colors
  document.addEventListener("keypress", (e) => {
    // use hotkeys config upper and lower case
    if (e.key === hotkeysConfig.brushColors || e.key === hotkeysConfig.brushColors.toUpperCase()) {
      const colorBtn = document.querySelector(
        `${elemId} button[aria-label="Select brush color"]`
      );

      if (!colorBtn) {
        return;
      } else {
        colorBtn.click();
      }
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
      zoomLevel = e.deltaY > 0 ? startZoomLevel - delta : startZoomLevel + delta;

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
}) ();
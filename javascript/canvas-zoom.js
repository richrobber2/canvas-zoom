setTimeout(function () {
  const sketchID = "#img2img_sketch";
  const inpaintID = "#img2maskimg";
  const inpaintSketchID = "#inpaint_sketch";
  const img2imgTabsID = "#mode_img2img .tab-nav";

  const sketchEl = document.querySelector(sketchID);
  const inpaintEl = document.querySelector(inpaintID);
  const inpaintSketchEl = document.querySelector(inpaintSketchID);
  const img2imgTabs = document.querySelector(img2imgTabsID);

  // undo by Ctr-Z
  function undoActiveTab(elemId) {
    document.addEventListener("keydown", (e) => {
      if (e.key === "z" || e.key === "Z" || e.key === "я" || e.key === "Я") {
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

  function applyZoomAndPan(targetElement, elemId) {
    let [zoomLevel, panX, panY] = [1, 0, 0];

    // Reset zoom to Default
    function resetZoom() {
      zoomLevel = 1;
      panX = 0;
      panY = 0;
      targetElement.style.transform = `scale(${zoomLevel}) translate(${panX}px, ${panY}px)`;
    }

    // Overlap all elemnts
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

    // Reset when close img
    undoActiveTab(elemId);

    // Reset zoom by press R and overlap elements by O
    document.addEventListener("keydown", (e) => {
      if (e.key === "r" || e.key === "R" || e.key === "к" || e.key === "К") {
        resetZoom();
      }
      if (e.key === "o" || e.key === "O" || e.key === "щ" || e.key === "Щ") {
        toggleOverlap();
      }
    });

    // open brush colors
    document.addEventListener("keypress", (e) => {
      if (e.key == "Q" || e.key == "q" || e.key == "й" || e.key == "Й") {
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

        // handle zooming here panning will be handled by the mousemove event
        const startZoomLevel = zoomLevel;

        // Calculate new zoom level + or - 0.1 based on direction of scroll amount should change based on zoom level if above 5 then 0.5 if below 5 then 0.1
        const delta = zoomLevel > 3 ? 0.5 : 0.1;
        zoomLevel =
          e.deltaY > 0 ? startZoomLevel - delta : startZoomLevel + delta;

        // max and min zoom level using clamp min is 0.5 and max is 10
        zoomLevel = Math.min(Math.max(0.5, zoomLevel), 10);

        // update the zoom level
        targetElement.style.transform = `scale(${zoomLevel}) translate(${panX}px, ${panY}px)`;
      }
      if (e.ctrlKey) {
        e.preventDefault();

        const input = document.querySelector(
          `${elemId} input[aria-label='Brush radius']`
        );

        if (input == null) {
          document
            .querySelector(`${elemId} button[aria-label="Use brush"]`)
            .click();
        }

        let value = parseFloat(input.value);
        value += e.deltaY > 0 ? -3 : 3;
        input.value = value;
        const changeEvent = new Event("change");
        input.dispatchEvent(changeEvent);
      }
    });

    function handleMove(e) {
      e.preventDefault();
      panX += e.movementX;
      panY += e.movementY;
      targetElement.style.transform = `scale(${zoomLevel}) translate(${panX}px, ${panY}px)`;
      targetElement.style.pointerEvents = "none";
    }

    function handleEnd() {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleEnd);
      targetElement.style.pointerEvents = "auto";
      targetElement.addEventListener("mouseleave", handleundo);
    }

    function handleundo() {
      document.removeEventListener("mouseleave", handleundo);
      document
        .querySelector(`${elemId} .svelte-s6ybro button:nth-child(1)`)
        .click();
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
}, 3000);

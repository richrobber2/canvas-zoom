// uses timeout because it does not load when it does not have this and i cant seem to use onload events probably because most things seem to be handled by javascript
setTimeout(function () {
  const element = document.querySelector("body > gradio-app").shadowRoot.querySelector("#img2maskimg");
  let [zoomLevel, panX, panY] = [1, 0, 0];
  element.addEventListener("wheel", (e) => {
    if (e.shiftKey) {
      e.preventDefault();

      // handle zooming here panning will be handled by the mousemove event
      const startZoomLevel = zoomLevel;

      // Calculate new zoom level + or - 0.1 based on direction of scroll amount should change based on zoom level if above 5 then 0.5 if below 5 then 0.1
      const delta = zoomLevel > 3 ? 0.5 : 0.1;
      zoomLevel = e.deltaY > 0 ? startZoomLevel - delta : startZoomLevel + delta;

      // max and min zoom level using clamp min is 0.5 and max is 10
      zoomLevel = Math.min(Math.max(0.5, zoomLevel), 10);

      // update the zoom level
      element.style.transform = `scale(${zoomLevel}) translate(${panX}px, ${panY}px)`;
    }
    if (e.ctrlKey) {
      e.preventDefault();

      const input = document.querySelector("body > gradio-app").shadowRoot.querySelector("#img2maskimg > div.h-60.bg-gray-200 > div > div.z-50.top-10.right-2.justify-end.flex.gap-1.absolute > span > input")
      if (input == null) {
        document.querySelector("body > gradio-app").shadowRoot.querySelector("#img2maskimg > div.h-60.bg-gray-200 > div > div.z-50.top-10.right-2.justify-end.flex.gap-1.absolute > span > button").click();
      }
      let value = parseFloat(input.value);
      value += e.deltaY > 0 ? -3 : 3;
      input.value = value;
      const changeEvent = new Event('change');
      input.dispatchEvent(changeEvent);
    }
  });

  function handleMove(e) {
    e.preventDefault();
    panX += e.movementX;
    panY += e.movementY;
    element.style.transform = `scale(${zoomLevel}) translate(${panX}px, ${panY}px)`;
    element.style.pointerEvents = "none";
  }

  function handleEnd() {
    document.removeEventListener("mousemove", handleMove);
    document.removeEventListener("mouseup", handleEnd);
    element.style.pointerEvents = "auto"; 
  }
  function handleundo() {
    document.removeEventListener("mouseleave", handleundo);
    document.querySelector("body > gradio-app").shadowRoot.querySelector("#img2maskimg > div.h-60.bg-gray-200 > div > div.z-50.top-2.right-2.justify-end.flex.gap-1.absolute > button:nth-child(1)").click();
  }

  element.addEventListener("mousedown", (e) => {
    if (e.shiftKey) {
      e.preventDefault();
      document.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseup", handleEnd);
      element.addEventListener("mouseleave", handleundo);
    }
  });
}, 3000);
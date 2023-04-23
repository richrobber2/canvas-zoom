// Here you can customize the hotkeys and use the context menu to load them immediately.
// You can transfer this file to another person so that he can use your settings.
// Reload the page after changing the settings.

/*
The following hotkeys are available:

undo: Undo the last action
resetZoom: Reset the zoom level
overlap: Toggle the overlap mode
fitToScreen: Fit the canvas to the screen
openBrushSetting: Open the brush settings
openBrushPanelUnderMouse: Open the brush panel next to the mouse
moveKey: Move the canvas
toggleCanvasOpacity: Toggle the canvas opacity
toggleBrushOpacity: Toggle the brush opacity
togglePipette: Toggle the pipette
brushOpacity: Set the brush opacity
canvasOpacity: Set the canvas opacity
brushOutline: Toggle the brush outline

*/

// Opacity level:
// 0.1 = Very transparent
// 0.9 = Barely transparent

// Change the last letter to the one you want.
// For example: "KeyR" = change "R" to any letter you want
// change brushOutline to true or false

const customHotkeys = {
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

// Don't change anything below this line
localStorage.setItem("customHotkeyConfig", JSON.stringify(customHotkeys));

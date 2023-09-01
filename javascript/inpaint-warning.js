function createToast() {
  const toast = document.createElement("div");
  toast.id = "toast";
  toast.className = "toast";
  toast.textContent = "Warning, you are now using the INPAINT model";
  document.body.appendChild(toast);
  return toast;
}

function createInpaintButton() {
  const button = document.createElement("div");
  button.className = "inpaint-button";
  button.textContent = "🎨";
  button.style.fontSize = "14px";
  button.style.background = "#1b2636";
  button.style.color = "white";
  button.style.border = "1px solid white";
  button.style.minWidth = "1px";
  button.style.display = "none";

  button.style.padding = "0px 4px";

  button.style.justifyContent = "center";
  button.style.alignItems = "center";

  button.classList.add("gradio-button", "tool");

  // Add tooltip
  const tooltipText = "Inpaint model is currently selected";
  button.setAttribute("title", tooltipText);

  return button;
}

function darkenColor(color, amount) {
  const num = parseInt(color.slice(1), 16);
  const r = Math.max((num >> 16) - amount, 0);
  const g = Math.max(((num >> 8) & 0x00ff) - amount, 0);
  const b = Math.max((num & 0x0000ff) - amount, 0);

  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

function getSelectedButtonValue(tabNav) {
  const selectedButton = tabNav.querySelector(".selected");
  return selectedButton ? selectedButton.textContent.trim() : null;
}

function showToastOrNot(tabName) {
  if (tabName === "img2img") {
    return true;
  }

  if (tabName === "Sketch") {
    return true;
  }

  if (tabName === "Batch") {
    return true;
  }

  return false;
}

// Wait until opts loaded
async function waitForOpts() {
  for (;;) {
    if (window.opts && Object.keys(window.opts).length) {
      return window.opts;
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}

function addHoverStyle(normalColor, hoverColor) {
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = `
      .generate-btn {
        background-color: ${normalColor};
      }
      .generate-btn:hover {
        background-color: ${hoverColor};
      }
    `;
  document.head.appendChild(style);
}

function setButtonHoverColor(button, normalColor, hoverColor) {
  button.addEventListener("mouseenter", () => {
    button.style.background = hoverColor;
  });

  button.addEventListener("mouseleave", () => {
    button.style.background = normalColor;
  });
}

function customizeButton(button, normalColor, hoverColor) {
  button.style.background = normalColor;
  button.style.border = normalColor;

  setButtonHoverColor(button, normalColor, hoverColor);
}

function updateButtonColors(buttons, enableBtnColor, normalColor, hoverColor) {
  buttons.forEach((button) => {
    if (enableBtnColor) {
      customizeButton(button, normalColor, hoverColor);
    } else {
      button.style.background = "";
      button.style.border = "";
      setButtonHoverColor(button, "", "");
    }
  });
}

function showToast() {
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 5000);
}

// The function that will be called when the input value changes
const handleInputChange = (input, inpaintingPattern, inpaintButton) => {
  const modelClass = input.value;
  if (inpaintingPattern.test(modelClass)) {
    inpaintButton.style.display = "flex";
  } else {
    inpaintButton.style.display = "none";
  }
};

onUiLoaded(async () => {
  const opts = await waitForOpts();

  const preConfig = {
    canvas_zoom_inpaint_warning: true,
    canvas_zoom_inpaint_label: true,
    canvas_zoom_inpaint_change_btn_color: false,
    canvas_zoom_inpaint_btn_color: "#C33227",
  };

  const config = {
    ...preConfig,
    ...opts,
  };

  const txt2imgGenerateBtn = document.querySelector("#txt2img_generate");
  const img2imgGenerateBtn = document.querySelector("#img2img_generate");
  const input = document.querySelector("#setting_sd_model_checkpoint input");
  const quickSettings = document.querySelector("#quicksettings button");
  const inpaintButton = createInpaintButton();
  const toast = createToast();

  const buttons = [txt2imgGenerateBtn, img2imgGenerateBtn];

  const enableWarning = config.canvas_zoom_inpaint_warning;
  const enableLabel = config.canvas_zoom_inpaint_label;
  const enableBtnColor = config.canvas_zoom_inpaint_change_btn_color;

  const inpaintingPattern = /(?:inpainting|inpaint)/i;
  const normalColor = config.canvas_zoom_inpaint_btn_color;
  const hoverColor = darkenColor(normalColor, 20);

  if (enableLabel) {
    quickSettings.insertAdjacentElement("beforebegin", inpaintButton);
    handleInputChange(input, inpaintingPattern, inpaintButton)
  }

  if (enableBtnColor) {
    if (inpaintingPattern.test(input.value)) {
      updateButtonColors(buttons, true, normalColor, hoverColor);
    } 
  }

  

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      // if (mutation.type === "attributes" && mutation.attributeName === "class") {
  
        setTimeout(() => { // delay check for 3 seconds
          // console.log(input.value)
          if (enableLabel) {
            handleInputChange(input, inpaintingPattern, inpaintButton);
          }
  
          if (enableBtnColor) {
            const modelClass = input.value;
            if (inpaintingPattern.test(modelClass)) {
              // Enable button colors
              updateButtonColors(buttons, true, normalColor, hoverColor);
            } else {
              // Disable button colors
              updateButtonColors(buttons, false, normalColor, hoverColor);
            }
          }
        }, 3000);
  
      }
    // }
  });
  
  // Beginning Observation
  observer.observe(input, { attributes: true });

  txt2imgGenerateBtn.addEventListener("click", () => {
    const modelClass = input.value;
    if (inpaintingPattern.test(modelClass)) {
      if (enableWarning) {
        showToast();
      }
    }
  });
});

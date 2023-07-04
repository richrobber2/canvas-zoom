function createToast() {
    const toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    toast.textContent = "Warning, you are now using the INPAINT model";
    document.body.appendChild(toast);
    return toast;
}

function createInpaintButton() {
    const button = document.createElement('div');
    button.className = 'inpaint-button';
    button.textContent = 'Inpaint'; 
    button.style.fontSize = '14px';
    button.style.background = '#1b2636';
    button.style.color = 'white';
    button.style.border = '1px solid white';
    button.style.minWidth = '1px';
    button.style.display = 'none';

    button.style.padding = '0px 4px';

    button.style.justifyContent = 'center';
    button.style.alignItems = 'center';


    button.classList.add("gradio-button","tool")
    return button;
}
function getSelectedButtonValue(tabNav) {
    const selectedButton = tabNav.querySelector('.selected');
    return selectedButton ? selectedButton.textContent.trim() : null;
}

function showToastOrNot(tabName) {
    if(tabName === "img2img"){
        return true;
    }

    if(tabName === "Sketch"){
        return true;
    }

    if(tabName === "Batch"){
        return true;
    }

    return false
}

// Wait until opts loaded
async function waitForOpts() {
    for (;;) {
        if (window.opts && Object.keys(window.opts).length) {
            return window.opts;
        }
        await new Promise(resolve => setTimeout(resolve, 100));
    }
}

onUiLoaded(async () => {
    const opts = await waitForOpts();

    const enableWarning = opts.canvas_zoom_inpaint_warning;

    if (enableWarning) {
    const txt2imgGenerateBtn = document.querySelector('#txt2img_generate');
    // const img2imgGenerateBtn = document.querySelector('#img2img_generate');
    const input = document.querySelector('#setting_sd_model_checkpoint input');
    const quickSettings  = document.querySelector('#quicksettings button');

    const inpaintButton = createInpaintButton();
    quickSettings .insertAdjacentElement("beforebegin", inpaintButton);

    // const mainTabs = document.querySelector('#tabs .tab-nav');

    const toast = createToast();
    const inpaintingPattern = /(?:inpainting|inpaint)/i;

    console.log(input)

    function showToast() {
        console.log("show toast")
        toast.classList.add("show");
        setTimeout(() => {
            toast.classList.remove("show");
        }, 5000);
    }

    // The function that will be called when the input value changes
    const handleInputChange = () => {
        const modelClass = input.value;
        if (inpaintingPattern.test(modelClass)) {
            inpaintButton.style.display = "flex";
        } else {
            inpaintButton.style.display = "none";
        }
    };

    // Creating an Observer
    const observer = new MutationObserver((mutations) => {
        console.log(mutations)
        for (const mutation of mutations) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                handleInputChange();
            }
        }
    });

    // Beginning Observation
    observer.observe(input, { attributes: true });

    txt2imgGenerateBtn.addEventListener("click", () => {
        const modelClass = input.value;
        if (inpaintingPattern.test(modelClass)) {
            showToast();
        }
    });

}
});
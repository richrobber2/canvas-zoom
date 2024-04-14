# Canvas Zoom

An extension of [stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui)

Adds the ability to zoom into Inpaint, Sketch, and Inpaint Sketch.

**The extension supports webui version [1.1](https://github.com/AUTOMATIC1111/stable-diffusion-webui/releases/tag/v1.1.0), [1.2](https://github.com/AUTOMATIC1111/stable-diffusion-webui/releases/tag/v1.2.0),[1.3](https://github.com/AUTOMATIC1111/stable-diffusion-webui/releases/tag/v1.3.0)**

**The extension is fully compatible with webui version [1.4](https://github.com/AUTOMATIC1111/stable-diffusion-webui/releases/tag/v1.4.0), [1.5](https://github.com/AUTOMATIC1111/stable-diffusion-webui/releases/tag/v1.5.0), [1.6](https://github.com/AUTOMATIC1111/stable-diffusion-webui/releases/tag/v1.6.0) and the built-in canvas-zoom-and-pan extension. However, I still recommend that you disable the built-in.**

Canvas Zoom supports integration with other popular extensions: **ControlNet**, **Regional Prompter** **Latent Couple(Two Shot)** and **Inpaint Anything**. 
More details [here](https://github.com/richrobber2/canvas-zoom/discussions/42#discussioncomment-6102485)

https://github.com/richrobber2/canvas-zoom/assets/22278673/1f666443-34bc-421e-8edc-e4eaa22722a6

## Important Notes

**Webui versions earlier than March 25th are not supported**

**If extension does not work check the troubleshooting page https://github.com/richrobber2/canvas-zoom/wiki/Troubleshooting**

**You can check out the features of this extension in [canvas-zoom-showcase](https://github.com/richrobber2/canvas-zoom/wiki/Functionality)**

**The extension description also available in [Russian](https://github.com/richrobber2/canvas-zoom/wiki/Russian) language:**

# EN

You can edit the hotkeys as you want, to do this you need to go into the settings.

Canvas zoom works on a modified version of gradio 3.31 or 3.23 for versions below 1.1, you can read all the details in the dist folder

The hotkeys only work in the image area

## Default hotkeys:

### Important hotkeys: Zoom (Shift+wheel) , Move Canvas (F) , Full Screen (S), and Reset Zoom (R).

**Shift + wheel** - Zoom canvas

**Ctr + wheel** - Change brush size

**Ctr-Z** - Undo last action

**F (hold)** - Move canvas

**S** - Fullscreen mode, zoom in on the canvas so that it fits into the screen.

**R** - Reset Zoom.

**Q** - Open/Close color panel

**T** - Open color panel right above the mouse.

**H** - Fill the entire canvas with brush color ( Works in Sketch and Inpaint Sketch )

**A** - Toggle dropper ( Works in Sketch and Inpaint Sketch )

**O** - Overlap all elements and back

**C** - Toggle mask transparency mode ( Works only in Inpaint )

**[** - Increase brush size

**]** - Decrease brush size

In transparency mode, you can paint but the effect will not be what you expect, this mode is useful to see how the mask fits on the picture.

### Additional hotkeys

**Shift + wheel (hold)** - Move canvas

**Shift + "+" or Shift + "-"** - Scale canvas ( numpad keys also work )

## Features

1. You can fix the color bar wherever you want, for this purpose point the mouse on the place you want and press "T" and then every time you press "Q" the color bar will open in this place. If you click on the button in the right corner, the panel will reset and work as it should.

2. If you zoom in on a picture that is too wide to fit in the window, pressing "S" will magnify it to full screen width without the scroll bar.

3. You can add a white outline to the brush to better see its borders. You can turn it on in the settings

4. You can select the color of the mask in Inpaint and the color of all your lines will change to the color of the mask

5. In img2img in all tabs a new button "📏" has been added next to the width and height sliders. This button allows you to get the real width and height of the picture in 1 click. Removed from webui 1.3 and higher because a native solution is now available.

6. If you are using ControlNet, you can enable integration with the extension in the settings. After enabling it, reload the page

7. You can choose the default color of the mask in Inpaint, you can change the color of the mask in the settings.

8. In the settings you can turn off the tooltip and functionality that you do not need

9. You can adjust the size of the maximum size of the brush and the ability to change the % by which it is changed

## Known bugs:

1. If a white image appears when you cancel on the Hotkey, press the cancel hotkey again and the image will return.

2. This is not my bug, the problem is related to webui automatic1111. If you send a picture to Sketch or Inpaint Sketch via buttons, the undo last action on the hotkey and on the button breaks. What to avoid this problem: you can load the picture directly, via drag and drop or via copy and paste. **The problem is solved in the latest update, but only works on hotkeys ( Ctr+Z )**

3. This is not my bug, the problem is with webui automatic1111. If you draw something in Sketch, Inpaint, Inpaint Sketch and then switch to another tab, when you go back and what else you draw, undo will undo on the previous 2 actions, the last one before the switch and the last one after.

4. This is not my bug, the problem is with webui automatic1111. When the browser scale is more or less than 100%, Sketch and Inpaint Sketch break if you send an image to them via buttons. Change the browser and windows scale to 100% and everything will be fine.

5. This is not my bug, the problem is with webui automatic1111. If you don't close the image in inpaint and transfer it to inpaint again in any way, the mask remains. **The problem was solved in the latest update**

## Credits

Thanks to everyone who supported this extension, everyone who gave ideas for this project. 

Special thanks to [richrobber2](https://github.com/richrobber2) for his idea, which later I ([daswer123](https://github.com/daswer123)) was able to strongly develop. 

I would also like to thank separately the author of popular models: Deliberate and Reliberate, the person under the nickname [XpucT](https://www.youtube.com/@XpucT) for supporting the project at an early stage of development.

Thanks to the [AI Diffusion](https://discord.gg/xpuct) community on discord for support.

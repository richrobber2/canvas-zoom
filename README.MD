An extension of [stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui)

Adds the ability to zoom into Inpaint, Sketch, and Inpaint Sketch.

Shortcuts:

**Shift + wheel(hold)** - Move canvas

**Shift + wheel** - Scale canvas

**Ctr + wheel** - Change brush size

**R** - Reset Zoom.

**O** - Overlap all elements and back

**Ctr-Z** - Undo last action

**Known bugs:**

1. If you click on the cross and delete the picture in zoom mode, there is a chance that the picture will be cropped. It is necessary to click on the cross and load the picture again without zooming, then everything will work as it should.

2. Not my bug, the problem is with automatic1111. If you make something in sketch, then send it to inpaint or inpaint sketch , it breaks undo via shortcut and button. You need to delete the picture and load it back into the window, then everything will work

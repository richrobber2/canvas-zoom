import gradio as gr
from modules import shared

shared.options_templates.update(shared.options_section(('canvas_zoom', "Canvas Zoom"), {
    "canvas_hotkey_move": shared.OptionInfo("F", "Moving the canvas"),
    "canvas_hotkey_fullscreen": shared.OptionInfo("S", "Fullscreen Mode, maximizes the picture so that it fits into the screen and stretches it to its full width "),
    "canvas_hotkey_reset": shared.OptionInfo("R", "Reset zoom and canvas positon"),
    "canvas_zoom_hotkey_open_colorpanel": shared.OptionInfo("Q", "Quickly open the color panel"),
    "canvas_zoom_hotkey_pin_colorpanel": shared.OptionInfo("T", "Attach the color panel to the mouse "),
    "canvas_zoom_hotkey_dropper": shared.OptionInfo("A", "Toggle dropper ( Works in Sketch and Inpaint Sketch )"),
    "canvas_zoom_hotkey_fill": shared.OptionInfo("H", "Fill the canvas with brush color ( works in sketch/inpaint sketch )"),
    "canvas_zoom_hotkey_transparency": shared.OptionInfo("C", "Activate transparency mode (works only in Inpaint)"),
    "canvas_hotkey_overlap": shared.OptionInfo("O", "Toggle overlap ( Technical button, neededs for testing )"),
    "canvas_show_tooltip": shared.OptionInfo(True, "Enable tooltip on the canvas"),
    "canvas_swap_controls": shared.OptionInfo(False, "Swap hotkey combinations for 'Zoom' and 'Adjust brush resize'"),
    "canvas_zoom_mask_clear": shared.OptionInfo(True, "Enable mask clearing in inpaint after any picture is moved in inpaint via buttons"),
    "canvas_zoom_brush_outline": shared.OptionInfo(False, "Enable outline for the brush"),
    "canvas_zoom_enable_integration": shared.OptionInfo(False, "Enable integration with ControlNet and Regional Prompter"),
    "canvas_zoom_add_buttons": shared.OptionInfo(False, "Add a button to switch to full screen mode. May be useful for devices without keyboard"),
    "canvas_zoom_inpaint_brushcolor": shared.OptionInfo("#000000", 'Change the default inpaint brush color.',gr.ColorPicker),
    "canvas_zoom_transparency_level": shared.OptionInfo(60, "Transparency level, in transparency mode. The more, the more transparent the lines will be", gr.Slider, {"minimum": 10, "maximum": 70, "step": 5}),
}))

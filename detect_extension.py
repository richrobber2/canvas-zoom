import os
import sys
import launch

# Path to Python executable
python = sys.executable

# Path to the 'canvas-zoom' extension
canvasZoomPath = os.path.join(sys.path[2], "extensions", "canvas-zoom")

# Path to the current script
script_path = os.path.realpath(__file__)

# Path to the 'requirements.txt' file
requirements_path = os.path.join(sys.path[2], "requirements.txt")

# Read the version of 'gradio' from 'requirements.txt'
with open(requirements_path, "r") as file:
    lines = file.readlines()
    gradio_line = next((line for line in lines if line.startswith("gradio")), None)
    gradio_version = gradio_line.split("==")[1].strip() if gradio_line else None

# Check if the folder exists
if not os.path.exists(canvasZoomPath) and gradio_version is not None:
    # If the folder does not exist and we found 'gradio' version, uninstall 'gradio' and install it again
    launch.run(f'"{python}" -m pip install --force-reinstall --no-deps gradio=={gradio_version}', desc=f"Uninstalling modified gradio for canvas-zoom", errdesc=f"Couldn't uninstall canvas-zoom", live=False)

    # Deleting the file
    os.remove(script_path)
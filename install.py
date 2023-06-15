import sys
import os
import shutil
import gradio

# Check the version of the gradio, if it is less than 3.23.0 then cancel the installation
is_right_version = False

# Getting the Gradio version
current_version = gradio.__version__

# Converting versions into tuples of numbers for easy comparison
def version_to_tuple(version_string):
    return tuple(map(int, version_string.split('.')))

minimum_required_version = "3.23.0"

# Checking the Gradio version
if version_to_tuple(current_version) >= version_to_tuple(minimum_required_version):
    is_right_version = True
else:
    print("\nPlease update webui to the latest version for the canvas-zoom extension to work properly\n")

if is_right_version:
    # Moving files with replacement
    canvasZoomPath = sys.path[0]
    gradioPath = os.path.dirname(gradio.__file__)
    
    if version_to_tuple(current_version) == version_to_tuple(minimum_required_version):
        source_dir_name = 'old-auto-v-1-0'
    else:
        source_dir_name = ''
        
    source_dir = os.path.join(canvasZoomPath,"dist", source_dir_name, 'templates', 'frontend')
    if not os.path.exists(source_dir):
        canvasZoomPath = os.path.dirname(os.path.realpath(__file__))
        source_dir = os.path.join(canvasZoomPath,"dist", source_dir_name, 'templates', 'frontend')
    
    destination_dir = os.path.join(gradioPath, 'templates', 'frontend')
    
    # Deleting the existing "templates" folder in the gradio folder, if it exists
    if os.path.exists(destination_dir):
        shutil.rmtree(destination_dir)
    
    # Moving the "templates" folder from the canvasZoom folder to the gradio folder
    shutil.copytree(source_dir, destination_dir)

import sys
import os
import shutil
import gradio

canvasZoomPath = sys.path[0]
gradioPath = os.path.dirname(gradio.__file__)

source_dir = os.path.join(canvasZoomPath, 'dist','templates')
destination_dir = os.path.join(gradioPath, 'templates')

# Deleting the existing "templates" folder in the gradio folder, if it exists
if os.path.exists(destination_dir):
    shutil.rmtree(destination_dir)

# Moving the "templates" folder from the canvasZoom folder to the gradio folder
shutil.copytree(source_dir, destination_dir)
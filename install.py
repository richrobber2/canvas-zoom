import sys
import os
import shutil
import gradio

# Get the paths
module_path = os.path.join(sys.path[1],"scripts")
detect_module_path = os.path.join(sys.path[0], "detect_extension.py")  # assuming the script is in the current directory

# Form the destination path
destination_path = os.path.join(module_path, "detect_extension.py")

# Check if the source file exists and is a file (not a directory),
# and if the file doesn't already exist at the destination,
# and if the module path is a valid directory
if os.path.isfile(detect_module_path) and not os.path.isfile(destination_path) and os.path.isdir(module_path):
    # Copy the file
    shutil.copyfile(detect_module_path, destination_path)


# Check the version of the gradio, if it is less than 3.28.1 then cancel the installation
is_right_version = False

# Getting the Gradio version
current_version = gradio.__version__

# Converting versions into tuples of numbers for easy comparison
def version_to_tuple(version_string):
    return tuple(map(int, version_string.split('.')))

minimum_required_version = "3.28.1"
second_required_version = "3.32.0"

# Checking the Gradio version
if version_to_tuple(current_version) < version_to_tuple(minimum_required_version):
    print("\nPlease update webui to the latest version for the canvas-zoom extension to work properly, supported versions from 1.1 \n")
elif version_to_tuple(current_version) <= version_to_tuple(second_required_version):
    source_dir_name = 'v1_1_v1_5_1'
    is_right_version = True
else:
    source_dir_name = ''
    is_right_version = True

if is_right_version:
    # Moving files with replacement
    canvasZoomPath = sys.path[0]
    gradioPath = os.path.dirname(gradio.__file__)
    
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

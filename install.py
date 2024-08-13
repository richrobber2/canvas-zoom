import sys
import os
import shutil
import gradio

# Get the paths
module_path = os.path.join(sys.path[1], "scripts")
detect_module_path = os.path.join(sys.path[0], "detect_extension.py")
destination_path = os.path.join(module_path, "detect_extension.py")

# Copy the file if needed
if os.path.isfile(detect_module_path) and not os.path.isfile(destination_path) and os.path.isdir(module_path):
    shutil.copyfile(detect_module_path, destination_path)

# Check gradio version
current_version = gradio.__version__
major_version = int(current_version.split('.')[0])

if major_version >= 4:
    print("\n" + "!" * 50)
    print("WARNING: INCOMPATIBLE GRADIO VERSION DETECTED!")
    print("!" * 50)
    print("\nThis version of Gradio (v{}) is not compatible with the extension.".format(current_version))
    print("Please disable the extension to avoid potential bugs and errors.")
    print("The extension will not be installed.")
    print("\n" + "!" * 50 + "\n")
else:
    # Convert versions to tuples for comparison
    def version_to_tuple(version_string):
        return tuple(map(int, version_string.split('.')))

    minimum_required_version = "3.28.1"
    second_required_version = "3.32.0"

    if version_to_tuple(current_version) < version_to_tuple(minimum_required_version):
        print("\nPlease update webui to the latest version for the canvas-zoom extension to work properly. Supported versions are from 1.1 onwards.\n")
    else:
        is_right_version = True
        source_dir_name = 'v1_1_v1_5_1' if version_to_tuple(current_version) <= version_to_tuple(second_required_version) else ''

        if is_right_version:
            # Move files with replacement
            canvasZoomPath = sys.path[0]
            gradioPath = os.path.dirname(gradio.__file__)

            source_dir = os.path.join(canvasZoomPath, "dist", source_dir_name, 'templates', 'frontend')
            if not os.path.exists(source_dir):
                canvasZoomPath = os.path.dirname(os.path.realpath(__file__))
                source_dir = os.path.join(canvasZoomPath, "dist", source_dir_name, 'templates', 'frontend')

            destination_dir = os.path.join(gradioPath, 'templates', 'frontend')

            # Delete existing "templates" folder in the gradio folder, if it exists
            if os.path.exists(destination_dir):
                shutil.rmtree(destination_dir)

            # Move the "templates" folder from the canvasZoom folder to the gradio folder
            shutil.copytree(source_dir, destination_dir)

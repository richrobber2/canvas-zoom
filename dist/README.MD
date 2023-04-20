# A small guide to development

To change the changes in the main scripts, you need:
1) download the source code of the gradio
2) Transfer ui folder from this repo to gradio with substitution
3) After you finish editing the changes in the source files. Run the file
scripts\build_frontend.sh
4) After you are done, go to gradio folder inside of the gradio source code and copy templates folder to dist folder inside of the extension
5) Restart webui extension will replace the files by itself and you will see the change

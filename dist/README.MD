# A little clarification about the size of the extension:

Canvas-zoom works with modified gradio, I compile it myself from sources and substitute original gradio, modified, in the folder venv. 

That's why it turns out that the extension weighs so much ~140mb.
35mb new version, 35 mb old version, and git folder another 70mb. 

# Folder Assignment
- **templates** ( Modified Gradio 3.41.2 )
- **v1_1_v1_5_1** ( Modified Gradio 3.31.0 )  For those who don't want to upgrade
- **js** ( The original gradio files I changed )

During installation, the folder with the modified gradio replaces the original one in the folder venv\Lib\site-packages\gradio

# A small guide to development

To change the changes in the main scripts, you need:
1) download the source code of the gradio
2) Transfer js ( "ui" in older version ) folder from this repo to gradio with substitution
3) After you finish editing the changes in the source files. Run the file
scripts\build_frontend.sh
4) After you are done, go to gradio folder inside of the gradio source code and copy templates folder to dist folder inside of the extension
5) Restart webui extension will replace the files by itself and you will see the change

The folder where you work with the canvas : gradio-3.31.0\js\image\src

https://user-images.githubusercontent.com/22278673/236323481-e60c5043-e07e-44dc-949d-b2f7163fc408.mp4


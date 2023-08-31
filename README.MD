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

**The extension description also available in <a href="#ru"> RU </a> language:**

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

# RU

**Расширение совместимо с версией webui [1.1](https://github.com/AUTOMATIC1111/stable-diffusion-webui/releases/tag/v1.1.0), [1.2](https://github.com/AUTOMATIC1111/stable-diffusion-webui/releases/tag/v1.2.0),[1.3](https://github.com/AUTOMATIC1111/stable-diffusion-webui/releases/tag/v1.3.0)**

**Расширение полностью совместимо с webui версии [1.4](https://github.com/AUTOMATIC1111/stable-diffusion-webui/releases/tag/v1.4.0), [1.5](https://github.com/AUTOMATIC1111/stable-diffusion-webui/releases/tag/v1.5.1) и встроенным расширением canvas-zoom-and-pan. Тем не менее, я рекомендую отключить встроенное расширение.**

Canvas Zoom поддерживает интеграцию с другими популярными расширениями: ControlNet, Regional Prompter, Latent Couple(Two Shot) и Inpaint Anything. 
Более подробная информация [здесь](https://github.com/richrobber2/canvas-zoom/discussions/42#discussioncomment-6102485)

## Важные замечания

**После установки обязательно перезапустите webui**

**Если расширение не работает проверьте страницу с решением частых проблем https://github.com/richrobber2/canvas-zoom/wiki/Troubleshooting**

**Вы можете ознакомиться с возможностями этого расширения в [canvas-zoom-showcase](https://github.com/daswer123/canvas-zoom-showcase)**

**Canvas Zoom работает на модифицированной версии градио 3.31 или 3.23 для версии ниже 1.1, все подробности вы можете почитать в папке dist**

## О Расширении

Расширение [stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui).

Добавляет возможность зума в Inpaint, Sketch и Inpaint Sketch и горячие клавиши для удобства в работе.
Так же модифицирует возможности рисования в Sketch и Inpaint Sketch.

Вы можете изменить горячие клавиши по своему усмотрению, для этого необходимо зайти в настройки.

Горячие клавиши работают только в области изображения, мышка должна быть на этой области

## Горячие клавиши по умолчанию:

### Важные горячие клавиши: Зум (Shift+колесо), Перемещение (F), Полноэкранный режим (S) и Сброс зума (R).

**Shift + колесо** - Масштабировать холст

**Ctr + колесо** - Изменить размер кисти

**Ctr-Z** - Отменить последнее действие

**F (удерживать)** - Перемещение холста

**S** - Полноэкранный режим. Максимально увеличить холст так, чтобы он поместился на экране

**R** - Сброс зума.

**Q** - Открыть/Закрыть выбор цвета

**T** - Открыть выбор цвета прямо над мышкой.

**H** - Заполнить весь холст цветом кисти ( Работает в Sketch и Inpaint Sketch )

**A** - Включить пипетку ( Работает в Sketch и Inpaint Sketch )

**O** - Перекрыть все элементы и обратно

**C** - Переключение режима прозрачности маски ( Работает только в Inpaint )

В режиме прозрачности, вы можете рисовать но эфект будет не такой какой вы ожидаете, этот режим удобен для просмотра того, как лежит маска на картинке.

### Дополнительные горячие клавиши

**Shift + колесо (удерживать)** - Переместить холст

**Shift + "+" или Shift + "-"** - масштабирование холста (клавиши нумпада также работают)

## Фичи

1. Вы можете закрепить цветовую панель где угодно, для этого наведите мышкой на нужно место и нажмите "T" после чего каждый раз на "Q" Цветовая панель будет открываться в этом месте. Если вы нажмете на кнопку в правом углу, то панель сбросится и будет работать, как и должна.

2. Если вы увеличите картинку с большой шириной, которая не помещается в окно, то при нажатии на "S" вы получите увеличенную во весь экран картинку в полную ширину без полосы прокрутки

3. Вы можете добавить кисти белую обводку, что бы лучше видеть её границы. Включить можно в настройках.

4. Вы можете выбрать цвет маски в Inpaint, и цвет всех ваших линий изменится на цвет маски. Цвет можно изменить в настройках.

5. В img2img во всех вкладках добавилась новая кнопка "📏", которая находится рядом с ползунками width и height. Это кнопка позволяет получить ширину и высоту картинки в 1 клик. Удалено из webui 1.3 и выше, поскольку теперь доступно нативное решение

6. Если вы используете СontrolNet, вы можете включить интеграцию с расширением в настройках. После включения перезагрузите страницу

7. Вы можете выбрать цвет маски в Inpaint по умолчанию, цвет маски можно изменить в настройках.

8. В настройках вы можете отключить подсказку и функционал которым вы не пользуетесь

## Известные баги:

1. Если при отмене на горячей клавише появляется белое изображение, нажмите горячую клавишу отмены еще раз, и изображение вернется.

2. Это не мой баг, проблема связана с webui automatic1111. Если вы отправляете картинку в Sketch или Inpaint Sketch через кнопки, то ломается отмена последнего действия на горячую клавишу и на кнопку. Что избежать этой проблемы: вы можете загрузить картинку напрямую, перетащить её из результата или через копирование и вставку. **Проблема решена, но работает только на горячих клавишах ( Ctr+Z )**

3. Это не мой баг, проблема связана с webui automatic1111. Если вы что-то нарисовали в Sketch, Inpaint, Inpaint Sketch, а потом переключили на другую вкладку, когда вы вернетесь, и что ещё нарисуете, то отмена будет отменять по предыдущих 2 действия, последнее до переключения и последнее после.

4. Это не мой баг, проблема связана с webui automatic1111. При масштабе браузера больше или меньше 100%, Sketch и Inpaint Sketch ломаются, если отправить на них изображение через кнопки. Измените масштабе браузера и windows до 100% и все будет отлично.

5. Это не мой баг, проблема связана с webui automatic1111. Если не закрыть изображение в inpaint и перенести его в inpaint снова любым способом, маска остается. **Проблема решена в последним обновлении**

## Благодарность

Спасибо всем, кто поддержал это расширение, всем, кто подал идеи для этого проекта. 

Отдельное спасибо [richrobber2](https://github.com/richrobber2) за его первоначальную идею, которую мне, [daswer123](https://github.com/daswer123), удалось значительно расширить и усовершенствовать.

Также особую благодарность хочется выразить автору популярных моделей Deliberate и Reliberate - [XpucT](https://www.youtube.com/@XpucT), за его поддержку проекта в начальный период его развития.

И наконец, спасибо всему сообществу [AI Diffusion](https://discord.gg/xpuct) в discord за их поддержку 

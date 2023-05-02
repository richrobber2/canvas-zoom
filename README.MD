# Canvas Zoom

An extension of [stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui)

Adds the ability to zoom into Inpaint, Sketch, and Inpaint Sketch.

**The extension supports webui version [1.1](https://github.com/AUTOMATIC1111/stable-diffusion-webui/releases/tag/v1.1.0) And the [March 25 version](https://github.com/AUTOMATIC1111/stable-diffusion-webui/commit/22bcc7be428c94e9408f589966c2040187245d81)**

https://user-images.githubusercontent.com/22278673/235007408-d0658b49-7623-4bf1-bd14-c352c0635522.mp4

## Important Notes

**Webui versions earlier than March 25th are not supported**

**If extension does not work check the troubleshooting page https://github.com/richrobber2/canvas-zoom/wiki/Troubleshooting**

**You can check out the features of this extension in [canvas-zoom-showcase](https://github.com/daswer123/canvas-zoom-showcase)**

**The extension description also available in <a href="#ru"> RU </a> language:**

# EN

You can edit the hotkeys as you want, to do this, you need to get into the context menu, you need to **right clicking** on the **Inpaint , Sketch and Inpaint Sketch tab, on the image area** and a context me opens where you can configure the hotkeys as you want.

Now you can customize the hotkeys in the customHotkeys.js file, and then load them in the context menu. You can pass this file to anyone and they will be able to use your hotkeys settings. After changing customHotkeys,js, refresh the page.

The hotkeys only work in the image area, except for the hotkey for moving

## Default hotkeys:

### Important hotkeys: Zoom (Shift+wheel) , Move Canvas (F) , Full Screen (S), and Reset Zoom (R).

**Shift + click or wheel (hold)** - Move canvas

**F (hold)** - Move canvas

**Shift + "+" or Shift + "-"** - Scale canvas ( numpad keys also work )

**Shift + wheel** - Scale canvas

**Ctr + wheel** - Change brush size

**S** - Fullscreen mode, zoom in on the canvas so that it fits into the screen.

**R** - Reset Zoom.

**Q** - Open/Close color panel

**T** - Open color panel right above the mouse.

**A** - Toggle dropper ( Works in Sketch and Inpaint Sketch )

**O** - Overlap all elements and back

**Ctr-Z** - Undo last action

**C** - Toggle mask transparency mode ( Works only in Inpaint )

**V** - Toggle brush transparency mode ( Works only in Inpaint )

In transparency mode, you can paint but the effect will not be what you expect, this mode is useful to see how the mask fits on the picture.

## Features

1. You can fix the color bar wherever you want, for this purpose point the mouse on the place you want and press "T" and then every time you press "Q" the color bar will open in this place. If you click on the button in the right corner, the panel will reset and work as it should.

2. If you zoom in on a picture that is too wide to fit in the window, pressing "S" will magnify it to full screen width without the scroll bar.

3. You can add a white outline to the brush to better see its borders. You can turn it on in the context menu. It works only in Inpaint.

4. You can select the color of the mask in Inpaint and the color of all your lines will change to the color of the mask

5. In img2img in all tabs a new button "📏" has been added next to the width and height sliders. This button allows you to get the real width and height of the picture in 1 click.

6. You can fill the canvas with any color, so choose "Fill the canvas with the color of the brush" in the context menu and the canvas will be painted with the color of the brush. Works in Sketch and Inpaint Sketch

## Known bugs:

1. If a white image appears when you cancel on the Hotkey, press the cancel hotkey again and the image will return.

2. If you constantly switch Sketch, Inpaint, Inpaint Sketch at different zoom levels via the lower buttons, the picture may be cropped. To solve this problem, just delete the picture through the cross and reset through the buttons or manually

3. This is not my bug, the problem is related to webui automatic1111. If you send a picture to Sketch or Inpaint Sketch via buttons, the undo last action on the hotkey and on the button breaks. What to avoid this problem: you can load the picture directly, via drag and drop or via copy and paste. **The problem is solved in the latest update, but only works on hotkeys ( Ctr+Z )**

4. This is not my bug, the problem is with webui automatic1111. If you draw something in Sketch, Inpaint, Inpaint Sketch and then switch to another tab, when you go back and what else you draw, undo will undo on the previous 2 actions, the last one before the switch and the last one after.

5. This is not my bug, the problem is with webui automatic1111. When the browser scale is more or less than 100%, Sketch and Inpaint Sketch break if you send an image to them via buttons. Change the browser scale to 100% and everything will be fine.

# RU

**Расширение совместимо с версией webui [1.1](https://github.com/AUTOMATIC1111/stable-diffusion-webui/releases/tag/v1.1.0) и [версией от 25 марта](https://github.com/AUTOMATIC1111/stable-diffusion-webui/commit/22bcc7be428c94e9408f589966c2040187245d81)**

## Важные замечания

**Если расширение не работает проверьте страницу с решением частых проблем https://github.com/richrobber2/canvas-zoom/wiki/Troubleshooting**

**Вы можете ознакомиться с возможностями этого расширения в [canvas-zoom-showcase](https://github.com/daswer123/canvas-zoom-showcase)**

## О Расширении

Расширение [stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui).

Добавляет возможность зума в Inpaint, Sketch и Inpaint Sketch и горячие клавиши для удобства в работе.
Так же модифицирует возможности рисования в Sketch и Inpaint Sketch.

Вы можете редактировать горячие клавиши по своему усмотрению, для этого нужно попасть в контекстное меню, нужно **щелкнув правой кнопкой мыши** в **Inpaint , Sketch и Inpaint Sketch, на области изображения**, и откроется контекстное меню, где вы можете настроить горячие клавиши по своему усмотрению.

Теперь вы можете настроить хоткеи в файле customHotkeys,js, после чего в контекстном меню, загрузить их. Вы можете передать этот файл любому человеку, и он сможет воспользоватся вашими настройками горячих клавиш. После того как измените customHotkeys,js, обновите страницу.

Горячие клавиши работают только в области изображения, мышка должна быть на этой области , за исключением горячей клавиши для перемещения

## Горячие клавиши по умолчанию:

### Важные горячие клавиши: Зум (Shift+колесо), Перемещение (F), Полноэкранный режим (S) и Сброс зума (R).

**Shift + левая кнопка или колесо (удерживать)** - Переместить холст

**F (удерживать)** - Перемещение холста

**Shift + колесо** - Масштабировать холст

**Shift + "+" или Shift + "-"** - масштабирование холста (клавиши нумпада также работают)

**Ctr + колесо** - Изменить размер кисти

**S** - Полноэкранный режим. Максимально увеличить холст так, чтобы он поместился на экране

**R** - Сброс зума.

**Q** - Открыть/Закрыть выбор цвета

**T** - Открыть выбор цвета прямо над мышкой.

**A** - Включить пипетку ( Работает в Sketch и Inpaint Sketch )

**O** - Перекрыть все элементы и обратно

**Ctr-Z** - Отменить последнее действие

**C** - Переключение режима прозрачности маски ( Работает только в Inpaint )

**V** - Переключить режим прозрачности кисти ( Работает только в Inpaint )

В режиме прозрачности, вы можете рисовать но эфект будет не такой какой вы ожидаете, этот режим удобен для просмотра того, как лежит маска на картинке.

## Фичи

1. Вы можете закрепить цветовую панель где угодно, для этого наведите мышкой на нужно место и нажмите "T" после чего каждый раз на "Q" Цветовая панель будет открываться в этом месте. Если вы нажмете на кнопку в правом углу, то панель сбросится и будет работать, как и должна.

2. Если вы увеличите картинку с большой шириной, которая не помещается в окно, то при нажатии на "S" вы получите увеличенную во весь экран картинку в полную ширину без полосы прокрутки

3. Вы можете добавить кисти белую обводку, что бы лучше видеть её границы. Включить можно в контекстном меню. Работает только в Inpaint.

4. Вы можете выбрать цвет маски в Inpaint, и цвет всех ваших линий изменится на цвет маски

5. В img2img во всех вкладках добавилась новая кнопка "📏", которая находится рядом с ползунками width и height. Это кнопка позволяет получить ширину и высоту картинки в 1 клик.

6. Вы можете залить canvas любым цветом, для этого в контекстном меню выберете "Fill the canvas with the color of the brush" и canvas окрасится цветом кисти. Работает в Sketch и Inpaint Sketch

## Известные баги:

1. Если при отмене на горячей клавише появляется белое изображение, нажмите горячую клавишу отмены еще раз, и изображение вернется.

2. Если постоянно переключать Sketch, Inpaint, Inpaint Sketch на разных уровнях зума через нижние кнопки, то картинка может обрезаться. Что бы решить эту проблему просто удалите картинку через крестик и снова перекиньте через кнопки или вручную.

3. Это не мой баг, проблема связана с webui automatic1111. Если вы отправляете картинку в Sketch или Inpaint Sketch через кнопки, то ломается отмена последнего действия на горячую клавишу и на кнопку. Что избежать этой проблемы: вы можете загрузить картинку напрямую, перетащить её из результата или через копирование и вставку. **Проблема решена в последнем обновлении, но работает только на горячих клавишах ( Ctr+Z )**

4. Это не мой баг, проблема связана с webui automatic1111. Если вы что-то нарисовали в Sketch, Inpaint, Inpaint Sketch, а потом переключили на другую вкладку, когда вы вернетесь, и что ещё нарисуете, то отмена будет отменять по предыдущих 2 действия, последнее до переключения и последнее после.

5. Это не мой баг, проблема связана с webui automatic1111. При масштабе браузера больше или меньше 100%, Sketch и Inpaint Sketch ломаются, если отправить на них изображение через кнопки. Измените масштабе браузера до 100% и все будет отлично.

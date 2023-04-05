**This version of canvas-zoom only works with the March 25th and later versions of the WebUI.**

**If you haven't updated, you can install from this commit** https://github.com/richrobber2/canvas-zoom/tree/33b690c2ccec1bf436d4d37af1c6998209a860b6.

# EN
An extension of [stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui)

Adds the ability to zoom into Inpaint, Sketch, and Inpaint Sketch.

You can edit the hotkeys as you want, to do this, you need to get into the context menu, you need to **right clicking** on the **Inpaint , Sketch and Inpaint Sketch tab, on the image area** and a context me opens where you can configure the hotkeys as you want

**Move mode can be switched via the context menu.**

The hotkeys work in the image area, except for the hotkey for moving

Default hotkeys:

**Shift + click or wheel (hold)** - Move canvas

**Shift + "+" or Shift + "-"** - Scale canvas ( numpad keys also work )

**Shift + wheel** - Scale canvas

**Ctr + wheel** - Change brush size

**F (hold)** - Move canvas (Need to switch move mode)

**S** - Zoom in on the canvas so that it fits into the screen

**R** - Reset Zoom.

**Q** - Open/Close color panel

**T** - Open color panel right above the mouse. The mouse should be in the image area

**O** - Overlap all elements and back

**Ctr-Z** - Undo last action

**Features**

1) You can fix the color bar wherever you want, for this purpose point the mouse on the place you want and press "T" and then every time you press "Q" the color bar will open in this place. If you click on the button in the right corner, the panel will reset and work as it should.

**Known bugs:**

1. If you constantly switch Sketch, Inpaint, Inpaint Sketch at different zoom levels via the lower buttons, the picture may be cropped. To solve this problem, just delete the picture through the cross and reset through the buttons or manually

2. This is not my bug, the problem is related to webui automatic1111. If you send a picture to Sketch or Inpaint Sketch via buttons, the undo last action on the hotkey and on the button breaks. What to avoid this problem: you can load the picture directly, via drag and drop or via copy and paste.

3. This is not my bug, the problem is with webui automatic1111. If you draw something in Sketch, Inpaint, Inpaint Sketch and then switch to another tab, when you go back and what else you draw, undo will undo on the previous 2 actions, the last one before the switch and the last one after.

4. This is not my bug, the problem is with webui automatic1111. When the browser scale is more or less than 100%, Sketch and Inpaint Sketch break if you send an image to them via buttons. Change the browser scale to 100% and everything will be fine.

Possible solution to 2 bug:

[![Login](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWI3N2JlYjc3ZDc5YmIwMWZmMTIwNjk3MzFmNmQ4NGNkN2Y5MjE3MiZjdD1n/R67pCVIilbxy0bsYiq/giphy.gif)]()

# RU
Расширение [stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui).

Добавляет возможность зума в Inpaint, Sketch и Inpaint Sketch и горячие клавиши для удобства в работе.

Вы можете редактировать горячие клавиши по своему усмотрению, для этого нужно попасть в контекстное меню, нужно **щелкнув правой кнопкой мыши** в **Inpaint , Sketch и Inpaint Sketch, на области изображения**, и откроется контекстное меню, где вы можете настроить горячие клавиши по своему усмотрению.

**Режим перемещения холста может быть изменен в контекстом меню.**

Горячие клавиши работают только в области изображения, мышка должна быть на этой области , за исключением горячей клавиши для перемещения

Горячие клавиши по умолчанию:

**Shift + левая кнопка или колесо (удерживать)** - Переместить холст

**Shift + колесо** - Масштабировать холст

**Shift + "+" или Shift + "-"** - масштабирование холста (клавиши нумпада также работают)

**Ctr + колесо** - Изменить размер кисти

**F (удерживать)** - Перемещение холста (Нужно включить другой режим перемещения)

**S** - Максимально увеличить холст так, чтобы он поместился на экране

**R** - Сброс зума.

**Q** - Открыть/Закрыть выбор цвета 

**T** - Открыть выбор цвета прямо над мышкой. Мышка должна быть в области изображения

**O** - Перекрыть все элементы и обратно

**Ctr-Z** - Отменить последнее действие

**Фичи**

1) Вы можете закрепить цветовую панель где угодно, для этого наведите мышкой на нужно место и нажмите "T" после чего каждый раз на "Q" Цветовая панель будет открываться в этом месте. Если вы нажмете на кнопку в правом углу, то панель сбросится и будет работать как и должна.

**Известные баги:**

1. Если постоянно переключать Sketch, Inpaint, Inpaint Sketch на разных уровнях зума через нижние кнопки, то картинка может обрезатся. Что бы решить эту проблему просто удалите картинку через крестик и снова перекиньте через кнопки или вручную.

2. Это не мой баг, проблема связана с webui automatic1111. Если вы отправляете картинку в Sketch или Inpaint Sketch через кнопки, то ломается отмена последнего действия на горячую клавишу и на кнопку. Что избежать этой проблемы: вы можете загрузить картинку напрямую, перетащить её из результата или через копирование и вставку.

3. Это не мой баг, проблема связана с webui automatic1111. Если вы что-то нарисовали в Sketch, Inpaint, Inpaint Sketch, а потом переключили на другую вкладку, когда вы вернетесь обратно, и что ещё нарисуете, то отмена будет отменять по предыдущих 2 действия, последнее до переключения и последнее после.

4. Это не мой баг, проблема связана с webui automatic1111. При маштабе браузера больше или меньше 100%, Sketch и Inpaint Sketch ломаются, если отправить на них изображение через кнопки. Измените маштаб браузера до 100% и все будет отлично.

Возможно решение 2 бага:

[![Login](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWI3N2JlYjc3ZDc5YmIwMWZmMTIwNjk3MzFmNmQ4NGNkN2Y5MjE3MiZjdD1n/R67pCVIilbxy0bsYiq/giphy.gif)]()

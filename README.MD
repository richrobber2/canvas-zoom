**This version of canvas-zoom only works with the March 25th and later versions of the WebUI.**

**If you haven't updated, you can install from this commit** https://github.com/richrobber2/canvas-zoom/tree/33b690c2ccec1bf436d4d37af1c6998209a860b6.

# EN
An extension of [stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui)

Adds the ability to zoom into Inpaint, Sketch, and Inpaint Sketch.

You can edit the hotkeys as you want by **right clicking** on the **Inpaint , Sketch and Inpaint Sketch tab, on the image area** and a context me opens where you can configure the hotkeys as you want

Default hotkeys:

**Shift + wheel(hold)** - Move canvas

**Shift + wheel** - Scale canvas

**Ctr + wheel** - Change brush size

**R** - Reset Zoom.

**Q** - Open/Close color panel

**O** - Overlap all elements and back

**Ctr-Z** - Undo last action

**Features**

1) During the image preview, right-clicking on any area will trigger an Overlap
Thanks XpusT for this idea.

**Known bugs:**

1. If you constantly switch Sketch, Inpaint, Inpaint Sketch at different zoom levels via the lower buttons, the picture may be cropped. To solve this problem, just delete the picture through the cross and reset through the buttons or manually

2. Not my bug, the problem is with automatic1111. If you make something in sketch, then send it to inpaint or inpaint sketch , it breaks undo via shortcut and button. You need to delete the picture and load it back into the window, then everything will work

3.Hotkeys only work on the English keyboard layout

# RU
Расширение [stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui).

Добавляет возможность зума в Inpaint, Sketch и Inpaint Sketch и горячие клавиши для удобства в работе.

Вы можете редактировать горячие клавиши по своему усмотрению, **щелкнув правой кнопкой мыши** в **Inpaint , Sketch и Inpaint Sketch, на области изображения**, и откроется контекстное меню, где вы можете настроить горячие клавиши по своему усмотрению.

Горячие клавиши по умолчанию:

**Shift + колесо (удерживать)** - Переместить холст

**Shift + колесо** - Масштабировать холст

**Ctr + колесо** - Изменить размер кисти

**R** - Сброс зума.

**Q** - Открыть/Закрыть выбор цвета 

**O** - Перекрыть все элементы и обратно

**Ctr-Z** - Отменить последнее действие

**Фичи**

1) Во время препросмотра сделанного изображения, щелчок правой кнопкой мыши на любой области переключает перекрытие элементов.
Спасибо XpuсT за идею, в его видео это был баг, теперь это фича.

**Известные баги:**

1. Если постоянно переключать Sketch, Inpaint, Inpaint Sketch на разных уровнях зума через нижние кнопки, то картинка может обрезатся. Что бы решить эту проблему просто удалите картинку через крестик и снова перекиньте через кнопки или вручную.

2. Это не мой баг, проблема связана с automatic1111. Если вы делаете что-то в скетче, затем отправляете это в inpaint или inpaint sketch через кнопку( в любом порядке ), он ломает отмену через хоткей и кнопку. Вам нужно закрыть картинку и загрузить ёё обратно, тогда все будет работать.

3. Хоткеи работают только на Английской раскладке

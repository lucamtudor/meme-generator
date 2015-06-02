/**
 * Created by tudor on 01/06/15.
 */

function MemeCreator(canvasSelector, topLineSelector, bottomLineSelector, chooseImageSelector) {
    var canvas = $(canvasSelector)[0];
    var ctx = canvas.getContext('2d');
    var topText = null, bottomText = null, selectedImage = null;

    this.getCanvasAsDataUrl = function () {
        return canvas.toDataURL();
    };

    $(topLineSelector).on('input', onTextChangeListener);
    $(bottomLineSelector).on('input', onTextChangeListener);
    $(chooseImageSelector).change(onPictureSelectedListener);

    function redrawMeme() {
        if (selectedImage != null) {
            ctx.drawImage(selectedImage, 0, 0, canvas.width, canvas.height);
        }

        // Text attributes
        ctx.font = '42pt Impact';
        ctx.textAlign = 'center';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        ctx.fillStyle = 'white';

        if (topText != null) {
            ctx.fillText(topText, canvas.width / 2, 60);
            ctx.strokeText(topText, canvas.width / 2, 60);
        }

        if (bottomText != null) {
            ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
            ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);
        }
    }

    function onPictureSelectedListener(event) {
        var imageUrl = event.target.files[0];

        var reader = new FileReader();
        reader.onload = function (fileObject) {
            var data = fileObject.target.result;

            var image = new Image();
            image.onload = function () {
                selectedImage = this; // Save the loaded image
                redrawMeme();
            };

            image.src = data;
            console.log(fileObject.target.result);
        };
        reader.readAsDataURL(imageUrl);
    }

    function onTextChangeListener(event) {
        var inputId = event.target.id;
        var inputText = event.target.value;

        if (inputId === 'topLineText') {
            topText = inputText;
        } else {
            bottomText = inputText;
        }

        redrawMeme();
    }
}

MemeCreator.prototype.saveImage = function () {
    window.open(this.getCanvasAsDataUrl());
};

var keepButton = document.getElementById("minus");
var keepButton2 = document.getElementById("plus");
var keepButton3 = document.getElementById("minusTop");
var keepButton4 = document.getElementById("plusTop");
var keepButton5 = document.getElementById("bigger");
var keepButton6 = document.getElementById("smaller");

document.getElementById("minus").onclick = function () {
    document.getElementById("backImage").style.backgroundPositionX
        = (parseFloat(window.getComputedStyle(document.getElementById("backImage")).getPropertyValue("background-position-x")) - 1) + "px";
}

document.getElementById("plus").onclick = function () {
    document.getElementById("backImage").style.backgroundPositionX
        = (parseFloat(window.getComputedStyle(document.getElementById("backImage")).getPropertyValue("background-position-x")) + 1) + "px";
}

document.getElementById("minusTop").onclick = function () {
    document.getElementById("backImage").style.backgroundPositionY
        = (parseFloat(window.getComputedStyle(document.getElementById("backImage")).getPropertyValue("background-position-y")) + 1) + "px";
}

document.getElementById("plusTop").onclick = function () {
    document.getElementById("backImage").style.backgroundPositionY
        = (parseFloat(window.getComputedStyle(document.getElementById("backImage")).getPropertyValue("background-position-y")) - 1) + "px";
}

document.getElementById("downloadImage").onclick = function () {
    downloadDivAsImage();
}

document.getElementById("bigger").onclick = function () {
    if (document.getElementById("backImage").style.backgroundSize == "contain")
        document.getElementById("backImage").style.backgroundSize = "290px";

    document.getElementById("backImage").style.backgroundSize = (parseFloat(window.getComputedStyle(document.getElementById("backImage")).getPropertyValue("background-size")) + 5) + "px";
}

document.getElementById("smaller").onclick = function () {
    if (document.getElementById("backImage").style.backgroundSize == "contain")
        document.getElementById("backImage").style.backgroundSize = "290px";

    document.getElementById("backImage").style.backgroundSize = (parseFloat(window.getComputedStyle(document.getElementById("backImage")).getPropertyValue("background-size")) - 5) + "px";
}

function previewImage(event) {
    var input = event.target;
    var boton = document.getElementById("colocarImagen");

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        boton.classList.add("btn-danger");
        boton.classList.remove("btn-success");

        boton.value = "Espere mientras se carga la imagen...";

        const image = new Image();

        reader.onload = function (e) {
            image.onload = function () {
                document.getElementById("backImage").style.backgroundSize = "contain";

                setTimeout(function () {
                    boton.value = "Seleccione la imagen";
                    boton.classList.remove("btn-danger");
                    boton.classList.add("btn-success");
                }, 1000);
            };

            var imagePreview = document.getElementById("backImage");
            imagePreview.style.backgroundImage = "url(" + e.target.result + ")";
            image.src = e.target.result;
        };

        reader.readAsDataURL(input.files[0]);
    }
}

var items = [keepButton, keepButton2, keepButton3,
    keepButton4, keepButton5, keepButton6];

var pressTimer;

for (var i = 0; i < items.length; i++) {
    items[i].addEventListener('touchstart', function (event) {
        event.preventDefault();
        pressTimer = setInterval(function () {
            event.target.click();
        }, 5);
    });

    items[i].addEventListener('touchend', function () {
        clearTimeout(pressTimer);
    });

    items[i].addEventListener("mousedown", function (event) {
        pressTimer = setInterval(function () {
            event.target.click();
        }, 5);
    });

    items[i].addEventListener("mouseup", function () {
        clearInterval(pressTimer);
    });
}

function downloadDivAsImage() {
    const imagen = new Image();
    const backgroundImage = document.getElementById("backImage").style.backgroundImage;

    var imageUrl = backgroundImage.slice(4, -1).replace(/"/g, '');
    imagen.src = imageUrl;

    imagen.onload = function () {
        let ow = imagen.width;
        let nw = parseInt(window.getComputedStyle(document.getElementById("backImage")).getPropertyValue("background-size"));
        let ah = imagen.height;
        let nh = (nw / ow) * ah

        document.getElementById("backImage").style.backgroundSize = nw + "px " + nh + "px";

        const divElement = document.getElementById('foreImage');
        const originalScrollX = window.scrollX;
        const originalScrollY = window.scrollY;

        // Calculate the position and dimensions of the element
        const rect = divElement.getBoundingClientRect();
        const x = rect.left + window.scrollX;
        const y = rect.top + window.scrollY;
        const width = rect.width;
        const height = rect.height;

        // Scroll the element into view
        window.scrollTo(x, y);

        html2canvas(divElement, {
            scrollX: -window.scrollX,
            scrollY: -window.scrollY,
            width: width,
            height: height
        }).then(function (canvas) {
            // Scroll back to the original position
            window.scrollTo(originalScrollX, originalScrollY);

            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'div_image.png';
            link.click();
        });
    }
}

window.onload = function () {
    setTimeout(function () {
        try {
            document.querySelector("[onmouseover='S_ssac();']").previousElementSibling.remove();
            document.querySelector("[onmouseover='S_ssac();']").remove();
        } catch (ex) {

        }
    }, 1000);
};

var dragElement = document.getElementById('backImage');
var isDragging = false;
var startPosX, startPosY;
var startBgPosX, startBgPosY;

dragElement.addEventListener('mousedown', function (event) {
    isDragging = true;
    startPosX = event.clientX;
    startPosY = event.clientY;
    startBgPosX = parseInt(getComputedStyle(dragElement).backgroundPositionX);
    startBgPosY = parseInt(getComputedStyle(dragElement).backgroundPositionY);
});

document.addEventListener('mousemove', function (event) {
    if (isDragging) {
        var offsetX = event.clientX - startPosX;
        var offsetY = event.clientY - startPosY;
        var newBgPosX = startBgPosX + offsetX;
        var newBgPosY = startBgPosY + offsetY;
        dragElement.style.backgroundPositionX = newBgPosX + 'px';
        dragElement.style.backgroundPositionY = newBgPosY + 'px';
    }
});

document.addEventListener('mouseup', function () {
    isDragging = false;
});

///////////////////

dragElement.addEventListener('touchstart', function (event) {
    isDragging = true;
    startPosX = event.touches[0].clientX;
    startPosY = event.touches[0].clientY;
    startBgPosX = parseInt(getComputedStyle(dragElement).backgroundPositionX);
    startBgPosY = parseInt(getComputedStyle(dragElement).backgroundPositionY);
});

document.addEventListener('touchmove', function (event) {
    if (isDragging) {
        event.preventDefault(); // Prevent scrolling on mobile
        var offsetX = event.touches[0].clientX - startPosX;
        var offsetY = event.touches[0].clientY - startPosY;
        var newBgPosX = startBgPosX + offsetX;
        var newBgPosY = startBgPosY + offsetY;
        dragElement.style.backgroundPositionX = newBgPosX + 'px';
        dragElement.style.backgroundPositionY = newBgPosY + 'px';
    }
});

document.addEventListener('touchend', function () {
    isDragging = false;
});

//function previewImage(event) {
//    var input = event.target;

//    if (input.files && input.files[0]) {
//        $('#loadingModal').modal('show');
//        var reader = new FileReader();

//        const image = new Image();

//        reader.onload = function (e) {
//            image.onload = function () {
//                document.getElementById("backImage").style.backgroundSize = "contain";

//                setTimeout(function () {
//                    $('#loadingModal').modal('hide');
//                }, 1000);
//            };

//            var imagePreview = document.getElementById("backImage");
//            imagePreview.style.backgroundImage = "url(" + e.target.result + ")";
//            image.src = e.target.result;
//        };

//        reader.readAsDataURL(input.files[0]);
//    }
//}

var imageInput = document.getElementById("imagenFoto");
imageInput.addEventListener("change", previewImage);

function clickInputFile() {
    document.getElementById("imagenFoto").click();
}

function showMessage() {
    alert("Presiona 'Seleccionar imagen', selecciona una imagen y se cargará en el espacio en blanco de la plantilla. \
Los botones debajo son para que puedas mover la imagen, agrandarla o reducirla de tamaño. \
También tienes la opción de moverla con el mouse o con el dedo dependiendo en que dispositivo estes.¡Descargala y comparte e tus redes sociales!");
}

function testModal(e) {
    console.log(e);
    e.innerHTML = "Espere mientras se carga la imagen...";
    e.style.backgroundColor = "red";
}

//function previewImage2(event) {
//    var input = event.target;

//    if (input.files && input.files[0]) {
//        $('#loadingModal').modal('show');
//        var reader = new FileReader();

//        const image = new Image();

//        reader.onload = function (e) {
//            image.onload = function () {
//                document.getElementById("backImage").style.backgroundSize = "contain";

//                setTimeout(function () {
//                    $('#loadingModal').modal('hide');
//                }, 1000);
//            };

//            var imagePreview = document.getElementById("backImage");
//            imagePreview.style.backgroundImage = "url(" + e.target.result + ")";
//            image.src = e.target.result;
//        };

//        reader.readAsDataURL(input.files[0]);
//    }
//}
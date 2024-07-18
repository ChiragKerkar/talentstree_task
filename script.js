document.addEventListener('DOMContentLoaded', () => {
    const canvas = new fabric.Canvas('canvas');
    let scale = 1;

    // Handle image upload
    document.getElementById('layoutImage').addEventListener('change', function (e) {
        const reader = new FileReader();
        reader.onload = function (f) {
            const imgObj = new Image();
            imgObj.src = f.target.result;
            imgObj.onload = function () {
                const img = new fabric.Image(imgObj);
                img.set({
                    left: 0,
                    top: 0,
                    angle: 0,
                    scaleX: scale,
                    scaleY: scale,
                });
                canvas.add(img).renderAll();
                document.getElementById('defineScale').style.display = 'inline';
            };
        };
        reader.readAsDataURL(e.target.files[0]);
    });

    // Define Scale
    document.getElementById('defineScale').addEventListener('click', () => {
        document.getElementById('scaleControls').style.display = 'block';
    });

    // Increase Scale
    document.getElementById('increaseScale').addEventListener('click', () => {
        scale += 0.1;
        updateScale();
    });

    // Decrease Scale
    document.getElementById('decreaseScale').addEventListener('click', () => {
        if (scale > 0.1) {
            scale -= 0.1;
            updateScale();
        }
    });

    function updateScale() {
        canvas.getObjects('image').forEach((img) => {
            img.scaleX = scale;
            img.scaleY = scale;
            canvas.renderAll();
        });
    }

    // Add Product
    document.getElementById('addProduct').addEventListener('click', () => {
        const productRect = new fabric.Rect({
            left: 100,
            top: 100,
            fill: 'red',
            width: 100 * scale, // size of rectangle box will be same as scale
            height: 100 * scale,
        });
        canvas.add(productRect).renderAll();
    });

    // Show Add Product button after scale is defined
    document.getElementById('defineScale').addEventListener('click', () => {
        document.getElementById('addProduct').style.display = 'inline';
    });
});

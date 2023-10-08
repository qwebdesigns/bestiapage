function updateBackgroundImage() {
    var backgroundImage = document.querySelector(".back_image");
    var backgroundBlur = document.querySelector(".back_image_blur");
    var radarElement = document.querySelector('.radar');
    var ST_land = document.getElementById('stule_land'); 
    var ST_vert = document.getElementById('stule_vert');
    // Удалите все классы .red_color и .cyan_color из .radar
    radarElement.classList.remove('red_color', 'cyan_color');

    // Добавьте класс, который соответствует выбранному цвету

    if (window.matchMedia("(orientation: landscape)").matches) {
        stule_vert.remove();
        // Горизонтальная ориентация экрана
        if (window.matchMedia("(min-width: 1200px)").matches) {
            backgroundImage.src = "./Assets/1.jpeg";
            backgroundBlur.src = "./Assets/1.jpeg";
            radarElement.classList.add('cyan_color');


        } else if (window.matchMedia("(min-width: 992px) and (max-width: 1199px)").matches) {
            backgroundImage.src = "./Assets/1.jpeg";
            backgroundBlur.src = "./Assets/1.jpeg";
            radarElement.classList.add('cyan_color');


        } else if (window.matchMedia("(min-width: 768px) and (max-width: 991px)").matches) {
            backgroundImage.src = "./Assets/3a.jpeg";
            backgroundBlur.src = "./Assets/3a.jpeg";
            radarElement.classList.add('gray_color');


        } else if (window.matchMedia("(max-width: 767px)").matches) {
            backgroundImage.src = "./Assets/3b.jpeg";
            backgroundBlur.src = "./Assets/3b.jpeg";
            radarElement.classList.add('gray_color');


        } else if (window.matchMedia("(max-width: 360px)").matches) {
            backgroundImage.src = "./Assets/5.jpg";
            backgroundBlur.src = "./Assets/5.jpg";
            radarElement.classList.add('cyan_color');


        }
    } else {

        ST_land.remove();
        // Вертикальная ориентация экрана
        if (window.matchMedia("(min-width: 1200px)").matches) {
            backgroundImage.src = "./Assets/1.jpeg";
            backgroundBlur.src = "./Assets/1.jpeg";
            radarElement.classList.add('cyan_color');


        } else if (window.matchMedia("(min-width: 992px) and (max-width: 1199px)").matches) {
            backgroundImage.src = "./Assets/2.jpeg";
            backgroundBlur.src = "./Assets/2.jpeg";
            radarElement.classList.add('cyan_color');


        } else if (window.matchMedia("(min-width: 768px) and (max-width: 991px)").matches) {
            backgroundImage.src = "./Assets/3.jpeg";
            backgroundBlur.src = "./Assets/3.jpeg";
            radarElement.classList.add('cyan_color');


        } else if (window.matchMedia("(max-width: 767px)").matches) {
            backgroundImage.src = "./Assets/4.jpg";
            backgroundBlur.src = "./Assets/4.jpg";
            radarElement.classList.add('red_color');
            

        } else if (window.matchMedia("(max-width: 360px)").matches) {
            backgroundImage.src = "./Assets/5.jpg";
            backgroundBlur.src = "./Assets/5.jpg";
            radarElement.classList.add('cyan_color');


        }
    }
}



// Вызываем функцию при загрузке страницы и при изменении размера окна
window.addEventListener("load", updateBackgroundImage);
window.addEventListener("resize", updateBackgroundImage);































const noise = () => {
    let canvas, ctx;
    let wWidth, wHeight;
    let noiseData = [];
    let frame = 0;
    let loopTimeout;

    // Create Noise
    const createNoise = () => {
        const idata = ctx.createImageData(wWidth, wHeight);
        const buffer32 = new Uint32Array(idata.data.buffer);
        const len = buffer32.length;
        for (let i = 0; i < len; i++) {
            if (Math.random() < 0.5) {
                buffer32[i] = 0xff000000;
            }
        }
        noiseData.push(idata);
    };

    // Play Noise
    const paintNoise = () => {
        if (frame === 9) {
            frame = 0;
        } else {
            frame++;
        }
        ctx.putImageData(noiseData[frame], 0, 0);
    };

    // Loop
    const loop = () => {
        paintNoise(frame);
        loopTimeout = window.setTimeout(() => {
            window.requestAnimationFrame(loop);
        }, (1000 / 25));
    };

    // Setup
    const setup = () => {
        wWidth = window.innerWidth;
        wHeight = window.innerHeight;
        canvas.width = wWidth;
        canvas.height = wHeight;
        for (let i = 0; i < 10; i++) {
            createNoise();
        }
        loop();
    };

    // Reset
    let resizeThrottle;
    const reset = () => {
        window.addEventListener('resize', () => {
            window.clearTimeout(resizeThrottle);
            resizeThrottle = window.setTimeout(() => {
                window.clearTimeout(loopTimeout);
                setup();
            }, 200);
        }, false);
    };

    // Init
    const init = (() => {
        canvas = document.getElementById('noise');
        ctx = canvas.getContext('2d');
        setup();
    })();
};
noise();
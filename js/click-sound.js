(function () {
    var script = document.currentScript;
    if (!script || !script.src) return;

    var soundUrl = new URL('../sounds/faah.mp3', script.src).href;
    var audio = new Audio(soundUrl);
    audio.preload = 'auto';

    document.addEventListener(
        'click',
        function (event) {
            var el = event.target;
            if (el && el.closest && el.closest('[data-no-click-sound]')) return;

            audio.pause();
            audio.currentTime = 0;
            audio.play().catch(function () { });
        },
        true
    );
})();

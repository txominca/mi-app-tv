let idx = 0;
const cells = document.querySelectorAll('.cell');
const video = document.getElementById('video');

function playVideo(url) {
    const rect = cells[idx].getBoundingClientRect();
    video.style.top = rect.top + 'px';
    video.style.left = rect.left + 'px';
    video.style.width = rect.width + 'px';
    video.style.height = rect.height + 'px';
    video.style.display = 'block';

    if (Hls.isSupported() && url.includes('.m3u8')) {
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
    } else {
        video.src = url;
    }
    video.play();
}

window.addEventListener('keydown', (e) => {
    if([37, 38, 39, 40, 13].includes(e.keyCode)) e.preventDefault();
    if (e.keyCode === 13) playVideo(cells[idx].getAttribute('data-url'));
    else {
        cells[idx].classList.remove('focused');
        if (e.keyCode === 39 && idx % 2 === 0) idx++;
        else if (e.keyCode === 37 && idx % 2 !== 0) idx--;
        else if (e.keyCode === 40 && idx < 2) idx += 2;
        else if (e.keyCode === 38 && idx > 1) idx -= 2;
        cells[idx].classList.add('focused');
    }
});
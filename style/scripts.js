// random number generate
const randomnumberRange = (min, max, init) => {
    return Math.floor(Math.random() * (max - min) + init);
}

// add particle
const addParticle = (status, index) => {
    const wrapper = document.createElement('div');
    const particle = document.createElement('span');
    const degree = 360 / status.particles;

    wrapper.classList.add('particle');
    particle.classList.add('particle__item');
    particle.style.backgroundColor = `hsl(${status.hue}, 100%, 50%)`; // 수정
    particle.style.animationDuration = `${status.timer}ms`; // 수정
    wrapper.style.transform = `rotate(${degree * index}deg)`; // 수정
    wrapper.append(particle);
    return wrapper;
};

// add Fireworks
const addFireworks = (event, timer) => { 
    let status = {
        hue: randomnumberRange(0, 360, 0),
        opacity: Math.random() + 0.5,
        particles: randomnumberRange(6, 32, 8),
        timer: timer,
    }
    const body = document.querySelector('.background');
    const fireworks = document.createElement('div');
    fireworks.classList.add('fireworks'); // 수정

    for (let index = 0; index < status.particles; index++) { // 수정
        fireworks.append(addParticle(status, index));
    }

    body.append(fireworks);
    
    fireworks.style.top = `${event.clientY - fireworks.offsetHeight / 2}px`; // 수정
    fireworks.style.left = `${event.clientX - fireworks.offsetWidth / 2}px`; // 수정
    return fireworks;
};

// fireworks Handler
const fireworksHandler = (event) => { 
    let timer = randomnumberRange(500, 3000, 500);
    addFireworks(event, timer);
    setTimeout(() => {
        document.querySelector('.fireworks').remove();
    }, timer);
};

// initiate
const init = () => { 
    const page = document.querySelector('.background');
    page.addEventListener('click', (e) => fireworksHandler(e));
};

// 페이지가 로드될 때 이벤트 리스너 등록
document.addEventListener('DOMContentLoaded', init); // 수정

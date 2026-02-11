const textElement = document.getElementById('typewriter-text');

// Updated List of Roles
const words = [
    "Student",
    "Solution Seeker",
    "Problem Solver",
    "Process Optimizer",
    "Fast Learner",
    "Tech Enthusiast",
    "Autodidact"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeEffect = () => {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        // Deleting
        textElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Typing
        textElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    // Speed Settings (Lower = Faster)
    let typeSpeed = isDeleting ? 40 : 80;

    // Word Complete
    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 1000; // Pause 1s
        isDeleting = true;
    }
    // Word Deleted
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex++;
        if (wordIndex === words.length) {
            wordIndex = 0;
        }
        typeSpeed = 300; // Pause 0.3s
    }

    setTimeout(typeEffect, typeSpeed);
};

const initHobbiesFill = () => {
    const hobbiesSection = document.querySelector('.hobbies-section');
    const hobbiesTitle = document.querySelector('.hobbies-title');

    if (!hobbiesSection || !hobbiesTitle) return;

    // On small screens, keep HOBBIES fully filled and skip scroll animation
    if (window.innerWidth <= 768) {
        hobbiesTitle.style.setProperty('--fill-amount', '100%');
        hobbiesTitle.classList.add('hobbies-full');
        return;
    }

    const updateFill = () => {
        const rect = hobbiesSection.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        // Use the vertical position of the HOBBIES text center:
        // - When center is at bottom of viewport -> 0% filled
        // - When center reaches middle of viewport -> 100% filled
        const centerY = rect.top + rect.height / 2;
        const centerPos = (centerY / windowHeight) * 100; // 0 at very top, 100 at very bottom

        const startPos = 100; // center at bottom -> 0
        const endPos = 50;   // center at middle -> 100

        let progress;
        if (centerPos >= startPos) {
            progress = 0;
        } else if (centerPos <= endPos) {
            progress = 1;
        } else {
            progress = (startPos - centerPos) / (startPos - endPos); // 0 -> 1 between bottom and middle
        }

        const percentage = Math.round(progress * 100);
        hobbiesTitle.style.setProperty('--fill-amount', `${percentage}%`);

        if (percentage >= 100) {
            hobbiesTitle.classList.add('hobbies-full');
        } else {
            hobbiesTitle.classList.remove('hobbies-full');
        }
    };

    updateFill();
    window.addEventListener('scroll', updateFill);
    window.addEventListener('resize', updateFill);
};

document.addEventListener('DOMContentLoaded', () => {
    typeEffect();
    initHobbiesFill();
});
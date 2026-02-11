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
}

document.addEventListener('DOMContentLoaded', typeEffect);
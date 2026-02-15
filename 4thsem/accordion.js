document.addEventListener('DOMContentLoaded', () => {
    // Only run on mobile/tablet (or just let CSS handle visibility, and this handles toggling)

    // Helper to toggle accordion
    function toggleAccordion(element) {
        // Toggle the active class on the header
        element.classList.toggle('active');

        // Find the next sibling content div
        const content = element.nextElementSibling;

        // Toggle display or max-height
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    }

    // Level 1 Headers (Syllabus, PYQ, Assignments)
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.addEventListener('click', () => {
            // Check if we are in mobile view (simple check using window width or CSS check)
            if (window.innerWidth <= 1024) {
                toggleAccordion(title);
            }
        });
    });

    // Level 2 Headers (Major, Minor, Vocational)
    const subTitles = document.querySelectorAll('.sub-title');
    subTitles.forEach(title => {
        title.addEventListener('click', () => {
            if (window.innerWidth <= 1024) {
                toggleAccordion(title);
            }
        });
    });
});

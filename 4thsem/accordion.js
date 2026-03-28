document.addEventListener('DOMContentLoaded', () => {

    // ═══════════════════════════════════════
    // MOBILE ACCORDION — Level 1 (Syllabus, PYQ, Assignments, FAQ)
    // ═══════════════════════════════════════
    document.querySelectorAll('.section-title').forEach(title => {
        title.addEventListener('click', () => {
            if (window.innerWidth > 700) return; // Desktop: no accordion

            const body = title.nextElementSibling;
            if (!body || !body.classList.contains('section-body')) return;

            const isOpen = title.classList.contains('active');

            // Close all other Level 1 sections
            document.querySelectorAll('.section-title.active').forEach(openTitle => {
                if (openTitle !== title) {
                    openTitle.classList.remove('active');
                    openTitle.nextElementSibling.classList.remove('open');
                }
            });

            if (!isOpen) {
                title.classList.add('active');
                body.classList.add('open');
            } else {
                title.classList.remove('active');
                body.classList.remove('open');
            }
        });
    });

    // ═══════════════════════════════════════
    // MOBILE ACCORDION — Level 2 (Major, Minor, Vocational)
    // ═══════════════════════════════════════
    document.querySelectorAll('.sub-title').forEach(title => {
        title.addEventListener('click', () => {
            if (window.innerWidth > 700) return; // Desktop: no accordion

            const list = title.nextElementSibling;
            if (!list) return;

            const isOpen = title.classList.contains('active');

            // Close all other Level 2 sections
            document.querySelectorAll('.sub-title.active').forEach(openTitle => {
                if (openTitle !== title) {
                    openTitle.classList.remove('active');
                    openTitle.nextElementSibling.classList.remove('open');
                }
            });

            if (!isOpen) {
                title.classList.add('active');
                list.classList.add('open');
            } else {
                title.classList.remove('active');
                list.classList.remove('open');
            }
        });
    });

    // ═══════════════════════════════════════
    // FAQ ACCORDION (works on both desktop and mobile)
    // ═══════════════════════════════════════
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;

            // Close all other FAQ items
            document.querySelectorAll('.faq-question.active').forEach(openQ => {
                if (openQ !== question) {
                    openQ.classList.remove('active');
                    openQ.nextElementSibling.classList.remove('open');
                }
            });

            // Toggle current
            question.classList.toggle('active');
            answer.classList.toggle('open');
        });
    });

});

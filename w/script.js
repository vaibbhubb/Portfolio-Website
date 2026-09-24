// ===== WORKOUT PAGE INTERACTIVITY =====

document.addEventListener('DOMContentLoaded', () => {
    initDayTabs();
    autoSelectToday();
});

// --- Day Tab Switching ---
function initDayTabs() {
    const tabs = document.querySelectorAll('.day-tab');
    const panels = document.querySelectorAll('.day-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const day = tab.dataset.day;

            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update active panel
            panels.forEach(p => {
                p.classList.remove('active');
                // Reset card animations for re-entry
                p.querySelectorAll('.exercise-card').forEach(c => c.classList.remove('visible'));
            });

            const activePanel = document.getElementById(`panel-${day}`);
            if (activePanel) {
                activePanel.classList.add('active');
                // Trigger staggered reveal for new panel
                revealCards(activePanel);
            }
        });
    });
}

// --- Staggered Card Reveal ---
function revealCards(panel) {
    const cards = panel.querySelectorAll('.exercise-card');
    cards.forEach((card, i) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, i * 80);
    });
}

// --- Auto-Select Today's Tab ---
function autoSelectToday() {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = days[new Date().getDay()];
    
    const todayTab = document.querySelector(`.day-tab[data-day="${today}"]`);
    if (todayTab) {
        todayTab.click();
    } else {
        // Fallback: activate Monday
        const mondayTab = document.querySelector('.day-tab[data-day="monday"]');
        if (mondayTab) mondayTab.click();
    }
}

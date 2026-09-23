/* ═══════════════════════════════════════════════
   CLINIC PROFILES DASHBOARD — MAIN SCRIPT
   ═══════════════════════════════════════════════ */

// ── TREATMENT CATEGORY DEFINITIONS ──
// Each category has: key, label, icon, cssClass, and a list of service name patterns to match
const TREATMENT_CATEGORIES = [
    {
        key: 'braces',
        label: 'Braces & Aligners',
        icon: '🦷',
        cssClass: 'cat-braces',
        // Ordered by priority (most common first)
        patterns: [
            'Metal Braces',
            'Ceramic Braces',
            'Self-Ligating Metal Braces',
            'Damon Metal Braces',
            'Self-Ligating Ceramic Braces',
            'Damon Ceramic Braces',
            'Self-Ligating Transparent Braces',
            'Transparent Braces',
            'Lingual Braces',
            'Invisalign',
            'Indian Aligners',
            'Aligners',
            'Retainers',
            'Orthodontic Appliance',
        ]
    },
    {
        key: 'implants',
        label: 'Implants',
        icon: '🔩',
        cssClass: 'cat-implants',
        patterns: [
            'Korean Implant',
            'Osstem Implant',
            'Dentium Implant',
            'Nobel Biocare',
            'Straumann Implant',
            'Indian Implant',
            'Israeli Implant',
            'German Implant',
            'HiOssen Implant',
            'Implant Crown',
            'PFM Implant',
            'Zirconia Implant',
            'All-on-4',
            'All-on-6',
            'Full Mouth Implant',
            'Bone Graft',
            'Sinus Lift',
        ]
    },
    {
        key: 'cosmetic',
        label: 'Veneers & Cosmetic',
        icon: '✨',
        cssClass: 'cat-cosmetic',
        patterns: [
            'Composite Veneer',
            'Porcelain Veneer',
            'Ceramic Veneer',
            'Veneer',
            'Teeth Whitening',
            'Bleaching',
            'Laser Teeth Whitening',
            'Smile Design',
            'Diastema',
            'Gap Closure',
        ]
    },
    {
        key: 'restorative',
        label: 'RCT, Crowns & Fillings',
        icon: '🏥',
        cssClass: 'cat-restorative',
        patterns: [
            'Root Canal',
            'RCT',
            'Molar Root Canal',
            'Single Root Canal',
            'Multi-Rooted Root Canal',
            'Re-RCT',
            'Apicoectomy',
            'Apicectomy',
            'Apexification',
            'Post & Core',
            'Fibre Post',
            'Zirconia Crown',
            'PFM Crown',
            'E-max',
            'All-Ceramic Crown',
            'Metal Crown',
            'Temporary Crown',
            'Crown Lengthening',
            'Inlay',
            'Onlay',
            'Ceramic Inlay',
            'Dental Bridge',
            'Composite.*Filling',
            'Tooth-Coloured.*Filling',
            'GIC Filling',
            'Silver Amalgam',
            'Dental Filling',
            'Filling',
            'Full Mouth Rehabilitation',
            'Denture',
            'Removable Denture',
            'Flexible Denture',
            'Cast Partial Denture',
        ]
    },
    {
        key: 'cleaning',
        label: 'Cleaning & Preventive',
        icon: '🧹',
        cssClass: 'cat-cleaning',
        patterns: [
            'Scaling & Polishing',
            'Scaling',
            'Deep Cleaning',
            'Root Planing',
            'Fluoride Application',
            'Fluoride Varnish',
            'Pit & Fissure Sealant',
            'Night Guard',
            'Mouth Guard',
            'X-Ray',
            'OPG',
            'IOPA',
            'Consultation',
            'Dental Sedation',
        ]
    },
    {
        key: 'kids',
        label: 'Kids Dentistry & Surgery',
        icon: '🧒',
        cssClass: 'cat-kids',
        patterns: [
            'Kids Filling',
            'Kids Stainless Steel Crown',
            'Kids Zirconia Crown',
            'Kids Root Canal',
            'Kids Extraction',
            'Pulpotomy',
            'Pulpectomy',
            'Space Maintainer',
            'Habit-Breaking',
            'Tooth Extraction',
            'Wisdom Tooth',
            'Surgical Extraction',
            '3rd Molar',
            'Flap Surgery',
            'Gingivectomy',
            'Curettage',
        ]
    }
];


// ── STATE ──
let selectedClinicId = null;


// ── INITIALIZATION ──
document.addEventListener('DOMContentLoaded', () => {
    renderClinicPills();
    setupExpandCollapseAll();

    // Auto-select first clinic
    if (CLINICS_DATA.length > 0) {
        selectClinic(CLINICS_DATA[0].id);
    }
});


// ═══════════════════════════════════════════════
// CLINIC PILLS
// ═══════════════════════════════════════════════

function renderClinicPills() {
    const track = document.getElementById('clinic-pills-track');
    track.innerHTML = '';

    CLINICS_DATA.forEach(clinic => {
        const pill = document.createElement('button');
        pill.className = 'clinic-pill';
        pill.dataset.clinicId = clinic.id;
        pill.textContent = clinic.shortName || clinic.name;
        pill.addEventListener('click', () => selectClinic(clinic.id));
        track.appendChild(pill);
    });
}

function selectClinic(clinicId) {
    selectedClinicId = clinicId;
    const clinic = CLINICS_DATA.find(c => c.id === clinicId);
    if (!clinic) return;

    // Update pill highlight
    document.querySelectorAll('.clinic-pill').forEach(pill => {
        pill.classList.toggle('active', parseInt(pill.dataset.clinicId) === clinicId);
    });

    // Scroll active pill into view
    const activePill = document.querySelector('.clinic-pill.active');
    if (activePill) {
        activePill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }

    // Update indicator
    document.getElementById('selected-clinic-name').textContent = clinic.name;

    // Update all sections
    updateClinicInfo(clinic);
    updateDoctorInfo(clinic);
    updateTimings(clinic);
    renderTreatmentCategories(clinic);

    // Animate content change
    const main = document.getElementById('main-content');
    main.style.opacity = '0';
    main.style.transform = 'translateY(8px)';
    requestAnimationFrame(() => {
        main.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        main.style.opacity = '1';
        main.style.transform = 'translateY(0)';
    });
}


// ═══════════════════════════════════════════════
// CLINIC INFO
// ═══════════════════════════════════════════════

function updateClinicInfo(clinic) {
    document.getElementById('clinic-name-display').textContent = clinic.name;
    document.getElementById('clinic-address').textContent = clinic.address || '—';

    const mapLink = document.getElementById('clinic-map-link');
    if (clinic.mapLink) {
        mapLink.href = clinic.mapLink;
        mapLink.textContent = 'Open in Maps';
        mapLink.parentElement.style.display = 'flex';
    } else {
        mapLink.parentElement.style.display = 'none';
    }

    const phone = document.getElementById('clinic-phone');
    if (clinic.phone) {
        phone.href = `tel:${clinic.phone}`;
        phone.textContent = clinic.phone;
        phone.parentElement.style.display = 'flex';
    } else {
        phone.parentElement.style.display = 'none';
    }

    const website = document.getElementById('clinic-website');
    if (clinic.website) {
        website.href = clinic.website;
        website.textContent = clinic.website.replace(/^https?:\/\//, '').replace(/\/$/, '');
        website.parentElement.style.display = 'flex';
    } else {
        website.parentElement.style.display = 'none';
    }

    // Consultation
    const consultInfo = document.getElementById('clinic-consultation');
    if (clinic.consultationFree) {
        consultInfo.textContent = 'Free Consultation';
    } else if (clinic.consultationFee) {
        consultInfo.textContent = `Consultation: ₹${formatPrice(clinic.consultationFee)}`;
    } else {
        consultInfo.textContent = 'Consultation available';
    }

    // Social proof
    const ratingEl = document.getElementById('clinic-rating');
    if (clinic.socialProof && clinic.socialProof.rating) {
        ratingEl.textContent = `${clinic.socialProof.rating} rating · ${clinic.socialProof.ratingCount} reviews on Google`;
        document.getElementById('social-proof-row').style.display = 'flex';
    } else {
        document.getElementById('social-proof-row').style.display = 'none';
    }

    // Copy button
    const copyBtn = document.getElementById('copy-clinic-btn');
    copyBtn.onclick = () => copyClinicInfo(clinic);
}


// ═══════════════════════════════════════════════
// DOCTOR INFO
// ═══════════════════════════════════════════════

function updateDoctorInfo(clinic) {
    const doc = clinic.doctor;

    const photo = document.getElementById('doctor-photo');
    if (doc.photoUrl) {
        photo.src = doc.photoUrl;
        photo.alt = doc.name;
        photo.parentElement.style.display = 'block';
    } else {
        photo.parentElement.style.display = 'none';
    }

    document.getElementById('doctor-name').textContent = doc.name || '—';
    document.getElementById('doctor-creds').textContent = doc.credentials || '—';
    document.getElementById('doctor-exp').textContent = doc.experienceYears
        ? `${doc.experienceYears}+ years experience`
        : '';

    // Expertise tags
    const tagsContainer = document.getElementById('expertise-tags');
    tagsContainer.innerHTML = '';
    if (doc.expertise && doc.expertise.length) {
        doc.expertise.forEach(tag => {
            const el = document.createElement('span');
            el.className = 'expertise-tag';
            el.textContent = formatExpertise(tag);
            tagsContainer.appendChild(el);
        });
    }

    // Credibility hooks
    const hooksContainer = document.getElementById('credibility-hooks');
    hooksContainer.innerHTML = '';
    if (doc.credibilityHooks && doc.credibilityHooks.length) {
        doc.credibilityHooks.forEach(hook => {
            const el = document.createElement('div');
            el.className = 'hook-item';
            el.textContent = hook;
            hooksContainer.appendChild(el);
        });
    }
}

function formatExpertise(tag) {
    return tag
        .replace(/_/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());
}


// ═══════════════════════════════════════════════
// TIMINGS
// ═══════════════════════════════════════════════

function updateTimings(clinic) {
    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    const today = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][new Date().getDay()];

    days.forEach(day => {
        const timeEl = document.getElementById(`time-${day}`);
        const row = timeEl.closest('tr');
        const timing = clinic.timings && clinic.timings[day];

        if (timing) {
            timeEl.textContent = timing;
            timeEl.classList.remove('closed');
        } else {
            timeEl.textContent = 'Closed';
            timeEl.classList.add('closed');
        }

        row.classList.toggle('today', day === today);
    });
}


// ═══════════════════════════════════════════════
// TREATMENT CATEGORIES
// ═══════════════════════════════════════════════

function renderTreatmentCategories(clinic) {
    const grid = document.getElementById('categories-grid');
    grid.innerHTML = '';

    if (!clinic.pricing || clinic.pricing.length === 0) {
        grid.innerHTML = `
            <div class="placeholder-state" style="grid-column: 1 / -1;">
                <i class="fas fa-clipboard-list"></i>
                <p>No pricing data available for this clinic</p>
            </div>
        `;
        return;
    }

    // Categorize services
    const categorized = categorizeServices(clinic.pricing);

    TREATMENT_CATEGORIES.forEach(cat => {
        const services = categorized[cat.key];
        if (!services || services.length === 0) return;

        const card = document.createElement('div');
        card.className = `category-card ${cat.cssClass} open`;
        card.innerHTML = `
            <div class="category-header" onclick="toggleCategory(this)">
                <div class="category-title">
                    <span class="category-icon">${cat.icon}</span>
                    <span>${cat.label}</span>
                </div>
                <div style="display:flex;align-items:center;gap:8px;">
                    <span class="category-count">${services.length}</span>
                    <i class="fas fa-chevron-down category-chevron"></i>
                </div>
            </div>
            <div class="treatment-list">
                ${services.map(s => `
                    <div class="treatment-row">
                        <div class="treatment-name">
                            ${s.service}
                            ${s.note ? `<span class="treatment-note">${s.note}</span>` : ''}
                        </div>
                        <div class="treatment-price">₹${formatPrice(s.startingPrice)}</div>
                    </div>
                `).join('')}
            </div>
        `;
        grid.appendChild(card);
    });

    // Handle uncategorized services
    const uncategorized = categorized['_other'];
    if (uncategorized && uncategorized.length > 0) {
        const card = document.createElement('div');
        card.className = 'category-card cat-cleaning open';
        card.innerHTML = `
            <div class="category-header" onclick="toggleCategory(this)">
                <div class="category-title">
                    <span class="category-icon">📋</span>
                    <span>Other Treatments</span>
                </div>
                <div style="display:flex;align-items:center;gap:8px;">
                    <span class="category-count">${uncategorized.length}</span>
                    <i class="fas fa-chevron-down category-chevron"></i>
                </div>
            </div>
            <div class="treatment-list">
                ${uncategorized.map(s => `
                    <div class="treatment-row">
                        <div class="treatment-name">
                            ${s.service}
                            ${s.note ? `<span class="treatment-note">${s.note}</span>` : ''}
                        </div>
                        <div class="treatment-price">₹${formatPrice(s.startingPrice)}</div>
                    </div>
                `).join('')}
            </div>
        `;
        grid.appendChild(card);
    }
}

function categorizeServices(pricing) {
    const result = {};
    TREATMENT_CATEGORIES.forEach(cat => result[cat.key] = []);
    result['_other'] = [];

    const assigned = new Set();

    // For each category, go through patterns in priority order
    TREATMENT_CATEGORIES.forEach(cat => {
        cat.patterns.forEach(pattern => {
            pricing.forEach((service, idx) => {
                if (assigned.has(idx)) return;
                const regex = new RegExp(pattern, 'i');
                if (regex.test(service.service)) {
                    result[cat.key].push(service);
                    assigned.add(idx);
                }
            });
        });
    });

    // Uncategorized
    pricing.forEach((service, idx) => {
        if (!assigned.has(idx)) {
            result['_other'].push(service);
        }
    });

    return result;
}


// ═══════════════════════════════════════════════
// CATEGORY TOGGLE
// ═══════════════════════════════════════════════

function toggleCategory(header) {
    const card = header.closest('.category-card');
    card.classList.toggle('open');
}

function setupExpandCollapseAll() {
    document.getElementById('expand-all-btn').addEventListener('click', () => {
        document.querySelectorAll('.category-card').forEach(c => c.classList.add('open'));
    });

    document.getElementById('collapse-all-btn').addEventListener('click', () => {
        document.querySelectorAll('.category-card').forEach(c => c.classList.remove('open'));
    });
}


// ═══════════════════════════════════════════════
// COPY TO CLIPBOARD
// ═══════════════════════════════════════════════

function copyClinicInfo(clinic) {
    const text = [
        clinic.name,
        '',
        `Address :- ${clinic.address}`,
        '',
        `Location :- ${clinic.mapLink || 'N/A'}`
    ].join('\n');

    navigator.clipboard.writeText(text).then(() => {
        // Button feedback
        const btn = document.getElementById('copy-clinic-btn');
        btn.classList.add('copied');
        btn.querySelector('.copy-label').textContent = 'Copied!';
        btn.querySelector('i').className = 'fas fa-check';

        setTimeout(() => {
            btn.classList.remove('copied');
            btn.querySelector('.copy-label').textContent = 'Copy';
            btn.querySelector('i').className = 'far fa-copy';
        }, 2000);

        // Toast
        showToast();
    }).catch(() => {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast();
    });
}

function showToast() {
    const toast = document.getElementById('copy-toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}


// ═══════════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════════

function formatPrice(price) {
    if (price == null) return '—';
    return price.toLocaleString('en-IN');
}

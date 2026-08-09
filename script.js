// JavaScript Logik für Emin Girimhanov Startseite (SEO, GEO & WCAG 2.1 AA Accessibility)

window.openLightbox = function(src, caption) {
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    if (lightboxModal && lightboxImg && lightboxCaption) {
        lightboxImg.src = src;
        lightboxImg.alt = caption || 'Projekt Vorschau';
        lightboxCaption.innerText = caption || '';
        lightboxModal.classList.add('active');
        lightboxModal.setAttribute('aria-hidden', 'false');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const langToggleBtn = document.getElementById('lang-toggle-btn');
    const langLabel = document.getElementById('lang-label');
    let currentLang = localStorage.getItem('site-lang') || 'de';

    const textExperienceDE = "Erfahrungen & Produkte:\n 1. Autohaus Kleinjena (Vollständiges Web-Portal & Fahrzeug-Schaufenster, Netlify: https://autohaus-kleinjena.netlify.app/)\n 2. FIM Schulung (Gemeinsam mit Kollegin überarbeitete E-Learning-Plattform im Öffentlichen Sektor: https://fim-schulung.de/)\n 3. Falcos GmbH (Entwicklung automatisierter XÖV-ZUGFeRD Parser & LLM-Automatisierung)\n 4. SIDUM e.V. (Kreditentscheidungs-Use-Cases mit d-fine & PwC GenAI Masterclass)\n 5. Autonomer Mähroboter (Raspberry Pi & Python) & CJD Schulcampus 3D-Modell (Digitalisierungspreis)";
    const textExperienceEN = "Experience & Products:\n 1. Autohaus Kleinjena (Full Web Portal & Car Showroom, Netlify: https://autohaus-kleinjena.netlify.app/)\n 2. FIM Schulung (E-Learning platform for public sector, improved with colleague: https://fim-schulung.de/)\n 3. Falcos GmbH (Automated XÖV-ZUGFeRD parsers & LLM process automation)\n 4. SIDUM e.V. (Credit decision models with d-fine & PwC GenAI Masterclass)\n 5. Autonomous Mower (Raspberry Pi & Python) & School Campus 3D Model (Digitalization Award)";

    const textWebsitesDE = "Highlights Web-Anwendungen:\n • Autohaus Kleinjena (Erstellt von Emin): https://autohaus-kleinjena.netlify.app/\n • FIM Schulung (Mit Kollegin verbessert): https://fim-schulung.de/\n • Falcos GmbH Public Sector: https://falcos.de/";
    const textWebsitesEN = "Featured Web Applications:\n • Autohaus Kleinjena (Created by Emin): https://autohaus-kleinjena.netlify.app/\n • FIM Schulung (Co-developed with colleague): https://fim-schulung.de/\n • Falcos GmbH Public Sector: https://falcos.de/";

    const textWhoamiDE = "Emin Girimhanov. B.Sc. Wirtschaftsinformatik-Student @OVGU Magdeburg (Note 1,6), e-fellows.net Stipendiat und Softwareentwickler @Falcos GmbH. Entwickler von autohaus-kleinjena.netlify.app.";
    const textWhoamiEN = "Emin Girimhanov. Business Informatics student @OVGU Magdeburg (1.6 GPA), e-fellows.net scholar, and Software Developer @Falcos GmbH. Developer of autohaus-kleinjena.netlify.app.";

    const textSkillsDE = "Technologien: Python, Java, JavaScript, TypeScript, React, Node.js, Docusaurus, SQL, Proxmox VE, n8n, 3D-Druck (FDM), Certified ScrumMaster (CSM).";
    const textSkillsEN = "Technologies: Python, Java, JavaScript, TypeScript, React, Node.js, Docusaurus, SQL, Proxmox VE, n8n, 3D Printing (FDM), Certified ScrumMaster (CSM).";

    const textEngagementDE = "Engagement & Consulting:\n 1. SIDUM e.V. (Finanzen & Recht, PwC GenAI Masterclass, d-fine Expected-Goals Kreditmodelle)\n 2. Fachschaftsrat FIN OVGU (Stellvertreter, Erstsemester-Logistik, IT & Wiki)\n 3. Gewählter Klassensprecher CJD Droyßig";
    const textEngagementEN = "Engagement & Consulting:\n 1. SIDUM e.V. (Finance & Legal, PwC GenAI Masterclass, d-fine credit models)\n 2. Student Council Representative FIN OVGU (Orientation Weeks, IT & Wiki)\n 3. Elected Class Representative CJD Droyßig";

    const textKontaktDE = "Kontakt:\n • E-Mail: emin.girimhanov@posteo.de\n • LinkedIn: https://www.linkedin.com/in/emin-girimhanov/\n • GitHub: https://github.com/emin-girimhanov";
    const textKontaktEN = "Contact:\n • E-Mail: emin.girimhanov@posteo.de\n • LinkedIn: https://www.linkedin.com/in/emin-girimhanov/\n • GitHub: https://github.com/emin-girimhanov";

    // Command Aliases Map
    const aliasMap = {
        whoami: 'whoami', about: 'whoami', profil: 'whoami', profile: 'whoami',
        webseiten: 'webseiten', produkte: 'webseiten', autohaus: 'webseiten', fim: 'webseiten', websites: 'webseiten',
        skills: 'skills', kenntnisse: 'skills', tech: 'skills', stack: 'skills',
        erfahrung: 'erfahrung', erfahrungen: 'erfahrung', projekte: 'erfahrung', projects: 'erfahrung', experience: 'erfahrung',
        engagement: 'engagement', consulting: 'engagement', sidum: 'engagement', farafin: 'engagement',
        impressum: 'impressum', legal: 'impressum', imprint: 'impressum',
        kontakt: 'kontakt', contact: 'kontakt', email: 'kontakt', mail: 'kontakt', linkedin: 'kontakt'
    };

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
        }
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
        }
    }

    function getCommandText(primaryCmd, lang) {
        if (primaryCmd === 'impressum') {
            openModal('impressum-modal');
            return lang === 'de' ? "Öffne Impressum Modal..." : "Opening Imprint Modal...";
        }

        if (lang === 'de') {
            switch (primaryCmd) {
                case 'whoami': return textWhoamiDE;
                case 'webseiten': return textWebsitesDE;
                case 'skills': return textSkillsDE;
                case 'erfahrung': return textExperienceDE;
                case 'engagement': return textEngagementDE;
                case 'kontakt': return textKontaktDE;
                case 'help': return "Optionen: whoami, webseiten, skills, erfahrung, engagement, impressum, kontakt, clear";
                default: return null;
            }
        } else {
            switch (primaryCmd) {
                case 'whoami': return textWhoamiEN;
                case 'webseiten': return textWebsitesEN;
                case 'skills': return textSkillsEN;
                case 'erfahrung': return textExperienceEN;
                case 'engagement': return textEngagementEN;
                case 'kontakt': return textKontaktEN;
                case 'help': return "Options: whoami, webseiten, skills, experience, engagement, impressum, contact, clear";
                default: return null;
            }
        }
    }

    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('site-lang', lang);
        document.documentElement.lang = lang;

        if (langLabel) {
            langLabel.innerText = lang === 'de' ? 'EN' : 'DE';
        }

        const elements = document.querySelectorAll('[data-de][data-en]');
        elements.forEach(el => {
            const text = el.getAttribute(`data-${lang}`);
            if (text) {
                const tempDoc = new DOMParser().parseFromString(text, 'text/html');
                el.innerText = tempDoc.body.textContent;
            }
        });

        const inputs = document.querySelectorAll('[data-de-placeholder][data-en-placeholder]');
        inputs.forEach(input => {
            const placeholder = input.getAttribute(`data-${lang}-placeholder`);
            if (placeholder) {
                const tempDoc = new DOMParser().parseFromString(placeholder, 'text/html');
                input.placeholder = tempDoc.body.textContent;
            }
        });
    }

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            const nextLang = currentLang === 'de' ? 'en' : 'de';
            applyLanguage(nextLang);
        });
    }

    applyLanguage(currentLang);

    // Terminal Command Execution
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    const presetBtns = document.querySelectorAll('.preset-btn');

    function runCommand(cmd) {
        const rawCmd = cmd.trim().toLowerCase();
        const inputLine = document.createElement('p');
        inputLine.className = 'terminal-line';
        inputLine.innerHTML = `<span class="prompt-user">emin</span>@<span class="prompt-host">ovgu</span>:<span class="prompt-path">~</span>$ ${rawCmd}`;
        terminalOutput.appendChild(inputLine);

        if (rawCmd === 'clear') {
            terminalOutput.innerHTML = '';
            return;
        }

        if (rawCmd === '') {
            return;
        }

        const primaryCmd = aliasMap[rawCmd] || rawCmd;
        const responseText = getCommandText(primaryCmd, currentLang);

        const resultLine = document.createElement('div');
        resultLine.className = 'terminal-result';

        if (responseText) {
            resultLine.innerText = responseText;
        } else {
            resultLine.innerText = currentLang === 'de' 
                ? `Befehl '${rawCmd}' unbekannt. Tippe 'help' für Hilfe.`
                : `Command '${rawCmd}' not found. Type 'help' for options.`;
        }

        terminalOutput.appendChild(resultLine);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                runCommand(terminalInput.value);
                terminalInput.value = '';
            }
        });
    }

    presetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const cmd = btn.getAttribute('data-cmd');
            runCommand(cmd);
        });
    });

    // Portfolio Category Filtering (Supports Multiple Categories)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = (card.getAttribute('data-category') || '').split(' ');
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Copy Email to Clipboard
    const copyEmailBtn = document.getElementById('copy-email-btn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            const email = "emin.girimhanov@posteo.de";
            navigator.clipboard.writeText(email).then(() => {
                const originalHTML = copyEmailBtn.innerHTML;
                copyEmailBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg> ${currentLang === 'de' ? 'Kopiert!' : 'Copied!'}`;
                
                setTimeout(() => {
                    copyEmailBtn.innerHTML = originalHTML;
                }, 2000);
            });
        });
    }

    // Modal Trigger Listeners
    const openImpressumBtn = document.getElementById('open-impressum-btn');
    const openImpressumNavBtn = document.getElementById('open-impressum-nav-btn');
    const closeImpressumBtn = document.getElementById('close-impressum-btn');
    
    const openPrivacyBtn = document.getElementById('open-privacy-btn');
    const closePrivacyBtn = document.getElementById('close-privacy-btn');
    
    const closeLightboxBtn = document.getElementById('close-lightbox-btn');

    if (openImpressumBtn) openImpressumBtn.addEventListener('click', () => openModal('impressum-modal'));
    if (openImpressumNavBtn) openImpressumNavBtn.addEventListener('click', () => openModal('impressum-modal'));
    if (closeImpressumBtn) closeImpressumBtn.addEventListener('click', () => closeModal('impressum-modal'));

    if (openPrivacyBtn) openPrivacyBtn.addEventListener('click', () => openModal('privacy-modal'));
    if (closePrivacyBtn) closePrivacyBtn.addEventListener('click', () => closeModal('privacy-modal'));

    if (closeLightboxBtn) closeLightboxBtn.addEventListener('click', () => closeModal('lightbox-modal'));

    // Close Modals on Overlay Click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal(overlay.id);
            }
        });
    });

    // Close Modals on ESC Key Press (A11Y)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal('impressum-modal');
            closeModal('privacy-modal');
            closeModal('lightbox-modal');
        }
    });
});

// Force unregister any legacy service workers & clear old browser caches
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
        for (let registration of registrations) {
            registration.unregister();
        }
    });
}
if ('caches' in window) {
    caches.keys().then(names => {
        for (let name of names) {
            caches.delete(name);
        }
    });
}

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

    const textExperienceDE = "Erfahrungen & Produkte:\n 1. Falcos GmbH (Softwareentwickler Public Sector: XÖV-ZUGFeRD Parser, Top 100 EU-SDG Verwaltungsleistungen)\n 2. OVGU Magdeburg (Tutor in Algorithmen & Datenstrukturen + Vorkurstutor Mathematik)\n 3. Autohaus Kleinjena (Eigenentwicklung Web-Portal & Schaufenster: https://autohaus-kleinjena.netlify.app/)\n 4. FIM Schulung (Co-Entwickler E-Learning Plattform im Public Sector: https://fim-schulung.de/)\n 5. Softwareprojekt OSCAR (Modularer Semesterplanungs-Bot & Academic Roadmapper)\n 6. SIDUM e.V. (Kreditentscheidungs-Use-Cases mit d-fine & PwC GenAI Masterclass)\n 7. Autonomer Mähroboter & CJD Droyßig 3D-Schulcampus (Digitalisierungspreis)";
    const textExperienceEN = "Experience & Products:\n 1. Falcos GmbH (Software Developer Public Sector: XÖV-ZUGFeRD Parsers, Top 100 EU-SDG Services)\n 2. OVGU Magdeburg (Tutor in Algorithms & Data Structures + Mathematics Prep Course Tutor)\n 3. Autohaus Kleinjena (Full Web Portal & Car Showroom: https://autohaus-kleinjena.netlify.app/)\n 4. FIM Schulung (Co-developer E-Learning Platform Public Sector: https://fim-schulung.de/)\n 5. Software Project OSCAR (Modular Semester Planning Bot & Academic Roadmapper)\n 6. SIDUM e.V. (Credit decision models with d-fine & PwC GenAI Masterclass)\n 7. Autonomous Mower & CJD Droyßig 3D School Campus (Digitalization Award)";

    const textWebsitesDE = "Highlights Web-Anwendungen:\n • Autohaus Kleinjena (Erstellt von Emin): https://autohaus-kleinjena.netlify.app/\n • FIM Schulung (Mit Kollegin verbessert): https://fim-schulung.de/\n • Falcos GmbH Public Sector: https://falcos.de/";
    const textWebsitesEN = "Featured Web Applications:\n • Autohaus Kleinjena (Created by Emin): https://autohaus-kleinjena.netlify.app/\n • FIM Schulung (Co-developed with colleague): https://fim-schulung.de/\n • Falcos GmbH Public Sector: https://falcos.de/";

    const textWhoamiDE = "Emin Girimhanov. B.Sc. Wirtschaftsinformatik-Student @OVGU Magdeburg (Note 1,6 | 140 CP von regulär 120 CP), Schwerpunkte IT-Sicherheit & Data Science, e-fellows.net Stipendiat, Softwareentwickler @Falcos GmbH & FIN OVGU Tutor.";
    const textWhoamiEN = "Emin Girimhanov. Business Informatics student @OVGU Magdeburg (GPA 1.6 | 140 CP), focus IT Security & Data Science, e-fellows.net scholar, Software Developer @Falcos GmbH & FIN OVGU Tutor.";

    const textSkillsDE = "IT & Stack: Java, Python, JavaScript/TypeScript, React, Node.js, Docusaurus, SQL, Proxmox VE (Nextcloud, Paperless-ngx, Stirling, Firefly III, SearXNG, n8n), 3D-Druck (FDM), XÖV-Modellierung, Git.\nZertifikate: Certified ScrumMaster® (CSM), FIM-Informationsmanager.\nInteressen: Process Automation (n8n & LLM), Digitale Souveränität Europas, Finanzbildung.";
    const textSkillsEN = "IT & Stack: Java, Python, JavaScript/TypeScript, React, Node.js, Docusaurus, SQL, Proxmox VE (Nextcloud, Paperless-ngx, Stirling, Firefly III, SearXNG, n8n), 3D Printing (FDM), XÖV Modeling, Git.\nCertificates: Certified ScrumMaster® (CSM), FIM Information Manager.\nInterests: Process Automation (n8n & LLM), European Digital Sovereignty, Financial Literacy.";

    const textEngagementDE = "Engagement & Consulting:\n 1. Fachschaftsrat FIN OVGU (Gewählter Stellvertreter: Erstsemesterwochen für 150+ Studierende, IT-Adminreferat, Wiki-Ausbau)\n 2. SIDUM e.V. (Ressort Finanzen & Recht, PwC GenAI Masterclass, d-fine Kreditentscheidungs-Modelle, JC-NetworkDays)\n 3. CJD Droyßig (Gewählter Klassensprecher, 3D-Schulcampus Digitalpreis)";
    const textEngagementEN = "Engagement & Consulting:\n 1. Student Council FIN OVGU (Elected Representative: Orientation weeks for 150+ students, IT Administration, Wiki expansion)\n 2. SIDUM e.V. (Finance & Legal, PwC GenAI Masterclass, d-fine credit decision models, JC-NetworkDays)\n 3. CJD Droyßig (Elected Class Representative, 3D Campus Digitalization Award)";

    const textKontaktDE = "Kontakt:\n • E-Mail: emin.girimhanov@posteo.de\n • Telefon: +49 1522 9947465\n • Mastodon: machteburch.social/@emin\n • LinkedIn: https://www.linkedin.com/in/emin-girimhanov/\n • GitHub: https://github.com/emin-girimhanov";
    const textKontaktEN = "Contact:\n • E-Mail: emin.girimhanov@posteo.de\n • Phone: +49 1522 9947465\n • Mastodon: machteburch.social/@emin\n • LinkedIn: https://www.linkedin.com/in/emin-girimhanov/\n • GitHub: https://github.com/emin-girimhanov";

    // Command Aliases Map
    const aliasMap = {
        whoami: 'whoami', about: 'whoami', profil: 'whoami', profile: 'whoami',
        webseiten: 'webseiten', produkte: 'webseiten', autohaus: 'webseiten', fim: 'webseiten', websites: 'webseiten',
        skills: 'skills', kenntnisse: 'skills', tech: 'skills', stack: 'skills', zertifikate: 'skills',
        erfahrung: 'erfahrung', erfahrungen: 'erfahrung', projekte: 'erfahrung', projects: 'erfahrung', experience: 'erfahrung', oscar: 'erfahrung', tutor: 'erfahrung',
        engagement: 'engagement', consulting: 'engagement', sidum: 'engagement', farafin: 'engagement',
        impressum: 'impressum', legal: 'impressum', imprint: 'impressum',
        datenschutz: 'datenschutz', privacy: 'datenschutz', dsgvo: 'datenschutz',
        kontakt: 'kontakt', contact: 'kontakt', email: 'kontakt', mail: 'kontakt', linkedin: 'kontakt'
    };

    let previouslyFocusedElement = null;

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            previouslyFocusedElement = document.activeElement;
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';

            const closeBtn = modal.querySelector('.modal-close-btn');
            if (closeBtn) {
                setTimeout(() => closeBtn.focus(), 50);
            }
        }
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';

            if (previouslyFocusedElement && typeof previouslyFocusedElement.focus === 'function') {
                previouslyFocusedElement.focus();
            }
        }
    }

    function getCommandText(primaryCmd, lang) {
        if (primaryCmd === 'impressum') {
            setTimeout(() => { window.location.href = 'impressum.html'; }, 700);
            return lang === 'de' ? "Öffne Impressum (impressum.html) ..." : "Opening imprint (impressum.html) ...";
        }

        if (primaryCmd === 'datenschutz') {
            setTimeout(() => { window.location.href = 'datenschutz.html'; }, 700);
            return lang === 'de' ? "Öffne Datenschutzerklärung ..." : "Opening privacy policy ...";
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

    // Beim Sprachwechsel erlaubte Auszeichnungen. Alles andere wird reiner Text.
    const ALLOWED_TAGS = ['A', 'STRONG', 'EM', 'B', 'I', 'BR', 'SPAN'];

    function buildSafeFragment(html) {
        const parsed = new DOMParser().parseFromString(html, 'text/html');
        const fragment = document.createDocumentFragment();

        function copy(source, target) {
            source.childNodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE) {
                    target.appendChild(document.createTextNode(node.nodeValue));
                    return;
                }
                if (node.nodeType !== Node.ELEMENT_NODE) return;

                if (!ALLOWED_TAGS.includes(node.tagName)) {
                    copy(node, target);
                    return;
                }

                const el = document.createElement(node.tagName.toLowerCase());

                if (node.tagName === 'A') {
                    const href = node.getAttribute('href') || '';
                    if (/^(https?:|mailto:|#)/i.test(href)) {
                        el.setAttribute('href', href);
                    }
                    if (/^https?:/i.test(href)) {
                        el.target = '_blank';
                        el.rel = 'noopener noreferrer';
                    }
                }

                ['class', 'aria-label', 'title'].forEach(attr => {
                    const val = node.getAttribute(attr);
                    if (val) el.setAttribute(attr, val);
                });

                copy(node, el);
                target.appendChild(el);
            });
        }

        copy(parsed.body, fragment);
        return fragment;
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
            if (text !== null) {
                el.replaceChildren(buildSafeFragment(text));
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

    // --- Mobile Navigation (Burger) ---
    const navToggleBtn = document.getElementById('nav-toggle-btn');
    const navLinks = document.getElementById('nav-links');

    if (navToggleBtn && navLinks) {
        const setNavOpen = (open) => {
            navLinks.classList.toggle('open', open);
            navToggleBtn.setAttribute('aria-expanded', String(open));
            navToggleBtn.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
        };

        navToggleBtn.addEventListener('click', () => {
            setNavOpen(navToggleBtn.getAttribute('aria-expanded') !== 'true');
        });

        // Nach dem Antippen eines Links schliesst sich das Menue wieder.
        navLinks.addEventListener('click', (e) => {
            if (e.target.closest('a')) setNavOpen(false);
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') setNavOpen(false);
        });
    }

    // --- Lightbox: mit Maus UND Tastatur bedienbar (WCAG 2.1.1) ---
    document.querySelectorAll('[data-lightbox]').forEach(el => {
        const show = () => openLightbox(el.dataset.lightbox, el.dataset.lightboxCaption || '');

        if (!el.hasAttribute('aria-label')) {
            const caption = el.dataset.lightboxCaption || el.getAttribute('alt') || 'Bild';
            el.setAttribute('aria-label', caption + ' vergrößern');
        }

        el.addEventListener('click', show);
        el.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                show();
            }
        });
    });

    // Terminal Command Execution
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    const presetBtns = document.querySelectorAll('.preset-btn');

    let currentTypingTimer = null;

    // Screenreader-Meldung: eine Ansage pro Befehl statt pro Zeichen.
    let liveRegion = null;

    function announce(message) {
        if (!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.className = 'sr-only';
            liveRegion.setAttribute('aria-live', 'polite');
            document.body.appendChild(liveRegion);
        }
        liveRegion.textContent = message;
    }

    function runCommand(cmd) {
        const rawCmd = cmd.trim().toLowerCase();
        const inputLine = document.createElement('p');
        inputLine.className = 'terminal-line';
        const mkSpan = (cls, txt) => {
            const el = document.createElement('span');
            el.className = cls;
            el.textContent = txt;
            return el;
        };
        inputLine.append(mkSpan('prompt-user', 'emin'), '@', mkSpan('prompt-host', 'ovgu'),
                         ':', mkSpan('prompt-path', '~'), '$ ', rawCmd);
        terminalOutput.appendChild(inputLine);

        if (rawCmd === 'clear') {
            if (currentTypingTimer) {
                clearInterval(currentTypingTimer);
                currentTypingTimer = null;
            }
            terminalOutput.innerHTML = '';
            return;
        }

        if (rawCmd === '') {
            return;
        }

        const primaryCmd = aliasMap[rawCmd] || rawCmd;
        const responseText = getCommandText(primaryCmd, currentLang) || (currentLang === 'de' 
            ? `Befehl '${rawCmd}' unbekannt. Tippe 'help' für Hilfe.`
            : `Command '${rawCmd}' not found. Type 'help' for options.`);

        const resultLine = document.createElement('div');
        resultLine.className = 'terminal-result';
        terminalOutput.appendChild(resultLine);

        // Smooth & Readable Schreibanimation (1 Zeichen alle 18ms für gut mitlesbares Tippen)
        if (currentTypingTimer) {
            clearInterval(currentTypingTimer);
            currentTypingTimer = null;
        }

        const cursorSpan = document.createElement('span');
        cursorSpan.className = 'terminal-cursor';
        cursorSpan.innerText = ' ▌';
        resultLine.appendChild(cursorSpan);

        let i = 0;
        const chunkSize = 1;
        const speed = 13;   // Millisekunden je Zeichen

        currentTypingTimer = setInterval(() => {
            if (i < responseText.length) {
                const chunk = responseText.substr(i, chunkSize);
                cursorSpan.before(document.createTextNode(chunk));
                i += chunkSize;
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            } else {
                clearInterval(currentTypingTimer);
                currentTypingTimer = null;
                cursorSpan.remove();
                announce(responseText);
            }
        }, speed);
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
            if (terminalInput) {
                terminalInput.value = cmd;
                setTimeout(() => {
                    runCommand(cmd);
                    terminalInput.value = '';
                }, 100);
            } else {
                runCommand(cmd);
            }
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
                const tooltip = document.getElementById('copy-tooltip');
                if (tooltip) {
                    tooltip.innerText = currentLang === 'de' ? 'Kopiert! ✓' : 'Copied! ✓';
                    copyEmailBtn.classList.add('copied');
                    setTimeout(() => {
                        tooltip.innerText = currentLang === 'de' ? 'Kopieren' : 'Copy';
                        copyEmailBtn.classList.remove('copied');
                    }, 2000);
                }
            });
        });
    }

    // Modal Trigger Listeners
    const closeLightboxBtn = document.getElementById('close-lightbox-btn');
    const closeCaseStudyBtn = document.getElementById('close-case-study-btn');

    if (closeLightboxBtn) closeLightboxBtn.addEventListener('click', () => closeModal('lightbox-modal'));
    if (closeCaseStudyBtn) closeCaseStudyBtn.addEventListener('click', () => closeModal('case-study-modal'));

    // --- Case Study Modals Data Map ---
    const caseStudies = {
        autohaus: {
            title: "Autohaus Kleinjena Web-Portal",
            type: "Web-Anwendung & Digitales Portal",
            badgeClass: "badge-creator",
            badgeDE: "✨ Eigenentwicklung",
            badgeEN: "✨ Created by Emin",
            problemDE: "Autohaus Kleinjena benötigte einen modernen, professionellen digitalen Web-Auftritt, um Fahrzeuge visuell zu präsentieren, Reparatur- und Service-Anfragen entgegenzunehmen und Kunden ohne Zwischenhändler anzusprechen.",
            problemEN: "Autohaus Kleinjena needed a modern, professional web platform to digitally showcase vehicles, handle repair & service inquiries, and reach customers directly.",
            solutionDE: "Vollständige Konzeption und Entwicklung eines responsiven Web-Portals mit modernem UI/UX-Design, interaktiver Fahrzeug-Filterung, Servicetermin-Modals und optimierter Ladezeit auf Netlify.",
            solutionEN: "Full design and development of a responsive web portal featuring a modern UI/UX design, interactive vehicle showcase, service booking modals, and optimized loading times on Netlify.",
            roleDE: "Full-Stack Webentwickler & Designer (Eigenentwicklung). Tech-Stack: HTML5, CSS3, JavaScript, Netlify Hosting, SEO & Accessibility Optimierung.",
            roleEN: "Full-Stack Web Developer & Designer (Independent Project). Tech-Stack: HTML5, CSS3, JavaScript, Netlify Hosting, SEO & Accessibility Optimization.",
            impactDE: "Digitale Präsenz für Autohaus Kleinjena, messbare Steigerung von Online-Serviceanfragen und performante Auslieferung über globales CDN.",
            impactEN: "Digital presence for Autohaus Kleinjena, measurable increase in online service inquiries, and high performance via global CDN.",
            link: "https://autohaus-kleinjena.netlify.app/"
        },
        fim: {
            title: "FIM Schulung – E-Learning Portal",
            type: "E-Learning & Public Sector Plattform",
            badgeClass: "badge-teamwork",
            badgeDE: "🤝 Mit Kollegin verbessert",
            badgeEN: "🤝 Co-developed with colleague",
            problemDE: "Die bestehende Schulungsplattform für das Föderale Informationsmanagement (FIM) im Öffentlichen Sektor benötigte eine umfassende visuelle und funktionale Überarbeitung, um Lerninhalte barrierefrei und benutzerfreundlich zugänglich zu machen.",
            problemEN: "The existing training platform for Federal Information Management (FIM) in the public sector required a visual and functional overhaul to make learning content accessible and user-friendly.",
            solutionDE: "Neugestaltung der Benutzeroberfläche gemeinsam mit einer Kollegin. Optimierung der Navigationsstruktur, barrierefreie WCAG-Zugänglichkeit und verständliches Lern-UI für Verwaltungsmitarbeiter.",
            solutionEN: "Redesign of the UI co-developed with a colleague. Optimized navigation structure, WCAG accessibility compliance, and clear e-learning UI for public sector staff.",
            roleDE: "Frontend Developer & UI/UX Co-Creator. Tech-Stack: FIM Standard, Web-Standards, Accessibility Guidelines (WCAG 2.1 AA).",
            roleEN: "Frontend Developer & UI/UX Co-Creator. Tech-Stack: FIM Standard, Web Standards, Accessibility Guidelines (WCAG 2.1 AA).",
            impactDE: "Deutliche Verbesserung der Usability und Barrierefreiheit für Hunderte Lernende im FIM-Umfeld der öffentlichen Verwaltung.",
            impactEN: "Significant improvement in usability and accessibility for hundreds of learners across public administration.",
            link: "https://fim-schulung.de/"
        },
        falcos: {
            title: "Softwareentwicklung im Public Sector",
            type: "Behörden-Automatisierung & Web-Engineering",
            badgeClass: "badge-work",
            badgeDE: "Falcos GmbH Software Dev",
            badgeEN: "Falcos GmbH Software Dev",
            problemDE: "Behörden und öffentliche Institutionen verarbeiten täglich große Mengen strukturierter und unstrukturierter Daten (XÖV / ZUGFeRD), was ohne Automatisierung zu hohen manuellen Erfassungszeiten führt.",
            problemEN: "Public sector entities handle large volumes of structured XÖV / ZUGFeRD data daily, causing high manual data entry workloads without automated processing.",
            solutionDE: "Entwicklung automatisierter XÖV-ZUGFeRD Parser, Docusaurus-Dokumentationsportale und LLM-gestützter Prozessautomatisierungen mit Google AppScripts und modernen Web-Frameworks.",
            solutionEN: "Developing automated XÖV-ZUGFeRD parsers, Docusaurus documentation portals, and LLM-assisted process automation using Google AppScripts and web frameworks.",
            roleDE: "Softwareentwickler im Public Sector @ Falcos GmbH. Tech-Stack: Python, Java, TypeScript, XÖV, Docusaurus, WordPress, LLM / AppScripts.",
            roleEN: "Public Sector Software Developer @ Falcos GmbH. Tech-Stack: Python, Java, TypeScript, XÖV, Docusaurus, WordPress, LLM / AppScripts.",
            impactDE: "Drastische Reduktion manueller Datenerfassungszeiten in Behörden und Bereitstellung hochverfügbarer Dokumentations-Frameworks.",
            impactEN: "Drastic reduction in manual data entry processing times for public administration partners.",
            link: "https://falcos.de"
        },
        sidum: {
            title: "Studentische Unternehmensberatung (SIDUM e.V.)",
            type: "Finanzen & Recht Consulting",
            badgeClass: "badge-engagement",
            badgeDE: "SIDUM e.V. Finanzen & Recht",
            badgeEN: "SIDUM e.V. Finance & Legal",
            problemDE: "Komplexe Kreditentscheidungs-Prozesse in Banken und Finanzdienstleistern erfordern präzise Risikomodellierung und moderne GenAI-Anwendungsfälle.",
            problemEN: "Complex credit decision processes in financial institutions demand precise risk modeling and modern GenAI use cases.",
            solutionDE: "Mitarbeit an Expected-Goals-Kreditentscheidungsmodellen in Zusammenarbeit mit d-fine sowie Teilnahme an der zertifizierten PwC GenAI Masterclass für angewandte KI-Methoden.",
            solutionEN: "Collaborating on Expected-Goals credit decision models with d-fine and completing the certified PwC GenAI Masterclass for applied AI methods.",
            roleDE: "Consultant / Ressort Finanzen & Recht @ SIDUM e.V. Tech-Stack: Expected-Goals-Modellierung, d-fine Workshop, PwC GenAI Frameworks.",
            roleEN: "Consultant / Finance & Legal @ SIDUM e.V. Tech-Stack: Expected-Goals Modeling, d-fine Workshop, PwC GenAI Frameworks.",
            impactDE: "Optimierung von Risikobewertungsmodellen und Transfer moderner Generativer KI-Ansätze in Beratungskonzepte.",
            impactEN: "Optimization of risk assessment models and application of generative AI methodologies to consulting cases.",
            link: "https://www.sidum.de/"
        },
        mower: {
            title: "Autonomer Rasenmäherroboter",
            type: "3D-Druck, Sensorik & Aktorik (Kursarbeit Informatik)",
            badgeClass: "badge-hardware",
            badgeDE: "🤖 3D-Druck & Sensorik",
            badgeEN: "🤖 3D-Printing & Sensors",
            problemDE: "Entwicklung eines funktionalen, autonomen Rasenmäherroboters inklusive eigener Sensorik, Aktorik und Gehäusekonstruktion im Rahmen der Informatik-Kursarbeit.",
            problemEN: "Designing a functional autonomous robotic mower including custom sensors, actuators, and chassis construction for computer science coursework.",
            solutionDE: "Eigenhändiger 3D-Druck sämtlicher Kunststoffbauteile und Chassis-Komponenten. Programmierung der digitalen Steuerung, Sensorik und Aktorik im Zweierteam.",
            solutionEN: "Custom 3D printing of all plastic chassis components. Programming digital control, sensors, and actuators in a 2-person team.",
            roleDE: "Hardware & Software Co-Developer. Tech-Stack: FDM 3D-Druck, Sensorik & Aktorik, Digitale Steuerung, Python, CAD.",
            roleEN: "Hardware & Software Co-Developer. Tech-Stack: FDM 3D Printing, Sensors & Actuators, Digital Control, Python, CAD.",
            impactDE: "Geniestreich in der Kursarbeit Informatik: Voll funktionsfähiger Mähroboter mit selbst gedruckten Bauteilen und autonomer Sensorik.",
            impactEN: "Outstanding computer science coursework project: Fully functional robotic mower with self-printed components and autonomous sensors.",
            link: null
        },
        campus3d: {
            title: "CJD Schulcampus 3D-Modellierung (1:150)",
            type: "3D-CAD & Digitalisierung",
            badgeClass: "badge-award",
            badgeDE: "🏆 Sonderpreis Digitalisierung 2024",
            badgeEN: "🏆 Digitalization Prize 2024",
            problemDE: "Erstellung eines maßstabsgetreuen 3D-Modells des gesamten historischen Schulgebäudeensembles der CJD Christophorusschule Droyßig.",
            problemEN: "Creating a scale-accurate 3D model of the entire historical school building ensemble at CJD Droyßig.",
            solutionDE: "Digitalisierung historischer Baupläne, Fotos und Vermessungen mittels CAD-Software. 3D-Druck des kompletten Gebäudekomplexes im Maßstab 1:150 auf Hochschulniveau.",
            solutionEN: "Digitalizing historical building plans, photos, and site measurements using CAD software. 3D printing the entire campus ensemble at 1:150 scale ('university level').",
            roleDE: "Projektleiter & CAD-Designer. Tech-Stack: CAD (Computer-Aided Design), FDM 3D-Druck, Bauplandigitalisierung.",
            roleEN: "Project Lead & CAD Designer. Tech-Stack: CAD (Computer-Aided Design), FDM 3D Printing, Architectural Digitalization.",
            impactDE: "Ausgezeichnet mit dem 'Sonderpreis für Digitalisierung / Modellierung / Digitaltechnik 2024'. Das Modell ist dauerhaft im Paulusraum der Schule ausgestellt.",
            impactEN: "Awarded the 'Special Digitalization / Modeling Prize 2024'. Permanently displayed in the school's Paulusraum.",
            link: null
        },
        farafin: {
            title: "Fachschaftsrat der Fakultät für Informatik (FIN OVGU)",
            type: "Gewählter Stellvertreter & IT-Adminreferat",
            badgeClass: "badge-work",
            badgeDE: "🏛️ Gewählter Stellvertreter",
            badgeEN: "🏛️ Elected Representative",
            problemDE: "Betreuung und Koordination von über 150 Erstsemester-Studierenden, Vorbereitung von Großveranstaltungen und barrierefreie Wissensbereitstellung für Informatikstudierende an der OVGU.",
            problemEN: "Coordinating and guiding 150+ freshman students, managing large orientation events, and structuring knowledge access for CS students.",
            solutionDE: "Eigenverantwortliche Leitung von 2 Erstsemesterwochen (150+ / 80+ Studierende), Implementierung automatisierter Workflows mit n8n & LLMs für Fachschaftsprozesse, Ausbau des Wikis und Betreuung der IT-Infrastruktur.",
            solutionEN: "Leading 2 orientation weeks for 150+ / 80+ students, implementing automated workflows with n8n & LLMs for student council tasks, expanding the internal wiki, and managing council IT.",
            roleDE: "Gewählter Stellvertreter & IT-Adminreferat. Tech-Stack: n8n, LLM Workflows, MediaWiki, Linux Server, Event Logistik.",
            roleEN: "Elected Representative & IT Administrator. Tech-Stack: n8n, LLM Workflows, MediaWiki, Linux Server, Event Logistics.",
            impactDE: "Erfolgreiche Integration von Hunderten Erstsemestern, nachhaltiges Wissensmanagement und moderne n8n/LLM-Prozessautomatisierung.",
            impactEN: "Successful onboarding of hundreds of CS students, scalable knowledge retention, and modern n8n/LLM process automation.",
            link: "https://farafin.de"
        },
        oscar: {
            title: "Softwareprojekt OSCAR",
            type: "Semesterplanungs-Bot & Academic Roadmapper",
            badgeClass: "badge-creator",
            badgeDE: "✨ Softwareprojekt OVGU",
            badgeEN: "✨ Software Project OVGU",
            problemDE: "Informatik-Studierende stehen zu Studienbeginn vor der Herausforderung, komplexe Modulpläne, Voraussetzungen und Stundenpläne händisch abzugleichen.",
            problemEN: "Computer science freshmen face challenges manually aligning complex module plans, prerequisites, and schedules.",
            solutionDE: "Kollaborative Entwicklung eines modularen Bots (Organized Study Choice & Academic Roadmapper), der Studierende bei der Semesterplanung unterstützt und in die Erstsemesterwoche (Code Games) eingebettet wird.",
            solutionEN: "Collaborative development of a modular bot (Organized Study Choice & Academic Roadmapper) assisting students in course scheduling and integrated into freshman Code Games.",
            roleDE: "Softwareentwickler im Team. Tech-Stack: Python, Bot-Frameworks, Modular Architecture, Academic Roadmapping.",
            roleEN: "Software Developer in Team. Tech-Stack: Python, Bot Frameworks, Modular Architecture, Academic Roadmapping.",
            impactDE: "Zeitersparnis bei der Stundenplanerstellung und Skalierbarkeit für weitere Fakultäten der OVGU Magdeburg.",
            impactEN: "Time savings in schedule planning and scalability across multiple faculties at OVGU Magdeburg.",
            link: "https://isggit3.cs.ovgu.de/studium-lehre/discord-bot"
        }
    };

    window.openCaseStudy = function(key) {
        const cs = caseStudies[key];
        if (!cs) return;

        const title = document.getElementById('case-study-title');
        const type = document.getElementById('case-study-type');
        const badge = document.getElementById('case-study-badge');
        const problem = document.getElementById('case-study-problem');
        const solution = document.getElementById('case-study-solution');
        const role = document.getElementById('case-study-role');
        const impact = document.getElementById('case-study-impact');
        const link = document.getElementById('case-study-link');

        if (title) title.innerText = cs.title;
        if (type) type.innerText = cs.type;
        if (badge) {
            badge.className = `badge-role ${cs.badgeClass}`;
            badge.innerText = currentLang === 'de' ? cs.badgeDE : cs.badgeEN;
        }
        if (problem) problem.innerText = currentLang === 'de' ? cs.problemDE : cs.problemEN;
        if (solution) solution.innerText = currentLang === 'de' ? cs.solutionDE : cs.solutionEN;
        if (role) role.innerText = currentLang === 'de' ? cs.roleDE : cs.roleEN;
        if (impact) impact.innerText = currentLang === 'de' ? cs.impactDE : cs.impactEN;
        if (link) {
            // Ohne oeffentliches Ziel wird der Knopf ausgeblendet statt ins Leere zu fuehren.
            link.href = cs.link || '#';
            link.hidden = !cs.link;
        }

        openModal('case-study-modal');
    };

    document.querySelectorAll('.case-study-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const key = btn.getAttribute('data-project');
            if (key) openCaseStudy(key);
        });
    });

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
            closeModal('lightbox-modal');
            closeModal('case-study-modal');
        }
    });

    // --- Scroll-Driven Auto-Growing Line & Station Highlight for "Meine Reise" ---
    const timelineWrapper = document.querySelector('.timeline-wrapper');
    const timelineProgressBar = document.getElementById('timeline-progress-bar');
    const timelineItems = document.querySelectorAll('.timeline-item');

    function updateTimelineProgress() {
        if (!timelineWrapper || !timelineProgressBar) return;

        const rect = timelineWrapper.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Compute how far scroll has progressed relative to the timeline container
        const startOffset = viewportHeight * 0.65;
        const currentY = startOffset - rect.top;
        const totalHeight = rect.height;

        let progressRatio = currentY / totalHeight;
        progressRatio = Math.max(0, Math.min(1, progressRatio));

        timelineProgressBar.style.height = (progressRatio * 100) + '%';

        // Station items highlight as progress line reaches them
        timelineItems.forEach(item => {
            const itemRect = item.getBoundingClientRect();
            if (itemRect.top < viewportHeight * 0.70) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateTimelineProgress);
    });
    window.addEventListener('resize', updateTimelineProgress);
    updateTimelineProgress();

    // --- Canvas UI Interactive Particle & Shimmer Effect (CanvasUI.dev inspired) ---
    const canvas = document.getElementById('canvas-ui-bg');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        
        let mouse = { x: width / 2, y: height / 2, active: false };

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            mouse.active = true;
        });

        window.addEventListener('mouseleave', () => {
            mouse.active = false;
        });

        const particleCount = Math.min(Math.floor(width * 0.035), 45);
        const particles = [];

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.45,
                vy: (Math.random() - 0.5) * 0.45,
                radius: Math.random() * 2 + 1,
                color: Math.random() > 0.5 ? 'rgba(167, 139, 250, ' : 'rgba(56, 189, 248, '
            });
        }

        function renderCanvas() {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                let p = particles[i];
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                // Gentle mouse attraction
                if (mouse.active) {
                    let dx = mouse.x - p.x;
                    let dy = mouse.y - p.y;
                    let dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 180) {
                        p.x += dx * 0.008;
                        p.y += dy * 0.008;
                    }
                }

                // Draw Particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color + '0.75)';
                ctx.fill();

                // Draw Particle Connections
                for (let j = i + 1; j < particles.length; j++) {
                    let p2 = particles[j];
                    let dx = p.x - p2.x;
                    let dy = p.y - p2.y;
                    let dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 125) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = p.color + (1 - dist / 125) * 0.22 + ')';
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }
        }

        // Animation nur, wenn sie erwuenscht und die Seite sichtbar ist.
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        let rafId = null;

        function loop() {
            renderCanvas();
            rafId = requestAnimationFrame(loop);
        }

        function startCanvas() {
            if (rafId === null && !reduceMotion.matches && !document.hidden) {
                rafId = requestAnimationFrame(loop);
            }
        }

        function stopCanvas() {
            if (rafId !== null) {
                cancelAnimationFrame(rafId);
                rafId = null;
            }
        }

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) stopCanvas();
            else startCanvas();
        });

        reduceMotion.addEventListener('change', () => {
            stopCanvas();
            if (reduceMotion.matches) {
                ctx.clearRect(0, 0, width, height);
            } else {
                startCanvas();
            }
        });

        if (reduceMotion.matches) {
            renderCanvas();   // ein einziges statisches Bild, keine Bewegung
        } else {
            startCanvas();
        }
    }

    // --- Glassmorphism Card Mouse Spotlight Position Tracking ---
    document.querySelectorAll('.glass-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});

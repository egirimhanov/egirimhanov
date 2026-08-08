// JavaScript Logik für die Startseite & Sprachumschaltung (DE / EN)

document.addEventListener('DOMContentLoaded', () => {
    const langToggleBtn = document.getElementById('lang-toggle-btn');
    const langLabel = document.getElementById('lang-label');
    let currentLang = localStorage.getItem('site-lang') || 'de';

    const commandsDE = {
        whoami: "Emin Girimhanov. B.Sc. Wirtschaftsinformatik-Student @OVGU (Note 1,6), e-fellows.net Stipendiat und Softwareentwickler @Falcos GmbH.",
        skills: "Technologien: Python, Java, JavaScript, TypeScript, React, Node.js, Docusaurus, SQL, Proxmox, n8n, 3D-Druck, Certified ScrumMaster (CSM).",
        engagement: "Fachliches & Gesellschaftliches Engagement: \n 1. SIDUM e.V. (Ressort Finanzen & Recht, GenAI Masterclass PwC, Expected-Goals Kreditmodelle d-fine) \n 2. Fachschaftsrat FIN OVGU (Stellvertreter, Erstsemesterwochen, IT-Ref & Wiki) \n 3. Gewählter Klassensprecher CJD Droyßig",
        erfahrung: "Erfahrungen: \n 1. Falcos GmbH (Softwareentwicklung Public Sector, XÖV, LLM) \n 2. SIDUM e.V. (Unternehmensberatung Finanzen & Recht) \n 3. Autonomer Mähroboter & Schulcampus CAD 3D-Druck (Digitalisierungpreis) \n 4. Tutor an der FIN OVGU (Algorithmen & Mathe) \n 5. Fachschaftsrat FIN (Stellvertreter & IT-Admin)",
        kontakt: "Kontakt: \n • E-Mail: emin.girimhanov@posteo.de \n • LinkedIn: https://www.linkedin.com/in/emin-girimhanov/ \n • GitHub: https://github.com/egirimhanov",
        help: "Optionen: whoami, skills, engagement, erfahrung, kontakt, clear"
    };

    const commandsEN = {
        whoami: "Emin Girimhanov. Business Informatics student @OVGU (1.6 GPA), e-fellows.net scholar, and Software Developer @Falcos GmbH.",
        skills: "Technologies: Python, Java, JavaScript, TypeScript, React, Node.js, Docusaurus, SQL, Proxmox, n8n, 3D Printing, Certified ScrumMaster (CSM).",
        engagement: "Consulting & Community Engagement: \n 1. SIDUM e.V. (Finance & Legal, PwC GenAI Masterclass, d-fine Expected Goals credit models) \n 2. Student Council Representative FIN OVGU (Orientation Weeks, IT & Wiki) \n 3. Elected Class Representative CJD Droyßig",
        erfahrung: "Experience: \n 1. Falcos GmbH (Public Sector Software Dev, XÖV, LLMs) \n 2. SIDUM e.V. (Student Management Consulting Finance & Legal) \n 3. Autonomous Lawn Mower & Campus CAD 3D Printing (Digitalization Award) \n 4. Teaching Assistant FIN OVGU (Algorithms & Math) \n 5. Student Council Representative & IT Admin",
        kontakt: "Contact: \n • E-Mail: emin.girimhanov@posteo.de \n • LinkedIn: https://www.linkedin.com/in/emin-girimhanov/ \n • GitHub: https://github.com/egirimhanov",
        help: "Options: whoami, skills, engagement, erfahrung, kontakt, clear"
    };

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
                el.innerText = text;
            }
        });

        const inputs = document.querySelectorAll('[data-de-placeholder][data-en-placeholder]');
        inputs.forEach(input => {
            const placeholder = input.getAttribute(`data-${lang}-placeholder`);
            if (placeholder) {
                input.placeholder = placeholder;
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

    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    const presetBtns = document.querySelectorAll('.preset-btn');

    function runCommand(cmd) {
        const cleanCmd = cmd.trim().toLowerCase();
        const activeCommands = currentLang === 'de' ? commandsDE : commandsEN;

        const inputLine = document.createElement('p');
        inputLine.className = 'terminal-line';
        inputLine.innerHTML = `<span class="prompt-user">emin</span>@<span class="prompt-host">ovgu</span>:<span class="prompt-path">~</span>$ ${cleanCmd}`;
        terminalOutput.appendChild(inputLine);

        if (cleanCmd === 'clear') {
            terminalOutput.innerHTML = '';
            return;
        }

        const resultLine = document.createElement('div');
        resultLine.className = 'terminal-result';

        if (activeCommands[cleanCmd]) {
            resultLine.innerText = activeCommands[cleanCmd];
        } else if (cleanCmd === '') {
            return;
        } else {
            resultLine.innerText = currentLang === 'de' 
                ? `Befehl '${cleanCmd}' unbekannt. Tippe 'help' für Hilfe.`
                : `Command '${cleanCmd}' not found. Type 'help' for options.`;
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

    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

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
});

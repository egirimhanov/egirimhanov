// JavaScript Logik für die Startseite & Sprachumschaltung (DE / EN)

document.addEventListener('DOMContentLoaded', () => {
    const langToggleBtn = document.getElementById('lang-toggle-btn');
    const langLabel = document.getElementById('lang-label');
    let currentLang = localStorage.getItem('site-lang') || 'de';

    const commandsDE = {
        whoami: "Emin Girimhanov. Wirtschaftsinformatik-Student an der OVGU Magdeburg und Softwareentwickler bei der Falcos GmbH.",
        skills: "Technologien: Python, Java, JavaScript, TypeScript, React, Node.js, Docusaurus, SQL, Proxmox, n8n, 3D-Druck, Certified ScrumMaster (CSM).",
        hardware: "Hardware & 3D-Druck: \n 1. Autonomer Mähroboter (Raspberry Pi, Python, 3D-Druck) \n 2. CJD Schulcampus Droyßig 3D-Modell (CAD 1:150, Digitalisierungpreis) \n 3. Proxmox Self-Hosting Server Lab",
        erfahrung: "Erfahrungen: \n 1. Falcos GmbH (Softwareentwicklung Public Sector, XÖV, LLM) \n 2. Autonomer Mähroboter & Schulcampus CAD 3D-Druck \n 3. Tutor an der FIN OVGU (Algorithmen, Datenstrukturen & Mathe) \n 4. Stellvertreter Fachschaftsrat FIN (IT-Systeme & O-Woche) \n 5. Projekt OSCAR (Semesterplanungs-Bot)",
        kontakt: "Kontakt: \n • E-Mail: emin.girimhanov@posteo.de \n • LinkedIn: https://www.linkedin.com/in/emin-girimhanov/ \n • GitHub: https://github.com/egirimhanov",
        help: "Optionen: whoami, skills, hardware, erfahrung, kontakt, clear"
    };

    const commandsEN = {
        whoami: "Emin Girimhanov. Business Informatics student at OVGU Magdeburg and Software Developer at Falcos GmbH.",
        skills: "Technologies: Python, Java, JavaScript, TypeScript, React, Node.js, Docusaurus, SQL, Proxmox, n8n, 3D Printing, Certified ScrumMaster (CSM).",
        hardware: "Hardware & 3D Printing: \n 1. Autonomous Lawn Mower (Raspberry Pi, Python, FDM 3D printing) \n 2. CJD Droyßig School Campus 3D Model (1:150 CAD, Digitalization Award) \n 3. Proxmox Self-Hosting Server Lab",
        erfahrung: "Experience: \n 1. Falcos GmbH (Public Sector Software Dev, XÖV, LLMs) \n 2. Autonomous Lawn Mower & Campus CAD 3D Printing \n 3. Teaching Assistant at FIN OVGU (Algorithms, Data Structures & Math) \n 4. Student Council Representative (IT Admin & Orientation Weeks) \n 5. OSCAR Project (Semester Planner Bot)",
        kontakt: "Contact: \n • E-Mail: emin.girimhanov@posteo.de \n • LinkedIn: https://www.linkedin.com/in/emin-girimhanov/ \n • GitHub: https://github.com/egirimhanov",
        help: "Options: whoami, skills, hardware, erfahrung, kontakt, clear"
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
                copyEmailBtn.innerHTML = `<i data-lucide="check"></i> ${currentLang === 'de' ? 'Kopiert!' : 'Copied!'}`;
                if (window.lucide) lucide.createIcons();
                
                setTimeout(() => {
                    copyEmailBtn.innerHTML = originalHTML;
                    if (window.lucide) lucide.createIcons();
                }, 2000);
            });
        });
    }
});

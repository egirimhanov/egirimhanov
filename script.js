// JavaScript Logik für die Startseite & Sprachumschaltung (DE / EN)

document.addEventListener('DOMContentLoaded', () => {
    // 1. Language Toggle Logic (DE <-> EN)
    const langToggleBtn = document.getElementById('lang-toggle-btn');
    const langLabel = document.getElementById('lang-label');
    let currentLang = localStorage.getItem('site-lang') || 'de';

    const commandsDE = {
        whoami: "Emin Girimhanov. Wirtschaftsinformatik-Student an der OVGU Magdeburg und Softwareentwickler bei der Falcos GmbH.",
        skills: "Technologien: Python, Java, JavaScript, TypeScript, React, Node.js, Docusaurus, SQL, Proxmox, n8n, Certified ScrumMaster (CSM).",
        erfahrung: "Erfahrungen: \n 1. Falcos GmbH (Softwareentwicklung Public Sector, XÖV, LLM) \n 2. Tutor an der FIN OVGU (Algorithmen, Datenstrukturen & Mathe) \n 3. Stellvertreter Fachschaftsrat FIN (IT-Systeme & O-Woche) \n 4. Projekt OSCAR (Semesterplanungs-Bot)",
        kontakt: "Kontakt: \n • E-Mail: emin.girimhanov@posteo.de \n • LinkedIn: https://www.linkedin.com/in/emin-girimhanov/ \n • GitHub: https://github.com/emin-giri",
        help: "Optionen: whoami, skills, erfahrung, kontakt, clear"
    };

    const commandsEN = {
        whoami: "Emin Girimhanov. Business Informatics student at OVGU Magdeburg and Software Developer at Falcos GmbH.",
        skills: "Technologies: Python, Java, JavaScript, TypeScript, React, Node.js, Docusaurus, SQL, Proxmox, n8n, Certified ScrumMaster (CSM).",
        erfahrung: "Experience: \n 1. Falcos GmbH (Public Sector Software Dev, XÖV, LLMs) \n 2. Teaching Assistant at FIN OVGU (Algorithms, Data Structures & Math) \n 3. Student Council Representative (IT Admin & Orientation Weeks) \n 4. OSCAR Project (Semester Planner Bot)",
        kontakt: "Contact: \n • E-Mail: emin.girimhanov@posteo.de \n • LinkedIn: https://www.linkedin.com/in/emin-girimhanov/ \n • GitHub: https://github.com/emin-giri",
        help: "Options: whoami, skills, erfahrung, kontakt, clear"
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

    // 2. Terminal Console Logic
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

    // 3. Project Filter Logic
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

    // 4. Email Copy Logic
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

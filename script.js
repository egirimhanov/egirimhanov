// JavaScript Logik für die Startseite, Impact-Formulierungen & Synonyme im Terminal (100% UTF-8 / Unicode-Sicher)

document.addEventListener('DOMContentLoaded', () => {
    const langToggleBtn = document.getElementById('lang-toggle-btn');
    const langLabel = document.getElementById('lang-label');
    let currentLang = localStorage.getItem('site-lang') || 'de';

    const textExperienceDE = "Erfahrungen & Projekte: \n 1. Falcos GmbH (Entwicklung automatisierter X\u00f6V-ZUGFeRD Parser zur Reduzierung manueller Erfassungszeiten in Beh\u00f6rden, Full-Stack & LLM) \n 2. SIDUM e.V. (Mitarbeit an Kreditentscheidungs-Use-Cases mit d-fine & PwC GenAI Masterclass) \n 3. Fachschaftsrat FIN OVGU (Event-Leitung f\u00fcr 150+ Erstsemester, Knowledge-Scaling via Wiki) \n 4. Autonomer M\u00e4hroboter (Raspberry Pi & Python-Sensorik) & Campus CAD 3D-Druck (Digitalisierungpreis)";
    const textExperienceEN = "Experience & Projects: \n 1. Falcos GmbH (Developing automated X\u00d6V-ZUGFeRD parsers to eliminate manual data entry time in public sector, Full-Stack & LLM) \n 2. SIDUM e.V. (Consulting on credit decision use cases with d-fine & PwC GenAI Masterclass) \n 3. Student Council FIN OVGU (Event management for 150+ students, scaling wiki knowledge) \n 4. Autonomous Mower (Raspberry Pi & Python) & Campus CAD 3D Printing (Digitalization Award)";

    const textWhoamiDE = "Emin Girimhanov. B.Sc. Wirtschaftsinformatik-Student @OVGU (Note 1,6), e-fellows.net Stipendiat und Softwareentwickler @Falcos GmbH.";
    const textWhoamiEN = "Emin Girimhanov. Business Informatics student @OVGU (1.6 GPA), e-fellows.net scholar, and Software Developer @Falcos GmbH.";

    const textSkillsDE = "Technologien: Python, Java, JavaScript, TypeScript, React, Node.js, Docusaurus, SQL, Proxmox, n8n, 3D-Druck, Certified ScrumMaster (CSM).";
    const textSkillsEN = "Technologies: Python, Java, JavaScript, TypeScript, React, Node.js, Docusaurus, SQL, Proxmox, n8n, 3D Printing, Certified ScrumMaster (CSM).";

    const textEngagementDE = "Fachliches & Gesellschaftliches Engagement: \n 1. SIDUM e.V. (Ressort Finanzen & Recht, GenAI Masterclass PwC, Expected-Goals Kreditmodelle d-fine) \n 2. Fachschaftsrat FIN OVGU (Stellvertreter, Erstsemesterwochen, IT-Ref & Wiki) \n 3. Gew\u00e4hlter Klassensprecher CJD Droy\u00dfig";
    const textEngagementEN = "Consulting & Community Engagement: \n 1. SIDUM e.V. (Finance & Legal, PwC GenAI Masterclass, d-fine Expected Goals credit models) \n 2. Student Council Representative FIN OVGU (Orientation Weeks, IT & Wiki) \n 3. Elected Class Representative CJD Droy\u00dfig";

    const textHardwareDE = "Hardware & 3D-Druck: \n 1. Autonomer M\u00e4hroboter (Raspberry Pi, Python-Sensorik, 3D-Druck) \n 2. CJD Schulcampus Droy\u00dfig 3D-Modell (CAD 1:150, Digitalisierungpreis) \n 3. Proxmox Self-Hosting Server Lab";
    const textHardwareEN = "Hardware & 3D Printing: \n 1. Autonomous Lawn Mower (Raspberry Pi, Python sensor control, FDM 3D printing) \n 2. CJD Droy\u00dfig School Campus 3D Model (1:150 CAD, Digitalization Award) \n 3. Proxmox Self-Hosting Server Lab";

    const textKontaktDE = "Kontakt: \n \u2022 E-Mail: emin.girimhanov@posteo.de \n \u2022 LinkedIn: https://www.linkedin.com/in/emin-girimhanov/ \n \u2022 GitHub: https://github.com/egirimhanov";
    const textKontaktEN = "Contact: \n \u2022 E-Mail: emin.girimhanov@posteo.de \n \u2022 LinkedIn: https://www.linkedin.com/in/emin-girimhanov/ \n \u2022 GitHub: https://github.com/egirimhanov";

    // Synonym Map to resolve aliases to primary commands
    const aliasMap = {
        whoami: 'whoami', about: 'whoami', profil: 'whoami', profile: 'whoami',
        skills: 'skills', kenntnisse: 'skills', tech: 'skills', stack: 'skills',
        erfahrung: 'erfahrung', erfahrungen: 'erfahrung', projekte: 'erfahrung', projects: 'erfahrung', experience: 'erfahrung',
        engagement: 'engagement', consulting: 'engagement', sidum: 'engagement', farafin: 'engagement',
        hardware: 'hardware', '3d': 'hardware', maker: 'hardware',
        kontakt: 'kontakt', contact: 'kontakt', email: 'kontakt', mail: 'kontakt', linkedin: 'kontakt'
    };

    function getCommandText(primaryCmd, lang) {
        if (lang === 'de') {
            switch (primaryCmd) {
                case 'whoami': return textWhoamiDE;
                case 'skills': return textSkillsDE;
                case 'erfahrung': return textExperienceDE;
                case 'engagement': return textEngagementDE;
                case 'hardware': return textHardwareDE;
                case 'kontakt': return textKontaktDE;
                case 'help': return "Optionen: whoami, skills, erfahrung, engagement, hardware, kontakt, clear";
                default: return null;
            }
        } else {
            switch (primaryCmd) {
                case 'whoami': return textWhoamiEN;
                case 'skills': return textSkillsEN;
                case 'erfahrung': return textExperienceEN;
                case 'engagement': return textEngagementEN;
                case 'hardware': return textHardwareEN;
                case 'kontakt': return textKontaktEN;
                case 'help': return "Options: whoami, skills, experience, engagement, hardware, contact, clear";
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
                ? `Befehl '${rawCmd}' unbekannt. Tippe 'help' f\u00fcr Hilfe.`
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

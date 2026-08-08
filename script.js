// JavaScript Logik für die Startseite

document.addEventListener('DOMContentLoaded', () => {
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    const presetBtns = document.querySelectorAll('.preset-btn');

    const commands = {
        whoami: "Emin Girimhanov. Wirtschaftsinformatik-Student an der OVGU Magdeburg und Softwareentwickler bei der Falcos GmbH.",
        skills: "Technologien: Python, Java, JavaScript, TypeScript, React, Node.js, Docusaurus, SQL, Proxmox, n8n, Certified ScrumMaster (CSM).",
        erfahrung: "Erfahrungen: \n 1. Falcos GmbH (Softwareentwicklung Public Sector, XÖV, LLM) \n 2. Tutor an der FIN OVGU (Algorithmen, Datenstrukturen & Mathe) \n 3. Stellvertreter Fachschaftsrat FIN (IT-Systeme & O-Woche) \n 4. Projekt OSCAR (Semesterplanungs-Bot)",
        kontakt: "Kontakt: \n • E-Mail: emin.girimhanov@posteo.de \n • LinkedIn: https://www.linkedin.com/in/emin-girimhanov/ \n • GitHub: https://github.com/emin-giri",
        help: "Optionen: whoami, skills, erfahrung, kontakt, clear"
    };

    function runCommand(cmd) {
        const cleanCmd = cmd.trim().toLowerCase();

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

        if (commands[cleanCmd]) {
            resultLine.innerText = commands[cleanCmd];
        } else if (cleanCmd === '') {
            return;
        } else {
            resultLine.innerText = `Befehl '${cleanCmd}' unbekannt. Tippe 'help' für Hilfe.`;
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
                copyEmailBtn.innerHTML = `<i data-lucide="check"></i> Kopiert!`;
                if (window.lucide) lucide.createIcons();
                
                setTimeout(() => {
                    copyEmailBtn.innerHTML = originalHTML;
                    if (window.lucide) lucide.createIcons();
                }, 2000);
            });
        });
    }
});

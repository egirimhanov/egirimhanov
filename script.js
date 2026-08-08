// JavaScript Logik für die Startseite

document.addEventListener('DOMContentLoaded', () => {
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    const presetBtns = document.querySelectorAll('.preset-btn');

    const commands = {
        whoami: "Emin (@egirimhanov). Ich entwickle Webseiten, Erweiterungen für Obsidian und Werkzeuge für den Entwickler-Alltag.",
        skills: "Technologien: JavaScript, TypeScript, Python, HTML, CSS, React, Node.js, Git, Obsidian API.",
        projects: "Projekte: \n 1. claude-obsidian (AI im Notizsystem) \n 2. egirimhanov.github.io (Diese Startseite) \n 3. Skripte (Werkzeuge für Entwickler)",
        kontakt: "Kontakt: \n • GitHub: https://github.com/egirimhanov \n • E-Mail: deine.email@example.com",
        help: "Optionen: whoami, skills, projects, kontakt, clear"
    };

    function runCommand(cmd) {
        const cleanCmd = cmd.trim().toLowerCase();

        const inputLine = document.createElement('p');
        inputLine.className = 'terminal-line';
        inputLine.innerHTML = `<span class="prompt-user">egirimhanov</span>@<span class="prompt-host">dev</span>:<span class="prompt-path">~</span>$ ${cleanCmd}`;
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
            const email = "deine.email@example.com";
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

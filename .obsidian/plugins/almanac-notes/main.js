const { Plugin, Notice, TFile, Modal } = require('obsidian');

class DatePromptModal extends Modal {
    constructor(app, onSubmit) {
        super(app);
        this.onSubmit = onSubmit;
    }

    onOpen() {
        const {contentEl} = this;
        contentEl.createEl('h2', {text: 'Create Almanac Note'});

        contentEl.createEl('p', {
            text: "Enter a date (e.g., 'today', 'next quarter', 'February', 'Q3', '2024-03-15'):"
        });

        const inputEl = contentEl.createEl('input', {
            type: 'text',
            placeholder: 'today, next quarter, February, etc.'
        });
        inputEl.style.width = '100%';
        inputEl.style.marginTop = '10px';
        inputEl.style.padding = '8px';

        inputEl.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.onSubmit(inputEl.value);
                this.close();
            } else if (e.key === 'Escape') {
                this.close();
            }
        });

        // Focus the input
        setTimeout(() => inputEl.focus(), 10);
    }

    onClose() {
        const {contentEl} = this;
        contentEl.empty();
    }
}

module.exports = class AlmanacNotesPlugin extends Plugin {
    async onload() {
        // Register the "Create Almanac Note" command
        this.addCommand({
            id: 'create-almanac-note',
            name: 'Create Almanac Note',
            callback: async () => {
                await this.createAlmanacNote();
            }
        });
    }

    async createAlmanacNote() {
        // Check if Templater is available
        const templaterPlugin = this.app.plugins.plugins['templater-obsidian'];
        if (!templaterPlugin) {
            new Notice('Templater plugin is required for Almanac Notes');
            return;
        }

        // Show prompt for date input
        new DatePromptModal(this.app, async (input) => {
            if (!input) return;

            try {
                // Load the user script
                const scriptPath = 'system/templater-scripts/periodicNotes.js';
                const scriptFile = this.app.vault.getAbstractFileByPath(scriptPath);

                if (!(scriptFile instanceof TFile)) {
                    new Notice(`Script not found: ${scriptPath}`);
                    return;
                }

                const scriptContent = await this.app.vault.read(scriptFile);

                // Create a minimal tp object with the required functions
                const tp = templaterPlugin.templater.create_running_config(
                    undefined,
                    scriptFile,
                    0
                );

                // Execute the script module
                const createPeriodicNote = Function('module', 'require', 'app', 'moment', scriptContent + '; return module.exports;')(
                    {exports: {}},
                    require,
                    this.app,
                    window.moment
                );

                // Override tp.system.prompt to return our input directly
                tp.system.prompt = async () => input;

                // Execute the function
                await createPeriodicNote(tp);

            } catch (error) {
                console.error('Almanac Notes error:', error);
                new Notice(`Error: ${error.message}`);
            }
        }).open();
    }

    onunload() {
        // Cleanup if needed
    }
};

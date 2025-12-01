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
                const scriptPath = 'system/templater-scripts/almanacNotes.js';
                const scriptFile = this.app.vault.getAbstractFileByPath(scriptPath);

                if (!(scriptFile instanceof TFile)) {
                    new Notice(`Script not found: ${scriptPath}`);
                    return;
                }

                const scriptContent = await this.app.vault.read(scriptFile);

                // Execute the script module
                const createAlmanacNote = Function('module', 'require', 'app', 'moment', scriptContent + '; return module.exports;')(
                    {exports: {}},
                    require,
                    this.app,
                    window.moment
                );

                // Build a minimal tp object with the required APIs
                const tp = {
                    _targetDate: null, // Will be set by the script after parsing
                    _setTargetDate: function(date) {
                        this._targetDate = date;
                    },
                    system: {
                        prompt: async () => input
                    },
                    file: {
                        find_tfile: (path) => this.app.vault.getAbstractFileByPath(path),
                        creation_date: (format) => {
                            // Use target date for creation date if available
                            const dateToUse = tp._targetDate || window.moment();
                            return window.moment(dateToUse).format(format || 'YYYY-MM-DD');
                        },
                        create_new: async (templateFile, filename, openFile, folder) => {
                            // Read the template content
                            const templateContent = await this.app.vault.read(templateFile);

                            let processedContent = templateContent;

                            // Process execution blocks: <%* code %>
                            processedContent = processedContent.replace(/<%\*\s*([\s\S]+?)\s*%>/g, (match, code) => {
                                try {
                                    const output = Function('tp', 'moment', `
                                        let tR = '';
                                        ${code}
                                        return tR;
                                    `)(tp, window.moment);
                                    return output;
                                } catch (e) {
                                    console.error('Error executing template code:', code, e);
                                    return match;
                                }
                            });

                            // Process inline expressions: <% expression %>
                            processedContent = processedContent.replace(/<% (.+?) %>/g, (match, expr) => {
                                try {
                                    const result = Function('tp', 'moment', `return ${expr}`)(tp, window.moment);
                                    return result;
                                } catch (e) {
                                    console.error('Error evaluating template expression:', expr, e);
                                    return match;
                                }
                            });

                            // Create the file with processed content
                            const filePath = `${folder.path}/${filename}.md`;
                            const newFile = await this.app.vault.create(filePath, processedContent);

                            return newFile;
                        }
                    },
                    date: {
                        now: (format, offset, reference) => {
                            // Use reference if provided, otherwise use target date, otherwise use current date
                            const baseDate = reference || tp._targetDate || window.moment();
                            return window.moment(baseDate).add(offset || 0, 'days').format(format);
                        }
                    }
                };

                // Execute the function
                await createAlmanacNote(tp);

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

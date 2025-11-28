const { Plugin, Notice } = require('obsidian');

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

        try {
            // Load the periodic notes user script
            const periodicNotesScript = templaterPlugin.templater.current_functions_object.user.periodicNotes;

            if (!periodicNotesScript) {
                new Notice('Periodic notes script not found. Please check Templater user scripts configuration.');
                return;
            }

            // Create a minimal tp object with what the script needs
            const tp = templaterPlugin.templater.current_functions_object;

            // Execute the periodic notes script
            await periodicNotesScript(tp);

        } catch (error) {
            console.error('Almanac Notes error:', error);
            new Notice(`Error creating almanac note: ${error.message}`);
        }
    }

    onunload() {
        // Cleanup if needed
    }
};

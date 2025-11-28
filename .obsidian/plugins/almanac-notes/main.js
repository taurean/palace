const { Plugin, Notice } = require('obsidian');

module.exports = class AlmanacNotesPlugin extends Plugin {
    async onload() {
        // Register the "Create Almanac Note" command
        this.addCommand({
            id: 'create-almanac-note',
            name: 'Create Almanac Note',
            callback: () => {
                this.createAlmanacNote();
            }
        });
    }

    createAlmanacNote() {
        // Find Templater's "Create new note from template" command
        const commands = this.app.commands.commands;
        const templaterCommand = commands['templater-obsidian:create-new-note-from-template'];

        if (!templaterCommand) {
            new Notice('Templater plugin not found or command unavailable');
            return;
        }

        // Execute the Templater command
        // This will show the template picker where user selects "Open Periodic Note"
        this.app.commands.executeCommandById('templater-obsidian:create-new-note-from-template');
    }

    onunload() {
        // Cleanup if needed
    }
};

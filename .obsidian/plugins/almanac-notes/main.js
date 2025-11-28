const { Plugin, Notice, TFile } = require('obsidian');

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
            // Get the Open Periodic Note template file
            const templatePath = 'system/templater-templates/Open Periodic Note.md';
            const templateFile = this.app.vault.getAbstractFileByPath(templatePath);

            if (!templateFile || !(templateFile instanceof TFile)) {
                new Notice(`Template not found: ${templatePath}`);
                return;
            }

            // Get active file or create a temp one
            let activeFile = this.app.workspace.getActiveFile();

            if (!activeFile) {
                // Create a temporary file if no file is open
                activeFile = await this.app.vault.create(
                    `Untitled.md`,
                    ''
                );

                // Open it
                const leaf = this.app.workspace.getLeaf(false);
                await leaf.openFile(activeFile);
            }

            // Read the template content
            const templateContent = await this.app.vault.read(templateFile);

            // Execute the template using Templater
            // This runs the user script which handles file creation and cleanup
            await templaterPlugin.templater.parse_template(
                {file: templateFile},
                templateContent
            );

            // The user script (periodicNotes.js) handles all cleanup
            // No need to delete temp files here - it's already done

        } catch (error) {
            console.error('Almanac Notes error:', error);
            new Notice(`Error creating almanac note: ${error.message}`);
        }
    }

    onunload() {
        // Cleanup if needed
    }
};

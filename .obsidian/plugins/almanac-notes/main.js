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
            let createdTemp = false;

            if (!activeFile) {
                // Create a temporary file if no file is open
                activeFile = await this.app.vault.create(
                    `Untitled.md`,
                    ''
                );
                createdTemp = true;

                // Open it
                const leaf = this.app.workspace.getLeaf(false);
                await leaf.openFile(activeFile);
            }

            // Read the template content
            const templateContent = await this.app.vault.read(templateFile);

            // Execute the template using Templater
            const content = await templaterPlugin.templater.parse_template(
                {file: templateFile},
                templateContent
            );

            // If we created a temp file and the script handled cleanup, we're done
            // Otherwise clean up
            if (createdTemp) {
                const currentFile = this.app.workspace.getActiveFile();
                // If we're still on the temp file, delete it
                if (currentFile && currentFile.path === activeFile.path) {
                    await this.app.vault.delete(activeFile);
                }
            }

        } catch (error) {
            console.error('Almanac Notes error:', error);
            new Notice(`Error creating almanac note: ${error.message}`);
        }
    }

    onunload() {
        // Cleanup if needed
    }
};

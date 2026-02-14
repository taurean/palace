import { App, Modal, Notice, Plugin, TFile, TFolder } from 'obsidian';
import * as chrono from 'chrono-node';

// Define the shape of the parsed date result
interface ParsedDate {
    date: Date;
    type: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
    endDate?: Date;
}

class DatePromptModal extends Modal {
    onSubmit: (result: string) => void;

    constructor(app: App, onSubmit: (result: string) => void) {
        super(app);
        this.onSubmit = onSubmit;
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.createEl('h2', { text: 'Create Almanac Note' });

        const now = window.moment();
        const currentMonth = now.format('MMMM');
        const currentQuarter = 'Q' + now.quarter();
        const dateExample = now.format('YYYY-MM-DD');

        contentEl.createEl('p', {
            text: `Enter a date (e.g., 'today', '${currentQuarter}', '${currentMonth}', '${dateExample}'):`
        });

        const inputEl = contentEl.createEl('input', {
            type: 'text',
            placeholder: `today, ${currentQuarter}, ${currentMonth}, etc.`
        });
        inputEl.style.width = '100%';
        inputEl.style.marginTop = '10px';
        inputEl.style.padding = '8px';

        const submit = () => {
            this.onSubmit(inputEl.value);
            this.close();
        };

        inputEl.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                submit();
            } else if (e.key === 'Escape') {
                this.close();
            }
        });

        // Focus the input
        setTimeout(() => inputEl.focus(), 10);
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}

export default class AlmanacNotesPlugin extends Plugin {
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
        // Check if Templater is available (still good to have for templates)
        const templaterPlugin = (this.app as any).plugins.plugins['templater-obsidian'];
        if (!templaterPlugin) {
            new Notice('Templater plugin is required for Almanac Notes templates');
            return;
        }

        // Show prompt for date input
        new DatePromptModal(this.app, async (input) => {
            if (!input) return;

            try {
                const parsed = this.parseNaturalLanguage(input);

                if (!parsed) {
                    new Notice(`Could not parse date: "${input}"`);
                    return;
                }

                await this.openOrCreateNote(parsed);

            } catch (error) {
                console.error('Almanac Notes error:', error);
                new Notice(`Error: ${error.message}`);
            }
        }).open();
    }

    parseNaturalLanguage(input: string): ParsedDate | null {
        const text = input.trim();
        const lowerText = text.toLowerCase();

        // 1. Handle specific granularities that Chrono might miss or interpret as strict dates
        
        // Quarterly: "Q1", "Q3 2024", "2024 Q2"
        const quarterMatch = text.match(/^(?:(\d{4})\s+)?(?:Q|q)([1-4])(?:\s+(\d{4}))?$/);
        if (quarterMatch) {
            const q = parseInt(quarterMatch[2]);
            const y1 = quarterMatch[1] ? parseInt(quarterMatch[1]) : undefined;
            const y2 = quarterMatch[3] ? parseInt(quarterMatch[3]) : undefined;
            const year = y1 || y2 || new Date().getFullYear();
            
            // Start of quarter
            const date = window.moment({ year, month: (q - 1) * 3, day: 1 }).toDate();
            return { date, type: 'quarterly' };
        }

        // Weekly: "W42", "Week 5", "2024 W10" (ISO Weeks)
        const weekMatch = text.match(/^(?:(\d{4})\s+)?(?:W|w|Week|week)\s*(\d{1,2})(?:\s+(\d{4}))?$/);
        if (weekMatch) {
             const w = parseInt(weekMatch[2]);
             const y1 = weekMatch[1] ? parseInt(weekMatch[1]) : undefined;
             const y2 = weekMatch[3] ? parseInt(weekMatch[3]) : undefined;
             const year = y1 || y2 || new Date().getFullYear();

             if (w >= 1 && w <= 53) {
                 const date = window.moment().year(year).isoWeek(w).startOf('isoWeek').toDate();
                 return { date, type: 'weekly' };
             }
        }

        // Yearly: "2024", "year 2025"
        const yearMatch = text.match(/^(?:year\s+)?(\d{4})$/i);
        if (yearMatch) {
            const year = parseInt(yearMatch[1]);
            const date = window.moment({ year, month: 0, day: 1 }).toDate();
            return { date, type: 'yearly' };
        }

        // Relative Weekly Check (Pre-Chrono)
        // Terms like "this week", "next week", "last week", "2 weeks from now"
        // Chrono parses these as specific dates (often accurate to the day/time), but default logic sees "day" certainty.
        // We catch them here to force 'weekly' type.
        if (/\b(?:this|next|last)\s+week\b/i.test(text) || /\bweeks?\s+(?:from|ago|in)\b/i.test(text) || /\bin\s+\d+\s+weeks?\b/i.test(text)) {
             const parsedResults = chrono.parse(text);
             if (parsedResults.length > 0) {
                 return { date: parsedResults[0].start.date(), type: 'weekly' };
             }
        }

        // 2. Use Chrono for everything else
        const parsedResults = chrono.parse(text);

        if (parsedResults.length === 0) {
            return null;
        }

        const result = parsedResults[0];
        const date = result.start.date();
        
        // Determine Granularity based on what was parsed
        // We use isCertain() to check if the component was explicitly part of the text
        
        // If "day" is certain, it's a Daily note (e.g. "January 15", "tomorrow", "next Friday")
        if (result.start.isCertain('day')) {
             return { date, type: 'daily' };
        }

        // If "month" is certain but "day" is NOT, it's a Monthly note
        // Example: "January 2024", "next month"
        if (result.start.isCertain('month')) {
            return { date, type: 'monthly' };
        }

        // If only year is certain, it's Yearly
        if (result.start.isCertain('year')) {
            return { date, type: 'yearly' };
        }

        // Default: If nothing is certain (maybe just a relative time like "now"?), default to Daily
        return { date, type: 'daily' };
    }

    getNotePath(parsed: ParsedDate): string {
        const m = window.moment(parsed.date);
        switch (parsed.type) {
            case 'daily':
                return `almanac/day/${m.format('YYYY-MM-DD')}.md`;
            case 'weekly':
                return `almanac/week/${m.format('gggg-[W]ww')}.md`;
            case 'monthly':
                return `almanac/month/${m.format('YYYY-MM')}.md`;
            case 'quarterly':
                return `almanac/quarter/${m.format('YYYY-[Q]Q')}.md`;
            case 'yearly':
                return `almanac/year/${m.format('YYYY')}.md`;
            default:
                return `almanac/day/${m.format('YYYY-MM-DD')}.md`;
        }
    }

    getTemplatePath(type: ParsedDate['type']): string {
        switch (type) {
            case 'daily': return 'system/templater-templates/_almanac/Daily Note.md';
            case 'weekly': return 'system/templater-templates/_almanac/Weekly Note.md';
            case 'monthly': return 'system/templater-templates/_almanac/Monthly Note.md';
            case 'quarterly': return 'system/templater-templates/_almanac/Quarterly Note.md';
            case 'yearly': return 'system/templater-templates/_almanac/Yearly Note.md';
        }
    }

    async openOrCreateNote(parsed: ParsedDate) {
        const notePath = this.getNotePath(parsed);
        const templatePath = this.getTemplatePath(parsed.type);

        const existingFile = this.app.vault.getAbstractFileByPath(notePath);

        if (existingFile instanceof TFile) {
            // Note exists, open it
           const leaf = this.app.workspace.getLeaf(false);
           await leaf.openFile(existingFile);
           return;
        }

        // Create new note
        const templateFile = this.app.vault.getAbstractFileByPath(templatePath);
        if (!(templateFile instanceof TFile)) {
            new Notice(`Template not found: ${templatePath}`);
            return;
        }

        try {
            // Read template content
            const templateContent = await this.app.vault.read(templateFile);
            
            // Generate content
            const processingContext = {
                targetDate: parsed.date,
                app: this.app
            };
            
            const processedContent = this.processTemplate(templateContent, processingContext);

            // Create folder if needed
            const folderPath = notePath.substring(0, notePath.lastIndexOf('/'));
            if (!this.app.vault.getAbstractFileByPath(folderPath)) {
                await this.app.vault.createFolder(folderPath);
            }

            // Create the file
            const newFile = await this.app.vault.create(notePath, processedContent);
            
            // Open the file
            const leaf = this.app.workspace.getLeaf(false);
            await leaf.openFile(newFile);

        } catch (error) {
            console.error('Error creating almanac note:', error);
            new Notice(`Error creating note: ${error.message}`);
        }
    }

    processTemplate(content: string, context: { targetDate: Date, app: App }): string {
        const { targetDate } = context;
        
        // Mock tp object
        // Based on analysis of user scripts and templates
        const tp = {
            date: {
                now: (format: string = 'YYYY-MM-DD', offset: number = 0, reference?: any, reference_format?: string) => {
                     let base = window.moment(targetDate);
                     if (reference) {
                         base = window.moment(reference, reference_format);
                     }
                     return base.add(offset, 'days').format(format);
                },
                weekday: (format: string = 'YYYY-MM-DD', offset: number = 0, reference?: any, reference_format?: string) => {
                     let base = window.moment(targetDate);
                     if (reference) {
                         base = window.moment(reference, reference_format);
                     }
                     // Basic implementation - Templater's logic for weekday might be more complex but this should suffice for dates
                     return base.add(offset, 'days').format(format);
                }
            },
            file: {
                creation_date: (format: string = 'YYYY-MM-DD HH:mm') => {
                    return window.moment(targetDate).format(format);
                },
                // Add other file properties if needed by templates
                title: 'Untitled' // Placeholder
            }
            // Add other modules if discovered in templates
        };

        // Replace <%* execution blocks %>
        // NOTE: This uses Function constructor which is generally unsafe but matches previous user script behavior.
        // It is sandboxed to the variables we provide.
        let processed = content.replace(/<%\*\s*([\s\S]+?)\s*%>/g, (match, code) => {
            try {
                const func = new Function('tp', 'moment', 'app', `
                    let tR = '';
                    ${code}
                    return tR;
                `);
                return func(tp, window.moment, this.app);
            } catch (e) {
                console.error('Template execution error:', e);
                return match; // Return original on error
            }
        });

        // Replace <% evaluation blocks %>
        processed = processed.replace(/<% (.+?) %>/g, (match, code) => {
            try {
                const func = new Function('tp', 'moment', 'app', `
                    return ${code};
                `);
                return func(tp, window.moment, this.app);
            } catch (e) {
                console.error('Template evaluation error:', e);
                return match; 
            }
        });

        return processed;
    }

}

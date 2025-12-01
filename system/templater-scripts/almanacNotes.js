/**
 * Almanac Notes - Natural Language Date Parser
 * Handles creation and navigation of daily, weekly, monthly, quarterly, and yearly notes
 */

function parseNaturalLanguage(input, tp) {
    const cleaned = input.toLowerCase().trim();
    const now = moment();

    // Relative expressions
    const relativePatterns = {
        // Daily
        'today': { type: 'daily', date: now },
        'tomorrow': { type: 'daily', date: moment(now).add(1, 'day') },
        'yesterday': { type: 'daily', date: moment(now).subtract(1, 'day') },

        // Weekly
        'this week': { type: 'weekly', date: now },
        'next week': { type: 'weekly', date: moment(now).add(1, 'week') },
        'last week': { type: 'weekly', date: moment(now).subtract(1, 'week') },

        // Monthly
        'this month': { type: 'monthly', date: now },
        'next month': { type: 'monthly', date: moment(now).add(1, 'month') },
        'last month': { type: 'monthly', date: moment(now).subtract(1, 'month') },

        // Quarterly
        'this quarter': { type: 'quarterly', date: now },
        'next quarter': { type: 'quarterly', date: moment(now).add(1, 'quarter') },
        'last quarter': { type: 'quarterly', date: moment(now).subtract(1, 'quarter') },

        // Yearly
        'this year': { type: 'yearly', date: now },
        'next year': { type: 'yearly', date: moment(now).add(1, 'year') },
        'last year': { type: 'yearly', date: moment(now).subtract(1, 'year') },
    };

    // Check relative patterns first
    if (relativePatterns[cleaned]) {
        return relativePatterns[cleaned];
    }

    // Quarter patterns: Q1, Q3 2024, etc.
    const quarterMatch = cleaned.match(/^q([1-4])(?:\s+(\d{4}))?$/);
    if (quarterMatch) {
        const quarter = parseInt(quarterMatch[1]);
        const year = quarterMatch[2] ? parseInt(quarterMatch[2]) : now.year();
        // Determine if it's future or past for ambiguous "Q3" input
        const targetDate = moment().year(year).quarter(quarter);
        return { type: 'quarterly', date: targetDate };
    }

    // Week patterns: week 32, W15, W15 2024, etc.
    const weekMatch = cleaned.match(/^(?:week\s+)?w?(\d{1,2})(?:\s+(\d{4}))?$/);
    if (weekMatch) {
        const week = parseInt(weekMatch[1]);
        const year = weekMatch[2] ? parseInt(weekMatch[2]) : now.year();
        const targetDate = moment().year(year).isoWeek(week);
        return { type: 'weekly', date: targetDate };
    }

    // Month name patterns: February, March 2024, mar, etc.
    const monthNames = ['january', 'february', 'march', 'april', 'may', 'june',
                       'july', 'august', 'september', 'october', 'november', 'december'];
    const monthAbbr = ['jan', 'feb', 'mar', 'apr', 'may', 'jun',
                      'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

    const monthMatch = cleaned.match(/^(\w+)(?:\s+(\d{1,2}))?(?:\s+(\d{4}))?$/);
    if (monthMatch) {
        const monthInput = monthMatch[1];
        const day = monthMatch[2] ? parseInt(monthMatch[2]) : null;
        const year = monthMatch[3] ? parseInt(monthMatch[3]) : null;

        let monthIndex = monthNames.indexOf(monthInput);
        if (monthIndex === -1) {
            monthIndex = monthAbbr.indexOf(monthInput);
        }

        if (monthIndex !== -1) {
            let targetDate = moment();

            if (year) {
                targetDate.year(year);
            } else {
                // Ambiguous month resolution: if month has passed, assume next year
                const currentMonth = now.month();
                if (monthIndex < currentMonth) {
                    targetDate.add(1, 'year');
                }
            }

            targetDate.month(monthIndex);

            if (day) {
                targetDate.date(day);
                return { type: 'daily', date: targetDate };
            } else {
                return { type: 'monthly', date: targetDate };
            }
        }
    }

    // ISO date patterns: 2024-03-15, 2024-03, 2024
    const isoDateMatch = cleaned.match(/^(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?$/);
    if (isoDateMatch) {
        const year = parseInt(isoDateMatch[1]);
        const month = isoDateMatch[2] ? parseInt(isoDateMatch[2]) : null;
        const day = isoDateMatch[3] ? parseInt(isoDateMatch[3]) : null;

        if (day) {
            return { type: 'daily', date: moment(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`) };
        } else if (month) {
            return { type: 'monthly', date: moment(`${year}-${String(month).padStart(2, '0')}-01`) };
        } else {
            return { type: 'yearly', date: moment(`${year}-01-01`) };
        }
    }

    // Try moment.js natural language parsing as fallback
    const parsed = moment(input, ['YYYY-MM-DD', 'MMMM D YYYY', 'MMM D YYYY', 'MMMM YYYY'], true);
    if (parsed.isValid()) {
        // Determine type based on input specificity
        if (input.match(/\d{4}-\d{2}-\d{2}/)) {
            return { type: 'daily', date: parsed };
        }
        return { type: 'daily', date: parsed };
    }

    return null;
}

function getNotePath(type, date) {
    const formats = {
        'daily': { folder: 'almanac/day', format: 'YYYY-MM-DD' },
        'weekly': { folder: 'almanac/week', format: 'YYYY-[W]ww' },
        'monthly': { folder: 'almanac/month', format: 'YYYY-MM' },
        'quarterly': { folder: 'almanac/quarter', format: 'YYYY-[Q]Q' },
        'yearly': { folder: 'almanac/year', format: 'YYYY' }
    };

    const config = formats[type];
    const filename = date.format(config.format);
    return `${config.folder}/${filename}.md`;
}

function getTemplate(type) {
    const templates = {
        'daily': 'system/templater-templates/_almanac/Daily Note.md',
        'weekly': 'system/templater-templates/_almanac/Weekly Note.md',
        'monthly': 'system/templater-templates/_almanac/Monthly Note.md',
        'quarterly': 'system/templater-templates/_almanac/Quarterly Note.md',
        'yearly': 'system/templater-templates/_almanac/Yearly Note.md'
    };

    return templates[type];
}

async function createAlmanacNote(tp) {
    // Save reference to the current file (might be untitled)
    const currentFile = app.workspace.getActiveFile();
    const isUntitled = currentFile && (currentFile.basename === 'Untitled' || currentFile.basename === '');

    const input = await tp.system.prompt("Enter date (e.g., 'today', 'next quarter', 'February', 'Q3', '2024-03-15'):");

    if (!input) {
        // User cancelled, don't create anything
        return "";
    }

    const parsed = parseNaturalLanguage(input, tp);

    if (!parsed) {
        throw new Error(`Could not parse: "${input}"\n\nTry: today, next quarter, February, Q3 2024, week 32, 2024-03-15`);
    }

    // Set the target date so templates use this date instead of current date
    if (tp._setTargetDate) {
        tp._setTargetDate(parsed.date);
    }

    const notePath = getNotePath(parsed.type, parsed.date);
    const templatePath = getTemplate(parsed.type);

    // Check if note exists
    const existingFile = tp.file.find_tfile(notePath);

    if (existingFile) {
        // Note exists, open it in the current leaf
        const leaf = app.workspace.getLeaf(false);
        await leaf.openFile(existingFile);

        // Delete the untitled file if we came from one
        if (isUntitled && currentFile && currentFile.path !== existingFile.path) {
            await app.vault.delete(currentFile);
        }
    } else {
        // Get the template file
        const templateFile = tp.file.find_tfile(templatePath);
        if (!templateFile) {
            throw new Error(`Template not found: ${templatePath}`);
        }

        // Extract folder and filename from notePath
        const pathParts = notePath.split('/');
        const filename = pathParts.pop().replace('.md', '');
        const folderPath = pathParts.join('/');

        // Get or create the target folder
        let targetFolder = app.vault.getAbstractFileByPath(folderPath);
        if (!targetFolder) {
            // Create folder if it doesn't exist
            await app.vault.createFolder(folderPath);
            targetFolder = app.vault.getAbstractFileByPath(folderPath);
        }

        // Create new note from template
        const newFile = await tp.file.create_new(templateFile, filename, false, targetFolder);

        // Open the newly created file in the current leaf
        if (newFile) {
            const leaf = app.workspace.getLeaf(false);
            await leaf.openFile(newFile);

            // Delete the untitled file if we came from one and it's different from the new file
            if (isUntitled && currentFile && currentFile.path !== newFile.path) {
                await app.vault.delete(currentFile);
            }
        }
    }

    return "";
}

module.exports = createAlmanacNote;

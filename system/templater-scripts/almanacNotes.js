/**
 * Almanac Notes - Natural Language Date Parser
 * Handles creation and navigation of daily, weekly, monthly, quarterly, and yearly notes
 */

function parseNaturalLanguage(input, tp) {
    const cleaned = input.toLowerCase().trim().replace(/\s+/g, ' '); // Normalize whitespace
    const now = moment();

    // Month names for matching
    const monthNames = ['january', 'february', 'march', 'april', 'may', 'june',
                       'july', 'august', 'september', 'october', 'november', 'december'];
    const monthAbbr = ['jan', 'feb', 'mar', 'apr', 'may', 'jun',
                      'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

    // Helper function to find month index
    const findMonthIndex = (monthStr) => {
        let idx = monthNames.indexOf(monthStr);
        if (idx === -1) idx = monthAbbr.indexOf(monthStr);
        return idx;
    };

    // Relative expressions (most specific, check first)
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

    if (relativePatterns[cleaned]) {
        return relativePatterns[cleaned];
    }

    // === DAY OF WEEK PATTERNS ===
    // Formats: Monday, mon, Wednesday, etc. → nearest occurrence
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const dayAbbr = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

    let dayIndex = dayNames.indexOf(cleaned);
    if (dayIndex === -1) {
        dayIndex = dayAbbr.indexOf(cleaned);
    }

    if (dayIndex !== -1) {
        // Find nearest occurrence of this day of week
        const currentDay = now.day();
        const targetDay = dayIndex;

        // Calculate days forward and backward
        let daysForward = (targetDay - currentDay + 7) % 7;
        if (daysForward === 0) daysForward = 7; // Next week if it's today
        const daysBackward = (currentDay - targetDay + 7) % 7;

        // Choose nearest (prefer future if equidistant)
        let targetDate;
        if (daysBackward === 0) {
            // It's today
            targetDate = moment(now);
        } else if (daysForward <= daysBackward) {
            targetDate = moment(now).add(daysForward, 'days');
        } else {
            targetDate = moment(now).subtract(daysBackward, 'days');
        }

        return { type: 'daily', date: targetDate };
    }

    // === QUARTERLY PATTERNS ===
    // Formats: Q3, Q3 2027, 2027 Q3, quarter 3, quarter 3 2027, 2027 quarter 3, Q3 of 2027
    let quarterMatch = cleaned.match(/^(?:(\d{4})\s+)?(?:q|quarter)\s*([1-4])(?:\s+of)?(?:\s+(\d{4}))?$/);
    if (quarterMatch) {
        const yearBefore = quarterMatch[1];
        const quarter = parseInt(quarterMatch[2]);
        const yearAfter = quarterMatch[3];

        let targetDate;
        if (yearBefore || yearAfter) {
            // Year specified - use it
            const year = yearBefore || yearAfter;
            targetDate = moment().year(year).quarter(quarter);
        } else {
            // No year specified - find nearest quarter
            const thisYearQ = moment().year(now.year()).quarter(quarter);
            const lastYearQ = moment().year(now.year() - 1).quarter(quarter);
            const nextYearQ = moment().year(now.year() + 1).quarter(quarter);

            const daysToThisYear = Math.abs(now.diff(thisYearQ, 'days'));
            const daysToLastYear = Math.abs(now.diff(lastYearQ, 'days'));
            const daysToNextYear = Math.abs(now.diff(nextYearQ, 'days'));

            // Find nearest (prefer future if equidistant)
            if (daysToThisYear <= daysToLastYear && daysToThisYear <= daysToNextYear) {
                targetDate = thisYearQ;
            } else if (daysToLastYear < daysToNextYear) {
                targetDate = lastYearQ;
            } else {
                targetDate = nextYearQ;
            }
        }

        return { type: 'quarterly', date: targetDate };
    }

    // === WEEKLY PATTERNS ===
    // Formats: week 15, W15, week 15 2024, 2024 week 15, 2024 W15, W15 2024
    let weekMatch = cleaned.match(/^(?:(\d{4})\s+)?(?:week\s+|w)?(\d{1,2})(?:\s+(\d{4}))?$/);
    if (weekMatch) {
        const yearBefore = weekMatch[1];
        const week = parseInt(weekMatch[2]);
        const yearAfter = weekMatch[3];

        // Only treat as week if week number is valid (1-53) or has explicit "week"/"W" prefix
        if (week >= 1 && week <= 53 && (cleaned.includes('week') || cleaned.includes('w') || yearBefore || yearAfter)) {
            let targetDate;

            if (yearBefore || yearAfter) {
                // Year specified - use it
                const year = yearBefore || yearAfter;
                targetDate = moment().year(year).week(week);
            } else {
                // No year specified - find nearest week
                const thisYearWeek = moment().year(now.year()).week(week);
                const lastYearWeek = moment().year(now.year() - 1).week(week);
                const nextYearWeek = moment().year(now.year() + 1).week(week);

                const daysToThisYear = Math.abs(now.diff(thisYearWeek, 'days'));
                const daysToLastYear = Math.abs(now.diff(lastYearWeek, 'days'));
                const daysToNextYear = Math.abs(now.diff(nextYearWeek, 'days'));

                // Find nearest (prefer future if equidistant)
                if (daysToThisYear <= daysToLastYear && daysToThisYear <= daysToNextYear) {
                    targetDate = thisYearWeek;
                } else if (daysToLastYear < daysToNextYear) {
                    targetDate = lastYearWeek;
                } else {
                    targetDate = nextYearWeek;
                }
            }

            return { type: 'weekly', date: targetDate };
        }
    }

    // === ISO DATE PATTERNS ===
    // Formats: 2024-03-15, 2024-03, 2024
    const isoDateMatch = cleaned.match(/^(\d{4})-(\d{1,2})(?:-(\d{1,2}))?$/);
    if (isoDateMatch) {
        const year = parseInt(isoDateMatch[1]);
        const month = parseInt(isoDateMatch[2]);
        const day = isoDateMatch[3] ? parseInt(isoDateMatch[3]) : null;

        if (day) {
            return { type: 'daily', date: moment(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`) };
        } else {
            return { type: 'monthly', date: moment(`${year}-${String(month).padStart(2, '0')}-01`) };
        }
    }

    // === YEAR ONLY PATTERNS ===
    // Formats: 2024, year 2024
    const yearOnlyMatch = cleaned.match(/^(?:year\s+)?(\d{4})$/);
    if (yearOnlyMatch) {
        const year = parseInt(yearOnlyMatch[1]);
        return { type: 'yearly', date: moment(`${year}-01-01`) };
    }

    // === DAY-MONTH-YEAR PATTERNS ===
    // Formats: 15 March 2024, 15 Mar 2024, 15 March, 2024 March 15
    const dayMonthYearMatch = cleaned.match(/^(?:(\d{4})\s+)?(\d{1,2})\s+(\w+)(?:\s+(\d{4}))?$/);
    if (dayMonthYearMatch) {
        const yearBefore = dayMonthYearMatch[1];
        const day = parseInt(dayMonthYearMatch[2]);
        const monthStr = dayMonthYearMatch[3];
        const yearAfter = dayMonthYearMatch[4];
        const monthIndex = findMonthIndex(monthStr);

        if (monthIndex !== -1) {
            const year = yearBefore || yearAfter || now.year();
            const targetDate = moment().year(year).month(monthIndex).date(day);
            return { type: 'daily', date: targetDate };
        }
    }

    // === MONTH-DAY-YEAR PATTERNS ===
    // Formats: March 15, March 15 2024, 2024 March 15, February, Feb 2024, 2024 Feb
    const monthDayYearMatch = cleaned.match(/^(?:(\d{4})\s+)?(\w+)(?:\s+(\d{1,2}))?(?:\s+(\d{4}))?$/);
    if (monthDayYearMatch) {
        const yearBefore = monthDayYearMatch[1];
        const monthStr = monthDayYearMatch[2];
        const day = monthDayYearMatch[3] ? parseInt(monthDayYearMatch[3]) : null;
        const yearAfter = monthDayYearMatch[4];
        const monthIndex = findMonthIndex(monthStr);

        if (monthIndex !== -1) {
            const year = yearBefore || yearAfter;

            if (day) {
                // Day specified - it's a daily note
                const targetYear = year || now.year();
                const targetDate = moment().year(targetYear).month(monthIndex).date(day);
                return { type: 'daily', date: targetDate };
            } else {
                // Month only - find nearest occurrence
                let targetDate;

                if (year) {
                    // Year specified - use it
                    targetDate = moment().year(year).month(monthIndex).startOf('month');
                } else {
                    // No year specified - find nearest month
                    const thisYearMonth = moment().year(now.year()).month(monthIndex).startOf('month');
                    const lastYearMonth = moment().year(now.year() - 1).month(monthIndex).startOf('month');
                    const nextYearMonth = moment().year(now.year() + 1).month(monthIndex).startOf('month');

                    const daysToThisYear = Math.abs(now.diff(thisYearMonth, 'days'));
                    const daysToLastYear = Math.abs(now.diff(lastYearMonth, 'days'));
                    const daysToNextYear = Math.abs(now.diff(nextYearMonth, 'days'));

                    // Find nearest (prefer future if equidistant)
                    if (daysToThisYear <= daysToLastYear && daysToThisYear <= daysToNextYear) {
                        targetDate = thisYearMonth;
                    } else if (daysToLastYear < daysToNextYear) {
                        targetDate = lastYearMonth;
                    } else {
                        targetDate = nextYearMonth;
                    }
                }

                return { type: 'monthly', date: targetDate };
            }
        }
    }

    // === NUMERIC DATE PATTERNS ===
    // Formats: 3/15/2024, 15/3/2024 (ambiguous - try both)
    const slashDateMatch = cleaned.match(/^(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?$/);
    if (slashDateMatch) {
        const first = parseInt(slashDateMatch[1]);
        const second = parseInt(slashDateMatch[2]);
        const yearPart = slashDateMatch[3] ? parseInt(slashDateMatch[3]) : null;

        // Assume MM/DD/YYYY format (US style)
        if (first <= 12) {
            const month = first;
            const day = second;
            const year = yearPart ? (yearPart < 100 ? 2000 + yearPart : yearPart) : now.year();
            const targetDate = moment().year(year).month(month - 1).date(day);
            if (targetDate.isValid()) {
                return { type: 'daily', date: targetDate };
            }
        }
    }

    return null;
}

function getNotePath(type, date) {
    const formats = {
        'daily': { folder: 'almanac/day', format: 'YYYY-MM-DD' },
        'weekly': { folder: 'almanac/week', format: 'gggg-[W]ww' },
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

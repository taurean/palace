# Periodic Notes System — User Guide

A seamless natural language system for creating and navigating daily, weekly, monthly, quarterly, and yearly notes in Obsidian.

## Quick Start

1. **Open Command Palette:** `Cmd/Ctrl + P`
2. **Search for:** "Templater: Open Periodic Note"
3. **Enter natural language:** Type any date expression (see examples below)
4. **Done!** The note opens instantly (created from template if new)

### Recommended: Assign a Hotkey

1. Go to **Settings → Hotkeys**
2. Search for **"Templater: Open Periodic Note"**
3. Assign your preferred shortcut (e.g., `Cmd/Ctrl + Shift + D`)

---

## Supported Date Expressions

### Relative Dates

**Daily:**
- `today` → Today's daily note
- `tomorrow` → Tomorrow's daily note
- `yesterday` → Yesterday's daily note

**Weekly:**
- `this week` → Current week note
- `next week` → Next week note
- `last week` → Last week note

**Monthly:**
- `this month` → Current month note
- `next month` → Next month note
- `last month` → Last month note

**Quarterly:**
- `this quarter` → Current quarter note
- `next quarter` → Next quarter note
- `last quarter` → Last quarter note

**Yearly:**
- `this year` → Current year note
- `next year` → Next year note
- `last year` → Last year note

### Absolute Dates

**Month Names:**
- `February` → February 2026 (future month, current year)
- `March 2024` → March 2024
- `mar 23` → March 23, 2026

**Quarters:**
- `Q3` → Q3 of current/relevant year
- `Q1 2024` → Q1 2024

**Weeks:**
- `week 32` → Week 32 of current year
- `W15 2024` → Week 15 of 2024

**ISO Dates:**
- `2024-03-15` → Daily note for March 15, 2024
- `2024-03` → Monthly note for March 2024
- `2024` → Yearly note for 2024

---

## Note Structure

### File Locations

All periodic notes are stored in the `almanac/` folder:

```
almanac/
├── day/2025-11-28.md
├── week/2025-W48.md
├── month/2025-11.md
├── quarter/2025-Q4.md
└── year/2025.md
```

### Backlinks & Navigation

Every note includes:
- **Previous/Next** links for the same period type
- **Parent period** links (day → week → month → quarter → year)
- **Child period** links where applicable (year → quarters, quarter → months, etc.)

Example: A daily note links to:
- Previous day ← | → Next day
- Its week, month, quarter, and year

---

## Templates

Templates are located in `system/templater-templates/`:

- `Daily Note.md` — Daily note template
- `Weekly Note.md` — Weekly note template with daily breakdown
- `Monthly Note.md` — Monthly note template with weeks list
- `Quarterly Note.md` — **Quarterly note template with three months**
- `Yearly Note.md` — Yearly note template with four quarters

### Customizing Templates

You can edit any template to add:
- Custom frontmatter properties
- Additional sections
- Dataview queries
- Task lists
- Whatever fits your workflow

**Important:** All backlinks are generated dynamically via Templater, so they'll always reflect the correct date even if you modify the template.

---

## Edge Cases Handled

The system correctly handles:

- **Week/Year Boundaries:** Week 1 may belong to the previous year (ISO week standards)
- **Week 52/53:** Handles years with 53 weeks
- **Leap Years:** February dates work correctly
- **Quarter Boundaries:** Q4 2024 → Q1 2025 navigation works seamlessly
- **Ambiguous Months:** "January" in December → next January (future month assumed)

---

## Troubleshooting

### "Could not parse" Error

If you get a parsing error, try:
- `today` instead of "now"
- `Q3` instead of "quarter 3"
- `2024-03-15` instead of "15/03/2024"
- `week 32` instead of "w32" (include the space)

### Template Not Found

1. Check that Templater is configured:
   - Settings → Templater → Template folder location: `system/templater-templates`
   - User script folder location: `system/templater-scripts`
2. Restart Obsidian after changing these settings

### Note Created in Wrong Location

The system creates notes in specific folders:
- Daily → `almanac/day/`
- Weekly → `almanac/week/`
- Monthly → `almanac/month/`
- Quarterly → `almanac/quarter/`
- Yearly → `almanac/year/`

If a note appears elsewhere, ensure these folders exist.

---

## Technical Details

### Dependencies

- **Templater** (v2.11.1+) — Template engine and user scripts
- **Natural Language Dates** (optional) — Enhances manual date linking

### Architecture

1. **User Script:** `system/templater-scripts/periodicNotes.js`
   - Parses natural language input
   - Determines note type (daily/weekly/monthly/quarterly/yearly)
   - Calculates target date using moment.js
   - Returns file path and template

2. **Entry Point:** `system/templater-templates/Open Periodic Note.md`
   - Single-command trigger
   - Prompts for input
   - Calls the user script

3. **Templates:** Five note type templates with dynamic backlinks

### Performance

- Note creation: < 1 second
- Uses moment.js (bundled with Obsidian, no external dependencies)
- No network calls

---

## Advanced Usage

### Creating Notes for Specific Dates

You can create notes for any date without opening them by modifying the script. However, the current implementation automatically opens or creates the note.

### Batch Creation

To create multiple periodic notes at once, run the command multiple times or modify the script to accept multiple inputs.

### Integration with Other Plugins

This system works alongside:
- **Dataview** — Query periodic notes by type, date range, etc.
- **Calendar** — Visual navigation (though Calendar plugin is unmaintained)
- **Daily Notes** core plugin — Can coexist if you prefer it for daily notes only

---

## Examples

### Scenario 1: Weekly Review

1. Open command: `Cmd/Ctrl + Shift + D`
2. Type: `last week`
3. Template populates with all 7 days linked
4. Fill in your weekly summary

### Scenario 2: Quarterly Planning

1. Open command: `Cmd/Ctrl + Shift + D`
2. Type: `next quarter`
3. Template shows the three months in that quarter
4. Plan your Q1 goals

### Scenario 3: Jump to Specific Date

1. Open command: `Cmd/Ctrl + Shift + D`
2. Type: `2024-06-15`
3. Opens (or creates) daily note for June 15, 2024

---

## Support

For issues or questions:
- Check the troubleshooting section above
- Review the templates in `system/templater-templates/`
- Examine the script in `system/templater-scripts/periodicNotes.js`

---

## Credits

Built using:
- [Templater](https://github.com/SilentVoid13/Templater) by SilentVoid13
- [moment.js](https://momentjs.com/) (bundled with Obsidian)
- Palace vault template structure

**Version:** 1.0.0
**Last Updated:** 2025-11-28

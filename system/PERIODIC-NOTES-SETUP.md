# Periodic Notes Setup Instructions

This vault now includes a complete periodic notes system with full quarterly support and natural language input.

## What's Included

### Plugin
- **Almanac Notes** — Custom plugin that registers the "Create Almanac Note" command ⭐

### Folder Structure
- `almanac/day/` — Daily notes (YYYY-MM-DD.md)
- `almanac/week/` — Weekly notes (YYYY-Www.md)
- `almanac/month/` — Monthly notes (YYYY-MM.md)
- `almanac/quarter/` — Quarterly notes (YYYY-Qq.md) ⭐
- `almanac/year/` — Yearly notes (YYYY.md)

### Templates (in `system/templater-templates/`)
- `_periodic/Daily Note.md` — Daily template with navigation
- `_periodic/Weekly Note.md` — Weekly template with 7 days breakdown
- `_periodic/Monthly Note.md` — Monthly template with weeks list
- `_periodic/Quarterly Note.md` — Quarterly template with 3 months ⭐
- `_periodic/Yearly Note.md` — Yearly template with 4 quarters
- `Open Periodic Note.md` — Template entry point (fallback) ⭐

### Scripts (in `system/templater-scripts/`)
- `periodicNotes.js` — Natural language parser ⭐

### Documentation
- `system/periodic-notes-guide.md` — Complete user guide

---

## Installation Steps

### 1. Restart Obsidian

The Templater configuration has been updated to use:
- Template folder: `system/templater-templates`
- User scripts folder: `system/templater-scripts`

**Close and reopen Obsidian** for these changes to take effect.

### 2. Verify Templater Settings

After restart:
1. Open **Settings → Templater**
2. Confirm:
   - ✅ Template folder location: `system/templater-templates`
   - ✅ User Scripts folder: `system/templater-scripts`
3. If these don't match, update them manually

### 3. (Recommended) Assign Hotkey

For fastest access, assign a hotkey directly to the almanac notes command:

1. Go to **Settings → Hotkeys**
2. Search: `Create Almanac Note`
3. Click the **+** icon
4. Press your preferred shortcut (e.g., `Cmd/Ctrl + Shift + D`)
5. Save

Now pressing your hotkey will directly prompt you for a date - no template picker needed!

---

## First Use

### Test the System

**Method 1: Direct Command (Recommended)**

1. **Open Command Palette:** `Cmd/Ctrl + P`
2. **Search:** "Create Almanac Note"
3. **Try these inputs:**
   - `today` → Creates/opens today's daily note
   - `this quarter` → Creates/opens current quarter note
   - `next month` → Creates/opens next month note

**Method 2: Via Template Picker (Alternative)**

1. **Open Command Palette:** `Cmd/Ctrl + P`
2. **Search:** "Templater: Insert Template"
3. **Select:** "Open Periodic Note"
4. **Enter date:** Same as above

### Expected Behavior

- If the note exists, it opens
- If the note doesn't exist, it's created from the template and opened
- All backlinks are populated automatically

---

## Verification Checklist

- [ ] Obsidian restarted
- [ ] Templater settings verified
- [ ] Command appears in palette: "Templater: Open Periodic Note"
- [ ] Test note created successfully in `almanac/` folder
- [ ] Template includes navigation links
- [ ] (Optional) Hotkey assigned

---

## Common Issues

### "Template not found" Error

**Fix:**
1. Verify the templates folder: Settings → Templater → Template folder location = `system/templater-templates`
2. Restart Obsidian

### "User script not found" Error

**Fix:**
1. Settings → Templater → User Scripts folder
2. Set to: `system/templater-scripts`
3. Restart Obsidian

### "Templater: Insert Template" shows no templates

**Fix:**
1. Check that `Open Periodic Note.md` exists in `system/templater-templates/`
2. Verify Templater is enabled (Settings → Community plugins)
3. Check templates folder path in Templater settings
4. Restart Obsidian

### Note created in wrong location

**Fix:** The script creates notes in specific subfolders:
- Ensure all 5 subfolders exist in `almanac/`
- Check file permissions (should be writable)

---

## Usage

Once setup is complete, see the **full user guide** at:
- `system/periodic-notes-guide.md`

Or jump straight in by running the command and typing natural language dates like:
- `tomorrow`
- `next quarter`
- `February 2024`
- `Q3`
- `week 15`

---

## What Changed

This implementation replaces the need for:
- ❌ Calendar plugin (unmaintained)
- ❌ Periodic Notes plugin (unmaintained)
- ❌ Custom quarterly note hacks

Instead, it uses:
- ✅ Templater (actively maintained)
- ✅ Custom user script (you own the code)
- ✅ moment.js (bundled with Obsidian)

**Result:** Full control, quarterly support, < 1 second performance, zero unmaintained dependencies.

---

## Next Steps

1. Complete the setup checklist above
2. Test with `today` and `this quarter`
3. Read the user guide: `system/periodic-notes-guide.md`
4. Customize templates to fit your workflow
5. Assign a hotkey for daily use

Enjoy your seamless periodic notes system!

# Getting started
[[changelog]] • [[Directory]]

Obsidian is powerful, but that power comes with a lot of decisions. Where do notes go? How should you organize them? What plugins are worth using? Palace is an opinionated starter system that answers those questions so you can focus on actually using your vault.

Before diving into folders and files, it's worth understanding the thinking behind how Palace is structured.

[[make the most of palace|Read: How to think about Palace →]]

---

## Folders & files

> [!info]- folder structure
> ```bash
palace/
├── almanac/
│   ├── day/
│   │   └── 2025-12-31.md
│   ├── month/
│   │   └── 2025-12.md
│   ├── quarter/
│   │   └── 2025-Q4.md
│   ├── week/
│   │   └── 2025-W52.md
│   └── year/
│       └── 2025.md
├── clipped/
│   ├── _sample-clipped/
│   │   └── example-note.md
│   ├── note1.md
│   └── note2.md
├── collections/
│   ├── Albums Collection.md
│   └── Articles Collection.md
├── notes/
│   ├── _sample-notes/
│   │   └── example-note.md
│   ├── note1.md
│   └── note2.md
├── system/
│   ├── attachments/
│   ├── bases/
│   ├── clipper-templates/
│   ├── templater-scripts/
│   ├── templater-templates/
│   │   ├── _almanac/
│   │   │   ├── Daily Note.md
│   │   │   ├── Monthly Note.md
│   │   │   ├── Quarterly Note.md
│   │   │   ├── Weekly Note.md
│   │   │   └── Yearly Note.md
│   │   └── Open Alamanac Note.md
│   ├── templates/
│   ├── changelog.md
│   ├── getting-started.md
│   ├── hotkeys.md
│   ├── plugins.md
│   └── types.md
├── directory.md
├── home.md
├── publish.css
├── publish.js
├── public.md
└── view-later.md
> ```

### almanac/
Notes anchored to a specific date live here. Daily notes, weekly notes, monthly notes, and so on. If a note is _about_ a period of time, it belongs in almanac. If a note is about an event that happened on a date (like a concert or a trip), it belongs in `notes/` instead.

### clipped/
Notes created by the [Obsidian Web Clipper](https://obsidian.md/clipper) go here. This keeps a clear line between notes you wrote and notes generated from outside content. Palace includes clipper templates you can import to create notes that match your internal templates.

### collections/
Palace includes 30+ templates for different kinds of notes: albums, books, movies, people, places, recipes, and more. Each **Kind** gets a collection file that lists every note of that type. This folder holds those collection files so you can browse all your albums or all your books in one place.

### notes/
This is where your notes live. When you create a new note, it lands here by default. The only exceptions are date-based notes (which go to `almanac/`) and clipped content (which goes to `clipped/`). 

### system/
Everything that makes Palace work lives here: templates, bases, clipper templates, and documentation. You generally won't need to touch this folder day-to-day, but it's where you'll go when you want to customize how Palace behaves.

---

### Key files

#### home.md
Your home note opens every time you launch Obsidian. It surfaces pinned notes, recently created notes, active quests, drafts, recent media, and journal entries. Modify it however you want. You'll use this note constantly.

#### directory.md
A directory of directories. It lists every **Kind** of note Palace supports, what each kind is for, links to templates, and links to sample notes so you can see what filled-out versions look like.

#### view-later.md
A running list of media you haven't marked as finished yet. Your watch/read/listen queue.

#### system/templates/*
The heart of Palace. 30+ templates for different note types. These are also good starting points for creating your own. If you collect fragrances, for example, you might duplicate `object.md` and create a `fragrance.md` with fields for scent notes and houses. These can be added to a note by using `cmd + t` or `ctrl + t`.

#### system/bases/*
[Bases](https://help.obsidian.md/bases) are a newer Obsidian feature that let you save filtered, sortable views of your notes. Palace uses these to power collections and surface notes in different ways.

#### system/clipper-templates/*
JSON templates you can import into the [Obsidian Web Clipper](https://obsidian.md/clipper). They're designed to create clipped notes that match Palace's internal structure. These use the interpreter feature, so you'll need to add your own API key from OpenAI, Anthropic, or another supported provider.

#### system/templater-templates/*
Templates specifically for use with the [Templater](https://github.com/SilentVoid13/Templater) plugin. Currently used to format various almanac notes such as weekly notes with links to each day. If you need templates that execute some scripting in order to populate your note, templater is how you do it. These can be added to a note by using `cmd + alt + t` or `ctrl + alt + t.`

#### files for publishing
- **publish.css / publish.js** – Only relevant if you use [Obsidian Publish](https://obsidian.md/publish)
- **public.md** – A public-facing home page for Obsidian Publish. Delete it if you won't publish.

---

## Further documentation
- [[make the most of palace]] • Practical advice and philosophical thoughts to make the most out of palace
- [[First steps]] • A checklist of things to try to get used to Palace
- [[changelog]] • What changed between Palace versions
- [[hotkeys]] • Modified keyboard shortcuts configured in Palace
- [[plugins]] – Which plugins Palace uses and why
- [[types]] – Every property type, what it's for, and what data goes in it

### Next steps
- Explore the [[directory]] to see every kind of note available
- Open your [[home]] note and start from there
- Check [[hotkeys]] to learn the shortcuts that'll save you time
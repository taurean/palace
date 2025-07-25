# Getting started
[[changelog]] • [[Directory]]

Obsidian is an incredibly powerful tool but it can feel daunting to get started. Palace is an _opinionated_ vault template that can hopefully provide some structure. 

> [!info]- folder structure
> ```bash
palace/
├── almanac/
│   ├── day/
│   │   └── 2025-12-31.md
│   ├── month/
│   │   └── 2025-12.md
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
│   ├── _pinned/
│   ├── _sample-notes/
│   │   └── example-note.md
│   ├── note1.md
│   └── note2.md
├── system/
│   ├── attachments/
│   ├── bases/
│   ├── clipper-templates/
│   ├── templates/
│   ├── templater-templates/
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

## How to think about Palace
Palace is designed to help you take your unstructured thoughts, memories, and references, and give it just a bit of form. You shouldn't use this to build a perfect database or a comprehensive wiki. With anything that you write, you should keep in mind who will be reading it and Palace is no different. Write with you as the reader in mind, a few years down the road. 

[[Palace decisions and opinions|Keep reading →]]



## Sections
### Almanac
The almanac folder is specifically for housing notes that are anchored to a specific date. By default, notes created using the calendar plugin such as daily or weekly notes are automatically added to `almanac/`. This would also be a good place to put notes for quarters, years, or decades if the note is _about_ that date or time. If the note is about an event associated with a date (eg. 9/11), it should instead be in the `notes/` folder. 

### Clipped
The clipped folder is for notes created by the [Obsidian Clipper](https://obsidian.md/clipper) browser extension. This makes a clear delineation between notes that *you* wrote vs notes that were generated from outside content. Palace comes with a few templates you can import into the extension for easily creating notes that align with internally-drafted counterparts. 

### Collections
At the core of Palace is a suite of templates for drafting different kinds of notes (30-40 in total). Those notes all get a specific type identifier with the `kind` property. The Collection folder is a directory of note files that are themselves a directory for each kind. This way, you can easily see all of your albums or books all in one place. 

### Notes
This folder is where all of the notes that you created and wrote in live. When you create a new note it will automatically be added to this folder. The only exception are daily/weekly notes going to almanac and clipped content going to clipped. If you create new collections you will have to manually move them to the collections folder. For notes that you want to have easy access to, you can drag them into `notes/_pinned`.

### System
System houses almost everything that makes Palace, palace. The only exception is the hidden `.obsidian` directory that comes with every obsidian vault. That folder keeps your setting configuration files, themes, plugin configurations, etc. To view and edit those files you will need a different text editor like [VS Code](https://code.visualstudio.com) or [Zed](https://zed.dev). I don't recommend editing those files unless you know what you are doing.

#### attachments
If you attach files to a note such as audio or images, they will get automatically added to this folder. You can read more about [attachments in the obsidian docs](https://help.obsidian.md/attachments).
#### bases
Bases are a new feature in Obsidian, in fact at the time of this being written the feature has not been officially released yet. Bases are a new file type that lets you save filtered lists of your notes with lots of controls for configuration. Read more about them in the [Obsidian bases docs](https://help.obsidian.md/bases).
#### clipper-templates
To align with the way templates are structured for Palace, there are also some sister-templates you can import into the [Obsidian Clipper]() browser extension. Although they are not visible in Obsidian since they are `.json` files, you should be able to [import them in your clipper settings](https://help.obsidian.md/web-clipper/templates#Import+and+export+Web+Clipper+templates) by navigating to the `palace/system/clipper-templates` folder. These clipper templates rely on the interpreter feature which means you will also need to enable interpreter with your own API key from Open AI, Anthropic, or one of the other supported AI providers.

#### templates
Templates are at the heart of how Palace works, with 30-40 templates available to you at the start. Some of these templates are also solid baselines for creating *new* templates that might fit your use-case. For example, if you collect fragrances, you might want to duplicate the `object.md` template and create a new `fragrance.md` so you can include formatting for scent notes or tagging the designer/brand.

#### templater-templates
These templates are specifically for being used with [Templater](https://github.com/SilentVoid13/Templater). Currently, this is only used to format the week note so you can prefill the days of the week with tags to those specific days. 

#### changelog.md
the [[changelog]] file is used to track the changes between Palace versions. There, you can see what was added, removed, or changed (at least at a high level, tracking changes is hard 😅).
#### getting-started.md
you're reading that note now!
#### hotkeys.md
the [[hotkeys]] note documents all of the modified hotkey combinations that is configured in Palace.
#### plugins.md
the [[plugins]] note documents all of the plugins that Palace depends on and usually some guidance on how you should use them or why.
#### types.md
[Props](https://help.obsidian.md/properties) are a really useful feature built into obsidian that you can use to store metadata and even configure [bases](https://help.obsidian.md/bases). To keep things organized, I have tried to find the right balance of unique props for organizing all of that data. the [[types]] note file documents every type, why you might use it, and what kind of data is entered into it.
### directory.md
the [[directory]] file is basically a directory of directories. It lists every `kind` of note, a description of what that note kind is for, a link to the template, a link to the collection of that kind, and lastly a link to a demo of what those notes look like when filled out. Sample notes are kept in `clipped/_sample-clipped` and `notes/_sample-notes`. You can delete both folders once you feel like you don't need them.
### home.md
Whenever you open Obsidian, your home note will open in a pinned state. Your home note will include links to recently created notes, pinned notes, [[directory#Quests|quests]] and quest lines, drafts you are writing, recent media notes, and journal entries. Feel free to add/remove/modify as you see fit, you should be using this note a ton.
### publish.css
If you use [Obsidian Publish](https://obsidian.md/publish), this CSS file can be used to change some of the styling decisions that come by default. You can read more about how to do this in the [Obsidian docs](https://help.obsidian.md/publish/customize).
### publish.js
Similar to `publish.css`, the `publish.js` file also runs whenever your published Obsidian site is loaded. One common use-case for this is using analytics that aren't supported by Obsidian by default, eg. [Pirsch](https://pirsch.io).
### public.md
the [[public]] note is very similar to your [[public|Home]] note, except this is what you can use as your "home" page if you publish via Obsidian Publish. If you know that you will never publish anything from your vault with Obsidian Publish, you can remove this file.

### view-later.md
this [[View Later|note]] contains a list of all media that you haven't marked as finished yet. 
# How to think about Palace

Palace comes with a lot of structure, but structure is only useful if you understand the thinking behind it. This doc walks through the design decisions so you can work with the system instead of against it.

## Write for future you

The most important thing to remember: ==**you are writing for yourself to read this in three or more years**==. Write like you're excited to talk to your future self.

Your vault isn't a database. It's not trying to be Wikipedia. It's a personal record that should be structured for _you_ to read, not to be comprehensive or technically complete. If a note doesn't make sense to you when you come back to it, it's not serving its purpose.

Done well, your vault becomes one of your most valuable possessions. A collection of memories. Your thoughts as works in progress. Your recipes. The things you loved and why. It's what's left in the wake of being who you are.

## Properties vs the note body

Obsidian has two places to put information: [properties](https://help.obsidian.md/properties) (the metadata at the top) and the body of the note itself.

Both are searchable, so that's not the difference. The difference is what each is _for_.

Properties power bases. They let you filter, sort, and pull structured data across notes. If you want to see every book you rated 4 or higher, or every recipe tagged as "quick," that's what properties enable.

The body is for everything else. Context, thoughts, the stuff you'll actually want to read. If you're writing something so you can _remember_ it, put it in the body. If you're writing something so you can _filter_ by it later, make it a property.

## How kinds work

Most notes in Palace have a "kind" assigned in their properties. This links the note to a [[directory]] entry that defines what type of thing it is: a person, a movie, a place, a project.

Keep your kinds simple. A kind should only have one parent level above it _or_ one child level below it. Deep hierarchies get confusing fast.

Keep your kinds high-level too. You should usually avoid creating individual notes for specific songs or podcast episodes. Instead, add them as sections within the album or show note. This keeps your vault from ballooning with tiny notes that don't stand on their own.

## Rating things

Palace uses a 1–5 rating scale with no half stars. Here's how to think about each number:

**1 – Hall of fame bad.** This thing is cursed. You might actually tell people to avoid it.

**2 – Just bad.** You won't revisit it or recommend it, but you're not warning people either.

**3 – Good.** It was exactly what you expected and worth your time. You'd recommend it if someone asked.

**4 – Great.** This exceeded expectations. You're bringing it up in conversation unprompted.

**5 – Hall of fame great.** You'll remember this in ten years. It might become your whole personality for a few weeks.

One more thing: something being great and something being great _for you_ are different questions. You can mark something as "liked" even if you gave it one star. Inversely, something that you think is five stars might not earn that heart. Personal resonance and quality aren't the same thing.

## Use your vault

The [graph view](https://help.obsidian.md/plugins/graph) and [random note](https://help.obsidian.md/plugins/random-note) plugin aren't just features. They're invitations. Spend time wandering through old notes instead of doom scrolling. Your past self had things to say. Give them an audience.

## Why so few plugins?

Palace is designed to limit dependence on third-party plugins. Plugins break. They get abandoned. They change in ways that don't match how you use them.

The goal is a vault that stays resilient over time. The fewer moving parts, the less likely something breaks when Obsidian updates or a plugin author moves on. Your vault should outlast any single tool's lifespan.

## Make it yours

**Palace is made to be modified.** If there's a template missing, add it. If your notes need a property the template doesn't have, add it. Palace is a starting point, not a finished system.

The best version of Palace is the one you shape to fit how you think. Start here, then make it yours.
# Home
[[Palace|Vault Docs]] • [[directory]] • [[public|Public Home]]


## Pinned
%%
@TODO: INSERT BASE HERE
filter to folder: notes/_pinned

COLUMNS:
- title
- kind

%%
![[_all.base]]

## Latest Notes
%%
@TODO: INSERT BASE HERE
all notes that could be created by user.
filter to latest 8 or something

COLUMNS:
- title
- kind

%%
![[_all.base]]

## Watch list
%%
@TODO: INSERT BASE HERE
all notes with kind = album, books, comic Issues, movies, podcast episodes, show seasons, video games
**AND** finished = false

limit to latest 5 or something

COLUMNS:
- title as "Title"
- kind as "Media"
- publish-date as "released on"

%%
![[_all.base]]

## Quests
[[Quests Collection|view all quests]]
%%
@TODO: INSERT BASE HERE
all notes with kind = quest
limit to latest 3 or something

COLUMNS:
- title as "Quest Line"
- finished (render as "✅" or " ")

%%
![[_all.base]]


## Drafts
[[Drafts Collection|view all drafts]]
%%
@TODO: INSERT BASE HERE
all notes with kind = draft
limit to latest 4 or something

COLUMNS:
- title
- published (render as "✅" or " ")

%%
![[_all.base]]


## Recent Media
%%
@TODO: INSERT BASE HERE
all notes with kind = album, books, comic Issues, movies, podcast episodes, show seasons, video games

limit to latest 10 or something

COLUMNS:
- title as "Title"
- kind as "Media"
- rating reformatted as stars
- liked renamed "❤️", reformatted as either "❤️"  or " "

%%
![[_all.base]]

## Recent journal entries
%%
@TODO: INSERT BASE HERE
all notes with kind = journal entry
limit to latest 3 or something

COLUMNS:
- file.ctime (created time) as "Title", link to note
- file.links.length as "link count"

%%
![[_all.base]]
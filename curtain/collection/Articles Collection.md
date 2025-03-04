---
aliases:
  - Articles
entityIs: "[[Directory|Collection]]"
published: false
---
# Articles Collection
%% Enter notes below this line %%
```dataview
TABLE without id
	file.link as Article,
	author as Author
where
	contains(entityIs, this.file.link) AND !contains(file.folder, "curtain")
sort file.link asc
```

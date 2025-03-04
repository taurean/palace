---
aliases:
publish: false
creationDate: "<% tp.file.creation_date('YYYY-MM-DDTHH:mm') %>"
entityIs: "[[Articles Collection|Articles]]"
finished:
rating:
author:
publisher:
publishDate:
source:
topics:
contains:
  - clipping
---
# <% tp.file.title %>
>[!summary]
>

## My notes:
%% Enter notes below this line %%


---
## Quotes:
%% Query: Backlinks %%
```dataview
list
from
	[[]]
where
	!contains(contains, "fragment") AND !contains(file.folder, "curtain") AND contains(entityIs, [[Quotes Collection|Quotes]])
sort file.ctime asc
```

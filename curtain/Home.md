# Home
[[Palace|Vault Docs]] • [[Directory]] • [[Publish Home|Public Home]]

%% If there are certain notes you open often, pin it here %%
## Pinned
-

## Latest Notes
```dataview
TABLE without id
	file.link as "Note title",
	choice(entityIs, entityIs, "Note") as Type
WHERE
	!contains(file.folder, "curtain") AND
	!contains(file.folder, "sample")

SORT file.ctime desc
limit 8
```

## Quests

```dataview
TABLE without id
	file.link as Title,
	choice(questLine, questLine, "") as Parent-quest,
	choice(completed = true, "✅", "⬚") as "Finished"
WHERE
	contains(entityIs, [[Quests Collection|Quests]]) AND
	!contains(file.folder, "curtain") AND
	!contains(file.folder, "sample")

SORT file.ctime desc
LIMIT 5
```

```dataview
TABLE without id
	file.link as "Quest line",
	due as Due,
	choice(completed = true, "✅", "⬚") as "Finished"
WHERE
	contains(entityIs, [[Quest Lines Collection|Quest Lines]]) AND
	!contains(file.folder, "curtain") AND
	!contains(file.folder, "sample")

SORT file.ctime desc
LIMIT 3
```

## Drafts
```dataview
TABLE without id
	file.link as Title,
	choice(publish = true, "✅", "⬚") as "Published"
WHERE
	contains(entityIs, [[Drafts Collection|Drafts]]) AND
	!contains(file.folder, "curtain") AND
	!contains(file.folder, "sample")

SORT file.ctime desc
LIMIT 5
```

## Recent Media
```dataview
TABLE without id
	file.link as "Media title",
	choice(entityIs = [[Albums Collection|Albums]], [[Albums Collection|Album]],
		choice(entityIs = [[Books Collection|Books]], [[Books Collection|Book]],
			choice(entityIs = [[Show Episodes Collection|Show Episodes]], [[Show Episodes Collection|Show Episode]],
			    choice(entityIs = [[Podcasts Episodes Collection|Podcasts Episodes]], [[Podcasts Episodes Collection|Podcasts Episode]],
					choice(entityIs = [[Movies Collection|Movies]], [[Movies Collection|Movie]],
					   choice(entityIs = [[Comic Issues Collection|Comic Issues]], [[Comic Issues Collection|Comic Issue]],
							choice(entityIs = [[Performances Collection|Performances]], [[Performances Collection|Performance]],
							    choice(entityIs = [[Video Games Collection|Video Games]], [[Video Games Collection|Video Game]],
									"?"
								)
							)
						)
					)
				)
			)
		)
	) as "Media",
	choice(round(rating) = null, "",
	    choice(rating <= 1, "★☆☆☆☆",
			choice(rating = 2, "★★☆☆☆",
                choice(rating = 3, "★★★☆☆",
                    choice(rating = 4, "★★★★☆",
                        choice(rating <= 5, "★★★★★", "")
                    )
                )
			)
		)
	) as "Rating"
WHERE
	!contains(file.folder, "curtain") AND
	!contains(file.folder, "sample") AND

	(contains(entityIs, [[Albums Collection|Albums]]) OR
	contains(entityIs, [[Books Collection|Books]]) OR
	contains(entityIs, [[Show Episodes Collection|Show Episodes]]) OR
	contains(entityIs, [[Podcasts Episodes Collection|Podcasts Episodes]]) OR
	contains(entityIs, [[Movies Collection|Movies]]) OR
	contains(entityIs, [[Comic Issues Collection|Comic Issues]]) OR
	contains(entityIs, [[Performances Collection|Performances]]) OR
	contains(entityIs, [[Video Games Collection|Video Games]]))

SORT file.ctime desc
LIMIT 6
```

## Recent journal entries
```dataview
TABLE without id
	file.link as "Entry title"
WHERE
	!contains(file.folder, "curtain") AND
	!contains(file.folder, "sample") AND
	contains(entityIs, [[Journal Entries Collection|Journal Entries]])


SORT file.ctime desc
LIMIT 3
```

---
aliases: "<% tp.date.now('YYYY') %>"
creationDate: "<% tp.file.creation_date('YYYY-MM-DDTHH:mm') %>"
entityIs: "[[Yearly Notes]]"
year: "[[<% tp.date.now('YYYY') %>]]"
yearStart: "[[<% tp.date.now('YYYY') %>-01-01]]"
yearEnd: "[[<% tp.date.now('YYYY') %>-12-31]]"
---
# <% tp.date.now('YYYY') %>

## Navigation
← [[<% tp.date.now('YYYY', 0, moment(tp.date.now('YYYY-01-01')).subtract(1, 'year')) %>|Previous Year]] | [[<% tp.date.now('YYYY', 0, moment(tp.date.now('YYYY-01-01')).add(1, 'year')) %>|Next Year]] →

---

## Quarters
- [[<% tp.date.now('YYYY') %>-Q1|Q1 <% tp.date.now('YYYY') %>]] (Jan – Mar)
- [[<% tp.date.now('YYYY') %>-Q2|Q2 <% tp.date.now('YYYY') %>]] (Apr – Jun)
- [[<% tp.date.now('YYYY') %>-Q3|Q3 <% tp.date.now('YYYY') %>]] (Jul – Sep)
- [[<% tp.date.now('YYYY') %>-Q4|Q4 <% tp.date.now('YYYY') %>]] (Oct – Dec)

## Summary


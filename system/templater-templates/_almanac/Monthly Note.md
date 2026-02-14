---
aliases: "<% tp.date.now('YYYY-MM') %>"
creationDate: "<% tp.file.creation_date('YYYY-MM-DDTHH:mm') %>"
entityIs: "[[Monthly Notes]]"
month: "[[<% tp.date.now('YYYY-MM') %>]]"
quarter: "[[<% tp.date.now('YYYY') %>-Q<% tp.date.now('Q') %>]]"
year: "[[<% tp.date.now('YYYY') %>]]"
startDate: "[[<% tp.date.now('YYYY-MM-01') %>]]"
endDate: "[[<% tp.date.now('YYYY-MM-DD', 0, moment(tp.date.now('YYYY-MM-01')).endOf('month')) %>]]"
description: ""
---
# <% tp.date.now('MMMM YYYY') %>
← [[<% tp.date.now('YYYY-MM', 0, moment(tp.date.now('YYYY-MM-01')).subtract(1, 'month')) %>|<% tp.date.now('MMMM', 0, moment(tp.date.now('YYYY-MM-01')).subtract(1, 'month')) %>]] • [[<% tp.date.now('YYYY') %>-Q<% tp.date.now('Q') %>|<% tp.date.now('Qo') %> Quarter]] • [[<% tp.date.now('YYYY-MM', 0, moment(tp.date.now('YYYY-MM-01')).add(1, 'month')) %>|<% tp.date.now('MMMM', 0, moment(tp.date.now('YYYY-MM-01')).add(1, 'month')) %>]] →

> [!summary]
>

## Todo
- [ ] 

---
## Notes
### Weeks
![[Dynamic Time.base#Weeks]]

### Days
![[Dynamic Time.base#Days]]

### from this month
![[Dynamic Time.base#Items Created]]

---
aliases: "<% tp.date.now('YYYY') %>-Q<% tp.date.now('Q') %>"
creationDate: "<% tp.file.creation_date('YYYY-MM-DDTHH:mm') %>"
entityIs: "[[Quarterly Notes]]"
quarter: "[[<% tp.date.now('YYYY') %>-Q<% tp.date.now('Q') %>]]"
year: "[[<% tp.date.now('YYYY') %>]]"
startDate: "[[<% tp.date.now('YYYY-MM-DD', 0, moment(tp.date.now()).startOf('quarter')) %>]]"
endDate: "[[<% tp.date.now('YYYY-MM-DD', 0, moment(tp.date.now()).endOf('quarter')) %>]]"
description: ""
---
# Q<% tp.date.now('Q') %> <% tp.date.now('YYYY') %>
<%*
const currentQuarter = parseInt(tp.date.now('Q'));
const currentYear = parseInt(tp.date.now('YYYY'));
const normalize = (q, y) => {
    if (q < 1) return { q: 4, y: y - 1 };
    if (q > 4) return { q: 1, y: y + 1 };
    return { q, y };
};
const prev = normalize(currentQuarter - 1, currentYear);
const next = normalize(currentQuarter + 1, currentYear);
tR += `← [[${prev.y}-Q${prev.q}|Previous Quarter]] • [[${currentYear}]] • [[${next.y}-Q${next.q}|Next Quarter]] →`;
%>

> [!summary]
>

## Todo
- [ ] 

---
## Notes
### Months
![[Dynamic Time.base#Months]]

### Weeks
![[Dynamic Time.base#Weeks]]

### from this quarter
![[Dynamic Time.base#Items Created]]

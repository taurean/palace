---
aliases: "<% tp.date.now('YYYY-MM') %>"
creationDate: "<% tp.file.creation_date('YYYY-MM-DDTHH:mm') %>"
entityIs: "[[Monthly Notes]]"
month: "[[<% tp.date.now('YYYY-MM') %>]]"
quarter: "[[<% tp.date.now('YYYY') %>-Q<% tp.date.now('Q') %>]]"
year: "[[<% tp.date.now('YYYY') %>]]"
monthStart: "[[<% tp.date.now('YYYY-MM-DD', 0, tp.date.now('YYYY-MM-01')) %>]]"
monthEnd: "[[<% tp.date.now('YYYY-MM-DD', 0, tp.date.now('YYYY-MM-') + moment(tp.date.now('YYYY-MM-01')).daysInMonth()) %>]]"
---
# <% tp.date.now('MMMM YYYY') %>

## Navigation
← [[<% tp.date.now('YYYY-MM', 0, moment(tp.date.now('YYYY-MM-01')).subtract(1, 'month')) %>|Previous Month]] | [[<% tp.date.now('YYYY-MM', 0, moment(tp.date.now('YYYY-MM-01')).add(1, 'month')) %>|Next Month]] →

**Quarterly:** [[<% tp.date.now('YYYY') %>-Q<% tp.date.now('Q') %>|Q<% tp.date.now('Q') %> <% tp.date.now('YYYY') %>]]
**Yearly:** [[<% tp.date.now('YYYY') %>]]

---

## Weeks
<%*
const monthStart = moment(tp.date.now('YYYY-MM-01'));
const monthEnd = moment(monthStart).endOf('month');
let current = moment(monthStart).startOf('isoWeek');

while (current.isSameOrBefore(monthEnd)) {
    const weekNum = current.format('ww');
    const year = current.format('YYYY');
    const weekStart = current.format('MMM D');
    const weekEnd = moment(current).endOf('isoWeek').format('MMM D');
    tR += `- [[${year}-W${weekNum}|Week ${weekNum}]] (${weekStart} – ${weekEnd})\n`;
    current.add(1, 'week');
}
%>

## Summary


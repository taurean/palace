---
aliases: "<% tp.date.now('YYYY') %>-Q<% tp.date.now('Q') %>"
creationDate: "<% tp.file.creation_date('YYYY-MM-DDTHH:mm') %>"
entityIs: "[[Quarterly Notes]]"
quarter: "[[<% tp.date.now('YYYY') %>-Q<% tp.date.now('Q') %>]]"
year: "[[<% tp.date.now('YYYY') %>]]"
quarterStart: "[[<% tp.date.now('YYYY-MM-DD', 0, moment(tp.date.now()).startOf('quarter')) %>]]"
quarterEnd: "[[<% tp.date.now('YYYY-MM-DD', 0, moment(tp.date.now()).endOf('quarter')) %>]]"
---
# Q<% tp.date.now('Q') %> <% tp.date.now('YYYY') %>

## Navigation
<%*
const currentQuarter = parseInt(tp.date.now('Q'));
const currentYear = parseInt(tp.date.now('YYYY'));

// Calculate previous quarter
let prevQ = currentQuarter - 1;
let prevYear = currentYear;
if (prevQ === 0) {
    prevQ = 4;
    prevYear = currentYear - 1;
}

// Calculate next quarter
let nextQ = currentQuarter + 1;
let nextYear = currentYear;
if (nextQ === 5) {
    nextQ = 1;
    nextYear = currentYear + 1;
}

tR += `← [[${prevYear}-Q${prevQ}|Previous Quarter]] | [[${nextYear}-Q${nextQ}|Next Quarter]] →\n`;
%>

**Yearly:** [[<% tp.date.now('YYYY') %>]]

---

## Months
<%*
const quarterStart = moment(tp.date.now()).startOf('quarter');
for (let i = 0; i < 3; i++) {
    const month = moment(quarterStart).add(i, 'months');
    const monthCode = month.format('YYYY-MM');
    const monthName = month.format('MMMM YYYY');
    tR += `- [[${monthCode}|${monthName}]]\n`;
}
%>

## Summary


---
aliases: "<% tp.date.now('gggg') %>-W<% tp.date.now('ww') %>"
creationDate: "<% tp.file.creation_date('YYYY-MM-DDTHH:mm') %>"
entityIs: "[[Weekly Notes]]"
weekNumber: "[[<% tp.date.now('gggg') %>-W<% tp.date.now('ww') %>]]"
startDate: "[[<% tp.date.now('YYYY-MM-DD', 0, moment(tp.date.now()).startOf('week')) %>]]"
endDate: "[[<% tp.date.now('YYYY-MM-DD', 0, moment(tp.date.now()).endOf('week')) %>]]"
month: "[[<% tp.date.now('YYYY-MM') %>]]"
quarter: "[[<% tp.date.now('YYYY') %>-Q<% tp.date.now('Q') %>]]"
year: "[[<% tp.date.now('YYYY') %>]]"
description: ""
---
# Week of <% tp.date.now('MMMM D, YYYY', 0, moment(tp.date.now()).startOf('week')) %>
<%*
const currentWeek = moment(tp.date.now());
// Use locale aware subtract/add for weeks (defaults to Sunday start in standard locales)
const prevWeek = moment(currentWeek).subtract(1, 'week');
const nextWeek = moment(currentWeek).add(1, 'week');

// Use gggg for week-year to match the ww week number
const prevWeekNum = prevWeek.format('ww');
const prevWeekYear = prevWeek.format('gggg');
const nextWeekNum = nextWeek.format('ww');
const nextWeekYear = nextWeek.format('gggg');

tR += `← [[${prevWeekYear}-W${prevWeekNum}|Previous Week]] • [[${tp.date.now('YYYY-MM')}|${tp.date.now('MMMM')}]] • [[${nextWeekYear}-W${nextWeekNum}|Next Week]] →\n`;
%>


---
## Notes from this week
![[Dynamic Time.base#Items Created]]

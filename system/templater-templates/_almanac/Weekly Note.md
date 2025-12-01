---
aliases: "<% tp.date.now('YYYY') %>-W<% tp.date.now('ww') %>"
creationDate: "<% tp.file.creation_date('YYYY-MM-DDTHH:mm') %>"
entityIs: "[[Weekly Notes]]"
weekNumber: "[[<% tp.date.now('YYYY') %>-W<% tp.date.now('ww') %>]]"
weekStart: "[[<% tp.date.now('YYYY-MM-DD', 0, moment(tp.date.now()).startOf('isoWeek')) %>]]"
weekEnd: "[[<% tp.date.now('YYYY-MM-DD', 0, moment(tp.date.now()).endOf('isoWeek')) %>]]"
month: "[[<% tp.date.now('YYYY-MM') %>]]"
quarter: "[[<% tp.date.now('YYYY') %>-Q<% tp.date.now('Q') %>]]"
year: "[[<% tp.date.now('YYYY') %>]]"
---
# Week of <% tp.date.now('MMMM D, YYYY', 0, moment(tp.date.now()).startOf('isoWeek')) %>

## Navigation
<%*
const currentWeek = moment(tp.date.now());
const prevWeek = moment(currentWeek).subtract(1, 'week');
const nextWeek = moment(currentWeek).add(1, 'week');

const prevWeekNum = prevWeek.format('ww');
const prevWeekYear = prevWeek.format('YYYY');
const nextWeekNum = nextWeek.format('ww');
const nextWeekYear = nextWeek.format('YYYY');

tR += `← [[${prevWeekYear}-W${prevWeekNum}|Previous Week]] | [[${nextWeekYear}-W${nextWeekNum}|Next Week]] →\n`;
%>

**Monthly:** [[<% tp.date.now('YYYY-MM') %>|<% tp.date.now('MMMM YYYY') %>]]
**Quarterly:** [[<% tp.date.now('YYYY') %>-Q<% tp.date.now('Q') %>|Q<% tp.date.now('Q') %> <% tp.date.now('YYYY') %>]]
**Yearly:** [[<% tp.date.now('YYYY') %>]]

---

%% Weekly summary below this line %%
> [!summary]
>

## Daily Highlights
<%*
const weekStart = moment(tp.date.now()).startOf('isoWeek');
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

for (let i = 0; i < 7; i++) {
    const day = moment(weekStart).add(i, 'days');
    const dayName = days[i];
    const dayDate = day.format('YYYY-MM-DD');
    const dayShort = day.format('MMM D');

    tR += `### ${dayName} • [[${dayDate}|${dayShort}]]\n-\n#### Did\n-\n`;
}
%>

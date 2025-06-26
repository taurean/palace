---
aliases: "<% moment().subtract(1, 'week').format('YYYY') %>-W<% moment().subtract(1, 'week').format('ww') %>"
creationDate: "<% tp.file.creation_date('YYYY-MM-DDTHH:mm') %>"
entityIs: "[[Weekly Notes]]"
weekNumber: "[[<% moment().subtract(1, 'week').format('YYYY') %>-W<% moment().subtract(1, 'week').format('ww') %>]]"
weekStart: "[[<% moment().subtract(1, 'week').startOf('week').format('YYYY-MM-DD') %>]]"
weekEnd: "[[<% moment().subtract(1, 'week').endOf('week').format('YYYY-MM-DD') %>]]"
---
# Week of <% moment().subtract(1, 'week').startOf('week').format('MMMM D, YYYY') %>
%% Weekly summary below this line %%
> [!summary]
>

## Daily Highlights
### Sunday • [[<% moment().subtract(1, 'week').day(0).format('YYYY-MM-DD') %>|<% moment().subtract(1, 'week').day(0).format('MMM D') %>]]
-
#### Did
-
### Monday • [[<% moment().subtract(1, 'week').day(1).format('YYYY-MM-DD') %>|<% moment().subtract(1, 'week').day(1).format('MMM D') %>]]
-
#### Did
-
### Tuesday • [[<% moment().subtract(1, 'week').day(2).format('YYYY-MM-DD') %>|<% moment().subtract(1, 'week').day(2).format('MMM D') %>]]
-
#### Did
-
### Wednesday • [[<% moment().subtract(1, 'week').day(3).format('YYYY-MM-DD') %>|<% moment().subtract(1, 'week').day(3).format('MMM D') %>]]
-
#### Did
-
### Thursday • [[<% moment().subtract(1, 'week').day(4).format('YYYY-MM-DD') %>|<% moment().subtract(1, 'week').day(4).format('MMM D') %>]]
-
#### Did
-
### Friday • [[<% moment().subtract(1, 'week').day(5).format('YYYY-MM-DD') %>|<% moment().subtract(1, 'week').day(5).format('MMM D') %>]]
-
#### Did
-
### Saturday • [[<% moment().subtract(1, 'week').day(6).format('YYYY-MM-DD') %>|<% moment().subtract(1, 'week').day(6).format('MMM D') %>]]
-
#### Did
-

# Mr.Budget BackEnd


Welcome to the Back End Application for Mr. Budget



Mr. Budget is an application where imaginary people can log their financial transactions. A project for Pursuit 10.1 this APP
includes REACT.JSX and express. This server uses RESTful routes.


For my Database ive created a table of objects: 
id - A unique number for each item
item_name- string - the name of the transaction (ie: income, savings, cat food, etc.)
amount -number - the amount of the transaction
date- string - the date should be a simple string. As a bonus activity, use the date object and date input field and format it to be human-readable
from - string - who this transaction was with (ie. employer, bank, pet store, grocery store, etc)
category - string - what category does this fall into (income, savings, pets, food, etc)

Utlizing RESTful Routes to:
  create new resources.
  read all resources.
  read a single resource.
  update a single resource.
  delete a single resource.

And when appropriate, a "Not Found" response is given when a route is requested that does not match the created routes. 


STRETCH:

In additon you can directly query:
    name=asc (to return transactions names in ascending alphbetical order)
    name=desc (to return transactions names in descending alphbetical order)
    amount=lte? (to return transaction amounts that are (lt/lte)less than or less than or equal to,(gt/gte) greater than or equal to (?) any given amount )

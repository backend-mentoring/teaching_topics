# SQL

## History

SQL stands for Structured Query Language designed initially to manage Relational Database data.
a relational database is a DB in which the data is structured  tables of columns and rows with an unique key to identify each row that are connected by foreign keys.You can represent this way arbitrarily complex data relationships.
It was initially developed at IBM in the early 1970's.
There are several dialects that are expansion on the standards, because of different implementations like Postgres and MySQL. They might differ in data and time, syntax and commands. Postgres aims to be standard compliance. also SQLite most queries will work for other implementations as well. You should be aware of using special features if being able to switch database is important.
There are some libraries that allow you to communicate with your relational database using the constructs of your programming language (interpreters). These are called Object Relational Mapping tools (ORM) some examples are ActiveRecords for Rails and Doctrine NHibernate. Each of them has their internal API (Application Programming Interface)
Schema migrations are a way to include database changes and they use SQL syntax. (Using ALTER TABLE statements)
A Schema is a description of the database structure.

SQL allows you to do CRUD operations on a database using statements and queries.
SQL SELECT Queries declare the desired form of the returned data and let the underlying system make that happen.

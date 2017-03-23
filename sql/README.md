History / Theory:

[SQL](https://en.wikipedia.org/wiki/SQL)

[Relational Database](https://en.wikipedia.org/wiki/Relational_database)

---
CRUD for databases:

Create -> INSERT  
Read -> SELECT  
Update -> UPDATE  
Delete -> DELETE

## Most important datatypes

- TEXT = 	Holds a string with a maximum length of 65,535 characters
- VARCHAR = Holds a variable length string (can contain letters, numbers, and special characters). The maximum size is specified in parenthesis. Can store up to 255 characters. Note: If you put a greater value than 255 it will be converted to a TEXT type
- INT = integer number, the maximum number of digits may be specified in parenthesis
- FLOAT = decimal The maximum number of digits may be specified in parenthesis


{short} Core Language (leading into orm exercise):

contrived examples that apply to the upcoming exercise

INSERT 'hi', sdf, asdjfk into people

---

{short} programming for SQL:

[List of ORMs](https://en.wikipedia.org/wiki/List_of_object-relational_mapping_software)

[Schema Migration](https://en.wikipedia.org/wiki/Schema_migration)

---

Make Your Own ORM for a predetermined schema:

here it is:

  table person
  columns id, name, eye_color

  table friendship
  columns id, person_a_id, person_b_id

Example of functions by the orm:

Person

p = Person.create(name, eye_color)
p = Person.read(id)
p = Person.update(id, { name | height | mood })
p = Person.destory(id)

they will pull a piece of code that includes table creation statements already, as well as the beginning of their ORM interface, as well as a test suite they can run to test completeness.

Include a higher level of abstraction for some part of the ORM.

---

On Dialects:

[SQLite](https://www.sqlite.org/docs.html)

[Postgres](https://www.postgresql.org/docs/9.6/static/index.html)

[MySQL](https://dev.mysql.com/doc/refman/5.7/en/)

[List of Implementations](https://en.wikipedia.org/wiki/List_of_relational_database_management_systems)

---

indexes? joins? acid? injection? normalization?

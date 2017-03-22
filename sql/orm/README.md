# Object Relational Mapping

We are going to put together an ORM for a small SQL database.

Let's use [sqlite](https://sqlite.org/docs.html) for its simplicity and ease of
deployment, and [node-sqlite3](https://github.com/mapbox/node-sqlite3) to
perform the underlying communication with the database.

The schema is predetermined for this exercise. You can see the table creation
statements at the top of model.js.

You will write a `Person` class that corresponds to the `people` table. `Person`
instances will correspond to rows `people`. `Relationships` between people
will be stored in the (**drum roll please**) `relationships` table. And again,
instances will correspond with rows in the table.

Run `npm test` to test the completeness of your model classes.


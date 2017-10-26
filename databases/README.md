# Database Architectures

There are four properties that define databases based on the main interface (transactions). Relational databases abide by all four of these properties, known as **ACID**.

#### Atomicity

All or nothing transactions. Transactions are seen as one operations and will fail to write or succeed. There is no partial success of a transaction.

#### Consistency

A transaction will bring the former valid state to a new valid state based on any constraints or rules. Referential integrity is a key part of this consistency as it requires primary and foreign keys to be valid when doing insert or update operations.

#### Isolation

Transactions are isolated until the database enters another valid state. One transaction is entirely unaware of any incomplete transactions currently executing.

#### Durability

If we lose power, we do not lose any committed transactions. Failover is to write to non-volatile memory in case of crash.



##Relational Databases

We all use them. Relational databases normalize data to keep data consistent. The architecture usually has a master node that takes care of all update/write transactions and replicas for reading that data. Relational databases are a great way to organize your information but it requires a rigid structure which can be costly when data grows to large amounts. Joins require a lot of processing and tables are not always optimized for specific queries. Unless your data is massive or requires very quick delivery, these databases are the best to work with.

## Non-Relational Databases (NoSQL)

There are many NoSQL database options available to us. Each one has pro and con.

| NRDB                     | MongoDB                            | Cassandra                                | Redis                                    | Hadoop                                   |
| ------------------------ | ---------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| **Storage Type**         | Documents                          | Wide Columns                             | Hashes                                   | Distributed File System                  |
| **Ease of Use**          | Very Easy                          | Moderate                                 | Difficult                                | Difficult                                |
| **Architecture**         | Master/Slave                       | Distributed Clusters                     | Master/Slave                             | Distributed Clusters                     |
| **Speed**                | Fast reads, slower writes at scale | Constant write time, still fast at scale | The fastest, reads and writes at the same rate | Very slow unless using huge datasets     |
| **What is it good for?** | Great for beginners trying NoSQL   | Performs very well at scale for reading AND writing data | In memory database can perform complex queries very quickly | Storing huge sets of data for batch analysis |



###Intro to Cassandra

Cassandra is a distributed database. Unlike Relational Databases where the architecture has a centralized Master node, and slave or replica nodes, cassandra focuses on distributing data to nodes. When a transaction is written, the data is written to a node. While the same row may exist on another node, which has not been updated, cassandra uses a compaction process to compile all versions of the row when read. At this stage, the rows are compared by timestamp to return the latest version, and the outdated versions are updated accordingly.

Cassandra database models are heavily geared toward a one query per table approach. This means that each table is optimized for specific queries to increase performance. This is mainly done through partition keys and clustering keys.

##### Partition keys

Either a part of a composite key, which is made up of multiple columns, or a single primary key on a single field key table, usually a by_id table. Partition keys are responsible for distributing data across nodes. This is where the index optimization comes from.

##### Clustering keys

These keys are responsible for sorting data per partition. This results in the ability to sort by other columns while maintaining a primary or composite key that stores the data on certain nodes.



**Example:**

First we have to create a keyspace

```CQL
CREATE KEYSPACE test WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1'}
```

```CQL
USE test;
```

Let's say we are creating an app that attempts to identify all stray cats in new york city, through crowd sourced information. We want to collect which block a cat has been spotted on, as well as some additional information about the cat. Each cat spotting can be seen in our app, block by block, and breed by breed. This gives us an idea about the composite keys we may use. To further help the identification process, we want to sort by color.

```CQL
CREATE TABLE cats (
  block_id uuid,
  breed text,
  color text,
  short_hair boolean,
  PRIMARY KEY ((block_id, breed), color)
);
```

Now let's insert some sample user data:

```CQL
INSERT INTO cats (block_id, breed, color, short_hair)
VALUES (62c36092-82a1-3a00-93d1-46196ee77204, 'siberian', 'grey', false);
```

When we try to query this particular table by only the breed, something happens:

```CQL
SELECT * FROM cats WHERE breed = 'siberian'
```

```red
InvalidRequest: Error from server: code=2200 [Invalid query] message="Cannot execute this query as it might involve data filtering and thus may have unpredictable performance. If you want to execute this query despite the performance unpredictability, use ALLOW FILTERING"
```

This error message shows us why our composite key is important in the WHERE clause of our query. Cassandra has optimized our table to store data per node by breed AND block_id. Since our app service allows us to see cat spottings by blocks, this is a perfect query table, but we must include a block_id in our WHERE clause. Find all the siberian alley cat spottings on my block!

```CQL
SELECT * FROM cats
WHERE breed = 'siberian' AND block_id = 62c36092-82a1-3a00-93d1-46196ee77204;
```

Now we get our result.



##### How to handle data consistency

One thing that cassandra is missing is consistency through key integrity, making sure all states of the database are valid. This requires much more attention to detail on the software side, to ensure that data across tables is consistent.

Say we have a song app and a playlists table. 

```CQL
CREATE TABLE playlists (
  id uuid,
  song_order int,
  song_id uuid,
  title text,
  album text,
  artist text,
  PRIMARY KEY (id, song_order) 
);
```

This table allows us to easily display a playlist ordered by song. Say we would also like to create a table to search for every playlist by title. We need another table of course.

```CQL
CREATE TABLE playlists_by_title (
	id uuid,
  	song_order int,
  	song_id uuid,
  	title text,
  	album text,
  	artist text,
  	PRIMARY KEY (title)
);
```

Now that we have two tables that share many columns, we need to ensure that we update both when making any change to a playlist.

To do this a lot of our updates will need to contain multiple update statements.

```CQL
BEGIN BATCH
	INSERT INTO playlists (id, song_order, song_id, title, artist, album)
  	VALUES (62c36092-82a1-3a00-93d1-46196ee77204, 4, 7db1a490-5878-11e2-bcfd-0800200c9a66, 'Ojo Rojo', 'Fu Manchu', 'No One Rides for Free');
  	INSERT INTO playlists_by_title (id, song_order, song_id, title, artist, album)
  	VALUES (62c36092-82a1-3a00-93d1-46196ee77204, 4, 7db1a490-5878-11e2-bcfd-0800200c9a66, 'Ojo Rojo', 'Fu Manchu', 'No One Rides for Free');
APPLY BATCH
```

Now we have updated both tables ready to be queried by all services.
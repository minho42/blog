---
title: TIL PostgreSQL
date: "2023-04-13"
---

TIL: use double quotes for postgresql table name that is not all lowercase

Made postgresql database table from prisma schema 
```sql
-- schema.prisma
model School {
	...
}

-- equivalent sql
CREATE TABLE "School" (
	...
);
```

Error when tried to query the database
```sql
schools=# select * from School;
ERROR:  relation "school" does not exist
LINE 1: select * from School;
                      ^
```


Fix
```sql
-- before
select * from School;

-- after
select * from "School";
```

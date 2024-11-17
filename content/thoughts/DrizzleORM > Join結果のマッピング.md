---
tags:
  - seed
  - orm
  - drizzle
---
DrizzleはSQLクエリビルダーなので、オブジェクトにマッピングされない。flatにクエリ出力される。（SQLと同じだ）

[Drizzle Queries](https://orm.drizzle.team/docs/rqb)を使用した場合、オブジェクトにマッピングされる。その際はSQL上でjsonを整形した上でキャストされるので高速だが、nestした場合（a -> b -> c）にサブクエリが3階層となり、aliasが繋がらないSQL生成結果となってしまった。つまりうまくクエリ生成ができなかった。

そのため、[Aggregating results](https://orm.drizzle.team/docs/joins#aggregating-results) という形で集計する。

- [【Drizzle ORM】JOINした結果をマッピングして集計する](https://pote-chil.com/posts/drizzleorm-join-aggregate)
- [Drizzle Team Community - Answer Overflow](https://www.answeroverflow.com/c/1043890932593987624)
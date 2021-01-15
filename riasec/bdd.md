BDD riasec

Table 1 : main(9)
--------------
id|tinyINT|PK
code|char = 1
name|varchar = 15
features|text
skills|text
strongPoints|text
weakPoints|text
communication|text
contexts|text

Table 2 : minor (5)
---------------
id|tinyINT|PK
code|char = 2
name|varchar = 35
description|text
jobs|text

Table 3 : professions (3)
---------------------
id|INT|PK
minor_code |tinyINT|FK
name |varchar = 255

Table 4 : questions ()
-------------------
id|INT|PK
type|char|10
class|char|1
number|INT
question|text
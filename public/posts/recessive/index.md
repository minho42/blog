---
title: Autosomal recessive disorder
date: "2023-08-08"
---

[Genetic disorders](https://en.wikipedia.org/wiki/Inbreeding#Genetic_disorders)

> Since relatives share a higher proportion of their genes than do unrelated people, it is more likely that related parents will both be carriers of the same recessive allele, and therefore their children are at a higher risk of inheriting an autosomal recessive genetic disorder.

Autosomal dominant disorder vs autosomal recessive disorder in Python code

```python
parent1 = [gene1, gene2, ..., gene25000]
parent2 = [gene1, gene2, ..., gene25000]

child = zip(parent1, parent2)
# [(gene1, gene1), (gene2, gene2), ...]

# dominant: parent1 or parent2
dominant =
any([x for x in child
if x[0] == "mutation" or x[1] == "mutation"])

# recessive: parent1 and parent2
recessive =
any([x for x in child
if x[0] == "mutation" and x[1] == "mutation"])
```

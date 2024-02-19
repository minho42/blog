---
title: Django objects with JavaScript
date: "2022-06-05"
---

Assign javascript variable from django objects like so.

```html
{% block javascript %}
<script>
  const todos = [
  {% for todo in object_list %}
  {
    id: "{{ todo.id }}",
    name: "{{ todo.name }}",
  },
  {% endfor %}
  ];
  
  todos.forEach((todo) => {
      // ...
  })
</script>
{% endblock javascript %}
```
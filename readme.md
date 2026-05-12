# Content Schema

## Data Model

All __*.Data.js__ files contain __data__ and adhere to the following structure.

### category

```json
{
  "type": "category",
  "name": "string",
  "sortOnSubcategoryNames": "boolean (optional, default: true)",
  "sortOnGroupNames": "boolean (optional, default: true)",
  "showAreaOnSubcategoryNames": "boolean (optional, default: false)",
  "items": "(subcategory[] | group[] | data[])"
}
```

### subcategory

```json
{
  "type": "subcategory",
  "name": "string",
  "items": "group[]"
}
```

### group

```json
{
  "type": "group",
  "name": "string",
  "items": "data[]"
}
```

### data

```json
{
  "type": "data",
  "id": "string (optional)",
  "name": "string",
  "displayName": "string (optional)",
  "area": "string (optional)",
  "mode": "string (optional)",
  "info": "string (optional)",
  "address": "string (optional)",
  "coordinates": "string (optional)",
  "phone": "string or string[] (optional)",
  "phone_emergency": "string (optional)",
  "email": "string or string[] (optional)",
  "url": "string (optional)",
  "hours": "string or string[] (optional)",
  "items": "data[] (optional)"
}
```

## Links Model

The __links.js__ file contains __relational data__ linking to *Data.js entries, with each string representing the ID of a corresponding data item

``` json
[
  [
    "string",
    "string"
  ]
]
```

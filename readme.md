# Data Model / Content Schema

```json
{
  "type": "section",
  "name": "string",
  "sortOnSubsectionNames": "boolean (optional, default: true)",
  "sortOnColumnNames": "boolean (optional, default: true)",
  "showAreaOnSubsectionNames": "booleab (optional, default: false)",
  "items": "(subsection | column | data)[]"
}
```

```json
{
  "type": "subsection",
  "name": "string",
  "items": "column[]"
}
```

```json
{
  "type": "column",
  "name": "string",
  "items": "data[]"
}
```

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
  "items": "extra-data[]"
}
```

```json
{
  "type": "extra-data",
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
  "items": "extra-data[]"
}
```

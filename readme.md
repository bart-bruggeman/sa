# South Africa

## Data Model / Content Schema
```
{
  "type": "section",
  "name": "string",
  "sortOnSubsectionNames": "boolean (optional, default: true)",
  "sortOnColumnNames": "boolean (optional, default: true)",
  "items": "(subsection | column | data)[]"
}

{
  "type": "subsection",
  "name": "string",
  "items": "Column[]"
}

{
  "type": "column",
  "name": "string",
  "items": "DataItem[]"
}

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
  "phone": "string (optional)",
  "email": "string (optional)",
  "url": "string (optional)",
  "hours": "string[] (optional)"
}
```
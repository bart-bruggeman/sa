```
JSON Structuur:

    level_1_items                           ← array van topniveau items (sectionsData)
    ├─ level_1_item                         ← één topniveau item (bijv. healthcareData)
    │   ├─ label                            ← titel van section
    │   └─ items                            ← array van level_2_items
    │       ├─ level_2_item
    │       │   ├─ name                     ← naam van item (+link)
    │       │   └─ ...
    │       ├─ level_2_item
    │       └─ ...
    ├─ level_1_item
    └─ ...

    of

    level_1_items                           ← array van topniveau items (sectionsData)
    ├─ level_1_item                         ← één topniveau item (bijv. healthcareData)
    │   ├─ label                            ← titel van section
    │   └─ items                            ← array van level_2_items
    │       ├─ level_2_item
    │       │   ├─ label                    ← titel van level 2 subsections
    │       │   └─ items                    ← array van level_3_items
    │       │       ├─ level_3_item
    │       │       │   ├─ name             ← naam van item (+link)
    │       │       │   └─ andere velden
    │       │       ├─ level_3_item
    │       │       └─ ...
    │       ├─ level_2_item
    │       └─ ...
    ├─ level_1_item
    └─ ...
```
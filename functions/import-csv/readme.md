# import-csv

This function can import the contents of a CSV file (.csv) into a specific model.

Text and number property types can be imported correctly.
See below for limitation with other tested types. If the type is not mentioned below it has not been tested and use is at your own risk.


## input:

Label: type

Url: Text (Link to file)
Import Mode: Model (to import in)
CSV Mapping: Map (naming from CSV to database name in snake_case)
Deduplicate records (update records if matched): Boolean
Unique record identifier (CSV column name): Text
Turn on logging for this action: Boolean

## Output:

Result: None

## Known limitations:

- Importing related data is NOT possible at the moment.
- Date/Time/Datetime types: The import file needs to support the mySQL format to be processed correctly.
- Checkbox properties: not supported at the moment.
- Price properties : separator need to be a dot and not a comma!
- 


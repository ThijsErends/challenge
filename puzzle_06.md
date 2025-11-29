# Puzzle 6: The JSON Jungle

## Puzzle Description

This puzzle involves a block of JSON data. The user needs to navigate the JSON structure to find a specific value hidden within it.

## Prompt for Google AI Studio

"Create a JSON object with a complex, nested structure. The JSON should represent a 'digital creature' with properties like 'name', 'type', 'abilities', and 'habitat'. Deep within the nested structure, at least 4 levels down, hide a property called `secret_code` with a 4-digit number as its value. The puzzle is to find this secret code.

Example structure:
```json
{
  "creature": {
    "name": "Glimmerwing",
    "type": "Digital Sprite",
    "habitat": {
      "name": "The Crystal Caves",
      "location": {
        "x": 123,
        "y": 456,
        "deeper": {
          "secret_code": "9876"
        }
      }
    }
  }
}
```
"

## Expected Answer/Solution

The 4-digit number from the `secret_code` property.

## Hint

"Navigate the branches of the data tree."

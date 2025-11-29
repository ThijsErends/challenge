# Puzzle 8: The Piet's Pattern Matcher

## Puzzle Description

The user is presented with a collection of Sinterklaas-themed "data" snippets, each on its own cutout paper card. These snippets could include lists of children's names, descriptions of gifts, excerpts from Sinterklaas's travel logs, or specific pepernoot batch numbers. The objective is to apply the concept of regular expressions (regex) to a hidden pattern among these snippets. The user must either construct the correct regex that uniquely identifies a specific subset of these data cards, or use a given regex pattern to filter the cards. The unique set of cards that match the pattern, when combined in a specific way (e.g., their numerical values summed, or their text concatenated), will reveal the answer.

## Inspiration & Theme

*   **Sinterklaas Theme:** Applying regex to Sinterklaas's administrative data makes the technical concept playful and relevant to the Pakjesavond context.
*   **Neil.fun Inspiration:** This falls under "Text Manipulation Puzzles" but with a strong interactive and analytical component. A visual interface where a user can "test" regex patterns against the cards, seeing which ones light up or change, would directly mirror Neil's interactive data exploration.

## Design Notes

"Create a 'Sinterklaas Regex Puzzle'.
1.  Generate a list of 10-15 Sinterklaas-themed strings. These could be:
    *   Child names (some with specific letter patterns, e.g., starting with 'J', ending with 'S').
    *   Gift descriptions (some containing specific keywords, e.g., 'boek', 'fiets', 'chocolade').
    *   Mock delivery codes or routes (e.g., 'NL-01-ROOF-A', 'SP-03-BOAT-B').
    *   Pepernoten batch IDs.
2.  Design a specific, moderately complex regular expression pattern. This pattern should uniquely match 3-5 of your generated strings.
3.  The puzzle's goal is for the user to either:
    *   Discover the pattern by observation and construct the regex.
    *   Be given a very cryptic hint about the regex itself (e.g., 'Amerigo only delivers to houses with a 't' in the second position').
4.  The answer will be a specific piece of information extracted *from* the matched strings (e.g., the concatenation of the matched strings, or a numerical value derived from them).
5.  Provide the list of strings, the regex pattern, and the exact expected answer derived from applying the regex to the strings."

## Expected Answer/Solution

The specific piece of information (string or number) extracted from the strings matched by the regex.

## Hint

"Sinterklaas's manifest often hides secrets in plain sight, if you know how to filter."
```
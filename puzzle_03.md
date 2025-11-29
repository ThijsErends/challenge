# Puzzle 3: The API Key

## Puzzle Description

This puzzle is a fake API documentation puzzle. The user is given a block of text that looks like technical documentation for an API. The goal is to find the "API key" hidden within the text.

## Prompt for Google AI Studio

"Write a short, fake API documentation for a service called 'ChronoWeaver'. The documentation should describe a single endpoint, `/api/v1/getTimeFragment`. The documentation should be dense and technical-sounding, with sections for 'Endpoint', 'Method', 'Parameters', and 'Response'.  Somewhere in the 'Response' section, include a sentence like: 'The `data` object will contain the time fragment, and for legacy support, the old `apiKey` is still included.'  Then, on the next line, add: `apiKey: 't1m3-fr4gm3nt'`. The puzzle is to find this API key."

## Expected Answer/Solution

`t1m3-fr4gm3nt`

## Hint

"The key is in the response, but it's a legacy feature."

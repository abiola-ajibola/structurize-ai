# Structurize AI

An AI embedded tool that can accept unstructured data such as a file or raw text (in real applications, this can be an email or article) together with a csv file containing headings for the data to be extracted. The application then outputs a new csv file, filled with all the data from the unstructured input in a structured format.

# Flow

1. Accept a file containing unstructured data from a file input or enter in a textarea.
2. Accept another file which represents the schema (CSV with headings) or enter the comma separated headings in a textarea.
3. Submit with a button.
4. Use prompt engineering to extract the structured data in CSV format, based on the input schema.
5. Return a CSV file with the required data.

# Tools

1. AI SDK (Gemini)
2. Application stack (Next.js)
3. Hosting (Vercel)

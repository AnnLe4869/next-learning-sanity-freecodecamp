## Sanity studio - schema define how thing related

1. The 'name' field in any Sanity schema is used to identify the schema
   We use that 'name' field later in the reference type
2. For type 'array', its children can be any other type
   EXCEPTION is that we use 'block' type, then the type 'array' is the MUST parent type
3. 'object' and 'document' type are quite similar.
   'document' is more of a "entree" point and thus has more properties (only showed when we fetch the JSON data)
4. For type 'object' and 'document', if we want to preview the data
   (for example, we nested object in an array and this object reference other type. We want this nested object to display some "brief" data ) then we use the 'preview' property.
   For more info go to https://www.sanity.io/docs/previews-list-views

## Connect Sanity to front-end

1. Install `next-sanity`
2. Follow the set-up on its GitHub page [next-sanity](https://github.com/sanity-io/next-sanity)
3. Setting up CORS - CORS control which domain can do request to our sanity content lake
   One way is running `sanity cors add https://domain_you_want_to_cors`
   Another is go to manage.sanity.io, go to Settings, then API settings, then CORS origins

## Fetching data

1. GROQ query language.
   Just like SQL, this is how we pull data from our Sanity studio
   For cheat sheet, go to https://www.sanity.io/docs/query-cheat-sheet
   For testing out with out current studio, select Vision mode on localhost:3333 and choose correct API version  
   For playground, visit groq.dev
2. The function `urlFor` we created in `sanity.ts` help generate the whole URL from the \_ref without having to actual fetching the full data.
   We then convert it to string using `.url()`
3. The Component PortableText is used to parse the text from a text block into our React page without too much work
   For example, without it we need some if else and styling

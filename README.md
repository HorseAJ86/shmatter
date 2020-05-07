# Shmatter

Parse bash comments as if they were frontmatter.

_It's not really YAML, but it's intended to look like it!_

## Example

Consider this bash file:

`````bash
#!/bin/bash

# title: Foo Bar
# tagline: Messes stuff up
# homepage: https://example.com/foobar
# description: |
#   Foo Bar is a community-festered, government-driven destruction (GDD) system.
# examples: |
#
#   Really mess something up
#
#   ```bash
#   foobar my-file.txt
#   ````
#
#   Mess up an entire volume, forcefully and recursively
#
#   ```bash
#   foobar -rf /
#   ```

rm -i "${0}" "${1}"
`````

Now consider parsing it with `shmatter`:

```js
var shmatter = require("shmatter");
var bash = fs.readFileSync("./myscript.sh", "utf8");
var meta = shmatter(bash);

console.log(meta);
```

This is what you'd get:

```js
{
  title: 'Foo Bar',
  tagline: 'Messes stuff up',
  description: '<p>Foo Bar is a community-festered, government-driven destruction (GDD) system.</p>\n',
  examples: '<p>Really mess something up</p>\n' +
    '<pre><code class="language-bash">foobar my-file.txt</code></pre>\n' +
    '<p>Mess up an entire volume, forcefully and recursively</p>\n' +
    '<pre><code class="language-bash">foobar -rf /</code></pre>\n',
  homepage: 'https://example.com/foobar'
}
```

## Why?

Pfff... go ask yourself!

I know it was a dumb idea. I've moved on. I'm healing... but why are _you_ here?

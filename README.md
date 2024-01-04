# u8pass

Generate random UTF-8 passwords

## Security

- u8pass uses the [Crypto.getRandomValues()](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues) method to avoid using the pseudo-random [Math.random()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random) method, this is the only cryptographical process.

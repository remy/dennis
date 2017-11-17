const { promisify } = require('util');
const resolveMx = promisify(require('dns').resolveMx);

const none = 'passwordless';

const delegates = Object.entries({
  google: 'google',
  googlemail: 'google',
  yahoodns: 'yahoo',
  yandex: 'yandex',
  outlook: 'windowslive', // @live.com, @outlook.com, or @msn.com
  aol: 'aol',
});

function requires(name) {
  throw new Error(`requires ${name}`);
}

async function main(email = requires('email')) {
  const mx = await resolveMx(email.split('@').pop());
  const [{ exchange }] = mx;

  for (let [match, delegate] of delegates) {
    if (exchange.includes(match)) {
      return delegate;
    }
  }

  return none;
}

module.exports = main;

if (!module.parent) {
  main(process.argv[2])
    .then(delegation => console.log(delegation))
    .catch(e => {
      console.log(e.message);
      process.exit(1);
    });
}

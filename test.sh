echo 'PORT=3000\nENV=test' > .env;
deno test --allow-all --lock=lock.json --unstable ./src/tests/*
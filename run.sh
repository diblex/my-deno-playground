# 
# This runs the server with Deno.
#
# OPTIONS
# -d        Run it in development mode. It runs a watcher and doesnt check 
#           typings for faster reloading.
# -u        Update locked dependencies before running the server.
# -l        Run linter before running the server.
# -r        Reload all cached dependencies before running server.
#

entryPoint="./src/server.ts"
dependenciesFolder="./src/deps.ts"
dev=false
update=false
lint=false
reload=false

while getopts dulr flag
do
  case "${flag}" in
      d) dev=true;;
      u) update=true;;
      l) lint=true;;
      r) reload=true;;
  esac
done

if "$reload"; then
    echo "\nReloading cached dependencies..."
    deno cache --import-map import-map.json --reload --unstable $entryPoint
fi
if "$update"; then
    echo "\nUpdating locked dependencies..."
    deno cache --lock=lock.json --lock-write $dependenciesFolder
fi
if "$lint"; then
    echo "\nRunning linter..."
    deno lint --unstable
fi
if "$dev"; then
    echo '\nRunning server in development mode'
    deno run --allow-net --allow-read --allow-write --watch --unstable --no-check --lock=lock.json --import-map=import-map.json $entryPoint
else
    echo '\nRunning server in production mode'
    deno run --allow-net --allow-read --allow-write --lock=lock.json --cached-only --import-map=import-map.json --unstable $entryPoint
fi

# migrating-the-monolith
A demonstration for how a monolith might be split into microservices.

Each numbered section represents a logical step in the migration process.

## Pre-requisites
1. The latest [wgc](https://www.npmjs.com/package/wgc)
2. The [latest router binary](https://github.com/wundergraph/cosmo/releases?q=router&expanded=true) placed into the 
`./router` directory. You can automatically download the latest binary by running `download-binary.sh`.

## Explore!
1. Pick a stage you'd like to run, _e.g._, `./4-mutation-overrides`.
2. Run the script for the matching name, _e.g._, `4-mutation-overrides`, from the root `package.json`.
3. Open `http://localhost:3002` in your browser.
4. Paste one of the operations from the `./0-operations` directory into the GraphQL playground.
5. Check out the traces and query plan and see how the router resolves the request.
6. ???
7. Profit!!!
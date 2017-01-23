# React Page Object Example - Redux Real World
This is a repository which exemplifies how to write tests for a Redux application using
[`react-page-object`](https://github.com/IntrepidPursuits/react-page-object).
The source code for this application was copied over from the [Redux Real
World example](https://github.com/reactjs/redux/tree/master/examples/real-world) on
01/21/17.  For integration tests in Jasmine, Jest, Mocha, please take a look at
the [test](https://github.com/davidrf/react-page-object-example-redux-real-world/tree/master/test) folder.

## Set Up Locally
If you do not have [Yarn](https://yarnpkg.com/) installed, start by [installing
Yarn](https://yarnpkg.com/en/docs/install).

```
$ git clone https://github.com/davidrf/react-page-object-example-redux-real-world.git
$ cd react-page-object-example-redux-real-world
$ yarn install
```

At this point you can run the following commands:
* `yarn start` - Start up the React application.
* `yarn test` - Run the Jest tests.
* `yarn run jasmine-tests` - Run the Jasmine tests.
* `yarn run mocha-tests` - Run the Mocha tests.

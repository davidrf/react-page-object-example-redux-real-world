// polyfill PhantomJS environment
import 'babel-polyfill'
import 'whatwg-fetch'

// require all the test files in the test/jasmineTests folder that end with Spec.js or Spec.jsx
const testsContext = require.context("./jasmineTests", true, /Spec.jsx?$/);
testsContext.keys().forEach(testsContext);

// output at when the test were run
console.info(`TESTS RAN AT ${new Date().toLocaleTimeString()}`);

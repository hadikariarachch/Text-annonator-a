/**
 * This JavaScript file is for the purpose of registering the created Adaptor classes for further use.
 * You must create a constant variable below and require the JS file where your adaptor class is created.
 * Next, you export an instance of the required Adaptor class.
 */
const adaptor1 = require('./adaptor1.js'); //require the adaptor1.js file and assign to a constant
const adaptor2 = require('./adaptor2.js'); //require the adaptor2.js file and assign to a constant

module.exports.Adaptor1 = new adaptor1.Adaptor1(); //export Adaptor1.class instance
module.exports.Adaptor2 = new adaptor2.Adaptor2(); //export Adaptor2.class instance
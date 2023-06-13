// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

/**********************/
/* Our Config > START */
/**********************/

hbs.registerPartials(__dirname + "/views/partials");

// registers handlebars custom block helpers
// https://handlebarsjs.com/guide/block-helpers.html
// option.fn behaves like a normal compiled Handlebars template
// hbs.registerHelper("noop", function(options) {
//     console.log("--");
//     console.log("this");
//     console.log(this);
//     console.log("--");
//     console.log("options.fn(this)");
//     console.log(options.fn(this));
//     console.log("--");
//     console.log("options.fn");
//     console.log(options.fn); // [Function: prog] { program: 1, depth: 0, blockParams: 0 }  
//     // return options.fn(this)
//     return options.fn({foo: "baz"})
// });
// hbs.registerHelper("each2", function(context, options) {
//     var ret = "";
//     for (var i = 0, j = context.length; i < j; i++) {
//       ret = ret + options.fn(context[i]);
//     }
//     return ret;
// });
hbs.registerHelper('ifAreEqual', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this); 
    // Handlebars provides the block for the else fragment as options.inverse. You do not need to check for the existence of the else fragment: Handlebars will detect it automatically and register a "noop" function.
});
// registers handlebars custom sub-expressions helpers
// https://handlebarsjs.com/guide/builtin-helpers.html#sub-expressions
hbs.registerHelper('eqStrict', (a, b) => a === b)
hbs.registerHelper('eqLoose', (a, b) => a == b)

/********************/
/* Our Config > END */
/********************/

// Initialiazes Express server app
const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const capitalize = require("./utils/capitalize");
const projectName = "project2-fullstack-webapp-feedsreader";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

app.use(require("./middleware/session"))

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

app.use("/auth", require("./routes/auth.routes"));
app.use("/feeds", require("./routes/feeds.routes"));
app.use("/reading-list", require("./routes/reading-list.routes"));

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;

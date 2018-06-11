"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// These are important and needed before anything else
require("zone.js/dist/zone-node");
require("reflect-metadata");
const functions = require("firebase-functions");
const core_1 = require("@angular/core");
const express = require("express");
const path_1 = require("path");
// Faster server renders w/ Prod mode (dev mode never needed)
core_1.enableProdMode();
// Express server
const app = express();
const PORT = process.env.PORT || 4000;
const DIST_FOLDER = path_1.join(process.cwd(), 'dist');
// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main');
// Express Engine
const express_engine_1 = require("@nguniversal/express-engine");
// Import module map for lazy loading
const module_map_ngfactory_loader_1 = require("@nguniversal/module-map-ngfactory-loader");
app.engine('html', express_engine_1.ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [
        module_map_ngfactory_loader_1.provideModuleMap(LAZY_MODULE_MAP)
    ]
}));
app.set('view engine', 'html');
app.set('views', path_1.join(DIST_FOLDER, 'browser'));
// TODO: implement data requests securely
app.get('/api/*', (req, res) => {
    res.status(404).send('data requests are not supported');
});
// Server static files from /browser
app.get('*.*', express.static(path_1.join(DIST_FOLDER, 'browser')));
// All regular routes use the Universal engine
app.get('*', (req, res) => {
    res.set('Cache-Control', 'public, max-age=600, s-maxage=1200');
    res.render('index', { req });
});
exports.ssrapp = functions.https.onRequest(app);
// Start up the Node server
// app.listen(PORT, () => {
//   console.log(`Node server listening on http://localhost:${PORT}`);
// });

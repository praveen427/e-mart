import { CommonEngine } from '@angular/ssr/node';
import { render } from '@netlify/angular-runtime/common-engine.mjs';

// Adjust to import/require your server bundle; change path as needed
const serverBundle = require('./dist/e-mart/server/main.js');

const engine = new CommonEngine({
  bootstrap: serverBundle.bootstrap || serverBundle.app || serverBundle.renderModule
});

export default render(engine);
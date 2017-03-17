require('../../src/styles/main.scss');

// Load library
H5P = H5P || {};
H5P.sdk = H5P.sdk || {};
H5P.sdk.initPanel = require('../scripts/components/panel').default;
H5P.sdk.initTabPanel = require('../scripts/components/tab-panel').default;
H5P.sdk.initNavbar = require('../scripts/components/navbar').default;
H5P.sdk.initImageScroller = require('../scripts/components/image-scroller').default;

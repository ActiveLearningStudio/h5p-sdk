require('../../src/styles/main.scss');

// Load library
H5P = H5P || {};
H5P.sdk = H5P.sdk || {};
H5P.sdk.initPanel = require('../scripts/components/panel').default;
H5P.sdk.initTabPanel = require('../scripts/components/tab-panel').default;
H5P.sdk.initMenu = require('../scripts/components/menu').default;
H5P.sdk.initImageScroller = require('../scripts/components/image-scroller').default;
H5P.sdk.initUploadForm = require('../scripts/components/upload-form').default;

require('../../src/styles/main.scss');

// Load library
H5P = H5P || {};
H5P.sdk = H5P.sdk || {};
H5P.sdk.initPanel = require('../scripts/components/panel').default;
H5P.sdk.initTabPanel = require('../scripts/components/tab-panel').default;
H5P.sdk.initNavbar = require('../scripts/components/navbar').default;
H5P.sdk.initImageScroller = require('../scripts/components/image-scroller').default;
H5P.sdk.initImageLightbox = require('../scripts/components/image-lightbox').default;
H5P.sdk.initUploadForm = require('../scripts/components/upload-form').default;
H5P.sdk.initModal = require('../scripts/components/modal').default;
H5P.sdk.nodeListToArray = require('../scripts/utils/elements').nodeListToArray;
H5P.sdk.querySelectorAll = require('../scripts/utils/elements').querySelectorAll;

import {setAttribute} from '../utils/elements';
import {forEach} from '../utils/functional';

/**
 * @type {function}
 */
const hideAll = forEach(setAttribute('aria-hidden', 'true'));

/**
 * @type {function}
 */
const show = setAttribute('aria-hidden', 'false');

/**
 * @type {function}
 */
const unSelectAll = forEach(setAttribute('aria-selected', 'false'));

/**
 * Initiates a tab panel
 *
 * @param {HTMLElement} element
 */
export default function init(element) {
  const tabs = element.querySelectorAll('[role="tab"]');
  const tabPanels = element.querySelectorAll('[role="tabpanel"]');

  tabs.forEach(tab => {
    tab.addEventListener('click', function (event) {

      unSelectAll(tabs);
      event.target.setAttribute('aria-selected', 'true');

      hideAll(tabPanels);

      let tabPanelId = event.target.getAttribute('aria-controls');
      show(element.querySelector(`#${tabPanelId}`));
    });
  })
}

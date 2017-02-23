import {getAttribute, setAttribute, removeAttribute, attributeEquals, querySelector, querySelectorAll} from '../utils/elements';
import {forEach} from '../utils/functional';

/**
 * @type {function}
 */
const getWhereRoleIsTab = querySelectorAll('[role="tab"]');

/**
 * @type {function}
 */
const getWhereRoleIsTabpanel = querySelectorAll('[role="tabpanel"]');

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
const setAriaSelectedFalse = setAttribute('aria-selected', 'false');

/**
 * @type {function}
 */
const setAllAriaSelectedFalse = forEach(setAriaSelectedFalse);

export default function init(element) {
  const tabs = getWhereRoleIsTab(element);
  const tabPanels = getWhereRoleIsTabpanel(element);

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function (event) {

      setAllAriaSelectedFalse(tabs);
      event.target.setAttribute('aria-selected', 'true');

      hideAll(tabPanels);
      let tabPanelId = event.target.getAttribute('aria-controls');
      let targetTabPanel = element.querySelector(`#${tabPanelId}`);
      show(element.querySelector(`#${tabPanelId}`));
    });
  })
}

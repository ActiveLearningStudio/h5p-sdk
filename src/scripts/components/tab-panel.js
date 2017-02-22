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
const setAllAriaHiddenTrue = forEach(setAttribute('aria-hidden', 'true'));

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
  const tabpanels = getWhereRoleIsTabpanel(element);

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function (event) {

      setAllAriaSelectedFalse(tabs);
      event.target.setAttribute('aria-selected', 'true');

      setAllAriaHiddenTrue(tabpanels);
      let tabpanelId = event.target.getAttribute('aria-controls');
      let targetTabpanel = document.getElementById(tabpanelId);
      targetTabpanel.setAttribute('aria-hidden', 'false');
    });
  })

}

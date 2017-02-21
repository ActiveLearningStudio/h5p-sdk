import {getAttribute, setAttribute, removeAttribute, attributeEquals, querySelector, querySelectorAll} from '../utils/elements';
import {forEach} from '../utils/functional';

/**
 * @type {function}
 */
const isSelected = attributeEquals('aria-selected', 'true');

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
const setAriaHiddenFalse = setAttribute('aria-hidden', 'false');

/**
 * @type {function}
 */
const setAllAriaHiddenTrue = forEach(setAttribute('aria-hidden', 'true'));

/**
 * @type {function}
 */
const setAriaSelectedTrue = setAttribute('aria-selected', 'true');

/**
 * @type {function}
 */
const setAriaSelectedFalse = setAttribute('aria-selected', 'false');

/**
 * @type {function}
 */
const setAllAriaSelectedFalse = forEach(setAriaSelectedFalse);

/**
 * @type {function}
 */
const getAriaControls = getAttribute('aria-controls');

export default function init(element) {
  const tabs = getWhereRoleIsTab(element);
  const tabpanels = getWhereRoleIsTabpanel(element);

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function (event) {

      setAllAriaSelectedFalse(tabs);
      setAriaSelectedTrue(event.target);

      setAllAriaHiddenTrue(tabpanels);
      let tabpanelId = getAriaControls(event.target);
      let targetTabpanel = document.getElementById(tabpanelId);
      setAriaHiddenFalse(targetTabpanel);
    });
  })

}

import {setAttribute, removeAttribute, attributeEquals, nodeListToArray} from '../utils/elements';
import {curry, forEach} from '../utils/functional';
import Keyboard from '../utils/keyboard';

/**
 * @function
 */
const hideAll = forEach(setAttribute('aria-hidden', 'true'));

/**
 * @function
 */
const show = setAttribute('aria-hidden', 'false');

/**
 * @function
 */
const isSelected = attributeEquals('aria-selected', 'true');

/**
 * @function
 */
const unSelectAll = forEach(removeAttribute('aria-selected'));

/**
 * Change tab panel when tab's aria-selected is changed
 *
 * @param {HTMLElement} element
 * @param {HTMLElement} tab
 */
const addAriaSelectedObserver = (element, tab) => {
  // set observer on title for aria-expanded
  let observer = new MutationObserver(() => {
    let panelId = tab.getAttribute('aria-controls');
    let panel = element.querySelector(`#${panelId}`);
    let allPanels = element.querySelectorAll('[role="tabpanel"]');

    if(isSelected(tab)) {
      hideAll(allPanels);
      show(panel);
    }
  });

  observer.observe(tab, {
    attributes: true,
    attributeOldValue: true,
    attributeFilter: ["aria-selected"]
  });
};

/**
 * Selects an element, and unselects all other tabs
 *
 * @param {HTMLElement[]} allTabs
 * @param {HTMLElement} element
 * @function
 */
const selectTab = curry((allTabs, element) => {
  unSelectAll(allTabs);
  element.setAttribute('aria-selected', 'true');
});

/**
 * Initiates a tab panel
 *
 * @param {HTMLElement} element
 */
export default function init(element) {
  const tabs = nodeListToArray(element.querySelectorAll('[role="tab"]'));
  const keyboard = new Keyboard();

  // handle enter + space click
  keyboard.onSelect = selectTab(tabs);

  // init tabs
  tabs.forEach(tab => {
    addAriaSelectedObserver(element, tab);

    tab.addEventListener('click', event => {
      let element = event.target;
      let elementIndex = tabs.indexOf(element);
      selectTab(tabs, element);
      keyboard.forceSelectedIndex(elementIndex);
    });

    keyboard.addElement(tab);
  })
}

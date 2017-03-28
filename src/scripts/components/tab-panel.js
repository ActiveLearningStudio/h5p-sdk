import {setAttribute, removeAttribute, attributeEquals, querySelectorAll } from '../utils/elements';
import {curry, forEach} from '../utils/functional';
import Keyboard from '../utils/keyboard';

/**
 * @function
 */
const hideAll = forEach((element) => element.classList.remove('active'));

/**
 * @function
 */
const show = (element) => element.classList.add('active');

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
    let allPanels = querySelectorAll('[role="tabpanel"]', element);

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
  const tabs = querySelectorAll('[role="tab"]', element);
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

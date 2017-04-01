import { setAttribute, removeAttribute, querySelectorAll, toggleClass } from '../utils/elements';
import { forEach } from '../utils/functional';
import { initCollapsible } from '../utils/collapsible';
import Keyboard from '../utils/keyboard';

/**
 * Unselects all elements in an array
 *
 * @param {HTMLElement[]} elements
 * @function
 */
 const unselectAll = forEach(item => {
   item.classList.remove('selected');
  //  item.removeAttribute('aria-describedby');
 });

/**
 * Sets the aria-expanded attribute on an element to false
 *
 * @param {HTMLElement} element
 */
const unExpand = setAttribute('aria-expanded', 'false');

/**
 * Selects an element, and un selects all other menu items
 *
 * @param {HTMLElement[]} menuItems
 * @param {HTMLElement} element
 * @function
 */
const onSelectMenuItem = (menuItems, element) => {
  unselectAll(menuItems);
  element.classList.add('selected');
  // element.setAttribute('aria-describedby', 'a11y-desc-current');
};

/**
 * Initiates a tab panel
 *
 * @param {HTMLElement} element
 */
export default function init(element) {
  // elements
  const menuItems = querySelectorAll('[role="menuitem"]', element);
  const toggler = element.querySelector('[aria-controls][aria-expanded]');
  const keyboard = new Keyboard();

  keyboard.onSelect = element => {
    onSelectMenuItem(menuItems, element);
    unExpand(toggler);
  };

  // move select
  menuItems.forEach(menuItem => {
    // add mouse click listener
    menuItem.addEventListener('click', event => {
      let element = event.target;
      let elementIndex = menuItems.indexOf(element);

      onSelectMenuItem(menuItems, element);
      unExpand(toggler);
      keyboard.forceSelectedIndex(elementIndex);
    });

    // add keyboard support
    keyboard.addElement(menuItem);
  });

  // init collapse and open
  initCollapsible(element, (expanded, el) => toggleClass('collapsed', !expanded, el));
}

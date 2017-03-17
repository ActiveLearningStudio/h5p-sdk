import { setAttribute, removeAttribute, hasAttribute } from './elements';
import { forEach, without } from './functional';

/**
 * @param {HTMLElement} element
 * @function
 */
const addTabIndex = setAttribute('tabindex', '0');

/**
 * @param {HTMLElement} element
 * @function
 */
const removeTabIndex = removeAttribute('tabindex');

/**
 * @param {HTMLElement[]} elements
 * @function
 */

const removeTabIndexForAll = forEach(removeTabIndex);

/**
 * @param {HTMLElement} element
 * @function
 */
const hasTabIndex = hasAttribute('tabindex');

/**
 * Sets tabindex and focus on an element, remove it from all others
 *
 * @param {HTMLElement[]} elements
 * @param {number} index
 */
const updateTabbable = (elements, index) => {
  const selectedElement = elements[index];

  if(selectedElement) {
    removeTabIndexForAll(elements);
    addTabIndex(selectedElement);
  }
};

/**
 * Sets tabindex on an element, remove it from all others
 *
 * @param {number} currentIndex
 * @param {number} lastIndex
 *
 * @return {number}
 */
const nextIndex = (currentIndex, lastIndex) => (currentIndex === lastIndex) ? 0 : (currentIndex + 1);

/**
 * Sets tabindex on an element, remove it from all others
 *
 * @param {number} currentIndex
 * @param {number} lastIndex
 *
 * @return {number}
 */
const previousIndex = (currentIndex, lastIndex) => (currentIndex === 0) ? lastIndex : (currentIndex - 1);

/**
 * @class
 */
export default class Keyboard {
  constructor() {
    /**
     * @property {HTMLElement[]} elements
     */
    this.elements = [];
    /**
     * Creates a bound key handler, that can be removed
     * @property {function} boundHandleKeyDown
     */
    this.boundHandleKeyDown = this.handleKeyDown.bind(this);
    /**
     * @property {number} selectedIndex
     */
    this.selectedIndex = 0;
  }

  /**
   * Add keyboard support to an element
   *
   * @param {HTMLElement} element
   *
   * @public
   */
  addElement(element) {
    this.elements.push(element);
    element.addEventListener('keydown', this.boundHandleKeyDown);

    if (this.elements.length === 1) { // if first
      addTabIndex(element);
    }
  };

  /**
   * Add controls to an element
   *
   * @param {HTMLElement} element
   *
   * @public
   */
  removeElement(element) {
    this.elements = without([element], this.elements);

    element.removeEventListener('keydown', this.boundHandleKeyDown);

    // if removed element was selected
    if(hasTabIndex(element)) {
      removeTabIndex(element);

      this.selectedIndex = 0;
      updateTabbable(this.elements, this.selectedIndex);
    }
  };

  /**
   * Handles key down, and updates the tab index
   *
   * @param {KeyboardEvent} event Keyboard event
   *
   * @private
   */
  handleKeyDown(event) {
    const lastIndex = this.elements.length - 1;

    switch (event.which) {
      case 13: // Enter
      case 32: // Space
        this.select();
        event.preventDefault();
        break;
      case 35: // End
        this.selectedIndex = lastIndex;
        event.preventDefault();
        break;
      case 36: // Home
        this.selectedIndex = 0;
        event.preventDefault();
        break;
      case 37: // Left Arrow
      case 38: // Up Arrow
        this.selectedIndex = previousIndex(this.selectedIndex, lastIndex);
        event.preventDefault();
        break;
      case 39: // Right Arrow
      case 40: // Down Arrow
        this.selectedIndex = nextIndex(this.selectedIndex, lastIndex);
        event.preventDefault();
        break;
    }

    updateTabbable(this.elements, this.selectedIndex);
    this.elements[this.selectedIndex].focus();
  };

  /**
   * Sets the selected index, and updates the tab index
   *
   * @param {number} index
   */
  forceSelectedIndex(index) {
    this.selectedIndex = index;
    updateTabbable(this.elements, this.selectedIndex);
  }

  /**
   * Triggers 'onSelect' function if it exists
   */
  select() {
    if(this.onSelect != undefined) {
      this.onSelect(this.elements[this.selectedIndex]);
    }
  }
}
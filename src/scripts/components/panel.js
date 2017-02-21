import {getAttribute, setAttribute, removeAttribute, attributeEquals, querySelector, toggleAttribute} from '../utils/elements';
import {curry, forEach, inverseBooleanString} from '../utils/functional';

/**
 * @const
 * @type {string}
 */
const ATTRIBUTE_ARIA_EXPANDED = "aria-expanded";

/**
 * @type {function}
 */
const selectExpandable = querySelector('[aria-expanded]');

/**
 * @type {function}
 */
const getAriaControls = getAttribute('aria-controls');

/**
 * @type {function}
 */
const isExpanded = attributeEquals(ATTRIBUTE_ARIA_EXPANDED, 'true');

/**
 * @type {function}
 */
const setAriaHiddenTrue = setAttribute('aria-hidden', 'true');

/**
 * @type {function}
 */
const setAriaHiddenFalse = setAttribute('aria-hidden', 'false');

/**
 * @type {Function}
 */
const handleMutation = curry(function(bodyElement, mutation) {
  const titleEl = mutation.target;

  if(isExpanded(titleEl)){
    setAriaHiddenFalse(bodyElement);
  }
  else {
    setAriaHiddenTrue(bodyElement);
  }
});

/**
 * Initializes a panel
 *
 * @param {HTMLElement} element
 * @return {HTMLElement}
 */
export default function init(element) {
  const titleEl = selectExpandable(element);
  const bodyEl = document.getElementById(getAriaControls(titleEl));

  if(titleEl) {
    // set observer on title for aria-expanded
    let observer = new MutationObserver(forEach(handleMutation(bodyEl)));
    observer.observe(titleEl, {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: [ATTRIBUTE_ARIA_EXPANDED]
    });

    // Set click listener that toggles aria-expanded
    titleEl.addEventListener('click', function(event) {
      toggleAttribute('aria-expanded', event.target);
    });
  }

  return element;
}
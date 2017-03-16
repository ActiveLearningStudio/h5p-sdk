/**
 * Initiates an upload form and adds logic
 * to bind the elements together.
 *
 * @param {HTMLElement} element
 */
export default function init(element) {
  const uploadInput =  element.querySelector('.upload input[type="file"]');
  const uploadPath = element.querySelector('.upload-path');
  const useButton =  element.querySelector('.use-button');

  uploadInput.onchange = function () {
    if (this.value !== '') {

      // Replace the placeholder text with the selected filepath 
      uploadPath.value = this.value.replace('C:\\fakepath\\', '');

      // Only show the 'use' button once a file has been selected
      useButton.style.display = 'inline-block';
    }
  };
}

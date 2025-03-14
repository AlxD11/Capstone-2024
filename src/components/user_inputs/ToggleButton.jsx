import React, { useEffect, useState } from 'react';
import '../../styles/GlobalStyles.css';
import '../../styles/user_inputs/ToggleButton.css';

/** Creates a toggle switch for use inside a `FormInput` component.
 * The toggle is structured as an `input type="checkbox"` element.
 *
 * @param {Object} param0
 * @param {string} param0.id         The unique ID for the toggle so that it can be programmatically accessed.
 * @param {string} param0.groupName  (optional) The name attribute of the toggle, which is basically the ID of the question to link the button to. This should be unique for each toggle unless the question is "multiple choice." Defaults to the ID.
 * @param {boolean} param0.isChecked  (optional) Whether the button should be checked (true) or not. Defaults to false.
 * @param {function} param0.onChange (optional) function to call when the toggle state changes.
 */
function ToggleButton({ id, groupName = id, isChecked = false, onChange }) {
  const [checked, setChecked] = useState(isChecked);

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  const handleToggle = (event) => {
    if (onChange) {
      onChange(event.target.checked);
    }
  };

  return (
    <label className="switch" htmlFor={id}>
      <input
        className="ToggleButton-input"
        type="checkbox"
        id={id}
        name={groupName}
        checked={checked}
        onChange={handleToggle}
      />
      <span className="ToggleButton-slider round"></span>
    </label>
  );
}

export default ToggleButton;
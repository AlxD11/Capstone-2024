import '../../styles/GlobalStyles.css';
import '../../styles/user_inputs/ToggleButton.css';

import FormInput from "./FormInput.jsx";


/** Creates a toggle switch for use inside a `FormInput` component.
 * The toggle is structured as an `input type="checkbox"` element.
 * 
 * @param {Object} param0 
 * @param {string} param0.id 			The unique ID for the toggle so that it can be programmatically accessed.
 * @param {string} param0.groupName 	(optional) The name attribute of the toggle, which is basically the ID of the question to link the button to. This should be unique for each toggle unless the question is "multiple choice." Defaults to the ID.
 * @param {string} param0.isChecked 	(optional) Whether the button should be checked (true) or not. Defaults to "false". TODO: Read the user's settings and give the button the correct state on page load. */
function ToggleButton({ id, groupName = id, isChecked = "false"})
{
	/* An HTML input element checkbox that's checked by default. */
	let checkedInput = <input className="ToggleButton-input"
		type="checkbox"
		id={id}
		name={groupName}
		defaultChecked
	/>
	// Note: using the `checked` attribute instead of `defaultChecked` will make pre-checked boxes permanently toggled.
	
	/* An HTML `input` element checkbox that's not checked by default. */
	let uncheckedInput = <input className="ToggleButton-input"
		type="checkbox"
		id={id}
		name={groupName}
	/>
	
	// Reference: conditionally render React components - https://medium.com/@ramdhas/jsx-in-react-combination-of-javascript-and-html-f50cfdaf6c66
	
	return(
		<>
			{ isChecked == "true" && checkedInput }
			{ isChecked != "true" && uncheckedInput }
			<span class="ToggleButton-slider"></span>
		</>
	);
}

export default ToggleButton;
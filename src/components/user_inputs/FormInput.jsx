import '../../styles/GlobalStyles.css';
import '../../styles/user_inputs/FormInput.css';


/** Creates a `label` element encloses another element. This is for use within a `form`.
 * This does not have a unique ID on its own, but the contained element should.
 * The only advantage of using this is consistent formatting.
 * 
 * @param {Object} param0 
 * @param {string} param0.label 			The text to display for the `label` element.
 * @param {string} [param0.desc=""] 		(optional) The extended description to display under the label. Screen readers will read this as part of the label.
 * @param {string} [param0.verticalAlignment="false"]	(optional) Set to "true" to set the child component to be rendered as "block" instead of "inline-block." This will render it beneath the text (assuming nothing overrides its style rules).
 * @param {React.JSX} param0.children  		The React element nested within this one.
 */
function FormInput({ label, desc="", verticalAlignment="false", children})
{
	// Reference: https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children
	
	let childClassName = "FormInput-child";
	if (verticalAlignment == "true")
	{
		childClassName = "FormInput-child-vertical";
	}
	
	return(
		<div className="FormInput">
			<label>
				<span className="FormInput-text">
					{label}
					<span className="FormInput-description">{desc}</span>
				</span>
				<span className={childClassName}>
					{children}
				</span>
			</label>
		</div>
	);
}

export default FormInput;
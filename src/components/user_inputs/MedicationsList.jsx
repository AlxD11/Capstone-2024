import '../../styles/GlobalStyles.css';

import React, {useState} from 'react';


/** TODO: Add confirmation dialog to medication delete button */
function MedicationsList()
{
	// Reference: React Full Course for free (2024) by BroCode, ToDo List App Example, 3:01:40
	// https://youtu.be/CgkZ7MvWUAA?t=10902
	
	const [meds, setMeds] = useState([]);
	const [newMed, setNewMed] = useState("");
	
	function handleInputChange(event)
	{
		setNewMed(event.target.value);
	}
	
	function addMed()
	{
		// If the input box is not empty...
		if (newMed.trim() !== "")
		{
			// Add the text from the input box to the list of meds
			setMeds(m => [...m, newMed]); /* Lord have mercy what the actual fuck is this doing */
			setNewMed("");
		}
	}
	
	function deleteMed(index)
	{
		const updatedMeds = meds.filter((element, i) => i !== index);
		// Make the updated data visible.
		setMeds(updatedMeds);
	}
	
	function moveMedUp(index)
	{
		if (index > 0)
		{
			const updatedMeds = [...meds];
			// Swap the elements in the array
			[updatedMeds[index], updatedMeds[index-1]] = [updatedMeds[index-1], updatedMeds[index]];
			setMeds(updatedMeds);
		}
	}
	
	function moveMedDown(index)
	{
		if (index < meds.length-1)
		{
			const updatedMeds = [...meds];
			// Swap the elements in the array
			[updatedMeds[index], updatedMeds[index+1]] = [updatedMeds[index+1], updatedMeds[index]];
			setMeds(updatedMeds);
		}
		
	}
	
	return(
		<div className="MedicationsList">
			<input
				type="text"
				label="Enter medication name"
				placeholder="Example: clonazepam"
				value={newMed}
				onChange={handleInputChange}
			>
			</input>
			
			<button type="button" onClick={addMed}> Add medication </button>
			
			<ol>
				{meds.map((med, index) =>
					<li key={index}>
						{med}
						<button onClick={() => deleteMed(index)}> Delete </button>
						<button onClick={() => moveMedUp(index)}> Move Up </button>
						<button onClick={() => moveMedDown(index)}> Move Down </button>
					</li>
				)}
			</ol>
		</div>
	);
}

export default MedicationsList;
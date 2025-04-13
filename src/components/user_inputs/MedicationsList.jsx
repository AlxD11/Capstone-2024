import '../../styles/GlobalStyles.css';
import '../../styles/user_inputs/MedicationList.css';

import React, { useState, useEffect } from 'react';
import { updateDoc, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase';

/** TODO: Add confirmation dialog to medication delete button */
function MedicationsList({ userId }) {
	// Reference: React Full Course for free (2024) by BroCode, ToDo List App Example, 3:01:40
	// https://youtu.be/CgkZ7MvWUAA?t=10902

	const [meds, setMeds] = useState([]);
	const [newMed, setNewMed] = useState("");

	useEffect(() => {
		const fetchMedications = async () => {
			if (userId) {
				const profileRef = doc(db, "user_info", userId, "Data", "Profile");
				const docSnap = await getDoc(profileRef);
				if (docSnap.exists() && docSnap.data().medications) {
					const loadedMeds = docSnap.data().medications.map((med, index) => ({
						id: index.toString(), 
						name: med.name,
						order: med.order !== undefined ? med.order : index
					})).sort((a, b) => a.order - b.order);
					setMeds(loadedMeds);
				} else {
					setMeds([]);
				}
			}
		};

		fetchMedications();
	}, [userId]);

	async function handleInputChange(event) {
		setNewMed(event.target.value);
	}

	async function updateMedicationsInFirebase(updatedMeds) {
		if (userId) {
			const profileRef = doc(db, "user_info", userId, "Data", "Profile");
			try {
				await updateDoc(profileRef, {
					medications: updatedMeds.map(med => ({ name: med.name, order: med.order }))
				});
			} catch (error) {
				console.error("Error updating medications in Firebase: ", error);
				// Optionally, provide user feedback about the error
			}
		}
	}

	async function addMed() {
		if (newMed.trim() !== "") {
			const newMedication = {
				id: Date.now().toString(), // Simple unique ID for local state
				name: newMed,
				order: meds.length
			};
			const updatedMeds = [...meds, newMedication];
			setMeds(updatedMeds.sort((a, b) => a.order - b.order));
			setNewMed("");
			await updateMedicationsInFirebase(updatedMeds);
		}
	}

	async function deleteMed(index) {
		const updatedMeds = meds.filter((_, i) => i !== index).map((med, i) => ({ ...med, order: i }));
		setMeds(updatedMeds);
		await updateMedicationsInFirebase(updatedMeds);
	}

	async function moveMedUp(index) {
		if (index > 0) {
			const updatedMeds = [...meds];
			[updatedMeds[index], updatedMeds[index - 1]] = [updatedMeds[index - 1], updatedMeds[index]];
			const reorderedMeds = updatedMeds.map((med, i) => ({ ...med, order: i }));
			setMeds(reorderedMeds);
			await updateMedicationsInFirebase(reorderedMeds);
		}
	}

	async function moveMedDown(index) {
		if (index < meds.length - 1) {
			const updatedMeds = [...meds];
			[updatedMeds[index], updatedMeds[index + 1]] = [updatedMeds[index + 1], updatedMeds[index]];
			const reorderedMeds = updatedMeds.map((med, i) => ({ ...med, order: i }));
			setMeds(reorderedMeds);
			await updateMedicationsInFirebase(reorderedMeds);
		}
	}

	return (
		<div className="MedicationsList">
			<input
				type="text"
				label="Enter medication name"
				placeholder="Example: clonazepam"
				value={newMed}
				onChange={handleInputChange}
			/>

			<button type="button" onClick={addMed}> Add medication </button>

			<ol>
				{meds.map((med, index) => (
					<li key={med.id}>
						{med.name}
						<button onClick={() => deleteMed(index)}> Delete </button>
						<button onClick={() => moveMedUp(index)}> Move Up </button>
						<button onClick={() => moveMedDown(index)}> Move Down </button>
					</li>
				))}
			</ol>
		</div>
	);
}

export default MedicationsList;
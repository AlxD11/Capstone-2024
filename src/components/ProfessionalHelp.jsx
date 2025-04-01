import '../styles/ProfessionalHelp.css';
import MainScreen from './MainScreen.jsx';
import { useState, useEffect } from 'react';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useLoading } from './Loading';
function ResourceCard({ title, description, link, imageUrl }) {
    return (
        <div className="resource-card">
            {imageUrl && <img src={imageUrl} alt={title} className="resource-image" />}
            <div className="resource-content">
                <h3 className="resource-title">{title}</h3>
                <p className="resource-description">{description}</p>
                {link && (
                    <a href={link} target="_blank" rel="noopener noreferrer" className="resource-link">
                        Learn More
                    </a>
                )}
            </div>
        </div>
    );
}

function FindTherapist() {
    return (
        <ResourceCard
            title="Find a Therapist"
            description="Locate a therapist near you."
            link="https://www.mentalhealth.com/#:~:text=MentalHealth.com%3A%20Mental%20Health%20Information%20%2B%20Find%20a%20Therapist&text=Publishing%20Dept"
            imageUrl="https://media.istockphoto.com/id/1204439199/vector/psychotherapy-counseling-concept-with-black-people.jpg?s=612x612&w=0&k=20&c=V9rt6I3GH1luC-esY_retAh4YUUDrsrtUzqyybTu5J0="
        />
    );
}

function MedicationResources() {
    return (
        <ResourceCard
            title="Medication Resources"
            description="Learn more about your current medication."
            link="https://www.drugs.com/#:~:text=Drugs.com%20is%20the%20most,source%20of%20drug%20information%20online"
            imageUrl="https://domf5oio6qrcr.cloudfront.net/medialibrary/15900/gettyimages-1342010434.jpg"
        />
    );
}

function OtherResources() {
    const [resource, setResource] = useState(null);
    const { setLoading } = useLoading();
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResource = async () => {
            setLoading(true);
            try {
                const currentUser = auth.currentUser;
                if (!currentUser) {
                    setError('User not logged in.');
                    setLoading(false);
                    return;
                }

                const userId = currentUser.uid;
                const userDocRef = doc(db, 'user_info', userId, 'Data', 'Profile');
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    const mentalHealthConcern = userData.mentalHealthTopic.toLowerCase();

                    if (mentalHealthConcern) {
                        const resourcesCollectionRef = collection(db, 'namiBlogLinks');
                        const q = query(
                            resourcesCollectionRef,
                            where('keywords', 'array-contains', mentalHealthConcern)
                        );
                        const querySnapshot = await getDocs(q);

                        if (!querySnapshot.empty) {
                            const resourceData = querySnapshot.docs[0].data();
                            setResource(resourceData);
                        } else {
                            setError('No resources found for your specific concern.');
                        }
                    } else {
                        setError('Mental health concern not found in your profile.');
                    }
                } else {
                    setError('User profile not found.');
                }
            } catch (err) {
                setError('Failed to fetch resource.');
                console.error('Error fetching resource:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchResource();
    }, []);


    if (error) {
        return <p>{error}</p>;
    }

    if (resource) {
        return (
            <ResourceCard
                title={resource.title}
                description="Click here to learn more."
                link={resource.href}
                imageUrl={resource.img}
            />
        );
    }
    return <p>No resources found.</p>;
}

function ProfessionalHelp() {
    return (
        <div className="ProfessionalHelp">
            <h2>Professional Help Resources</h2>
            <p className="crisis-hotline">Crisis Hotline: 988</p>
            <div className="resource-cards-container">
                <FindTherapist />
                <MedicationResources />
                <OtherResources />
            </div>
        </div>
    );
}

function ProfessionalHelpPage() {
    return (
        <>
            <MainScreen>
                <ProfessionalHelp />
            </MainScreen>
        </>
    );
}

export default ProfessionalHelpPage;
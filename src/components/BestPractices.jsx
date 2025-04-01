import '../styles/GlobalStyles.css';
import MainScreen from './MainScreen.jsx';

function BestPractices() {
    return (
        <div className="BestPractices">
            <h2>Best Practices for Mental Well-Being</h2>
            <p>
                Taking care of your mental health is just as important as caring for your physical health. Incorporating small, mindful habits into your daily routine can make a significant difference in reducing stress, improving mood, and promoting overall well-being. Below are some best practices to support your mental health and maintain a balanced lifestyle.
            </p>

            <h3>Daily Mental Health Tips</h3>
            <p>
                Developing a healthy routine can help create stability and resilience in your everyday life. Practicing mindfulness and meditation, even for just a few minutes a day, can help you stay present and manage stress. A consistent sleep schedule is crucial for emotional regulation, so try to go to bed and wake up at the same time each day. Physical activity, whether it’s a walk outside or a workout, can boost your mood by releasing endorphins. Eating a well-balanced diet also plays a key role in mental health—nutrient-rich foods can enhance brain function and improve overall well-being. Journaling is another great tool for self-reflection, helping you process emotions and track patterns in your thoughts.
            </p>

            <h3>Coping Strategies for Stress & Anxiety</h3>
            <p>
                Stress and anxiety are a natural part of life, but having effective coping strategies can help you manage them in healthy ways. Deep breathing exercises, like the 4-7-8 technique, can quickly calm the nervous system. Grounding techniques, such as the 5-4-3-2-1 method (identifying five things you can see, four you can touch, three you can hear, two you can smell, and one you can taste), are great for reducing feelings of anxiety. Additionally, cognitive reframing—challenging negative thoughts and replacing them with more balanced perspectives—can help shift your mindset and improve your emotional resilience.
            </p>

            <h3>Social & Emotional Well-Being</h3>
            <p>
                Building strong relationships and maintaining a support system can significantly improve mental health. Practicing gratitude by keeping a daily journal of things you’re thankful for can help shift focus to the positive aspects of life. Setting boundaries is another important skill—learning to say no and prioritizing your well-being can prevent burnout and emotional exhaustion. Surrounding yourself with supportive and understanding people can provide comfort and encouragement during difficult times.
            </p>

            <h3>Digital Detox & Screen Time Management</h3>
            <p>
                While technology keeps us connected, excessive screen time—especially on social media—can contribute to stress, anxiety, and negative self-comparison. Taking regular breaks from screens, setting limits on social media use, and creating tech-free zones in your home can help you establish a healthier balance. Engaging in offline activities like reading, spending time in nature, or pursuing hobbies can enhance mental clarity and reduce digital overwhelm.
            </p>

            <h3>Self-Care & Relaxation Techniques</h3>
            <p>
                Prioritizing self-care is essential for maintaining emotional balance. Engaging in activities that bring you joy, such as listening to music, painting, or taking a walk in nature, can be incredibly therapeutic. Creative expression through art, music, or writing is also a great way to process emotions. Practicing relaxation techniques like aromatherapy, warm baths, or guided meditation can provide a sense of calm and peace.
            </p>

            <h3>When to Seek Help</h3>
            <p>
                While these practices can support mental well-being, it’s important to recognize when professional help may be needed. If you’re experiencing persistent feelings of sadness, anxiety, or hopelessness that interfere with daily life, seeking help from a licensed professional can provide the guidance and support you need. If you’re unsure whether professional help is necessary, self-assessment tools and mental health quizzes can provide insight into your emotional state.
            </p>
        </div>
    );
}

function BestPracticesPage() {
    return (
        <>
            <MainScreen>
                <BestPractices />
            </MainScreen>
        </>
    );
}

export default BestPracticesPage;

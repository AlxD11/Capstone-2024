import '../styles/GlobalStyles.css';
import MainScreen from './MainScreen.jsx';

function BestPractices() {
    return (
        <div className="BestPractices">
            <h2>🌿 Best Practices for Mental Well-Being</h2>
            <p>
                Your mental health matters just as much as your physical health 💖. Small, mindful habits in your daily routine can make a big difference—reducing stress, lifting your mood, and helping you feel more balanced overall. Below are some helpful tips to support your mental well-being and live a healthier, happier life.
            </p>

            <h3>☀️ Daily Mental Health Tips</h3>
            <p>
                Creating a steady routine can bring calm and clarity to your life. 🧘‍♀️ Practicing mindfulness or short meditation sessions can help you stay grounded and reduce anxiety. Sticking to a regular sleep schedule 🛌 supports emotional stability, while moving your body—whether it's a walk or workout—can boost endorphins and brighten your mood 💪. Eating nutritious meals 🍎 and taking time to journal 📝 can also do wonders for your mental clarity and self-awareness.
            </p>

            <h3>🌬 Coping Strategies for Stress & Anxiety</h3>
            <p>
                Stress and anxiety are totally normal—but how you respond matters. Deep breathing exercises like the 4-7-8 technique 😮‍💨 can quickly bring a sense of calm. Try grounding techniques like the 5-4-3-2-1 method to reconnect with the present moment. And if you're caught in negative thinking, cognitive reframing 🧠—challenging those thoughts and shifting your perspective—can help you build resilience and stay positive.
            </p>

            <h3>💞 Social & Emotional Well-Being</h3>
            <p>
                Connection is powerful. Building strong relationships and leaning on your support system can make all the difference. Try starting a gratitude journal 📔 to highlight the good things in life. Set healthy boundaries ✋ to protect your energy, and don’t be afraid to say no when needed. Surround yourself with people who lift you up—you deserve it!
            </p>

            <h3>📵 Digital Detox & Screen Time Balance</h3>
            <p>
                Technology keeps us connected, but too much screen time—especially on social media—can mess with our minds. Take regular breaks, set app timers ⏱, or create tech-free zones in your space. Fill your offline time with joyful things like books 📚, nature 🌳, or creative hobbies 🎨. You'll feel more refreshed and present.
            </p>

            <h3>🛁 Self-Care & Relaxation Techniques</h3>
            <p>
                Self-care isn’t selfish—it’s essential 💆‍♂️. Do things that bring you joy: blast your favorite music 🎶, take a peaceful walk, or get lost in art, writing, or photography. Aromatherapy, warm baths 🛀, or guided meditations can melt away stress and help you recharge. Make time for you—you’re worth it.
            </p>

            <h3>🆘 When to Seek Help</h3>
            <p>
                These practices are helpful, but sometimes, we all need extra support. If you’re feeling overwhelmed, stuck, or just not like yourself, reaching out to a licensed professional can be life-changing. 🧑‍⚕️ If you're unsure, self-assessment tools and mental health quizzes can give you insight into what you're experiencing and whether it’s time to talk to someone.
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

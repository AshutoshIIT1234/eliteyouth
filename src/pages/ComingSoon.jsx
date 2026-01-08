import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';

const ComingSoon = () => {
    return (
        <div className="container" style={{
            height: '80vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
        }}>
            <Reveal effect="scale-up">
                <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1rem', textTransform: 'uppercase' }}>Coming Soon</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--color-text-light)', marginBottom: '2rem', maxWidth: '600px' }}>
                    We are working hard to bring the Elite Youth experience to a store near you. Stay tuned for our grand opening!
                </p>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <Link to="/" className="btn btn-primary">Back to Home</Link>
                    <Link to="/category/men" className="btn btn-outline">Shop Online</Link>
                </div>
            </Reveal>
        </div>
    );
};

export default ComingSoon;

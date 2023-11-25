import { useEffect, useState } from 'react';

export default function Car() {
    const [pos, setPos] = useState(0);
    const [speed, setSpeed] = useState(0.01);
    const [resilience, setResilience] = useState(0);
    const [top, setTop] = useState(500);

    useEffect(() => {
        // setTimeout(() => {
        setSpeed(speed * 1.2);
        setResilience(resilience * 0.9);
        // }, 10);
    }, [pos]);

    useEffect(() => {
        setTimeout(() => {
            if (pos > 500) {
                setResilience(top / 30);
                setSpeed(0.01);
                setPos(500);
            } else {
                if (speed - resilience <= 0) {
                    setTop(500 - pos);
                }
                setPos(pos + speed - resilience);
            }
        }, 10);
    }, [speed]);

    return (
        <div className="car-container" style={{ top: pos }}>
            <div className="car-space"></div>
        </div>
    );
}

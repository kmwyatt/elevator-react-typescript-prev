import React, { useEffect, useState } from 'react';

export default function CarDoor({
    doorStatus,
    setDoorStatus,
}: {
    doorStatus: DoorStatus;
    setDoorStatus: React.Dispatch<DoorStatus>;
}) {
    const [doorPos, setDoorPos] = useState<number>(0);

    useEffect(() => {
        setTimeout(() => {
            if (doorStatus === 'opening') {
                if (doorPos > -13) {
                    setDoorPos(doorPos - 0.2);
                } else {
                    setDoorStatus('opened');
                }
            } else if (doorStatus === 'closing') {
                if (doorPos < 0) {
                    setDoorPos(doorPos + 0.2);
                } else {
                    setDoorStatus('closed');
                }
            }
        }, 1);
    }, [doorStatus, doorPos]);

    return (
        <div className="car-door-container">
            <div className="car-door" style={{ left: doorPos }}></div>
            <div className="car-door" style={{ right: doorPos }}></div>
        </div>
    );
}

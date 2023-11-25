import CarDoor from './CarDoor';
import React, { useEffect, useState } from 'react';
import FloorButtonBox from './FloorButtonBox';
export default function Car({
    carPos,
    carStatus,
    floors,
    floorNums,
    floorBtnPressed,
    toggleFloorBtn,
    setIsReadyToMove,
}: {
    carPos: number;
    carStatus: string;
    floors: number;
    floorNums: number[];
    floorBtnPressed: boolean[];
    toggleFloorBtn: React.Dispatch<number>;
    setIsReadyToMove: React.Dispatch<boolean>;
}) {
    const [doorStatus, setDoorStatus] = useState<DoorStatus>('closed');

    useEffect(() => {
        if (carStatus === 'stopped') {
            setDoorStatus('opening');
            setTimeout(() => {
                setDoorStatus('closing');
            }, 2000);
        }
    }, [carStatus]);

    useEffect(() => {
        if (doorStatus === 'closed') {
            setIsReadyToMove(true);
        }
    }, [doorStatus]);

    return (
        <div className="car-container" style={{ bottom: carPos }}>
            <div className="car-button-box">
                <div className="floor-button-box">
                    {floorNums.map((v, i) => (
                        <div
                            className="car-button"
                            onClick={() => toggleFloorBtn(floors - i - 1)}
                            style={{
                                borderColor: `${
                                    floorBtnPressed[floors - i - 1]
                                        ? '#f00'
                                        : '#666'
                                }`,
                            }}
                            key={i}
                        >
                            {v}
                        </div>
                    ))}
                </div>
                <div className="door-button-box">
                    <div className="car-button">{'><'}</div>
                    <div className="car-button">{'<>'}</div>
                </div>
            </div>
            <CarDoor doorStatus={doorStatus} setDoorStatus={setDoorStatus} />
        </div>
    );
}

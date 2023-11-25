import React, { useEffect } from 'react';

export default function Machine({
    runningStatus,
    carStatus,
    carPos,
    isReadyToMove,
    setCarPos,
    setCurFloor,
}: {
    runningStatus: RunningStatus;
    carStatus: CarStatus;
    carPos: number;
    isReadyToMove: boolean;
    setCarPos: React.Dispatch<number>;
    setCurFloor: React.Dispatch<number>;
}) {
    useEffect(() => {
        setTimeout(() => {
            if (
                carStatus === 'stopped' ||
                carStatus === 'waiting' ||
                !isReadyToMove
            ) {
                return;
            }
            if (carStatus === 'going-up') {
                setCarPos(carPos + 1);
            } else if (carStatus === 'going-down') {
                setCarPos(carPos - 1);
            }
            if (carPos % 60 === 0) {
                setCurFloor(carPos / 60);
            }
        }, 10);
    }, [carStatus, carPos, isReadyToMove]);

    return (
        <div className="machine-container">
            <div
                className="light-sign"
                style={{
                    background: `${
                        carStatus === 'going-up' || carStatus === 'going-down'
                            ? '#0f0'
                            : '#f00'
                    }`,
                }}
            ></div>
        </div>
    );
}

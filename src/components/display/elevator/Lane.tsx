import React, { useEffect, useState } from 'react';
import FloorButtonBox from './FloorButtonBox';
import Car from './Car';

export default function Lane({
    floors,
    floorNums,
    carPos,
    carStatus,
    goingUpPressed,
    goingDownPressed,
    floorBtnPressed,
    setGoingUpPressed,
    setGoingDownPressed,
    setFloorBtnPressed,
    setIsReadyToMove,
}: {
    floors: number;
    floorNums: number[];
    carPos: number;
    carStatus: string;
    goingUpPressed: boolean[];
    goingDownPressed: boolean[];
    floorBtnPressed: boolean[];
    setGoingUpPressed: React.Dispatch<boolean[]>;
    setGoingDownPressed: React.Dispatch<boolean[]>;
    setFloorBtnPressed: React.Dispatch<boolean[]>;
    setIsReadyToMove: React.Dispatch<boolean>;
}) {
    const [toggleUpBtn, setToggleUpBtn] = useState<number>(-1);
    const [toggleDownBtn, setToggleDownBtn] = useState<number>(-1);
    const [toggleFloorBtn, setToggleFloorBtn] = useState<number>(-1);

    useEffect(() => {
        if (toggleUpBtn >= 0) {
            const newArray: boolean[] = [...goingUpPressed];
            newArray[toggleUpBtn] = !newArray[toggleUpBtn];
            setGoingUpPressed(newArray);
            setToggleUpBtn(-1);
        }
    }, [toggleUpBtn]);

    useEffect(() => {
        if (toggleDownBtn >= 0) {
            const newArray: boolean[] = [...goingDownPressed];
            newArray[toggleDownBtn] = !newArray[toggleDownBtn];
            setGoingDownPressed(newArray);
            setToggleDownBtn(-1);
        }
    }, [toggleDownBtn]);

    useEffect(() => {
        if (toggleFloorBtn >= 0) {
            const newArray: boolean[] = [...floorBtnPressed];
            newArray[toggleFloorBtn] = !newArray[toggleFloorBtn];
            setFloorBtnPressed(newArray);
            setToggleFloorBtn(-1);
        }
    }, [toggleFloorBtn]);

    return (
        <div className="lane-container">
            <div className="floor-button-box-group">
                {floorNums.map((v, i) => (
                    <FloorButtonBox
                        floorNum={floors - i - 1}
                        floors={floors}
                        isPressedUp={goingUpPressed[floors - i - 1]}
                        isPressedDown={goingDownPressed[floors - i - 1]}
                        toggleUpBtn={setToggleUpBtn}
                        toggleDownBtn={setToggleDownBtn}
                        key={i}
                    />
                ))}
            </div>
            <div className="lane-line">
                <div className="lane-space" style={{ height: floors * 60 }}>
                    <Car
                        carPos={carPos}
                        carStatus={carStatus}
                        floors={floors}
                        floorNums={floorNums}
                        floorBtnPressed={floorBtnPressed}
                        toggleFloorBtn={setToggleFloorBtn}
                        setIsReadyToMove={setIsReadyToMove}
                    />
                </div>
            </div>
        </div>
    );
}

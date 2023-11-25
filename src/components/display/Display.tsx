import Floor from './Floor';
import Elevator from './elevator/Elevator';
import React, { useEffect, useState } from 'react';

export default function Display({ floors }: { floors: number }) {
    const [floorNums, setFloorNums] = useState<number[]>([]);

    useEffect(() => {
        setFloorNums(new Array(floors).fill(0).map((v, i) => floors - i));
    }, [floors]);

    return (
        <div className="display-container">
            <div className="floor-group">
                {floorNums.map((v, i) => (
                    <Floor floorNum={v} key={i} />
                ))}
            </div>
            <Elevator floors={floors} floorNums={floorNums} />
        </div>
    );
}

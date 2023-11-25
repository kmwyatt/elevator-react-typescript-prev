import React from 'react';

export default function FloorButtonBox({
    floorNum,
    floors,
    isPressedUp,
    isPressedDown,
    toggleUpBtn,
    toggleDownBtn,
}: {
    floorNum: number;
    floors: number;
    isPressedUp: boolean;
    isPressedDown: boolean;
    toggleUpBtn: React.Dispatch<number>;
    toggleDownBtn: React.Dispatch<number>;
}) {
    return (
        <div className="floor-button-box">
            {floorNum !== floors - 1 && (
                <div
                    className="floor-button"
                    style={{ borderColor: `${isPressedUp ? '#f00' : '#666'}` }}
                    onClick={() => toggleUpBtn(floorNum)}
                >
                    ▲
                </div>
            )}
            {floorNum !== 0 && (
                <div
                    className="floor-button"
                    style={{
                        borderColor: `${isPressedDown ? '#f00' : '#666'}`,
                    }}
                    onClick={() => toggleDownBtn(floorNum)}
                >
                    ▼
                </div>
            )}
        </div>
    );
}

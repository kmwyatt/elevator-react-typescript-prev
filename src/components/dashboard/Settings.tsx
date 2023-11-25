import React, { useState } from 'react';

export default function Settings({
    setFloors,
}: {
    setFloors: React.Dispatch<number>;
}) {
    const [floorsInput, setFloorsInput] = useState<number>(5);

    function handleInputFloors(e: React.ChangeEvent<HTMLInputElement>) {
        setFloorsInput(parseInt(e.target.value));
    }

    return (
        <div className="settings-container">
            <div className="input-line">
                <div className="input-label">지상층</div>
                <input className="input-text" onChange={handleInputFloors} />
                <button
                    className="input-button"
                    onClick={() => setFloors(floorsInput)}
                >
                    변경
                </button>
            </div>
        </div>
    );
}

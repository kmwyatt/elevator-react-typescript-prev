import '../../asset/scss/floor.scss';
import React from 'react';

export default function Floor({ floorNum }: { floorNum: number }) {
    return (
        <div className="floor-container">
            <div className="floor-number">{floorNum}F</div>
        </div>
    );
}

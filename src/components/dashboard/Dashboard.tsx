import Settings from './Settings';
import React from 'react';
import '../../asset/scss/dashboard.scss';
export default function Dashboard({
    setFloors,
}: {
    setFloors: React.Dispatch<number>;
}) {
    return (
        <div className="dashboard-container">
            <Settings setFloors={setFloors} />
        </div>
    );
}

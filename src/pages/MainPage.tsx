import Display from '../components/display/Display';
import { useState } from 'react';
import Dashboard from '../components/dashboard/Dashboard';

export default function MainPage() {
    const [floors, setFloors] = useState<number>(5);

    return (
        <div className="main-page-container">
            <Display floors={floors} />
            <Dashboard setFloors={setFloors} />
        </div>
    );
}

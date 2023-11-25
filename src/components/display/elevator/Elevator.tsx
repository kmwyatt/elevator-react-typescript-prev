import Lane from './Lane';
import '../../../asset/scss/elevator.scss';
import { useEffect, useState } from 'react';
import Machine from './Machine';

export default function Elevator({
    floors,
    floorNums,
}: {
    floors: number;
    floorNums: number[];
}) {
    const [goingUpPressed, setGoingUpPressed] = useState<boolean[]>([]);
    const [goingDownPressed, setGoingDownPressed] = useState<boolean[]>([]);
    const [floorBtnPressed, setFloorBtnPressed] = useState<boolean[]>([]);
    const [carPos, setCarPos] = useState<number>(0);
    const [curFloor, setCurFloor] = useState<number>(0);
    const [runningStatus, setRunningStatus] = useState<RunningStatus>('stay');
    const [carStatus, setCarStatus] = useState<CarStatus>('waiting');
    const [isReadyToMove, setIsReadyToMove] = useState<boolean>(true);

    function checkUpward(target: boolean[], start: number = 0): number {
        for (let i = start + 1; i < floors; i++) {
            if (target[i]) {
                return i;
            }
        }
        return start;
    }

    function checkDownward(
        target: boolean[],
        start: number = floors - 1,
    ): number {
        for (let i = start - 1; i >= 0; i--) {
            if (target[i]) {
                return i;
            }
        }
        return start;
    }

    function removeFromGoingUpPressed(): void {
        const newGoingUpPressed: boolean[] = [...goingUpPressed];
        newGoingUpPressed[curFloor] = false;
        setGoingUpPressed(newGoingUpPressed);
    }

    function removeFromGoingDownPressed() {
        const newGoingDownPressed: boolean[] = [...goingDownPressed];
        newGoingDownPressed[curFloor] = false;
        setGoingDownPressed(newGoingDownPressed);
    }

    function removeFromFloorBtnPressed() {
        const newFloorBtnPressed: boolean[] = [...floorBtnPressed];
        newFloorBtnPressed[curFloor] = false;
        setFloorBtnPressed(newFloorBtnPressed);
    }

    function stoppedWhileGoingUp() {
        setIsReadyToMove(false);
        setCarStatus('stopped');
        removeFromGoingUpPressed();
        removeFromFloorBtnPressed();
    }

    function stoppedWhileGoingDown() {
        setIsReadyToMove(false);
        setCarStatus('stopped');
        removeFromGoingDownPressed();
        removeFromFloorBtnPressed();
    }

    useEffect(() => {
        setGoingUpPressed(new Array(floors).fill(false));
        setGoingDownPressed(new Array(floors).fill(false));
        setFloorBtnPressed(new Array(floors).fill(false));
    }, [floors]);

    useEffect(() => {
        if (goingUpPressed[curFloor] && carStatus === 'waiting') {
            stoppedWhileGoingUp();
            return;
        }
        if (runningStatus === 'stay') {
            const nextFloor: number = checkUpward(goingUpPressed, curFloor);
            if (curFloor < nextFloor) {
                setRunningStatus('going-up');
            }
        }
    }, [goingUpPressed]);

    useEffect(() => {
        if (
            goingDownPressed[curFloor] &&
            carStatus === 'waiting' &&
            runningStatus === 'stay'
        ) {
            stoppedWhileGoingDown();
            return;
        }
        if (runningStatus === 'stay') {
            const nextFloor: number = checkDownward(goingDownPressed, curFloor);
            if (curFloor > nextFloor) {
                setRunningStatus('going-down');
            }
        }
    }, [goingDownPressed]);

    useEffect(() => {
        if (floorBtnPressed[curFloor] && carStatus === 'waiting') {
            removeFromFloorBtnPressed();
        }
        if (runningStatus === 'stay') {
            const nextUpFloor: number = checkUpward(floorBtnPressed);
            if (curFloor < nextUpFloor) {
                setRunningStatus('going-up');
                setCarStatus('going-up');
                return;
            }
            const nextDownFloor: number = checkDownward(floorBtnPressed);
            if (curFloor > nextDownFloor) {
                setRunningStatus('going-down');
                setCarStatus('going-down');
                return;
            }
        }
    }, [floorBtnPressed]);

    useEffect(() => {
        if (!isReadyToMove) {
            return;
        }
        if (runningStatus === 'going-up') {
            const nextGoingUp: number = checkUpward(goingUpPressed, curFloor);
            const nextFloor: number = checkUpward(floorBtnPressed, curFloor);
            if (curFloor < nextGoingUp || curFloor < nextFloor) {
                setCarStatus('going-up');
            } else {
                setRunningStatus('stay');
            }
        } else if (runningStatus === 'going-down') {
            const nextGoingDown: number = checkDownward(
                goingDownPressed,
                curFloor,
            );
            const nextFloor: number = checkDownward(floorBtnPressed, curFloor);
            if (curFloor > nextGoingDown || curFloor > nextFloor) {
                setCarStatus('going-down');
            } else {
                setRunningStatus('stay');
            }
        }
    }, [isReadyToMove, runningStatus]);

    useEffect(() => {
        if (runningStatus === 'going-up') {
            if (goingUpPressed[curFloor] || floorBtnPressed[curFloor]) {
                stoppedWhileGoingUp();
                return;
            }
        } else if (runningStatus === 'going-down') {
            if (goingDownPressed[curFloor] || floorBtnPressed[curFloor]) {
                stoppedWhileGoingDown();
                return;
            }
        } else if (runningStatus === 'going-up-to-target') {
            const nextFloor: number = checkUpward(goingDownPressed, curFloor);
            if (curFloor === nextFloor) {
                stoppedWhileGoingDown();
                setRunningStatus('going-down');
            }
        } else if (runningStatus === 'going-down-to-target') {
            const nextFloor: number = checkDownward(goingUpPressed, curFloor);
            if (curFloor === nextFloor) {
                stoppedWhileGoingUp();
                setRunningStatus('going-up');
            }
        }
    }, [curFloor]);

    useEffect(() => {
        if (carStatus === 'stopped') {
            setCarStatus('waiting');
        }
    }, [carStatus]);

    useEffect(() => {
        if (runningStatus === 'stay') {
            setFloorBtnPressed(new Array(floors).fill(false));
        }
    }, [runningStatus]);

    useEffect(() => {
        console.log('runningStatus', runningStatus);
        if (runningStatus !== 'stay') {
            return;
        }
        const nextUpFloor: number = checkUpward(goingDownPressed, curFloor);
        const nextDownFloor: number = checkDownward(goingUpPressed, curFloor);
        if (curFloor > nextDownFloor) {
            setRunningStatus('going-down-to-target');
            setCarStatus('going-down');
            return;
        }
        if (curFloor < nextUpFloor) {
            setRunningStatus('going-up-to-target');
            setCarStatus('going-up');
            return;
        }
        if (goingUpPressed[curFloor]) {
            setRunningStatus('going-up');
            stoppedWhileGoingUp();
            return;
        }
        if (goingDownPressed[curFloor]) {
            setRunningStatus('going-down');
            stoppedWhileGoingDown();
            return;
        }
        const remainingUpFloor: number = checkUpward(goingUpPressed, curFloor);
        if (curFloor < remainingUpFloor) {
            setRunningStatus('going-up');
            setCarStatus('going-up');
            return;
        }
        const remainingDownFloor: number = checkDownward(
            goingDownPressed,
            curFloor,
        );
        if (curFloor > remainingDownFloor) {
            setRunningStatus('going-down');
            setCarStatus('going-down');
            return;
        }
    }, [runningStatus, goingUpPressed, goingDownPressed]);


    return (
        <div className="elevator-container">
            <Machine
                runningStatus={runningStatus}
                carStatus={carStatus}
                carPos={carPos}
                setCarPos={setCarPos}
                isReadyToMove={isReadyToMove}
                setCurFloor={setCurFloor}
            />
            <Lane
                floors={floors}
                floorNums={floorNums}
                carPos={carPos}
                carStatus={carStatus}
                goingUpPressed={goingUpPressed}
                goingDownPressed={goingDownPressed}
                floorBtnPressed={floorBtnPressed}
                setGoingUpPressed={setGoingUpPressed}
                setGoingDownPressed={setGoingDownPressed}
                setFloorBtnPressed={setFloorBtnPressed}
                setIsReadyToMove={setIsReadyToMove}
            />
        </div>
    );
}

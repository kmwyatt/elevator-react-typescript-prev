/// <reference types="react-scripts" />
type DoorStatus = 'opened' | 'closed' | 'opening' | 'closing';
type RunningStatus =
    | 'going-up'
    | 'going-down'
    | 'going-up-to-target'
    | 'going-down-to-target'
    | 'stay';
type CarStatus = 'going-up' | 'going-down' | 'stopped' | 'waiting';

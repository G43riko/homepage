export interface PlayerInterface {
    play(parameter?: any): Promise<any>;

    pause(): void;

    stop(): void;

    previous(): void;

    next(): void;

    minimalize(): void;

    fullscreen(): void;

    getDuration(): number;

    getCurrentTime(): number;

    setCurrentTime(seconds: number): void;
}

import { PlayerInterface } from "./player.interface";

export class YoutubePlayerModel implements PlayerInterface {
    public previous(): void {
    }

    public next(): void {
    }

    public minimalize(): void {
    }

    public fullscreen(): void {
    }

    public play(parameter?: any): Promise<any> {
        return Promise.resolve();
    }

    public pause(): void {
    }

    public stop(): void {
    }

    public getDuration(): number {
        return 0;
    }

    public getCurrentTime(): number {
        return 0;
    }

    public setCurrentTime(seconds: number): void {
    }

}

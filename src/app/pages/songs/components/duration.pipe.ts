import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "duration",
})
export class DurationPipe implements PipeTransform {

    public transform(value: number): string {
        console.log("value: ", value);
        const floorValue = Math.floor(value);
        const seconds = floorValue % 60;
        const minutes = Math.floor(floorValue / 60);
        return String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
    }

}

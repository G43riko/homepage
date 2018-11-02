import { Pipe, PipeTransform } from "@angular/core";
import { ActivableInterface } from "../interfaces/activable.interface";

@Pipe({name: "activePipe"})
export class ActivePipe implements PipeTransform {

    public transform<T extends ActivableInterface>(items: T[], onlyActive: boolean): T[] {
        return onlyActive ? items.filter((item) => item.active) : items;
    }
}

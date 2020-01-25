import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "localTitle"
})
export class LocalTitlePipe implements PipeTransform {

  public transform(value: string | {[language: string]: string}, lang = "en"): any {
    return typeof value === "string" ? value : value[lang];
  }

}

import { ChangeDetectionStrategy, Component, ElementRef, Inject, Optional } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ObjectMergeDefinitions } from "../../../../shared/modules/object-merger/object-merge-definitions";
import { ObjectMerger, ObjectMergerResult } from "../../../../shared/modules/object-merger/object-merger";
import { Movie } from "../../models/movie.model";

interface CompareRecord<T = unknown> {
    readonly valueA: T;
    readonly property: string;
    readonly matchType: string;
    readonly valueB: T;
    readonly mergedValue: T;
}

const mergeConfig: ObjectMergeDefinitions<Movie> = {
    keys: {
        makers: {
            comparator: (a, b) => a?.name.localeCompare(b?.name),
        },
        avatar: {
            comparator: (a, b) => a?.localeCompare(b),
        }
    }
};

@Component({
    selector       : "app-movie-comparison",
    templateUrl    : "./movie-comparison.component.html",
    styleUrls      : ["./movie-comparison.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieComparisonComponent {
    public readonly compareData: CompareRecord[] = [];

    public constructor(
        private readonly elementRef: ElementRef,
        @Optional() @Inject(MAT_DIALOG_DATA) private readonly data: { original: Movie, external: Movie }
    ) {
        console.error(data);
        const mergeResult = ObjectMerger.mergeObject(data.external, data.original, mergeConfig);
        console.log("mergeResult: ", mergeResult);

        this.processObjectResult(mergeResult.objectResult as any);
    }


    private processObjectResult<T>(result: Required<ObjectMergerResult<T>>["objectResult"]): void {
        // tslint:disable-next-line:no-for-each-push
        Object.entries(result).forEach(([key, value]: [string, any]) => {
            if (!value) {
                // console.warn("null: ", value);

                return;
            }
            if (value.arrayResult) {
                return this.processArrayResult(value.arrayResult as any, key);
            }
            this.compareData.push({
                property   : key,
                matchType  : value.matchType,
                valueA     : value.valueA,
                valueB     : value.valueB,
                mergedValue: value.mergedResult,
            });
        });
    }

    private processArrayResult<T>(result: ObjectMergerResult<T>[], key: string): void {
        // tslint:disable-next-line:no-for-each-push
        result.forEach((value, index) => {
            this.compareData.push({
                property   : `${key}[${index}]`,
                valueA     : value.valueA,
                matchType  : value.matchType,
                valueB     : value.valueB,
                mergedValue: value.mergedResult,
            });
        });
    }

    public getDiffs(): number {
        return this.compareData.filter((e) => e.matchType === "UNRESOLVED").length;
    }

    public trackByFn(index: number, item: CompareRecord): string {
        return item.matchType + item.valueA + item.valueB + item.mergedValue;
    }

    public onMergeProperty(item: CompareRecord, value: "valueA" | "valueB"): void {

        (item as any).mergedValue = value === "valueA" ? item.valueA : item.valueB;
        (item as any).matchType   = "UPDATED";
    }

    public onScrollToDiff(): void {
        const unresolvedRow = this.elementRef.nativeElement.querySelector("tr.UNRESOLVED");

        if (unresolvedRow) {
            unresolvedRow.scrollIntoView({
                behavior: "smooth",
                block   : "center",
                inline  : "center",
            });
        }
    }
}

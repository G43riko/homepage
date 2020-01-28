import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FileAnalyzerComponent } from "./components/file-analyzer/file-analyzer.component";

const routes: Routes = [
    {
        path: "",
        children: [
            {
                path: "",
                component: FileAnalyzerComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AnalyzerRoutingModule {
}

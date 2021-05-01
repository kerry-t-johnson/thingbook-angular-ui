import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NbCardModule, NbListModule } from "@nebular/theme";
import { ThemeModule } from "../../@theme/theme.module";
import { DevelopmentListPageComponent } from "./components/list-page/list-page.component";

@NgModule({
    declarations: [
        DevelopmentListPageComponent,
    ],
    imports: [
        CommonModule,
        ThemeModule,
        NbCardModule,
        NbListModule,
        RouterModule.forChild([
            { path: 'list', component: DevelopmentListPageComponent }
        ])
    ]
})
export class DevelopmentModule { }

import { ModuleWithProviders, NgModule } from "@angular/core";
import { environment } from "../../../environments/environment";
import { ENVIRONMENT } from "./environment.service";

@NgModule()
export class EnvironmentModule {
    static forRoot(): ModuleWithProviders<EnvironmentModule> {
        return {
            ngModule: EnvironmentModule,
            providers: [
                { provide: ENVIRONMENT, useValue: environment }
            ]
        }
    }
}
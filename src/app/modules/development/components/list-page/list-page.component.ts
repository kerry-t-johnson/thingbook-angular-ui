import { Component, OnInit } from "@angular/core";
import { DataLoadRequest } from "thingbook-api/lib";
import { DevelopmentService } from "../../development.service";

@Component({
    selector: 'development-list',
    templateUrl: './list-page.component.html',
    styleUrls: ['./list-page.component.scss']
})
export class DevelopmentListPageComponent implements OnInit {

    requests: DataLoadRequest[];

    constructor(private devSvc: DevelopmentService) {

    }

    ngOnInit() {
        this.devSvc.getDataLoadRequests('sensor-things-test-data')
            .subscribe(requests => {
                this.requests = requests;
                console.log(this.requests);
            })
    }
}
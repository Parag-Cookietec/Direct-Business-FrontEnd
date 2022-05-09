import { Injectable } from '@angular/core';

export interface IChallanDist {
    rowToBeDistributed: Object;
    rowDistributed: Object;
}

@Injectable({
    providedIn: 'root'
})
export class ChallanDistService implements IChallanDist {
    private _rowToBeDistributed: IChallanDist['rowToBeDistributed'];
    private _rowDistributed: IChallanDist['rowDistributed'];

    constructor() {}

    set rowDistributed(value) {
        this._rowDistributed = value;
    }

    get rowDistributed() {
        return this._rowDistributed;
    }

    set rowToBeDistributed(value) {
        this._rowToBeDistributed = value;
    }

    get rowToBeDistributed() {
        return this._rowToBeDistributed;
    }
}

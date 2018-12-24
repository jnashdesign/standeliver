import 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {SERVER_URL} from './config';
import {Http} from '@angular/http';

let itemsURL = SERVER_URL + 'items/';

@Injectable()
export class ItemService {

    constructor(public http: Http) {

    }

    findAll() {
        alert("findall");
        return this.http.get(itemsURL)
            .map(res => res.json())
            .toPromise();
    }

    findById(id) {
        return this.http.get(itemsURL + id)
            .map(res => res.json())
            .toPromise();
    }

}

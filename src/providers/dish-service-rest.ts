import 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {SERVER_URL} from './config';
import {Http} from '@angular/http';

let dishesURL = SERVER_URL + 'dishes/';

@Injectable()
export class DishService {

    constructor(public http: Http) {

    }

    findAll() {
        alert("findall");
        return this.http.get(dishesURL)
            .map(res => res.json())
            .toPromise();
    }

    findById(id) {
        return this.http.get(dishesURL + id)
            .map(res => res.json())
            .toPromise();
    }

}

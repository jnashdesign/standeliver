import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {SERVER_URL} from './config';

let restaurantsURL = SERVER_URL + 'properties/',
    favoritesURL = restaurantsURL + 'favorites/';

@Injectable()
export class RestaurantService {

    constructor(public http: Http) {
        this.http = http;
    }

    findAll() {
        return this.http.get(restaurantsURL)
            .map(res => res.json())
            .toPromise();
    }

    findByName(key:string) {
        return this.http.get(restaurantsURL + "?key=" + key)
            .map(res => res.json())
            .toPromise();
    }

    findById(id) {
        return this.http.get(restaurantsURL + id)
            .map(res => res.json())
            .toPromise();
    }

    getFavorites() {
        return this.http.get(restaurantsURL)
            .map(res => res.json())
            .toPromise();
    }

    favorite(restaurant) {
        let body = JSON.stringify(restaurant),
            headers = new Headers({'Content-Type': 'application/json'}),
            options = new RequestOptions({headers: headers});
        return this.http.post(favoritesURL, body, options).toPromise();
    }

    unfavorite(favorite) {
        return this.http.delete(favoritesURL + favorite.id)
            .map(res => res.json())
            .toPromise();
    }

}

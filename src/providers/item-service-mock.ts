import {Injectable} from '@angular/core';
import items from './mock-items';

@Injectable()
export class ItemService {

    findAll() {
        return Promise.resolve(items);
    }

    findById(id) {
        return Promise.resolve(items[id - 1]);
    }

}

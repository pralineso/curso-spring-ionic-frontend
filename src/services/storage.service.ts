import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { LocalUser } from "../models/local_user";
import { Cart } from "../models/cart";

@Injectable()
export class StorageService{

    getLocalUser() : LocalUser {
        let usr = localStorage.getItem(STORAGE_KEYS.localUser); // pega a o valor q tiver la na chave nolocaluser
        if(usr == null){//se tiver nul é pq nao existe nada la
            return null;
        }
        else {//se existir ai pega 
            return JSON.parse(usr);
        }
    }

    setLocalUser(obj : LocalUser ) {
        if (obj == null){//se obj q pasosu fo rnulo é pra deixar vazio, ai remove
            localStorage.removeItem(STORAGE_KEYS.localUser);
        }
        else {//mas nao tiver nulo ai coloca a string
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }
    }

    getCart() : Cart {
        let str = localStorage.getItem(STORAGE_KEYS.cart); 
        if(str != null){
            return JSON.parse(str);
        }
        else { 
            return null
        }
    }

    setCart(obj : Cart ) {
        if (obj != null){
            localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj));
        }
        else {
            localStorage.removeItem(STORAGE_KEYS.cart);
        }
    }

}
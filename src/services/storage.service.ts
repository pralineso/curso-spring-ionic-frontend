import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { LocalUser } from "../models/local_user";

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


}
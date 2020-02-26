import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { CategoriaDTO } from "../../models/categorias.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class CategoriaService{

    constructor(public http: HttpClient){
    }

    findAll(): Observable<CategoriaDTO[]> { //CategoriaDTO[] == lista de categoriaDTO
        return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
    }
}
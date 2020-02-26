import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Passou no Interceptor");
        return next.handle(req)
        .catch((error, caught) => {

            let errorObj = error;
            //testa q o erroobj veio com campo erro do httperroresponse
            //ai se veio vai pega/guardar so o campo error, pq é o q tem praticamente td q ja tem la tratado do backend
            if (errorObj.error){
                errorObj = errorObj.error;
            }

            //caso a resposta venha no tipo texto ai converte pra json7
            //por isos q verifica se o camo erro veio com status, pq se veio..é certo q ja em json, mas senao.. converte
            if(!errorObj.status){
                errorObj = JSON.parse(errorObj);
            }

            console.log("Erro detectado pelo interceptor:");
            console.log(errorObj);

            return Observable.throw(errorObj);
        }) as any;
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};
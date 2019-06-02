import { HttpInterceptor, HttpHeaders, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


export class ErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {

        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                console.log(error);
                alert(error.error.error);
                return throwError(error);
            })
        );
    }
}
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { error } from "console";
import { Observable, catchError, tap, throwError } from "rxjs";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const { method, url, body } = request;

        console.log(`Incoming Request: ${method} ${url}`);
        console.log('Request Body: ', body);

        const now = Date.now();
        return next.handle().pipe(
            tap(()=> {
                console.log(`Response Sent: ${method} ${url} - ${Date.now() - now}ms`);
            }),
            catchError((error) => {
                console.error(`❌ Error in ${method} ${url}:`, error.message);
                return throwError(() => error);
            }),
        );
    }
}
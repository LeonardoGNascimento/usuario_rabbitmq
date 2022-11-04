import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RequestException } from '../exception';

@Catch(RequestException)
export class RequestExceptionFilter
  implements RpcExceptionFilter<RequestException>
{
  catch(exception: RequestException, host: ArgumentsHost): Observable<any> {
    return throwError(() => exception.body);
  }
}

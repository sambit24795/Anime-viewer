import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { from, Observable, of, throwError } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { Plugins } from "@capacitor/core";

Injectable();
export class CacheInterceptorService implements HttpInterceptor {
  private CACHE_KEY = "cacheKey";
  private cache = {};

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let cacheKey: string;

    if (window.localStorage) {
      cacheKey = localStorage.getItem(this.CACHE_KEY);
    }

    return from(Plugins.Storage.get({ key: this.CACHE_KEY })).pipe(
      switchMap((key) => {
        if (key.value === req.urlWithParams) {
          console.log(key.value === req.urlWithParams);
          return of(null);
        } else {
          return next.handle(req).pipe(
            map((res) => {
              localStorage.removeItem(this.CACHE_KEY);
              if (res.type === HttpEventType.Response && res.status === 200) {
                if (window.localStorage) {
                  localStorage.setItem(this.CACHE_KEY, req.urlWithParams);
                }

                Plugins.Storage.set({
                  key: this.CACHE_KEY,
                  value: req.urlWithParams,
                });

                this.cache[req.urlWithParams] = res.body;
                return res;
              }
            }),
            catchError((err) => throwError(err))
          );
        }
      })
    );

    /* Plugins.Storage.get({ key: this.CACHE_KEY }).then((key) => {
      cacheKey = key.value;
      console.log(cacheKey === req.urlWithParams);
      if (cacheKey !== req.urlWithParams) {
        return of(null);
      }
    }); */
  }
}

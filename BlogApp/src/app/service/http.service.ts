import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { util } from '../tool/utils';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient, private router: Router) {}
  getJson<T>(url: string, args?: any) {
    const requestUrl = args ? url + `?${util.jsonToUrlParams(args)}` : url;
    return this.http.get<T>(requestUrl, {
      responseType: 'json',
      withCredentials: true,
    });
  }

  get(url: string, args?: any, responseType?: string) {
    const requestUrl = args ? url + `?${util.jsonToUrlParams(args)}` : url;
    const type = responseType;
    if (type) return this.http.get(requestUrl, {
      responseType: JSON.parse(type),
      withCredentials: true
    });
    return this.http.get(requestUrl, {
      withCredentials: true
    });
  }

  postJson<T>(url: string, json: any) {
    const header = new HttpHeaders();
    header.append('Content-Type', 'application/json;charset=UTF-8');
    return this.http.post<T>(url, json, {
      headers: header,
      withCredentials: true
    });
  }

  postFormData(url: string, formData: FormData) {
    const header = new HttpHeaders();
    return this.http.post(url, formData, {
      headers: header,
      withCredentials: true
    })
  }
}
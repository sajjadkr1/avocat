import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    constructor(private http: HttpClient) {}

    getAllAvocats() {

        const token = localStorage.getItem('token');

        return this.http.get(
            'http://localhost:5000/api/admin/avocats',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    }

    deleteAvocat(id: number) {

        const token = localStorage.getItem('token');

        return this.http.delete(
            `http://localhost:5000/api/admin/avocats/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    }
updateAvocat(id: number, avocat: any) {
    const token = localStorage.getItem('token');
    return this.http.put(
        `http://localhost:5000/api/admin/avocats/${id}`,
        avocat,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
}
addAvocat(avocat: any) {
    const token = localStorage.getItem('token');

    return this.http.post(
         'http://localhost:5000/api/admin/avocats',
         avocat,
         {
            headers: {
                Authorization: `Bearer ${token}`
            }
         }
    );


}
}
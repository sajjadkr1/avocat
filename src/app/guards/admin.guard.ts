import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";


export const adminGuard: CanActivateFn = () => {

    const router = inject(Router);

    const token = localStorage.getItem('token');

    if (!token) {
        return router.createUrlTree(['/login']);
    }

    
   const payload = JSON.parse(atob(token.split('.')[1]));
    
   if ( payload.role === 'admin') {
    return true;
   }
   
return router.createUrlTree(['/login']);

};
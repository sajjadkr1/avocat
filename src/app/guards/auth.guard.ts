import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {

    const router = inject(Router);
    const token = localStorage.getItem('token');

    if (!token) {
        return router.createUrlTree(['/login']);
    }

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));

        const maintenant = Math.floor(Date.now() / 1000);

        if (!payload.exp || payload.exp <= maintenant) {
            localStorage.removeItem('token');
            return router.createUrlTree(['/login']);
        }

        return true;

    } catch (error) {
        localStorage.removeItem('token');
        return router.createUrlTree(['/login']);
    }

};
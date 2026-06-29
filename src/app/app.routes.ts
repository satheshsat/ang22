import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/auth',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes').then((m) => m.routes)
    },
    {
        path: 'account',
        loadChildren: () => import('./account/account.routes').then((m) => m.routes)
    }
];
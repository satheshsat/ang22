import { Routes } from '@angular/router';
import { Auth } from './auth';
import { authGuard } from '../guard/auth-guard';

export const routes: Routes = [
    {
        path: '',
        component: Auth,
        canActivateChild: [authGuard],
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'login'
            },
            {
                path: 'login',
                loadComponent: () => import('./login/login').then(m => m.Login),
            },
            {
                path: 'register',
                loadComponent: () => import('./register/register').then(m => m.Register),
            },
            {
                path: 'resetpass',
                loadComponent: () => import('./resetpass/resetpass').then(m => m.Resetpass),
            }
        ]
    }
];
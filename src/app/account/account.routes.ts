import { Routes } from '@angular/router';
import { Account } from './account';
import { accountGuard } from '../guard/account-guard';

export const routes: Routes = [
    {
        path: '',
        component: Account,
        canActivateChild: [accountGuard],
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'profile'
            },
            {
                path: 'profile',
                loadComponent: () => import('./profile/profile').then(m => m.Profile),
            },
        ]
    }
];
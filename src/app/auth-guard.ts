import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const userEmail = localStorage.getItem('userEmail');

  if(userEmail){
    return true;
  }

  return inject(Router).parseUrl('/login');
};

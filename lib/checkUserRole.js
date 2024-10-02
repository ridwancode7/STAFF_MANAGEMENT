"use client"
// import { useEffect } from 'react';
// import { useRouter } from 'next/router';
import storage from '@/lib/token';

const checkUserRole = (requiredRole, loginURL) => {
  // const router = useRouter();

    if (typeof window === 'undefined') {
      return;
    }

    const authUser = storage.getCookie('authUser');
    if (authUser) {
      const user = JSON.parse(authUser);
      if (user.role !== requiredRole) {
        // Erase cookies and session
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
        storage.eraseCookie('authToken');
        storage.eraseCookie('authUser');
        // Redirect to login page
        // router.push(loginURL);
      }
    } else {
      // router.push(loginURL);
    }
};

export default checkUserRole;

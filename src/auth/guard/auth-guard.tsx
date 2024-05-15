import { useState, useEffect, useCallback } from 'react';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { SplashScreen } from 'src/components/loading-screen';

import { useAuthContext } from '../hooks';
import { APP_TOKEN } from 'src/configs/globalConstants';

// ----------------------------------------------------------------------

const loginPaths: Record<string, string> = {
  jwt: paths.auth.jwt.login,
};

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

function Container({ children }: Props) {
  const router = useRouter();
  const { method } = useAuthContext();

  const check = useCallback(() => {
    const app_token = localStorage.getItem(APP_TOKEN);
    // todo 后续补充登录时，再解开
    if (!(app_token && app_token.length)) {
      const searchParams = new URLSearchParams({
        returnTo: window.location.pathname,
      }).toString();

      const loginPath = loginPaths[method];

      const href = `${loginPath}?${searchParams}`;

      router.replace(href);
    }
  }, [method, router]);

  useEffect(() => {
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}

export default function AuthGuard({ children }: Props) {
  return <Container>{children}</Container>;
}

// ----------------------------------------------------------------------

// function Container({ children }: Props) {
//   const router = useRouter();

//   const { authenticated, method } = useAuthContext();

//   const [checked, setChecked] = useState(false);

//   const check = useCallback(() => {
//     debugger;
//     if (!authenticated) {
//       const searchParams = new URLSearchParams({
//         returnTo: window.location.pathname,
//       }).toString();

//       const loginPath = loginPaths[method];

//       const href = `${loginPath}?${searchParams}`;

//       router.replace(href);
//     } else {
//       setChecked(true);
//     }
//   }, [authenticated, method, router]);

//   useEffect(() => {
//     check();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   if (!checked) {
//     return null;
//   }

//   return <>{children}</>;
// }

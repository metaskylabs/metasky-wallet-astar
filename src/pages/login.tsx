import Authentication from '@components/Authentication';
import PrivateRoute from '@components/PrivateRoute';
import NOOB from '@constants/noob';
import { logEvent } from '@utils/amplitude';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
export default function Login() {
  const router = useRouter();

  return (
    <PrivateRoute onLoginSuccess={router.query.whitelist ? NOOB : undefined}>
      <Authentication isPopUp={false} />
    </PrivateRoute>
  );
}

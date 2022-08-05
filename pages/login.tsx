import Head from 'next/head';
import { useRouter } from 'next/router';
import { useUser } from 'contexts/user';

function Login() {
  const router = useRouter();
  const { login } = useUser();

  async function loginToRedirect() {
    await login();
    router.push('/');
  }

  return (
    <div>
      <Head>
        <title>Docploy Login</title>
      </Head>

      <h1 className="font-bold mb-4 text-5xl text-center">Login</h1>
      <h2 className="m-auto max-w-2xl mb-12 text-2xl text-center text-slate-500">
        Login using GitHub
      </h2>

      <div className="text-center">
        <button
          onClick={loginToRedirect}
          className="bg-black w-448 font-bold text-white p-4 rounded-md"
        >
          Login with GitHub
        </button>
      </div>
    </div>
  );
}

export default Login;

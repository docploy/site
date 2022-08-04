import Head from 'next/head';
import { useUser } from 'contexts/user';

function Login() {
  const { login } = useUser();

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
          onClick={login}
          className="bg-black w-448 font-bold text-white p-4 rounded-md"
        >
          Login with GitHub
        </button>
      </div>
    </div>
  );
}

export default Login;

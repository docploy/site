import axios from 'axios';
import { usePlausible } from 'next-plausible';
import { useState } from 'react';

type Props = {
  event: string;
};

const STATUS = {
  DEFAULT: 'DEFAULT',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

function EmailSignup(props: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(STATUS.DEFAULT);
  const plausible = usePlausible();

  const { event = 'Unknown' } = props;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email.length < 3) {
      setStatus(STATUS.ERROR);
      return;
    }

    const response = await axios({
      method: 'POST',
      url: '/api/subscriber',
      data: {
        email,
      },
    });

    if (response.status === 200) {
      setStatus(STATUS.SUCCESS);
    } else {
      setStatus(STATUS.ERROR);
    }

    plausible(event, {
      props: {
        code: response.status,
      },
    });

    return;
  }

  return (
    <div>
      <div className="m-auto max-w-xl">
        <form
          onSubmit={(e) => onSubmit(e)}
          className="flex space-x-2 justify-center"
        >
          <input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="me@example.com"
            className="border-2 border-neutral-800 focus:outline-0 grow px-6 py-4 rounded"
          />
          <input
            type="submit"
            value="Subscribe"
            className="bg-neutral-800 cursor-pointer font-bold px-6 py-4 rounded text-white"
          />
        </form>
        {status === STATUS.ERROR && (
          <span className="text-red-500">
            Please enter a valid email address.
          </span>
        )}

        {status === STATUS.SUCCESS && (
          <span className="text-green-600">
            Success. Please confirm your email.
          </span>
        )}
      </div>
    </div>
  );
}

export default EmailSignup;

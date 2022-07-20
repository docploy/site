import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    body: { email },
    method,
  } = req;

  if (method === 'POST') {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'X-MailerLite-ApiDocs': 'true',
        'Content-Type': 'application/json',
        'X-MailerLite-ApiKey': process.env.MAILERLITE_API_KEY || '',
      },
      body: JSON.stringify({ email, resubscribe: true, type: 'unconfirmed' }),
    };

    const response = await fetch(
      'https://api.mailerlite.com/api/v2/subscribers',
      options
    );
    const status = response.status;

    return res.status(status).end();
  }
  res.setHeader('Allow', ['POST']);
  return res.status(405).end(`Method ${method} Not Allowed`);
}

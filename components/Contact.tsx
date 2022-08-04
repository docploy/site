import React, { useState } from 'react';

import axios from 'axios';

function Contact() {
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: '' },
  });

  const [inputs, setInputs] = useState({
    email: '',
    message: '',
  });

  function handleServerResponse(ok: boolean, msg: string) {
    if (ok) {
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg: msg },
      });
      setInputs({
        email: '',
        message: '',
      });
    } else {
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: true, msg: msg },
      });
    }
  }

  function handleOnChange(
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    e.persist();
    setInputs((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
    setStatus({
      submitted: false,
      submitting: false,
      info: { error: false, msg: '' },
    });
  }

  function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus((prevStatus) => ({ ...prevStatus, submitting: true }));
    axios({
      method: 'POST',
      url: 'https://formspree.io/f/xknewzry',
      data: inputs,
    })
      .then((response) => {
        handleServerResponse(
          true,
          'Your message has been sent. We will respond as soon as possible.'
        );
      })
      .catch((error) => {
        handleServerResponse(false, error.response.data.error);
      });
  }

  return (
    <div>
      <form onSubmit={handleOnSubmit} className="flex flex-col">
        <label htmlFor="email" className="font-bold mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="_replyto"
          onChange={handleOnChange}
          required
          value={inputs.email}
          placeholder="Enter your email here"
          className="border-2 border-neutral-200 focus:outline-none mb-4 p-4 rounded-sm"
        />

        <label htmlFor="message" className="font-bold mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          onChange={handleOnChange}
          required
          value={inputs.message}
          className="border-2 border-neutral-200 focus:outline-none h-48 mb-4 p-4 resize-none rounded-sm"
        />

        <div className="flex">
          <button
            type="submit"
            disabled={status.submitting}
            className="bg-black font-bold inline p-4 rounded-md text-white"
          >
            {!status.submitting
              ? !status.submitted
                ? 'Submit'
                : 'Submitted'
              : 'Submitting...'}
          </button>
        </div>
      </form>
      {status.info.error && (
        <p className="my-2">
          There was an error submitting the form: {status.info.msg}
        </p>
      )}
      {!status.info.error && status.info.msg && (
        <p className="my-2">{status.info.msg}</p>
      )}
    </div>
  );
}

export default Contact;

import {faApple, faGoogle} from '@fortawesome/free-brands-svg-icons';
import {faCopy} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Head from 'next/head';
import React from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
console.log('baseUrl', baseUrl);

export default function Home() {
  const calendarUrls = {
    apple: {
      mnt: `webcal://${baseUrl}/api/mnt-calendar`,
      wnt: `webcal://${baseUrl}/api/wnt-calendar`,
    },
    google: {
      mnt: `https://calendar.google.com/calendar/r?cid=webcal://${baseUrl}/api/mnt-calendar`,
      wnt: `https://calendar.google.com/calendar/r?cid=webcal://${baseUrl}/api/wnt-calendar`,
    },
  };

  const handleCopyToClipboard = async (inputValue: string) => {
    try {
      await navigator.clipboard.writeText(inputValue);
      toast.success('Copied to clipboard');
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:.py-12">
      <Head>
        <title>US Soccer Calendar Subscriptions</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm background-opacity-50 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-4xl font-bold text-blue mb-6 text-center">
            US Soccer Calendar Subscriptions
          </h1>
          <p className="mb-4 text-gray-600">
            Stay up-to-date with the USMNT and USWNT soccer schedules. This site uses an unofficial
            USSoccer.com API to fetch the upcoming matches. All times will be converted to your
            local time by your calendar application.
          </p>

          <div className="flex flex-col space-y-4">
            <div>
              <h2 className="text-2xl font-semibold text-blue mb-2">USMNT (Men's National Team)</h2>
              <div className="flex space-x-2">
                <a
                  href={calendarUrls.apple.mnt}
                  className="bg-blue text-white py-2 px-4 rounded hover:bg-opacity-80 flex items-center space-x-1"
                >
                  <FontAwesomeIcon icon={faApple} className="w-4 h-4" />
                  <span>iOS / Mac Calendar</span>
                </a>
                <a
                  href={calendarUrls.google.mnt}
                  className="bg-blue text-white py-2 px-4 rounded hover:bg-opacity-80 flex items-center space-x-1"
                >
                  <FontAwesomeIcon icon={faGoogle} className="w-4 h-4" />
                  <span>Google Calendar</span>
                </a>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-red mb-2">
                USWNT (Women's National Team)
              </h2>
              <div className="flex space-x-2">
                <a
                  href={calendarUrls.apple.wnt}
                  className="bg-red text-white py-2 px-4 rounded hover:bg-opacity-80 flex items-center space-x-1"
                >
                  <FontAwesomeIcon icon={faApple} className="w-4 h-4" />
                  <span>iOS / Mac Calendar</span>
                </a>
                <a
                  href={calendarUrls.google.wnt}
                  className="bg-red text-white py-2 px-4 rounded hover:bg-opacity-80 flex items-center space-x-1"
                >
                  <FontAwesomeIcon icon={faGoogle} className="w-4 h-4" />
                  <span>Google Calendar</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold text-blue mb-2 leading-loose">
              Manual Subscription Instructions
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              If the buttons above don't work for your device or calendar application, you can
              follow these manual steps to subscribe to the calendars:
            </p>
            <ol className="list-decimal list-inside text-sm text-gray-600 mt-1">
              <li>Copy the ICS feed URL for the desired calendar:</li>

              <div className="input-group my-2 w-full flex">
                <span className="bg-blue text-white">USMNT</span>
                <input
                  id="usmnt-url"
                  type="text"
                  value={calendarUrls.apple.mnt}
                  readOnly
                  className="input input-bordered bg-gray-100 flex-grow"
                />
                <button
                  className="btn bg-blue text-white border-0"
                  onClick={() => handleCopyToClipboard(calendarUrls.apple.mnt)}
                >
                  <FontAwesomeIcon icon={faCopy} className="w-4 h-4" />
                </button>
              </div>

              <div className="input-group my-2 w-full flex">
                <span className="bg-red text-white">USWNT</span>
                <input
                  id="usmnt-url"
                  type="text"
                  value={calendarUrls.apple.wnt}
                  readOnly
                  className="input input-bordered bg-gray-100 flex-grow"
                />
                <button
                  className="btn bg-red text-white border-0"
                  onClick={() => handleCopyToClipboard(calendarUrls.apple.mnt)}
                >
                  <FontAwesomeIcon icon={faCopy} className="w-4 h-4" />
                </button>
              </div>

              <li className="mt-2">Open your preferred calendar application.</li>
              <li className="mt-2">
                Find the option to "Add Calendar," "Subscribe to Calendar," or similar.
              </li>
              <li className="mt-2">
                Paste the ICS feed URL you copied earlier into the appropriate field.
              </li>
              <li className="mt-2">
                Follow your calendar application's instructions to complete the subscription
                process.
              </li>
            </ol>
          </div>

          <footer className="mt-5 text-center">
            <a href="http://mstdn.social/@codybrom">Made by Cody</a>
          </footer>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

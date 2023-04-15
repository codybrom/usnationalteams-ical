import Head from 'next/head';

const baseUrl = process.env.VERCEL_URL;

export default function Home() {
  const calendarUrls = {
    apple: {
      mnt: 'webcal://example.com/api/mnt-calendar',
      wnt: 'webcal://example.com/api/wnt-calendar',
    },
    google: {
      mnt: 'https://calendar.google.com/calendar/u/0/r/settings/addbyurl?url=https%3A%2F%2Fexample.com%2Fapi%2Fmnt-calendar',
      wnt: 'https://calendar.google.com/calendar/u/0/r/settings/addbyurl?url=https%3A%2F%2Fexample.com%2Fapi%2Fwnt-calendar',
    },
    outlook: {
      mnt: 'https://outlook.live.com/owa/?path=/calendar/view/Month&tzone=UTC&import=https%3A%2F%2Fexample.com%2Fapi%2Fmnt-calendar',
      wnt: 'https://outlook.live.com/owa/?path=/calendar/view/Month&tzone=UTC&import=https%3A%2F%2Fexample.com%2Fapi%2Fwnt-calendar',
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:.py-12">
      <Head>
        <title>US Soccer Calendar Subscriptions</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm background-opacity-50 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-4xl font-bold text-blue mb-6 text-center">
            US Soccer Calendar Subscriptions
          </h1>
          <p className="mb-4 text-gray-600">
            Stay up-to-date with the USMNT and USWNT soccer schedules! Subscribe to our ICS feeds
            and never miss a match again.
          </p>

          <div className="flex flex-col space-y-4">
            <div>
              <h2 className="text-2xl font-semibold text-blue mb-2">USMNT (Men's National Team)</h2>
              <div className="flex space-x-2">
                <a
                  href={calendarUrls.apple.mnt}
                  className="bg-blue text-white py-2 px-4 rounded hover:bg-opacity-80"
                >
                  Apple Calendar
                </a>
                <a
                  href={calendarUrls.google.mnt}
                  className="bg-blue text-white py-2 px-4 rounded hover:bg-opacity-80"
                >
                  Google Calendar
                </a>
                <a
                  href={calendarUrls.outlook.mnt}
                  className="bg-blue text-white py-2 px-4 rounded hover:bg-opacity-80"
                >
                  Outlook
                </a>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-blue mb-2">
                USWNT (Women's National Team)
              </h2>
              <div className="flex space-x-2">
                <a
                  href={calendarUrls.apple.wnt}
                  className="bg-red text-white py-2 px-4 rounded hover:bg-opacity-80"
                >
                  Apple Calendar
                </a>
                <a
                  href={calendarUrls.google.wnt}
                  className="bg-red text-white py-2 px-4 rounded hover:bg-opacity-80"
                >
                  Google Calendar
                </a>
                <a
                  href={calendarUrls.outlook.wnt}
                  className="bg-red text-white py-2 px-4 rounded hover:bg-opacity-80"
                >
                  Outlook
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm text-gray-600">
              *To add these ICS feeds to your preferred calendar platform, simply click the desired
              button and follow your platform's instructions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import ical from 'ical-generator';
import fetch from 'node-fetch';

const matchesUrl = 'https://www.ussoccer.com/api/matches/upcoming/contestant/e70zl10x0ayu7y10ry0wi465a';

export default async (req, res) => {
  // Fetch the matches data from the provided URL
  const response = await fetch(matchesUrl);
  const matches = await response.json();

  // Create a new iCal calendar
  const calendar = ical({ name: 'US Women\'s Soccer Team' });

  // Loop through the matches and add them to the calendar
  matches.forEach(match => {
    const startDate = new Date(match.dateTime);
    const endDate = new Date(startDate.getTime() + 120 * 60 * 1000); // Assuming 120 minutes per match

    // Replace "United States" with "USWNT" in the summary
    const summary = match.description.replace('United States', 'USWNT');

    // Add competition details and broadcaster names to the description, if available
    const competition = match.competition
      ? `Competition: ${match.competition.name}\n`
      : '';
    const broadcasterNames = match.broadcastLinks
      ? match.broadcastLinks.map(b => b.imageAltText).join(', ')
      : 'TBD';
    const broadcasterLabel = match.broadcastLinks && match.broadcastLinks.length === 1
      ? 'Broadcaster'
      : 'Broadcasters';
    const description = `${competition}${broadcasterLabel}: ${broadcasterNames}`;

    calendar.createEvent({
      start: startDate,
      end: endDate,
      summary: summary,
      description: description,
      location: `${match.venue.longName}, ${match.venue.location}, ${match.venue.country}`,
      url: `https://www.ussoccer.com${match.matchFeedUrl}`, // No label for the link
    });
  });

  // Set the response headers and send the generated iCal data
  res.setHeader('Content-Type', 'text/calendar;charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename=calendar.ics');
  res.send(calendar.toString());
};
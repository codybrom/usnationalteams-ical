import ical from 'ical-generator';
import fetch from 'node-fetch';

const matchesUrl = 'https://www.ussoccer.com/api/matches/upcoming/contestant/e70zl10x0ayu7y10ry0wi465a';

export default async (req, res) => {
  // Fetch the matches data from the provided URL
  const response = await fetch(matchesUrl);
  const matches = await response.json();

  // Create a new iCal calendar
  const calendar = ical({
    name: 'US Women\'s Soccer Team'
  });

  // Loop through the matches and add them to the calendar
  matches.forEach(match => {
    const homeTeam = match.contestants.find(team => team.position === 'home');
    const awayTeam = match.contestants.find(team => team.position === 'away');

    if (!homeTeam || !awayTeam) {
      console.warn('Skipping match with missing team information:', match);
      return;
    }

    const homeTeamName = homeTeam.name || homeTeam.code;
    const awayTeamName = awayTeam.name || awayTeam.code;

    // Replace "USA" and "United States" with "USMNT" in the summary
    const summary = `${homeTeamName} vs ${awayTeamName}`
      .replace('USA', 'USWNT')
      .replace('United States', 'USWNT');

    const isAllDay = match.time.toLowerCase() === 'tbd';

    const startDate = new Date(match.date);
    const endDate = new Date(match.date);

    if (isAllDay) {
      startDate.setUTCHours(0, 0, 0);
      endDate.setUTCHours(23, 59, 59);
    } else {
      const timeParts = match.time.split(':');
      startDate.setUTCHours(parseInt(timeParts[0]), parseInt(timeParts[1]));
      endDate.setUTCHours(startDate.getUTCHours() + 2); // Assuming 120 minutes per match
    }

    // Add competition details and broadcaster names to the description, if available
    const competition = match.competition ?
      `Competition: ${match.competition.name}\n` :
      '';
    const broadcasterNames = match.broadcastLinks ?
      match.broadcastLinks.map(b => b.imageAltText).join(', ') :
      'TBD';
    const broadcasterLabel = match.broadcastLinks && match.broadcastLinks.length === 1 ?
      'Broadcaster' :
      'Broadcasters';
    const description = `${competition}${broadcasterLabel}: ${broadcasterNames}`;

    const location = match.venue && match.venue.name && match.venue.city && match.venue.country && match.venue.country.name ?
      `${match.venue.name}, ${match.venue.city}, ${match.venue.country.name}` :
      'TBD';

    calendar.createEvent({
      start: startDate,
      end: endDate,
      summary: summary,
      description: description,
      location: location,
      url: `https://www.ussoccer.com${match.matchFeedUrl}`,
      allDay: isAllDay,
    });
  });

  // Set the response headers and send the generated iCal data
  res.setHeader('Content-Type', 'text/calendar;charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename=calendar.ics');
  res.send(calendar.toString());
};
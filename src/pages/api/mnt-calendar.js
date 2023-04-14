import ical from 'ical-generator';
import fetch from 'node-fetch';

const matchesUrl = 'https://www.ussoccer.com/api/matches/upcoming/contestant/9vh2u1p4ppm597tjfahst2m3n';

export default async (req, res) => {
  // Fetch the matches data from the provided URL
  const response = await fetch(matchesUrl);
  const matches = await response.json();

  // Create a new iCal calendar
  const calendar = ical({ name: 'US Men\'s Soccer Team' });

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
      .replace('USA', 'USMNT')
      .replace('United States', 'USMNT');

      const timeParts = match.time.split(':');
      const startDate = new Date(match.date);
      startDate.setUTCHours(parseInt(timeParts[0]), parseInt(timeParts[1]));

      if (match.time.toLowerCase() === 'tbd') {
        const endDate = setDate(startDate.getDate() + 1);
        endDate.setUTCHours(startDate.getUTCHours() + 2); // Assuming 120 minutes per match
      } else {
        const endDate = new Date(startDate);
        endDate.setUTCHours(startDate.getUTCHours() + 2); // Assuming 120 minutes per match
      }

    // Add competition details to the description, if available
    const competition = match.competition
      ? `Competition: ${match.competition.name}\n`
      : '';

    const description = competition;

    calendar.createEvent({
      start: startDate,
      end: endDate,
      summary: summary,
      description: description,
      location: `${match.venue.name}, ${match.venue.city}, ${match.venue.country.name}`,
      url: `https://www.ussoccer.com`, // No match-specific URL available in the JSON
      allDay: isAllDay,
    });
  });

  // Set the response headers and send the generated iCal data
  res.setHeader('Content-Type', 'text/calendar;charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename=calendar.ics');
  res.send(calendar.toString());
};
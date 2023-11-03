const $navigation = document.getElementById("nav");
const $clock = document.getElementById("clock");
const $lineup = document.getElementById("lineup");

// HEADER

function getHTMLForNavigation(navigation) {
  let html = "";
  if (navigation.link) {
    html += `
        <li><a target=_blank href="${navigation.link}"</a>${navigation.name}</li>`;
  } else
    html += `
    <li><a href="#"</a>${navigation.name}</li>`;
  return html;
}

function getHTMLForNavigations(navigations) {
  let temp = "";
  for (const navigation of navigations) {
    temp += getHTMLForNavigation(navigation);
  }
  return temp;
}

$navigation.innerHTML = getHTMLForNavigations(navigation);

// CLOCK

const countdownTime = new Date(clock).getTime();

const secondsInDay = 60 * 60 * 24;
const secondsInHour = 60 * 60;
const secondsInMinute = 60;

function countdownClock() {
  const timeNow = new Date().getTime();
  const time = countdownTime - timeNow;

  const days = Math.floor(time / (1000 * secondsInDay));
  const hours =
    Math.floor((time % (1000 * secondsInDay)) / (1000 * secondsInHour)) + 1;
  const minutes = Math.floor(
    (time % (1000 * secondsInHour)) / (1000 * secondsInMinute)
  );
  const seconds = Math.floor((time % (1000 * secondsInMinute)) / 1000);
  const countdownClock = `${days}d ${hours}h ${minutes}m ${seconds}s`;

  $clock.innerHTML = getHTMLForClock(countdownClock);
}

setInterval(countdownClock, 1000);

function getHTMLForClock(countdownClock) {
  let html = "";
  html += `<h2>${countdownClock}</h2>`;
  return html;
}

// LINE UP

function getHTMLForArtist(artist) {
  html = "";
  html += `<li data-id="${artist.id}">
  <a href="#description">
  <h1>${artist.artist.name}</h1>
  <p>${artist.stage} | ${getStringForArtistDates(
    artist
  )} ${getStringForArtistTime(artist)}</p>
  <img src="${artist.artist.image}" alt="${artist.artist.name}">
  </a>
  </li>`;
  return html;
}

function getStringForArtistDates(artist) {
  const date = new Date(artist.from);
  let day = date.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  let month = date.getMonth();
  if (month < 10) {
    month = "0" + month;
  }

  return `${day}/${month}`;
}

function getStringForArtistTime(artist) {
  const timeFrom = new Date(artist.from);
  const timeTo = new Date(artist.to);
  let hourFrom = timeFrom.getHours();
  if (hourFrom < 10) {
    hourFrom = "0" + hourFrom;
  }
  let minutesFrom = timeFrom.getMinutes();
  if (minutesFrom < 10) {
    minutesFrom = "0" + minutesFrom;
  }
  let hourTo = timeTo.getHours();
  if (hourTo < 10) {
    hourTo = "0" + hourTo;
  }
  let minutesTo = timeTo.getMinutes();
  if (minutesTo < 10) {
    minutesTo = "0" + minutesTo;
  }
  return `${hourFrom}.${minutesFrom}-${hourTo}.${minutesTo}`;
}

function getHTMLForArtists(artists) {
  let temp = "";
  for (const artist of artists) {
    temp += getHTMLForArtist(artist);
  }
  return temp;
}

$lineup.innerHTML = getHTMLForArtists(lineup);

// ARTISTS DESCRIPTION

const $artists = document.querySelectorAll("#lineup li");
const $description = document.getElementById("description");

for (const $artist of $artists) {
  $artist.addEventListener("click", function (e) {
    const id = e.currentTarget.dataset.id;
    const artist = lineup.find((artist) => {
      return artist.id === id;
    });
    let descHtml = "";
    descHtml += `<img src="${artist.artist.image}" alt="${artist.artist.name}">`;
    descHtml += `<p>${artist.stage} | ${getStringForArtistDates(
      artist
    )} ${getStringForArtistTime(artist)}</p>`;
    descHtml += `<h1>${artist.artist.name}</h1>`;
    if (artist.artist.socials) {
      descHtml += getHTMLForSocials(artist.artist.socials);
    }
    descHtml += `<p>${artist.artist.description}</p>`;

    $description.innerHTML = descHtml;
  });
}

function getHTMLForSocials(socials) {
  let html = "";
  if (socials.twitter) {
    html += `<ul>
    <li><a target=_blank href="${socials.instagram}">Instagram</a></li>
    <li><a target=_blank href="${socials.twitter}">Twitter</a></li>
    <li><a target=_blank href="${socials.spotify}">Spotify</a></li>
    <li><a target=_blank href="${socials.youtube}">Youtube</a></li>
    </ul>`;
  } else
    html += `<ul>
  <li><a target=_blank href="${socials.instagram}">Instagram</a></li>
  <li><a target=_blank href="${socials.spotify}">Spotify</a></li>
  <li><a target=_blank href="${socials.youtube}">Youtube</a></li>
  </ul>`;
  return html;
}

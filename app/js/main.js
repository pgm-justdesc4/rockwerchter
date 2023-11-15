const $navigation = document.getElementById("nav");
const $clock = document.getElementById("clock");
const $lineup = document.getElementById("lineup");
const $description = document.getElementById("description");

function getPadStart(number) {
  if (number < 10) {
    number = "0" + number;
  }
  return number;
}

// HEADER

function getHTMLForNavigation(navigation) {
  if (navigation.type === "external") {
    return `<li><a target=_blank href="${navigation.link}"</a>${navigation.name}</li>`;
  } else {
    return `<li><a href="${navigation.link}"</a>${navigation.name}</li>`;
  }
}

function getHTMLForNavigations(navigations) {
  let temp = "";
  for (const navigation of navigations) {
    temp += getHTMLForNavigation(navigation);
  }
  return temp;
}

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

  const countdownClock = `${getPadStart(days)}d ${getPadStart(
    hours
  )}h ${getPadStart(minutes)}m ${getPadStart(seconds)}s`;

  $clock.innerHTML = getHTMLForClock(countdownClock);
}

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

  const day = getPadStart(date.getDate());
  const month = getPadStart(date.getMonth());

  return `${day}/${month}`;
}

function getStringForArtistTime(artist) {
  const timeFrom = new Date(artist.from);
  const timeTo = new Date(artist.to);

  const hourFrom = getPadStart(timeFrom.getHours());
  const minutesFrom = getPadStart(timeFrom.getMinutes());
  const hourTo = getPadStart(timeTo.getHours());
  const minutesTo = getPadStart(timeTo.getMinutes());

  return `${hourFrom}.${minutesFrom}-${hourTo}.${minutesTo}`;
}

function getHTMLForArtists(artists) {
  let temp = "";
  for (const artist of artists) {
    temp += getHTMLForArtist(artist);
  }
  return temp;
}

// ARTISTS DESCRIPTION

function registerListeners() {
  const $artists = document.querySelectorAll("#lineup li");
  for (const $artist of $artists) {
    $artist.addEventListener("click", function (e) {
      const id = e.currentTarget.dataset.id;
      const artist = lineup.find((artist) => {
        return artist.id === id;
      });
      $description.classList.remove("close");

      let descHtml = `<div class="container">`;

      descHtml += `<img src="${artist.artist.image}" alt="${artist.artist.name}">`;
      descHtml += `<div class='desc-text'><h2>${
        artist.stage
      } | ${getStringForArtistDates(artist)} ${getStringForArtistTime(
        artist
      )}</h2>`;
      descHtml += `<h1>${artist.artist.name}</h1>`;
      descHtml += getHTMLForSocials(artist.artist.socials);
      descHtml += `<p>${artist.artist.description}</p></div>`;
      descHtml += `<div class="close-button">
      <p>
      <a href='#' onclick='closeDescription(event)'>X</a></p></div>`;
      descHtml += "</div>";

      $description.innerHTML = descHtml;
    });
  }
}

function getHTMLForSocials(socials) {
  let html = "<ul>";
  for (const key in socials) {
    if (socials[key]) {
      html += `<li><a target="_blank" href="${socials[key]}"><img src="images/${key}.svg" alt="${key}"></a></li>`;
    }
  }
  html += "</ul>";
  return html;
}

function closeDescription(event) {
  event.preventDefault();
  $description.classList.add("close");
}

// BUILD USER INTERFACE

function buildUI() {
  $lineup.innerHTML = getHTMLForArtists(lineup);
  $navigation.innerHTML = getHTMLForNavigations(navigation);
  countdownClock();
  setInterval(countdownClock, 1000);
  registerListeners();
}

function initialize() {
  buildUI();
  registerListeners();
}

initialize();

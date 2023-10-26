const $navigation = document.getElementById("nav");
const $lineup = document.getElementById("lineup");
const $lineupList = document.getElementById("lineup-list");

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

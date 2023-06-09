// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
const websiteUrlInput = document.getElementById("websiteUrl");
document.addEventListener("DOMContentLoaded", () => {
  console.log("project2-fullstack-webapp-feedsreader JS imported successfully!");
  if (websiteUrlInput) {
    console.log("Found websiteUrl input!");
    websiteUrlInput.addEventListener('keyup', getWebSiteDetailsWithDebounce);
    websiteUrlInput.addEventListener('paste', getWebSiteDetailsWithDebounce);
  }
});

function addToReadList(title, url, feed) {
  console.log("Will add to reading list", { title, url });
  fetch("/reading-list/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, url, feed })
  })
}

function patchFeedReadDate(feedId, isoDate, itemIndex) {
  console.log("Will save date for feed", { feedId, isoDate, itemIndex });
  fetch("/feeds/read-date", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ feedId, isoDate })
  })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('server-side error');
      }
    })
    .then(data => {
      let div;
      if (data.group) {
        div = document.getElementById(feedId);
      } else {
        div = document.getElementById("all-feeds-items");
      }

      const liHtmlCollection = div.getElementsByTagName("li");
      if (data.order === 1) { // ascending / oldest first
        [...liHtmlCollection]
          .filter(liDomElement => liDomElement.dataset.index <= +itemIndex)
          .forEach(liDomElement => liDomElement.remove());
      } else if (data.order === -1) { // descending / newest first
        [...liHtmlCollection]
          .filter(liDomElement => liDomElement.dataset.index >= +itemIndex)
          .forEach(liDomElement => liDomElement.remove());
      }
      const lengthAfter = div.getElementsByTagName("li").length;
      div.getElementsByTagName("h2").item(0).getElementsByTagName("span").item(0).innerText = lengthAfter.toString()
    })
    .catch(error => {
      console.error(error);
    });
}

function debounce(func, wait) {
  let timeout;
  return () => {
      if (timeout) {
          clearTimeout(timeout);
      }
      timeout = setTimeout(func, wait)
  }
}

const getWebSiteDetailsWithDebounce = debounce(getWebSiteDetails, 500);

async function getWebSiteDetails() {
  const url = websiteUrlInput.value;
  const faviconUrlInput = document.getElementById("faviconUrl");
  faviconUrlInput.value = "";
  const faviconImg = document.getElementById("faviconImg");
  faviconImg.value = "";
  const titleInput = document.getElementById("title");
  titleInput.value = "";
  const feedUrlInput = document.getElementById("url");
  feedUrlInput.value = "";
  
  console.log("will request feed info for website url", url);

  const response = await fetch("/feeds/details?url=" + url);
  console.log("result", response);
  
  const data = await response.json();
  console.log("data", data);
  
  if(!data.rssUrl) {
    titleInput.value = "<No data found>";
    return;
  }

  feedUrlInput.value = data.rssUrl;
  
  if(data.faviconUrl) {
    faviconUrlInput.value = data.faviconUrl;
  }
  else {
    faviconUrlInput.value = "/images/favicon.ico";
  }
  faviconImg.src = faviconUrlInput.value;

  titleInput.value = data.title;
}


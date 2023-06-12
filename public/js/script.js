// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("project2-fullstack-webapp-feedsreader JS imported successfully!");
  const websiteUrlInput = document.getElementById("websiteUrl");
  if (websiteUrlInput) {
    console.log("Found websiteUrl input!");
    websiteUrlInput.addEventListener('change', getWebSiteDetails);
    websiteUrlInput.addEventListener('paste', getWebSiteDetails);
  }
});

function addToReadList(title, url) {
  console.log("Will add to reading list", { title, url });
  fetch("/reading-list/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, url })
  })
}


async function getWebSiteDetails(event) {
  let pasteData = (event.clipboardData || window.clipboardData).getData("text");
  console.log("event", event, pasteData);
  const response = await fetch("/feeds/details?url=" + pasteData);
  console.log("result", response);
  const feedUrlInput = document.getElementById("url");
  
  const data = await response.json();
  console.log("data", data);
  
  feedUrlInput.value = data.rssUrl;
  const faviconUrlInput = document.getElementById("faviconUrl");
  faviconUrlInput.value = data.faviconUrl;
  const faviconImg = document.getElementById("faviconImg");
  faviconImg.src = data.faviconUrl;

  const titleInput = document.getElementById("title");
  titleInput.value = data.title;
}


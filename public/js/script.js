// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("project2-fullstack-webapp-feedsreader JS imported successfully!");
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

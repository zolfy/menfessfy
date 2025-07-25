function submitFess() {
  const msg = document.getElementById('message').value;
  const spotifyLink = document.getElementById('spotifyLink').value;
  const container = document.getElementById('fessContainer');

  const trackId = spotifyLink.split("/track/")[1]?.split("?")[0];

  if (!trackId || !msg.trim()) {
    alert("Isi curhatan dan link lagu dulu ya!");
    return;
  }

  const embedLink = `https://open.spotify.com/embed/track/${trackId}`;

  const fessHTML = `
    <div class="fess">
      <p>${msg}</p>
      <iframe style="border-radius:12px" src="${embedLink}" width="100%" height="80" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
    </div>
  `;

  container.innerHTML = fessHTML + container.innerHTML;

  document.getElementById('message').value = "";
  document.getElementById('spotifyLink').value = "";
}

const fessContainer = document.getElementById('fessContainer');
const messageInput = document.getElementById('message');
const spotifyLinkInput = document.getElementById('spotifyLink');

function submitFess() {
  const msg = messageInput.value.trim();
  const spotifyLink = spotifyLinkInput.value.trim();

  if (!msg || !spotifyLink.includes("/track/")) {
    alert("Tolong isi curhat dan link lagu yang bener!");
    return;
  }

  const trackId = spotifyLink.split("/track/")[1]?.split("?")[0];
  const embedLink = `https://open.spotify.com/embed/track/${trackId}`;

  const fess = {
    text: msg,
    spotify: embedLink,
    timestamp: Date.now()
  };

  // Kirim ke Firebase
  firebase.database().ref("fess").push(fess);

  // Reset input
  messageInput.value = '';
  spotifyLinkInput.value = '';
}

// Tampilkan semua fess dari Firebase
firebase.database().ref("fess").on("child_added", function(snapshot) {
  const data = snapshot.val();

  const fessHTML = `
    <div class="fess">
      <p>${data.text}</p>
      <iframe style="border-radius:12px" src="${data.spotify}" width="100%" height="80" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
    </div>
  `;

  fessContainer.innerHTML = fessHTML + fessContainer.innerHTML;
});

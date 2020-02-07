export default class Song {
  constructor(data) {
    if (!data) {
      return
    }
    this.title = data.trackName || data.title;
    this.albumArt =
      data.albumArt || data.artworkUrl100.replace(/100x100/g, "300x300");
    this.artist = data.artistName || data.artist;
    this.album = data.collectionName || data.album;
    this.price = data.trackPrice || data.price;
    this.preview = data.previewUrl || data.preview;
    this._id = data.trackId || data._id;
  }

  get Template() {
    return /* html */ `
  <div onclick="app.songsController.playSong('${this._id}')">
    <img src="${this.albumArt}">
    <p>${this.title}</p>
    </div>
        `;
  }

  get playSongTemplate() {
    return /* html */ `
    <div class="card shadow">
      <img src="${this.albumArt}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${this.title}</h5>
          <p class="card-text">
            <audio controls>
    <source src="${this.preview}">
    </audio>
          </p>

        </div>
    </div>
    `;
  }

  get playlistTemplate() {
    return `

        `;
  }
}

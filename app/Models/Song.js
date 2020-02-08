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
  <div onclick="app.songsController.activeSong('${this._id}')">
    <img src="${this.albumArt}" height="65" class="mb-2">
    <span class="m1-2">${this.title}</span>
    </div>
        `;
  }

  get activeSongTemplate() {
    return /* html */ `
    <div class="card shadow">
      <img src="${this.albumArt}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${this.title}</h5>
          <p class="card-text">
            <audio controls>
    <source src="${this.preview}">
    </audio></p>
      <button class="btn btn-info" onclick="app.songsController.addSong('${this._id}')">
      Add to playlist</button>
        </div>
    </div>
    `;
  }

  get playlistTemplate() {
    return /* html */ `
      <div class="border p-2 mb-1">
        <div class="d-flex align-items-center justify-content-between">
        <div>
          <img src="${this.albumArt}" height="65">
          <span class="ml-2">${this.title}</span>
        </div>
        <span class="text-danger" onclick="app.songsController.removeSong('${this._id}')">&times;</span>
        </div>
      </div>
    `;
  }
}

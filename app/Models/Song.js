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
    <div class="card shadow mb-3" style="max-width: 350px;">
      <div class="row no-gutters">
      <div class="col-md-4">
      <img src="${this.albumArt}" class="card-img img-fluid img-pointer" alt="..." onclick="app.songsController.activeSong('${this._id}')">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${this.artist}</h5>
        <p class="card-text">${this.title}</p>
        </div>
      </div>
    </div>
</div>
  `;
  }

  get activeSongTemplate() {
    return /* html */ `
    <div class="card shadow mt-2 m-auto" style="max-width: 400px;">
      <img src="${this.albumArt}" class="card-img-top img-fluid">
      <div class="card-body">
        <h5 class="card-title"><span>${this.artist} - </span>${this.title}</h5>
        <p>Track Price: $${this.price}</p>  
        <p class="card-text ml-n3">
            <audio controls = "controls img-pointer">
    <source src="${this.preview}">
    </audio></p>
      <button class="btn btn-info img-pointer" onclick="app.songsController.addSong('${this._id}')">
      Add to playlist</button>
        </div>
    </div>
    `;
  }

  get playlistTemplate() {
    return /* html */ `
      <div class="border p-2 mb-2 bg-light img-fluid">
        <div class="d-flex align-items-center justify-content-between">
        <div>
          <img src="${this.albumArt}" height="65">
          <span class="ml-2">${this.title}</span>
        </div>
        <span class="text-danger" onclick="app.songsController.removeSong('${this._id}')"><i class="far fa-trash-alt img-pointer"></i></span>
        </div>
      </div>
    `;
  }
}

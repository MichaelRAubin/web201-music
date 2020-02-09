import Song from "../Models/Song.js";
import store from "../store.js";

// @ts-ignore
//TODO Change YOURNAME to your actual name
let _sandBoxUrl = "//bcw-sandbox.herokuapp.com/api/mray/songs/";

class SongsService {
  constructor() {
    // NOTE this will get your songs on page load
    this.getMySongs();
  }

  /**
   * Takes in a search query and retrieves the results that will be put in the store
   * @param {string} query
   */
  async getMusicByQuery(query) {
    // NOTE You will not need to change this method
    let url = "https://itunes.apple.com/search?&term=" + query;
    let response = await fetch(url);
    let data = await response.json();
    store.state.songs = data.results.map(songsData => new Song(songsData));
    console.log("THE SONG DATA", data.results);
  }

  async activeSong(_id) {
    let selectSong = store.state.songs.find(s => s._id == _id)
    store.state.activeSong = selectSong;

  }
  /**
   * Retrieves the saved list of songs from the sandbox
   */
  async getMySongs() {
    let response = await fetch(_sandBoxUrl);
    let data = await response.json();
    store.state.mySongs = data.data.map(songData => new Song(songData));
    console.log("MY SONGS", data.data);
  }

  /**
   * Takes in a song id and sends it from the search results to the sandbox to be saved.
   * Afterwords it will update the store to reflect saved info
   * @param {string} title
   */
  async addSong(title) {
    //TODO you only have an id, you will need to find it in the store before you can post it
    //TODO After posting it what should you do?
    let activeSong = store.state.activeSong;
    let found = store.state.mySongs.find(s => s.title == activeSong.title);

    if (found) {
      // @ts-ignore
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Song is already on your playlist!',
      })
      return
    }

    let response = await fetch(_sandBoxUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(activeSong)
    });
    let data = await response.json();

    let mySong = new Song(data.data);
    store.state.mySongs.push(mySong);
    store.state.activeSong = mySong;
  }

  /**
   * Sends a delete request to the sandbox to remove a song from the playlist
   * Afterwords it will update the store to reflect saved info
   * @param {string} _id
   */
  async removeSong(_id) {
    //TODO Send the id to be deleted from the server then update the store
    await fetch(_sandBoxUrl + _id, {
      method: "DELETE"
    });
    let i = store.state.mySongs.findIndex(s => s._id == _id);
    if (i != -1) {
      store.state.mySongs.splice(i, 1);
    }
  }
}

const service = new SongsService();
export default service;

import store from "../store.js";
import SongService from "../Services/SongsService.js";

//Private
/**Draws the Search results to the page */
function _drawResults() {
  /**Draws the Users saved songs to the page */
  let template = "";
  store.state.songs.forEach(song => {
    template += song.Template;
  });
  document.getElementById("songs").innerHTML = template;
}
function drawActiveSong() {
  if (!store.state.activeSong.title) {
    document.getElementById("activeSong").innerHTML = "";
    return;
  }
  document.getElementById("activeSong").innerHTML =
    store.state.activeSong.activeSongTemplate;
}


function _drawPlaylist() {
  let template = "";
  store.state.mySongs.forEach(songs => {
    template += songs.playlistTemplate;
  });
  document.getElementById("playlist").innerHTML = template;
}

//Public
export default class SongsController {
  constructor() {
    this.getMySongs();
  }

  /**Takes in the form submission event and sends the query to the service */
  async search(e) {
    //NOTE You dont need to change this method
    e.preventDefault();
    try {
      await SongService.getMusicByQuery(e.target.query.value);
      _drawResults();
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * 
   * @param {string} id
   */
  async activeSong(id) {
    try {
      await SongService.activeSong(id);
      drawActiveSong();
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Takes in a song id and sends it to the service in order to add it to the users playlist
   * @param {string} id
   */
  async addSong(id) {
    try {
      await SongService.addSong(id);
      _drawPlaylist();
      drawActiveSong();
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Takes in a song id to be removed from the users playlist and sends it to the server
   * @param {string} id
   */
  async removeSong(id) { }

  async getMySongs() {
    try {
      await SongService.getMySongs()
      _drawPlaylist();
    } catch (error) {
      console.error(error);
    }
  }
}

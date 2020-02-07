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
function drawPlayingSong() {
  if (!store.state.activeSong.title) {
    document.getElementById("activeSong").innerHTML = "";
    return;
  }
  document.getElementById("activeSong").innerHTML =
    store.state.activeSong.playSongTemplate;
}


function _drawPlaylist() { }

//Public
export default class SongsController {
  constructor() {
    // TODO load your playlist
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
  async playSong(id) {
    try {
      await SongService.nowPlayingSong(id);
      drawPlayingSong();
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Takes in a song id and sends it to the service in order to add it to the users playlist
   * @param {string} id
   */
  async addSong(id) { }

  /**
   * Takes in a song id to be removed from the users playlist and sends it to the server
   * @param {string} id
   */
  async removeSong(id) { }
}

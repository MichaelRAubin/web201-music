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
function _drawActiveSong() {
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
      // @ts-ignore
      //form.reset();
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * 
   * @param {string} _id
   */
  async activeSong(_id) {
    try {
      await SongService.activeSong(_id);
      _drawActiveSong();
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
      _drawActiveSong();
    } catch (error) {
      alert(error);
    }
  }

  /**
   * Takes in a song id to be removed from the users playlist and sends it to the server
   * @param {string} _id
   */
  async removeSong(_id) {
    try {
      await SongService.removeSong(_id);
      _drawActiveSong();
      _drawPlaylist();
    } catch (error) {
      console.error(error);
    }
  }

  async getMySongs() {
    try {
      await SongService.getMySongs()
      _drawPlaylist();
    } catch (error) {
      console.error(error);
    }
  }

}

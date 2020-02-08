import Song from "./Models/Song.js";

class Store {
  /**
   * Provides access to application state data
   */
  state = {
    songs: [],
    activeSong: new Song(),
    mySongs: []
  };
}

const store = new Store();
export default store;

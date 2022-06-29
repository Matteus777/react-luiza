import axios from 'axios';
class MarvelService {
  static cancelToken = undefined;

  static getTS() {
    return new Date().getTime();
  }

  static async getAllCharacters(params) {
    if (typeof this.cancelToken != typeof undefined) {
      this.cancelToken.cancel("Operation canceled due to new request.")
    }
    this.cancelToken = axios.CancelToken.source()
    params = params ?? {}
    params.apikey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
    const response = await axios.get(`${process.env.REACT_APP_MARVEL_URL}characters`,
      { params: params, cancelToken: this.cancelToken.token }
    );
    return response.data;
  }
  static async getCharacterById(id) {
    if (typeof this.cancelToken != typeof undefined) {
      this.cancelToken.cancel("Operation canceled due to new request.")
    }
    this.cancelToken = axios.CancelToken.source()
    const response = await axios.get(`${process.env.REACT_APP_MARVEL_URL}characters/${id}`,
      { params: { apikey: process.env.REACT_APP_MARVEL_PUBLIC_KEY }, cancelToken: this.cancelToken.token }
    );
    return response.data;
  }
  static async getComicsById(id){
    if (typeof this.cancelToken != typeof undefined) {
      this.cancelToken.cancel("Operation canceled due to new request.")
    }
    this.cancelToken = axios.CancelToken.source()
    const response = await axios.get(`${process.env.REACT_APP_MARVEL_URL}characters/${id}/comics`,
      { params: { apikey: process.env.REACT_APP_MARVEL_PUBLIC_KEY,orderBy:"-onsaleDate" }, cancelToken: this.cancelToken.token }
    );
    return response.data;
  }

}
export default MarvelService
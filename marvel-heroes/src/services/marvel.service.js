import MD5 from "crypto-js/md5";
import axios from 'axios';
class MarvelService {
  static cancelToken = undefined;
  static generateHash() {
    return MD5(new Date().getTime() + process.env.REACT_APP_MARVEL_PRIVATE_KEY + process.env.REACT_APP_MARVEL_PUBLIC_KEY).toString();
  }
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
      { params: params,cancelToken:this.cancelToken.token }
    );
    return response.data;
  }

}
export default MarvelService
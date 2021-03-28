import axios from "axios";

export class Api {
  static loadAllUsers() {
    return axios({
      method: "GET",
      url: "https://jsonplaceholder.typicode.com/users",
    });
  }
}

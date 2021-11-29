import * as axios from "axios";

export default class Api {
    constructor() {
        this.client = null;
      }

      init = () => {    
        let headers = {
          Accept: "application/json",
        };
    
        this.client = axios.create({
          baseURL: "",
          timeout: 31000,
          headers: headers,
        });
    
        return this.client;
      };

      getTicketList = () => {
        // return this.init().get("/api/tickets/list", { params: params });
        return this.init().get("/api/tickets/list");
      };
}
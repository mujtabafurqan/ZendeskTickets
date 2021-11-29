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
        return this.init().get("/api/tickets/list");
      };

      getTotalTicketCount = () => {
        return this.init().get("/api/tickets/count");
      };

      getNext = link => {
        return this.init().get("/api/tickets/getNext", 
        {
          params: {
            link
          }
        })
      };

      getPrevious = link => {
        return this.init().get("/api/tickets/getPrevious", 
        {
          params: {
            link
          }
        })
      };
}
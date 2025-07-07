import { makeAutoObservable, reaction } from "mobx";

export default class CommonStore {
    token:string | null = localStorage.getItem("jwt");
    apploaded=false;

  constructor() {
       makeAutoObservable(this);

       reaction(()=>this.token,
       token => {
        if (token) {
         localStorage.setItem("jwt",token);
        } else {
          localStorage.removeItem("jwt");
        }
      })
  }

  setToken = async (token:string | null)=>{
        this.token = token;
  }
  setAppLoaded = async ()=>{
   this.apploaded=true;

  }

}
import { makeAutoObservable } from "mobx";

export default class CommonStore {
    token:string | null = null;
    apploaded=false;

  constructor() {
       makeAutoObservable(this);
  }

  setToken = async (token:string | null)=>{

        if(token) localStorage.setItem("jwt",token);
        this.token = token;
  }
  setAppLoaded = async (token:string | null)=>{
   this.apploaded=true;

  }

}
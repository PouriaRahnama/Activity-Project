import {  makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import { User, UserFormValues } from "../models/user";
import agent from "../api/agent";
import { store } from "./store";
import { router } from "../router/Routes";

export default class UserStore {
    user:User | null = null;
    editMode: boolean = false;
    submitting: boolean = false;

  constructor() {
       makeAutoObservable(this);
  }


  get isLoggined(){
    return !!this.user;
  }


  login =async (creds:UserFormValues)=>{

    try{
        const user = await agent.Account.login(creds);
        store.commonStore.setToken(user.token);
        runInAction(()=>
          this.user = user
        )
        router.navigate('/activities')
    }
    catch(error){
        throw error;
    }
  }

  logOut =async ()=>{
    store.commonStore.setToken(null)
    this.user=null

   router.navigate('/login')
  }


  getUser=async()=>{
    try{
      const user = await agent.Account.current();
      runInAction(()=> this.user = user)
    }catch(error){
      console.log(error)
    }
  }



}
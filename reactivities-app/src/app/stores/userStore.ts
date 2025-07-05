import {  makeAutoObservable } from "mobx";
import { Activity } from "../models/activity";
import { User, UserFormValues } from "../models/user";
import agent from "../api/agent";

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
        console.log(user);
    }
    catch(error){
        throw error;
    }
  }


}
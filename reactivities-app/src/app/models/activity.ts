import { Profile } from "./profile";


export interface Activity{
    id:string;
    title:string;
    date:string;
    description:string;
    category:string;
    city:string;
    venue:string;
    imageName?:string;
    IsCancelled:boolean;
    attendees:Profile[];
    hostUserName:string
}

export interface CreateOrEditActivity{
    id:string;
    title:string;
    date:string;
    description:string;
    category:string;
    city:string;
    venue:string;
}
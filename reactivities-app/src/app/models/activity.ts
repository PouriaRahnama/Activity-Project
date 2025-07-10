import { Profile } from "./profile";


export interface Activity{
    id:string;
    title:string;
    date:string;
    description:string;
    category:string;
    city:string;
    venue:string;
    imageName:string;
    isCancelled:boolean;
    attendees:Profile[];
    hostUserName:string;
    isHost?:boolean;
    isGoing?:boolean;
    host?:Profile;
}

 // I Use it
export interface CreateOrEditActivity{
    id:string;
    title:string;
    date:string;
    description:string;
    category:string;
    city:string;
    venue:string;
}

// Or
export class ActivityFormValues {
  id?: string = undefined;
  title: string = "";
  date: Date | null = null;
  description: string = "";
  category: string = "";
  city: string = "";
  venue: string = "";
  constructor(activity : ActivityFormValues ) {
    this.category = activity.category;
    this.id = activity?.id;
    this.date = activity?.date;
    this.venue = activity?.venue;
    this.description = activity?.description;
    this.city=activity.city;
    this.title= activity.title
  }
}

export interface predicate {
  all?: boolean,
  isHost?: boolean,
  isGoing?: boolean,
  startDate?: '' | null
};
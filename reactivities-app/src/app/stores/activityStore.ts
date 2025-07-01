import { makeAutoObservable, observable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";

export default class ActivityStore {
  //activities: Activity[] = [];
  acitivityRegistery = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  editMode: boolean = false;
  submitting: boolean = false;

  constructor() {
       makeAutoObservable(this, {
      acitivityRegistery: observable, // یا makeAutoObservable خودش تشخیص میده
    });
  }

  loadActivities = async () => {
    this.submitting=true
    try {
      const activities =await agent.Activities.list()
      runInAction(() => {
        activities.forEach((activity) => {
          activity.date = activity.date.split("T")[0];
          this.acitivityRegistery.set(activity.id, activity);
        });
      });
    } catch (error) {
      console.log(error);
    }finally{
      runInAction(() => {
        this.submitting = false;
      });
    }
  };


  handleDeleteActivity = async (id: string) => {
    this.submitting = true;

    await agent.Activities.delete(id);
    runInAction(() => {
      this.acitivityRegistery.delete(id);
      if (this.selectedActivity?.id == id) this.selectedActivity=undefined;
      this.submitting = false;
    });
  };

  getActivitiesByDate() {
    return Array.from(this.acitivityRegistery.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  handleCreateAcitvity = async (activity: Activity, imageFile: File) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity, imageFile);
      const newActivity = await agent.Activities.details(activity.id); 
      runInAction(() => {
        this.acitivityRegistery.set(newActivity.id, newActivity);
        this.selectedActivity = newActivity;
        this.editMode = false;
      });
    } catch (error) {
      console.log(error);
    }finally {
        this.submitting = false;
    }
  };

  handleEditAcitvity = async (activity: Activity, imageFile: File) => {
    this.submitting = true;

    try {
      await agent.Activities.update(activity, imageFile);
      const updated = await agent.Activities.details(activity.id); // 👈 دوباره از سرور بگیر
       console.log('test',updated);
      runInAction(() => {
        this.acitivityRegistery.set(updated.id, updated);
        this.selectedActivity = updated;
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.editMode = false;
      });
    }
  };

  loadActivity=async(id:string)=>{
    this.submitting = true;
    let activity = this.acitivityRegistery.get(id);
    if (activity) {
      runInAction(() => {
        this.selectedActivity = activity;
        this.submitting = false;
      });
    } else {
      try {
        const activity = await agent.Activities.details(id);
        runInAction(() => {
          activity.date = activity.date.split("T")[0];
          this.acitivityRegistery.set(activity.id, activity);
          this.selectedActivity = activity;
        });
      } catch (error) {
        console.log(error);
      }finally{
         runInAction(() => {
            this.submitting = false;
      });
      }
    }
  }

}
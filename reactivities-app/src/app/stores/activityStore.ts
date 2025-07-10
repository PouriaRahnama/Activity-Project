import {  makeAutoObservable, observable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity, CreateOrEditActivity, predicate } from "../models/activity";
import { AxiosError } from 'axios';
import {v4 as uuid} from 'uuid'
import { store } from "./store";

export default class ActivityStore {
  acitivityRegistery = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  editMode: boolean = false;
  submitting: boolean = false;
  predicate: predicate = {
    all: true,
    isHost: false,
    isGoing: false,
    startDate: null,
  };

  constructor() {
    makeAutoObservable(this, {
      acitivityRegistery: observable,
    });
  }

  get ActivitiesByDate() {
    return Array.from(this.acitivityRegistery.values())
      .filter((activity) => {
        const { isHost, isGoing, startDate, all } = this.predicate;
        if (!all) {
          if (isHost && !activity.isHost) return false;
          if (isGoing && !activity.isGoing) return false;
        }
        const aDate = new Date(activity.date);
        const sDate = new Date(startDate!);
         const sameDay =
          aDate.getFullYear() === sDate.getFullYear() &&
          aDate.getMonth() === sDate.getMonth() &&
          aDate.getDate() === sDate.getDate();
          if (startDate && !sameDay)
            return false;
        return true;
      })
      .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  }

  setPredicate = (key: string, value: any) => {
    if (key === "all") {
      this.predicate = {
        all: true,
        isHost: false,
        isGoing: false,
        startDate: null,
      };
    } else {
      this.predicate = {
        ...this.predicate,
        all: false,
        [key]: value,
      };
    }
  };

  loadActivities = async () => {
    this.submitting = true;
    try {
      const activities = await agent.Activities.list();
      runInAction(() => {
        activities.forEach((activity) => {
          this.SetActivity(activity);
        });
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.submitting = false;
      });
    }
  };

  private SetActivity = (activity: Activity) => {
    const user = store.userStore.user;
    if (user) {
      activity.isGoing = activity.attendees!.some(
        (a) => a.userName === user.userName
      );

      activity.isHost = activity.hostUserName === user.userName;
      activity.host = activity.attendees.find(
        (a) => a.userName === activity.hostUserName
      );
    }

    activity.date = activity.date.split("T")[0];
    this.acitivityRegistery.set(activity.id, activity);
  };

  handleDeleteActivity = async (id: string) => {
    this.submitting = true;

    await agent.Activities.delete(id);
    runInAction(() => {
      this.acitivityRegistery.delete(id);
      if (this.selectedActivity?.id == id) this.selectedActivity = undefined;
      this.submitting = false;
    });
  };

  get GroupedActivities() {
    return Object.entries(
      this.ActivitiesByDate.reduce((activities, activity) => {
        const date = activity.date;
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];

        return activities;
      }, {} as { [key: string]: Activity[] })
    );
  }

  handleCreateAcitvity = async (
    activity: CreateOrEditActivity,
    imageFile: File
  ) => {
    this.submitting = true;
    try {
      const newId = uuid();
      await agent.Activities.create({ ...activity, id: newId }, imageFile);
      const newActivity = await agent.Activities.details(newId);
      runInAction(() => {
        this.acitivityRegistery.set(newActivity.id, newActivity);
        this.selectedActivity = { ...newActivity, id: newActivity.id };
        this.editMode = false;
      });
      return newActivity;
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      const validationErrors = axiosError?.response?.data?.errors;
      if (validationErrors) {
        throw validationErrors;
      }
    } finally {
      this.submitting = false;
    }
  };

  handleEditAcitvity = async (
    activity: CreateOrEditActivity,
    imageFile: File
  ) => {
    this.submitting = true;

    try {
      await agent.Activities.update(activity, imageFile);
      const updated = await agent.Activities.details(activity.id); 
      console.log("test", updated);
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

  loadActivity = async (id: string) => {
    this.submitting = true;
      try {
        const activity = await agent.Activities.details(id);
        runInAction(() => {
          this.SetActivity(activity);
          this.selectedActivity = activity;
        });
      } catch (error) {
        console.log(error);
      } finally {
          this.submitting = false;
      }
  };

  updateAttendance = async () => {
    const user = store.userStore.user;
    this.submitting = true;
    try {
      await agent.Activities.attend(this.selectedActivity!.id);
      runInAction(() => {
        this.loadActivity(this.selectedActivity!.id);
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.submitting = false;
    }
  };

  cancelActivity = async () => {
    this.submitting = true;
    try {
      await agent.Activities.attend(this.selectedActivity!.id);
      runInAction(() => {
        this.loadActivity(this.selectedActivity!.id);
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.submitting = false;
    }
  };
}
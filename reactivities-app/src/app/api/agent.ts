import axios, { AxiosResponse } from "axios";
import { Activity } from "../models/activity";

axios.defaults.baseURL = 'https://localhost:7227/api';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const create = (activity: Activity, imageFile: File) => {
    const formData = new FormData();

    formData.append("Id", activity.id);
    formData.append("title", activity.title);
    formData.append("description", activity.description);
    formData.append("category", activity.category);
    formData.append("city", activity.city);
    formData.append("venue", activity.venue);
    formData.append("date", activity.date);

    if (imageFile) {
        formData.append("imageFile", imageFile);
    }

    return requests.postFormData<void>('/activities/Create', formData);
};

const update = (activity: Activity, imageFile: File) => {
    const formData = new FormData();

    formData.append("id", activity.id);
    formData.append("title", activity.title);
    formData.append("description", activity.description);
    formData.append("category", activity.category);
    formData.append("city", activity.city);
    formData.append("venue", activity.venue);
    formData.append("date", activity.date);

    if (imageFile) {
        formData.append("imageFile", imageFile);
    }

    return requests.putFormData<void>('/activities/Edit', formData);
};

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
    postFormData: <T>(url: string, formData: FormData) =>
        axios.post<T>(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(responseBody),
    putFormData: <T>(url: string, formData: FormData) =>
        axios.put<T>(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(responseBody),
}

const Activities = {
    list: () => {
      return requests.get<Activity[]>('/activities')

    },
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: create,
    update: update,
    delete: (id: string) => requests.del<void>(`/activities/${id}`)
}

const agent = {
    Activities
}

export default agent;
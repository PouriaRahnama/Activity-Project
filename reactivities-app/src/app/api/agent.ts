import axios, { AxiosResponse } from "axios";
import { Activity, CreateOrEditActivity } from "../models/activity";
import { User, UserFormValues } from "../models/user";
import { store } from "../stores/store";

axios.defaults.baseURL = 'https://localhost:7227/api';
const responseBody = <T>(response: AxiosResponse<T>) => response.data;


axios.interceptors.request.use(congif => {
    const token = store.commonStore.token;
    if(token && congif.headers)
    {
        congif.headers.Authorization = `bearer ${token}`;      
    }
    return congif;
})




const create = (activity: CreateOrEditActivity, imageFile: File) => {
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
const update = (activity: CreateOrEditActivity, imageFile: File) => {
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
    post: <T>(url: string,body:{}) => axios.post<T>(url,body).then(responseBody),
}

const Activities = {
    list: () => requests.get<Activity[]>('/activities'),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: create,
    update: update,
    delete: (id: string) => requests.del<void>(`/activities/${id}`)
}


const Account={
    current:() =>requests.get<User>('/account'),
    login:(user:UserFormValues) =>requests.post<User>('/account/Login',user),
    register:(user:UserFormValues) =>requests.post<User>('/account/register',user),
}

const agent = {
    Activities,
    Account
}


export default agent;
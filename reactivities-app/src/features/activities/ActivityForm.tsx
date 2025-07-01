import { Button, Form, Segment } from "semantic-ui-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useStore } from "../../app/stores/store";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Activity } from "../../app/models/activity";
import { v4 as uuid } from 'uuid';

export default function ActivityForm() {

  const { activityStore } = useStore();
  const { id } = useParams<{ id?: string }>();
  const [imageFile, setImageFile] = useState<File>();
  const init ={
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  }
  const [activity, setActivity] = useState<Activity>(init);
  const navigate= useNavigate()
    useEffect(() => {
      if (id) {
        activityStore.loadActivity(id);
      }else{
        setActivity(init)
      }
    }, [id]);

    useEffect(() => {
    if (id && activityStore.selectedActivity) {
        setActivity(activityStore.selectedActivity);
    }
    }, [activityStore.selectedActivity, id]);



  function handleFormSubmit() {

    if(!activity.id)  
    {
      activity.id = uuid();
      activityStore.handleCreateAcitvity(activity, imageFile!).then( () => navigate(`/activities/${activity.id}`));
    } 
    else{
      activityStore.handleEditAcitvity(activity, imageFile!).then( () => navigate(`/activities/${activity.id}`))
    }
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleFormSubmit} autoComplete="off">
        <Form.Input
          required
          placeholder="Title"
          name="title"
          value={activity.title}
          onChange={handleInputChange}
        />
        <Form.TextArea
          required
          placeholder="Description"
          name="description"
          value={activity.description}
          onChange={handleInputChange}
        />
        <Form.Input
          required
          placeholder="Category"
          name="category"
          value={activity.category}
          onChange={handleInputChange}
        />
        <Form.Input
          required
          type="date"
          placeholder="Date"
          name="date"
          value={activity.date}
          onChange={handleInputChange}
        />
        <Form.Input
          required
          placeholder="City"
          name="city"
          value={activity.city}
          onChange={handleInputChange}
        />
        <Form.Input
          required
          placeholder="Venue"
          name="venue"
          value={activity.venue}
          onChange={handleInputChange}
        />
        <Form.Input
          required
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setImageFile(e.target.files[0]);
            }
          }}
        />
        <Button
          loading={activityStore.submitting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button floated="right" positive type="button" content="Cancel" as={NavLink}
                to={`/activities`} />
      </Form>
    </Segment>
  );
}
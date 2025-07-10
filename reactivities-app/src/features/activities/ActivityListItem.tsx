import { Button, Card, Image, Label, Segment } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { Activity } from "../../app/models/activity";
import { SyntheticEvent, useEffect, useState } from "react";
import { useStore } from "../../app/stores/store";
import ActivityListItemAttendee from "./ActivityListItemAttendee";

interface Props{
  activity:Activity
}


export default function ActivityListItem({activity}:Props){
      const { activityStore } = useStore();
      const [target, setTarget] = useState("");
    
      function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>,id: string) {
        setTarget(e.currentTarget.name);
        activityStore.handleDeleteActivity(id);
      }
    return (
      <Card key={activity.id} raised>
        {activity?.imageName && (
          <Image
            src={`https://localhost:7227/images/${activity.imageName}`}
            wrapped
            ui={false}
            alt={activity.title}
            style={{ objectFit: "cover" }}
          />
        )}
        <Card.Content style={{ textAlign: "right" }}>
          <Card.Header>{activity.title}</Card.Header>
          <Card.Meta>
            <span>{new Date(activity.date).toLocaleDateString("fa-IR")}</span>
          </Card.Meta>
          <Card.Description>
            برگزار کننده : {activity.host?.displayName}
          </Card.Description>
          <Card.Description>
            <p>
              <strong>مکان:</strong> {activity.city}، {activity.venue}
            </p>
          </Card.Description>
          <Card.Description>
            <ActivityListItemAttendee attendees={activity.attendees} />
          </Card.Description>
          {activity.isHost && (
            <Card.Description>
              <Label basic color="orange">
                برگزار کننده رویداد 
              </Label>
            </Card.Description>
          )}
          {activity.isGoing && !activity.isHost && (
            <Card.Description>
              <Label basic color="green">
                شرکت کننده در رویداد
              </Label>
            </Card.Description>
          )}
          {activity.isCancelled  && (
            <Card.Description>
              <Label style={{marginTop:"5px"}} basic color="red">
                کنسل شده
              </Label>
            </Card.Description>
          )}
        </Card.Content>
        <Card.Content extra style={{ textAlign: "right" }}>
          <Label color="teal" ribbon style={{ float: "left" }}>
            {activity.category}
          </Label>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              gap: "10px",
              float: "left",
              marginTop: 10,
            }}
          >
            <Button
              as={NavLink}
              to={`/activities/${activity.id}`}
              color="blue"
              content="مشاهده"
            />
            <Button
              color="red"
              name={activity.id}
              loading={activityStore.submitting && target === activity.id}
              content="حذف"
              onClick={(e) => handleActivityDelete(e, activity.id)}
            />
          </div>
        </Card.Content>
      </Card>
    );
}
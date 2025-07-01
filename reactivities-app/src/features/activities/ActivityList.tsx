import { Button, Card, Image, Label, Segment } from "semantic-ui-react";
import { SyntheticEvent, useEffect, useState } from "react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

export default observer(function ActivityList() {
  const { activityStore } = useStore();
  const [target, setTarget] = useState("");

  useEffect(() => {
    activityStore.loadActivities();
  }, []);

  function handleActivityDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(e.currentTarget.name);
    activityStore.handleDeleteActivity(id);
  }

  if (activityStore.acitivityRegistery.size === 0) {
    return (
      <div
        style={{
          width: 700,
          backgroundColor: "#f0f0f0",
          padding: 30,
          borderRadius: 10,
          textAlign: "center",
          fontSize: 18,
          color: "#555",
          margin: "auto",
          marginTop: 50,
          direction: "rtl",
        }}
      >
        فعالیتی وجود ندارد
      </div>
    );
  }

  if (activityStore.submitting || !activityStore.acitivityRegistery)
    return (
      <div style={{ padding: 30, direction: "rtl", textAlign: "center" }}>
        در حال بارگذاری...
      </div>
    );

  return (
    <Segment
      padded
      style={{ maxWidth: 900, margin: "auto", marginTop: 40, direction: "rtl" }}
    >
      <Card.Group itemsPerRow={3} stackable>
        {activityStore.getActivitiesByDate().map((activity) => (
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
                <span>{new Date(activity.date).toLocaleDateString()}</span>
              </Card.Meta>
              <Card.Description>
                <p>{activity.description}</p>
                <p>
                  <strong>مکان:</strong> {activity.city}، {activity.venue}
                </p>
              </Card.Description>
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
        ))}
      </Card.Group>
    </Segment>
  );
});

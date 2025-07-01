import { Button, Card, Container, Image, Segment, Header } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { NavLink, useParams } from "react-router-dom";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

export default observer(function ActivityDetails() {
  const { activityStore } = useStore();
  const { id } = useParams();

  useEffect(() => {
    if (id) activityStore.loadActivity(id);
  }, [id]);

  if (activityStore.submitting || !activityStore.selectedActivity)
    return (
      <div style={{ padding: 30, textAlign: "center", fontSize: 18, color: "#666" }}>
        در حال بارگذاری...
      </div>
    );

  const activity = activityStore.selectedActivity;

  return (
    <div
      style={{
        backgroundColor: "#f4f6f9",
        minHeight: "100vh",
        paddingTop: 50,
        paddingBottom: 50,
        direction: "rtl",
      }}
    >
      <Container>
        <Segment
          padded
          raised
          style={{
            maxWidth: 800,
            margin: "auto",
            borderRadius: 16,
            boxShadow: "0 0 10px rgba(0,0,0,0.07)",
            backgroundColor: "#fff",
            textAlign: "right",
          }}
        >
          <Header as="h2" textAlign="center" style={{ marginBottom: 30, color: "#444" }}>
            جزئیات فعالیت
          </Header>

          <Card fluid style={{ boxShadow: "none", border: "none" }}>
            {activity.imageName && (
              <Image
                src={`https://localhost:7227/images/${activity.imageName}`}
                style={{
                  objectFit: "cover",
                  height: 280,
                  borderRadius: 12,
                }}
              />
            )}

            <Card.Content style={{ paddingTop: 25, direction: "rtl", textAlign: "right" }}>
              <Card.Header style={{ fontSize: 24, marginBottom: 10 }}>
                {activity.title}
              </Card.Header>
              <Card.Meta style={{ color: "#777", marginBottom: 10 }}>
                {new Date(activity.date).toLocaleDateString()}
              </Card.Meta>
              <Card.Description style={{ fontSize: 16, lineHeight: 1.8 }}>
                {activity.description}
              </Card.Description>

              <div style={{ marginTop: 20, fontSize: 14, color: "#666", textAlign: "right" }}>
                <p>
                  <strong>دسته‌بندی:</strong> {activity.category}
                </p>
                <p>
                  <strong>مکان:</strong> {activity.city}، {activity.venue}
                </p>
              </div>
            </Card.Content>

            <Card.Content extra style={{ textAlign: "right" }}>
              <Button.Group widths="2" style={{ justifyContent: "flex-end" }}>
                <Button
                  as={NavLink}
                  to={`/createActivity/${activity.id}`}
                  color="blue"
                  content="ویرایش"
                />
                <Button
                  as={NavLink}
                  to="/activities"
                  color="grey"
                  content="بازگشت"
                />
              </Button.Group>
            </Card.Content>
          </Card>
        </Segment>
      </Container>
    </div>
  );
});

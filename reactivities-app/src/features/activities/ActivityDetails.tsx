import { Button, Card, Container, Image, Segment, Header, Grid } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { NavLink, useParams } from "react-router-dom";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";

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
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader activity={activityStore.selectedActivity}></ActivityDetailedHeader>
                <ActivityDetailedInfo activity={activityStore.selectedActivity}></ActivityDetailedInfo>
                {/* <ActivityDetailedChat></ActivityDetailedChat> */}
            </Grid.Column>
            {/* <Grid.Column width={6}>
                <ActivityDetailedSidebar></ActivityDetailedSidebar>
            </Grid.Column> */}
        </Grid>
    );
});

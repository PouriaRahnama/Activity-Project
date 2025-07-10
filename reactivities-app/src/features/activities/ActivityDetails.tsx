import { Grid } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";

import ActivityDetailedSidebar from "./ActivityDetailedSidebar";
import Loading from "../loading/Loading";

export default observer(function ActivityDetails() {
  const { activityStore } = useStore();
  const { id } = useParams();

  useEffect(() => {
    if (id) activityStore.loadActivity(id);
  }, [id]);

  if (activityStore.submitting || !activityStore.selectedActivity)
    return (
      <div style={{ padding: 30, textAlign: "center", fontSize: 18, color: "#666" }}>
       <Loading/>
      </div>
    );

  const activity = activityStore.selectedActivity;

  return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader activity={activityStore.selectedActivity}></ActivityDetailedHeader>
                <ActivityDetailedInfo activity={activityStore.selectedActivity}></ActivityDetailedInfo>
            </Grid.Column>
            <Grid.Column width={5}>
                <ActivityDetailedSidebar  activity={activityStore.selectedActivity} ></ActivityDetailedSidebar>
            </Grid.Column>
        </Grid>
    );
});

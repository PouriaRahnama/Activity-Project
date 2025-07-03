import { Grid, Segment, Header } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { observer } from "mobx-react-lite";
import ActivityFilter from "./ActivityFilter";

export default observer(function ActivityDashboard() {
  return (
    <Grid stackable padded style={{ marginTop: 30 }}>
      <Grid.Column width={10}>
        <Segment
          raised
          style={{
            borderRadius: 12,
            padding: 20,
            boxShadow: "0 0 10px rgba(0,0,0,0.05)",
          }}
        >
          <ActivityList />
        </Segment>
      </Grid.Column>

      <Grid.Column width={6}>
        <ActivityFilter/>
      </Grid.Column>
    </Grid>
  );
});

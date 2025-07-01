import { Grid, Segment, Header } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { observer } from "mobx-react-lite";

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
        <Segment
          raised
          style={{
            borderRadius: 12,
            padding: 20,
            boxShadow: "0 0 10px rgba(0,0,0,0.05)",
            backgroundColor: "#f9f9f9",
          }}
        >
          <Header
            as="h3"
            textAlign="center"
            style={{ color: "#555", marginBottom: 20 }}
          >
            فیلترها
          </Header>

          {/* اینجا بعداً کامپوننت فیلتر بذار */}
          <p style={{ color: "#777", textAlign: "center" }}>
            در اینجا می‌توانید فعالیت‌ها را براساس دسته‌بندی، تاریخ یا شهر فیلتر کنید.
          </p>
        </Segment>
      </Grid.Column>
    </Grid>
  );
});

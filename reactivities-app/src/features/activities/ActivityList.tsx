import { Card, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import ActivityListItem from "./ActivityListItem";

export default observer(function ActivityList() {
  const { activityStore } = useStore();

  if (activityStore.acitivityRegistery.size === 0) {
    return (
      <div
        style={{
          width: 500,
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
    {activityStore.GroupedActivities.map(([date, activities]) => (
      <div key={date}>
        <Segment
          inverted
          color="blue"
          style={{
            borderRadius: "10px",
            marginTop: 30,
            textAlign: "right",
            padding: "12px 20px",
            fontWeight: "bold",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            direction: "rtl",
          }}
        >
          <i
            className="calendar alternate outline icon"
            style={{ marginLeft: 5 }}
          ></i>
          {new Date(date).toLocaleDateString("fa-IR")}
        </Segment>

        {/* این Card.Group برای نمایش چندتایی در ردیف */}
        <Card.Group itemsPerRow={3} stackable>
          {activities.map((activity) => (
            <ActivityListItem key={activity.id} activity={activity} />
          ))}
        </Card.Group>
      </div>
    ))}
  </Segment>
);

});

import Calendar from "react-calendar";
import { Header, Menu, Icon, Segment } from "semantic-ui-react";
import 'react-calendar/dist/Calendar.css'
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function ActivityFilters() {

  const {activityStore} = useStore()

  return (
    <Segment raised style={{ marginTop: 30, padding: 20, direction: "rtl" }}>
      <Header
        as="h4"
        color="teal"
        style={{ marginBottom: 20, display: "flex", alignItems: "center" }}
      >
        <Icon name="filter" color="teal" />
        <Header.Content>فیلتر رویدادها</Header.Content>
      </Header>

      <Menu fluid vertical secondary>
        <Menu.Item name="all" content="همه رویدادها" icon="list" 
            onClick={() => activityStore.setPredicate("all", true)} />
        <Menu.Item name="hosting" content="برگزارکننده‌ام" icon="star"
          onClick={() => activityStore.setPredicate("isHost", true)} />
        <Menu.Item name="going" content="شرکت کرده‌ام" icon="check"
           onClick={() => activityStore.setPredicate("isGoing", true)} />
      </Menu>

      <div style={{ marginTop: 30 }}>
        <Header
          as="h4"
          color="teal"
          style={{ marginBottom: 10, display: "flex", alignItems: "center" }}
        >
          <Icon name="calendar alternate" color="teal" />
          <Header.Content>تقویم رویدادها</Header.Content>
        </Header>

        <Calendar locale="fa-IR"
          onChange={(date) => activityStore.setPredicate("startDate", date)}
          value={activityStore.predicate.startDate} />
      </div>
    </Segment>
  );
}
)
import Calendar from "react-calendar";
import { Header, Menu, Icon, Segment } from "semantic-ui-react";

export default function ActivityFilters() {
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
        <Menu.Item name="all" content="همه رویدادها" icon="list" />
        <Menu.Item name="hosting" content="برگزارکننده‌ام" icon="star" />
        <Menu.Item name="going" content="شرکت کرده‌ام" icon="check" />
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

        <Calendar locale="fa-IR" />
      </div>
    </Segment>
  );
}

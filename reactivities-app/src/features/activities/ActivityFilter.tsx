import Calendar from "react-calendar";
import { Header, Item, Menu } from "semantic-ui-react";

export default function(){
    return (
      <>
        <Menu vertical size="large" style={{ width: "100%", marginTop: 25 }}>
          <Header icon="filter" attached color="teal" content="فیلتر" />
          <Item content="همه" />
          <Item content="من نوشتم" />
        </Menu>
        <Header />
        <Calendar />
      </>
    );
} 
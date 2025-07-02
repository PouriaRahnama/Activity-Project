import { Segment, Item, Header, Button, Image } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Activity } from '../../app/models/activity';
import { NavLink } from 'react-router-dom';

interface Props {
  activity: Activity | undefined;
}

const activityImageStyle = {
  filter: 'brightness(80%)'
};

const activityImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  right: '5%',
  width: '90%',
  height: 'auto',
  color: 'white',
  textAlign: 'right' as const,
  direction: 'rtl' as const
};

export default observer(function ActivityDetailedHeader({ activity }: Props) {
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src={`https://localhost:7227/images/${activity?.imageName}`}
          fluid
          style={activityImageStyle}
        />
        <Segment style={activityImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={activity?.title}
                  style={{ color: "white" }}
                />
                <p> در تاریخ : {new Date(activity!.date).toLocaleDateString("fa-IR")}</p>
                <p>
                  برگزارکننده:   <strong>پوریارهنما</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom" textAlign="right" dir="rtl">
        <Button color="teal">شرکت در رویداد</Button>
        <Button>لغو حضور</Button>
        <Button color="orange" floated="left">
          مدیریت رویداد
        </Button>
        <Button
          color="blue"
          floated="left"
          as={NavLink}
          to={`/createActivity/${activity?.id}`}
        >
          ویرایش
        </Button>
      </Segment>
    </Segment.Group>
  );
});

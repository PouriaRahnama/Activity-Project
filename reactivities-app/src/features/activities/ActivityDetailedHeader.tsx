import { Segment, Item, Header, Button, Image, Label } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Activity } from '../../app/models/activity';
import { Link, NavLink } from 'react-router-dom';
import { useStore } from '../../app/stores/store';

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
  const {activityStore} =useStore()

  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        {
          activity?.isCancelled && <Label style={{position:'absolute',zIndex:1000}}  ribbon color='red' content='کنسل شده'/>
        }
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
                <p>
                  {" "}
                  در تاریخ :{" "}
                  {new Date(activity!.date).toLocaleDateString("fa-IR")}
                </p>
                <p>
                  برگزارکننده: <strong>{activity?.host?.displayName}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom" textAlign="right" dir="rtl">
        {activity?.isHost ? (
          <Button
            onClick={activityStore.cancelActivity}
            color={activity.isCancelled ? 'green':'red'}
            floated="left"
            content={activity.isCancelled? 'فعال کردن رویداد':'کنسل رویداد'}
            loading={activityStore.submitting}
          />
        ) : activity?.isGoing ? (
          <Button onClick={activityStore.updateAttendance}>لغو حضور</Button>
        ) : (
          <Button onClick={activityStore.updateAttendance} color="teal">شرکت در رویداد</Button>
        )}

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

import React, { Fragment } from 'react';
import { Segment, List, Item, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Profile } from '../../app/models/profile';
import { Activity } from '../../app/models/activity';
import { User } from '../../app/models/user';

interface Props{
  activity:Activity 
}

const ActivityDetailedSidebar = ({activity}:Props) => {



  return (
    <Fragment>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
   {activity.attendees.length}  <span>  : تعداد شرکت کنندها  </span>  
      </Segment>
      <Segment attached>
        <List relaxed divided>
          {activity.attendees.map((attendee) => (
            <Item key={attendee.userName} style={{ position: "relative" }}>
              <Label
                style={{ position: "absolute" }}
                color="orange"
                ribbon="right"
              >
                {activity.host?.userName === attendee.userName   && "برگزار کننده رویداد" }
                {activity.host?.userName !== attendee.userName && "شرکت کننده در رویداد" }

              </Label>
              <Image size="tiny" src={attendee.image || '/assets/user-default.png'} />
              <Item.Content verticalAlign="middle">
                <Item.Header as="h3">
                  <Link to={`/profiles/${attendee.userName}`}>{attendee.displayName}</Link>
                </Item.Header>
                <Item.Extra style={{ color: "orange" }}>شرکت کننده</Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </List>
      </Segment>
    </Fragment>
  );
};

export default ActivityDetailedSidebar;

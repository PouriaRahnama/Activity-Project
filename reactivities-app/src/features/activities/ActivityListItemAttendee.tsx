import { Image, List } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

interface Props{
  attendees:Profile[]
}


export default observer(function ActivityListItemAttendee({attendees}:Props){
return(
    <List horizontal>
        {
            attendees.map(attendee =>(
                <List.Item  key={attendee.userName} as={Link} to={`/profiles/${attendee.userName}`}>
                    <Image size="mini" circular src={attendee.image || '/assets/user-default.png'} ></Image>
                     <List.Content content={attendee.displayName}/>
                </List.Item>
            ))
        }
    </List>
)

})
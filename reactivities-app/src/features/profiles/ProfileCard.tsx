import {observer} from "mobx-react-lite";
import {Profile} from "../../app/models/profile";
import {Card, Icon, Image} from "semantic-ui-react";
import {Link} from "react-router-dom";
import { dir } from "console";

interface Props {
    profile: Profile
}

export default observer(function ProfileCard({profile}: Props) {
    return (
        <Card as={Link} to={`/profiles/${profile.userName}`}>
            <Image style={{height:"200px",weight:"50px"}} src={profile.image || '/assets/user-default.png'}/>
            <Card.Content>
                <Card.Header> نام نمایشی : {profile.displayName}  </Card.Header>
                 <Card.Description> نام کاربری : {profile.userName} </Card.Description>
            </Card.Content>
        </Card>

    )
});
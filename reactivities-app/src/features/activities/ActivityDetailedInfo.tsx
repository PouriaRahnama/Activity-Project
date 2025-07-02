import { Segment, Grid, Icon } from 'semantic-ui-react';
import { Activity } from '../../app/models/activity';

interface Props {
  activity: Activity | undefined;
}

export default function ActivityDetailedInfo({ activity }: Props) {
  return (
    <Segment.Group>
      <Segment attached='top'>
        <Grid>
          <Grid.Column width={1}>
            <Icon size='large' color='teal' name='info' />
          </Grid.Column>
          <Grid.Column width={15} textAlign='right' dir='rtl'>
            <p>{activity?.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='calendar' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={15} textAlign='right' dir='rtl'>
            <span>ثبت در تاریخ : {new Date(activity!.date).toLocaleDateString('fa-IR')}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='marker' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={15} textAlign='right' dir='rtl'>
            <span>
             {activity?.city}, {activity?.venue}
            </span>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
}

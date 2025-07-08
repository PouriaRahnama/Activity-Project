import { Segment, Grid, Icon } from 'semantic-ui-react';
import { Activity } from '../../app/models/activity';

interface Props {
  activity: Activity | undefined;
}

function fixImageWidths(html: string): string {
  return html.replace(/<img([^>]*)>/g, (match, attrs) => {
    if (attrs.includes('style=')) {
      return `<img${attrs.replace(/style="([^"]*)"/, (s: any, styles: any) => `style="${styles}; width: -moz-available;"`)}>`;
    } else {
      return `<img${attrs} style="width: -moz-available;">`;
    }
  });
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
          <div dangerouslySetInnerHTML={{ __html: fixImageWidths(activity!.description) }} />

          </Grid.Column>
        </Grid>
      </Segment>

      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='calendar' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={15} textAlign='right' dir='rtl'>
            <span>ثبت در تاریخ : {activity ? new Date(activity.date).toLocaleDateString('fa-IR') : ''}</span>
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

      {/* بخش دسته‌بندی */}
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='tags' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={15} textAlign='right' dir='rtl'>
            <span>
              دسته‌بندی: {activity?.category ?? 'ندارد'}
            </span>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
}

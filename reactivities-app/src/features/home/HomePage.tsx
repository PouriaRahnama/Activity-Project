import { Segment, Header, Button, Image } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="mashead">
      <div style={{ textAlign: 'center', direction: 'rtl' }}>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            alt="لوگو"
            style={{ marginBottom: 12 }}
          />
        </Header>
        <Header as="h2" inverted content="خوش آمدید به وب‌سایت" />
        <Button color="teal" size="huge" as={NavLink} to="/activities">
          من را به لیست فعالیت‌ها ببر!
        </Button>
      </div>
    </div>
  );
}

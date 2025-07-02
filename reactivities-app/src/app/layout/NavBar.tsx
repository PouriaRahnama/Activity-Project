import React from 'react';
import { Button, Container, Menu, Icon } from 'semantic-ui-react';
import { useStore } from '../stores/store';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  const { activityStore } = useStore();

  return (
    <Menu fixed="top" inverted style={{ backgroundColor: '#2c2f33', padding: '0.7em 0' }}>
      <Container>
        <Menu.Item
          as={NavLink}
          to="/"
          header
          style={{ fontSize: '1.4em', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}
        >
          <Icon name="bolt" color="yellow" size="large" style={{ marginRight: '10px' }} />
          Reactivities
        </Menu.Item>

        <Menu.Item as={NavLink} to="/activities" name="Activities">
          <Icon name="calendar outline" />
          Activities
        </Menu.Item>

        <Menu.Item as={NavLink} to="/test" name="Test">
          <Icon name="bug" />
          Test Page
        </Menu.Item>

        <Menu.Item position="right">
          <Button
            as={NavLink}
            to="/createActivity"
            primary
            icon
            labelPosition="left"
            style={{ fontWeight: 'bold' }}
          >
            <Icon name="plus" />
            Create Activity
          </Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
}

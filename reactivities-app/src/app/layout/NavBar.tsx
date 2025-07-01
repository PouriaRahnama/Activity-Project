import React, { useState } from 'react';
import { Button, Container, Menu, MenuItem } from 'semantic-ui-react';
import { useStore } from '../stores/store';
import { NavLink } from 'react-router-dom';

export default function NavBar(){
    const{activityStore}= useStore()

    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={NavLink} to="/" header>
            <img src="/assets/logo.png" alt="logo" />
            Reactivites
          </Menu.Item>
          <Menu.Item
            as={NavLink}
            to="/activities"
            name="Activities"
          ></Menu.Item>
          <Menu.Item name="Activities">
            <Button
              as={NavLink}
              to="/createActivity"
              positive
              content="Create Ativity"
            />
          </Menu.Item>
          <Menu.Item
            as={NavLink}
            to="/test"
            name="test"
          ></Menu.Item>
        </Container>
      </Menu>
    );
}



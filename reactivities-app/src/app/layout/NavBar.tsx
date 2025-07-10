import React from 'react';
import { Button, Container, Dropdown, Image, Menu, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { useStore } from '../stores/store';
import LoginForm from '../../features/Users/LoginForm';
import Registerform from '../../features/Users/Registerform';

export default function NavBar() {
  const { userStore: { user, logOut },modalStore } = useStore();

  return (
    <Menu fixed="top" inverted style={{ backgroundColor: '#2c2f33', padding: '0.7em 0' }}>
      <Container>
        <Menu.Item
          as={NavLink}
          to="/"
          header
          style={{
            fontSize: '1.4em',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Icon name="bolt" color="yellow" size="large" style={{ marginRight: '10px' }} />
          Reactivities
        </Menu.Item>

        <Menu.Item as={NavLink} to="/activities" name="Activities">
          <Icon name="calendar outline" />
          Activities
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

        {!user && (
          <Menu.Item position="right">
            <Button color="teal" size="huge" onClick={()=> modalStore.openModal(<LoginForm/>)}>
              ورود
            </Button>

             <Button color="teal" size="huge" style={{marginLeft:10}} onClick={()=> modalStore.openModal(<Registerform/>)}>
                          ثبت نام 
               </Button>
          </Menu.Item>
          
        )}

        {user && (
          <Menu.Item position="right">
            <Dropdown
              trigger={
                <span >
                  {user.displayName}
                </span>
              }
              pointing="top left"
            >
              <Dropdown.Menu>
                <Dropdown.Item
                  as={NavLink}
                  to={`/profile/${user.userName}`}
                  text="حساب کاربری من"
                  icon="user"
                />
                <Dropdown.Item
                  text="خروج"
                  icon="sign out"
                  onClick={logOut}
                />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
}

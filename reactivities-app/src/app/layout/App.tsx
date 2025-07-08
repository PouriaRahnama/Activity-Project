import React, { useEffect } from 'react';
import './styles.css';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { useStore } from '../stores/store';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ModalContainer from '../common/modals/ModalContainer';
import { observer } from 'mobx-react-lite';

export default observer(function App() {
  const { commonStore,userStore } = useStore();
 const location = useLocation()

  useEffect(() => {
    if(commonStore.token){
      userStore.getUser().finally(()=>commonStore.setAppLoaded())
    }else{
      commonStore.setAppLoaded()
    }
  }, [commonStore,userStore]);

 if(!commonStore.apploaded){
  return <p>هنوز سایت لود نشده است </p>
 }
  return (
    <>
    <ModalContainer/>
      {location.pathname === "/" ? (
        <HomePage />
      ) : (
        <>
          <div>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Outlet />
            </Container>
          </div>
        </>
      )}
    </>
  );
}


)
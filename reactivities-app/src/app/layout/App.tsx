import React, { useEffect } from 'react';
import './styles.css';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { useStore } from '../stores/store';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';

function App() {
  const { activityStore,commonStore,userStore } = useStore();
 const location = useLocation()
  useEffect(() => {
    activityStore.loadActivities();
  }, []);

  useEffect(() => {
    if(commonStore.token){
      userStore.getUser().finally(()=>commonStore.setAppLoaded())
    }else{
      commonStore.setAppLoaded()
    }
  }, [commonStore]);

 if(!commonStore.apploaded){
  return <p>هنوز سایت لود نشده است </p>
 }
  return (
    <>
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

export default App;

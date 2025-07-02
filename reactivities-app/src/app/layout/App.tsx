import React, { useEffect } from 'react';
import './styles.css';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/ActivityDashboard';
import { useStore } from '../stores/store';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';

function App() {
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, []);


  const location = useLocation()
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

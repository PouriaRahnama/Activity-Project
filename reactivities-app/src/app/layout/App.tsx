import React, { useEffect } from 'react';
import './styles.css';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/ActivityDashboard';
import { useStore } from '../stores/store';
import { Outlet } from 'react-router-dom';

function App() {
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  return (
    <div>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <Outlet/>
      </Container>
    </div>
  );
}

export default App;

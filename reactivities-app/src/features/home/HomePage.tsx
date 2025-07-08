import { Segment, Header, Button, Image } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import LoginForm from '../Users/LoginForm';
import Registerform from '../Users/Registerform';
import ModalContainer from '../../app/common/modals/ModalContainer';

export default observer(function HomePage() {

  const{userStore,modalStore}= useStore()

  return (
    <>
     <div className="mashead">
      <div style={{ textAlign: "center", direction: "rtl" }}>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            alt="لوگو"
            style={{ marginBottom: 12 }}
          />
        </Header>
        {userStore.isLoggined ? (
          <>
            <Header as="h2" inverted content="خوش آمدید به وب‌سایت" />
            <Button color="teal" size="huge" as={NavLink} to="/activities">
              برو به لیست فعالیت ها
            </Button>
          </>
        ) : (
          <>
            <Header as="h2" inverted content="خوش آمدید به وب‌سایت" />
            <Button color="teal" size="huge" onClick={()=> modalStore.openModal(<LoginForm/>)}>
              ورود
            </Button>
            <Button color="teal" size="huge" onClick={()=> modalStore.openModal(<Registerform/>)}>
              ثبت نام 
            </Button>
          </>
        )}
      </div>
    </div>
    </>

  );
}
)
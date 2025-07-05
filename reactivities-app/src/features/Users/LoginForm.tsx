import { Form, Formik } from "formik";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";

export default observer(function LoginForm(){

    const {userStore} = useStore()

    return (
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => userStore.login(values)}
      >
        {({ handleSubmit,isSubmitting }) => (
          <Form onSubmit={handleSubmit} autoComplete="off" className="ui form">

            <div className="field">
              <MyTextInput name="email" placeholder="ایمیل" lable="email" />
            </div>

            <div className="field"> 
                <MyTextInput name="password" placeholder="کلمه عبور" lable="password" type="password" />
            </div>

            <div > 
                <Button loading={isSubmitting}  positive content='ورود ' fluid />
            </div>
          </Form>
        )}
      </Formik>
    );
})
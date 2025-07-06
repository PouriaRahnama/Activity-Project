import { ErrorMessage, Form, Formik } from "formik";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Button, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";


export default observer(function LoginForm(){

    const {userStore} = useStore()

    return (
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values,{setErrors}) => userStore.login(values)
        .catch(error => setErrors({email:" یا کلمه عبور وارد شده صحیح نمی باشه"}))}
      >
        {({ handleSubmit,isSubmitting,errors }) => (
          <Form onSubmit={handleSubmit} autoComplete="off" className="ui form">

            <div className="field">
              <MyTextInput name="email" placeholder="ایمیل" lable="email" />
            </div>

            <div className="field"> 
                <MyTextInput name="password" placeholder="کلمه عبور" lable="password" type="password" />
            </div>
            <ErrorMessage name='error' render={() => <Label style={{marginTop:10}} content={errors.email}  color="red"/>}/>
            <div > 
                <Button loading={isSubmitting}  positive content='ورود ' fluid />
            </div>
          </Form>
        )}
      </Formik>
    );
})
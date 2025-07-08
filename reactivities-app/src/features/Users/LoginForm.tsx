import { ErrorMessage, Form, Formik } from "formik";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Button, Header, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { useLocation } from "react-router-dom";
import { router } from "../../app/router/Routes";
import * as Yup  from 'yup'

export default observer(function LoginForm(){

  const {userStore} = useStore()
  const location = useLocation();
  const from = location.state?.from?.pathname || "/activities";
  
    return (
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values,{setErrors}) =>{ await userStore.login(values)     
        .catch(error => setErrors({email:" یا کلمه عبور وارد شده صحیح نمی باشه"}))
        console.log(from)
        router.navigate(from); 
      }}
       validationSchema={Yup.object({
                      email:Yup.string().required('لطفا ایمیل را وارد کنید'),
                      password:Yup.string().required('لطفا پسورد را وارد کنید'),
              })}
      >
        {({ handleSubmit,isSubmitting,errors }) => (
          <Form onSubmit={handleSubmit} autoComplete="off" className="ui form">
            <Header as='h2' content='ورود به سایت' color="teal" textAlign="center"/>
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
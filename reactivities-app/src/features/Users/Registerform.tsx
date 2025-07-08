import { ErrorMessage, Form, Formik } from "formik";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Button, Header, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import * as Yup  from 'yup'

export default observer(function RegisterForm(){

    const {userStore} = useStore()

    return (
      <Formik
        initialValues={{displayName:"",userName:"", email: "", password: "" }}
        onSubmit={(values,{setErrors}) => userStore.register(values)
        .catch(error => setErrors({email:" یا کلمه عبور وارد شده صحیح نمی باشه"}))}
        validationSchema={Yup.object({
                displayName:Yup.string().required('لطفا نام نمایشی را وارد کنید'),
                userName:Yup.string().required('لطفا یوزرنیم را وارد کنید'),
                email:Yup.string().required('لطفا ایمیل را وارد کنید'),
                password:Yup.string().required('لطفا پسورد را وارد کنید'),
        })}
      >
        {({ handleSubmit,isSubmitting,errors }) => (
          <Form onSubmit={handleSubmit} autoComplete="off" className="ui form">
            <Header as='h2' content=' ثبت نام ' color="teal" textAlign="center"/>

            <div className="field">
              <MyTextInput name="displayName" placeholder="نام نمایشی" lable="displayName" />
            </div>

            <div className="field">
              <MyTextInput name="userName" placeholder="یوزرنیم" lable="userName" />
            </div>

            <div className="field">
              <MyTextInput name="email" placeholder="ایمیل" lable="email" />
            </div>

            <div className="field"> 
                <MyTextInput name="password" placeholder="کلمه عبور" lable="password" type="password" />
            </div>

            <ErrorMessage name='error' render={() => <Label style={{marginTop:10}} content={errors.email}  color="red"/>}/>

            <div > 
                <Button loading={isSubmitting}  positive content='ثبت نام ' fluid />
            </div>
          </Form>
        )}
      </Formik>
    );
})
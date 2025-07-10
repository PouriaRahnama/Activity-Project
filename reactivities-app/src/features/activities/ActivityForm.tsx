import { Button, Header, Icon, Segment, Divider} from "semantic-ui-react";
import {  useEffect, useState } from "react";
import {  useStore } from "../../app/stores/store";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Activity, CreateOrEditActivity } from "../../app/models/activity";
import { Formik,Form, } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../app/common/form/MyTextInput";
import MySelectInput from "../../app/common/form/MySelectInput";
import MyTextAreaInput from "../../app/common/form/MyTextAreaInput";

import MyFileInput from "../../app/common/form/MyFileInput";

export default function ActivityForm() {
    const init = {
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: ""
  };
  const navigate = useNavigate();
  const { activityStore } = useStore();
  const { id } = useParams<{ id?: string }>();
  const [imageFile, setImageFile] = useState<File>(); 
  const [activity, setActivity] = useState<CreateOrEditActivity>(init);
  const [imageError, setImageError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      activityStore.loadActivity(id).then(()=>{console.log("activityStore.loadActivity(id)")});
    } else {
      setActivity(init);
    }
  }, [id]);

  useEffect(() => {
    if (id && activityStore.selectedActivity) {
    setActivity(activityStore.selectedActivity!);
    }
  }, [activityStore.selectedActivity, id]);

function handleFormSubmit(act: CreateOrEditActivity, setErrors: (errors: { [key: string]: string }) => void) {
  if (!imageFile) {
    setImageError("لطفا عکس را وارد کنید");
    return;
  }
  setImageError(null);
  if (!act.id || act.id.length === 0) {
    activityStore
      .handleCreateAcitvity(act, imageFile!).then((created) => {
       // console.log("created",created)
      navigate(`/activities/${activityStore.selectedActivity?.id}`);
    })
      .catch((error) => {
        if (typeof error === 'object') {
          const formikErrors: { [key: string]: string } = {};
          for (const key in error) {
           const Key = key.toLowerCase()
            formikErrors[Key] = error[key][0];
          }
          setErrors(formikErrors);
        }
      });
  } else {
    console.log("act",act)
    activityStore
      .handleEditAcitvity(act, imageFile!).then(() => {
         navigate(`/activities/${activityStore.selectedActivity?.id}`);
    }).catch((error) => {
        if (typeof error === 'object') {
          const formikErrors: { [key: string]: string } = {};
          for (const key in error) {
            const Key = key.toLowerCase()
            formikErrors[Key] = error[key][0];
          }
          setErrors(formikErrors);
        }
      });
  }
}

  const validationsSchema=Yup.object({
    description:Yup.string().required('لطفا توضیحات را وارد کنید'),
    category:Yup.string().required('لطفا دسته بندی را وارد کنید'),
    city:Yup.string().required('لطفا شهر را وارد کنید'),
    venue:Yup.string().required('لطفا آوردگاه را وارد کنید'),
    date:Yup.string().required('لطفا تاریخ را وارد کنید')
  })

  const categoryOptions=[
    {text:'نوشیدنی',value:'drinks'},
    {text:'فیلم',value:'film'},
    {text:'غذا',value:'food'},
    {text:'موزی',value:'music'}
  ]

  return (
    <Segment
      padded="very"
      style={{ maxWidth: 700, margin: "auto", marginTop: 30 }}
    >
      <Header as="h2" color="teal" textAlign="center">
        <Icon name="edit" />
        {id ? "Edit Activity" : "Create New Activity"}
      </Header>
      <Divider />
      <Formik validationSchema={validationsSchema} enableReinitialize initialValues={activity} 
      onSubmit={(values, formikHelpers) => handleFormSubmit(values, formikHelpers.setErrors)}>
        {({ handleSubmit,isValid,isSubmitting,dirty,errors }) => (
          <Form onSubmit={handleSubmit} autoComplete="off" className="ui form">

            <div className="field">
              <MyTextInput name="title" placeholder="title" lable="title" />
            </div>

            <div className="field">
              <MyTextAreaInput name="description" placeholder="Description" lable="Description"/>
            </div>

            <div className="fields">
              <div className="eight wide field">
                <MySelectInput options={categoryOptions} name="category" placeholder="category" lable="category"/>
              </div>
              <div className="eight wide field">
                <MyTextInput name="date" placeholder="date" lable="date" type="date"/>
              </div>
            </div>

            <div className="fields">
              <div className="eight wide field">
                <MyTextInput name="city" placeholder="city" lable="city"/>
              </div>
              <div className="eight wide field">
                <MyTextInput name="venue" placeholder="venue" lable="venue"/>
              </div>
            </div>

            <div className="field">
             <MyFileInput
                name="image"
                label="Activity Image"
                onChange={(file) => {
                setImageFile(file); // مثلا پیش‌نمایش عکس
                }}
              />
              {imageError && <div style={{ color: "red" }}>{imageError}</div>}
            </div>

            <Divider hidden />
            <Button
              loading={activityStore.submitting}
              floated="right"
              positive
              icon="check"
              content="Submit"
                  type="submit"
            />
            <Button
              floated="right"
              type="button"
              icon="cancel"
              color="grey"
              content="Cancel"
              as={NavLink}
              to={`/activities`}
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
}

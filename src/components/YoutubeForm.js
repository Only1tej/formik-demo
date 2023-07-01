import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import TextError from "./TextError";

const initialValues = {
  name: "",
  email: "",
  channel: "",
  comments: "",
  address: "",
  social: {
    facebook: "",
    twitter: "",
    instagram: "",
  },
  phoneNumbers: ["", ""],
  phNumbers: [""],
};

const onSubmit = (values) => {
  console.log("Form data", values);
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required!!!"),
  email: Yup.string().email("Invalid email format!!!").required("Required!!!"),
  channel: Yup.string().required("Required!!!"),
});

function YoutubeForm() {
  // console.log("Form values", formik.values);
  // console.log("Form errors", formik.errors);
  // console.log("Visited fields", formik.touched);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <Field type="text" name="name" id="name" placeholder="Name" />
          <ErrorMessage name="name" component={TextError} />
        </div>
        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <Field type="email" name="email" id="email" placeholder="Email" />
          <ErrorMessage name="email">
            {(errorMsg) => <div className="error">{errorMsg}</div>}
          </ErrorMessage>
        </div>
        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <Field
            type="text"
            name="channel"
            id="channel"
            placeholder="Youtube Form Channel"
          />
          <ErrorMessage name="channel" />
        </div>
        <div className="form-control">
          <label htmlFor="comments">Comments</label>
          <Field
            as="textarea"
            id="comments"
            name="comments"
            placeholder="Leave a comment"
          />
        </div>
        {/* // (Implementation of the field component iwth the render props pattern)When you want to use custom component in your form, you want to hook it to formik (To hook the input with formik, we spread the field props)(meta props is used to render the error message), this pattern is useful */}
        <div className="form-control">
          <label htmlFor="address">Address</label>
          <Field name="address">
            {(props) => {
              const { field, form, meta } = props;
              console.log("Rendered Props", props);
              return (
                <div>
                  <input
                    type="text"
                    placeholder="Address"
                    id="address"
                    {...field}
                  />{" "}
                  {meta.touched && meta.error ? <div>{meta.error}</div> : null}
                </div>
              );
            }}
          </Field>
        </div>
        <div className="form-control">
          <label htmlFor="facebook">Facebook Profile</label>
          <Field
            type="text"
            id="facebook"
            name="social.facebook"
            placeholder="Facebook"
          />
        </div>
        <div className="form-control">
          <label htmlFor="twitter">Twitter Profile</label>
          <Field
            type="text"
            id="twitter"
            name="social.twitter"
            placeholder="Twitter"
          />
        </div>
        <div className="form-control">
          <label htmlFor="instagram">Instagram Profile</label>
          <Field
            type="text"
            id="instagram"
            name="social.instagram"
            placeholder="Instagram"
          />
        </div>
        <div className="form-control">
          <label htmlFor="primaryPh">Primary Phone Number</label>
          <Field
            type="text"
            id="primaryPh"
            name="phoneNumber[0]"
            placeholder="Primary Phone Number"
          />
        </div>
        <div className="form-control">
          <label htmlFor="secondaryPh">Secondary Phone Number</label>
          <Field
            type="text"
            id="secondaryPh"
            name="phoneNumber[1]"
            placeholder="Secondary Phone Number"
          />
        </div>
        <div className="form-control">
          <label>List of phone numbers</label>
          <FieldArray name="phNumbers">
            {(fieldArrayProps) => {
              console.log("Field Array Props", fieldArrayProps);
              const { push, remove, form } = fieldArrayProps;
              const { values } = form;
              const { phNumbers } = values;
              return (
                <div>
                  {phNumbers.map((phNumber, index) => (
                    <div key={index}>
                      <Field name={`phNumbers[${index}]`} />
                      <button type="button" onClick={() => remove(index)}>
                        -
                      </button>
                      <button type="button" onClick={() => push("")}>
                        +
                      </button>
                    </div>
                  ))}
                </div>
              );
            }}
          </FieldArray>
        </div>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}

export default YoutubeForm;

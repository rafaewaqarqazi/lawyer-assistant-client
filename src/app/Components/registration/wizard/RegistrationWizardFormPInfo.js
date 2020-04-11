import React from "react";
import {Field} from 'formik'
import RegistrationWizardContent from "./RegistrationWizardContent";
import {formErrorMessage} from "../../../pages/errors/FormErrorMessage";

const RegistrationWizardFormPInfo = ({errors}) => {
  return (
    <RegistrationWizardContent title="Setup Your Personal Information">
      <div className="form-group">
        <label>Title</label>
        <Field className="form-control" name="title" as='select'>
          <option value="">Select Title</option>
          <option value="t1">Title 1</option>
          <option value="t2">Title 2</option>
          <option value="t3">Title 3</option>
        </Field>
      </div>
      <div className="form-group">
        <label>First Name*</label>
        {formErrorMessage(errors.firstName)}
        <Field className="form-control" name="firstName" placeholder="First Name" required/>
        <span className="form-text text-muted">Please enter your First Name</span>

      </div>
      <div className="form-group">
        <label>Sur Name*</label>
        {formErrorMessage(errors.surName)}
        <Field className="form-control" name="surName" placeholder="Sur Name" required/>
        <span className="form-text text-muted">Please enter your Surname</span>
      </div>
      <div className="form-group">
        <label>Date of Birth</label>
        <div className="input-group">
          <Field as={
            (props) => (
              <input type="text" className="form-control" onFocus={(e) => e.currentTarget.type='date'} onBlur={(e) => e.currentTarget.type='text'}  {...props} />
            )
          } placeholder='Select Date' name='dob'/>
            <div className="input-group-append">
              <span className="input-group-text">
                <span className='fa fa-calendar-check'/>
              </span>
            </div>
        </div>
      </div>
    </RegistrationWizardContent>
  );
};

export default RegistrationWizardFormPInfo;

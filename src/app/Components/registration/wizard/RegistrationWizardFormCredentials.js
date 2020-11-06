import React, {useState} from 'react';
import RegistrationWizardContent from "./RegistrationWizardContent";
import {Field} from "formik";
import {formErrorMessage} from "../../../pages/errors/FormErrorMessage";
const RegistrationWizardFormCredentials = ({errors}) => {
  const [passwordField, setPasswordField] = useState(true)
  const [confirmPasswordField, setConfirmPasswordField] = useState(true)
  return (
    <RegistrationWizardContent title='Add Credentials'>
      <div className="form-group">
        <label>Email address*</label>
        {formErrorMessage(errors.email)}
        <Field className="form-control" name="email" placeholder="someone@somthing.com"/>
      </div>
      <div className="form-group">
        <label>Password*</label>
        {formErrorMessage(errors.password)}
        <div className='position-relative'>
          <Field className="form-control" type={passwordField ? 'password' : 'text'} name="password" placeholder="********"/>
          <span className='position-absolute' style={{right: 10, top: 10, cursor: 'pointer'}} onClick={() => setPasswordField(!passwordField)}>
            <i className={`fa ${passwordField ? 'fa-eye' : 'fa-eye-slash'}`}/>
          </span>
        </div>
        <span className="form-text text-muted">
          Password must be a minimum 8 characters with at least one capital letter and one number
        </span>
      </div>
      <div className="form-group">
        <label>Confirm Password*</label>
        {formErrorMessage(errors.confirmPassword)}
        <div className='position-relative'>
        <Field className="form-control" type={confirmPasswordField ? 'password' : 'text'} name="confirmPassword" placeholder="********"/>
        <span className='position-absolute' style={{right: 10, top: 10, cursor: 'pointer'}} onClick={() => setConfirmPasswordField(!confirmPasswordField)}>
            <i className={`fa ${confirmPasswordField ? 'fa-eye' : 'fa-eye-slash'}`}/>
          </span>
        </div>
      </div>
    </RegistrationWizardContent>
  );
};

export default RegistrationWizardFormCredentials;

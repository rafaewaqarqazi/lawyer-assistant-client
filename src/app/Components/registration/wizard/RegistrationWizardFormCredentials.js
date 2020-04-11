import React from 'react';
import RegistrationWizardContent from "./RegistrationWizardContent";
import {Field} from "formik";
import {CustomInput} from 'reactstrap'
import {formErrorMessage} from "../../../pages/errors/FormErrorMessage";
const RegistrationWizardFormCredentials = ({errors}) => {
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
        <Field className="form-control" type='password' name="password" placeholder="********"/>
        <span className="form-text text-muted">
          Password must be a minimum 8 characters with at least one capital letter, one special letter and one number
        </span>
      </div>
      <div className="form-group">
        <label>Confirm Password*</label>
        {formErrorMessage(errors.confirmPassword)}
        <Field className="form-control" type='password' name="confirmPassword" placeholder="********"/>
      </div>
      <div className="form-group">
        <Field name='multiFactorAuth' >
          {({field, ...props}) => (
            <CustomInput {...field} id='radio' type='radio' value={true} name='multiFactorAuth' label='Enable multi-factor authentication (MFA)' {...props}/>
          )}
        </Field>
        <span className="form-text text-muted">
          If you do not enable (MFA) you will be required to reset your password after one year
        </span>
      </div>
    </RegistrationWizardContent>
  );
};

export default RegistrationWizardFormCredentials;
import React from 'react';
import RegistrationWizardContent from "./RegistrationWizardContent";
import {Field} from "formik";
import {CustomInput} from "reactstrap";

const RegistrationWizardFormConfirm = () => {
  return (
    <RegistrationWizardContent title='Confirmation'>
      <div className="form-group">
        <Field name="understand">
          {({field, ...props}) => (
            <CustomInput {...field} type="radio" value={'uCrypto'} id="uCrypto" label="I understand Crypto Currency is highly volatile" {...props}/>
          )}
        </Field>
      </div><div className="form-group">
        <Field name="understand">
          {({field, ...props}) => (
            <CustomInput {...field} type="radio" value={'uMFA'} id="umfa" label="I understand that is should enable multi-factor authentication for my account to be more secure" {...props}/>
          )}
        </Field>
      </div><div className="form-group">
        <Field name="understand">
          {({field, ...props}) => (
            <CustomInput {...field} type="radio" value={'uPrivacy'} id="uPrivacy" label="I agree to the privacy and service policy" {...props}/>
          )}
        </Field>
      </div>
    </RegistrationWizardContent>
  );
};

export default RegistrationWizardFormConfirm;
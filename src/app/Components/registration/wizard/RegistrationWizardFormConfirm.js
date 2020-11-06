import React from 'react';
import RegistrationWizardContent from "./RegistrationWizardContent";
import {Field} from "formik";
import {CustomInput} from "reactstrap";
import {formErrorMessage} from "../../../pages/errors/FormErrorMessage";

const RegistrationWizardFormConfirm = ({errors, values,setFieldValue}) => {
  return (
    <RegistrationWizardContent title='Confirmation'>
      <div className="form-group">


        <label className="kt-checkbox">
          <input
            type="checkbox"
            checked={values.agree}
            onChange={e => setFieldValue("agree", e.target.checked)}
            name="agree"
          />{" "}
          I agree to the privacy and service policy
          <span></span>
        </label>
        <div>
          {formErrorMessage(errors.agree)}
        </div>
      </div>
    </RegistrationWizardContent>
  );
};

export default RegistrationWizardFormConfirm;

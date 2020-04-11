import React from 'react';
import {Field} from 'formik'
import RegistrationWizardContent from "./RegistrationWizardContent";
import {formErrorMessage} from "../../../pages/errors/FormErrorMessage";
import InputCountry from "../../input/InputCountry";
import InputAddress from "../../input/InputAddress";
const RegistrationWirzardFormAddress = ({errors}) => {

  return (
    <RegistrationWizardContent title="Enter Your Location">
      <div className="form-group">
        <label>Country*</label>
        {formErrorMessage(errors.country)}
        <InputCountry/>
      </div>
      <div className="form-group">
        <label>Address*</label>
        {formErrorMessage(errors.address)}
        <InputAddress/>
      </div>
    </RegistrationWizardContent>
  );
};

export default RegistrationWirzardFormAddress;
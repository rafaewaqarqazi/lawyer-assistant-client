import React, {Fragment, useState} from "react";
import { Form, Formik } from "formik";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import * as auth from "../../store/ducks/auth.duck";
import "../../../_metronic/_assets/sass/pages/wizard/wizard-3.scss";
import RegistrationWizardHeader from "../../Components/registration/wizard/RegistrationWizardHeader";
import RegistrationWizardActions from "../../Components/registration/wizard/RegistrationWizardActions";
import RegistrationWizardFormPInfo from "../../Components/registration/wizard/RegistrationWizardFormPInfo";
import RegistrationWizardLayout from "../../Components/layout/registration/RegistrationWizardLayout";
import RegistrationWirzardFormAddress from "../../Components/registration/wizard/RegistrationWirzardFormAddress";
import RegistrationWizardFormCredentials from "../../Components/registration/wizard/RegistrationWizardFormCredentials";
import RegistrationWizardFormConfirm from "../../Components/registration/wizard/RegistrationWizardFormConfirm";
import MainLayout from "../../Components/layout/main/MainLayout";
import RegistrationHeader from "../../Components/layout/registration/RegistrationHeader";
import { login, register } from "../../crud/auth.crud";
import { validateRegistration } from "../../../utils/validations/registrationValidations";
import { useHistory } from "react-router-dom";
function Registration({ intl }) {
  const history = useHistory();
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingButtonStyle, setLoadingButtonStyle] = useState({
    paddingRight: "2.5rem"
  });

  const enableLoading = () => {
    setLoading(true);
    setLoadingButtonStyle({ paddingRight: "3.5rem" });
  };

  const disableLoading = () => {
    setLoading(false);
    setLoadingButtonStyle({ paddingRight: "2.5rem" });
  };
  return (
    <MainLayout>
      <RegistrationHeader />
      <div className="kt-container  kt-grid__item kt-grid__item--fluid">
        <RegistrationWizardLayout current={current}>
          <Formik
            initialValues={{
              title: "",
              firstName: "",
              surName: "",
              dob: "",
              country: "",
              address: "",
              email: "",
              password: "",
              confirmPassword: "",
              multiFactorAuth: ""
            }}
            validate={values => validateRegistration(values, current)}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(values, { setStatus, setSubmitting }) => {
              enableLoading();
              setTimeout(() => {
                register({ ...values, confirmPassword: undefined })
                  .then(res => {
                    if (res.data.message) {
                      setStatus(
                        intl.formatMessage({
                          id: "AUTH.VALIDATION.INVALID_REGISTRATION",
                          defaultMessage: res.data.message
                        })
                      );
                    }
                    disableLoading();
                    setStatus(
                      intl.formatMessage({
                        id: "AUTH.VALIDATION.REGISTRATION_SUCCESS",
                        defaultMessage: "Successfully Registered!"
                      })
                    );
                    setTimeout(() => {
                      history.push("/");
                    }, 2000);
                  })
                  .catch(error => {
                    disableLoading();
                    setSubmitting(false);
                    setStatus(
                      intl.formatMessage({
                        id: "AUTH.VALIDATION.INVALID_REGISTRATION",
                        defaultMessage: "Something Went Wrong!"
                      })
                    );
                  });
              }, 1000);
            }}
          >
            {({
              values,
              status,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              validateForm
            }) => (
              <Fragment>
                <RegistrationWizardHeader
                  current={current}
                  setCurrent={setCurrent}
                  validateForm={validateForm}
                />
                <div className="kt-grid__item kt-grid__item--fluid kt-wizard-v3__wrapper">
                  <div className="kt-form">
                    <div className="form-group text-center">
                      You have now provided all the information we require to
                      create your profile. Please read our terms and conditions,
                      and legal notices and click the register button to start
                      your journey with Kodeon
                    </div>
                    <Form onSubmit={handleSubmit}>
                      {Object.keys(errors).length > 0 && current === 3 && (
                        <div role="alert" className="alert alert-danger">
                          <div className="alert-text">
                            There are some Errors in Your Submission please
                            Provide Complete Required Information
                          </div>
                        </div>
                      )}
                      {status && status !== "Successfully Registered!" && (
                        <div role="alert" className="alert alert-danger">
                          <div className="alert-text">{status}</div>
                        </div>
                      )}
                      {status && status === "Successfully Registered!" && (
                        <div role="alert" className="alert alert-success">
                          <div className="alert-text">{status}</div>
                        </div>
                      )}
                      {current === 0 && (
                        <RegistrationWizardFormPInfo errors={errors} />
                      )}
                      {current === 1 && (
                        <RegistrationWirzardFormAddress errors={errors} />
                      )}
                      {current === 2 && (
                        <RegistrationWizardFormCredentials errors={errors} />
                      )}
                      {current === 3 && (
                        <RegistrationWizardFormConfirm errors={errors} />
                      )}
                      <RegistrationWizardActions
                        current={current}
                        setCurrent={setCurrent}
                        loading={loading}
                        errors={errors}
                        validateForm={validateForm}
                        loadingButtonStyle={loadingButtonStyle}
                      />
                    </Form>
                  </div>
                </div>
              </Fragment>
            )}
          </Formik>
        </RegistrationWizardLayout>
      </div>
    </MainLayout>
  );
}

export default injectIntl(connect(null, auth.actions)(Registration));

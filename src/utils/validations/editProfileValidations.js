export const editProfileValidations = values => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = 'Required!'
  }

  if (!values.lastName) {
    errors.lastName = 'Required!'
  }
  if (!values.mobileNo) {
    errors.mobileNo = 'Required!'
  } else if (!values.mobileNo.match(/^[0-9]{11}$/)) {
    errors.mobileNo = 'Invalid Mobile No!'
  }
  if (!values.address) {
    errors.address = 'Required!'
  }
  if (!values.country) {
    errors.country = 'Required!'
  }
  if (!values.cv) {
    errors.cv = 'Required!'
  }

  return errors;
}
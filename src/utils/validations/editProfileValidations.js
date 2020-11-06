export const editProfileValidations = values => {
  const errors = {};
  const firstNameArray = Array.from(values.firstName)
  const lastNameArray = Array.from(values.lastName)
  const addressArray = Array.from(values.address)
  let firstNameValid = true
  let lastNameValid = true
  let addressValid = true
  firstNameArray.map((ch, i) => {
    if ((i+2) < firstNameArray.length){
      if (ch === firstNameArray[i+1] && ch === firstNameArray[i+2]){
        firstNameValid = false
      }
    }
  })
  lastNameArray.map((ch, i) => {
    if ((i+2) < lastNameArray.length){
      if (ch === lastNameArray[i+1] && ch === lastNameArray[i+2]){
        lastNameValid = false
      }
    }
  })
  addressArray.map((ch, i) => {
    if ((i+2) < addressArray.length){
      if (ch === addressArray[i+1] && ch === addressArray[i+2]){
        addressValid = false
      }
    }
  })
  if (!values.firstName) {
    errors.firstName = 'Required!'
  }
  else if (!firstNameValid){
    errors.firstName = 'Invalid Name!'
  }
  if (!values.lastName) {
    errors.lastName = 'Required!'
  }else if (!lastNameValid){
    errors.lastName = 'Invalid Name!'
  }
  if (!values.mobileNo) {
    errors.mobileNo = 'Required!'
  } else if (!values.mobileNo.match(/^03[0-9]{9}$/)) {
    errors.mobileNo = 'Invalid Mobile No!'
  }
  if (!values.address) {
    errors.address = 'Required!'
  } else if (!addressValid){
    errors.address = 'Invalid Address!'
  }
  if (!values.country) {
    errors.country = 'Required!'
  }

  return errors;
}

import {
  LOGIN_URL,
  ME_URL,
  REGISTER_URL,
  REQUEST_PASSWORD_URL,
  CHANGE_PASSWORD_URL,
  CLOSE_ACCOUNT_URL,
  SETUP_TFA_URL,
  VERIFY_TFA_URL,
  ENABLE_TFA_URL,
  DISABLE_TFA_URL,
  LOGIN_WITH_CODE_URL
} from "../../app/crud/auth.crud";
import userTableMock from "./userTableMock";
import jwt from 'jsonwebtoken'
import {JWT_SECRET} from "../../utils/config";

export default function mockAuth(mock) {
  mock.onPost(LOGIN_URL).reply(({ data }) => {
    const { email, password } = JSON.parse(data);

    if (email && password) {
      const user = userTableMock.find(
          x =>
              x.email.toLowerCase() === email.toLowerCase() &&
              x.password === password
      );

      if (user) {
        if (!user.multiFactorAuth) {
          const authToken = jwt.sign({email: user.email}, JWT_SECRET)
          return [200, { authToken, multiFactorAuth: user.multiFactorAuth }];
        } else {
          return [200, { multiFactorAuth: user.multiFactorAuth }];
        }
      }
    }

    return [400];
  });
  mock.onPost(LOGIN_WITH_CODE_URL).reply(({ data }) => {
    const { code } = JSON.parse(data);
    if (code) {
      const user = userTableMock.find(
          x =>
              x.code === code
      );
      if (user) {
        const authToken = jwt.sign({email: user.email}, JWT_SECRET)
        return [200, { authToken }];
      }
    }
    return [400];
  });

  mock.onPost(REGISTER_URL).reply(({ data }) => {
    const newUser = JSON.parse(data);

    if (newUser) {
      const exists = userTableMock.find(
        x =>
          x.email.toLowerCase() === newUser.email.toLowerCase()
      );
      if (exists) {
        return [200, {message: 'User Already Exists'}];
      }
      const user = {
        id: userTableMock.length,
        ...newUser,
        pic: process.env.PUBLIC_URL + "/media/users/default.jpg"
      };

      userTableMock.push(user);

      return [200, { ...user, password: undefined }];
    }

    return [400];
  });

  mock.onPost(REQUEST_PASSWORD_URL).reply(({ data }) => {
    const { email } = JSON.parse(data);
    if (email) {
      const user = userTableMock.find(
          x => x.email.toLowerCase() === email.toLowerCase()
      );
      if (user) {
        user.password = undefined;

        return [200, { ...user, password: undefined }];
      }
    }
    return [400];
  });
  mock.onPut(CHANGE_PASSWORD_URL).reply(({ data }) => {
    const { oldPassword, newPassword, id } = JSON.parse(data);

    if (oldPassword && newPassword && id) {

      const user = userTableMock.find(
          x => (x.id === id) && (x.password === oldPassword)
      );
      if (!user) {
        return [200, { error: 'Current Password is Wrong!' }];
      } else {
        return [200, { success: 'Password Changed Successfully!' }];
      }
    }
    return [400];
  });
  mock.onPut(CLOSE_ACCOUNT_URL).reply(({ data }) => {
    const { id } = JSON.parse(data);

    if (id) {
      return [200, { success: 'Account Deactivated Successfully!' }];
    }
    return [400];
  });
  mock.onPut(SETUP_TFA_URL).reply(() => {
    return [200, { dataURL: "data:image/png;base64,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" }];
  });
  mock.onPut(VERIFY_TFA_URL).reply(({data}) => {
    const {code} = JSON.parse(data);
    if (code) {
      return [200, { success: "Code Verified!"}];
    } else return [400]
  });
  mock.onPut(ENABLE_TFA_URL).reply(({ headers: { Authorization } }) => {
    const accessToken =
      Authorization &&
      Authorization.startsWith("Bearer ") &&
      Authorization.slice("Bearer ".length);

    if (accessToken) {
      try {
        const decoded = jwt.verify(accessToken, JWT_SECRET);

        if (decoded) {
          return [200, { success: 'Two Factor Authentication Enabled!' }];
        }
      } catch(err) {
        return [401, {message: "You are not Authorized to perform this action" }]
      }
    }
    return [401];
  });
  mock.onPut(DISABLE_TFA_URL).reply(({ headers: { Authorization } }) => {
    const accessToken =
      Authorization &&
      Authorization.startsWith("Bearer ") &&
      Authorization.slice("Bearer ".length);

    if (accessToken) {
      try {
        const decoded = jwt.verify(accessToken, JWT_SECRET);

        if (decoded) {
          return [200, {success: 'Two Factor Authentication Disabled!'}];
        }
      } catch (err) {
        return [401, {message: "You are not Authorized to perform this action"}]
      }
    }
    return [401];
  });

  mock.onGet(ME_URL).reply(({ headers: { Authorization } }) => {
    const accessToken =
        Authorization &&
        Authorization.startsWith("Bearer ") &&
        Authorization.slice("Bearer ".length);

    if (accessToken) {
      try {
        const decoded = jwt.verify(accessToken, JWT_SECRET);
        const user = userTableMock.find(x => x.email === decoded.email);

        if (user) {
          return [200, { ...user, password: undefined, confirmPassword: undefined }];
        }
      } catch(err) {
        return [401, {message: "You are not Authorized to perform this action" }]
      }
    }
    return [401];
  });
}

import { toAbsoluteUrl } from "../utils/utils";

export default [
  {
    id: 1,
    username: "admin",
    password: "demo",
    email: "admin@demo.com",
    accessToken: "access-token-8f3ae836da744329a6f93bf20594b5cc",
    refreshToken: "access-token-f8c137a2c98743f48b643e71161d90aa",
    roles: [1], // Administrator
    pic: toAbsoluteUrl("/media/users/300_25.jpg"),
    firstName: "Sean",
    surName: "Stone",
    occupation: "CEO",
    companyName: "Keenthemes",
    mobileNo: "456669067890",
    address: "L-12-20 Vertex, Cybersquare",
    country: "Melbourne",
    dob: '1990-1-1',
    multiFactorAuth: false,
    socialNetworks: {
      linkedIn: "https://linkedin.com/admin",
      facebook: "https://facebook.com/admin",
      twitter: "https://twitter.com/admin",
      instagram: "https://instagram.com/admin"
    }
  },
  {
    id: 2,
    username: "user",
    password: "demo",
    email: "user@demo.com",
    accessToken: "access-token-8f3ae836da744329a6f93bf20594b5cc",
    refreshToken: "access-token-f8c137a2c98743f48b643e71161d90aa",
    roles: [1], // Administrator
    pic: toAbsoluteUrl("/media/users/300_25.jpg"),
    firstName: "Sean",
    surName: "Stone",
    occupation: "CEO",
    companyName: "Keenthemes",
    mobileNo: "456669067890",
    address: "L-12-20 Vertex, Cybersquare",
    country: "Melbourne",
    multiFactorAuth: true,
    code: '123456',
    dob: '1990-1-1',
    socialNetworks: {
      linkedIn: "https://linkedin.com/admin",
      facebook: "https://facebook.com/admin",
      twitter: "https://twitter.com/admin",
      instagram: "https://instagram.com/admin"
    }
  }
];

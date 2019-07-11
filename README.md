# Roles allowed middleware

A simple Express middleware to check roles on the request.

### Usage

```javascript
var express = require('express');
var roleRequired = require('role-required');

var router = express.Router();

router.use('/admin', roleRequired(["admin"], {
    errorStatus: 403,
    errorMessage: "Forbidden",
    rolesField: "roles"
}));

router.use('/user', roleRequired(["user"]));
```

### Notes
The middleware will check that `req` has a string array named as specified by the `rolesField` option, containing any of the strings passed in the first parameter. The options object, containing status, message and rolesField, is optional and will default to `403`, `Forbidden` and `roles`. The error generated is an `http-error` and can be dealt by `http-error-express` (see related modules).

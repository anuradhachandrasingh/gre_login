export const loginValidate = (values) => {
    // return new Promise((resolve, reject) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Email is required!";
        }

        if (values.email.length > 0) {
            let lastAtPos = values.email.lastIndexOf('@');
            let lastDotPos = values.email.lastIndexOf('.');
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && values.email.indexOf('@@') == -1 && lastDotPos > 2 && (values.email.length - lastDotPos) > 2)) {
               errors["email"] = "Email is not valid";
            
            }
         }

         if (!values.password) {
            errors["password"] = "Password is required";
         }
        return errors;
  }
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../features/Login/authSlice";
import { LoginHandler } from "../../app/api/authApi";
import type { RootState } from "../../app/store";
import * as yup from "yup";
// import FormikInput from "../../helpers/custom-form/FormikInput";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const AuthForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isRegister = useSelector((state: RootState) => state.auth.isRegister);
  const classes = useStyles();
  // Validate form with yup
  const validationSchema = yup.object({
    // {!isLogin && username: yup.string().required("Username is required")},
    // username : {!islogin ? yup.string().required("Username is required") : yup.string()},
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });
  // Handle submit
  const submitHandler = async (values: any) => {
    console.log(values);
    let userInfo, endPoint;
    if (!isRegister) {
      userInfo = {
        email: values.email,
        password: values.password,
      };
      endPoint = "users/login";
    } else {
      userInfo = {
        username: values.username,
        email: values.email,
        password: values.password,
      };
      endPoint = "users";
    }
    dispatch(authActions.loginPending());
    try {
      const userData: any = await LoginHandler(userInfo, endPoint);
      // const userData: any = await getTag();
      if (userData.status === "error") {
        return dispatch(authActions.loginFail(userData.message));
      }
      console.log(userData);
      dispatch(
        authActions.loginSuccess({
          username: userData.user.username,
          email: userData.user.email,
        }),
      );
      history.replace("/");
    } catch (error) {
      dispatch(authActions.loginFail(error.message));
    }
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: submitHandler,
  });
  // switch sign in and sign up
  const switchAuthModeHandler = () => {
    dispatch(authActions.switchAuthModeHandler());
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {!isRegister ? "Sign in" : "Sign up"}
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            {isRegister && (
              <Grid item xs={12}>
                <TextField
                  autoComplete="username"
                  name="username"
                  variant="outlined"
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                  helperText={formik.touched.username && formik.errors.username}
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            {!isRegister ? "Sign In" : "Sign Up"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                to="/auth"
                style={{ color: "#1976d2" }}
                onClick={switchAuthModeHandler}>
                {isRegister
                  ? "Already have an account? Sign in"
                  : "Do not have an acount? Sign up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
export default AuthForm;

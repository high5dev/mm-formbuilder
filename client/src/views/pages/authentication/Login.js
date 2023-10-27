// ** React Imports
import { useContext, Fragment, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin';
import useJwt from '@src/auth/jwt/useJwt';

// ** Third Party Components
import { useDispatch } from 'react-redux';
import { toast, Slide } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form';
import { Facebook, Twitter, Mail, GitHub, HelpCircle, Coffee } from 'react-feather';

// ** Actions
import { handleLogin } from '@store/authentication';

// ** Context
import { AbilityContext } from '@src/utility/context/Can';

// ** Custom Components
import Avatar from '@components/avatar';
import InputPasswordToggle from '@components/input-password-toggle';
import { isUserLoggedIn } from '@utils';
import { getOnboardingStatus } from '../../../utility/Utils';
import { DefaultRoute } from '../../../router/routes';

// ** Utils
import { getHomeRouteForLoggedInUser } from '@utils';

// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Input,
  alart,
  Label,
  Alert,
  Button,
  CardText,
  CardTitle,
  UncontrolledTooltip
} from 'reactstrap';

// ** Styles
import '@styles/react/pages/page-authentication.scss';

import useAuth from '../../../utility/hooks/useAuth';
import { setPermissions, setTemplateData } from '../../../utility/Utils';
import { TemplateContext } from '../../../utility/context/Template';


import {
  getTagsAction,
  getStagesAction,
  getLeadsSourceAction,
  getContactTypesAction
} from '../../contacts/store/actions';
import { handleLogout } from '../../../redux/authentication';
import OrganizationMainModal from '../../../layouts/components/navbar/orgModal';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

const ToastContent = ({ name, role }) => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="success" icon={<Coffee size={12} />} />
        <h6 className="toast-title fw-bold">Welcome, {name}</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span>
        You have successfully logged in as an {role} user to My Manager. Now you can start to
        explore. Enjoy!
      </span>
    </div>
  </Fragment>
);

const defaultValues = {
  password: '',
  loginEmail: ''
};

const Login = () => {
  // ** Hooks
  const { skin } = useSkin();
  const dispatch = useDispatch();
  const history = useHistory();
  const ability = useContext(AbilityContext);
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues });
  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default;

  const { LoginRequest } = useAuth();
  const [alert, setAlert] = useState({
    show: false,
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(true);
  const [userType, setUserType] = useState();


  //Template Context
  const { setElements } = useContext(TemplateContext);

  const fetchData = async () => {
    // ** Fetching Contact List & Contact Types && Contact Fields
    dispatch(getContactTypesAction());
    dispatch(getTagsAction());
    dispatch(getStagesAction());
    dispatch(getLeadsSourceAction());
  };
  const onSubmit = (data) => {
    if (Object.values(data).every((field) => field.length > 0)) {
      setIsLoading(true);
      
      LoginRequest({
        phoneOrEmail: data.loginEmail,
        password: data.password
      })
        .then((res) => {
          setIsLoading(false);

          // Ability Control

          let newAbility = [];

          const permissions = res.userData.plan.permissions
            ? res.userData.plan.permissions
            : res.userData.permissions;

          newAbility = setPermissions(permissions);

          if (newAbility) ability.update(newAbility);

          //set template data
          setElements(setTemplateData(permissions));

          const data = {
            ...res.userData,
            ability: newAbility,
            accessToken: res.accessToken,
            refreshToken: res.refreshToken
          };

          dispatch(handleLogin(data));
          setTimeout(() => {
            fetchData();
          }, 1000);
          history.push(getHomeRouteForLoggedInUser(data.role));
          toast.success(
            <ToastContent
              name={data.fullName || data.username || 'John Doe'}
              //role={data.role || 'admin'}
              role={data.userType || 'user'}
            />,
            {
              icon: false,
              transition: Slide,
              hideProgressBar: true,
              autoClose: 2000
            }
          );
          setLoginSuccess(true);
          setIsModalOpen(true);
        })
        .catch((err) => {
          setIsLoading(false);
          // toast.error('Login Failed! Check Credentials')
          toast.error(err?.response?.data?.msg);

          // setAlert((p) => ({
          //     show: true,
          //     message: Object.entries(
          //         err?.response?.data?.errors
          //     )[0][1]?.msg
          // }))
        });

      // return false
      // useJwt
      //     .login({ email: data.loginEmail, password: data.password })
      //     .then((res) => {
      //         return
      //         const data = {
      //             ...res.data.userData,
      //             accessToken: res.data.accessToken,
      //             refreshToken: res.data.refreshToken
      //         }
      //         dispatch(handleLogin(data))
      //         ability.update(res.data.userData.ability)
      //         history.push(getHomeRouteForLoggedInUser(data.role))
      //         toast.success(
      //             <ToastContent
      //                 name={data.fullName || data.username || 'John Doe'}
      //                 role={data.role || 'admin'}
      //             />,
      //             {
      //                 icon: false,
      //                 transition: Slide,
      //                 hideProgressBar: true,
      //                 autoClose: 2000
      //             }
      //         )
      //     })
      //     .catch((err) => {
      //     })
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual'
          });
        }
      }
    }
  };

  useEffect(() => {
    const checkOnboardingStatus = () => {
      const onboardingStatus = getOnboardingStatus();
      if (!onboardingStatus) {
        setIsOnboarded(false);
      } else {
        // Check if all criteria are met
        const allCriteriaMet = Object.keys(onboardingStatus).every((criteria) => {
          return !!onboardingStatus[criteria];
        });
        console.log(allCriteriaMet);

        setIsOnboarded(allCriteriaMet);
      }
    };

    // Call the function to check onboarding status when the component mounts
    checkOnboardingStatus();
  }, []);

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
          <svg viewBox="0 0 139 95" version="1.1" height="28">
            <defs>
              <linearGradient
                x1="100%"
                y1="10.5120544%"
                x2="50%"
                y2="89.4879456%"
                id="linearGradient-1"
              >
                <stop stopColor="#000000" offset="0%"></stop>
                <stop stopColor="#FFFFFF" offset="100%"></stop>
              </linearGradient>
              <linearGradient
                x1="64.0437835%"
                y1="46.3276743%"
                x2="37.373316%"
                y2="100%"
                id="linearGradient-2"
              >
                <stop stopColor="#EEEEEE" stopOpacity="0" offset="0%"></stop>
                <stop stopColor="#FFFFFF" offset="100%"></stop>
              </linearGradient>
            </defs>
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g id="Artboard" transform="translate(-400.000000, -178.000000)">
                <g id="Group" transform="translate(400.000000, 178.000000)">
                  <path
                    d="M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z"
                    id="Path"
                    className="text-primary"
                    style={{ fill: 'currentColor' }}
                  ></path>
                  <path
                    d="M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z"
                    id="Path"
                    fill="url(#linearGradient-1)"
                    opacity="0.2"
                  ></path>
                  <polygon
                    id="Path-2"
                    fill="#000000"
                    opacity="0.049999997"
                    points="69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325"
                  ></polygon>
                  <polygon
                    id="Path-2"
                    fill="#000000"
                    opacity="0.099999994"
                    points="69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338"
                  ></polygon>
                  <polygon
                    id="Path-3"
                    fill="url(#linearGradient-2)"
                    opacity="0.099999994"
                    points="101.428699 0 83.0667527 94.1480575 130.378721 47.0740288"
                  ></polygon>
                </g>
              </g>
            </g>
          </svg>
          <h2 className="brand-text text-primary ms-1">My Manager</h2>
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login Cover" />
          </div>
        </Col>
        <Col className="d-flex align-items-center auth-bg px-2 p-lg-5" lg="4" sm="12">
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1">
              Welcome to My Manager! 👋
            </CardTitle>
            <CardText className="mb-2">
              Please sign-in to your account and start the adventure
            </CardText>
            {alert.show && (
              <Alert color="danger">
                <div className="alert-body font-small-2">
                  <p>
                    <small className="me-50">{alert.message}</small>
                  </p>
                  {/* <p>
                                        <small className="me-50">
                                            <span className="fw-bold">
                                                Admin:
                                            </span>{' '}
                                            admin@demo.com | admin
                                        </small>
                                    </p>
                                    <p>
                                        <small className="me-50">
                                            <span className="fw-bold">
                                                Client:
                                            </span>{' '}
                                            client@demo.com | client
                                        </small>
                                    </p> */}
                </div>
                <HelpCircle
                  id="login-tip"
                  className="position-absolute"
                  size={18}
                  style={{ top: '10px', right: '10px' }}
                />
                <UncontrolledTooltip target="login-tip" placement="left">
                  Credential Problem
                </UncontrolledTooltip>
              </Alert>
            )}
            <Form className="auth-login-form mt-2" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-1">
                <Label className="form-label" for="login-email">
                  Email or Phone
                </Label>
                <Controller
                  id="loginEmail"
                  name="loginEmail"
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      type="text"
                      placeholder="john@example.com"
                      invalid={errors.loginEmail && true}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="mb-1">
                <div className="d-flex justify-content-between">
                  <Label className="form-label" for="login-password">
                    Password
                  </Label>
                  <Link to="/forgot-password">
                    <small>Forgot Password?</small>
                  </Link>
                </div>
                <Controller
                  id="password"
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle
                      className="input-group-merge"
                      invalid={errors.password && true}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="form-check mb-1">
                <Input type="checkbox" id="remember-me" />
                <Label className="form-check-label" for="remember-me">
                  Remember Me
                </Label>
              </div>
              <Button
                disabled={isLoading}
                type="submit"
                color="primary"
                block
                onClick={() => setLoginSuccess(true)}
              >
                {isLoading ? 'Authenticating...' : 'Sign in'}
              </Button>
            </Form>

            {isUserLoggedIn() || isModalOpen === true && (
              <OrganizationMainModal
                isOnboarded={isOnboarded}
                DefaultRoute={DefaultRoute}
                setUserType={setUserType}
              />
            )}

            <p className="text-center mt-2">
              <span className="me-25">New on our platform?</span>
              <Link to="/register">
                <span>Create an account</span>
              </Link>
            </p>
            <div className="divider my-2">
              <div className="divider-text">or</div>
            </div>
            <div className="auth-footer-btn d-flex justify-content-center">
              <Button color="facebook">
                <Facebook size={14} />
              </Button>
              <Button color="twitter">
                <Twitter size={14} />
              </Button>
              <Button color="google">
                <Mail size={14} />
              </Button>
              <Button className="me-0" color="github">
                <GitHub size={14} />
              </Button>
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Login;

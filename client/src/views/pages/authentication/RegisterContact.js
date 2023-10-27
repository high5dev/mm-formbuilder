// ** React Imports
import { useContext, useMemo, useState, Fragment, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin';
import JwtService from '../../../@core/auth/jwt/jwtService';

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form';
import { Facebook, Twitter, Mail, GitHub } from 'react-feather';

// ** Context
import { AbilityContext } from '@src/utility/context/Can';

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle';

// ** Reactstrap Imports
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Label,
  Button,
  Form,
  Input,
  FormFeedback
} from 'reactstrap';

// ** Styles
import '@styles/react/pages/page-authentication.scss';

// Custom Hooks
import useAuth from '../../../utility/hooks/useAuth';
import { toast, Slide } from 'react-toastify';
import { getUserData } from '../../../auth/utils';

const defaultValues = {
  phoneOrEmail: '',
  terms: false,
  password: '',
  otp: ''
};

const RegisterContact = () => {
  // ** States
  const [org, setOrg] = useState();
  const [path, setPath] = useState('me');
  const [confirmpassword, setConfirmPassowrd] = useState(true);

  // ** Hooks

  const { skin } = useSkin();
  const history = useHistory();
  const { contactTypeId, assignerId, contactId } = useParams();

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
    clearErrors,
    getValues,
    setValue
  } = useForm({ defaultValues });

  const illustration = skin === 'dark' ? 'register-v2-dark.svg' : 'register-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default;

  // JWT
  const jwtConfig = {
    loginEndpoint: `${process.env.REACT_APP_API}auth/signin`,
    registerEndpoint: `${process.env.REACT_APP_API}jwt/register`,
    refreshEndpoint: `${process.env.REACT_APP_API}jwt/refresh-token`,
    logoutEndpoint: `${process.env.REACT_APP_API}jwt/logout`
  };

  const jwt = new JwtService(jwtConfig);
  const {
    sendContactSignupOtp,
    getVisitorInfo,
    contactRegistrationReqeust,
    getContactForLoginRequest
  } = useAuth();
  const [isOtpSended, setIsOtpSended] = useState(false);
  const [countryCode, setCountryCode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const user = getUserData();
  if (user) {
    localStorage.removeItem('userData');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('organization');
  }
  useMemo(() => {
    if (countryCode === null) {
      getVisitorInfo().then((info) => {
        if (info) {
          setCountryCode(
            String(info).split('tls=')[0].split('loc')[1].replace('=', '').replace('\n', '')
          );
        }
      });
    }
  }, [countryCode]);

  useEffect(() => {
    const getContact = async () => {
      const { data } = await getContactForLoginRequest(contactId);
      return data;
    };
    if (contactId) {
      getContact().then((res) => {
        if (res.success === true) {
          //setEmail(res.email)
          setValue('phoneOrEmail', res.email);
        }
      });
    }
  }, [contactId]);

  // Toast
  const ToastContent = ({ message }) => (
    <Fragment>
      <div className="toastify-header">
        <div className="title-wrapper">
          <h6 className="toast-title fw-bold">{message}</h6>
        </div>
      </div>
    </Fragment>
  );

  const onSubmit = () => {
    let data = getValues();
    const tempData = { ...data };
    delete tempData.terms;
    delete tempData.receiveEmails;
    delete tempData.otp;
    delete tempData.password;

    if (isOtpSended) {
      // send Registration Request
      setIsLoading(true);
      contactRegistrationReqeust({
        ...data,
        contactTypeId,
        assignerId,
        organization: path,
        contactId
      })
        .then((response) => {
          if (response.err) {
            toast.error(<ToastContent message={String(response.err)} />);
          } else {
            toast.success(
              <ToastContent message={String(`Account Created Successfully ! Please Login`)} />
            );
            history.push('/login');
          }
          setIsLoading(false);
          setIsOtpSended(false);
        })
        .catch((err) => {
          setIsLoading(false);
          toast.error(<ToastContent message={String(err.msg)} />);
        });

      return;
    }

    // Password matching validation
    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: 'Passwords do not match'
      });
      return;
    }

    if (Object.values(tempData).every((field) => field.length > 0) && data.terms === true && data.receiveEmails===true) {
      setIsLoading(true);
      sendContactSignupOtp({ ...data, countryCode, contactSignup: true, contactId: contactId })
        .then((response) => {
          setIsLoading(false);
          setIsOtpSended(true);
        })
        .catch((err) => {
          setIsLoading(false);
          if (err?.response?.data?.errors === undefined || err?.response?.data?.errors === null) {
            return;
          }
          const errors = Object.entries(err?.response?.data?.errors);

          for (let key of errors) {
            if (key[0] === 'common') {
              toast.error(<ToastContent message={key[1]?.msg} />);
            }

            setError(key[0], {
              type: 'manual',
              message: `${key[1]?.msg} ${key[0]}`
            });
          }
        });
    } else {
      clearErrors();
      for (const key in data) {
        if (data[key]?.length === 0) {
          setError(key, {
            type: 'manual',
            message: `Please enter a valid ${key}`
          });
        }
        if (key === 'terms' && data.terms === false) {
          setError('terms', {
            type: 'manual'
          });
        }
      }
    }
  };

  useEffect(() => {
    setPath(/:\/\/([^\/]+)/.exec(window.location.href)[1].split('.')[0]);
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
              Create Your Account 🚀
            </CardTitle>
            <CardText className="mb-2">Make your app management easy and fun!</CardText>

            <Form action="/" className="auth-register-form mt-2">
              {/* Email Address */}
              {!isOtpSended && (
                <div className="mb-1">
                  <Label className="form-label" for="register-email">
                    Email Address
                  </Label>
                  <Controller
                    id="phoneOrEmail"
                    name="phoneOrEmail"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="phoneOrEmail"
                        placeholder="john@example.com"
                        invalid={errors.phoneOrEmail && true}
                        {...field}
                        //value={email}
                        disabled
                      />
                    )}
                  />
                  {errors.phoneOrEmail ? (
                    <FormFeedback>{errors.phoneOrEmail.message}</FormFeedback>
                  ) : null}
                </div>
              )}

              {/* Password */}
              {!isOtpSended && (
                <div className="mb-1">
                  <Label className="form-label" for="register-password">
                    Password
                  </Label>
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
              )}

              {!isOtpSended && (
                <div className="mb-1">
                  <Label className="form-label" for="confirm-password">
                    Confirm Password
                  </Label>
                  <Controller
                    id="confirmPassword"
                    name="confirmPassword"
                    control={control}
                    rules={{
                      validate: (value) =>
                        value === getValues('password') || 'Passwords do not match'
                    }}
                    render={({ field }) => (
                      <>
                        <InputPasswordToggle
                          className="input-group-merge"
                          invalid={errors.confirmPassword && true}
                          {...field}
                        />
                        {errors.confirmPassword && (
                          <FormFeedback>{errors.confirmPassword.message}</FormFeedback>
                        )}
                      </>
                    )}
                  />
                </div>
              )}

              {!isOtpSended && (
                <div className="form-check mb-1">
                  <Controller
                    name="terms"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="terms"
                        type="checkbox"
                        checked={field.value}
                        invalid={errors.terms && true}
                      />
                    )}
                  />
                  <Label className="form-check-label" for="terms">
                    I agree to
                    <a className="ms-25" href="/" onClick={(e) => e.preventDefault()}>
                      privacy policy & terms
                    </a>
                  </Label>
                </div>
              )}

              {!isOtpSended && (
                <div className="form-check mb-1">
                  <Controller
                    name="receiveEmails"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="receiveEmails"
                        type="checkbox"
                        checked={field.value}
                        invalid={errors.receiveEmails && true}
                      />
                    )}
                  />
                  <Label className="form-check-label" for="receiveEmails">
                    I agree to receive necessary emails and text messages
                  </Label>
                </div>
              )}

              {/* OTP */}
              {isOtpSended && (
                <div className="mb-1">
                  <Label className="form-label" for="register-password">
                    OTP
                  </Label>
                  <Controller
                    id="otp"
                    name="otp"
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="input-group-merge"
                        invalid={errors.otp && true}
                        {...field}
                      />
                    )}
                  />
                </div>
              )}

              <Button type="button" onClick={onSubmit} block color="primary" disabled={isLoading}>
                {isLoading ? 'Processing...' : isOtpSended ? 'Complete' : 'Sign up'}
              </Button>
            </Form>
            <p className="text-center mt-2">
              <span className="me-25">Already have an account?</span>
              <Link to={`/login/${contactTypeId}/${assignerId}`}>
                <span>Sign in instead</span>
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

export default RegisterContact;

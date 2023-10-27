// ** Third Party Components
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { CheckCircle } from 'react-feather';
import { BsCheck2Circle, BsCheckCircleFill } from 'react-icons/bs';

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  Badge,
  ListGroup,
  ListGroupItem,
  Button,
  CardHeader,
  Label
} from 'reactstrap';

const PricingCards = ({ data, duration, bordered, fullWidth, cols }) => {
  const colsProps = cols ? cols : { md: 4, xs: 12 };

  const [isMobileView, setIsMobileView] = useState(false);
  const [isTabletView, setIsTabletView] = useState(false);
  const [isDesktopView, setIsDesktopView] = useState(false);

  //Mobile View
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const isMobile = windowWidth <= 767;
      const isTablet = windowWidth >= 768 && windowWidth <= 1023;
      const isDesktop = windowWidth >= 1024;

      setIsMobileView(isMobile);
      setIsTabletView(isTablet);
      setIsDesktopView(isDesktop);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const renderPricingCards = () => {
    return data.map((item, index) => {
      const monthlyPrice = duration === 'yearly' ? item.pricePerYear : item.pricePerMonth,
        yearlyPrice = duration === 'yearly' ? item.pricePerYear : item.pricePerMonth,
        imgClasses =
          item.name === 'Basic'
            ? 'mb-2 mt-5'
            : item.name === 'Standard'
            ? 'mb-2 mt-5'
            : 'mb-2 mt-5';

      return (
        <Col
          key={index}
          {...colsProps}
          style={{ width: isTabletView ? '100%' : '', marginRight: 0, marginLeftL: 0, padding: 0 }}
        >
          <Card
            className={classnames('text-center', {
              border: bordered,
              '': bordered,
              popular: item.popular === true,
              'border-primary': bordered && item.popular === true,
              [`${item?.name?.toLowerCase()}-pricing`]: item.name
            } )}
            id={item.name === 'Standard' ? 'standard-wrapper' : ''}
            style={{
              height: item.name === 'Basic' ? '50rem' : item.name === 'Standard' ? '55rem' : '50rem',
            }}
          >
            <CardHeader
              className="d-flex justify-content-center"
              style={{
                backgroundColor:
                  item.name === 'Basic' ? '#c7c6c6' : item.name === 'Standard' ? 'blue' : 'green'
              }}
            >
              <h4 style={{ color: 'white', fontSize: '22px' }}>{item.name}</h4>
            </CardHeader>

            <CardBody>
              {item.popular === true ? (
                <div className="pricing-badge text-end">
                  <Badge color="light-primary" pill>
                    Popular
                  </Badge>
                </div>
              ) : null}
              {/* <img className={imgClasses} src={item.img} alt="pricing svg" /> */}
              <CardText className="mt-3">{item.description}</CardText>

              <div className="annual-plan">
                <div className="plan-price mt-2">
                  <sup className="font-medium-1 fw-bold text-primary me-25">$</sup>
                  <span
                    className={`pricing-${item.name.toLowerCase()}-value fw-bolder text-primary`}
                  >
                    {monthlyPrice}
                  </span>
                  <span className="pricing-duration text-body font-medium-1 fw-bold ms-25">
                    /month
                  </span>
                </div>
                {item.name !== 'Basic' && duration === 'yearly' ? (
                  <small className="annual-pricing text-muted">USD {yearlyPrice} / year</small>
                ) : null}
              </div>
              <div>
                {item.name === 'Basic' ? (
                  <span>Per user/month when billed annually</span>
                ) : item.name === 'Standard' ? (
                  <span>Per user/month when billed annually</span>
                ) : (
                  <span>Tailored to your company's needs</span>
                )}
              </div>
              <Button
                block
                outline={item.name !== 'Standard'}
                color={item.name === 'Basic' ? 'success' : 'primary'}
                className="mt-1"
              >
                {item.name === 'Basic'
                  ? 'Your current plan'
                  : item.name === 'Standard'
                  ? 'Upgrade'
                  : 'Contact Us'}
              </Button>

              <hr />
              <div className="text-start mb-2">
                {item.name === 'Basic' ? (
                  <>
                    <div className="d-flex">
                      <BsCheckCircleFill
                        style={{ color: '#3fba05', height: '20px', width: '22px' }}
                      />
                      <p style={{ marginLeft: '10px' }}>Unlimited meetings, tasks & projects</p>
                    </div>

                    <div className="d-flex">
                      <BsCheckCircleFill
                        style={{ color: '#3fba05', height: '20px', width: '20px' }}
                        size={16}
                      />
                      <p style={{ marginLeft: '10px' }}>No team members limit</p>
                    </div>
                    <div className="d-flex">
                      <BsCheckCircleFill
                        style={{ color: '#3fba05', height: '20px', width: '28px' }}
                        size={20}
                      />
                      <p style={{ marginLeft: '10px' }}>Unlimited meetings, participants & free</p>
                    </div>
                    <div className="d-flex">
                      <BsCheckCircleFill
                        style={{ color: '#3fba05', height: '20px', width: '20px' }}
                        size={16}
                      />
                      <p style={{ marginLeft: '10px' }}>Sync tasks to your calendar</p>
                    </div>
                    <div className="d-flex">
                      <BsCheckCircleFill
                        style={{ color: '#3fba05', height: '20px', width: '35px' }}
                      />
                      <p style={{ marginLeft: '10px' }}>
                        Export tasks from meetings & projects to Excel
                      </p>
                    </div>
                    <div className="d-flex">
                      <BsCheckCircleFill
                        style={{ color: '#3fba05', height: '20px', width: '20px' }}
                        size={16}
                      />
                      <p style={{ marginLeft: '10px' }}>Admin controls</p>
                    </div>
                    <div className="d-flex">
                      <BsCheckCircleFill
                        style={{ color: '#3fba05', height: '20px', width: '20px' }}
                      />
                      <p style={{ marginLeft: '10px' }}>
                        Dashboard to follow up on the progress of your work
                      </p>
                    </div>
                    <div className="d-flex"></div>
                  </>
                ) : item.name === 'Standard' ? (
                  <>
                    <h5>Pro includes everything in Starter, plus</h5>
                    <div className="d-flex mt-2">
                      <BsCheckCircleFill
                        style={{ color: '#3fba05', height: '20px', width: '26px' }}
                        size={16}
                      />
                      <p style={{ marginLeft: '10px' }}>
                        Extend your tasks with custom task fields
                      </p>
                    </div>
                    <div className="d-flex">
                      <BsCheckCircleFill
                        style={{ color: '#3fba05', height: '20px', width: '24px' }}
                        size={16}
                      />
                      <p style={{ marginLeft: '10px' }}>Create your own project templates limit</p>
                    </div>
                    <div className="d-flex">
                      <BsCheckCircleFill
                        style={{ color: '#3fba05', height: '20px', width: '27px' }}
                        size={16}
                      />
                      <p style={{ marginLeft: '10px' }}>
                        Use checklist to templates for repetitive work
                      </p>
                    </div>
                    <div className="d-flex">
                      <BsCheckCircleFill
                        style={{ color: '#3fba05', height: '20px', width: '35px' }}
                        size={16}
                      />
                      <p style={{ marginLeft: '10px' }}>
                        Control what users can do with advanced task permissions
                      </p>
                    </div>
                    <div className="d-flex">
                      <BsCheckCircleFill
                        style={{ color: '#3fba05', height: '20px', width: '20px' }}
                        size={16}
                      />
                      <p style={{ marginLeft: '10px' }}>Task dependencies</p>
                    </div>
                    <div className="d-flex">
                      <BsCheckCircleFill
                        style={{ color: '#3fba05', height: '20px', width: '40px' }}
                        size={16}
                      />
                      <p style={{ marginLeft: '10px' }}>
                        Sync tasks from meetings & projects to sharepoint task lists
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <h5>Enterprise includes everything in Pro, plus</h5>
                    <div className="d-flex mt-2">
                      <BsCheckCircleFill
                        style={{ color: '#3fba05', height: '20px', width: '40px' }}
                        size={16}
                      />
                      <p style={{ marginLeft: '10px' }}>
                        Assistance from our onboarding success team to help you get started
                      </p>
                    </div>
                    <div className="d-flex">
                      <BsCheckCircleFill
                        style={{ color: '#3fba05', height: '20px', width: '20px' }}
                        size={16}
                      />
                      <p style={{ marginLeft: '10px' }}>Priority support</p>
                    </div>
                    <div className="d-flex">
                      <BsCheckCircleFill
                        style={{ color: '#3fba05', height: '20px', width: '24px' }}
                        size={16}
                      />
                      <p style={{ marginLeft: '10px' }}>Request a full export of all your data</p>
                    </div>
                  </>
                )}

                {/* {item.benefits.map((benefit, i) => (
                  <Label key={i} tag="li">
                    {benefit}
                  </Label>
                ))} */}
              </div>
            </CardBody>
          </Card>
        </Col>
      );
    });
  };

  const defaultCols = {
    sm: { offset: 2, size: 10 },
    lg: { offset: 2, size: 10 }
  };

  return (
    <Row className="pricing-card mb-2">
      <Col {...(!fullWidth ? defaultCols : {})} className={classnames({ 'mx-auto': !fullWidth })}>
        <Row>{renderPricingCards()}</Row>
      </Col>
    </Row>
  );
};

export default PricingCards;

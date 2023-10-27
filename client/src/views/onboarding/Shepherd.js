import { Fragment, useEffect, useContext, useRef } from 'react';
import { ShepherdTour, ShepherdTourContext } from 'react-shepherd';
import '../../assets/styles/onboarding.scss';
import { setCurrentShepherd } from './store/reducer';

// ** Onboarding Tours Options
const tourOptions = {
  defaultStepOptions: { showCancelLink: true },
  useModalOverlay: true,
  keyboardNavigation: false
};

// ** Onboarding Tour Start Component
function Start({ setShepherd, setTourComplete }) {
  const tour = useContext(ShepherdTourContext);

  useEffect(() => {
    if (tour && !tour.isActive()) {
      tour.start();
      if (setShepherd) {
        setShepherd(tour);
      }
    }

    const handleTourComplete = () => {
      setTourComplete(true);
      setCurrentShepherd(null);
      if (setShepherd) {
        setShepherd(null);
      }
    };

    const handleTourCancel = () => {
      console.log('tour canceled');
      setCurrentShepherd(null);
      if (setShepherd) {
        setShepherd(null);
      }
    };

    if (tour) {
      tour.on('complete', handleTourComplete);
      tour.on('cancel', handleTourCancel);
    }

    return () => {
      console.log('tour returned');
      if (tour) {
        tour.off('complete', handleTourComplete);
        if (setShepherd) {
          setShepherd(null);
        }
      }
    };
  }, [tour]);

  return null;
}

const Shepherd = ({ steps, setShepherd, setTourComplete }) => {
  return (
    <Fragment>
      <ShepherdTour steps={steps} tourOptions={tourOptions}>
        <Start setShepherd={setShepherd} setTourComplete={setTourComplete} />
      </ShepherdTour>
    </Fragment>
  );
};

export default Shepherd;

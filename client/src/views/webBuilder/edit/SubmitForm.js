import Envolope from '../../../assets/img/thank-you.png';

export default function SubmitForm() {
  return (
    <div className="thankyoucontent h-100">
      <div className="sub-wrapper-1">
        <div className="sub-wrapper-2">
          <div className="d-flex justify-content-center ">
            <img src={Envolope} alt="thank-you-envelope" border="0" className="w-50" />
          </div>
          <h4 className="cssanimation sequence zoomInRight">YAY! Submitted successfully! 🥳</h4>
          <p>You will hear from us soon!</p>
        </div>
      </div>
    </div>
  );
}

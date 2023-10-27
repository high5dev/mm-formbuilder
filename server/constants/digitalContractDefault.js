const signText =
  "By applying my electronic signature to this agreement, I agree that my electronic signature is the legally binding equivalent of my handwritten signature on paper. I will not, at any future time, claim that my electronic signature is not legally binding or enforceable. By applying my electronic signature to this agreement, I also agree that I have read and accept all the terms of this agreement.";

const generateAddress = (address) => {
  return `${address?.street} ${address?.city} ${address?.state} ${address.country} ${address?.zipCode}`;
};
const generateContract = ({ ...data }) => {
  return ``;
};

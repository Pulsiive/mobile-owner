import API from './API';

class Backend {
  register = async (googleCredential) => {
    const res = await API.send(
      'POST',
      '/api/v1/oauth/google/register',
      { credential: googleCredential },
      false
    );
    return res;
  };
  login = async (googleCredential) => {
    const res = await API.send(
      'POST',
      '/api/v1/oauth/google/login',
      { credential: googleCredential },
      false
    );
    return res;
  };
  reqPhoneNumberOTP = async (phoneNumber) => {
    const res = await API.send('POST', '/api/v1/phone-number/request', { phoneNumber }, false);
    return res;
  };

  InitRegister = async (data) => {
    const res = await API.send('POST', '/api/v1/auth/register', { data: data }, true);
    return res;
  };
  verifyPhoneNumberOTP = async (otp, phoneNumber) => {
    console.log({ phoneNumber });
    const res = await API.send(
      'POST',
      `/api/v1/phone-number/verify?otp=${otp}`,
      { phoneNumber },
      false
    );
    return res;
  };

  reqEmailToken = async (email) => {
    const res = await API.send('POST', '/api/v1/emailVerification', { email }, false);
    return res;
  };

  verifyEmailToken = async (email, token) => {
    const res = await API.send(
      'POST',
      `/api/v1/requestEmailVerification/${token}`,
      { email },
      false
    );
    return res;
  };

  contact = async () => {
    const res = await API.send('GET', '/api/v1/profile/contacts', null, true);
    return res;
  };

  me = async () => {
    const res = await API.send('GET', '/api/v1/profile', null, true);
    return res;
  };

  async createStripePaymentIntent() {
    return await API.send('POST', '/api/v1/payment-request', null, true);
  }

  submitPayment = async (paymentIntentId) => {
    const res = await API.send(
      'POST',
      '/api/v1/payment',
      { payment_intent_id: paymentIntentId },
      true
    );
    return res;
  };
}

const service = new Backend();
export default service;

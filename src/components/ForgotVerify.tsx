
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import LogoImage from '/gsa_logo.jpg'; // Replace with your logo path
import axios from 'axios';

const ForgotVerifyOTP: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [otp, setOtp] = useState<string>('');
  const [hcaptchaToken, setHcaptchaToken] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number>(0); // State to track countdown
  const [resendDisabled, setResendDisabled] = useState<boolean>(false); // State to disable resend button
  const [buttonClicked, setButtonClicked] = useState<boolean>(false); // State to manage button click animation

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!hcaptchaToken) {
      setError('Please complete the captcha');
      return;
    }

    try {
      const response = await axios.post(
        'http://gsa.nuviontech.com:8000/api/forgotpasswordverifyotp/',
        {
          email: localStorage.getItem('user_email'),
          token : localStorage.getItem('token'),
          otp: otp,
          hcaptcha_token: hcaptchaToken,
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        navigate('/home');
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        setError(error.response.data.error);
      } else {
        setError('Failed to verify OTP. Please try again later.');
      }
    }
  };

  const handleResendOTP = async () => {
    if (resendDisabled) return;

    setButtonClicked(true); // Trigger button animation
    setResendDisabled(true);
    const newCountdown = 120; // Set countdown for 2 minutes
    localStorage.setItem('otpCountdown', `${Date.now() + newCountdown * 1000}`); // Store the countdown end time
    setCountdown(newCountdown);

    try {
      const response = await axios.post(
        'http://gsa.nuviontech.com:8000/api/resend-otp/',
        {
          email: localStorage.getItem('user_email'),
        }
      );
      console.log(response);

      if (response.status === 200) {
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
      setError('Failed to resend OTP. Please try again later.');
    }

    // Reset button clicked state after animation duration
    setTimeout(() => {
      setButtonClicked(false);
    }, 500); // Duration should match the CSS animation time
  };

  useEffect(() => {
    const storedCountdown = localStorage.getItem('otpCountdown');
    if (storedCountdown) {
      const remainingTime = Math.floor(
        (parseInt(storedCountdown) - Date.now()) / 1000
      );
      if (remainingTime > 0) {
        setCountdown(remainingTime);
        setResendDisabled(true);
      }
    }

    const timer = setInterval(() => {
      if (countdown > 0) {
        setCountdown((prev) => {
          if (prev <= 1) {
            setResendDisabled(false);
            localStorage.removeItem('otpCountdown');
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleCaptchaSuccess = (token: string) => {
    setHcaptchaToken(token);
  };

  const handleCaptchaExpire = () => {
    setHcaptchaToken(null);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="absolute top-4 left-4 flex items-center space-x-2 md:space-x-3 md:top-8 md:left-8">
        <img
          src={LogoImage}
          alt="Logo"
          className="w-10 h-10 rounded-full md:w-12 md:h-12"
        />
        <h1 className="text-lg md:text-2xl font-bold text-gray-800">
          Gandhinagar Sports Academy
        </h1>
      </div>

      <div className="relative z-10 bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden max-w-md md:max-w-4xl w-full">
        <div className="hidden md:block md:w-1/2 p-2">
          <img
            src="/cricketer.jpg"
            alt="Sports Background"
            className="object-cover h-full w-full rounded-md"
          />
        </div>

        <div className="w-full md:w-1/2 p-6 md:p-8">
          <Link
            to="/forgotpassword"
            className="text-blue-500 hover:underline mb-4 block"
          >
            &larr; Back to Forgot Password
          </Link>

          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 text-gray-800">
            Verify OTP
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4 md:mb-6">
              <label htmlFor="otp" className="block text-gray-700 mb-2">
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter the OTP sent to your email"
                required
              />
            </div>

            <div className="mb-4" style={{ display: 'flex', justifyContent: 'center' }}>
              <HCaptcha
                sitekey="0c5428a0-f780-455c-af54-5298b6eedfd2"
                onVerify={handleCaptchaSuccess}
                onExpire={handleCaptchaExpire}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
              disabled={!hcaptchaToken}
            >
              Verify OTP
            </button>
          </form>

          <p className="mt-6 md:mt-8 text-center text-gray-600">
            Didn't receive the OTP?{' '}
            <button
              onClick={handleResendOTP}
              className={`resend-button w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 ${
                buttonClicked ? 'clicked' : ''
              }`}
              disabled={resendDisabled}
            >
              {resendDisabled
                ? `Resend OTP (${formatTime(countdown)})`
                : 'Resend OTP'}
            </button>
          </p>
          {error && <div className="text-red-500 mb-4">{error}</div>}
        </div>
      </div>

      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 text-right space-y-1 md:space-y-2 z-10">
        <Link
          to="/privacy-policy"
          className="text-xs md:text-sm hover:underline block"
        >
          Privacy Policy
        </Link>
        <Link
          to="/terms-and-conditions"
          className="text-xs md:text-sm hover:underline block"
        >
          Terms and Conditions
        </Link>
        <Link
          to="/refund-policy"
          className="text-xs md:text-sm hover:underline block"
        >
          Refund Policy
        </Link>
      </div>
    </div>
  );
};

export default ForgotVerifyOTP;
import React, { useState, useRef, useEffect } from 'react';
import './LoginPage.css';
import { 
  Smartphone, 
  Lock, 
  ArrowRight, 
  CheckCircle, 
  Shield,
  Clock,
  AlertCircle,
  RefreshCw,
  SmartphoneIcon
} from 'lucide-react';

const LoginPage = () => {
  const [step, setStep] = useState(1); // 1: Phone Input, 2: OTP Input, 3: Success
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  
  const otpRefs = useRef([]);

  // Simulate OTP - In production, this would come from your backend
  const generatedOTP = '123456';

  // Countdown timer for OTP resend
  useEffect(() => {
    if (step === 2 && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setIsResendDisabled(false);
    }
  }, [step, countdown]);

  // Handle phone number input
  const handlePhoneNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhoneNumber(value);
    setError('');
  };

  // Handle OTP input
  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      value = value[value.length - 1]; // Take only last character
    }
    
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto focus next input
      if (value && index < 5) {
        otpRefs.current[index + 1]?.focus();
      }
      
      // Auto verify if all digits are entered
      if (newOtp.every(digit => digit !== '') && index === 5) {
        setTimeout(() => verifyOTP(newOtp.join('')), 300);
      }
    }
  };

  // Handle OTP backspace
  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  // Send OTP to phone number
  const sendOTP = async () => {
    if (!phoneNumber || phoneNumber.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setIsLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
      setCountdown(30);
      setIsResendDisabled(true);
      
      // For demo: Show OTP in console
      console.log('OTP for', phoneNumber, 'is:', generatedOTP);
      
      // In production: Make API call to send OTP
      // await sendOTPToPhone(phoneNumber);
    }, 1500);
  };

  // Verify entered OTP
  const verifyOTP = async (enteredOtp) => {
    if (enteredOtp.length !== 6) {
      setError('Please enter complete 6-digit OTP');
      return;
    }

    setIsLoading(true);
    setError('');
    
    // Simulate API verification
    setTimeout(() => {
      if (enteredOtp === generatedOTP) {
        setIsLoading(false);
        setStep(3);
        
        // In production: Redirect to dashboard
        // setTimeout(() => {
        //   window.location.href = '/dashboard';
        // }, 2000);
      } else {
        setIsLoading(false);
        setError('Invalid OTP. Please try again.');
        
        // Clear OTP fields
        setOtp(['', '', '', '', '', '']);
        otpRefs.current[0]?.focus();
      }
    }, 1500);
  };

  // Resend OTP
  const resendOTP = () => {
    if (isResendDisabled) return;
    
    setIsLoading(true);
    setError('');
    
    // Simulate resend API call
    setTimeout(() => {
      setIsLoading(false);
      setCountdown(30);
      setIsResendDisabled(true);
      setError('New OTP sent successfully!');
      
      // In production: Resend OTP API call
      // await resendOTPToPhone(phoneNumber);
    }, 1500);
  };

  // Format phone number for display
  const formatPhoneNumber = (number) => {
    if (number.length <= 3) return number;
    if (number.length <= 6) return `${number.slice(0, 3)}-${number.slice(3)}`;
    return `${number.slice(0, 3)}-${number.slice(3, 6)}-${number.slice(6)}`;
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left Side - Illustration */}
        <div className="login-illustration">
          <div className="illustration-content">
            <div className="phone-animation">
              <div className="phone-screen">
                <div className="otp-message">
                  <Lock size={40} className="lock-icon" />
                  <h3>Secure Login</h3>
                  <p>Your OTP is on the way</p>
                </div>
                <div className="otp-display">
                  <span className="otp-digit">1</span>
                  <span className="otp-digit">2</span>
                  <span className="otp-digit">3</span>
                  <span className="otp-digit">4</span>
                  <span className="otp-digit">5</span>
                  <span className="otp-digit">6</span>
                </div>
              </div>
            </div>
            
            <div className="features-list">
              <div className="feature-item">
                <Shield size={20} />
                <span>100% Secure Login</span>
              </div>
              <div className="feature-item">
                <Clock size={20} />
                <span>OTP Expires in 30s</span>
              </div>
              <div className="feature-item">
                <SmartphoneIcon size={20} />
                <span>No Password Required</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="login-form-section">
          <div className="form-wrapper">
            <div className="form-header">
              <div className="logo">
                <Lock size={32} className="logo-icon" />
                <h1>FreshCart</h1>
              </div>
              <p className="welcome-text">Welcome back! Please login to continue</p>
              
              {/* Progress Steps */}
              <div className="progress-steps">
                <div className={`step ${step >= 1 ? 'active' : ''}`}>
                  <div className="step-number">1</div>
                  <span>Phone Number</span>
                </div>
                <div className="step-connector"></div>
                <div className={`step ${step >= 2 ? 'active' : ''}`}>
                  <div className="step-number">2</div>
                  <span>Enter OTP</span>
                </div>
                <div className="step-connector"></div>
                <div className={`step ${step === 3 ? 'active' : ''}`}>
                  <div className="step-number">3</div>
                  <span>Success</span>
                </div>
              </div>
            </div>

            {/* Step 1: Phone Number Input */}
            {step === 1 && (
              <div className="step-content">
                <div className="input-group">
                  <label className="input-label">
                    <Smartphone size={20} />
                    Mobile Number
                  </label>
                  <div className="phone-input-wrapper">
                    <div className="country-code">
                      <span>+91</span>
                    </div>
                    <input
                      type="tel"
                      value={formatPhoneNumber(phoneNumber)}
                      onChange={handlePhoneNumberChange}
                      placeholder="Enter 10-digit mobile number"
                      className="phone-input"
                      maxLength="12"
                      disabled={isLoading}
                    />
                  </div>
                  <p className="input-hint">
                    We'll send a 6-digit OTP to this number
                  </p>
                </div>

                {error && (
                  <div className="error-message">
                    <AlertCircle size={16} />
                    {error}
                  </div>
                )}

                <button
                  onClick={sendOTP}
                  disabled={isLoading || phoneNumber.length !== 10}
                  className="send-otp-btn"
                >
                  {isLoading ? (
                    <>
                      <div className="spinner-small"></div>
                      Sending OTP...
                    </>
                  ) : (
                    <>
                      Send OTP
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>

                <div className="terms-text">
                  By continuing, you agree to our 
                  <a href="/terms"> Terms of Service</a> and 
                  <a href="/privacy"> Privacy Policy</a>
                </div>
              </div>
            )}

            {/* Step 2: OTP Input */}
            {step === 2 && (
              <div className="step-content">
                <div className="otp-header">
                  <h3>Enter OTP</h3>
                  <p>
                    OTP sent to 
                    <span className="phone-number"> +91 {formatPhoneNumber(phoneNumber)}</span>
                  </p>
                </div>

                <div className="otp-input-group">
                  <div className="otp-inputs">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={el => otpRefs.current[index] = el}
                        type="text"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        maxLength="1"
                        className="otp-input"
                        disabled={isLoading}
                      />
                    ))}
                  </div>
                  
                  <div className="otp-timer">
                    <Clock size={16} />
                    <span>Resend OTP in {countdown}s</span>
                  </div>
                </div>

                {error && (
                  <div className="error-message">
                    <AlertCircle size={16} />
                    {error}
                  </div>
                )}

                <div className="otp-actions">
                  <button
                    onClick={() => verifyOTP(otp.join(''))}
                    disabled={isLoading || otp.some(digit => digit === '')}
                    className="verify-otp-btn"
                  >
                    {isLoading ? (
                      <>
                        <div className="spinner-small"></div>
                        Verifying...
                      </>
                    ) : (
                      'Verify OTP'
                    )}
                  </button>

                  <button
                    onClick={resendOTP}
                    disabled={isResendDisabled || isLoading}
                    className="resend-otp-btn"
                  >
                    <RefreshCw size={16} />
                    Resend OTP
                  </button>
                </div>

                <div className="change-number">
                  <button
                    onClick={() => {
                      setStep(1);
                      setError('');
                      setOtp(['', '', '', '', '', '']);
                    }}
                    className="change-number-btn"
                  >
                    Change Phone Number
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Success */}
            {step === 3 && (
              <div className="step-content success-content">
                <div className="success-animation">
                  <CheckCircle size={80} className="success-icon" />
                  <div className="success-checkmark">
                    <div className="check-icon"></div>
                  </div>
                </div>
                
                <div className="success-text">
                  <h3>Login Successful!</h3>
                  <p>Welcome back to FreshCart</p>
                </div>

                <div className="redirecting">
                  <div className="spinner"></div>
                  <p>Redirecting to dashboard...</p>
                </div>

                <div className="demo-note">
                  <Shield size={16} />
                  <span>This is a demo. In production, you would be redirected to your dashboard.</span>
                </div>
              </div>
            )}

            {/* Demo Note */}
            <div className="demo-info">
              <div className="demo-note-card">
                <h4>Demo Credentials</h4>
                <p>Use any 10-digit number. OTP is always: <strong>123456</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
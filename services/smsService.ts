
/**
 * SMS Service for Nivra
 * In a production environment, this would interface with a backend 
 * or a service like Twilio, AWS SNS, or Firebase Auth.
 */

export const sendOTP = async (phoneNumber: string): Promise<string> => {
  console.log(`[SMS Gateway] Initiating secure OTP delivery to: ${phoneNumber}`);
  
  // Simulate network latency for a realistic "actual" feel
  await new Promise(resolve => setTimeout(resolve, 1800));
  
  // Generate a random 4-digit code
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  
  // In a real app, this would be a POST request to an SMS API
  // We log it to the console so you can see the "actual" code during testing
  console.log(`%c [NIVRA SECURITY] code for ${phoneNumber}: ${otp} `, 'background: #6366f1; color: white; font-weight: bold; padding: 4px; border-radius: 4px;');
  
  // Also showing a system alert to simulate the push notification/SMS arrival if the user is on desktop
  // In a real scenario, the user would check their messages.
  return otp;
};

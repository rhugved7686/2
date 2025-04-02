'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

interface LoginResponse {
  success: boolean;
  message: string;
  username?: string;
  role?: string;
  token?: string;
  email?: string;
  address?: string;
  userId?: string;
}

export default function LoginPage() {
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      console.log('Submitting login form with mobile number:', mobileNo);
      
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          mobileNo,  // This will be transformed to 'mobile' in the API route
          password 
        }),
      });
      
      console.log('Login response status:', response.status);
      
      let data;
      try {
        data = await response.json();
        console.log('Login response:', data);
      } catch (err) {
        console.error('Failed to parse JSON response:', err);
        throw new Error('Invalid response format from server');
      }
      
      if (response.ok && data.success) {
        // Store user info in localStorage
        if (data.username) {
          localStorage.setItem('username', data.username);
          console.log('Debug - Saved username to localStorage:', data.username);
        }
        if (data.role) {
          // Normalize role to uppercase
          const role = data.role.toUpperCase();
          localStorage.setItem('userRole', role);
          console.log('Debug - Saved role to localStorage:', role);
        }
        if (data.token) {
          localStorage.setItem('token', data.token);
          console.log('Debug - Saved token to localStorage:', data.token);
        }
        
        // Also store mobile number for profile display
        localStorage.setItem('mobileNo', mobileNo);
        
        // Store any additional user data if available
        if (data.email) {
          localStorage.setItem('email', data.email);
        }
        if (data.address) {
          localStorage.setItem('address', data.address);
        }
        if (data.userId) {
          localStorage.setItem('userId', data.userId);
        }
        
        // Store all user data in a consolidated object for easy access
        localStorage.setItem('user', JSON.stringify({
          username: data.username || '',
          email: data.email || '',
          mobileNo: mobileNo,
          role: (data.role || 'USER').toUpperCase(),
          address: data.address || '',
          userId: data.userId || '',
          isLoggedIn: true
        }));
        
        console.log('Debug - All localStorage items after login:', {
          username: localStorage.getItem('username'),
          role: localStorage.getItem('userRole'),
          token: localStorage.getItem('token'),
          mobileNo: localStorage.getItem('mobileNo')
        });

        setSuccessMessage('Login successful! Redirecting...');
        setShowSuccessMessage(true);
        
        // Redirect to appropriate page based on role
        setTimeout(() => {
          const role = localStorage.getItem('userRole');
          console.log('Redirecting based on role:', role);
          
          if (role === 'ADMIN') {
            router.push('/admin/dashboard');
          } else if (role === 'VENDOR') {
            router.push('/vendor/dashboard');
          } else {
            // Default to home page for regular users
            router.push('/');
          }
        }, 2000);
      } else {
        // Clear password field on error
        setPassword('');
        console.error('Login failed:', data.message);
        setError(data.message || 'Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setPassword(''); // Clear password field
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Clear error when user starts typing
  const handleInputChange = (setter: (value: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    if (error) {
      setError('');
    }
  };

  // Clear error message when URL changes
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('error')) {
      setError('Invalid mobile number or password.');
    }
    
    // Check if coming from successful registration
    if (typeof window !== 'undefined') {
      const registrationSuccess = localStorage.getItem('registrationSuccess');
      const registrationMessage = localStorage.getItem('registrationMessage');
      
      if (registrationSuccess === 'true') {
        setShowSuccessMessage(true);
        setSuccessMessage(registrationMessage || 'Registration successful! Please log in.');
        
        // Clear the registration success flags
        localStorage.removeItem('registrationSuccess');
        localStorage.removeItem('registrationMessage');
      }
    }
  }, []);

  // Disable right-click and Ctrl+U
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
      }
    };
    
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className={styles['login-page']}>
      <div className={styles['red-background']}>
        <h1 className={styles['form-heading']}>Log in to your account</h1>
        <p className={styles['sign-in-text']}>
          Don't have an account? <Link href="/Register" className={styles['link-info']}>Create an account</Link>
        </p>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className={`${styles['alert']} ${styles['alert-danger']} ${styles['animate-fade-in-down']}`}>
              {error}
            </div>
          )}

          {showSuccessMessage && (
            <div className={`${styles['alert']} ${styles['alert-success']} ${styles['animate-fade-in-down']}`}>
              {successMessage}
            </div>
          )}

          <div className={styles['form-group']}>
            <label htmlFor="mobileNo" className={styles['form-label']}>Mobile Number</label>
            <div className={styles['input-wrapper']}>
              <input 
                type="text" 
                id="mobileNo" 
                name="mobileNo" 
                placeholder="Enter your mobile number"
                autoFocus
                className={`${styles['form-control']} ${styles['input-with-icon']}`}
                value={mobileNo}
                onChange={handleInputChange(setMobileNo)}
                required
                disabled={isLoading}
              />
              <span className={styles['input-icon']}>📱</span>
            </div>
          </div>

          <div className={styles['form-group']}>
            <label htmlFor="password" className={styles['form-label']}>Password</label>
            <div className={styles['input-wrapper']}>
              <input 
                type="password" 
                placeholder="Enter your password" 
                id="password" 
                name="password"
                className={`${styles['form-control']} ${styles['input-with-icon']}`}
                value={password}
                onChange={handleInputChange(setPassword)}
                required
                disabled={isLoading}
              />
              <span className={styles['input-icon']}>🔒</span>
            </div>
          </div>

          <button 
            className={`${styles['login-button']} ${isLoading ? styles['loading'] : ''}`}
            type="submit" 
            name="login-submit"
            id="login-submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className={styles['loading-text']}>
                <span className={styles['loading-spinner']}></span>
                Logging in...
              </span>
            ) : (
              'Log in'
            )}
          </button>

          <p className={styles['sign-in-text']} style={{ marginTop: '20px' }}>
            <Link href="/" className={styles['link-info']}>Forgot password?</Link>
          </p>
        </form>
      </div>
    </div>
  );
} 
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../App';

function Login() {
  const { isInitialized } = useContext(AuthContext);
  
useEffect(() => {
    // Global error handler to suppress ResizeObserver errors
    const handleResizeObserverError = (event) => {
      if (event.message && event.message.includes('ResizeObserver loop completed with undelivered notifications')) {
        event.preventDefault();
        event.stopPropagation();
        return true;
      }
    };
    
    // Add global error handler for ResizeObserver errors
    window.addEventListener('error', handleResizeObserverError);
    
    if (isInitialized) {
      // Show login UI in this component
      const { ApperUI } = window.ApperSDK;
      ApperUI.showLogin("#authentication");
    }
    
    // Cleanup function to prevent ResizeObserver errors
    return () => {
      // Remove global error handler
      window.removeEventListener('error', handleResizeObserverError);
      
      // Clear authentication container to prevent memory leaks
      const authContainer = document.getElementById('authentication');
      if (authContainer) {
        authContainer.innerHTML = '';
      }
    };
  }, [isInitialized]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-dark">
      <div className="w-full max-w-md space-y-8 p-8 bg-surface rounded-lg shadow-md">
        <div className="flex flex-col gap-6 items-center justify-center">
          <div className="w-14 h-14 shrink-0 rounded-xl flex items-center justify-center bg-gradient-primary text-white text-2xl 2xl:text-3xl font-bold">
            W
          </div>
          <div className="flex flex-col gap-1 items-center justify-center">
            <div className="text-center text-lg xl:text-xl font-bold text-white">
              Sign in to WatchNext AI
            </div>
            <div className="text-center text-sm text-gray-400">
              Welcome back, please sign in to continue
            </div>
          </div>
        </div>
        <div id="authentication" />
        <div className="text-center mt-4">
          <p className="text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-primary hover:text-primary/80">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import Logo from '../../components/common/Logo';

const AdminLogin = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // On mount: clear any stale/expired tokens so they don't cause false errors
  useEffect(() => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminRefresh');
  }, []);

  const handleChange = (e) => {
    setError('');
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError('Please enter both username and password.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login/`,
        { username: form.username, password: form.password },
        { timeout: 8000 }
      );
      localStorage.setItem('adminToken', res.data.access);
      localStorage.setItem('adminRefresh', res.data.refresh);
      toast.success('Login successful!');
      navigate('/admin/dashboard');
    } catch (err) {
      // Clear any partially-stored tokens on failure
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminRefresh');

      if (!err.response) {
        // Network error — backend not running
        setError('Cannot connect to server. Please start the backend first (RUN_BACKEND.bat).');
      } else if (err.response.status === 401) {
        setError('Invalid username or password. Default credentials: kartikpaver / admin123');
      } else {
        setError(`Server error (${err.response.status}). Please check the backend console.`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(249, 115, 22, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(249, 115, 22, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="flex justify-center mb-4"
          >
            <Logo size="md" variant="full" />
          </motion.div>
          <p className="text-gray-500 text-xs uppercase tracking-widest mt-2">Admin Panel</p>
        </div>

        {/* Login Card */}
        <div className="bg-dark-800 border border-dark-600 rounded-sm p-8 relative">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
          <h2 className="text-white text-xl font-bold uppercase mb-6" style={{ fontFamily: 'Oswald, sans-serif' }}>
            Sign In
          </h2>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 p-3 bg-red-500/10 border border-red-500/30 rounded-sm flex items-start gap-3"
            >
              <span className="text-red-400 text-lg leading-none mt-0.5">⚠</span>
              <p className="text-red-400 text-sm leading-relaxed">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-gray-400 text-xs uppercase tracking-wider mb-2 block">Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="kartikpaver"
                required
                autoComplete="username"
                autoFocus
                className="w-full bg-dark-900 border border-dark-600 focus:border-orange-500 text-white placeholder-gray-600 px-4 py-3 rounded-sm outline-none transition-colors duration-300 text-sm"
              />
            </div>

            <div>
              <label className="text-gray-400 text-xs uppercase tracking-wider mb-2 block">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className="w-full bg-dark-900 border border-dark-600 focus:border-orange-500 text-white placeholder-gray-600 px-4 py-3 rounded-sm outline-none transition-colors duration-300 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <div className="loading-spinner w-5 h-5" />
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Credentials hint */}
          <div className="mt-6 pt-5 border-t border-dark-700">
            <p className="text-gray-600 text-xs text-center">
              Default credentials:&nbsp;
              <span className="text-gray-500 font-mono">kartikpaver</span>
              &nbsp;/&nbsp;
              <span className="text-gray-500 font-mono">admin123</span>
            </p>
          </div>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          © {new Date().getFullYear()} Kartik Paver Industries. Admin Access Only.
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;

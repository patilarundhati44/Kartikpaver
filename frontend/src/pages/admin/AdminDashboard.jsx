import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/api';
import Logo from '../../components/common/Logo';

// ─── Axios instance with auth ───────────────────────────────────────────────
const api = axios.create({ baseURL: API_BASE_URL });

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto-clear expired token and redirect to login on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminRefresh');
      // Redirect to login without a full page reload
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// ─── Sidebar nav items ───────────────────────────────────────────────────────
const navItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
  { path: '/admin/products', label: 'Products', icon: '🧱' },
  { path: '/admin/gallery', label: 'Gallery', icon: '🖼️' },
  { path: '/admin/inquiries', label: 'Inquiries', icon: '📩' },
  { path: '/admin/testimonials', label: 'Testimonials', icon: '⭐' },
  { path: '/admin/services', label: 'Services', icon: '🔧' },
];

// ─── Shared Components ───────────────────────────────────────────────────────
const AdminCard = ({ title, value, icon, color = 'orange' }) => (
  <div className={`bg-dark-800 border border-dark-600 rounded-sm p-6 hover:border-${color}-500/40 transition-colors`}>
    <div className="flex items-center justify-between mb-4">
      <span className="text-3xl">{icon}</span>
      <span className={`text-3xl font-bold text-${color}-500`} style={{ fontFamily: 'Oswald, sans-serif' }}>{value}</span>
    </div>
    <p className="text-gray-400 text-sm uppercase tracking-wider">{title}</p>
  </div>
);

const Modal = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="bg-dark-800 border border-dark-600 rounded-sm w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between p-6 border-b border-dark-600">
        <h2 className="text-white text-xl font-bold uppercase" style={{ fontFamily: 'Oswald, sans-serif' }}>{title}</h2>
        <button onClick={onClose} className="w-8 h-8 bg-dark-700 hover:bg-orange-500 rounded-sm flex items-center justify-center text-gray-400 hover:text-white transition-all">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="p-6">{children}</div>
    </motion.div>
  </div>
);

const InputField = ({ label, name, value, onChange, type = 'text', placeholder, required }) => (
  <div>
    <label className="text-gray-400 text-xs uppercase tracking-wider mb-2 block">{label}{required && ' *'}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full bg-dark-900 border border-dark-600 focus:border-orange-500 text-white placeholder-gray-600 px-4 py-3 rounded-sm outline-none transition-colors text-sm"
    />
  </div>
);

const TextareaField = ({ label, name, value, onChange, placeholder, rows = 3 }) => (
  <div>
    <label className="text-gray-400 text-xs uppercase tracking-wider mb-2 block">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className="w-full bg-dark-900 border border-dark-600 focus:border-orange-500 text-white placeholder-gray-600 px-4 py-3 rounded-sm outline-none transition-colors text-sm resize-none"
    />
  </div>
);

// ─── Dashboard Home ──────────────────────────────────────────────────────────
const DashboardHome = () => {
  const [stats, setStats] = useState({ products: 0, inquiries: 0, testimonials: 0, gallery: 0 });
  const [recentInquiries, setRecentInquiries] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [prod, inq, test, gal] = await Promise.all([
          api.get('/products/'),
          api.get('/inquiries/'),
          api.get('/testimonials/'),
          api.get('/gallery/'),
        ]);
        setStats({
          products: prod.data.length || prod.data.count || 0,
          inquiries: inq.data.length || inq.data.count || 0,
          testimonials: test.data.length || test.data.count || 0,
          gallery: gal.data.length || gal.data.count || 0,
        });
        const inqList = Array.isArray(inq.data) ? inq.data : inq.data.results || [];
        setRecentInquiries(inqList.slice(0, 5));
      } catch {
        // Use placeholder stats if API not connected
        setStats({ products: 6, inquiries: 0, testimonials: 5, gallery: 16 });
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-white text-3xl font-bold uppercase mb-8" style={{ fontFamily: 'Oswald, sans-serif' }}>Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <AdminCard title="Total Products" value={stats.products} icon="🧱" />
        <AdminCard title="Inquiries" value={stats.inquiries} icon="📩" />
        <AdminCard title="Testimonials" value={stats.testimonials} icon="⭐" />
        <AdminCard title="Gallery Items" value={stats.gallery} icon="🖼️" />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-dark-800 border border-dark-600 rounded-sm p-6">
          <h3 className="text-white font-bold uppercase mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>Quick Actions</h3>
          <div className="space-y-2">
            {[
              { label: 'Add New Product', path: '/admin/products', icon: '➕' },
              { label: 'View Inquiries', path: '/admin/inquiries', icon: '📩' },
              { label: 'Add Gallery Image', path: '/admin/gallery', icon: '🖼️' },
              { label: 'Manage Testimonials', path: '/admin/testimonials', icon: '⭐' },
            ].map((action) => (
              <Link
                key={action.label}
                to={action.path}
                className="flex items-center space-x-3 p-3 bg-dark-900 border border-dark-700 hover:border-orange-500/40 rounded-sm transition-colors group"
              >
                <span className="text-xl">{action.icon}</span>
                <span className="text-gray-300 text-sm group-hover:text-orange-400 transition-colors">{action.label}</span>
                <svg className="w-4 h-4 text-gray-600 ml-auto group-hover:text-orange-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-dark-800 border border-dark-600 rounded-sm p-6">
          <h3 className="text-white font-bold uppercase mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>Recent Inquiries</h3>
          {recentInquiries.length === 0 ? (
            <p className="text-gray-500 text-sm">No inquiries yet.</p>
          ) : (
            <div className="space-y-3">
              {recentInquiries.map((inq) => (
                <div key={inq.id} className="p-3 bg-dark-900 border border-dark-700 rounded-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white text-sm font-medium">{inq.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-sm ${inq.is_read ? 'bg-gray-700 text-gray-400' : 'bg-orange-500/20 text-orange-400'}`}>
                      {inq.is_read ? 'Read' : 'New'}
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs">{inq.phone} • {inq.product_interest || 'General'}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Business Info */}
      <div className="bg-dark-800 border border-orange-500/20 rounded-sm p-6">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
        <h3 className="text-white font-bold uppercase mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>Business Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Company</p>
            <p className="text-white">Kartik Paver Industries</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Location</p>
            <p className="text-white">Plot No C10, Near Atul Metal, 1 No MIDC, Latur - 413531</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Contact</p>
            <p className="text-white">+91 90548 39964</p>
            <p className="text-white text-sm">+91 84849 46890</p>
            <p className="text-white text-sm">+91 80803 59935</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Products Manager ────────────────────────────────────────────────────────
const ProductsManager = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [form, setForm] = useState({ name: '', category: 'Standard', description: '', sizes: '', thickness: '', strength: '', applications: '', colors: '', weight: '', features: '', is_active: true, material: '', color: '', shape: '', type: '', product_dimensions: '', availability: 'In Stock', price: '' });

  const fetchProducts = useCallback(async () => {
    try {
      const res = await api.get('/products/');
      setProducts(Array.isArray(res.data) ? res.data : res.data.results || []);
    } catch { toast.error('Failed to load products'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const handleChange = (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: val });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const openAdd = () => {
    setEditing(null);
    setImageFile(null);
    setImagePreview(null);
    setVideoFile(null);
    setVideoPreview(null);
    setForm({ name: '', category: 'Standard', description: '', sizes: '', thickness: '', strength: '', applications: '', colors: '', weight: '', features: '', is_active: true, material: '', color: '', shape: '', type: '', product_dimensions: '', availability: 'In Stock', price: '' });
    setShowModal(true);
  };

  const openEdit = (p) => {
    setEditing(p);
    setImageFile(null);
    setImagePreview(p.image_url || p.image || null);
    setVideoFile(null);
    setVideoPreview(p.video_url || p.video || null);
    setForm({ ...p, sizes: Array.isArray(p.sizes) ? p.sizes.join(', ') : p.sizes, thickness: Array.isArray(p.thickness) ? p.thickness.join(', ') : (p.thickness || ''), applications: Array.isArray(p.applications) ? p.applications.join(', ') : p.applications, colors: Array.isArray(p.colors) ? p.colors.join(', ') : p.colors, features: Array.isArray(p.features) ? p.features.join(', ') : p.features });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Build FormData for multipart upload (supports image file)
    const fd = new FormData();
    fd.append('name', form.name);
    fd.append('category', form.category);
    fd.append('description', form.description);
    fd.append('strength', form.strength);
    fd.append('weight', form.weight || '');
    fd.append('is_active', form.is_active);
    fd.append('order', form.order || 0);
    fd.append('price', form.price || 0);
    fd.append('material', form.material || '');
    fd.append('color', form.color || '');
    fd.append('shape', form.shape || '');
    fd.append('type', form.type || '');
    fd.append('product_dimensions', form.product_dimensions || '');
    fd.append('availability', form.availability || 'In Stock');
    // JSON arrays
    const toArr = (v) => (typeof v === 'string' ? v.split(',').map(s => s.trim()).filter(Boolean) : (v || []));
    fd.append('sizes', JSON.stringify(toArr(form.sizes)));
    fd.append('thickness', JSON.stringify(toArr(form.thickness)));
    fd.append('applications', JSON.stringify(toArr(form.applications)));
    fd.append('colors', JSON.stringify(toArr(form.colors)));
    fd.append('features', JSON.stringify(toArr(form.features)));
    // Attach image only if a new file was selected
    if (imageFile) fd.append('image', imageFile);
    if (videoFile) fd.append('video', videoFile);
    try {
      if (editing) {
        await api.put(`/products/${editing.id}/`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Product updated!');
      } else {
        await api.post('/products/', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Product added!');
      }
      setShowModal(false);
      fetchProducts();
    } catch (err) {
      toast.error('Failed to save product');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try { await api.delete(`/products/${id}/`); toast.success('Product deleted!'); fetchProducts(); }
    catch { toast.error('Failed to delete'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white text-3xl font-bold uppercase" style={{ fontFamily: 'Oswald, sans-serif' }}>Products</h1>
        <button onClick={openAdd} className="btn-primary flex items-center space-x-2 text-xs py-2 px-4">
          <span>+ Add Product</span>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><div className="loading-spinner" /></div>
      ) : (
        <div className="bg-dark-800 border border-dark-600 rounded-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-dark-600 bg-dark-900">
                <th className="text-left py-3 px-4 text-orange-500 uppercase tracking-wider text-xs">Name</th>
                <th className="text-left py-3 px-4 text-orange-500 uppercase tracking-wider text-xs">Category</th>
                <th className="text-left py-3 px-4 text-orange-500 uppercase tracking-wider text-xs">Strength</th>
                <th className="text-left py-3 px-4 text-orange-500 uppercase tracking-wider text-xs">Status</th>
                <th className="text-left py-3 px-4 text-orange-500 uppercase tracking-wider text-xs">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr><td colSpan={5} className="py-8 text-center text-gray-500">No products found. Add your first product.</td></tr>
              ) : products.map((p) => (
                <tr key={p.id} className="border-b border-dark-700 hover:bg-dark-700/30 transition-colors">
                  <td className="py-3 px-4 text-white font-medium">{p.name}</td>
                  <td className="py-3 px-4"><span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-sm">{p.category}</span></td>
                  <td className="py-3 px-4 text-gray-400">{p.strength}</td>
                  <td className="py-3 px-4"><span className={`text-xs px-2 py-0.5 rounded-sm ${p.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{p.is_active ? 'Active' : 'Inactive'}</span></td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button onClick={() => openEdit(p)} className="text-xs bg-dark-700 hover:bg-orange-500 text-gray-400 hover:text-white px-3 py-1 rounded-sm transition-all">Edit</button>
                      <button onClick={() => handleDelete(p.id)} className="text-xs bg-dark-700 hover:bg-red-500 text-gray-400 hover:text-white px-3 py-1 rounded-sm transition-all">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <Modal title={editing ? 'Edit Product' : 'Add Product'} onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Product Name" name="name" value={form.name} onChange={handleChange} placeholder="e.g. I Shape Paver Block" required />
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-wider mb-2 block">Category</label>
                <select name="category" value={form.category} onChange={handleChange} className="w-full bg-dark-900 border border-dark-600 focus:border-orange-500 text-white px-4 py-3 rounded-sm outline-none text-sm">
                  {['Standard', 'Decorative', 'Eco', 'Boundary'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Material" name="material" value={form.material} onChange={handleChange} placeholder="e.g. Concrete" />
              <InputField label="Color" name="color" value={form.color} onChange={handleChange} placeholder="e.g. Red, Grey" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Shape" name="shape" value={form.shape} onChange={handleChange} placeholder="e.g. I-Shape, Zigzag" />
              <InputField label="Type" name="type" value={form.type} onChange={handleChange} placeholder="e.g. Heavy Duty" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Dimensions (LxWxH mm)" name="product_dimensions" value={form.product_dimensions} onChange={handleChange} placeholder="e.g. 200x100x60" />
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-wider mb-2 block">Availability</label>
                <select name="availability" value={form.availability} onChange={handleChange} className="w-full bg-dark-900 border border-dark-600 focus:border-orange-500 text-white px-4 py-3 rounded-sm outline-none text-sm">
                  {['In Stock', 'Out of Stock'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Price (per sq ft/unit)" name="price" value={form.price} onChange={handleChange} type="number" placeholder="0.00" />
            </div>
            <TextareaField label="Description" name="description" value={form.description} onChange={handleChange} placeholder="Product description..." rows={3} />


            {/* ── Image Upload ── */}
            <div>
              <label className="text-gray-400 text-xs uppercase tracking-wider mb-2 block">Product Image</label>
              {imagePreview && (
                <div className="mb-3 relative inline-block">
                  <img src={imagePreview} alt="Preview" className="h-28 w-auto rounded-sm border border-dark-600 object-cover" />
                  <button
                    type="button"
                    onClick={() => { setImageFile(null); setImagePreview(null); }}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full text-xs flex items-center justify-center"
                    title="Remove image"
                  >×</button>
                </div>
              )}
              <label className="flex items-center justify-center gap-2 w-full bg-dark-900 border border-dashed border-dark-600 hover:border-orange-500 text-gray-400 hover:text-orange-400 px-4 py-3 rounded-sm cursor-pointer transition-colors text-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{imageFile ? imageFile.name : 'Click to upload image (JPG, PNG, WebP)'}</span>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>

            {/* ── Video Upload ── */}
            <div>
              <label className="text-gray-400 text-xs uppercase tracking-wider mb-2 block">Product Video (Optional)</label>
              {videoPreview && (
                <div className="mb-3 relative inline-block">
                  <video src={videoPreview} controls className="h-28 w-auto rounded-sm border border-dark-600 object-cover" />
                  <button
                    type="button"
                    onClick={() => { setVideoFile(null); setVideoPreview(null); }}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full text-xs flex items-center justify-center"
                    title="Remove video"
                  >×</button>
                </div>
              )}
              <label className="flex items-center justify-center gap-2 w-full bg-dark-900 border border-dashed border-dark-600 hover:border-orange-500 text-gray-400 hover:text-orange-400 px-4 py-3 rounded-sm cursor-pointer transition-colors text-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>{videoFile ? videoFile.name : 'Click to upload video (MP4, WebM)'}</span>
                <input type="file" accept="video/*" onChange={handleVideoChange} className="hidden" />
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <input type="checkbox" name="is_active" id="is_active" checked={form.is_active} onChange={handleChange} className="w-4 h-4 accent-orange-500" />
              <label htmlFor="is_active" className="text-gray-400 text-sm">Active (visible on website)</label>
            </div>
            <div className="flex space-x-3 pt-2">
              <button type="submit" className="btn-primary flex-1">Save Product</button>
              <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1">Cancel</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

// ─── Gallery Manager ─────────────────────────────────────────────────────────
const GalleryManager = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [form, setForm] = useState({ title: '', category: 'Factory', description: '', is_active: true });

  const fetchItems = useCallback(async () => {
    try {
      const res = await api.get('/gallery/');
      setItems(Array.isArray(res.data) ? res.data : res.data.results || []);
    } catch { toast.error('Failed to load gallery'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const handleChange = (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: val });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const openAdd = () => {
    setEditing(null);
    setImageFile(null);
    setImagePreview(null);
    setVideoFile(null);
    setVideoPreview(null);
    setForm({ title: '', category: 'Factory', description: '', is_active: true });
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setImageFile(null);
    setImagePreview(item.image_src || item.image || item.image_url || null);
    setVideoFile(null);
    setVideoPreview(item.video_url || item.video || null);
    setForm({ title: item.title, category: item.category, description: item.description || '', is_active: item.is_active });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('title', form.title);
    fd.append('category', form.category);
    fd.append('description', form.description);
    fd.append('is_active', form.is_active);
    if (imageFile) fd.append('image', imageFile);
    if (videoFile) fd.append('video', videoFile);
    try {
      if (editing) {
        await api.put(`/gallery/${editing.id}/`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Gallery item updated!');
      } else {
        await api.post('/gallery/', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Gallery item added!');
      }
      setShowModal(false);
      fetchItems();
    } catch (err) {
      toast.error('Failed to save gallery item');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this gallery item?')) return;
    try { await api.delete(`/gallery/${id}/`); toast.success('Deleted!'); fetchItems(); }
    catch { toast.error('Failed to delete'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white text-3xl font-bold uppercase" style={{ fontFamily: 'Oswald, sans-serif' }}>Gallery</h1>
        <button onClick={openAdd} className="btn-primary flex items-center space-x-2 text-xs py-2 px-4"><span>+ Add Image</span></button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><div className="loading-spinner" /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.length === 0 ? (
            <div className="col-span-3 text-center py-12 text-gray-500">No gallery items. Add your first image.</div>
          ) : items.map((item) => (
            <div key={item.id} className="bg-dark-800 border border-dark-600 rounded-sm overflow-hidden hover:border-orange-500/40 transition-colors">
              <div className="aspect-[4/3] bg-dark-900 flex items-center justify-center relative">
                {item.video_url || item.video ? (
                  <video src={item.video_url || item.video} controls className="w-full h-full object-cover" />
                ) : item.image_src || item.image || item.image_url ? (
                  <img src={item.image_src || item.image || item.image_url} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-4xl">🖼️</div>
                )}
                <div className="absolute top-2 left-2">
                  <span className="text-xs bg-dark-900/80 text-orange-400 px-2 py-0.5 rounded-sm">{item.category}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-white text-sm font-bold mb-1">{item.title}</h3>
                <p className="text-gray-500 text-xs mb-3 line-clamp-2">{item.description}</p>
                <div className="flex space-x-2">
                  <button onClick={() => openEdit(item)} className="text-xs bg-dark-700 hover:bg-orange-500 text-gray-400 hover:text-white px-3 py-1 rounded-sm transition-all flex-1">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="text-xs bg-dark-700 hover:bg-red-500 text-gray-400 hover:text-white px-3 py-1 rounded-sm transition-all flex-1">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <Modal title={editing ? 'Edit Gallery Item' : 'Add Gallery Item'} onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Title" name="title" value={form.title} onChange={handleChange} placeholder="e.g. Factory Floor" required />
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-wider mb-2 block">Category</label>
                <select name="category" value={form.category} onChange={handleChange} className="w-full bg-dark-900 border border-dark-600 focus:border-orange-500 text-white px-4 py-3 rounded-sm outline-none text-sm">
                  {['Factory', 'Products', 'Projects'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <TextareaField label="Description" name="description" value={form.description} onChange={handleChange} placeholder="Image description..." rows={2} />

            {/* ── Image Upload ── */}
            <div>
              <label className="text-gray-400 text-xs uppercase tracking-wider mb-2 block">Image Upload</label>
              {imagePreview && (
                <div className="mb-3 relative inline-block">
                  <img src={imagePreview} alt="Preview" className="h-28 w-auto rounded-sm border border-dark-600 object-cover" />
                  <button
                    type="button"
                    onClick={() => { setImageFile(null); setImagePreview(null); }}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full text-xs flex items-center justify-center"
                    title="Remove image"
                  >×</button>
                </div>
              )}
              <label className="flex items-center justify-center gap-2 w-full bg-dark-900 border border-dashed border-dark-600 hover:border-orange-500 text-gray-400 hover:text-orange-400 px-4 py-3 rounded-sm cursor-pointer transition-colors text-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{imageFile ? imageFile.name : 'Click to upload image (JPG, PNG, WebP)'}</span>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>

            {/* ── Video Upload ── */}
            <div>
              <label className="text-gray-400 text-xs uppercase tracking-wider mb-2 block">Video Upload (Optional)</label>
              {videoPreview && (
                <div className="mb-3 relative inline-block">
                  <video src={videoPreview} controls className="h-28 w-auto rounded-sm border border-dark-600 object-cover" />
                  <button
                    type="button"
                    onClick={() => { setVideoFile(null); setVideoPreview(null); }}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full text-xs flex items-center justify-center"
                    title="Remove video"
                  >×</button>
                </div>
              )}
              <label className="flex items-center justify-center gap-2 w-full bg-dark-900 border border-dashed border-dark-600 hover:border-orange-500 text-gray-400 hover:text-orange-400 px-4 py-3 rounded-sm cursor-pointer transition-colors text-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>{videoFile ? videoFile.name : 'Click to upload video (MP4, WebM)'}</span>
                <input type="file" accept="video/*" onChange={handleVideoChange} className="hidden" />
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <input type="checkbox" name="is_active" id="gal_active" checked={form.is_active} onChange={handleChange} className="w-4 h-4 accent-orange-500" />
              <label htmlFor="gal_active" className="text-gray-400 text-sm">Active (visible on website)</label>
            </div>
            <div className="flex space-x-3 pt-2">
              <button type="submit" className="btn-primary flex-1">Save</button>
              <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1">Cancel</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

// ─── Inquiries Manager ───────────────────────────────────────────────────────
const InquiriesManager = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const fetchInquiries = useCallback(async () => {
    try {
      const res = await api.get('/inquiries/');
      setInquiries(Array.isArray(res.data) ? res.data : res.data.results || []);
    } catch { toast.error('Failed to load inquiries'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchInquiries(); }, [fetchInquiries]);

  const markRead = async (id) => {
    try {
      await api.patch(`/inquiries/${id}/`, { is_read: true });
      fetchInquiries();
    } catch { toast.error('Failed to update'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this inquiry?')) return;
    try { await api.delete(`/inquiries/${id}/`); toast.success('Deleted!'); fetchInquiries(); setSelected(null); }
    catch { toast.error('Failed to delete'); }
  };

  return (
    <div>
      <h1 className="text-white text-3xl font-bold uppercase mb-6" style={{ fontFamily: 'Oswald, sans-serif' }}>Inquiries</h1>

      {loading ? (
        <div className="flex justify-center py-12"><div className="loading-spinner" /></div>
      ) : (
        <div className="bg-dark-800 border border-dark-600 rounded-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-dark-600 bg-dark-900">
                <th className="text-left py-3 px-4 text-orange-500 uppercase tracking-wider text-xs">Name</th>
                <th className="text-left py-3 px-4 text-orange-500 uppercase tracking-wider text-xs">Phone</th>
                <th className="text-left py-3 px-4 text-orange-500 uppercase tracking-wider text-xs">Product</th>
                <th className="text-left py-3 px-4 text-orange-500 uppercase tracking-wider text-xs">Date</th>
                <th className="text-left py-3 px-4 text-orange-500 uppercase tracking-wider text-xs">Status</th>
                <th className="text-left py-3 px-4 text-orange-500 uppercase tracking-wider text-xs">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.length === 0 ? (
                <tr><td colSpan={6} className="py-8 text-center text-gray-500">No inquiries yet.</td></tr>
              ) : inquiries.map((inq) => (
                <tr key={inq.id} className={`border-b border-dark-700 hover:bg-dark-700/30 transition-colors cursor-pointer ${!inq.is_read ? 'bg-orange-500/5' : ''}`} onClick={() => setSelected(inq)}>
                  <td className="py-3 px-4 text-white font-medium">{inq.name}</td>
                  <td className="py-3 px-4 text-gray-400">{inq.phone}</td>
                  <td className="py-3 px-4 text-gray-400">{inq.product_interest || '—'}</td>
                  <td className="py-3 px-4 text-gray-500 text-xs">{inq.created_at ? new Date(inq.created_at).toLocaleDateString() : '—'}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-0.5 rounded-sm ${inq.is_read ? 'bg-gray-700 text-gray-400' : 'bg-orange-500/20 text-orange-400'}`}>
                      {inq.is_read ? 'Read' : 'New'}
                    </span>
                  </td>
                  <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                    <div className="flex space-x-2">
                      {!inq.is_read && <button onClick={() => markRead(inq.id)} className="text-xs bg-dark-700 hover:bg-green-500 text-gray-400 hover:text-white px-2 py-1 rounded-sm transition-all">Mark Read</button>}
                      <button onClick={() => handleDelete(inq.id)} className="text-xs bg-dark-700 hover:bg-red-500 text-gray-400 hover:text-white px-2 py-1 rounded-sm transition-all">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <Modal title="Inquiry Details" onClose={() => setSelected(null)}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Name</p><p className="text-white">{selected.name}</p></div>
              <div><p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Phone</p><a href={`tel:${selected.phone}`} className="text-orange-400 hover:underline">{selected.phone}</a></div>
              <div><p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Email</p><p className="text-white">{selected.email || '—'}</p></div>
              <div><p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Product Interest</p><p className="text-white">{selected.product_interest || '—'}</p></div>
            </div>
            <div><p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Subject</p><p className="text-white">{selected.subject || '—'}</p></div>
            <div><p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Message</p><p className="text-gray-300 bg-dark-900 p-3 rounded-sm text-sm leading-relaxed">{selected.message}</p></div>
            <div className="flex space-x-3 pt-2">
              <a href={`tel:${selected.phone}`} className="btn-primary flex-1 text-center text-xs py-2">Call Now</a>
              <a href={`https://wa.me/91${selected.phone}?text=${encodeURIComponent(`Hello ${selected.name}, regarding your inquiry about ${selected.product_interest || 'paver blocks'}...`)}`} target="_blank" rel="noopener noreferrer" className="btn-secondary flex-1 text-center text-xs py-2">WhatsApp</a>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ─── Testimonials Manager ────────────────────────────────────────────────────
const TestimonialsManager = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', role: '', location: '', rating: 5, review: '', project: '', is_active: true });

  const fetchItems = useCallback(async () => {
    try {
      const res = await api.get('/testimonials/');
      setItems(Array.isArray(res.data) ? res.data : res.data.results || []);
    } catch { toast.error('Failed to load testimonials'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const handleChange = (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: val });
  };

  const openAdd = () => { setEditing(null); setForm({ name: '', role: '', location: '', rating: 5, review: '', project: '', is_active: true }); setShowModal(true); };
  const openEdit = (item) => { setEditing(item); setForm(item); setShowModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) { await api.put(`/testimonials/${editing.id}/`, form); toast.success('Testimonial updated!'); }
      else { await api.post('/testimonials/', form); toast.success('Testimonial added!'); }
      setShowModal(false); fetchItems();
    } catch { toast.error('Failed to save'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try { await api.delete(`/testimonials/${id}/`); toast.success('Deleted!'); fetchItems(); }
    catch { toast.error('Failed to delete'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white text-3xl font-bold uppercase" style={{ fontFamily: 'Oswald, sans-serif' }}>Testimonials</h1>
        <button onClick={openAdd} className="btn-primary text-xs py-2 px-4">+ Add Testimonial</button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><div className="loading-spinner" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.length === 0 ? (
            <div className="col-span-2 text-center py-12 text-gray-500">No testimonials. Add your first one.</div>
          ) : items.map((item) => (
            <div key={item.id} className="bg-dark-800 border border-dark-600 rounded-sm p-5 hover:border-orange-500/40 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-sm flex items-center justify-center text-white font-bold">{item.name?.charAt(0)}</div>
                  <div>
                    <p className="text-white font-semibold text-sm">{item.name}</p>
                    <p className="text-gray-500 text-xs">{item.role} • {item.location}</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => <span key={i} className={`text-sm ${i < item.rating ? 'text-orange-500' : 'text-gray-600'}`}>★</span>)}
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-3 line-clamp-3">"{item.review}"</p>
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-0.5 rounded-sm ${item.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{item.is_active ? 'Active' : 'Hidden'}</span>
                <div className="flex space-x-2">
                  <button onClick={() => openEdit(item)} className="text-xs bg-dark-700 hover:bg-orange-500 text-gray-400 hover:text-white px-3 py-1 rounded-sm transition-all">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="text-xs bg-dark-700 hover:bg-red-500 text-gray-400 hover:text-white px-3 py-1 rounded-sm transition-all">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <Modal title={editing ? 'Edit Testimonial' : 'Add Testimonial'} onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Client Name" name="name" value={form.name} onChange={handleChange} placeholder="e.g. Rajesh Patil" required />
              <InputField label="Role / Profession" name="role" value={form.role} onChange={handleChange} placeholder="e.g. Civil Contractor" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Location" name="location" value={form.location} onChange={handleChange} placeholder="e.g. Latur" />
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-wider mb-2 block">Rating</label>
                <select name="rating" value={form.rating} onChange={handleChange} className="w-full bg-dark-900 border border-dark-600 focus:border-orange-500 text-white px-4 py-3 rounded-sm outline-none text-sm">
                  {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Stars</option>)}
                </select>
              </div>
            </div>
            <TextareaField label="Review" name="review" value={form.review} onChange={handleChange} placeholder="Client review text..." rows={4} />
            <InputField label="Project Name" name="project" value={form.project} onChange={handleChange} placeholder="e.g. Road Construction, Latur City" />
            <div className="flex items-center space-x-3">
              <input type="checkbox" name="is_active" id="test_active" checked={form.is_active} onChange={handleChange} className="w-4 h-4 accent-orange-500" />
              <label htmlFor="test_active" className="text-gray-400 text-sm">Active (visible on website)</label>
            </div>
            <div className="flex space-x-3 pt-2">
              <button type="submit" className="btn-primary flex-1">Save</button>
              <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1">Cancel</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

// ─── Services Manager ────────────────────────────────────────────────────────
const ServicesManager = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', subtitle: '', description: '', features: '', applications: '', is_active: true });

  const fetchItems = useCallback(async () => {
    try {
      const res = await api.get('/services/');
      setItems(Array.isArray(res.data) ? res.data : res.data.results || []);
    } catch { toast.error('Failed to load services'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const handleChange = (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: val });
  };

  const openAdd = () => { setEditing(null); setForm({ title: '', subtitle: '', description: '', features: '', applications: '', is_active: true }); setShowModal(true); };
  const openEdit = (item) => { setEditing(item); setForm({ ...item, features: Array.isArray(item.features) ? item.features.join(', ') : item.features, applications: Array.isArray(item.applications) ? item.applications.join(', ') : item.applications }); setShowModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, features: form.features.split(',').map(s => s.trim()).filter(Boolean), applications: form.applications.split(',').map(s => s.trim()).filter(Boolean) };
    try {
      if (editing) { await api.put(`/services/${editing.id}/`, payload); toast.success('Service updated!'); }
      else { await api.post('/services/', payload); toast.success('Service added!'); }
      setShowModal(false); fetchItems();
    } catch { toast.error('Failed to save'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this service?')) return;
    try { await api.delete(`/services/${id}/`); toast.success('Deleted!'); fetchItems(); }
    catch { toast.error('Failed to delete'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white text-3xl font-bold uppercase" style={{ fontFamily: 'Oswald, sans-serif' }}>Services</h1>
        <button onClick={openAdd} className="btn-primary text-xs py-2 px-4">+ Add Service</button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><div className="loading-spinner" /></div>
      ) : (
        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12 text-gray-500">No services. Add your first service.</div>
          ) : items.map((item) => (
            <div key={item.id} className="bg-dark-800 border border-dark-600 rounded-sm p-5 hover:border-orange-500/40 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-orange-500 text-xs uppercase tracking-wider mb-1">{item.subtitle}</p>
                  <h3 className="text-white font-bold text-lg uppercase mb-2" style={{ fontFamily: 'Oswald, sans-serif' }}>{item.title}</h3>
                  <p className="text-gray-400 text-sm line-clamp-2">{item.description}</p>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button onClick={() => openEdit(item)} className="text-xs bg-dark-700 hover:bg-orange-500 text-gray-400 hover:text-white px-3 py-1 rounded-sm transition-all">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="text-xs bg-dark-700 hover:bg-red-500 text-gray-400 hover:text-white px-3 py-1 rounded-sm transition-all">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <Modal title={editing ? 'Edit Service' : 'Add Service'} onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField label="Service Title" name="title" value={form.title} onChange={handleChange} placeholder="e.g. Paver Block Installation" required />
            <InputField label="Subtitle" name="subtitle" value={form.subtitle} onChange={handleChange} placeholder="e.g. Professional Installation Services" />
            <TextareaField label="Description" name="description" value={form.description} onChange={handleChange} placeholder="Service description..." rows={4} />
            <TextareaField label="Features (comma separated)" name="features" value={form.features} onChange={handleChange} placeholder="Site assessment, Base preparation, Precision laying..." rows={2} />
            <InputField label="Applications (comma separated)" name="applications" value={form.applications} onChange={handleChange} placeholder="Driveways, Footpaths, Parking Areas" />
            <div className="flex items-center space-x-3">
              <input type="checkbox" name="is_active" id="svc_active" checked={form.is_active} onChange={handleChange} className="w-4 h-4 accent-orange-500" />
              <label htmlFor="svc_active" className="text-gray-400 text-sm">Active (visible on website)</label>
            </div>
            <div className="flex space-x-3 pt-2">
              <button type="submit" className="btn-primary flex-1">Save</button>
              <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1">Cancel</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

// ─── Main Dashboard Layout ───────────────────────────────────────────────────
const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) navigate('/admin/login');
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminRefresh');
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-dark-900 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-dark-800 border-r border-dark-700 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-auto`}>
        {/* Logo */}
        <div className="flex items-center p-4 border-b border-dark-700">
          <Link to="/" className="block">
            <Logo size="sm" variant="full" />
          </Link>
        </div>

        {/* Nav */}
        <nav className="p-4 space-y-1 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-sm text-sm font-medium transition-all duration-200 ${
                location.pathname === item.path
                  ? 'bg-orange-500/20 text-orange-400 border-l-2 border-orange-500'
                  : 'text-gray-400 hover:text-white hover:bg-dark-700'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-dark-700 mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 rounded-sm text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all w-full"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
          <Link to="/" className="flex items-center space-x-3 px-4 py-2 rounded-sm text-xs text-gray-600 hover:text-gray-400 transition-all mt-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span>View Website</span>
          </Link>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-dark-800 border-b border-dark-700 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden w-8 h-8 flex flex-col justify-center space-y-1.5"
            aria-label="Toggle sidebar"
          >
            <span className="block w-6 h-0.5 bg-white" />
            <span className="block w-6 h-0.5 bg-white" />
            <span className="block w-6 h-0.5 bg-white" />
          </button>
          <div className="hidden lg:block">
            <p className="text-gray-500 text-xs uppercase tracking-wider">Kartik Paver Industries — Admin Panel</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-orange-500 rounded-sm flex items-center justify-center text-white text-xs font-bold">A</div>
            <span className="text-gray-400 text-sm hidden sm:block">Administrator</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Routes>
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="products" element={<ProductsManager />} />
            <Route path="gallery" element={<GalleryManager />} />
            <Route path="inquiries" element={<InquiriesManager />} />
            <Route path="testimonials" element={<TestimonialsManager />} />
            <Route path="services" element={<ServicesManager />} />
            <Route path="*" element={<DashboardHome />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

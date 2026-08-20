'use client';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { FiPlus, FiTrash2, FiCheck, FiX, FiZap, FiImage, FiSave, FiEye } from 'react-icons/fi';
import ImageUpload from '@/component/helper/ImageUpload';
import TiptapEditor from '../helper/TiptapEditor';
import Image from 'next/image';

/* ── Create Feature Modal ─────────────────────────────── */
function CreateFeatureModal({ onClose, onCreate }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCreate = async () => {
    if (!name.trim()) { toast.error('Feature name is required'); return; }
    setLoading(true);
    try {
      const res = await axios.post('/api/team/product/features', {
        name: name.trim(),
        description: description.trim() || null,
      });
      if (res.data.success) {
        toast.success('Feature created!');
        onCreate(res.data.data);
        onClose();
      } else {
        toast.error(res.data.message || 'Failed to create feature');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-3 space-y-5 border border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-semibold">
              <FiZap size={16} />
            </div>
            <h2 className="text-base font-semibold text-slate-900">Add New Feature</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors"
          >
            <FiX size={14} />
          </button>
        </div>

        <div className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Feature Name *</label>
            <input
              ref={inputRef}
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleCreate(); } if (e.key === 'Escape') onClose(); }}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g. 24/7 Priority Support"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Description (Optional)</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={2}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Brief summary of feature capability..."
            />
          </div>
        </div>

        <div className="flex gap-2.5 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 rounded-lg border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleCreate}
            disabled={loading || !name.trim()}
            className="flex-1 py-2 rounded-lg bg-primary text-white font-semibold text-xs hover:bg-primary-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5 shadow-sm"
          >
            {loading ? 'Creating...' : 'Save Feature'}
          </button>
        </div>
      </div>
    </div>
  );
}

const ProductForm = ({ initialData, onSuccess, onCancel }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    demo_url: '',
    price: 0,
    discount: 0,
    is_featured: false,
    is_published: false,
    ...initialData,
  });

  const [availableFeatures, setAvailableFeatures] = useState([]);
  const [featuresLoading, setFeaturesLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [featureSearch, setFeatureSearch] = useState('');

  const [selectedIds, setSelectedIds] = useState(
    new Set((initialData?.features || []).map(f => f.id))
  );

  const [images, setImages] = useState(
    (initialData?.images || []).map(img => ({
      id: img.id || null,
      title: img.title || '',
      image: img.image || '',
      public_id: img.public_id || '',
      is_primary: img.is_primary || false,
    }))
  );

  const [loading, setLoading] = useState(false);
  const nameInputRef = useRef(null);

  useEffect(() => {
    if (nameInputRef.current && (formData.name === 'enter title' || !formData.name)) {
      nameInputRef.current.focus();
      nameInputRef.current.select();
    }
  }, []);

  useEffect(() => {
    const fetchFeatures = async () => {
      setFeaturesLoading(true);
      try {
        const res = await axios.get('/api/team/product/features');
        if (res.data.success) setAvailableFeatures(res.data.data || []);
      } catch {
        toast.error('Could not load features');
      } finally {
        setFeaturesLoading(false);
      }
    };
    fetchFeatures();
  }, []);

  const toggleFeature = (id) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleFeatureCreated = (newFeature) => {
    setAvailableFeatures(prev => [...prev, newFeature].sort((a, b) => a.name.localeCompare(b.name)));
    setSelectedIds(prev => new Set([...prev, newFeature.id]));
  };

  const handleImageUpload = (imageData) => {
    setImages(prev => [
      ...prev,
      {
        id: null,
        title: formData.name || '',
        image: imageData.url,
        public_id: imageData.public_id,
        is_primary: prev.length === 0,
      },
    ]);
  };

  const handleSetPrimary = (index) => {
    setImages(images.map((img, i) => ({ ...img, is_primary: i === index })));
  };

  const handleRemoveImage = async (index) => {
    const imgToRemove = images[index];
    if (!imgToRemove.id && imgToRemove.public_id) {
      try { await axios.delete(`/api/image?public_id=${imgToRemove.public_id}`); } catch {}
    }
    setImages(images.filter((_, i) => i !== index));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const submitForm = async (publishStatus = false) => {
    if (!formData.name || !formData.name.trim()) {
      toast.error('Product name is required');
      return;
    }
    setLoading(true);

    const featuresPayload = availableFeatures
      .filter(f => selectedIds.has(f.id))
      .map(f => ({ id: f.id, name: f.name, slug: f.slug, value: true }));

    try {
      const isEditing = !!initialData?.slug;
      const url = isEditing ? `/api/team/product/${initialData.slug}` : '/api/team/product';
      const method = isEditing ? 'put' : 'post';

      const payload = {
        name: formData.name.trim(),
        description: formData.description || null,
        demo_url: formData.demo_url || null,
        price: Number(formData.price) || 0,
        discount: Number(formData.discount) || 0,
        is_featured: formData.is_featured,
        is_published: publishStatus,
        images,
        features: featuresPayload,
      };

      const res = await axios[method](url, payload);

      if (res.data.success) {
        toast.success(res.data.message || (publishStatus ? 'Product published successfully!' : 'Draft saved successfully!'));
        setFormData(prev => ({ ...prev, is_published: publishStatus }));
        if (onSuccess) onSuccess(res.data.data);
        else router.push('/team/products');
      } else {
        toast.error(res.data.message || 'Failed to save product');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showModal && (
        <CreateFeatureModal
          onClose={() => setShowModal(false)}
          onCreate={handleFeatureCreated}
        />
      )}

      <form onSubmit={(e) => { e.preventDefault(); submitForm(formData.is_published); }} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Form Fields */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">General Information</h3>
              
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Product Name *</label>
                <input
                  ref={nameInputRef}
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="e.g. Next.js SaaS Starter Kit"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Regular Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    min="0"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Discount ($)</label>
                  <input
                    type="number"
                    name="discount"
                    min="0"
                    value={formData.discount}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-emerald-600 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Live Demo URL</label>
                <input
                  type="url"
                  name="demo_url"
                  value={formData.demo_url || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="https://demo.example.com"
                />
              </div>
            </div>

            {/* Description Card */}
            <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-xs space-y-3">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Detailed Overview & Specifications</h3>
              <TiptapEditor
                value={formData.description || ''}
                onChange={(html) => setFormData({ ...formData, description: html })}
                placeholder="Write a clear, engaging product description..."
              />
            </div>
          </div>

          {/* Sidebar / Configuration */}
          <div className="lg:col-span-5 space-y-6">
            {/* Status & Options Card */}
            <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-xs space-y-4">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Product Options</h3>
              
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-lg border border-slate-100">
                <div>
                  <div className="text-xs font-semibold text-slate-800">Featured Product</div>
                  <div className="text-[11px] text-slate-500">Show on homepage featured section</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="is_featured"
                    checked={!!formData.is_featured}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Product Gallery</h3>
                <span className="text-xs font-semibold text-slate-500">{images.length} Image{images.length !== 1 ? 's' : ''}</span>
              </div>

              <ImageUpload onUpload={handleImageUpload} label="Upload Image" />

              {images.length > 0 && (
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {images.map((img, index) => (
                    <div key={index} className="relative group rounded-lg overflow-hidden border border-slate-200 bg-slate-50 aspect-video">
                      <Image width={500} height={500} src={img.image} alt="Product preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleSetPrimary(index)}
                          className={`p-1.5 rounded-lg text-xs font-semibold ${img.is_primary ? 'bg-emerald-500 text-white' : 'bg-white text-slate-800 hover:bg-emerald-500 hover:text-white'} transition-colors`}
                          title={img.is_primary ? 'Primary Image' : 'Set as Primary'}
                        >
                          <FiCheck size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="p-1.5 rounded-lg bg-white text-slate-800 hover:bg-rose-500 hover:text-white transition-colors"
                          title="Remove Image"
                        >
                          <FiTrash2 size={13} />
                        </button>
                      </div>
                      {img.is_primary && (
                        <div className="absolute top-1.5 left-1.5 bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded-md font-semibold">
                          Primary
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Included Features Selection */}
            <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-xs space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Features Included</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">{selectedIds.size} feature{selectedIds.size !== 1 ? 's' : ''} selected</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-primary transition-colors"
                >
                  <FiPlus size={13} /> Add New
                </button>
              </div>

              {availableFeatures.length > 0 && (
                <input
                  type="text"
                  placeholder="Search features..."
                  value={featureSearch}
                  onChange={(e) => setFeatureSearch(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                />
              )}

              {featuresLoading ? (
                <div className="py-6 text-center text-xs text-slate-400">Loading feature tags...</div>
              ) : availableFeatures.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-400">No feature tags created yet.</div>
              ) : (
                <div className="flex flex-wrap gap-1.5 max-h-56 overflow-y-auto pr-1">
                  {availableFeatures
                    .filter(f => f.name.toLowerCase().includes((featureSearch || '').toLowerCase()))
                    .map(feature => {
                      const selected = selectedIds.has(feature.id);
                      return (
                        <button
                          key={feature.id}
                          type="button"
                          onClick={() => toggleFeature(feature.id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                            selected
                              ? 'bg-primary/10 border-primary/30 text-primary-dark font-semibold shadow-2xs'
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          <span className={`w-3.5 h-3.5 rounded-md flex items-center justify-center text-[10px] ${selected ? 'bg-primary text-white' : 'border border-slate-300'}`}>
                            {selected && <FiCheck size={10} />}
                          </span>
                          {feature.name}
                        </button>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-200/80">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2.5 rounded-lg border border-slate-200 text-slate-600 font-semibold hover:bg-slate-100 transition-colors text-xs"
            >
              Cancel
            </button>
          )}

          <button
            type="button"
            onClick={() => submitForm(false)}
            disabled={loading}
            className="px-5 py-2.5 rounded-lg bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-colors text-xs disabled:opacity-50 flex items-center gap-1.5"
          >
            <FiSave size={14} />
            {formData.is_published ? 'Save as Draft' : 'Save Draft'}
          </button>

          <button
            type="button"
            onClick={() => submitForm(true)}
            disabled={loading}
            className="px-6 py-2.5 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition-colors text-xs disabled:opacity-50 shadow-md shadow-primary/20 flex items-center gap-1.5"
          >
            <FiEye size={14} />
            {loading ? 'Saving...' : formData.is_published ? 'Save Changes' : 'Publish Product'}
          </button>
        </div>
      </form>
    </>
  );
};

export default ProductForm;

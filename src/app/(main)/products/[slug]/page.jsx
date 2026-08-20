'use client';

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  FiArrowLeft,
  FiCheck,
  FiExternalLink,
  FiShield,
  FiCpu,
  FiMessageSquare,
  FiMaximize2,
  FiX,
  FiLayers,
  FiBookOpen,
  FiActivity,
  FiChevronLeft,
  FiChevronRight,
  FiShoppingCart,
  FiTag
} from 'react-icons/fi';
import { toast, Toaster } from 'react-hot-toast';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Context } from '@/component/helper/Context';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { slug } = params;

  const { userData, isLoggedIn } = useContext(Context);

  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // overview, features, support
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) return;
      try {
        const res = await axios.get(`/api/public/product/${slug}`);
        if (res.data.success) {
          setProduct(res.data.data);
        } else {
          toast.error("Product not found");
          router.push('/products');
        }
      } catch (error) {
        console.error('Failed to fetch product', error);
        router.push('/products');
      }
    };
    fetchProduct();
  }, [slug, router]);

  if (!product) return null;

  const images = product.images || [];
  const primaryImageObj = images.find((img) => img.is_primary) || images[0] || null;
  const primaryImage = primaryImageObj?.image || null;
  const originalPrice = Number(product.price) || 0;
  const discountAmount = Number(product.discount) || 0;
  const finalPrice = discountAmount > 0
    ? Math.max(0, originalPrice - discountAmount)
    : originalPrice;

  return (
    <div className="min-h-screen w-full bg-slate-50/30 relative overflow-hidden p-4 md:p-8">
      <Toaster position="top-center" />

      <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl pointer-events-none -z-10 animate-pulse"></div>
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-secondary/5 rounded-full filter blur-3xl pointer-events-none -z-10 animate-pulse delay-1000"></div>

      <div className="w-full">

        <div className="flex items-center gap-2 mb-8 animate-fade-in">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-primary font-semibold text-sm transition-all duration-200 group"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Back to Products
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-400 text-sm font-medium truncate max-w-50 sm:max-w-none">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12  p-2 animate-fade-up">

          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-video rounded-lg overflow-hidden border border-slate-100 bg-slate-900/5 shadow-inner group flex items-center justify-center">
              {primaryImage ? (
                <>
                  <Image
                    width={1200}
                    height={800}
                    src={primaryImage}
                    alt={primaryImageObj?.title || product.name}
                    className="w-full h-full object-cover transition-all duration-500"
                    priority
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/20 to-transparent pointer-events-none" />

                  <button
                    onClick={() => {
                      const primaryIdx = images.findIndex((img) => img.is_primary);
                      setLightboxIndex(primaryIdx !== -1 ? primaryIdx : 0);
                      setLightboxOpen(true);
                    }}
                    className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-md text-slate-700 hover:text-primary hover:bg-white rounded-xl shadow-lg border border-slate-100 hover:scale-110 transition-all duration-200 cursor-pointer z-10"
                    aria-label="Expand image"
                  >
                    <FiMaximize2 size={16} />
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-300 gap-2 py-20">
                  <FiLayers size={48} className="animate-bounce" />
                  <span className="text-lg font-bold">No Image Preview Available</span>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                {product.is_featured && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20 text-xs font-bold uppercase tracking-wider">
                    <FiTag size={13} /> Featured Product
                  </span>
                )}

                <div className="ml-auto flex items-baseline gap-2">
                  {discountAmount > 0 && (
                    <span className="text-slate-400 text-sm line-through font-semibold">
                      ${originalPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="text-3xl font-semibold text-slate-900">
                    {finalPrice > 0 ? `$${finalPrice.toLocaleString()}` : 'Free / Contact'}
                  </span>
                  {discountAmount > 0 && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-secondary/10 text-secondary border border-secondary/20">
                      -${discountAmount.toLocaleString()} OFF
                    </span>
                  )}
                </div>
              </div>

              <h1 className="text-2xl font-semibold text-slate-900 tracking-tight leading-tight">
                {product.name}
              </h1>

              {product.features && product.features.length > 0 && (
                <div className="pt-4 space-y-2.5 border-t border-slate-100">
                  <h3 className="text-xs font-bold text-primary/70 uppercase tracking-widest">Key Highlights</h3>
                  <div className="space-y-2">
                    {product.features.slice(0, 4).map((f, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-slate-700">
                        <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
                          <FiCheck size={12} />
                        </div>
                        <span className="text-xs font-bold text-slate-800">{f.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-100">
              {product.demo_url && (
                <a
                  href={product.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-primary text-white font-bold py-1 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <FiExternalLink className="group-hover:scale-105 transition-transform" size={16} />
                  Launch Live Product Demo
                </a>
              )}

              {isLoggedIn ? (
                <Link
                  href="/user/tickets"
                  className="w-full bg-secondary text-white font-bold py-1 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <FiShoppingCart size={16} />
                  Request Custom Implementation
                </Link>
              ) : (
                <Link
                  href="/contact"
                  className="w-full bg-secondary text-white font-bold py-1 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <FiMessageSquare size={16} />
                  Inquire Support & Purchase
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 w-full animate-fade-in">
          <div className="flex border-b border-slate-200 gap-6 sm:gap-8 mb-6 overflow-x-auto">
            {[
              { id: 'overview', label: 'Product Overview', icon: <FiBookOpen size={16} /> },
              { id: 'features', label: 'Technical Specifications', icon: <FiLayers size={16} /> },
              { id: 'support', label: 'Support & Inquiries', icon: <FiMessageSquare size={16} /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 pb-4 font-bold text-sm transition-all relative shrink-0 cursor-pointer ${activeTab === tab.id ? 'text-primary' : 'text-slate-400 hover:text-slate-600'
                  }`}
              >
                {tab.icon}
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeProductTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-50">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4"
                >
                  <h3 className="text-xl font-semibold text-slate-900">About {product.name}</h3>
                  {product.description ? (
                    <div
                      className="prose prose-slate max-w-none prose-p:leading-relaxed text-sm text-slate-700 whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                  ) : (
                    <p className="text-slate-400 text-sm">No detailed description provided for this product.</p>
                  )}
                </motion.div>
              )}

              {activeTab === 'features' && (
                <motion.div
                  key="features-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6"
                >
                  <h3 className="text-xl font-semibold text-slate-900">Technical Features & Specifications</h3>
                  {product.features && product.features.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-4 p-4 bg-primary/5 border border-primary/10 rounded-2xl"
                        >
                          <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center shrink-0">
                            <FiCheck size={16} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900 text-sm">{feature.name}</h4>
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">{feature.description || 'Pre-configured core module'}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-400 text-sm py-4">No specific feature list defined for this product.</p>
                  )}
                </motion.div>
              )}

              {activeTab === 'support' && (
                <motion.div
                  key="support-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="max-w-2xl mx-auto"
                >
                  <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">Technical Support & Guidance</h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Need assistance with product configuration, deployment, or custom integration? Our team is here to assist.
                      </p>
                    </div>

                    <Link
                      href={isLoggedIn ? "/user/tickets" : "/contact"}
                      className="inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 bg-primary hover:bg-primary-dark text-white font-semibold text-xs rounded-xl transition-all shadow-md shadow-primary/20"
                    >
                      <FiMessageSquare size={14} />
                      {isLoggedIn ? "Open Support Ticket" : "Contact Sales & Support"}
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {images.length > 0 && (
          <div className="mt-12 border-t border-slate-200/80 pt-10 animate-fade-in">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-slate-900">Product Gallery</h2>
              <p className="text-xs text-slate-500 mt-1">All preview screenshots and images</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {images.map((img, idx) => (
                <div
                  key={img.id || idx}
                  onClick={() => {
                    setLightboxIndex(idx);
                    setLightboxOpen(true);
                  }}
                  className="relative w-full overflow-hidden cursor-pointer group border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <Image
                    src={img.image}
                    alt={img.title || `${product.name} image ${idx + 1}`}
                    width={1000} height={1000}
                    className="object-cover"
                  />
                  
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quality Standards Pillars */}
        <div className="mt-12 border-t border-slate-200/80 pt-10">
          <div className="text-center mb-8 space-y-1">
            <h2 className="text-2xl font-semibold text-slate-900">Built to Professional Standards</h2>
            <p className="text-xs text-slate-500">Engineered for durability, speed, and enterprise security</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <FiCpu className="text-primary" size={24} />,
                title: "High Performance Architecture",
                desc: "Optimized database queries, caching, and clean code for seamless user experience.",
                bg: "bg-primary/10 border-primary/20"
              },
              {
                icon: <FiShield className="text-primary-light" size={24} />,
                title: "Enterprise Security",
                desc: "Sanitized data structures, encrypted auth sessions, and strict access controls.",
                bg: "bg-primary/5 border-primary/10"
              },
              {
                icon: <FiActivity className="text-secondary" size={24} />,
                title: "Reliability & Support",
                desc: "Full technical assistance, continuous updates, and structured support tickets.",
                bg: "bg-secondary/10 border-secondary/20"
              }
            ].map((pillar, idx) => (
              <div key={idx} className="bg-white border border-primary/10 rounded-2xl p-5 shadow-sm space-y-3 hover:shadow-md hover:border-primary/20 transition-all duration-300">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${pillar.bg}`}>
                  {pillar.icon}
                </div>
                <h4 className="font-semibold text-slate-900 text-sm">{pillar.title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && images[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/90 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-8"
          >
            <div className="absolute inset-0 cursor-zoom-out" onClick={() => setLightboxOpen(false)} />

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative max-w-5xl w-full aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center z-10"
            >
              <Image
                width={1600}
                height={1000}
                src={images[lightboxIndex].image}
                alt={`${product.name} preview ${lightboxIndex + 1}`}
                className="w-full h-full object-contain"
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/60 hover:bg-black/90 text-white rounded-full transition-colors border border-white/10 cursor-pointer"
                    aria-label="Previous image"
                  >
                    <FiChevronLeft size={20} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxIndex((prev) => (prev + 1) % images.length);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/60 hover:bg-black/90 text-white rounded-full transition-colors border border-white/10 cursor-pointer"
                    aria-label="Next image"
                  >
                    <FiChevronRight size={20} />
                  </button>
                </>
              )}

              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 p-3 bg-black/60 hover:bg-black/90 text-white rounded-full transition-colors border border-white/10 cursor-pointer"
                aria-label="Close preview"
              >
                <FiX size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

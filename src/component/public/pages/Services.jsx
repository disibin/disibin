'use client'
import React from 'react'
import { motion } from 'framer-motion'
import {
  FiMonitor,
  FiSmartphone,
  FiTrendingUp,
  FiCloud,
  FiShield,
  FiCheckCircle,
  FiCompass,
  FiLayout,
  FiCode,
  FiLock,
  FiSend,
  FiRefreshCw
} from 'react-icons/fi'

const coreServices = [
  {
    icon: FiMonitor,
    title: 'Enterprise Web Apps',
    badge: 'Core Platform',
    desc: 'Multi-tenant dashboards, complex permission management, secure financial transactions, and real-time data streaming.',
    ideal: 'SaaS platforms, e-commerce, and business portals.',
  },
  {
    icon: FiSmartphone,
    title: 'Mobile Applications',
    badge: 'Mobile Systems',
    desc: 'Native-feeling cross-platform mobile apps built with offline synchronization, biometric security, and push notifications.',
    ideal: 'Consumer apps, field operations, and mobile tools.',
  },
  {
    icon: FiTrendingUp,
    title: 'Business Innovation',
    badge: 'Growth Engine',
    desc: 'AI-assisted process automation, executive decision dashboards, and legacy system modernization without downtime.',
    ideal: 'Scaling enterprises and digital transformations.',
  },
  {
    icon: FiCloud,
    title: 'Cloud Architecture',
    badge: 'Infrastructure',
    desc: 'High-availability microservices, automated CI/CD deployment pipelines, cloud cost optimization, and secure API gateways.',
    ideal: 'High-traffic applications and scalable backends.',
  },
]


const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, amount: 0.2 },
  transition: { duration: 0.5, ease: 'easeOut', delay },
})

export default function Services() {
  return (
    <div className="w-full antialiased space-y-16 ">

      <motion.section {...fadeUp()} className="w-full text-center max-w-3xl mx-auto p-4 md:p-8 space-y-3">
        <h2 className="font-poppins text-3xl sm:text-5xl font-semibold text-slate-900 leading-tight">
          We engineer <span className="text-primary font-semibold">high-performance</span> digital products
        </h2>
        <p className="text-slate-500 font-poppins text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          From enterprise web applications to business process innovation, we engineer software designed for speed, scale, and long-term performance.
        </p>
      </motion.section>

      <motion.section {...fadeUp(0.1)} className="w-full px-2 p-4 md:p-8">
        <div className="mb-6 text-center sm:text-left">
          <h3 className="font-poppins text-xl sm:text-2xl font-semibold text-slate-900">What We Build</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreServices.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.title}
                {...fadeUp(i * 0.08 + 0.1)}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-slate-100 shadow-xs hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <h4 className="font-poppins font-semibold text-slate-900 text-base mb-1.5 group-hover:text-primary transition-colors">{s.title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed font-poppins">{s.desc}</p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-0.5">Ideal For</span>
                  <p className="text-slate-800 font-medium text-xs font-poppins">{s.ideal}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.section>

    </div>
  )
}
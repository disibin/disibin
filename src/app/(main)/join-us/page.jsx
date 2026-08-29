import React from 'react'
import Link from 'next/link'

const JoinUsPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-24 px-6 text-center">
      <div className="w-full max-w-3xl">
        <h4 className="text-[10px] font-semibold uppercase tracking-[0.4em] text-primary mb-6">Build the Future</h4>
        <h1 className="text-5xl md:text-6xl font-semibold mb-8 tracking-tighter text-slate-900 leading-[1.1]">
          Architect Your <span className="italic text-slate-400 font-serif">Legacy</span> With Us
        </h1>
        <p className="text-slate-500 text-xl leading-relaxed mb-12">
          We are always looking for visionary engineers, creative architects, and strategic thinkers to join our global studio.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
           <Link href="/career" className="px-10 py-5 rounded-2xl bg-slate-900 text-white font-semibold hover:bg-primary transition-all shadow-xl shadow-slate-900/10">View Open Positions</Link>
           <Link href="/contact" className="px-10 py-5 rounded-2xl bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-all">Submit Inquiry</Link>
        </div>
      </div>
    </div>
  )
}

export default JoinUsPage



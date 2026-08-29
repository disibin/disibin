'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { FiBriefcase, FiMapPin, FiChevronDown, FiExternalLink } from 'react-icons/fi';

export default function PublicCareerPage() {
  const [jobs, setJobs] = useState([]);
  const [expandedJobId, setExpandedJobId] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get('/api/public/career');
      if (res.data.success) {
        setJobs(res.data.data);
      }
    } catch {
      toast.error('Failed to load career openings');
    }
  };

  const toggleJob = (id) => {
    setExpandedJobId(prev => prev === id ? null : id);
  };

  const formatList = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    if (typeof val === 'string') {
      try {
        const parsed = JSON.parse(val);
        if (Array.isArray(parsed)) return parsed;
      } catch {}
      return val.split(',').map(s => s.trim()).filter(Boolean);
    }
    return [];
  };

  return (
    <div className="w-full min-h-screen flex flex-col pt-6 pb-16 px-4 max-w-5xl mx-auto space-y-12">
      <Toaster position="top-center" />

      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight text-slate-900">
          Shape the Future of Digital Innovation
        </h1>
        <p className="text-slate-500 text-sm sm:text-base font-medium leading-relaxed">
          We are a high-impact studio building world-class platforms. Explore our current career openings below.
        </p>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-semibold text-slate-900">Open Positions</h2>

        {jobs.length === 0 ? (
          <div className="p-12 rounded-3xl text-center text-slate-500 space-y-2 border border-slate-100 bg-white">
            <FiBriefcase size={36} className="mx-auto text-slate-300" />
            <h3 className="text-lg font-semibold text-slate-800">No Open Positions Currently</h3>
            <p className="text-xs text-slate-400">There are no open job roles at this time. Please check back later!</p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="space-y-4">
              {jobs.map((job) => {
                const isExpanded = expandedJobId === job.job_id;
                const responsibilities = formatList(job.responsibilities);
                const skills = formatList(job.skills);
                const niceToHave = formatList(job.nice_to_have);

                return (
                  <div
                    key={job.job_id}
                    className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden transition-all hover:border-primary/30"
                  >
                    {/* Job Header */}
                    <div
                      onClick={() => toggleJob(job.job_id)}
                      className="p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white hover:bg-slate-50/60 transition-colors"
                    >
                      <div className="space-y-2 min-w-0">
                        <h3 className="text-xl font-semibold text-slate-900 truncate">{job.title}</h3>
                        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">{job.job_type}</span>
                          <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full">{job.level}</span>
                          <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full flex items-center gap-1">
                            <FiMapPin size={12} /> {job.location}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                        {job.compensation && (
                          <span className="text-sm font-semibold text-slate-800">{job.compensation}</span>
                        )}
                        <div className={`p-2 rounded-xl bg-slate-100 text-slate-500 transition-transform duration-200 ${isExpanded ? 'rotate-180 bg-primary/20 text-primary' : ''}`}>
                          <FiChevronDown size={18} />
                        </div>
                      </div>
                    </div>

                    {/* Expanded Role Details */}
                    {isExpanded && (
                      <div className="p-6 border-t border-slate-100 space-y-6 bg-slate-50/40 text-sm">
                        {job.description && (
                          <div className="space-y-2">
                            <h4 className="font-semibold text-slate-900 text-xs uppercase tracking-wider">About the Role</h4>
                            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{job.description}</p>
                          </div>
                        )}

                        {responsibilities.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="font-semibold text-slate-900 text-xs uppercase tracking-wider">Key Responsibilities</h4>
                            <ul className="list-disc list-inside space-y-1 text-slate-700">
                              {responsibilities.map((r, i) => <li key={i}>{r}</li>)}
                            </ul>
                          </div>
                        )}

                        {skills.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="font-semibold text-slate-900 text-xs uppercase tracking-wider">Required Skills</h4>
                            <div className="flex flex-wrap gap-2">
                              {skills.map((s, i) => (
                                <span key={i} className="px-3 py-1 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {niceToHave.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="font-semibold text-slate-900 text-xs uppercase tracking-wider">Nice to Have</h4>
                            <ul className="list-disc list-inside space-y-1 text-slate-700">
                              {niceToHave.map((n, i) => <li key={i}>{n}</li>)}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Redirect link to dashboard to apply */}
            <div className="pt-8 text-center border-t border-slate-100 flex flex-col items-center gap-3">
              <p className="text-slate-600 text-sm font-medium">Interested in applying for any of these positions?</p>
              <a
                href="https://dashboard.disibin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-900 hover:bg-primary text-white rounded-2xl font-semibold text-sm transition-all shadow-md"
              >
                <span>Apply via Disibin Portal</span>
                <FiExternalLink size={16} />
              </a>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}


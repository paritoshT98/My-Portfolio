import React from 'react';
import { X, ExternalLink, Download, Mail, Phone, MapPin, Award, CheckCircle2, Database, Cloud, Cpu } from 'lucide-react';

export default function InfoModal({ activeTab, onClose }) {
  if (!activeTab) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 pointer-events-auto select-text">
      {/* Dimmed backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Frosted Glass Container */}
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl frosted-glass border border-white/20 p-6 sm:p-8 md:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] text-white z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/15">
          <div>
            <div className="text-[11px] font-bold tracking-[0.25em] text-sky-200 uppercase">
              Paritosh Thakur
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-0.5">
              {activeTab === 'WORK' && 'Professional Experience & Projects'}
              {activeTab === 'ABOUT' && 'About & Technical Core'}
              {activeTab === 'CONTACT' && "Get in Touch"}
            </h2>
          </div>
          <button
            onClick={onClose}
            data-hover="true"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white/80 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* WORK TAB */}
        {activeTab === 'WORK' && (
          <div className="py-6 space-y-6">
            {/* Amazon Web Services */}
            <div className="p-5 rounded-2xl bg-white/[0.06] border border-white/10 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-white">Amazon Web Services (AWS)</h3>
                  <div className="text-xs text-sky-200 font-medium">Cloud Support Engineer (Big Data)</div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    <Award className="w-3 h-3 mr-1" /> Multi-Month MVP
                  </span>
                  <span className="text-[11px] text-white/60">Apr 2024 – Present</span>
                </div>
              </div>
              <p className="text-xs text-white/80 leading-relaxed">
                Enterprise Big Data Solutions across AWS Glue, Athena, and Lake Formation.
              </p>
              <ul className="text-xs text-white/75 space-y-2 list-none">
                <li className="flex items-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-2 mt-0.5 shrink-0" />
                  <span><strong>AI Support Automation:</strong> Pioneered AWS Glue integration into an internal AI-powered support automation platform by building agent capabilities fetching service metadata and logs.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-2 mt-0.5 shrink-0" />
                  <span><strong>Infrastructure Architect:</strong> Architected 100+ AWS Data Infrastructures for cloud migration and optimized 50+ Glue ETL frameworks, saving significant client costs.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-2 mt-0.5 shrink-0" />
                  <span><strong>Subject Matter Expert:</strong> Earned Glue SME accreditation ahead of the entire Q2 bootcamp batch; authored service implementation guides with Principal Engineers.</span>
                </li>
              </ul>
            </div>

            {/* Tata Consultancy Services */}
            <div className="p-5 rounded-2xl bg-white/[0.06] border border-white/10 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-white">Tata Consultancy Services (TCS)</h3>
                  <div className="text-xs text-sky-200 font-medium">Senior Process Associate</div>
                </div>
                <span className="text-[11px] text-white/60">Jan 2022 – Mar 2024</span>
              </div>
              <ul className="text-xs text-white/75 space-y-2 list-none">
                <li className="flex items-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 mr-2 mt-0.5 shrink-0" />
                  <span>Engineered automated data pipelines ingesting millions of rows daily from multiple sources into Redshift through Glue ETL.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 mr-2 mt-0.5 shrink-0" />
                  <span>Designed Data Quality rules on Glue, delivering a 30% reduction in processing time and automatic S3-to-Step-Functions trigger workflows.</span>
                </li>
              </ul>
            </div>

            {/* Deloitte */}
            <div className="p-5 rounded-2xl bg-white/[0.06] border border-white/10 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-white">Deloitte Consulting</h3>
                  <div className="text-xs text-sky-200 font-medium">Associate Analyst</div>
                </div>
                <span className="text-[11px] text-white/60">Sep 2018 – Dec 2020</span>
              </div>
              <ul className="text-xs text-white/75 space-y-1.5 list-none">
                <li className="flex items-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 mr-2 mt-0.5 shrink-0" />
                  <span>Informatica to Big Data Stack Migration using PySpark, SparkSQL, S3, EMR, and Hive.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 mr-2 mt-0.5 shrink-0" />
                  <span>Health insurance analytics monitoring and high-volume ETL failure debugging.</span>
                </li>
              </ul>
            </div>

            {/* Key Projects */}
            <div className="p-5 rounded-2xl bg-white/[0.06] border border-white/10 space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-sky-200">Featured Big Data Projects</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="font-bold text-white mb-1">E-Commerce Real-Time Streaming</div>
                  <div className="text-white/70">Confluent Kafka, PySpark, Dead Letter Queues (DLQ) for unmatched transactions, real-time analytics.</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="font-bold text-white mb-1">Logistics Daily Batch Ingestion</div>
                  <div className="text-white/70">Airflow (GCP Cloud Composer), GCP DataProc, Hive, GCS for dependency-driven pipeline orchestration.</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ABOUT TAB */}
        {activeTab === 'ABOUT' && (
          <div className="py-6 space-y-6">
            <div className="space-y-3 text-sm text-white/85 leading-relaxed">
              <p>
                I am a results-oriented <strong>Cloud Data Engineer with 7+ years of experience</strong> architecting, deploying, and optimizing mission-critical data pipelines and distributed computing infrastructure.
              </p>
              <p>
                Currently with <strong>Amazon Web Services (AWS)</strong>, I specialize in large-scale ETL modernization, AWS Glue, Athena, Lake Formation, and pioneering AI-powered automation agents for operational excellence.
              </p>
            </div>

            {/* Skill Badges */}
            <div className="space-y-4 pt-2">
              <div>
                <div className="flex items-center space-x-2 text-xs font-bold text-sky-200 uppercase tracking-wider mb-2">
                  <Cloud className="w-4 h-4" />
                  <span>AWS Cloud Ecosystem</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['AWS Glue', 'Athena', 'Amazon S3', 'Lake Formation', 'Step Functions', 'EventBridge', 'Lambda', 'EMR', 'CloudWatch'].map(skill => (
                    <span key={skill} className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 border border-white/15 text-white">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-2 text-xs font-bold text-sky-200 uppercase tracking-wider mb-2">
                  <Cpu className="w-4 h-4" />
                  <span>Big Data & Distributed Frameworks</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['PySpark', 'Apache Airflow', 'Confluent Kafka', 'SparkSQL', 'Hive', 'ETL Architecture'].map(skill => (
                    <span key={skill} className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 border border-white/15 text-white">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-2 text-xs font-bold text-sky-200 uppercase tracking-wider mb-2">
                  <Database className="w-4 h-4" />
                  <span>Languages & Databases</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'Amazon Redshift', 'MySQL', 'SQL', 'Bash / Linux'].map(skill => (
                    <span key={skill} className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 border border-white/15 text-white">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="pt-3 border-t border-white/10">
              <div className="text-xs font-bold text-sky-200 uppercase tracking-wider mb-1">Education</div>
              <div className="text-sm font-semibold text-white">B.Sc. Information Science and Telecommunication</div>
              <div className="text-xs text-white/60">Ravenshaw University, Cuttack, Odisha, India</div>
            </div>
          </div>
        )}

        {/* CONTACT TAB */}
        {activeTab === 'CONTACT' && (
          <div className="py-6 space-y-6">
            <p className="text-sm text-white/85 leading-relaxed">
              Open to discussions on high-impact Cloud Data Architecture, Big Data Engineering, and distributed computing roles.
            </p>

            <div className="space-y-3">
              <a
                href="mailto:paritoshthakur2@gmail.com"
                data-hover="true"
                className="flex items-center space-x-4 p-4 rounded-2xl bg-white/[0.08] hover:bg-white/15 border border-white/15 transition-all group"
              >
                <div className="p-3 rounded-xl bg-white/10 group-hover:bg-white/20 transition-colors">
                  <Mail className="w-5 h-5 text-sky-300" />
                </div>
                <div>
                  <div className="text-xs text-white/60 font-medium">Email</div>
                  <div className="text-sm font-semibold text-white">paritoshthakur2@gmail.com</div>
                </div>
              </a>

              <a
                href="tel:+917008665113"
                data-hover="true"
                className="flex items-center space-x-4 p-4 rounded-2xl bg-white/[0.08] hover:bg-white/15 border border-white/15 transition-all group"
              >
                <div className="p-3 rounded-xl bg-white/10 group-hover:bg-white/20 transition-colors">
                  <Phone className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <div className="text-xs text-white/60 font-medium">Phone / WhatsApp</div>
                  <div className="text-sm font-semibold text-white">+91 7008665113</div>
                </div>
              </a>

              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                <div className="p-3 rounded-xl bg-white/10">
                  <MapPin className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <div className="text-xs text-white/60 font-medium">Location</div>
                  <div className="text-sm font-semibold text-white">Hyderabad, Telangana, India</div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="/ParitoshThakur_Resume_NEW.docx"
                download="ParitoshThakur_Resume_NEW.docx"
                data-hover="true"
                className="w-full flex items-center justify-center space-x-2 py-3.5 px-6 rounded-2xl bg-white text-slate-900 font-bold text-xs uppercase tracking-wider hover:bg-sky-100 transition-all hover:scale-[1.02] shadow-xl"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume (ParitoshThakur_Resume_NEW.docx)</span>
              </a>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-white/60">
          <span>Hyderabad, India</span>
          <a
            href="/ParitoshThakur_Resume_NEW.docx"
            download="ParitoshThakur_Resume_NEW.docx"
            data-hover="true"
            className="hover:text-white flex items-center space-x-1 underline"
          >
            <span>Direct DOCX Download</span>
            <ExternalLink className="w-3 h-3 ml-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

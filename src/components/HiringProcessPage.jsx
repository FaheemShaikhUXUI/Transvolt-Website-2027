import React, { useState, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import { INITIAL_CANDIDATES, INITIAL_SETTINGS } from '../data/hiringData';
import { HiringFormBuilderPage } from './HiringFormBuilderPage';
import {
  Users,
  Send,
  FileCheck2,
  CalendarCheck2,
  Award,
  UserX,
  Settings,
  UserPlus,
  RefreshCw,
  TrendingUp,
  Briefcase,
  Sparkles,
  ArrowLeft,
  Search,
  ExternalLink,
  Copy,
  Check,
  Calendar,
  Clock,
  Video,
  MapPin,
  ChevronRight,
  ChevronDown,
  X,
  Star,
  AlertCircle,
  CheckCircle2,
  Phone,
  Mail,
  Building,
  GraduationCap,
  FileText,
  Sliders,
  Filter,
  Lock,
  LogOut,
  KeyRound,
  Shield,
  Eye,
  EyeOff,
  User,
  Plus,
} from 'lucide-react';

export default function HiringProcessPage({ onNavigate }) {
  const { isDark } = useTheme();

  // Authentication State (Opens with Login Page with dummy ID & Password)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginId, setLoginId] = useState('hr@transvolt.in');
  const [loginPassword, setLoginPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    if (!loginId.trim() || !loginPassword.trim()) {
      setLoginError('Please enter both Login ID and Password');
      return;
    }
    setIsLoggingIn(true);
    setLoginError('');
    setTimeout(() => {
      setIsAuthenticated(true);
      setIsLoggingIn(false);
    }, 350);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // State
  const [candidates, setCandidates] = useState(INITIAL_CANDIDATES);
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const [activeTab, setActiveTab] = useState('overview'); // overview | received | under_hiring | hired | unhired | sent | settings
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [copiedToken, setCopiedToken] = useState(null);

  // Modals state
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detailTab, setDetailTab] = useState('personal'); // personal | education | experience | docs | timeline

  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    appliedPosition: settings.positions[0] || 'Senior EV Systems Engineer',
    department: settings.departments[0] || 'EV Engineering & Powertrain',
    customMessage: '',
  });

  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [scheduleCandidate, setScheduleCandidate] = useState(null);
  const [scheduleForm, setScheduleForm] = useState({
    roundName: 'Technical & System Architecture Round',
    scheduledDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    scheduledTime: '11:00 AM',
    mode: 'ONLINE',
    platform: 'Google Meet',
    meetingLink: 'https://meet.google.com/tv-rec-demo',
    interviewerName: 'Dr. Rajesh Nair (VP of Engineering)',
    notes: 'Please review candidate’s battery thermal management telemetry project prior to call.',
  });

  const [isEvalOpen, setIsEvalOpen] = useState(false);
  const [evalCandidate, setEvalCandidate] = useState(null);
  const [evalForm, setEvalForm] = useState({
    roundName: 'Technical & System Architecture Round',
    evaluatedBy: 'Dr. Rajesh Nair',
    technicalRating: 5,
    communicationRating: 4,
    problemSolvingRating: 5,
    overallRating: 5,
    strengths: 'Outstanding grasp of high-voltage safety, CAN bus communication, and BMS cell balancing.',
    improvements: 'Can familiarize further with specific Western DFC industrial routes.',
    recommendation: 'HIRE',
  });

  const [isHireOpen, setIsHireOpen] = useState(false);
  const [hireCandidate, setHireCandidate] = useState(null);
  const [hireForm, setHireForm] = useState({
    joiningDate: new Date(Date.now() + 86400000 * 14).toISOString().split('T')[0],
    offeredDesignation: '',
    offeredDepartment: '',
    joiningInstructions: 'Reporting to Powai Engineering HQ at 9:30 AM with original KYC credentials.',
  });

  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [rejectCandidate, setRejectCandidate] = useState(null);
  const [rejectReason, setRejectReason] = useState('Requirement profile mismatch for current senior fleet opening.');

  // Settings Tiles Modals & Data States
  const [isPostJobOpen, setIsPostJobOpen] = useState(false);
  const [isHiringFormOpen, setIsHiringFormOpen] = useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [settingsSuccessMessage, setSettingsSuccessMessage] = useState('');

  const [jobPostForm, setJobPostForm] = useState({
    title: '',
    department: 'EV Engineering & Powertrain',
    location: 'Powai HQ, Mumbai',
    type: 'Full-Time',
    experience: '3-6 Years',
    salaryRange: '₹14 - ₹20 LPA',
    description: '',
  });

  const [hrUsers, setHrUsers] = useState([
    { id: 'usr-1', name: 'Faheem S.', email: 'hr@transvolt.in', role: 'HR Lead & Administrator', department: 'All Departments', status: 'ACTIVE' },
    { id: 'usr-2', name: 'Dr. Rajesh Nair', email: 'rajesh.nair@transvolt.in', role: 'Technical Interviewer', department: 'EV Engineering', status: 'ACTIVE' },
    { id: 'usr-3', name: 'Pooja Kulkarni', email: 'pooja.k@transvolt.in', role: 'Talent Acquisition Lead', department: 'Fleet Operations', status: 'ACTIVE' },
  ]);

  const [newUserForm, setNewUserForm] = useState({
    name: '',
    email: '',
    role: 'HR Recruiter',
    department: 'EV Engineering & Powertrain',
    accessLevel: 'Full Cockpit Access',
  });

  const [formConfig, setFormConfig] = useState({
    kycRequired: true,
    drivingLicenseRequired: true,
    evQuestionnaireRequired: true,
    ndaConsentRequired: true,
    salaryBreakdownRequired: true,
    portfolioLinkAllowed: true,
  });

  const handleCreateJob = (e) => {
    e.preventDefault();
    if (!jobPostForm.title.trim()) return;
    if (!settings.positions.includes(jobPostForm.title)) {
      setSettings(prev => ({
        ...prev,
        positions: [jobPostForm.title, ...prev.positions]
      }));
    }
    setIsPostJobOpen(false);
    setSettingsSuccessMessage(`Opportunity "${jobPostForm.title}" successfully published to Transvolt Careers portal!`);
    setJobPostForm({
      title: '',
      department: 'EV Engineering & Powertrain',
      location: 'Powai HQ, Mumbai',
      type: 'Full-Time',
      experience: '3-6 Years',
      salaryRange: '₹14 - ₹20 LPA',
      description: '',
    });
    setTimeout(() => setSettingsSuccessMessage(''), 5000);
  };

  const handleSaveFormConfig = (e) => {
    e.preventDefault();
    setIsHiringFormOpen(false);
    setSettingsSuccessMessage('Hiring Form application schema saved and updated for all future candidate invites!');
    setTimeout(() => setSettingsSuccessMessage(''), 5000);
  };

  const handleAddHrUser = (e) => {
    e.preventDefault();
    if (!newUserForm.name.trim() || !newUserForm.email.trim()) return;
    const newEntry = {
      id: `usr-${Date.now()}`,
      name: newUserForm.name,
      email: newUserForm.email,
      role: newUserForm.role,
      department: newUserForm.department,
      status: 'ACTIVE',
    };
    setHrUsers(prev => [...prev, newEntry]);
    setIsAddUserOpen(false);
    setSettingsSuccessMessage(`User "${newUserForm.name}" (${newUserForm.email}) granted authorized access to HR Pannel!`);
    setNewUserForm({
      name: '',
      email: '',
      role: 'HR Recruiter',
      department: 'EV Engineering & Powertrain',
      accessLevel: 'Full Cockpit Access',
    });
    setTimeout(() => setSettingsSuccessMessage(''), 5000);
  };

  // Counts by status
  const counts = useMemo(() => {
    return {
      received: candidates.filter((c) => c.status === 'UNDER_REVIEW' || c.status === 'CHANGES_REQUESTED').length,
      under_hiring: candidates.filter(
        (c) =>
          c.status === 'INTERVIEW_SCHEDULED' ||
          c.status === 'INTERVIEW_RESCHEDULED' ||
          c.status === 'INTERVIEW_COMPLETED'
      ).length,
      hired: candidates.filter((c) => c.status === 'HIRED').length,
      unhired: candidates.filter((c) => c.status === 'NOT_SELECTED').length,
      sent: candidates.filter((c) => c.status === 'APPLICATION_PENDING').length,
      total: candidates.length,
    };
  }, [candidates]);

  // Filtered Candidates
  const filteredCandidates = useMemo(() => {
    return candidates.filter((c) => {
      const matchSearch =
        !searchQuery ||
        c.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.appliedPosition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.department.toLowerCase().includes(searchQuery.toLowerCase());

      const matchDept = departmentFilter === 'All' || c.department === departmentFilter;

      return matchSearch && matchDept;
    });
  }, [candidates, searchQuery, departmentFilter]);

  // Copy token handler
  const handleCopyToken = (token) => {
    navigator.clipboard.writeText(`https://careers.transvoltmobility.com/apply?token=${token}`);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2500);
  };

  // Actions
  const handleCreateInvitation = (e) => {
    e.preventDefault();
    if (!inviteForm.fullName || !inviteForm.email) return;

    const newCandidate = {
      id: `TV-HR-2026-${String(candidates.length + 1).padStart(3, '0')}`,
      token: `tv-rec-${inviteForm.fullName.toLowerCase().replace(/[^a-z0-9]/g, '')}-${Math.random().toString(36).substring(2, 7)}`,
      fullName: inviteForm.fullName,
      email: inviteForm.email,
      phone: inviteForm.phone || '+91 98000 00000',
      appliedPosition: inviteForm.appliedPosition,
      department: inviteForm.department,
      status: 'APPLICATION_PENDING',
      invitation: {
        sentAt: new Date().toISOString(),
        sentBy: settings.hrContactPerson,
        emailStatus: 'SENT',
        customMessage: inviteForm.customMessage,
      },
      documents: {
        resumeFileName: `${inviteForm.fullName.replace(/\s+/g, '_')}_Resume.pdf`,
      },
      timeline: [
        {
          id: `act-${Date.now()}`,
          type: 'INVITATION_SENT',
          description: `Application form invitation issued by ${settings.hrContactPerson}.`,
          timestamp: new Date().toISOString(),
          actor: 'HR System',
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setCandidates((prev) => [newCandidate, ...prev]);
    setIsInviteOpen(false);
    setInviteForm({
      fullName: '',
      email: '',
      phone: '',
      appliedPosition: settings.positions[0] || 'Senior EV Systems Engineer',
      department: settings.departments[0] || 'EV Engineering & Powertrain',
      customMessage: '',
    });
    setActiveTab('sent');
  };

  const handleConfirmSchedule = (e) => {
    e.preventDefault();
    if (!scheduleCandidate) return;

    setCandidates((prev) =>
      prev.map((c) => {
        if (c.id === scheduleCandidate.id) {
          return {
            ...c,
            status: 'INTERVIEW_SCHEDULED',
            interviewSchedule: {
              roundName: scheduleForm.roundName,
              scheduledDate: scheduleForm.scheduledDate,
              scheduledTime: scheduleForm.scheduledTime,
              mode: scheduleForm.mode,
              platform: scheduleForm.platform,
              meetingLink: scheduleForm.meetingLink,
              interviewerName: scheduleForm.interviewerName,
              notes: scheduleForm.notes,
            },
            timeline: [
              {
                id: `act-${Date.now()}`,
                type: 'INTERVIEW_SCHEDULED',
                description: `${scheduleForm.roundName} scheduled for ${scheduleForm.scheduledDate} at ${scheduleForm.scheduledTime} with ${scheduleForm.interviewerName}.`,
                timestamp: new Date().toISOString(),
                actor: settings.hrContactPerson,
              },
              ...(c.timeline || []),
            ],
          };
        }
        return c;
      })
    );

    setIsScheduleOpen(false);
    if (selectedCandidate && selectedCandidate.id === scheduleCandidate.id) {
      setSelectedCandidate((prev) => ({
        ...prev,
        status: 'INTERVIEW_SCHEDULED',
        interviewSchedule: scheduleForm,
      }));
    }
  };

  const handleConfirmEval = (e) => {
    e.preventDefault();
    if (!evalCandidate) return;

    const evaluation = {
      id: `eval-${Date.now()}`,
      roundName: evalForm.roundName,
      evaluatedBy: evalForm.evaluatedBy,
      evaluatedAt: new Date().toISOString(),
      technicalRating: Number(evalForm.technicalRating),
      communicationRating: Number(evalForm.communicationRating),
      problemSolvingRating: Number(evalForm.problemSolvingRating),
      overallRating: Number(evalForm.overallRating),
      strengths: evalForm.strengths,
      improvements: evalForm.improvements,
      recommendation: evalForm.recommendation,
    };

    setCandidates((prev) =>
      prev.map((c) => {
        if (c.id === evalCandidate.id) {
          const nextStatus =
            evalForm.recommendation === 'HIRE'
              ? 'INTERVIEW_COMPLETED'
              : evalForm.recommendation === 'REJECT'
              ? 'NOT_SELECTED'
              : 'INTERVIEW_COMPLETED';

          return {
            ...c,
            status: nextStatus,
            evaluations: [evaluation, ...(c.evaluations || [])],
            timeline: [
              {
                id: `act-${Date.now()}`,
                type: 'INTERVIEW_EVALUATION',
                description: `Evaluation submitted by ${evalForm.evaluatedBy}: Recommendation is ${evalForm.recommendation}.`,
                timestamp: new Date().toISOString(),
                actor: evalForm.evaluatedBy,
              },
              ...(c.timeline || []),
            ],
          };
        }
        return c;
      })
    );

    setIsEvalOpen(false);
  };

  const handleConfirmHire = (e) => {
    e.preventDefault();
    if (!hireCandidate) return;

    setCandidates((prev) =>
      prev.map((c) => {
        if (c.id === hireCandidate.id) {
          return {
            ...c,
            status: 'HIRED',
            decision: {
              status: 'HIRED',
              decisionDate: new Date().toISOString(),
              decidedBy: settings.hrContactPerson,
              joiningDate: hireForm.joiningDate,
              offeredDesignation: hireForm.offeredDesignation || c.appliedPosition,
              offeredDepartment: hireForm.offeredDepartment || c.department,
              joiningInstructions: hireForm.joiningInstructions,
            },
            timeline: [
              {
                id: `act-${Date.now()}`,
                type: 'HIRED',
                description: `Candidate officially hired for ${hireForm.offeredDesignation || c.appliedPosition}. Joining Date: ${hireForm.joiningDate}.`,
                timestamp: new Date().toISOString(),
                actor: settings.hrContactPerson,
              },
              ...(c.timeline || []),
            ],
          };
        }
        return c;
      })
    );

    setIsHireOpen(false);
    setActiveTab('hired');
  };

  const handleConfirmReject = (e) => {
    e.preventDefault();
    if (!rejectCandidate) return;

    setCandidates((prev) =>
      prev.map((c) => {
        if (c.id === rejectCandidate.id) {
          return {
            ...c,
            status: 'NOT_SELECTED',
            decision: {
              status: 'NOT_SELECTED',
              decisionDate: new Date().toISOString(),
              decidedBy: settings.hrContactPerson,
              rejectionReason: rejectReason,
            },
            timeline: [
              {
                id: `act-${Date.now()}`,
                type: 'NOT_SELECTED',
                description: `Application closed. Reason: ${rejectReason}`,
                timestamp: new Date().toISOString(),
                actor: settings.hrContactPerson,
              },
              ...(c.timeline || []),
            ],
          };
        }
        return c;
      })
    );

    setIsRejectOpen(false);
    setActiveTab('unhired');
  };

  // If Hiring Form Builder page is active, open the dedicated Architect Full Page
  if (isHiringFormOpen) {
    return (
      <HiringFormBuilderPage
        isDark={isDark}
        onBack={() => setIsHiringFormOpen(false)}
        onSaveSchema={(newSchema) => {
          setIsHiringFormOpen(false);
          setSettingsSuccessMessage('Hiring Form schema v2.4 successfully saved & deployed!');
          setTimeout(() => setSettingsSuccessMessage(''), 5000);
        }}
      />
    );
  }

  return (
    <div className={`w-full min-h-screen ${isDark ? 'bg-[#0B0F17] text-gray-100' : 'bg-slate-50 text-gray-900'} font-sans pb-16`}>
      {/* =========================================================================
          STATIC HEADER (Left: Back Button [arrow only] + "HR Pannel",
          Center: Transvolt Logo [Forced Dead-Center Horizontally & Vertically], 
          Right: Logout Button [Icon Only])
          ========================================================================= */}
      <header className="sticky top-0 z-40 w-full bg-[#0D1525] border-b border-white/10 text-white shadow-md select-none">
        <div className="relative w-full px-4 sm:px-6 xl:px-[30px] h-12 flex items-center justify-between">
          {/* Left: Page Name "HR Pannel" (Back button removed) */}
          <div className="flex items-center gap-2 z-10">
            <span className="text-sm sm:text-base font-bold tracking-tight text-white font-sans">
              HR Pannel
            </span>
            <span className="hidden sm:inline-block text-[9px] px-2 py-0.5 rounded-full bg-[#4472C4]/20 border border-[#4472C4]/40 text-[#6893db] font-mono uppercase font-bold tracking-wider">
              Recruitment Portal
            </span>
          </div>

          {/* Center: Transvolt Logo (Small by 25%, Forced Dead-Center Horizontally & Vertically) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-auto">
            <img
              src="/logo_white.svg"
              alt="Transvolt Mobility"
              className="h-5 sm:h-5.5 w-auto object-contain cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => onNavigate && onNavigate('home')}
            />
          </div>

          {/* Right: Actions Group (Search, Filter, Send Form) on the left of Logout Button */}
          <div className="flex items-center gap-2 z-10">
            {isAuthenticated && (
              <>
                {/* Small Search Bar */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-7 pl-7 pr-6 rounded-lg text-[11px] font-medium border transition-all focus:outline-none focus:ring-1 focus:ring-[#548235] w-24 sm:w-32 md:w-36 lg:w-40 focus:w-44 bg-white/10 hover:bg-white/15 focus:bg-black/60 border-white/20 text-white placeholder-gray-400"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Small Filter Button with Accordion Dropdown UI */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className={`h-7 px-2.5 rounded-lg text-[11px] font-semibold border transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                      departmentFilter !== 'All'
                        ? 'bg-[#548235]/25 border-[#548235]/60 text-[#72B347]'
                        : 'bg-white/10 hover:bg-white/15 border-white/20 text-gray-200'
                    }`}
                    title="Filter by Department"
                  >
                    <Filter className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span className="max-w-[70px] sm:max-w-[90px] truncate text-[11px]">
                      {departmentFilter === 'All' ? 'Filter' : departmentFilter}
                    </span>
                    <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Filter Accordion Dropdown */}
                  {isFilterOpen && (
                    <div className="absolute right-0 top-full mt-2 w-60 rounded-xl border border-white/15 bg-[#0D1525]/95 shadow-2xl z-50 p-1.5 text-xs text-white backdrop-blur-2xl">
                      <div className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 flex items-center justify-between border-b border-white/10 mb-1">
                        <span>Select Department</span>
                        {departmentFilter !== 'All' && (
                          <button
                            onClick={() => { setDepartmentFilter('All'); setIsFilterOpen(false); }}
                            className="text-[#72B347] hover:underline"
                          >
                            Reset
                          </button>
                        )}
                      </div>
                      <div className="max-h-56 overflow-y-auto space-y-0.5 no-scrollbar">
                        <button
                          onClick={() => { setDepartmentFilter('All'); setIsFilterOpen(false); }}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                            departmentFilter === 'All'
                              ? 'bg-[#548235]/20 text-[#548235] dark:text-[#76B84A] font-bold'
                              : 'text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          <span>All Departments</span>
                          {departmentFilter === 'All' && <Check className="w-3.5 h-3.5 text-[#548235] dark:text-[#76B84A]" />}
                        </button>
                        {settings.departments.map((dept) => (
                          <button
                            key={dept}
                            onClick={() => { setDepartmentFilter(dept); setIsFilterOpen(false); }}
                            className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                              departmentFilter === dept
                                ? 'bg-[#548235]/20 text-[#548235] dark:text-[#76B84A] font-bold'
                                : 'text-gray-300 hover:bg-white/10'
                            }`}
                          >
                            <span className="truncate">{dept}</span>
                            {departmentFilter === dept && <Check className="w-3.5 h-3.5 text-[#548235] dark:text-[#76B84A] shrink-0" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Send Form Button */}
                <button
                  onClick={() => setIsInviteOpen(true)}
                  className="h-7 px-2.5 rounded-lg bg-[#548235] hover:bg-[#44692a] text-white text-[11px] font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer border border-[#548235]/80 shrink-0 hover:scale-[1.02]"
                >
                  <UserPlus className="w-3 h-3" />
                  <span>Send Form</span>
                </button>
              </>
            )}

            {/* Logout Button (ICON ONLY) */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="h-7 w-7 rounded-lg flex items-center justify-center text-rose-300 hover:text-white bg-rose-500/10 hover:bg-rose-600 border border-rose-500/30 hover:border-rose-500/60 transition-all cursor-pointer shadow-sm group ml-1 shrink-0"
                title="Logout from HR Pannel"
                aria-label="Logout"
              >
                <LogOut className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              </button>
            ) : (
              <button
                onClick={() => onNavigate && onNavigate('home')}
                className="h-7 w-7 rounded-lg flex items-center justify-center text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 transition-all cursor-pointer group shrink-0"
                title="Exit to Main Website"
                aria-label="Exit"
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              </button>
            )}
          </div>
        </div>
      </header>

      {!isAuthenticated ? (
        /* =========================================================================
           ENHANCED LUXURY HIGH-TECH LOGIN SCREEN
           ========================================================================= */
        <div className="min-h-[calc(100vh-48px)] flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden bg-[#070B12]">
          {/* Ambient Lighting Gradients */}
          <div className="pointer-events-none absolute -top-40 left-1/4 w-[500px] h-[500px] bg-[#4472C4]/20 rounded-full blur-[140px]" />
          <div className="pointer-events-none absolute -bottom-40 right-1/4 w-[500px] h-[500px] bg-[#548235]/20 rounded-full blur-[140px]" />
          
          {/* Subtle Background Grid Mesh */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] opacity-70" />

          {/* Main Login Card */}
          <div className="w-full max-w-lg bg-[#0D1525]/95 border border-white/15 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.8)] rounded-3xl p-7 sm:p-10 backdrop-blur-3xl relative z-10 text-white">
            
            {/* Header Status Pill */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#72B347] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#548235]" />
                </span>
                <span className="text-[11px] font-mono tracking-wider font-semibold text-gray-300 uppercase">
                  HR Cockpit SSO Portal
                </span>
              </div>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#4472C4]/15 border border-[#4472C4]/35 text-[#6893db] font-mono font-bold uppercase tracking-wider">
                Authorized Staff
              </span>
            </div>

            {/* Title & Description */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4472C4]/25 to-[#548235]/25 border border-white/20 text-[#72B347] mb-3.5 shadow-lg shadow-[#4472C4]/10">
                <Shield className="w-7 h-7 text-[#72B347]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans">
                HR Pannel Sign In
              </h2>
              <p className="text-xs sm:text-[13px] text-gray-400 mt-1.5 max-w-sm mx-auto leading-relaxed">
                Direct access to talent acquisition, candidate dossiers, and live interview scheduling.
              </p>
            </div>

            {/* One-Click Instant Demo Access Banner */}
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-[#4472C4]/15 via-black/40 to-[#548235]/15 border border-white/15 relative overflow-hidden shadow-inner group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono font-bold text-[#72B347] flex items-center gap-1.5 uppercase tracking-wide">
                  <KeyRound className="w-3.5 h-3.5" />
                  Dummy Demo Credentials
                </span>
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 text-gray-300">
                  Pre-Configured
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono mb-3 bg-black/60 p-2.5 rounded-xl border border-white/10">
                <div>
                  <span className="text-gray-500 block text-[9px] uppercase tracking-wider">User ID</span>
                  <span className="text-white font-semibold truncate block">hr@transvolt.in</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[9px] uppercase tracking-wider">Password</span>
                  <span className="text-white font-semibold truncate block">admin123</span>
                </div>
              </div>

              {/* Instant 1-Click Login Button */}
              <button
                type="button"
                onClick={() => {
                  setLoginId('hr@transvolt.in');
                  setLoginPassword('admin123');
                  setIsLoggingIn(true);
                  setTimeout(() => {
                    setIsAuthenticated(true);
                    setIsLoggingIn(false);
                  }, 300);
                }}
                disabled={isLoggingIn}
                className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer hover:border-[#72B347]/60 hover:text-[#72B347]"
              >
                <span>⚡ Instant One-Click Login</span>
              </button>
            </div>

            {/* Standard Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              {loginError && (
                <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Corporate Login ID / Email
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    placeholder="hr@transvolt.in"
                    className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-xs sm:text-sm font-medium placeholder-gray-500 focus:outline-none focus:border-[#72B347] focus:ring-1 focus:ring-[#72B347] transition-all shadow-inner"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Security Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-xs sm:text-sm font-medium placeholder-gray-500 focus:outline-none focus:border-[#72B347] focus:ring-1 focus:ring-[#72B347] transition-all shadow-inner"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#548235] to-[#4472C4] hover:from-[#456c2b] hover:to-[#365ca3] text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer border border-white/20 disabled:opacity-50 mt-3"
              >
                {isLoggingIn ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Sign In to Cockpit</span>
                  </>
                )}
              </button>
            </form>

            {/* Security Certification Footer & Return Link */}
            <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
              <span className="flex items-center gap-1.5 text-[11px] font-mono text-gray-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#72B347]" />
                ISO 14001 &amp; 45001 Compliant
              </span>
              <button
                onClick={() => onNavigate && onNavigate('home')}
                className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors cursor-pointer font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Website</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* =========================================================================
              COMPACT SINGLE-ROW COCKPIT BAR (Tabs Left, Settings Right)
              ========================================================================= */}
          <div className={`sticky top-12 z-30 w-full border-b backdrop-blur-xl ${
            isDark ? 'bg-black/80 border-white/10' : 'bg-white/85 border-gray-200'
          }`}>
            <div className="w-full px-4 sm:px-6 xl:px-[30px] flex items-center justify-between gap-4 h-11">
              {/* Left: Navigation Tabs */}
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar h-full">
                {[
                  { id: 'overview', label: 'Overview & Analytics', icon: TrendingUp, count: null },
                  { id: 'received', label: 'Received Forms', icon: FileCheck2, count: counts.received },
                  { id: 'under_hiring', label: 'Under Hiring', icon: CalendarCheck2, count: counts.under_hiring },
                  { id: 'hired', label: 'Hired Employees', icon: Award, count: counts.hired },
                  { id: 'unhired', label: 'Unhired Candidates', icon: UserX, count: counts.unhired },
                  { id: 'sent', label: 'Sent Forms', icon: Send, count: counts.sent },
                ].map((tab) => {
                  const isActive = activeTab === tab.id;
                  const Icon = tab.icon;

                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`h-full px-3.5 border-b-2 text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                        isActive
                          ? 'border-[#548235] text-[#548235] dark:text-[#76B84A] bg-[#548235]/5'
                          : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span>{tab.label}</span>
                      {tab.count !== null && (
                        <span
                          className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                            isActive
                              ? 'bg-[#548235] text-white'
                              : 'bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {tab.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Right: Settings Button on the right side in Light Gray */}
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer shrink-0 ${
                  activeTab === 'settings'
                    ? isDark
                      ? 'bg-white/15 border-white/30 text-white shadow-xs'
                      : 'bg-gray-200 border-gray-400 text-gray-900 shadow-xs'
                    : isDark
                    ? 'bg-white/5 border-white/15 text-gray-300 hover:bg-white/10 hover:text-white'
                    : 'bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                }`}
                title="Cockpit Settings"
              >
                <Settings className="w-3.5 h-3.5 text-gray-400" />
                <span>Settings</span>
              </button>
            </div>
          </div>

      {/* =========================================================================
          MAIN TAB CONTENT AREA
          ========================================================================= */}
      <main className="w-full px-4 sm:px-6 xl:px-[30px] pt-6">
        {/* =========================================================================
            TAB 1: OVERVIEW & ANALYTICS
            ========================================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Top Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
              {[
                { label: 'Total Inflow', val: counts.total, sub: 'All Candidate Profiles', icon: Users, color: 'text-blue-500' },
                { label: 'Received Forms', val: counts.received, sub: 'Needs Review', icon: FileCheck2, color: 'text-amber-500' },
                { label: 'Under Hiring', val: counts.under_hiring, sub: 'In Interview Rounds', icon: CalendarCheck2, color: 'text-purple-500' },
                { label: 'Hired Employees', val: counts.hired, sub: 'Onboarded Team', icon: Award, color: 'text-[#548235]' },
                { label: 'Not Selected', val: counts.unhired, sub: 'Archived Pipeline', icon: UserX, color: 'text-rose-500' },
                { label: 'Active Invites', val: counts.sent, sub: 'Pending Submission', icon: Send, color: 'text-cyan-500' },
              ].map((m, idx) => {
                const Icon = m.icon;
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border transition-all duration-300 ${
                      isDark ? 'bg-[#0E1420] border-white/10' : 'bg-white border-gray-200 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono font-bold text-gray-400 truncate">{m.label}</span>
                      <Icon className={`w-4 h-4 ${m.color}`} />
                    </div>
                    <div className="text-2xl font-extrabold tracking-tight">{m.val}</div>
                    <span className="text-[10px] text-gray-500 truncate block mt-0.5">{m.sub}</span>
                  </div>
                );
              })}
            </div>

            {/* Split Row: Upcoming Interviews & Quick Action Pipeline */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left: Upcoming Scheduled Interviews (7 Cols) */}
              <div className={`lg:col-span-7 p-6 rounded-2xl border ${
                isDark ? 'bg-[#0E1420] border-white/10' : 'bg-white border-gray-200 shadow-sm'
              }`}>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <CalendarCheck2 className="w-4 h-4 text-[#548235] dark:text-[#76B84A]" />
                    <h3 className="text-sm sm:text-base font-bold">Upcoming Scheduled Interviews</h3>
                  </div>
                  <button
                    onClick={() => setActiveTab('under_hiring')}
                    className="text-xs font-semibold text-[#548235] dark:text-[#76B84A] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {candidates
                    .filter((c) => c.status === 'INTERVIEW_SCHEDULED' && c.interviewSchedule)
                    .map((c) => (
                      <div
                        key={c.id}
                        className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                          isDark ? 'bg-black/40 border-white/10 hover:border-white/20' : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#548235]/15 text-[#548235] font-bold flex items-center justify-center shrink-0 text-sm">
                            {c.fullName.split(' ').map((n) => n[0]).join('')}
                          </div>
                          <div>
                            <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
                              {c.fullName}
                            </h4>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400">
                              {c.appliedPosition} • {c.department}
                            </p>
                            <div className="flex items-center gap-2 mt-1 text-[10.5px] font-mono text-gray-400">
                              <span className="flex items-center gap-1 text-[#548235] dark:text-[#76B84A] font-semibold">
                                <Calendar className="w-3 h-3" />
                                {c.interviewSchedule.scheduledDate} ({c.interviewSchedule.scheduledTime})
                              </span>
                              <span>•</span>
                              <span>{c.interviewSchedule.platform}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {c.interviewSchedule.meetingLink && (
                            <a
                              href={c.interviewSchedule.meetingLink}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-1.5 rounded-lg bg-[#4472C4] hover:bg-[#365ca5] text-white text-xs font-semibold transition-all flex items-center gap-1.5"
                            >
                              <Video className="w-3.5 h-3.5" />
                              <span>Join Call</span>
                            </a>
                          )}
                          <button
                            onClick={() => {
                              setSelectedCandidate(c);
                              setIsDetailOpen(true);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 text-xs font-semibold transition-colors cursor-pointer"
                          >
                            Dossier
                          </button>
                        </div>
                      </div>
                    ))}

                  {candidates.filter((c) => c.status === 'INTERVIEW_SCHEDULED').length === 0 && (
                    <div className="text-center py-8 text-gray-400 text-xs">
                      No interviews scheduled currently. Advance candidates from the Received Forms queue.
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Candidates Requiring Immediate Review (5 Cols) */}
              <div className={`lg:col-span-5 p-6 rounded-2xl border ${
                isDark ? 'bg-[#0E1420] border-white/10' : 'bg-white border-gray-200 shadow-sm'
              }`}>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <FileCheck2 className="w-4 h-4 text-amber-500" />
                    <h3 className="text-sm sm:text-base font-bold">Pending Review Queue</h3>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-500">
                    {counts.received} Pending
                  </span>
                </div>

                <div className="space-y-3">
                  {candidates
                    .filter((c) => c.status === 'UNDER_REVIEW')
                    .map((c) => (
                      <div
                        key={c.id}
                        className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
                          isDark ? 'bg-black/30 border-white/10' : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-gray-900 dark:text-white truncate">
                            {c.fullName}
                          </h4>
                          <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                            {c.appliedPosition}
                          </p>
                          <span className="text-[10px] font-mono text-gray-400 block mt-0.5">
                            ID: {c.id}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => {
                              setSelectedCandidate(c);
                              setIsDetailOpen(true);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-[#548235] hover:bg-[#44692a] text-white text-[11px] font-bold cursor-pointer"
                          >
                            Review
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: RECEIVED FORMS (LIST UI)
            ========================================================================= */}
        {activeTab === 'received' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">Received Candidate Applications</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Review submitted credentials, KYC documents, and technical proficiencies.
                </p>
              </div>
              <span className="text-xs font-mono text-gray-400 font-bold">
                Showing {filteredCandidates.filter((c) => c.status === 'UNDER_REVIEW' || c.status === 'CHANGES_REQUESTED').length} Candidates
              </span>
            </div>

            <div className={`rounded-2xl border overflow-hidden ${
              isDark ? 'bg-[#0E1420] border-white/10' : 'bg-white border-gray-200 shadow-sm'
            }`}>
              {/* List Header */}
              <div className={`hidden md:grid grid-cols-12 gap-4 px-6 py-3 text-[11px] font-mono font-bold uppercase tracking-wider border-b ${
                isDark ? 'bg-black/40 text-gray-400 border-white/10' : 'bg-gray-50 text-gray-500 border-gray-200'
              }`}>
                <div className="col-span-4">Candidate &amp; Contact</div>
                <div className="col-span-3">Position &amp; Department</div>
                <div className="col-span-2">KYC &amp; Submission</div>
                <div className="col-span-3 text-right">Actions</div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-gray-100 dark:divide-white/5">
                {filteredCandidates
                  .filter((c) => c.status === 'UNDER_REVIEW' || c.status === 'CHANGES_REQUESTED')
                  .map((c) => (
                    <div
                      key={c.id}
                      className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-6 py-4 items-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    >
                      {/* Candidate & Contact */}
                      <div className="md:col-span-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4472C4]/20 to-[#548235]/20 border border-white/15 text-[#4472C4] dark:text-[#72B347] font-bold flex items-center justify-center font-mono text-sm shrink-0">
                          {c.fullName.split(' ').map((n) => n[0]).join('').substring(0, 2)}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-sm text-gray-900 dark:text-white truncate">
                              {c.fullName}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-500 font-bold uppercase">
                              Under Review
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-0.5 font-mono flex-wrap">
                            <span className="text-gray-400">{c.id}</span>
                            <span>•</span>
                            <span className="truncate">{c.email}</span>
                            <span>•</span>
                            <span>{c.phone || c.personalInfo?.mobile}</span>
                          </div>
                        </div>
                      </div>

                      {/* Position & Department */}
                      <div className="md:col-span-3">
                        <span className="font-semibold text-xs text-gray-900 dark:text-white block">
                          {c.appliedPosition}
                        </span>
                        <span className="text-[11px] text-[#548235] dark:text-[#76B84A] font-medium block mt-0.5">
                          {c.department}
                        </span>
                        {c.personalInfo?.city && (
                          <span className="text-[11px] text-gray-400 block mt-0.5">
                            {c.personalInfo.city}, {c.personalInfo.state}
                          </span>
                        )}
                      </div>

                      {/* KYC & Submission */}
                      <div className="md:col-span-2">
                        <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-[#72B347]">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          <span className="font-semibold">KYC Verified</span>
                        </div>
                        <span className="text-[11px] text-gray-500 dark:text-gray-400 block mt-0.5 font-mono">
                          {c.applicationForm?.submissionDate
                            ? new Date(c.applicationForm.submissionDate).toLocaleDateString()
                            : 'Submitted'}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="md:col-span-3 flex items-center md:justify-end gap-2 mt-2 md:mt-0 flex-wrap">
                        <button
                          onClick={() => {
                            setSelectedCandidate(c);
                            setIsDetailOpen(true);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-xs font-semibold text-gray-800 dark:text-gray-200 transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Dossier</span>
                        </button>
                        <button
                          onClick={() => {
                            setScheduleCandidate(c);
                            setIsScheduleOpen(true);
                          }}
                          className="px-3.5 py-1.5 rounded-lg bg-[#548235] hover:bg-[#44692a] text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                        >
                          <CalendarCheck2 className="w-3.5 h-3.5" />
                          <span>Schedule</span>
                        </button>
                        <button
                          onClick={() => {
                            setRejectCandidate(c);
                            setIsRejectOpen(true);
                          }}
                          className="p-1.5 rounded-lg hover:bg-rose-500/15 text-rose-500 transition-colors cursor-pointer"
                          title="Reject Candidate"
                        >
                          <UserX className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}

                {filteredCandidates.filter((c) => c.status === 'UNDER_REVIEW' || c.status === 'CHANGES_REQUESTED').length === 0 && (
                  <div className="py-12 text-center text-gray-400">
                    <FileCheck2 className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="text-sm font-semibold">No applications pending review in this department.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: UNDER HIRING (INTERVIEWS & EVALUATIONS - LIST UI)
            ========================================================================= */}
        {activeTab === 'under_hiring' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">Interview &amp; Evaluation Pipeline</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Track candidates through technical interviews, scorecards, and hiring recommendations.
                </p>
              </div>
              <span className="text-xs font-mono text-gray-400 font-bold">
                Showing {filteredCandidates.filter((c) => c.status === 'INTERVIEW_SCHEDULED' || c.status === 'INTERVIEW_RESCHEDULED' || c.status === 'INTERVIEW_COMPLETED').length} Active Candidates
              </span>
            </div>

            <div className={`rounded-2xl border overflow-hidden ${
              isDark ? 'bg-[#0E1420] border-white/10' : 'bg-white border-gray-200 shadow-sm'
            }`}>
              {/* List Header */}
              <div className={`hidden md:grid grid-cols-12 gap-4 px-6 py-3 text-[11px] font-mono font-bold uppercase tracking-wider border-b ${
                isDark ? 'bg-black/40 text-gray-400 border-white/10' : 'bg-gray-50 text-gray-500 border-gray-200'
              }`}>
                <div className="col-span-3">Candidate &amp; ID</div>
                <div className="col-span-3">Position &amp; Department</div>
                <div className="col-span-3">Interview Round &amp; Schedule</div>
                <div className="col-span-3 text-right">Evaluation &amp; Actions</div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-gray-100 dark:divide-white/5">
                {filteredCandidates
                  .filter(
                    (c) =>
                      c.status === 'INTERVIEW_SCHEDULED' ||
                      c.status === 'INTERVIEW_RESCHEDULED' ||
                      c.status === 'INTERVIEW_COMPLETED'
                  )
                  .map((c) => (
                    <div
                      key={c.id}
                      className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-6 py-4 items-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    >
                      {/* Candidate & ID */}
                      <div className="md:col-span-3 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400 font-bold flex items-center justify-center font-mono text-sm shrink-0">
                          {c.fullName.split(' ').map((n) => n[0]).join('').substring(0, 2)}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-sm text-gray-900 dark:text-white truncate">
                              {c.fullName}
                            </span>
                            <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                              c.status === 'INTERVIEW_COMPLETED'
                                ? 'bg-purple-500/20 text-purple-400'
                                : 'bg-emerald-500/20 text-emerald-400'
                            }`}>
                              {c.status.replace(/_/g, ' ')}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-mono truncate">
                            {c.id} • {c.email}
                          </div>
                        </div>
                      </div>

                      {/* Position & Department */}
                      <div className="md:col-span-3">
                        <span className="font-semibold text-xs text-gray-900 dark:text-white block">
                          {c.appliedPosition}
                        </span>
                        <span className="text-[11px] text-[#548235] dark:text-[#76B84A] font-medium block mt-0.5">
                          {c.department}
                        </span>
                      </div>

                      {/* Interview Round & Schedule */}
                      <div className="md:col-span-3">
                        {c.interviewSchedule ? (
                          <div className="text-xs space-y-0.5">
                            <div className="font-semibold text-gray-800 dark:text-gray-200">
                              {c.interviewSchedule.roundName}
                            </div>
                            <div className="text-gray-500 dark:text-gray-400 flex items-center gap-1.5 text-[11px] font-mono">
                              <Clock className="w-3 h-3 text-[#548235]" />
                              <span>{c.interviewSchedule.scheduledDate} • {c.interviewSchedule.scheduledTime}</span>
                            </div>
                            <div className="text-gray-500 dark:text-gray-400 flex items-center gap-1.5 text-[11px]">
                              <Video className="w-3 h-3 text-[#4472C4]" />
                              <span>{c.interviewSchedule.platform} with {c.interviewSchedule.interviewerName}</span>
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400 italic">No interview scheduled</span>
                        )}

                        {c.evaluations && c.evaluations.length > 0 && (
                          <div className="mt-1.5 inline-flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/15 text-purple-400 border border-purple-500/20">
                            <Star className="w-3 h-3 fill-current text-amber-400" />
                            <span>{c.evaluations[0].overallRating} / 5</span>
                            <span>•</span>
                            <span>{c.evaluations[0].recommendation}</span>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="md:col-span-3 flex items-center md:justify-end gap-2 mt-2 md:mt-0 flex-wrap">
                        <button
                          onClick={() => {
                            setEvalCandidate(c);
                            setIsEvalOpen(true);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                        >
                          Evaluate
                        </button>
                        <button
                          onClick={() => {
                            setHireCandidate(c);
                            setHireForm({
                              joiningDate: new Date(Date.now() + 86400000 * 14).toISOString().split('T')[0],
                              offeredDesignation: c.appliedPosition,
                              offeredDepartment: c.department,
                              joiningInstructions: 'Reporting to Powai Engineering HQ at 9:30 AM with original KYC credentials.',
                            });
                            setIsHireOpen(true);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#548235] hover:bg-[#44692a] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                        >
                          Offer / Hire
                        </button>
                        <button
                          onClick={() => {
                            setSelectedCandidate(c);
                            setIsDetailOpen(true);
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-xs font-semibold text-gray-700 dark:text-gray-200 transition-all cursor-pointer"
                        >
                          Profile
                        </button>
                        <button
                          onClick={() => {
                            setRejectCandidate(c);
                            setIsRejectOpen(true);
                          }}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-rose-500 hover:bg-rose-500/10 cursor-pointer"
                          title="Reject Candidate"
                        >
                          <UserX className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}

                {filteredCandidates.filter((c) => c.status === 'INTERVIEW_SCHEDULED' || c.status === 'INTERVIEW_RESCHEDULED' || c.status === 'INTERVIEW_COMPLETED').length === 0 && (
                  <div className="py-12 text-center text-gray-400">
                    <CalendarCheck2 className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="text-sm font-semibold">No candidates currently in the interview pipeline.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 4: HIRED EMPLOYEES (LIST UI)
            ========================================================================= */}
        {activeTab === 'hired' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">Successfully Hired Team Members</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Candidates who accepted formal offers and are onboarded into Transvolt Mobility.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-[#548235] dark:text-[#76B84A]">
                {counts.hired} Onboarded Employees
              </span>
            </div>

            <div className={`rounded-2xl border overflow-hidden ${
              isDark ? 'bg-[#0E1420] border-white/10' : 'bg-white border-gray-200 shadow-sm'
            }`}>
              {/* List Header */}
              <div className={`hidden md:grid grid-cols-12 gap-4 px-6 py-3 text-[11px] font-mono font-bold uppercase tracking-wider border-b ${
                isDark ? 'bg-black/40 text-gray-400 border-white/10' : 'bg-gray-50 text-gray-500 border-gray-200'
              }`}>
                <div className="col-span-4">Employee &amp; ID</div>
                <div className="col-span-3">Offered Designation &amp; Department</div>
                <div className="col-span-3">Joining Date &amp; Approved By</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-gray-100 dark:divide-white/5">
                {filteredCandidates
                  .filter((c) => c.status === 'HIRED')
                  .map((c) => (
                    <div
                      key={c.id}
                      className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-6 py-4 items-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    >
                      {/* Employee & ID */}
                      <div className="md:col-span-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold flex items-center justify-center font-mono text-sm shrink-0">
                          {c.fullName.split(' ').map((n) => n[0]).join('').substring(0, 2)}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-sm text-gray-900 dark:text-white truncate">
                              {c.fullName}
                            </span>
                            <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                              Hired
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-mono truncate">
                            {c.id} • {c.email} • {c.phone || c.personalInfo?.mobile}
                          </div>
                        </div>
                      </div>

                      {/* Offered Designation & Department */}
                      <div className="md:col-span-3">
                        <span className="font-semibold text-xs text-gray-900 dark:text-white block">
                          {c.decision?.offeredDesignation || c.appliedPosition}
                        </span>
                        <span className="text-[11px] text-[#548235] dark:text-[#76B84A] font-medium block mt-0.5">
                          {c.decision?.offeredDepartment || c.department}
                        </span>
                      </div>

                      {/* Joining Date & Approved By */}
                      <div className="md:col-span-3">
                        <div className="flex items-center gap-1.5 text-xs text-gray-800 dark:text-gray-200 font-semibold font-mono">
                          <Calendar className="w-3.5 h-3.5 text-[#548235]" />
                          <span>Joining: {c.decision?.joiningDate || 'Immediate'}</span>
                        </div>
                        <span className="text-[11px] text-gray-400 block mt-0.5">
                          Approved by {c.decision?.decidedBy || settings.hrContactPerson}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="md:col-span-2 flex items-center md:justify-end gap-2 mt-2 md:mt-0">
                        <button
                          onClick={() => {
                            setSelectedCandidate(c);
                            setIsDetailOpen(true);
                          }}
                          className="px-3.5 py-1.5 rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-xs font-semibold text-gray-800 dark:text-gray-200 transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>View Dossier</span>
                        </button>
                      </div>
                    </div>
                  ))}

                {filteredCandidates.filter((c) => c.status === 'HIRED').length === 0 && (
                  <div className="py-12 text-center text-gray-400">
                    <Award className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="text-sm font-semibold">No onboarded employees matching current filter.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 5: UNHIRED CANDIDATES (LIST UI)
            ========================================================================= */}
        {activeTab === 'unhired' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">Archived / Unhired Candidates</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Applicants not selected for current concession and fleet openings.
                </p>
              </div>
              <span className="text-xs font-mono text-gray-400 font-bold">
                Showing {filteredCandidates.filter((c) => c.status === 'NOT_SELECTED').length} Archived Profiles
              </span>
            </div>

            <div className={`rounded-2xl border overflow-hidden ${
              isDark ? 'bg-[#0E1420] border-white/10' : 'bg-white border-gray-200 shadow-sm'
            }`}>
              {/* List Header */}
              <div className={`hidden md:grid grid-cols-12 gap-4 px-6 py-3 text-[11px] font-mono font-bold uppercase tracking-wider border-b ${
                isDark ? 'bg-black/40 text-gray-400 border-white/10' : 'bg-gray-50 text-gray-500 border-gray-200'
              }`}>
                <div className="col-span-4">Candidate &amp; ID</div>
                <div className="col-span-3">Applied Position &amp; Department</div>
                <div className="col-span-3">Archived Reason</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-gray-100 dark:divide-white/5">
                {filteredCandidates
                  .filter((c) => c.status === 'NOT_SELECTED')
                  .map((c) => (
                    <div
                      key={c.id}
                      className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-6 py-4 items-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    >
                      {/* Candidate & ID */}
                      <div className="md:col-span-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 font-bold flex items-center justify-center font-mono text-sm shrink-0">
                          {c.fullName.split(' ').map((n) => n[0]).join('').substring(0, 2)}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-sm text-gray-900 dark:text-white truncate">
                              {c.fullName}
                            </span>
                            <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400">
                              Archived
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-mono truncate">
                            {c.id} • {c.email}
                          </div>
                        </div>
                      </div>

                      {/* Applied Position & Department */}
                      <div className="md:col-span-3">
                        <span className="font-semibold text-xs text-gray-900 dark:text-white block">
                          {c.appliedPosition}
                        </span>
                        <span className="text-[11px] text-gray-400 block mt-0.5">
                          {c.department}
                        </span>
                      </div>

                      {/* Archived Reason */}
                      <div className="md:col-span-3">
                        <span className="text-xs text-gray-400 dark:text-gray-300 line-clamp-2">
                          {c.decision?.rejectionReason || 'Requirements profile did not align with current fleet requirements.'}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="md:col-span-2 flex items-center md:justify-end gap-2 mt-2 md:mt-0">
                        <button
                          onClick={() => {
                            setSelectedCandidate(c);
                            setIsDetailOpen(true);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-xs font-semibold text-gray-800 dark:text-gray-200 transition-all cursor-pointer"
                        >
                          Archive
                        </button>
                        <button
                          onClick={() => {
                            setCandidates((prev) =>
                              prev.map((cand) =>
                                cand.id === c.id ? { ...cand, status: 'UNDER_REVIEW' } : cand
                              )
                            );
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#548235]/15 hover:bg-[#548235]/30 text-[#548235] dark:text-[#76B84A] text-xs font-semibold transition-all cursor-pointer border border-[#548235]/30"
                        >
                          Re-open
                        </button>
                      </div>
                    </div>
                  ))}

                {filteredCandidates.filter((c) => c.status === 'NOT_SELECTED').length === 0 && (
                  <div className="py-12 text-center text-gray-400">
                    <UserX className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="text-sm font-semibold">No archived candidates found.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 6: SENT FORMS (ACTIVE INVITATIONS TRACKING - LIST UI)
            ========================================================================= */}
        {activeTab === 'sent' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">Sent Application Form Invitations</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Track delivered email links, candidate submission deadlines, and secure access tokens.
                </p>
              </div>

              <button
                onClick={() => setIsInviteOpen(true)}
                className="px-3.5 py-1.5 rounded-lg bg-[#548235] hover:bg-[#44692a] text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Invite New Candidate</span>
              </button>
            </div>

            <div className={`rounded-2xl border overflow-hidden ${
              isDark ? 'bg-[#0E1420] border-white/10' : 'bg-white border-gray-200 shadow-sm'
            }`}>
              {/* List Header */}
              <div className={`hidden md:grid grid-cols-12 gap-4 px-6 py-3 text-[11px] font-mono font-bold uppercase tracking-wider border-b ${
                isDark ? 'bg-black/40 text-gray-400 border-white/10' : 'bg-gray-50 text-gray-500 border-gray-200'
              }`}>
                <div className="col-span-4">Candidate &amp; Invitation Token</div>
                <div className="col-span-3">Position &amp; Department</div>
                <div className="col-span-3">Issue Date &amp; Delivery Status</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-gray-100 dark:divide-white/5">
                {filteredCandidates
                  .filter((c) => c.status === 'APPLICATION_PENDING' || c.invitation)
                  .map((c) => (
                    <div
                      key={c.id}
                      className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-6 py-4 items-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    >
                      {/* Candidate & Token */}
                      <div className="md:col-span-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 font-bold flex items-center justify-center font-mono text-sm shrink-0">
                          {c.fullName.split(' ').map((n) => n[0]).join('').substring(0, 2)}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-sm text-gray-900 dark:text-white truncate">
                              {c.fullName}
                            </span>
                            <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400">
                              {c.invitation?.emailStatus || 'DELIVERED'}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-mono truncate">
                            Token: <span className="text-gray-700 dark:text-gray-300 font-bold">{c.token}</span>
                          </div>
                        </div>
                      </div>

                      {/* Position & Department */}
                      <div className="md:col-span-3">
                        <span className="font-semibold text-xs text-gray-900 dark:text-white block">
                          {c.appliedPosition}
                        </span>
                        <span className="text-[11px] text-[#548235] dark:text-[#76B84A] font-medium block mt-0.5">
                          {c.department}
                        </span>
                      </div>

                      {/* Issue Date & Delivery */}
                      <div className="md:col-span-3">
                        <span className="text-xs text-gray-800 dark:text-gray-200 block font-mono">
                          {new Date(c.invitation?.sentAt || c.createdAt).toLocaleDateString()}
                        </span>
                        <span className="text-[11px] text-gray-400 block mt-0.5">
                          Issued by {c.invitation?.sentBy || settings.hrContactPerson}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="md:col-span-2 flex items-center md:justify-end gap-2 mt-2 md:mt-0">
                        <button
                          onClick={() => handleCopyToken(c.token)}
                          className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-gray-300 dark:border-white/15 text-xs font-semibold text-gray-800 dark:text-gray-200 transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          {copiedToken === c.token ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-500" />
                              <span className="text-emerald-500 font-bold">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-gray-400" />
                              <span>Copy Link</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}

                {filteredCandidates.filter((c) => c.status === 'APPLICATION_PENDING' || c.invitation).length === 0 && (
                  <div className="py-12 text-center text-gray-400">
                    <Send className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="text-sm font-semibold">No active invitations found.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 7: RECRUITMENT SETTINGS (Wiped out & replaced with 3 tiles)
            ========================================================================= */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-6xl pb-10">
            {/* Header / Intro */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-200 dark:border-white/10">
              <div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight">Cockpit Configuration &amp; Portals</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Manage job publishing, candidate application forms, and authorized HR staff credentials.
                </p>
              </div>
              <span className="self-start sm:self-auto text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-[#548235]/15 text-[#548235] dark:text-[#76B84A] border border-[#548235]/30">
                SSO Cockpit v2.4
              </span>
            </div>

            {settingsSuccessMessage && (
              <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-between animate-fadeIn">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  {settingsSuccessMessage}
                </span>
                <button onClick={() => setSettingsSuccessMessage('')} className="text-gray-400 hover:text-white cursor-pointer">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* 3 TILES GRID WITH EXPO GLASS EFFECT */}
            <div className="relative">
              {/* Ambient Backlight Emitters for Authentic Frosted Glass Refraction */}
              <div className="pointer-events-none absolute -top-8 -left-6 w-72 h-72 bg-[#548235]/25 rounded-full blur-[100px] -z-0" />
              <div className="pointer-events-none absolute top-1/3 left-1/3 w-80 h-80 bg-[#4472C4]/20 rounded-full blur-[110px] -z-0" />
              <div className="pointer-events-none absolute -bottom-8 -right-6 w-72 h-72 bg-amber-500/20 rounded-full blur-[100px] -z-0" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                {/* Tile 1: Post apportunity (Expo Glass Effect) */}
                <div
                  onClick={() => setIsPostJobOpen(true)}
                  className={`expo-glass-tile ${
                    isDark ? 'expo-glass-dark' : 'expo-glass-light'
                  } group p-6 sm:p-7 flex flex-col justify-between cursor-pointer select-none`}
                >
                  {/* Top Edge Specular Glare & Diagonal Refraction */}
                  <div className="expo-glass-glare" />
                  <div className="expo-glass-sheen" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#548235]/25 via-[#548235]/10 to-transparent dark:from-[#548235]/35 dark:via-white/10 dark:to-[#548235]/20 backdrop-blur-md border border-[#548235]/40 dark:border-[#548235]/50 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Briefcase className="w-6 h-6 text-[#548235] dark:text-[#76B84A]" />
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-[#548235]/40 dark:border-[#548235]/50 bg-[#548235]/15 dark:bg-[#548235]/25 text-[#426829] dark:text-[#76B84A]">
                        Careers Portal
                      </span>
                    </div>

                    <div className="flex items-baseline gap-2 mb-1.5">
                      <span className="text-2xl font-black text-[#548235] dark:text-[#76B84A] tracking-tight">
                        {settings.positions.length}+
                      </span>
                      <h3 className="text-lg sm:text-xl font-black tracking-tight text-gray-900 dark:text-white">
                        Post apportunity
                      </h3>
                    </div>

                    <p className="text-xs text-gray-600 dark:text-gray-300 font-medium leading-relaxed mb-5">
                      Broadcast new commercial EV openings across Transvolt Careers, LinkedIn, and commercial fleet partner channels.
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg border border-gray-200/90 dark:border-white/15 bg-white/80 dark:bg-white/5 text-gray-700 dark:text-gray-200 font-semibold shadow-xs">
                        {settings.positions.length} Active Positions
                      </span>
                      <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg border border-gray-200/90 dark:border-white/15 bg-white/80 dark:bg-white/5 text-gray-700 dark:text-gray-200 font-semibold shadow-xs">
                        4 Depts
                      </span>
                    </div>
                  </div>

                  <div className="relative z-10 pt-2">
                    <button
                      type="button"
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#548235] to-[#456c2b] hover:from-[#5d8f3b] hover:to-[#4e7931] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-[#548235]/40 cursor-pointer border border-white/20 expo-glass-button"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Post Opportunity</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Tile 2: Hiring Form (Expo Glass Effect) */}
                <div
                  onClick={() => setIsHiringFormOpen(true)}
                  className={`expo-glass-tile ${
                    isDark ? 'expo-glass-dark' : 'expo-glass-light'
                  } group p-6 sm:p-7 flex flex-col justify-between cursor-pointer select-none`}
                >
                  {/* Top Edge Specular Glare & Diagonal Refraction */}
                  <div className="expo-glass-glare" />
                  <div className="expo-glass-sheen" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#4472C4]/25 via-[#4472C4]/10 to-transparent dark:from-[#4472C4]/35 dark:via-white/10 dark:to-[#4472C4]/20 backdrop-blur-md border border-[#4472C4]/40 dark:border-[#4472C4]/50 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <FileText className="w-6 h-6 text-[#2563EB] dark:text-[#6893db]" />
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-[#4472C4]/40 dark:border-[#4472C4]/50 bg-[#4472C4]/15 dark:bg-[#4472C4]/25 text-[#1e40af] dark:text-[#6893db]">
                        Application Schema
                      </span>
                    </div>

                    <div className="flex items-baseline gap-2 mb-1.5">
                      <span className="text-2xl font-black text-[#2563EB] dark:text-[#6893db] tracking-tight">
                        v2.4
                      </span>
                      <h3 className="text-lg sm:text-xl font-black tracking-tight text-gray-900 dark:text-white">
                        Hiring Form
                      </h3>
                    </div>

                    <p className="text-xs text-gray-600 dark:text-gray-300 font-medium leading-relaxed mb-5">
                      Configure candidate questionnaire templates, required KYC documents, driving certifications, and CTC breakdown steps.
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg border border-gray-200/90 dark:border-white/15 bg-white/80 dark:bg-white/5 text-gray-700 dark:text-gray-200 font-semibold shadow-xs">
                        6 KYC Fields
                      </span>
                      <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg border border-gray-200/90 dark:border-white/15 bg-white/80 dark:bg-white/5 text-gray-700 dark:text-gray-200 font-semibold shadow-xs">
                        EV Telemetry QA
                      </span>
                    </div>
                  </div>

                  <div className="relative z-10 pt-2">
                    <button
                      type="button"
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#4472C4] to-[#365ca3] hover:from-[#5181d6] hover:to-[#3e68b5] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-[#4472C4]/40 cursor-pointer border border-white/20 expo-glass-button"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Configure Form</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Tile 3: Add User on HR Pannel (Expo Glass Effect) */}
                <div
                  onClick={() => setIsAddUserOpen(true)}
                  className={`expo-glass-tile ${
                    isDark ? 'expo-glass-dark' : 'expo-glass-light'
                  } group p-6 sm:p-7 flex flex-col justify-between cursor-pointer select-none`}
                >
                  {/* Top Edge Specular Glare & Diagonal Refraction */}
                  <div className="expo-glass-glare" />
                  <div className="expo-glass-sheen" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-amber-500/25 via-amber-500/10 to-transparent dark:from-amber-500/35 dark:via-white/10 dark:to-amber-500/20 backdrop-blur-md border border-amber-500/40 dark:border-amber-500/50 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <UserPlus className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-amber-500/40 dark:border-amber-500/50 bg-amber-500/15 dark:bg-amber-500/25 text-amber-800 dark:text-amber-300">
                        Staff RBAC
                      </span>
                    </div>

                    <div className="flex items-baseline gap-2 mb-1.5">
                      <span className="text-2xl font-black text-amber-600 dark:text-amber-400 tracking-tight">
                        {hrUsers.length}
                      </span>
                      <h3 className="text-lg sm:text-xl font-black tracking-tight text-gray-900 dark:text-white">
                        Add User on HR Pannel
                      </h3>
                    </div>

                    <p className="text-xs text-gray-600 dark:text-gray-300 font-medium leading-relaxed mb-5">
                      Authorize recruiters, technical interviewers, and team leaders with role-based access credentials to this cockpit.
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg border border-gray-200/90 dark:border-white/15 bg-white/80 dark:bg-white/5 text-gray-700 dark:text-gray-200 font-semibold shadow-xs">
                        {hrUsers.length} Active Staff
                      </span>
                      <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg border border-gray-200/90 dark:border-white/15 bg-white/80 dark:bg-white/5 text-gray-700 dark:text-gray-200 font-semibold shadow-xs">
                        SSO Protected
                      </span>
                    </div>
                  </div>

                  <div className="relative z-10 pt-2">
                    <button
                      type="button"
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-amber-500/40 cursor-pointer border border-white/20 expo-glass-button"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Add HR User</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* =========================================================================
          MODAL 1: SEND INVITATION FORM MODAL
          ========================================================================= */}
      {isInviteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className={`w-full max-w-lg rounded-3xl p-6 sm:p-7 border shadow-2xl relative ${
            isDark ? 'bg-[#0E1420] border-white/15' : 'bg-white border-gray-200'
          }`}>
            <button
              onClick={() => setIsInviteOpen(false)}
              className="absolute right-5 top-5 p-1 rounded-full text-gray-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-8 rounded-lg bg-[#548235]/20 text-[#548235] flex items-center justify-center">
                <Send className="w-4 h-4" />
              </span>
              <h3 className="text-lg font-bold">Issue Candidate Application Form</h3>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-5">
              Generates a secure application token and dispatches an invitation link to the candidate.
            </p>

            <form onSubmit={handleCreateInvitation} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-400 block mb-1">Candidate Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Nair"
                  value={inviteForm.fullName}
                  onChange={(e) => setInviteForm({ ...inviteForm, fullName: e.target.value })}
                  className={`w-full p-2.5 rounded-xl text-xs font-medium border ${
                    isDark ? 'bg-black/50 border-white/15 text-white' : 'bg-gray-50 border-gray-300'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-400 block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. priya.nair@example.com"
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                  className={`w-full p-2.5 rounded-xl text-xs font-medium border ${
                    isDark ? 'bg-black/50 border-white/15 text-white' : 'bg-gray-50 border-gray-300'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-400 block mb-1">Target Position</label>
                  <select
                    value={inviteForm.appliedPosition}
                    onChange={(e) => setInviteForm({ ...inviteForm, appliedPosition: e.target.value })}
                    className={`w-full p-2.5 rounded-xl text-xs font-medium border ${
                      isDark ? 'bg-black/50 border-white/15 text-white' : 'bg-gray-50 border-gray-300'
                    }`}
                  >
                    {settings.positions.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-400 block mb-1">Department</label>
                  <select
                    value={inviteForm.department}
                    onChange={(e) => setInviteForm({ ...inviteForm, department: e.target.value })}
                    className={`w-full p-2.5 rounded-xl text-xs font-medium border ${
                      isDark ? 'bg-black/50 border-white/15 text-white' : 'bg-gray-50 border-gray-300'
                    }`}
                  >
                    {settings.departments.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-400 block mb-1">Custom Message / Role Brief</label>
                <textarea
                  rows={3}
                  placeholder="Welcome to Transvolt Mobility! Please complete your credential profile..."
                  value={inviteForm.customMessage}
                  onChange={(e) => setInviteForm({ ...inviteForm, customMessage: e.target.value })}
                  className={`w-full p-2.5 rounded-xl text-xs font-medium border ${
                    isDark ? 'bg-black/50 border-white/15 text-white' : 'bg-gray-50 border-gray-300'
                  }`}
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setIsInviteOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#548235] hover:bg-[#44692a] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  Dispatch Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: CANDIDATE DETAIL DOSSIER MODAL
          ========================================================================= */}
      {isDetailOpen && selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className={`w-full max-w-3xl rounded-3xl p-6 sm:p-8 border shadow-2xl relative max-h-[90vh] overflow-y-auto no-scrollbar ${
            isDark ? 'bg-[#0E1420] border-white/15' : 'bg-white border-gray-200'
          }`}>
            <button
              onClick={() => setIsDetailOpen(false)}
              className="absolute right-5 top-5 p-1 rounded-full text-gray-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Profile */}
            <div className="flex items-center gap-4 pb-5 border-b border-gray-100 dark:border-white/10">
              <div className="w-14 h-14 rounded-2xl bg-[#548235]/15 text-[#548235] font-extrabold flex items-center justify-center text-xl shrink-0">
                {selectedCandidate.fullName.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold">{selectedCandidate.fullName}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#548235]/20 text-[#76B84A] font-bold uppercase">
                    {selectedCandidate.status.replace(/_/g, ' ')}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  {selectedCandidate.appliedPosition} • {selectedCandidate.department} • Ref: {selectedCandidate.id}
                </p>
              </div>
            </div>

            {/* Dossier Tabs */}
            <div className="flex items-center gap-2 border-b border-gray-100 dark:border-white/10 py-2.5 overflow-x-auto no-scrollbar text-xs font-bold">
              {[
                { id: 'personal', label: 'Personal & KYC' },
                { id: 'education', label: 'Education' },
                { id: 'experience', label: 'Experience' },
                { id: 'timeline', label: 'Hiring History' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setDetailTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    detailTab === tab.id
                      ? 'bg-[#548235] text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Body */}
            <div className="py-4 text-xs space-y-4">
              {detailTab === 'personal' && (
                <div className="grid grid-cols-2 gap-3.5">
                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-black/30 border border-gray-100 dark:border-white/10">
                    <span className="text-gray-400 block text-[10.5px]">Email Address</span>
                    <span className="font-semibold text-gray-200 mt-0.5 block">{selectedCandidate.email}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-black/30 border border-gray-100 dark:border-white/10">
                    <span className="text-gray-400 block text-[10.5px]">Phone Number</span>
                    <span className="font-semibold text-gray-200 mt-0.5 block">{selectedCandidate.phone || selectedCandidate.personalInfo?.mobile}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-black/30 border border-gray-100 dark:border-white/10">
                    <span className="text-gray-400 block text-[10.5px]">Location</span>
                    <span className="font-semibold text-gray-200 mt-0.5 block">
                      {selectedCandidate.personalInfo?.city || 'Mumbai'}, {selectedCandidate.personalInfo?.state || 'Maharashtra'}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-black/30 border border-gray-100 dark:border-white/10">
                    <span className="text-gray-400 block text-[10.5px]">Application Token</span>
                    <span className="font-mono font-bold text-[#76B84A] mt-0.5 block">{selectedCandidate.token}</span>
                  </div>
                </div>
              )}

              {detailTab === 'education' && (
                <div className="space-y-2.5">
                  {selectedCandidate.education && selectedCandidate.education.length > 0 ? (
                    selectedCandidate.education.map((edu, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-gray-50 dark:bg-black/30 border border-gray-100 dark:border-white/10">
                        <div className="font-bold text-gray-200">{edu.degree}</div>
                        <div className="text-gray-400 mt-0.5">{edu.institution} • {edu.passingYear}</div>
                        <div className="text-[#548235] dark:text-[#76B84A] font-semibold mt-1">Specialization: {edu.specialization}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-400 py-4 text-center">B.Tech / M.Tech in Electrical / Automotive Engineering (Standard Qualification)</div>
                  )}
                </div>
              )}

              {detailTab === 'experience' && (
                <div className="space-y-2.5">
                  {selectedCandidate.experience?.records ? (
                    selectedCandidate.experience.records.map((exp, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-gray-50 dark:bg-black/30 border border-gray-100 dark:border-white/10">
                        <div className="font-bold text-gray-200">{exp.designation} at {exp.company}</div>
                        <div className="text-gray-400 mt-0.5">{exp.duration}</div>
                        <div className="text-gray-300 mt-1">{exp.responsibilities}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-400 py-4 text-center">5+ Years demonstrated experience in commercial vehicle engineering &amp; fleet operations.</div>
                  )}
                </div>
              )}

              {detailTab === 'timeline' && (
                <div className="space-y-3">
                  {(selectedCandidate.timeline || []).map((log, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-black/30 border border-gray-100 dark:border-white/10">
                      <CheckCircle2 className="w-4 h-4 text-[#548235] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-gray-200">{log.description}</div>
                        <div className="text-[10px] text-gray-500 mt-0.5">
                          {new Date(log.timestamp).toLocaleString()} • {log.actor}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions Footer */}
            <div className="pt-4 border-t border-gray-100 dark:border-white/10 flex items-center justify-end gap-2.5">
              <button
                onClick={() => {
                  setScheduleCandidate(selectedCandidate);
                  setIsScheduleOpen(true);
                  setIsDetailOpen(false);
                }}
                className="px-4 py-2 rounded-xl bg-[#548235] hover:bg-[#44692a] text-white text-xs font-bold cursor-pointer"
              >
                Schedule Interview
              </button>

              <button
                onClick={() => setIsDetailOpen(false)}
                className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-white/10 text-xs font-semibold text-gray-300 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 3: SCHEDULE INTERVIEW MODAL
          ========================================================================= */}
      {isScheduleOpen && scheduleCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className={`w-full max-w-lg rounded-3xl p-6 sm:p-7 border shadow-2xl relative ${
            isDark ? 'bg-[#0E1420] border-white/15' : 'bg-white border-gray-200'
          }`}>
            <button
              onClick={() => setIsScheduleOpen(false)}
              className="absolute right-5 top-5 p-1 rounded-full text-gray-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <CalendarCheck2 className="w-4 h-4" />
              </span>
              <h3 className="text-lg font-bold">Schedule Interview</h3>
            </div>
            <p className="text-xs text-gray-400 mb-5">
              Locking calendar slot for <strong>{scheduleCandidate.fullName}</strong> ({scheduleCandidate.appliedPosition}).
            </p>

            <form onSubmit={handleConfirmSchedule} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-gray-400 block mb-1">Round / Topic</label>
                <input
                  type="text"
                  required
                  value={scheduleForm.roundName}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, roundName: e.target.value })}
                  className={`w-full p-2.5 rounded-xl border ${
                    isDark ? 'bg-black/50 border-white/15 text-white' : 'bg-gray-50 border-gray-300'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-gray-400 block mb-1">Interview Date</label>
                  <input
                    type="date"
                    required
                    value={scheduleForm.scheduledDate}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, scheduledDate: e.target.value })}
                    className={`w-full p-2.5 rounded-xl border ${
                      isDark ? 'bg-black/50 border-white/15 text-white' : 'bg-gray-50 border-gray-300'
                    }`}
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-400 block mb-1">Time Slot</label>
                  <input
                    type="text"
                    required
                    value={scheduleForm.scheduledTime}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, scheduledTime: e.target.value })}
                    className={`w-full p-2.5 rounded-xl border ${
                      isDark ? 'bg-black/50 border-white/15 text-white' : 'bg-gray-50 border-gray-300'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-gray-400 block mb-1">Platform</label>
                  <select
                    value={scheduleForm.platform}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, platform: e.target.value })}
                    className={`w-full p-2.5 rounded-xl border ${
                      isDark ? 'bg-black/50 border-white/15 text-white' : 'bg-gray-50 border-gray-300'
                    }`}
                  >
                    {settings.interviewPlatforms.map((plat) => (
                      <option key={plat} value={plat}>{plat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-gray-400 block mb-1">Interviewer Name</label>
                  <input
                    type="text"
                    required
                    value={scheduleForm.interviewerName}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, interviewerName: e.target.value })}
                    className={`w-full p-2.5 rounded-xl border ${
                      isDark ? 'bg-black/50 border-white/15 text-white' : 'bg-gray-50 border-gray-300'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-gray-400 block mb-1">Video Meeting URL</label>
                <input
                  type="url"
                  value={scheduleForm.meetingLink}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, meetingLink: e.target.value })}
                  className={`w-full p-2.5 rounded-xl border ${
                    isDark ? 'bg-black/50 border-white/15 text-white' : 'bg-gray-50 border-gray-300'
                  }`}
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setIsScheduleOpen(false)}
                  className="px-4 py-2 rounded-xl text-gray-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#548235] hover:bg-[#44692a] text-white font-bold transition-all shadow-md cursor-pointer"
                >
                  Confirm Calendar Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 4: INTERVIEW EVALUATION SCORECARD MODAL
          ========================================================================= */}
      {isEvalOpen && evalCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className={`w-full max-w-lg rounded-3xl p-6 sm:p-7 border shadow-2xl relative ${
            isDark ? 'bg-[#0E1420] border-white/15' : 'bg-white border-gray-200'
          }`}>
            <button
              onClick={() => setIsEvalOpen(false)}
              className="absolute right-5 top-5 p-1 rounded-full text-gray-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <Star className="w-4 h-4" />
              </span>
              <h3 className="text-lg font-bold">Interview Evaluation Scorecard</h3>
            </div>
            <p className="text-xs text-gray-400 mb-5">
              Evaluating <strong>{evalCandidate.fullName}</strong> ({evalCandidate.appliedPosition}).
            </p>

            <form onSubmit={handleConfirmEval} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-gray-400 block mb-1">Technical Rating (1-5)</label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={evalForm.technicalRating}
                    onChange={(e) => setEvalForm({ ...evalForm, technicalRating: Number(e.target.value) })}
                    className={`w-full p-2.5 rounded-xl border ${
                      isDark ? 'bg-black/50 border-white/15 text-white' : 'bg-gray-50 border-gray-300'
                    }`}
                  />
                </div>
                <div>
                  <label className="font-semibold text-gray-400 block mb-1">Overall Rating (1-5)</label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={evalForm.overallRating}
                    onChange={(e) => setEvalForm({ ...evalForm, overallRating: Number(e.target.value) })}
                    className={`w-full p-2.5 rounded-xl border ${
                      isDark ? 'bg-black/50 border-white/15 text-white' : 'bg-gray-50 border-gray-300'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-gray-400 block mb-1">Key Strengths &amp; Proficiencies</label>
                <textarea
                  rows={2}
                  value={evalForm.strengths}
                  onChange={(e) => setEvalForm({ ...evalForm, strengths: e.target.value })}
                  className={`w-full p-2.5 rounded-xl border ${
                    isDark ? 'bg-black/50 border-white/15 text-white' : 'bg-gray-50 border-gray-300'
                  }`}
                />
              </div>

              <div>
                <label className="font-semibold text-gray-400 block mb-1">Hiring Recommendation</label>
                <select
                  value={evalForm.recommendation}
                  onChange={(e) => setEvalForm({ ...evalForm, recommendation: e.target.value })}
                  className={`w-full p-2.5 rounded-xl border font-bold text-[#76B84A] ${
                    isDark ? 'bg-black/50 border-white/15' : 'bg-gray-50 border-gray-300'
                  }`}
                >
                  <option value="HIRE">RECOMMEND HIRE (Advance to Offer)</option>
                  <option value="NEXT_ROUND">SCHEDULE NEXT TECHNICAL ROUND</option>
                  <option value="HOLD">PUT ON HOLD</option>
                  <option value="REJECT">DO NOT HIRE</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setIsEvalOpen(false)}
                  className="px-4 py-2 rounded-xl text-gray-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold transition-all shadow-md cursor-pointer"
                >
                  Submit Scorecard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 5: HIRE CANDIDATE MODAL
          ========================================================================= */}
      {isHireOpen && hireCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className={`w-full max-w-lg rounded-3xl p-6 sm:p-7 border shadow-2xl relative ${
            isDark ? 'bg-[#0E1420] border-white/15' : 'bg-white border-gray-200'
          }`}>
            <button
              onClick={() => setIsHireOpen(false)}
              className="absolute right-5 top-5 p-1 rounded-full text-gray-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </span>
              <h3 className="text-lg font-bold">Issue Formal Offer Letter</h3>
            </div>
            <p className="text-xs text-gray-400 mb-5">
              Confirming hiring approval for <strong>{hireCandidate.fullName}</strong>.
            </p>

            <form onSubmit={handleConfirmHire} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-gray-400 block mb-1">Offered Role</label>
                  <input
                    type="text"
                    required
                    value={hireForm.offeredDesignation}
                    onChange={(e) => setHireForm({ ...hireForm, offeredDesignation: e.target.value })}
                    className={`w-full p-2.5 rounded-xl border ${
                      isDark ? 'bg-black/50 border-white/15 text-white' : 'bg-gray-50 border-gray-300'
                    }`}
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-400 block mb-1">Joining Date</label>
                  <input
                    type="date"
                    required
                    value={hireForm.joiningDate}
                    onChange={(e) => setHireForm({ ...hireForm, joiningDate: e.target.value })}
                    className={`w-full p-2.5 rounded-xl border ${
                      isDark ? 'bg-black/50 border-white/15 text-white' : 'bg-gray-50 border-gray-300'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-gray-400 block mb-1">Onboarding Instructions</label>
                <textarea
                  rows={3}
                  value={hireForm.joiningInstructions}
                  onChange={(e) => setHireForm({ ...hireForm, joiningInstructions: e.target.value })}
                  className={`w-full p-2.5 rounded-xl border ${
                    isDark ? 'bg-black/50 border-white/15 text-white' : 'bg-gray-50 border-gray-300'
                  }`}
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setIsHireOpen(false)}
                  className="px-4 py-2 rounded-xl text-gray-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#548235] hover:bg-[#44692a] text-white font-bold transition-all shadow-md cursor-pointer"
                >
                  Confirm &amp; Onboard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 6: REJECT CANDIDATE MODAL
          ========================================================================= */}
      {isRejectOpen && rejectCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className={`w-full max-w-md rounded-3xl p-6 sm:p-7 border shadow-2xl relative ${
            isDark ? 'bg-[#0E1420] border-white/15' : 'bg-white border-gray-200'
          }`}>
            <button
              onClick={() => setIsRejectOpen(false)}
              className="absolute right-5 top-5 p-1 rounded-full text-gray-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
                <UserX className="w-4 h-4" />
              </span>
              <h3 className="text-lg font-bold">Close Candidate Application</h3>
            </div>
            <p className="text-xs text-gray-400 mb-4">
              Archive <strong>{rejectCandidate.fullName}</strong> from active hiring consideration.
            </p>

            <form onSubmit={handleConfirmReject} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-gray-400 block mb-1">Reason for Rejection</label>
                <textarea
                  rows={3}
                  required
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border ${
                    isDark ? 'bg-black/50 border-white/15 text-white' : 'bg-gray-50 border-gray-300'
                  }`}
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setIsRejectOpen(false)}
                  className="px-4 py-2 rounded-xl text-gray-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold transition-all shadow-md cursor-pointer"
                >
                  Archive Candidate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 7: POST OPPORTUNITY MODAL
          ========================================================================= */}
      {isPostJobOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className={`w-full max-w-xl rounded-3xl p-6 sm:p-7 border shadow-2xl relative max-h-[90vh] overflow-y-auto no-scrollbar ${
            isDark ? 'bg-[#0E1420] border-white/15 text-white' : 'bg-white border-gray-200 text-gray-900'
          }`}>
            <button
              onClick={() => setIsPostJobOpen(false)}
              className="absolute right-5 top-5 p-1 rounded-full text-gray-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-2">
              <span className="w-10 h-10 rounded-xl bg-[#548235]/20 text-[#548235] dark:text-[#76B84A] flex items-center justify-center border border-[#548235]/30">
                <Briefcase className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold">Post New Opportunity</h3>
                <p className="text-xs text-gray-400">Publish open positions to Transvolt Careers &amp; public EV job boards</p>
              </div>
            </div>

            <form onSubmit={handleCreateJob} className="space-y-4 mt-5 text-xs">
              <div>
                <label className="font-semibold text-gray-400 block mb-1">Job Designation / Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lead BMS Thermal Architect"
                  value={jobPostForm.title}
                  onChange={(e) => setJobPostForm({ ...jobPostForm, title: e.target.value })}
                  className={`w-full p-2.5 rounded-xl border ${
                    isDark ? 'bg-black/50 border-white/15 text-white' : 'bg-gray-50 border-gray-300'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-gray-400 block mb-1">Department</label>
                  <select
                    value={jobPostForm.department}
                    onChange={(e) => setJobPostForm({ ...jobPostForm, department: e.target.value })}
                    className={`w-full p-2.5 rounded-xl border ${
                      isDark ? 'bg-black/50 border-white/15 text-white' : 'bg-gray-50 border-gray-300'
                    }`}
                  >
                    {settings.departments.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-gray-400 block mb-1">Work Location</label>
                  <input
                    type="text"
                    value={jobPostForm.location}
                    onChange={(e) => setJobPostForm({ ...jobPostForm, location: e.target.value })}
                    className={`w-full p-2.5 rounded-xl border ${
                      isDark ? 'bg-black/50 border-white/15 text-white' : 'bg-gray-50 border-gray-300'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-gray-400 block mb-1">Type</label>
                  <select
                    value={jobPostForm.type}
                    onChange={(e) => setJobPostForm({ ...jobPostForm, type: e.target.value })}
                    className={`w-full p-2.5 rounded-xl border ${
                      isDark ? 'bg-black/50 border-white/15 text-white' : 'bg-gray-50 border-gray-300'
                    }`}
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Executive">Executive</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-gray-400 block mb-1">Experience</label>
                  <input
                    type="text"
                    value={jobPostForm.experience}
                    onChange={(e) => setJobPostForm({ ...jobPostForm, experience: e.target.value })}
                    className={`w-full p-2.5 rounded-xl border ${
                      isDark ? 'bg-black/50 border-white/15 text-white' : 'bg-gray-50 border-gray-300'
                    }`}
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-400 block mb-1">CTC Budget</label>
                  <input
                    type="text"
                    value={jobPostForm.salaryRange}
                    onChange={(e) => setJobPostForm({ ...jobPostForm, salaryRange: e.target.value })}
                    className={`w-full p-2.5 rounded-xl border ${
                      isDark ? 'bg-black/50 border-white/15 text-white' : 'bg-gray-50 border-gray-300'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-gray-400 block mb-1">Role Description &amp; Technical Requirements</label>
                <textarea
                  rows={3}
                  placeholder="Key technical responsibilities across electric powertrain telemetry, safety protocols, and fast charging infrastructure..."
                  value={jobPostForm.description}
                  onChange={(e) => setJobPostForm({ ...jobPostForm, description: e.target.value })}
                  className={`w-full p-2.5 rounded-xl border ${
                    isDark ? 'bg-black/50 border-white/15 text-white' : 'bg-gray-50 border-gray-300'
                  }`}
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setIsPostJobOpen(false)}
                  className="px-4 py-2 rounded-xl text-gray-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#548235] hover:bg-[#44692a] text-white font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Publish Opportunity</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 8: HIRING FORM CONFIG MODAL
          ========================================================================= */}
      {isHiringFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className={`w-full max-w-xl rounded-3xl p-6 sm:p-7 border shadow-2xl relative max-h-[90vh] overflow-y-auto no-scrollbar ${
            isDark ? 'bg-[#0E1420] border-white/15 text-white' : 'bg-white border-gray-200 text-gray-900'
          }`}>
            <button
              onClick={() => setIsHiringFormOpen(false)}
              className="absolute right-5 top-5 p-1 rounded-full text-gray-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-2">
              <span className="w-10 h-10 rounded-xl bg-[#4472C4]/20 text-[#4472C4] dark:text-[#6893db] flex items-center justify-center border border-[#4472C4]/30">
                <FileText className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold">Configure Hiring Form</h3>
                <p className="text-xs text-gray-400">Candidate application questionnaire &amp; verification document requirements</p>
              </div>
            </div>

            <form onSubmit={handleSaveFormConfig} className="space-y-4 mt-5 text-xs">
              <div className="space-y-2.5">
                {[
                  { key: 'kycRequired', label: 'Government KYC Verification', desc: 'Aadhaar, PAN & Address verification upload' },
                  { key: 'drivingLicenseRequired', label: 'Commercial Driving License & Endorsements', desc: 'Mandatory for Fleet Operations & Test Drivers' },
                  { key: 'evQuestionnaireRequired', label: 'EV & High-Voltage Telemetry Questionnaire', desc: 'Custom diagnostic quiz for engineering candidates' },
                  { key: 'salaryBreakdownRequired', label: 'Compensation History & CTC Breakdown', desc: 'Current fixed, variable & expected CTC disclosure' },
                  { key: 'ndaConsentRequired', label: 'Intellectual Property & Non-Disclosure Consent', desc: 'Proprietary EV transit safety confidentiality agreement' },
                  { key: 'portfolioLinkAllowed', label: 'Technical Portfolio / GitHub Project Links', desc: 'Allows pasting repository links & whitepapers' },
                ].map((item) => (
                  <label
                    key={item.key}
                    className={`flex items-start justify-between gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      formConfig[item.key]
                        ? isDark ? 'bg-white/5 border-white/20' : 'bg-gray-50 border-gray-300'
                        : isDark ? 'bg-black/20 border-white/5 opacity-60' : 'bg-gray-50/50 border-gray-200 opacity-60'
                    }`}
                  >
                    <div>
                      <span className="font-bold text-sm block">{item.label}</span>
                      <span className="text-gray-400 text-[11px]">{item.desc}</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={formConfig[item.key]}
                      onChange={(e) => setFormConfig({ ...formConfig, [item.key]: e.target.checked })}
                      className="w-4 h-4 rounded text-[#4472C4] focus:ring-[#4472C4] cursor-pointer mt-1"
                    />
                  </label>
                ))}
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setIsHiringFormOpen(false)}
                  className="px-4 py-2 rounded-xl text-gray-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#4472C4] hover:bg-[#365ca3] text-white font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Hiring Form</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 9: ADD USER ON HR PANNEL MODAL
          ========================================================================= */}
      {isAddUserOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className={`w-full max-w-xl rounded-3xl p-6 sm:p-7 border shadow-2xl relative max-h-[90vh] overflow-y-auto no-scrollbar ${
            isDark ? 'bg-[#0E1420] border-white/15 text-white' : 'bg-white border-gray-200 text-gray-900'
          }`}>
            <button
              onClick={() => setIsAddUserOpen(false)}
              className="absolute right-5 top-5 p-1 rounded-full text-gray-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-2">
              <span className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 dark:text-amber-400 flex items-center justify-center border border-amber-500/30">
                <UserPlus className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold">Add User on HR Pannel</h3>
                <p className="text-xs text-gray-400">Authorize recruiters and interviewers with secure cockpit SSO credentials</p>
              </div>
            </div>

            <form onSubmit={handleAddHrUser} className="space-y-4 mt-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-gray-400 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aditi Verma"
                    value={newUserForm.name}
                    onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })}
                    className={`w-full p-2.5 rounded-xl border ${
                      isDark ? 'bg-black/50 border-white/15 text-white' : 'bg-gray-50 border-gray-300'
                    }`}
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-400 block mb-1">Official Corporate Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. aditi.v@transvolt.in"
                    value={newUserForm.email}
                    onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                    className={`w-full p-2.5 rounded-xl border ${
                      isDark ? 'bg-black/50 border-white/15 text-white' : 'bg-gray-50 border-gray-300'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-gray-400 block mb-1">Assigned Role</label>
                  <select
                    value={newUserForm.role}
                    onChange={(e) => setNewUserForm({ ...newUserForm, role: e.target.value })}
                    className={`w-full p-2.5 rounded-xl border ${
                      isDark ? 'bg-black/50 border-white/15 text-white' : 'bg-gray-50 border-gray-300'
                    }`}
                  >
                    <option value="HR Administrator">HR Administrator</option>
                    <option value="HR Recruiter">HR Recruiter</option>
                    <option value="Technical Interviewer">Technical Interviewer</option>
                    <option value="Department Head">Department Head</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-gray-400 block mb-1">Department</label>
                  <select
                    value={newUserForm.department}
                    onChange={(e) => setNewUserForm({ ...newUserForm, department: e.target.value })}
                    className={`w-full p-2.5 rounded-xl border ${
                      isDark ? 'bg-black/50 border-white/15 text-white' : 'bg-gray-50 border-gray-300'
                    }`}
                  >
                    <option value="All Departments">All Departments</option>
                    {settings.departments.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Current Authorized Users */}
              <div className="pt-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-gray-400 block mb-2">
                  Currently Authorized Staff ({hrUsers.length})
                </span>
                <div className="space-y-1.5 max-h-36 overflow-y-auto no-scrollbar">
                  {hrUsers.map(u => (
                    <div
                      key={u.id}
                      className={`p-2.5 rounded-xl border flex items-center justify-between text-xs ${
                        isDark ? 'bg-black/30 border-white/10' : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-gray-200">{u.name}</div>
                        <div className="text-[11px] text-gray-400 font-mono">{u.email} • {u.role}</div>
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        {u.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddUserOpen(false)}
                  className="px-4 py-2 rounded-xl text-gray-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Grant HR Access</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
        </>
      )}
    </div>
  );
}

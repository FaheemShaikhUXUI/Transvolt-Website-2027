import React, { useState, useMemo } from 'react';
import {
  FileText,
  Sliders,
  Plus,
  Minus,
  Trash2,
  Copy,
  Edit3,
  Check,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  UploadCloud,
  CheckSquare,
  CircleDot,
  AlignLeft,
  Type,
  Hash,
  Calendar,
  AlertCircle,
  Eye,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Layers,
  Save,
  RotateCcw,
  ShieldCheck,
  Lock,
  X,
  HelpCircle,
  User,
  HeartPulse,
  CreditCard,
  GraduationCap,
  Briefcase,
  FileCheck,
  Camera,
  Upload,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Heart,
  Award,
  Users,
  Building2,
  Repeat,
  Send
} from 'lucide-react';
import { DEFAULT_HIRING_SECTIONS } from '../data/hiringFormData';

// Realistic Document Generator for Identity / Document Verification Previews
const getDocMock = (label = '', number = '') => {
  const lbl = (label || '').toLowerCase();
  const isAadhaar = lbl.includes('aadhaar');
  const isPan = lbl.includes('pan');
  const isPassport = lbl.includes('passport');
  const isLicense = lbl.includes('license') || lbl.includes('driving');

  let title = 'OFFICIAL IDENTITY DOCUMENT';
  let badge = 'GOVT. OF INDIA';
  let color = '#2563EB';
  let docNum = number || 'MH-02-2024-918234';

  if (isAadhaar) {
    title = 'AADHAAR CARD — UNIQUE IDENTIFICATION';
    badge = 'UIDAI • GOVT OF INDIA';
    color = '#0284c7';
    docNum = number || '4928 1029 8492';
  } else if (isPan) {
    title = 'PERMANENT ACCOUNT NUMBER (PAN)';
    badge = 'INCOME TAX DEPT • GOVT OF INDIA';
    color = '#1e3a8a';
    docNum = number || 'ABCDE1234F';
  } else if (isPassport) {
    title = 'REPUBLIC OF INDIA — PASSPORT';
    badge = 'MINISTRY OF EXTERNAL AFFAIRS';
    color = '#0f172a';
    docNum = number || 'Z1234567';
  } else if (isLicense) {
    title = 'MOTOR VEHICLE DRIVING LICENCE';
    badge = 'TRANSPORT DEPT • MOTOR VEHICLES';
    color = '#059669';
    docNum = number || 'MH01-20210084912';
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="380" viewBox="0 0 600 380">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#f8fafc" />
        <stop offset="100%" stop-color="#e2e8f0" />
      </linearGradient>
      <linearGradient id="head" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="${color}" />
        <stop offset="100%" stop-color="#0f172a" />
      </linearGradient>
    </defs>
    <rect width="600" height="380" rx="20" fill="url(#bg)" stroke="#cbd5e1" stroke-width="3" />
    <path d="M 0 20 Q 0 0 20 0 L 580 0 Q 600 0 600 20 L 600 70 L 0 70 Z" fill="url(#head)" />
    ${isAadhaar ? '<rect y="70" width="600" height="4" fill="#ff9933"/><rect y="74" width="600" height="4" fill="#ffffff"/><rect y="78" width="600" height="4" fill="#138808"/>' : ''}
    <text x="30" y="44" fill="#ffffff" font-family="system-ui, sans-serif" font-size="14" font-weight="900" letter-spacing="1">${title}</text>
    <text x="570" y="44" text-anchor="end" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11" font-weight="bold">${badge}</text>
    
    <rect x="36" y="104" width="130" height="160" rx="12" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>
    <circle cx="101" cy="155" r="32" fill="#64748b" />
    <path d="M 56 240 Q 101 195 146 240 Z" fill="#64748b" />
    <rect x="36" y="274" width="130" height="24" rx="6" fill="#e2e8f0" />
    <text x="101" y="290" text-anchor="middle" fill="#475569" font-family="monospace" font-size="10" font-weight="bold">PHOTO SIGNED</text>
    
    <text x="190" y="125" fill="#64748b" font-family="system-ui, sans-serif" font-size="11" font-weight="bold">FULL LEGAL NAME</text>
    <text x="190" y="148" fill="#0f172a" font-family="system-ui, sans-serif" font-size="16" font-weight="900">CANDIDATE RECORD</text>
    
    <text x="190" y="185" fill="#64748b" font-family="system-ui, sans-serif" font-size="11" font-weight="bold">DOCUMENT IDENTIFIER</text>
    <text x="190" y="210" fill="#0f172a" font-family="monospace" font-size="18" font-weight="900">${docNum}</text>
    
    <text x="190" y="245" fill="#64748b" font-family="system-ui, sans-serif" font-size="11" font-weight="bold">VALIDITY / VERIFICATION STATUS</text>
    <text x="190" y="268" fill="#16a34a" font-family="system-ui, sans-serif" font-size="13" font-weight="bold">✓ GOVERNMENT REPOSITORIES VERIFIED</text>
    
    <rect x="470" y="104" width="94" height="94" rx="8" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/>
    <rect x="480" y="114" width="28" height="28" fill="#0f172a" />
    <rect x="526" y="114" width="28" height="28" fill="#0f172a" />
    <rect x="480" y="160" width="28" height="28" fill="#0f172a" />
    <rect x="515" y="150" width="16" height="16" fill="#0f172a" />
    <text x="517" y="215" text-anchor="middle" fill="#64748b" font-family="monospace" font-size="9">SECURE QR</text>
    
    <rect x="0" y="325" width="600" height="55" fill="#0f172a" />
    <text x="30" y="356" fill="#ffffff" font-family="system-ui, sans-serif" font-size="11" font-weight="bold">TRANSVOLT MOBILITY RECRUITMENT VERIFICATION SYSTEM</text>
    <text x="570" y="356" text-anchor="end" fill="#22c55e" font-family="monospace" font-size="11" font-weight="bold">AUTHENTICATED • SHA-256</text>
  </svg>`;

  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
};

export const HiringFormBuilderPage = ({
  isDark = false,
  onBack,
  onSaveSchema,
}) => {
  // Schema State initialized from DEFAULT_HIRING_SECTIONS or localStorage
  const [sections, setSections] = useState(() => {
    try {
      const saved = localStorage.getItem('tv_hiring_schema_v9_profile_photo');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 6) {
          return parsed.map((sec) =>
            sec.id === 'sec-uploads-declaration'
              ? { ...sec, questions: sec.questions.filter((q) => q.id !== 'q-upl-1') }
              : sec
          );
        }
      }
    } catch {
      // fallback
    }
    return DEFAULT_HIRING_SECTIONS;
  });

  const [activeSectionId, setActiveSectionId] = useState(DEFAULT_HIRING_SECTIONS[0].id);

  // Experience Sub-Sections State (Matching Transvolt Branding Portal V4)
  const [experienceOrgs, setExperienceOrgs] = useState([
    {
      id: 'org-1',
      name: 'Tata Motors Commercial Vehicles Ltd.',
      desig: 'Assistant Engineer — Fleet Electrification',
      dept: 'Electric Mobility Engineering',
      supervisor: 'Sanjay Kulkarni (Senior Manager)',
      doj: '2022-01-10',
      lwd: '',
      tenure: '2 Years 4 Months',
      isCurrent: true,
      isDefault: true,
    },
    {
      id: 'org-2',
      name: 'Mahindra Electric Mobility Ltd.',
      desig: 'Graduate Engineer Trainee',
      dept: 'Powertrain Integration',
      supervisor: 'Pooja Shah (Lead Engineer)',
      doj: '2020-08-01',
      lwd: '2021-12-20',
      tenure: '1 Year 4 Months',
      isCurrent: false,
      isDefault: true,
    },
    {
      id: 'org-3',
      name: 'Olectra Greentech Limited',
      desig: 'Junior EV Powertrain Engineer',
      dept: 'Commercial EV Systems',
      supervisor: 'Anand Verma (Technical Lead)',
      doj: '2019-06-15',
      lwd: '2020-07-31',
      tenure: '1 Year 1 Month',
      isCurrent: false,
      isDefault: true,
    },
  ]);

  // Handler: Toggle Currently Working status on organization
  const handleToggleCurrentlyWorking = (orgId) => {
    setExperienceOrgs((prev) => {
      const targetOrg = prev.find((o) => o.id === orgId);
      const willBeActive = !targetOrg?.isCurrent;
      return prev.map((o) => {
        if (o.id === orgId) {
          return {
            ...o,
            isCurrent: willBeActive,
            lwd: willBeActive ? '' : o.lwd || '2024-03-31',
          };
        }
        // When one organization is marked current, others are marked previous
        return willBeActive ? { ...o, isCurrent: false } : o;
      });
    });
  };

  const [experienceReference, setExperienceReference] = useState({
    name: 'Dr. Rajesh Menon',
    org: 'Tata Motors CV',
    desig: 'Chief Technical Officer',
    dept: 'R&D Powertrain',
    contact: '+91 98201 54321',
    supervisor: 'Yes (Direct Head)',
    relation: 'Colleague',
  });

  const [experienceColleagues, setExperienceColleagues] = useState([
    {
      id: 'col-1',
      name: 'Amitabh Sen',
      org: 'Tata Motors CV',
      desigDept: 'Fleet Quality Lead',
      phone: '+91 98192 11223',
    },
    {
      id: 'col-2',
      name: 'Meghna Nair',
      org: 'Tata Motors CV',
      desigDept: 'Diagnostics Engineer',
      phone: '+91 98334 44556',
    },
    {
      id: 'col-3',
      name: 'Rohan Deshmukh',
      org: 'Tata Motors CV',
      desigDept: 'Depot Service Manager',
      phone: '+91 98771 99887',
    },
  ]);

  // Academic Qualifications State (Matching Mockup with SSC, HSC, Diploma, Degree - No Delete Button)
  const [educationRecords, setEducationRecords] = useState([
    {
      id: 'edu-ssc',
      tag: 'SSC',
      title: 'Qualification #1',
      name: 'Secondary School Certificate (10th)',
      passingYear: '2014',
      courseType: 'Full-Time',
      stream: 'General Science & Maths',
      percentage: '84.5',
      grade: 'Distinction',
      institute: 'State Board School',
      docLabel: 'Upload SSC Doc',
      fileKey: 'q-edu-1',
    },
    {
      id: 'edu-hsc',
      tag: 'HSC',
      title: 'Qualification #2',
      name: 'Higher Secondary Certificate (12th)',
      passingYear: '2016',
      courseType: 'Full-Time',
      stream: 'Science (PCM)',
      percentage: '78.2',
      grade: 'First Class',
      institute: 'Junior Science College',
      docLabel: 'Upload HSC Doc',
      fileKey: 'q-edu-2',
    },
    {
      id: 'edu-diploma',
      tag: 'Diploma',
      title: 'Qualification #3',
      name: 'Technical Polytechnic Diploma',
      passingYear: '',
      courseType: 'Full-Time',
      stream: '',
      percentage: '',
      grade: '',
      institute: '',
      placeholderYear: 'e.g. 2020',
      placeholderStream: 'Automobile / Mechanical',
      placeholderPct: 'e.g. 78.5',
      placeholderGrade: 'e.g. First Class',
      placeholderInst: 'Full School / College / University Name',
      docLabel: 'Upload Diploma Doc',
      fileKey: 'q-edu-3',
    },
    {
      id: 'edu-grad',
      tag: 'Degree',
      title: 'Qualification #4',
      name: 'Graduation Degree (B.Tech / B.E / B.Sc)',
      passingYear: '2020',
      courseType: 'Full-Time',
      stream: 'Mechanical / EV Systems Engineering',
      percentage: '8.4 CGPA',
      grade: 'First Class with Distinction',
      institute: 'State Technological University',
      placeholderYear: 'e.g. 2020',
      placeholderStream: 'B.Tech Mechanical / Electrical',
      placeholderPct: '8.4 CGPA',
      placeholderGrade: 'Distinction',
      placeholderInst: 'Full University Name',
      docLabel: 'Upload Degree Doc',
      fileKey: 'q-edu-4',
    },
    {
      id: 'edu-postgrad',
      tag: 'Post Graduate',
      title: 'Qualification #5',
      name: 'Post Graduate Degree (M.Tech / MBA / Other)',
      passingYear: '',
      courseType: 'Full-Time',
      stream: '',
      percentage: '',
      grade: '',
      institute: '',
      placeholderYear: 'e.g. 2020',
      placeholderStream: 'M.Tech EV / Power Electronics',
      placeholderPct: 'e.g. 78.5',
      placeholderGrade: 'e.g. First Class',
      placeholderInst: 'Full School / College / University Name',
      docLabel: 'Upload Post Graduate Doc',
      fileKey: 'q-edu-5',
    },
  ]);

  const handleUpdateEducationRecord = (id, field, value) => {
    setEducationRecords((prev) =>
      prev.map((rec) => (rec.id === id ? { ...rec, [field]: value } : rec))
    );
  };

  const handleAddEducationRecord = () => {
    const nextIdx = educationRecords.length + 1;
    const newRec = {
      id: `edu-custom-${Date.now().toString(36)}`,
      tag: 'Other',
      title: `Qualification #${nextIdx}`,
      name: `Additional Qualification #${nextIdx}`,
      passingYear: '',
      courseType: 'Full-Time',
      stream: '',
      percentage: '',
      grade: '',
      institute: '',
      placeholderYear: 'YYYY',
      placeholderStream: 'Stream / Specialization',
      placeholderPct: 'e.g. 75%',
      placeholderGrade: 'e.g. First Class',
      placeholderInst: 'Full College / University Name',
      docLabel: 'Upload Marksheet Doc',
      fileKey: `q-edu-custom-${Date.now().toString(36)}`,
      isCustom: true,
    };
    setEducationRecords((prev) => [...prev, newRec]);
  };

  const handleRemoveEducationRecord = (id) => {
    setEducationRecords((prev) => prev.filter((r) => r.id !== id));
  };

  // Certifications List State (2 Hardcoded Default Tiles + Add More Logic at Bottom)
  const [certificationsList, setCertificationsList] = useState([
    {
      id: 'cert-1',
      title: 'Certificate #1',
      name: 'High Voltage EV Safety & ISO 26262',
      specialization: 'Electric Vehicle Safety',
      institute: 'ARAI / SAE India',
      issueDate: '2023-04-10',
      validity: '5 Years',
      fileKey: 'q-cert-1',
      isCustom: false,
    },
    {
      id: 'cert-2',
      title: 'Certificate #2',
      name: 'Battery Management System Diagnostics',
      specialization: 'Li-Ion Diagnostics',
      institute: 'National Skill Council',
      issueDate: '2022-09-15',
      validity: 'Lifetime',
      fileKey: 'q-cert-2',
      isCustom: false,
    },
  ]);

  const handleAddCertification = () => {
    const nextIdx = certificationsList.length + 1;
    const newCert = {
      id: `cert-${Date.now().toString(36)}`,
      title: `Certificate #${nextIdx}`,
      name: '',
      specialization: '',
      institute: '',
      issueDate: '',
      validity: '',
      placeholderName: 'Certificate Title',
      placeholderSpec: 'Domain / Field',
      placeholderInst: 'Issuing Institute',
      placeholderVal: 'e.g. 5 Years / Lifetime',
      fileKey: `q-cert-${Date.now().toString(36)}`,
      isCustom: true,
    };
    setCertificationsList((prev) => [...prev, newCert]);
  };

  const handleRemoveCertification = (id) => {
    // Certificate #1 and #2 are hardcoded and cannot be deleted
    setCertificationsList((prev) => prev.filter((c) => c.id !== id && c.isCustom));
  };

  const handleUpdateCertification = (id, field, value) => {
    setCertificationsList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  // Family & Health Dynamic State (Starts with 4 Family, 4 Health, 2 Mediclaim; NO Delete button for default, Minus button on newly added)
  const [familyMembersList, setFamilyMembersList] = useState([
    { id: 'fam-1', title: 'Member #1', name: '', relation: 'Father', gender: 'Male', dob: '', isCustom: false },
    { id: 'fam-2', title: 'Member #2', name: '', relation: 'Mother', gender: 'Female', dob: '', isCustom: false },
    { id: 'fam-3', title: 'Member #3', name: '', relation: 'Spouse', gender: 'Female', dob: '', isCustom: false },
    { id: 'fam-4', title: 'Member #4', name: '', relation: 'Child', gender: 'Male', dob: '', isCustom: false },
  ]);

  const [healthRecordsList, setHealthRecordsList] = useState([
    { id: 'health-1', title: 'Record #1', name: '', relation: 'Self', gender: 'Male', dob: '', age: '27', issue: 'None', isCustom: false },
    { id: 'health-2', title: 'Record #2', name: '', relation: 'Father', gender: 'Male', dob: '', age: '58', issue: 'None', isCustom: false },
    { id: 'health-3', title: 'Record #3', name: '', relation: 'Mother', gender: 'Female', dob: '', age: '54', issue: 'None', isCustom: false },
    { id: 'health-4', title: 'Record #4', name: '', relation: 'Spouse', gender: 'Female', dob: '', age: '26', issue: 'None', isCustom: false },
  ]);

  const [mediclaimList, setMediclaimList] = useState([
    { id: 'med-1', title: 'Beneficiary #1', name: '', relation: 'Self', gender: 'Male', dob: '', isCustom: false },
    { id: 'med-2', title: 'Beneficiary #2', name: '', relation: 'Spouse', gender: 'Female', dob: '', isCustom: false },
  ]);

  const handleAddFamilyMember = () => {
    const nextIdx = familyMembersList.length + 1;
    setFamilyMembersList((prev) => [
      ...prev,
      {
        id: `fam-${Date.now().toString(36)}`,
        title: `Member #${nextIdx}`,
        name: '',
        relation: 'Dependent',
        gender: 'Male',
        dob: '',
        isCustom: true,
      },
    ]);
  };

  const handleRemoveFamilyMember = (id) => {
    setFamilyMembersList((prev) => prev.filter((m) => m.id !== id || !m.isCustom));
  };

  const handleUpdateFamilyMember = (id, field, value) => {
    setFamilyMembersList((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const handleAddHealthRecord = () => {
    const nextIdx = healthRecordsList.length + 1;
    setHealthRecordsList((prev) => [
      ...prev,
      {
        id: `health-${Date.now().toString(36)}`,
        title: `Record #${nextIdx}`,
        name: '',
        relation: 'Dependent',
        gender: 'Male',
        dob: '',
        age: '',
        issue: 'None',
        isCustom: true,
      },
    ]);
  };

  const handleRemoveHealthRecord = (id) => {
    setHealthRecordsList((prev) => prev.filter((r) => r.id !== id || !r.isCustom));
  };

  const handleUpdateHealthRecord = (id, field, value) => {
    setHealthRecordsList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const handleAddMediclaim = () => {
    const nextIdx = mediclaimList.length + 1;
    setMediclaimList((prev) => [
      ...prev,
      {
        id: `med-${Date.now().toString(36)}`,
        title: `Beneficiary #${nextIdx}`,
        name: '',
        relation: 'Dependent',
        gender: 'Male',
        dob: '',
        isCustom: true,
      },
    ]);
  };

  const handleRemoveMediclaim = (id) => {
    setMediclaimList((prev) => prev.filter((b) => b.id !== id || !b.isCustom));
  };

  const handleUpdateMediclaim = (id, field, value) => {
    setMediclaimList((prev) =>
      prev.map((b) => (b.id === id ? { ...b, [field]: value } : b))
    );
  };

  // Languages Known Dynamic State (English, Hindi, Marathi by default; Gujarati removed; + Add More Language button)
  const [candidateLanguages, setCandidateLanguages] = useState([
    { id: 'lang-en', name: 'English', read: true, write: true, speak: true, isFixed: true },
    { id: 'lang-hi', name: 'Hindi', read: true, write: true, speak: true, isFixed: true },
    { id: 'lang-mr', name: 'Marathi', read: true, write: true, speak: true, isFixed: true },
  ]);

  const handleAddLanguage = () => {
    setCandidateLanguages((prev) => [
      ...prev,
      {
        id: `lang-${Date.now().toString(36)}`,
        name: '',
        read: false,
        write: false,
        speak: false,
        isFixed: false,
      },
    ]);
  };

  const handleRemoveLanguage = (id) => {
    setCandidateLanguages((prev) => prev.filter((l) => l.id !== id || l.isFixed));
  };

  const handleToggleLangCapability = (id, cap) => {
    setCandidateLanguages((prev) =>
      prev.map((l) => (l.id === id ? { ...l, [cap]: !l[cap] } : l))
    );
  };

  const handleToggleAllForLang = (id) => {
    setCandidateLanguages((prev) =>
      prev.map((l) => {
        if (l.id !== id) return l;
        const allActive = l.read && l.write && l.speak;
        return {
          ...l,
          read: !allActive,
          write: !allActive,
          speak: !allActive,
        };
      })
    );
  };

  const handleUpdateLanguageName = (id, name) => {
    setCandidateLanguages((prev) =>
      prev.map((l) => (l.id === id ? { ...l, name } : l))
    );
  };

  const handleAddOrganization = () => {
    const newOrg = {
      id: `org-${Date.now().toString(36)}`,
      name: '',
      desig: '',
      dept: '',
      supervisor: '',
      doj: '',
      lwd: '',
      tenure: '',
      isDefault: false,
    };
    setExperienceOrgs((prev) => [...prev, newOrg]);
  };

  const handleRemoveOrganization = (orgId) => {
    setExperienceOrgs((prev) => prev.filter((o) => o.id !== orgId || o.isDefault));
  };

  const handleUpdateOrganization = (orgId, field, val) => {
    setExperienceOrgs((prev) =>
      prev.map((o) => (o.id === orgId ? { ...o, [field]: val } : o))
    );
  };

  const handleAddColleague = () => {
    const newCol = {
      id: `col-${Date.now().toString(36)}`,
      name: '',
      org: '',
      desigDept: '',
      phone: '',
    };
    setExperienceColleagues((prev) => [...prev, newCol]);
  };

  const handleRemoveColleague = (colId) => {
    if (experienceColleagues.length <= 1) {
      alert('At least one colleague verification contact is required.');
      return;
    }
    setExperienceColleagues((prev) => prev.filter((c) => c.id !== colId));
  };

  const handleUpdateColleague = (colId, field, val) => {
    setExperienceColleagues((prev) =>
      prev.map((c) => (c.id === colId ? { ...c, [field]: val } : c))
    );
  };

  // Candidate Live Interactive Form Responses State (Left Side Live Form)
  const [candidateResponses, setCandidateResponses] = useState({});
  const [candidateFiles, setCandidateFiles] = useState({});
  const [previewSubmitted, setPreviewSubmitted] = useState(false);

  // Modal / Toast states
  const [showSaveToast, setShowSaveToast] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [viewingDocModal, setViewingDocModal] = useState(null);
  const [showPhotoRulesModal, setShowPhotoRulesModal] = useState(false);

  // Send Hiring Form Modal State
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [sendFormData, setSendFormData] = useState({
    personName: '',
    emailId: '',
    addNote: '',
    senderEmail: 'hr@transvolt.in', // Default HR email, user can change it
  });
  const [sendSuccessState, setSendSuccessState] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Active section lookup
  const activeSection = useMemo(() => {
    return sections.find((s) => s.id === activeSectionId) || sections[0];
  }, [sections, activeSectionId]);

  // Total question count
  const totalQuestionsCount = useMemo(() => {
    return sections.reduce((acc, sec) => acc + sec.questions.length, 0);
  }, [sections]);

  // Candidate live input change handler
  const handleCandidateChange = (questionId, value) => {
    setCandidateResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  // Candidate file upload simulator
  const handleCandidateFileUpload = (questionId, fileData) => {
    setCandidateFiles((prev) => {
      if (!fileData) {
        const next = { ...prev };
        delete next[questionId];
        return next;
      }
      return {
        ...prev,
        [questionId]: typeof fileData === 'string' ? { name: fileData, url: getDocMock(fileData, '') } : fileData,
      };
    });
  };

  // Reset candidate dummy preview responses
  const handleResetCandidatePreview = () => {
    setCandidateResponses({});
    setCandidateFiles({});
    setPreviewSubmitted(false);
  };

  // Handler: Save All to localStorage
  const handleSaveAllChanges = () => {
    try {
      localStorage.setItem('tv_hiring_schema_v9_profile_photo', JSON.stringify(sections));
      setShowSaveToast(true);
      setTimeout(() => setShowSaveToast(false), 3500);
      if (onSaveSchema) onSaveSchema(sections);
    } catch (err) {
      console.error('Failed to save schema:', err);
    }
  };

  // Handler: Reset to Defaults
  const handleResetDefaults = () => {
    if (window.confirm('Reset all hiring form questions to original Transvolt Branding Portal V4 standard schema?')) {
      setSections(DEFAULT_HIRING_SECTIONS);
      setActiveSectionId(DEFAULT_HIRING_SECTIONS[0].id);
      setSelectedQuestionId(DEFAULT_HIRING_SECTIONS[0].questions[0].id);
      localStorage.setItem('tv_hiring_schema_v9_profile_photo', JSON.stringify(DEFAULT_HIRING_SECTIONS));
      setShowSaveToast(true);
      setTimeout(() => setShowSaveToast(false), 2500);
    }
  };

  // Icon mapping for sections based on section id / title
  const getSectionIcon = (sec) => {
    const id = (typeof sec === 'string' ? sec : sec?.id || '').toLowerCase();
    if (id.includes('personal')) return User;
    if (id.includes('experience')) return Briefcase;
    if (id.includes('education')) return GraduationCap;
    if (id.includes('family')) return HeartPulse;
    if (id.includes('bank')) return CreditCard;
    if (id.includes('upload') || id.includes('declaration')) return FileCheck;
    return FileText;
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-200 ${isDark ? 'bg-[#060A11] text-white' : 'bg-[#F8F9FA] text-gray-900'
        }`}
    >
      {/* =========================================================================
          TOP NAVIGATION BAR (HR COCKPIT CONNECTED)
          ========================================================================= */}
      <header
        className={`sticky top-0 z-40 px-6 py-3.5 border-b backdrop-blur-xl flex items-center justify-between transition-colors ${isDark
          ? 'bg-[#0A0F1A]/90 border-white/10'
          : 'bg-white/90 border-gray-200 shadow-xs'
          }`}
      >
        <div className="flex items-center gap-4">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 rounded-xl text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer"
              title="Return to HR Cockpit"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>HR Cockpit</span>
            </button>
          )}

          <div className="h-4 w-px bg-gray-300 dark:bg-white/15 hidden sm:block" />

          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-[#548235]/15 text-[#548235] dark:text-[#76B84A] flex items-center justify-center border border-[#548235]/30">
              <Sliders className="w-4 h-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-extrabold tracking-tight">
                  Transvolt Hiring Form Architect
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#548235]/15 text-[#548235] dark:text-[#76B84A] border border-[#548235]/30 font-bold">
                  Synced with Portal V4
                </span>
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                Candidate Information Form • 6 Segregated Sections & Live Component Control
              </p>
            </div>
          </div>
        </div>

        {/* Top Right Header Controls */}
        <div className="flex items-center gap-2.5">
          <span className="hidden lg:flex items-center gap-1.5 text-xs font-mono text-gray-500 dark:text-gray-400 px-3 py-1 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10">
            <Layers className="w-3.5 h-3.5 text-[#548235]" />
            <span>{sections.length} Sections</span>
            <span className="text-gray-400">•</span>
            <span>{totalQuestionsCount} Questions</span>
          </span>

          <button
            onClick={handleResetDefaults}
            className="px-3 py-1.5 rounded-lg text-gray-500 hover:text-gray-900 dark:hover:text-white text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer"
            title="Reset to default schema"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Reset Defaults</span>
          </button>

          <button
            onClick={() => setIsSendModalOpen(true)}
            className="px-4 sm:px-5 py-2 rounded-xl bg-[#548235] hover:bg-[#44692a] text-white text-xs sm:text-sm font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer border border-[#548235] hover:scale-[1.02] active:scale-[0.98]"
            title="Send Hiring Form to Candidate"
          >
            <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
            <span>Send Hiring Form</span>
          </button>
        </div>
      </header>

      {/* =========================================================================
          MAIN WORKSPACE LAYOUT: LEFT PANEL (MILESTONE SYSTEM) + RIGHT (WORKING FORM)
          ========================================================================= */}
      <div className="max-w-[1780px] w-full mx-auto px-4 sm:px-6 py-6 flex-1 flex flex-col lg:flex-row gap-6 items-start">

        {/* =========================================================================
            LEFT PANEL: FORM OPTIONS SELECTIONS (VERTICAL MILESTONE SYSTEM)
            ========================================================================= */}
        <div className="w-full lg:w-[320px] xl:w-[360px] shrink-0 lg:sticky lg:top-20 flex flex-col gap-4">
          <div className={`rounded-3xl border p-5 shadow-sm select-none transition-all ${isDark ? 'bg-[#0E1420] border-white/10' : 'bg-white border-gray-200'
            }`}>
            {/* Header of Milestone System */}
            <div className="pb-3.5 mb-4 border-b border-gray-100 dark:border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB] animate-pulse" />
                <h3 className="text-xs font-mono font-extrabold uppercase tracking-wider text-gray-900 dark:text-white">
                  Form Milestones
                </h3>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#2563EB]/10 text-[#2563EB] dark:text-blue-400 font-bold">
                Step {sections.findIndex((s) => s.id === activeSectionId) + 1} of {sections.length}
              </span>
            </div>

            {/* Progress Bar Strip */}
            <div className="mb-4 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-mono text-gray-500 dark:text-gray-400">
                <span>Application Progress</span>
                <span className="font-bold text-gray-800 dark:text-gray-200">
                  {Math.round(((sections.findIndex((s) => s.id === activeSectionId) + 1) / sections.length) * 100)}%
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-gray-100 dark:bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#2563EB] to-[#60A5FA] transition-all duration-300 rounded-full"
                  style={{
                    width: `${((sections.findIndex((s) => s.id === activeSectionId) + 1) / sections.length) * 100}%`
                  }}
                />
              </div>
            </div>

            {/* Vertical Milestone Steps */}
            <div className="relative space-y-2">
              {/* Continuous Vertical Connecting Line */}
              <div className="absolute left-[21px] top-4 bottom-4 w-[2px] bg-gray-200 dark:bg-white/10 z-0 pointer-events-none" />

              {sections.map((sec, idx) => {
                const Icon = getSectionIcon(sec);
                const activeIdx = sections.findIndex((s) => s.id === activeSectionId);
                const isCurrent = activeSectionId === sec.id;
                const isCompleted = idx < activeIdx;

                return (
                  <div
                    key={sec.id}
                    onClick={() => setActiveSectionId(sec.id)}
                    className={`relative z-10 flex items-center gap-3.5 p-3 rounded-2xl cursor-pointer transition-all duration-200 border select-none ${isCurrent
                      ? 'bg-[#2563EB] text-white shadow-md shadow-blue-600/25 border-[#2563EB]'
                      : isCompleted
                        ? isDark
                          ? 'bg-blue-950/20 hover:bg-blue-950/30 text-gray-200 border-[#2563EB]/30'
                          : 'bg-blue-50/50 hover:bg-blue-50 text-gray-800 border-blue-200/60'
                        : isDark
                          ? 'bg-[#121A28]/40 hover:bg-[#121A28]/80 text-gray-400 border-white/5'
                          : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-200/80 shadow-2xs'
                      }`}
                  >
                    {/* Step Circle / Checkmark */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-black shrink-0 transition-all ${isCurrent
                        ? 'bg-white text-[#2563EB] shadow-sm ring-2 ring-white/30'
                        : isCompleted
                          ? 'bg-emerald-500 text-white'
                          : 'bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-white/10'
                        }`}
                    >
                      {isCompleted ? (
                        <Check className="w-4 h-4 stroke-[3]" />
                      ) : (
                        <span>{sec.number || `0${idx + 1}`}</span>
                      )}
                    </div>

                    {/* Step Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className={`text-xs font-extrabold truncate ${isCurrent ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                          {sec.title}
                        </span>
                        <Icon className={`w-3.5 h-3.5 shrink-0 ${isCurrent ? 'text-white' : 'text-gray-400'}`} />
                      </div>
                      <span className={`text-[10.5px] truncate block font-mono ${isCurrent ? 'text-blue-100' : 'text-gray-400'}`}>
                        {sec.count || `${sec.questions.length} Items`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Form Info Badge */}
            <div className="mt-5 pt-3.5 border-t border-gray-100 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-gray-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#548235]" />
                <span>Verified Schema</span>
              </span>
              <span>Portal V4</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            RIGHT SIDE: ONLY WORKING FORM (PROPER CANDIDATE LIVE FORM)
            ========================================================================= */}
        <div className="flex-1 min-w-0 flex flex-col">
          <div
            className={`rounded-3xl border shadow-sm overflow-hidden transition-all flex flex-col ${isDark ? 'bg-[#0E1420] border-white/10' : 'bg-white border-gray-200/90'
              }`}
          >
            {/* Header Exactly As Per Design Reference */}
            <div className="bg-[#DEE4ED] dark:bg-[#151D2C] px-6 py-5 sm:px-8 sm:py-6 flex items-center justify-between border-b border-gray-200/70 dark:border-white/5 transition-colors">
              <h3 className="text-2xl sm:text-[28px] font-black tracking-tight text-gray-900 dark:text-white leading-tight">
                {activeSection.title}
              </h3>

              <div className="flex items-center gap-3">
                {Object.keys(candidateResponses).length > 0 && (
                  <button
                    type="button"
                    onClick={handleResetCandidatePreview}
                    className="px-2.5 py-1 rounded-lg text-[10.5px] font-semibold text-gray-600 hover:text-rose-500 hover:bg-white/60 dark:hover:bg-white/10 transition-all flex items-center gap-1 cursor-pointer"
                    title="Clear entered test data"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                )}
                <span className="px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-white/10 text-xs font-semibold text-gray-700 dark:text-gray-200 border border-gray-200/60 dark:border-white/10 shadow-2xs backdrop-blur-xs select-none">
                  Candidate Form Preview
                </span>
              </div>
            </div>

            {/* Form Fields Body Container */}
            <div className="p-5 sm:p-7 flex flex-col flex-1">

              {/* Functional Candidate Form Fields */}
              {activeSectionId === 'sec-experience' ? (
                /* =========================================================================
                   SPECIALIZED TILE-BASED EXPERIENCE FORM (SYNCS WITH BRANDING PORTAL V4)
                   - 1. Past Experience (Multi-Organization Tiles with Add/Delete)
                   - 2. Professional Reference (3-Row Layout with Relationship Radio)
                   - 3. Contacts of Colleagues from Last Organization (3-Col Grid with Add/Delete)
                   ========================================================================= */
                <div className="space-y-6 flex-1">
                  {/* SUBSECTION 1: PAST EXPERIENCE */}
                  <div className="space-y-3">
                    <div className="pb-1 border-b border-gray-100 dark:border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-md bg-[#548235]/15 text-[#548235] dark:text-[#76B84A] flex items-center justify-center">
                          <Briefcase className="w-3.5 h-3.5" />
                        </span>
                        <h4 className="text-xs sm:text-sm font-extrabold tracking-tight text-gray-900 dark:text-white uppercase">
                          Past Experience (Previous Organizations)
                        </h4>
                      </div>
                      <p className="text-[10.5px] text-gray-500 dark:text-gray-400 mt-0.5">
                        Organization Name, Designation, Department, Reporting Supervisor, Date of Joining, Last Working Date, Tenure
                      </p>
                    </div>

                    {/* Organizations List of Tiles */}
                    <div className="space-y-4">
                      {experienceOrgs.map((org, oIdx) => (
                        <div
                          key={org.id}
                          className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-gray-200/90 dark:border-white/10 bg-white dark:bg-[#121A28]/40 shadow-xs space-y-4 hover:border-gray-300 dark:hover:border-white/20 transition-all"
                        >
                          {/* Header with Currently Working Toggle on Top Right */}
                          <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-gray-100 dark:border-white/10">
                            <div className="flex items-center gap-2.5">
                              <span className="w-8 h-8 rounded-xl bg-[#2563EB]/10 dark:bg-[#2563EB]/20 text-[#2563EB] dark:text-blue-400 flex items-center justify-center font-bold text-xs">
                                <Building2 className="w-4 h-4" />
                              </span>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="text-sm font-extrabold text-gray-900 dark:text-white tracking-tight">
                                    Organization #{oIdx + 1}
                                  </h4>
                                  {org.isCurrent && (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                      Active
                                    </span>
                                  )}
                                </div>
                                <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                                  {org.isCurrent
                                    ? 'Current Employer (Active Role)'
                                    : oIdx === 0
                                      ? 'Primary / Most Recent Employer'
                                      : 'Previous Employment Record'}
                                </span>
                              </div>
                            </div>

                            {/* Top Right: Currently Working Toggle & Tile Badge */}
                            <div className="flex items-center gap-2.5 sm:gap-3">
                              <button
                                type="button"
                                role="switch"
                                aria-checked={Boolean(org.isCurrent)}
                                onClick={() => handleToggleCurrentlyWorking(org.id)}
                                className={`group flex items-center gap-2 px-3 py-1.5 rounded-full border cursor-pointer select-none transition-all shadow-xs ${org.isCurrent
                                  ? 'bg-blue-50/90 dark:bg-blue-950/40 border-blue-300 dark:border-blue-700/60 text-blue-700 dark:text-blue-300 hover:bg-blue-100/70'
                                  : 'bg-white hover:bg-gray-50 dark:bg-white/5 dark:hover:bg-white/10 border-gray-200 dark:border-white/15 text-gray-600 dark:text-gray-300'
                                  }`}
                                title={org.isCurrent ? 'Click to mark as past employment' : 'Click to mark as currently working'}
                              >
                                <span className="text-xs font-bold leading-none">Currently Working</span>

                                {/* Toggle Track (38px x 20px) */}
                                <div
                                  className={`relative inline-flex h-5 w-10 shrink-0 items-center rounded-full p-0.5 transition-colors duration-200 ease-in-out ${org.isCurrent ? 'bg-[#2563EB]' : 'bg-gray-300 dark:bg-white/20'
                                    }`}
                                >
                                  {/* Toggle Knob (16px x 16px) - Slides 20px smoothly across track */}
                                  <span
                                    style={{
                                      transform: org.isCurrent ? 'translateX(20px)' : 'translateX(0px)',
                                      transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                    }}
                                    className="inline-block h-4 w-4 rounded-full bg-white shadow-sm shrink-0"
                                  />
                                </div>
                              </button>

                              <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 font-bold border border-gray-200/80 dark:border-white/10">
                                0{oIdx + 1}
                              </span>
                            </div>
                          </div>

                          {/* Balanced 2-Column Responsive Form Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* 1. Organization Name - Full Width */}
                            <div className="md:col-span-2">
                              <label className="block text-xs font-bold text-gray-800 dark:text-gray-200 mb-1.5">
                                1. Organization Name
                              </label>
                              <input
                                type="text"
                                value={org.name}
                                onChange={(e) => handleUpdateOrganization(org.id, 'name', e.target.value)}
                                placeholder="Tata Motors Commercial Vehicles Ltd."
                                className="w-full h-10 px-3.5 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all shadow-2xs"
                              />
                            </div>

                            {/* 2. Designation */}
                            <div>
                              <label className="block text-xs font-bold text-gray-800 dark:text-gray-200 mb-1.5">
                                2. Designation
                              </label>
                              <input
                                type="text"
                                value={org.desig}
                                onChange={(e) => handleUpdateOrganization(org.id, 'desig', e.target.value)}
                                placeholder="Assistant Engineer — Fleet Electrification"
                                className="w-full h-10 px-3.5 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all shadow-2xs"
                              />
                            </div>

                            {/* 3. Department */}
                            <div>
                              <label className="block text-xs font-bold text-gray-800 dark:text-gray-200 mb-1.5">
                                3. Department
                              </label>
                              <input
                                type="text"
                                value={org.dept}
                                onChange={(e) => handleUpdateOrganization(org.id, 'dept', e.target.value)}
                                placeholder="Electric Mobility Engineering"
                                className="w-full h-10 px-3.5 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all shadow-2xs"
                              />
                            </div>

                            {/* 4. Reporting Supervisor */}
                            <div>
                              <label className="block text-xs font-bold text-gray-800 dark:text-gray-200 mb-1.5">
                                4. Reporting Supervisor
                              </label>
                              <input
                                type="text"
                                value={org.supervisor}
                                onChange={(e) => handleUpdateOrganization(org.id, 'supervisor', e.target.value)}
                                placeholder="Sanjay Kulkarni (Senior Manager)"
                                className="w-full h-10 px-3.5 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all shadow-2xs"
                              />
                            </div>

                            {/* 7. Tenure */}
                            <div>
                              <label className="block text-xs font-bold text-gray-800 dark:text-gray-200 mb-1.5">
                                7. Total Tenure
                              </label>
                              <input
                                type="text"
                                value={org.tenure}
                                onChange={(e) => handleUpdateOrganization(org.id, 'tenure', e.target.value)}
                                placeholder="2 Years 2 Months"
                                className="w-full h-10 px-3.5 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all shadow-2xs"
                              />
                            </div>

                            {/* 5. Date of Joining */}
                            <div>
                              <label className="block text-xs font-bold text-gray-800 dark:text-gray-200 mb-1.5">
                                5. Date of Joining
                              </label>
                              <input
                                type="date"
                                value={org.doj}
                                onChange={(e) => handleUpdateOrganization(org.id, 'doj', e.target.value)}
                                className="w-full h-10 px-3.5 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs sm:text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all shadow-2xs"
                              />
                            </div>

                            {/* 6. Last Working Date */}
                            <div>
                              <label className="block text-xs font-bold text-gray-800 dark:text-gray-200 mb-1.5">
                                6. Last Working Date
                              </label>
                              {org.isCurrent ? (
                                <div className="w-full h-10 px-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-300 flex items-center justify-between shadow-2xs">
                                  <span className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span>Present (Currently Working Here)</span>
                                  </span>
                                  <span className="text-[10px] font-mono uppercase text-emerald-600 dark:text-emerald-400 font-extrabold">Till Date</span>
                                </div>
                              ) : (
                                <input
                                  type="date"
                                  value={org.lwd}
                                  onChange={(e) => handleUpdateOrganization(org.id, 'lwd', e.target.value)}
                                  className="w-full h-10 px-3.5 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs sm:text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all shadow-2xs"
                                />
                              )}
                            </div>
                          </div>

                          {/* Bottom Bar: Small Button to Upload Relieving Letter */}
                          <div className="pt-3 border-t border-gray-100 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-lg bg-blue-500/10 text-[#2563EB] dark:text-blue-400 flex items-center justify-center shrink-0">
                                <FileText className="w-3.5 h-3.5" />
                              </span>
                              <div>
                                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                                  Relieving Letter / Service Certificate
                                </span>
                                <span className="hidden sm:inline text-[10.5px] text-gray-400 dark:text-gray-500 ml-1.5 font-medium">
                                  (Official relieving or experience document)
                                </span>
                              </div>
                            </div>

                            {/* Hidden Native File Input */}
                            <input
                              id={`org-relieving-input-${org.id}`}
                              type="file"
                              accept=".pdf,image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                const reader = new FileReader();
                                reader.onload = (ev) => {
                                  handleCandidateFileUpload(`org-relieving-${org.id}`, {
                                    name: file.name,
                                    url: ev.target?.result,
                                  });
                                };
                                reader.readAsDataURL(file);
                              }}
                            />

                            {/* Upload / View Button */}
                            {candidateFiles[`org-relieving-${org.id}`] ? (
                              <div className="flex items-center gap-1.5 shrink-0">
                                <button
                                  type="button"
                                  onClick={() => {
                                    const fileData = candidateFiles[`org-relieving-${org.id}`];
                                    setViewingDocModal({
                                      title: `Relieving Letter — ${org.name || `Organization #${oIdx + 1}`}`,
                                      fileName: typeof fileData === 'object' && fileData.name ? fileData.name : `${org.name || 'Organization'}_Relieving_Letter.pdf`,
                                      imageUrl: typeof fileData === 'object' && fileData.url ? fileData.url : getDocMock('Relieving Letter'),
                                      number: org.name || 'Verified',
                                    });
                                  }}
                                  className="h-8 px-3 rounded-lg bg-black hover:bg-gray-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                                  title="Click to view uploaded document"
                                >
                                  <Eye className="w-3.5 h-3.5 text-white" />
                                  <span>View</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => document.getElementById(`org-relieving-input-${org.id}`)?.click()}
                                  className="h-8 w-8 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 hover:text-[#2563EB] flex items-center justify-center cursor-pointer transition-all shadow-2xs"
                                  title="Click to replace file"
                                >
                                  <Repeat className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => document.getElementById(`org-relieving-input-${org.id}`)?.click()}
                                className="h-8 px-3 rounded-lg border border-gray-300 hover:border-[#2563EB] dark:border-white/15 dark:hover:border-blue-400 bg-white hover:bg-gray-50 dark:bg-white/5 dark:hover:bg-white/10 text-gray-700 hover:text-[#2563EB] dark:text-gray-200 dark:hover:text-blue-400 text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer select-none group"
                                title="Click to upload relieving letter"
                              >
                                <UploadCloud className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 group-hover:text-[#2563EB] dark:group-hover:text-blue-400 transition-colors" />
                                <span>Upload Relieving Letter</span>
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SUBSECTION 2: PROFESSIONAL REFERENCE */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-2 pb-1 border-b border-gray-100 dark:border-white/10">
                      <span className="w-5 h-5 rounded-md bg-teal-500/15 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                        <Users className="w-3.5 h-3.5" />
                      </span>
                      <h4 className="text-xs sm:text-sm font-extrabold tracking-tight text-gray-900 dark:text-white uppercase">
                        Professional Reference
                      </h4>
                    </div>

                    <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-gray-200/90 dark:border-white/10 bg-white dark:bg-[#121A28]/40 shadow-xs space-y-4 hover:border-gray-300 dark:hover:border-white/20 transition-all">
                      {/* 2-Column Responsive Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-800 dark:text-gray-200 mb-1.5">
                            1. Person Name
                          </label>
                          <input
                            type="text"
                            value={experienceReference.name}
                            onChange={(e) => setExperienceReference((prev) => ({ ...prev, name: e.target.value }))}
                            placeholder="Dr. Rajesh Menon"
                            className="w-full h-10 px-3.5 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all shadow-2xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-800 dark:text-gray-200 mb-1.5">
                            2. Organization Name
                          </label>
                          <input
                            type="text"
                            value={experienceReference.org}
                            onChange={(e) => setExperienceReference((prev) => ({ ...prev, org: e.target.value }))}
                            placeholder="Tata Motors CV"
                            className="w-full h-10 px-3.5 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all shadow-2xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-800 dark:text-gray-200 mb-1.5">
                            3. Designation
                          </label>
                          <input
                            type="text"
                            value={experienceReference.desig}
                            onChange={(e) => setExperienceReference((prev) => ({ ...prev, desig: e.target.value }))}
                            placeholder="Chief Technical Officer"
                            className="w-full h-10 px-3.5 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all shadow-2xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-800 dark:text-gray-200 mb-1.5">
                            4. Department
                          </label>
                          <input
                            type="text"
                            value={experienceReference.dept}
                            onChange={(e) => setExperienceReference((prev) => ({ ...prev, dept: e.target.value }))}
                            placeholder="R&D Powertrain"
                            className="w-full h-10 px-3.5 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all shadow-2xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-800 dark:text-gray-200 mb-1.5">
                            5. Contact Number
                          </label>
                          <input
                            type="text"
                            value={experienceReference.contact}
                            onChange={(e) => setExperienceReference((prev) => ({ ...prev, contact: e.target.value }))}
                            placeholder="+91 98201 54321"
                            className="w-full h-10 px-3.5 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all shadow-2xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-800 dark:text-gray-200 mb-1.5">
                            6. Reporting Supervisor
                          </label>
                          <input
                            type="text"
                            value={experienceReference.supervisor}
                            onChange={(e) => setExperienceReference((prev) => ({ ...prev, supervisor: e.target.value }))}
                            placeholder="Yes (Direct Head)"
                            className="w-full h-10 px-3.5 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all shadow-2xs"
                          />
                        </div>
                      </div>

                      {/* Row 3: Relationship */}
                      <div className="pt-3 border-t border-gray-100 dark:border-white/10 flex items-center gap-4 flex-wrap">
                        <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                          7. How are you related?
                        </span>
                        <div className="flex items-center gap-4">
                          {['Colleague', 'Friend', 'Relative'].map((relOption) => {
                            const isChecked = experienceReference.relation === relOption;
                            return (
                              <label
                                key={relOption}
                                onClick={() => setExperienceReference((prev) => ({ ...prev, relation: relOption }))}
                                className="flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-gray-700 dark:text-gray-300 select-none"
                              >
                                <input
                                  type="radio"
                                  name="experience-relation"
                                  checked={isChecked}
                                  onChange={() => setExperienceReference((prev) => ({ ...prev, relation: relOption }))}
                                  className="w-4 h-4 text-[#2563EB] focus:ring-[#2563EB] accent-[#2563EB] cursor-pointer"
                                />
                                <span>{relOption}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SUBSECTION 3: CONTACTS OF COLLEAGUES FROM LAST ORGANIZATION */}
                  <div className="space-y-3 pt-2">
                    <div className="pb-1 border-b border-gray-100 dark:border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-md bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                          <Users className="w-3.5 h-3.5" />
                        </span>
                        <h4 className="text-xs sm:text-sm font-extrabold tracking-tight text-gray-900 dark:text-white uppercase">
                          Contacts of Colleagues from Last Organization
                        </h4>
                      </div>
                      <p className="text-[10.5px] text-gray-500 dark:text-gray-400 mt-0.5">
                        Peer verification contacts from your most recent organization.
                      </p>
                    </div>

                    {/* 3-Column Grid of Colleagues */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                      {experienceColleagues.map((col, cIdx) => (
                        <div
                          key={col.id}
                          className="p-3.5 rounded-2xl border border-gray-200/90 dark:border-white/10 bg-white dark:bg-[#121A28]/50 shadow-2xs space-y-2.5 hover:border-gray-300 dark:hover:border-white/20 transition-all"
                        >
                          <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/5 pb-2">
                            <span className="text-xs font-extrabold text-gray-900 dark:text-white">
                              Colleague #{cIdx + 1}
                            </span>
                            <span className="text-[10.5px] font-mono text-gray-400">
                              Reference #{cIdx + 1}
                            </span>
                          </div>

                          <div>
                            <label className="block text-[10.5px] font-semibold text-gray-700 dark:text-gray-300 mb-0.5">
                              1. Person Name
                            </label>
                            <input
                              type="text"
                              value={col.name}
                              onChange={(e) => handleUpdateColleague(col.id, 'name', e.target.value)}
                              placeholder="Amitabh Sen"
                              className="w-full h-8 px-2.5 rounded-lg border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs text-gray-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                            />
                          </div>

                          <div>
                            <label className="block text-[10.5px] font-semibold text-gray-700 dark:text-gray-300 mb-0.5">
                              2. Organization
                            </label>
                            <input
                              type="text"
                              value={col.org}
                              onChange={(e) => handleUpdateColleague(col.id, 'org', e.target.value)}
                              placeholder="Tata Motors CV"
                              className="w-full h-8 px-2.5 rounded-lg border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs text-gray-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                            />
                          </div>

                          <div>
                            <label className="block text-[10.5px] font-semibold text-gray-700 dark:text-gray-300 mb-0.5">
                              3. Designation & Department
                            </label>
                            <input
                              type="text"
                              value={col.desigDept}
                              onChange={(e) => handleUpdateColleague(col.id, 'desigDept', e.target.value)}
                              placeholder="Fleet Quality Lead"
                              className="w-full h-8 px-2.5 rounded-lg border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs text-gray-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                            />
                          </div>

                          <div>
                            <label className="block text-[10.5px] font-semibold text-gray-700 dark:text-gray-300 mb-0.5">
                              4. Contact Number
                            </label>
                            <input
                              type="text"
                              value={col.phone}
                              onChange={(e) => handleUpdateColleague(col.id, 'phone', e.target.value)}
                              placeholder="+91 98192 11223"
                              className="w-full h-8 px-2.5 rounded-lg border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs text-gray-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : activeSectionId === 'sec-education' ? (
                /* =========================================================================
                   ACADEMIC QUALIFICATIONS TILES (MATCHING USER UI MOCKUP)
                   - SSC Qualification #1
                   - HSC Qualification #2
                   - Diploma Qualification #3
                   - Degree Qualification #4
                   - Zero Delete Button
                   ========================================================================= */
                <div className="space-y-6 flex-1">
                  {/* SECTION HEADER */}
                  <div className="pb-1 border-b border-gray-100 dark:border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md bg-[#548235]/15 text-[#548235] dark:text-[#76B84A] flex items-center justify-center">
                        <GraduationCap className="w-3.5 h-3.5" />
                      </span>
                      <h4 className="text-xs sm:text-sm font-extrabold tracking-tight text-gray-900 dark:text-white uppercase">
                        Academic Qualifications & Marksheet Uploads
                      </h4>
                    </div>
                    <p className="text-[10.5px] text-gray-500 dark:text-gray-400 mt-0.5">
                      Passing Year, Course Type, Stream/Specialization, Percentage, Grade, Institute/Board Name, Marksheet Proofs
                    </p>
                  </div>

                  {/* QUALIFICATIONS LIST OF TILES */}
                  <div className="space-y-4">
                    {educationRecords.map((rec, rIdx) => {
                      const fileObj = candidateFiles[rec.fileKey];
                      const hasFile = Boolean(fileObj);
                      const fileName = typeof fileObj === 'string' ? fileObj : fileObj?.name || '';
                      const fileUrl =
                        typeof fileObj === 'object' && fileObj?.url
                          ? fileObj.url
                          : getDocMock(rec.name, rec.percentage);
                      const fileInputId = `real-system-edu-input-${rec.id}`;

                      const handleFileSelect = (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const isImg = file.type.startsWith('image/');
                        if (isImg) {
                          const reader = new FileReader();
                          reader.onload = (uploadEv) => {
                            handleCandidateFileUpload(rec.fileKey, {
                              name: file.name,
                              url: uploadEv.target?.result,
                            });
                          };
                          reader.readAsDataURL(file);
                        } else {
                          handleCandidateFileUpload(rec.fileKey, {
                            name: file.name,
                            url: getDocMock(rec.name, rec.percentage),
                          });
                        }
                      };

                      return (
                        <div
                          key={rec.id}
                          className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-gray-200/90 dark:border-white/10 bg-white dark:bg-[#121A28]/40 shadow-xs space-y-4 hover:border-gray-300 dark:hover:border-white/20 transition-all"
                        >
                          {/* Header: Tag + Title + Index Badge (NO Delete Button for default qualifications) */}
                          <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-white/10">
                            <div className="flex items-center gap-2.5">
                              <span className="px-3 py-1 rounded-full text-xs font-black bg-[#548235]/15 text-[#548235] dark:text-[#76B84A] border border-[#548235]/30 tracking-wide uppercase">
                                {rec.tag}
                              </span>
                              <span className="text-xs sm:text-sm font-bold text-gray-500 dark:text-gray-400">
                                {rec.title}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 font-bold border border-gray-200/80 dark:border-white/10">
                                0{rIdx + 1}
                              </span>
                              {rec.isCustom && (
                                <button
                                  type="button"
                                  onClick={() => handleRemoveEducationRecord(rec.id)}
                                  className="p-1 rounded-md text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all cursor-pointer"
                                  title="Remove Qualification"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Hidden Native File Input */}
                          <input
                            id={fileInputId}
                            type="file"
                            accept="image/*,.pdf"
                            onChange={handleFileSelect}
                            className="hidden"
                          />

                          {/* Row 1: 5 Columns on Desktop (Stream / Specialization First from Left) */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4">
                            {/* 1. Stream / Specialization (First on Left - 4 cols) */}
                            <div className="sm:col-span-2 lg:col-span-4">
                              <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-400 mb-1">
                                Stream / Specialization
                              </label>
                              <input
                                type="text"
                                value={rec.stream}
                                onChange={(e) =>
                                  handleUpdateEducationRecord(rec.id, 'stream', e.target.value)
                                }
                                placeholder={rec.placeholderStream || 'e.g. Science / Mechanical'}
                                className="w-full h-10 px-3.5 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all shadow-2xs"
                              />
                            </div>

                            {/* 2. Passing Year (2 cols) */}
                            <div className="lg:col-span-2">
                              <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-400 mb-1">
                                Passing Year
                              </label>
                              <input
                                type="text"
                                value={rec.passingYear}
                                onChange={(e) =>
                                  handleUpdateEducationRecord(rec.id, 'passingYear', e.target.value)
                                }
                                placeholder={rec.placeholderYear || 'e.g. 2014'}
                                className="w-full h-10 px-3.5 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all shadow-2xs"
                              />
                            </div>

                            {/* 3. Course Type (2 cols) */}
                            <div className="lg:col-span-2">
                              <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-400 mb-1">
                                Course Type
                              </label>
                              <div className="relative">
                                <select
                                  value={rec.courseType}
                                  onChange={(e) =>
                                    handleUpdateEducationRecord(rec.id, 'courseType', e.target.value)
                                  }
                                  className="w-full h-10 px-3.5 pr-8 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-[#121A28] text-xs sm:text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all shadow-2xs appearance-none cursor-pointer"
                                >
                                  <option value="Full-Time">Full-Time</option>
                                  <option value="Part-Time">Part-Time</option>
                                  <option value="Distance">Distance</option>
                                  <option value="Correspondence">Correspondence</option>
                                </select>
                                <ChevronDown className="w-4 h-4 text-gray-400 pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
                              </div>
                            </div>

                            {/* 4. Percentage % (2 cols) */}
                            <div className="lg:col-span-2">
                              <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-400 mb-1">
                                Percentage %
                              </label>
                              <input
                                type="text"
                                value={rec.percentage}
                                onChange={(e) =>
                                  handleUpdateEducationRecord(rec.id, 'percentage', e.target.value)
                                }
                                placeholder={rec.placeholderPct || '84.5'}
                                className="w-full h-10 px-3.5 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all shadow-2xs"
                              />
                            </div>

                            {/* 5. Grade (2 cols) */}
                            <div className="lg:col-span-2">
                              <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-400 mb-1">
                                Grade
                              </label>
                              <input
                                type="text"
                                value={rec.grade}
                                onChange={(e) =>
                                  handleUpdateEducationRecord(rec.id, 'grade', e.target.value)
                                }
                                placeholder={rec.placeholderGrade || 'Distinction'}
                                className="w-full h-10 px-3.5 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all shadow-2xs"
                              />
                            </div>
                          </div>

                          {/* Row 2: Institute Name + Upload Marksheet (8 + 4 cols) */}
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
                            {/* Institute / College / Board Name (8 cols) */}
                            <div className="lg:col-span-8">
                              <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-400 mb-1">
                                Institute / College / Board Name
                              </label>
                              <input
                                type="text"
                                value={rec.institute}
                                onChange={(e) =>
                                  handleUpdateEducationRecord(rec.id, 'institute', e.target.value)
                                }
                                placeholder={rec.placeholderInst || 'State Board School / University Name'}
                                className="w-full h-10 px-3.5 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all shadow-2xs"
                              />
                            </div>

                            {/* Upload Marksheet (4 cols) */}
                            <div className="lg:col-span-4">
                              <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-400 mb-1">
                                Upload Marksheet
                              </label>
                              {hasFile ? (
                                <div className="flex items-center gap-1.5 w-full">
                                  {/* Uploaded Button: 100% black fill, image thumbnail over it at 60% opacity, white text "View" */}
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setViewingDocModal({
                                        title: `${rec.tag} Marksheet / Certificate`,
                                        fileName: fileName || `${rec.tag}_Marksheet.pdf`,
                                        imageUrl: fileUrl,
                                        number: rec.percentage ? `${rec.percentage}%` : 'Recorded',
                                      })
                                    }
                                    className="relative overflow-hidden flex-1 h-10 rounded-xl bg-black border border-black flex items-center justify-center cursor-pointer transition-all shadow-xs group"
                                    title="Click to view marksheet in popout"
                                  >
                                    <img
                                      src={fileUrl}
                                      alt="Marksheet Thumbnail"
                                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-75 group-hover:scale-105 transition-all"
                                    />
                                    <span className="relative z-10 flex items-center gap-1.5 text-white font-extrabold text-xs drop-shadow-md tracking-wide">
                                      <Eye className="w-3.5 h-3.5 text-white" />
                                      <span>View {rec.tag} Doc</span>
                                    </span>
                                  </button>

                                  {/* Re-upload button with Repeat icon to open system folder to replace file */}
                                  <button
                                    type="button"
                                    onClick={() => document.getElementById(fileInputId)?.click()}
                                    className="h-10 w-10 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 hover:text-[#2563EB] flex items-center justify-center cursor-pointer transition-all shadow-2xs shrink-0"
                                    title="Click to open system folder and choose another file to replace"
                                  >
                                    <Repeat className="w-4 h-4" />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => document.getElementById(fileInputId)?.click()}
                                  className="w-full h-10 px-4 rounded-xl border border-gray-300 hover:border-gray-400 dark:border-white/15 dark:hover:border-white/25 bg-white hover:bg-gray-50 dark:bg-white/5 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs group"
                                  title="Click to open system folder and choose marksheet file"
                                >
                                  <Upload className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 group-hover:text-[#2563EB] transition-colors" />
                                  <span className="group-hover:text-[#2563EB] transition-colors">
                                    {rec.docLabel}
                                  </span>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Additional Action: Add More Education Button */}
                  <div className="pt-1 flex justify-start">
                    <button
                      type="button"
                      onClick={handleAddEducationRecord}
                      className="px-4 py-2 rounded-xl border border-gray-300 hover:border-[#2563EB] dark:border-white/15 dark:hover:border-blue-400 bg-white hover:bg-gray-50 dark:bg-white/5 dark:hover:bg-white/10 text-gray-800 dark:text-gray-200 hover:text-[#2563EB] dark:hover:text-blue-400 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-2xs group"
                    >
                      <Plus className="w-4 h-4 text-[#2563EB] dark:text-blue-400 group-hover:scale-110 transition-transform" />
                      <span>+ Add More Education</span>
                    </button>
                  </div>

                  {/* =========================================================================
                   SUBSECTION 2: CERTIFICATIONS (2 HARDCODED DEFAULT TILES + ADD MORE AT BOTTOM)
                   ========================================================================= */}
                  <div className="pt-6 border-t border-gray-100 dark:border-white/10 space-y-4">
                    {/* Certifications Header */}
                    <div className="flex items-center gap-2.5 pb-2 border-b border-gray-100 dark:border-white/10">
                      <span className="w-6 h-6 rounded-md bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                        <Award className="w-4 h-4" />
                      </span>
                      <div>
                        <h4 className="text-xs sm:text-sm font-extrabold tracking-tight text-gray-900 dark:text-white uppercase">
                          Certifications (Technical & EV Domain)
                        </h4>
                        <p className="text-[10.5px] text-gray-500 dark:text-gray-400 mt-0.5">
                          Certificate Name, Specialization, Institute, Date, Validity, Re-validation Date & Scan
                        </p>
                      </div>
                    </div>

                    {/* Certifications 2-Column Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {certificationsList.map((cert) => {
                        const fileObj = candidateFiles[cert.fileKey];
                        const hasFile = Boolean(fileObj);
                        const fileName = typeof fileObj === 'string' ? fileObj : fileObj?.name || '';
                        const fileUrl =
                          typeof fileObj === 'object' && fileObj?.url
                            ? fileObj.url
                            : getDocMock(cert.name || 'Certificate', cert.validity || 'Valid');
                        const fileInputId = `real-system-cert-input-${cert.id}`;

                        const handleCertFileSelect = (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const isImg = file.type.startsWith('image/');
                          if (isImg) {
                            const reader = new FileReader();
                            reader.onload = (uploadEv) => {
                              handleCandidateFileUpload(cert.fileKey, {
                                name: file.name,
                                url: uploadEv.target?.result,
                              });
                            };
                            reader.readAsDataURL(file);
                          } else {
                            handleCandidateFileUpload(cert.fileKey, {
                              name: file.name,
                              url: getDocMock(cert.name, cert.validity),
                            });
                          }
                        };

                        return (
                          <div
                            key={cert.id}
                            className="p-4 sm:p-5 rounded-2xl border border-gray-200/90 dark:border-white/10 bg-white dark:bg-[#121A28]/40 shadow-xs space-y-3.5 hover:border-gray-300 dark:hover:border-white/20 transition-all flex flex-col justify-between"
                          >
                            {/* Hidden File Input */}
                            <input
                              id={fileInputId}
                              type="file"
                              accept="image/*,.pdf"
                              onChange={handleCertFileSelect}
                              className="hidden"
                            />

                            <div className="space-y-3">
                              {/* Header: Title (NO delete button for the 2 hardcoded default tiles; trash icon only on custom additions) */}
                              <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-white/10">
                                <span className="text-xs sm:text-sm font-extrabold text-gray-900 dark:text-white tracking-tight">
                                  {cert.title}
                                </span>
                                {cert.isCustom && (
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveCertification(cert.id)}
                                    className="p-1 rounded-md text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all cursor-pointer"
                                    title="Remove Certification"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>

                              {/* Certificate Name - Full Width */}
                              <div>
                                <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-400 mb-1">
                                  Certificate Name
                                </label>
                                <input
                                  type="text"
                                  value={cert.name}
                                  onChange={(e) => handleUpdateCertification(cert.id, 'name', e.target.value)}
                                  placeholder={cert.placeholderName || 'High Voltage EV Safety & ISO 26262'}
                                  className="w-full h-10 px-3.5 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all shadow-2xs"
                                />
                              </div>

                              {/* Row: Specialization + Institute / Body */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-400 mb-1">
                                    Specialization
                                  </label>
                                  <input
                                    type="text"
                                    value={cert.specialization}
                                    onChange={(e) =>
                                      handleUpdateCertification(cert.id, 'specialization', e.target.value)
                                    }
                                    placeholder={cert.placeholderSpec || 'Electric Vehicle Safety'}
                                    className="w-full h-10 px-3.5 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all shadow-2xs"
                                  />
                                </div>

                                <div>
                                  <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-400 mb-1">
                                    Institute / Body
                                  </label>
                                  <input
                                    type="text"
                                    value={cert.institute}
                                    onChange={(e) => handleUpdateCertification(cert.id, 'institute', e.target.value)}
                                    placeholder={cert.placeholderInst || 'ARAI / SAE India'}
                                    className="w-full h-10 px-3.5 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all shadow-2xs"
                                  />
                                </div>
                              </div>

                              {/* Row: Issue Date + Validity / Re-validation */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-400 mb-1">
                                    Issue Date
                                  </label>
                                  <input
                                    type="date"
                                    value={cert.issueDate}
                                    onChange={(e) => handleUpdateCertification(cert.id, 'issueDate', e.target.value)}
                                    className="w-full h-10 px-3.5 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs sm:text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all shadow-2xs"
                                  />
                                </div>

                                <div>
                                  <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-400 mb-1">
                                    Validity / Re-validation
                                  </label>
                                  <input
                                    type="text"
                                    value={cert.validity}
                                    onChange={(e) => handleUpdateCertification(cert.id, 'validity', e.target.value)}
                                    placeholder={cert.placeholderVal || '5 Years / Lifetime'}
                                    className="w-full h-10 px-3.5 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all shadow-2xs"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Upload Certificate Action */}
                            <div className="pt-1">
                              {hasFile ? (
                                <div className="flex items-center gap-1.5 w-full">
                                  {/* Uploaded Button */}
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setViewingDocModal({
                                        title: cert.name || cert.title,
                                        fileName: fileName || `${cert.title.replace(/\s+/g, '_')}_Document.pdf`,
                                        imageUrl: fileUrl,
                                        number: cert.validity || 'Verified Scan',
                                      })
                                    }
                                    className="relative overflow-hidden flex-1 h-10 rounded-xl bg-black border border-black flex items-center justify-center cursor-pointer transition-all shadow-xs group"
                                    title="Click to view certificate"
                                  >
                                    <img
                                      src={fileUrl}
                                      alt="Certificate Thumbnail"
                                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-75 group-hover:scale-105 transition-all"
                                    />
                                    <span className="relative z-10 flex items-center gap-1.5 text-white font-extrabold text-xs drop-shadow-md tracking-wide">
                                      <Eye className="w-3.5 h-3.5 text-white" />
                                      <span>View Certificate</span>
                                    </span>
                                  </button>

                                  {/* Replace Button */}
                                  <button
                                    type="button"
                                    onClick={() => document.getElementById(fileInputId)?.click()}
                                    className="h-10 w-10 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 hover:text-[#2563EB] flex items-center justify-center cursor-pointer transition-all shadow-2xs shrink-0"
                                    title="Replace certificate"
                                  >
                                    <Repeat className="w-4 h-4" />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => document.getElementById(fileInputId)?.click()}
                                  className="w-full sm:w-auto h-9 px-4 rounded-xl border border-gray-300 hover:border-gray-400 dark:border-white/15 dark:hover:border-white/25 bg-white hover:bg-gray-50 dark:bg-white/5 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-2xs group"
                                  title="Click to open system folder and upload certificate"
                                >
                                  <Upload className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 group-hover:text-[#2563EB] transition-colors" />
                                  <span className="group-hover:text-[#2563EB] transition-colors">
                                    Upload Certificate
                                  </span>
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Add More Certification Button at Bottom */}
                    <div className="pt-2 flex justify-start">
                      <button
                        type="button"
                        onClick={handleAddCertification}
                        className="px-4 py-2 rounded-xl border border-gray-300 hover:border-[#2563EB] dark:border-white/15 dark:hover:border-blue-400 bg-white hover:bg-gray-50 dark:bg-white/5 dark:hover:bg-white/10 text-gray-800 dark:text-gray-200 hover:text-[#2563EB] dark:hover:text-blue-400 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-2xs group"
                      >
                        <Plus className="w-4 h-4 text-[#2563EB] dark:text-blue-400 group-hover:scale-110 transition-transform" />
                        <span>+ Add More Certification</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : activeSectionId === 'sec-family' ? (
                <div className="space-y-8 flex-1">
                  {/* =========================================================================
                    TOPIC 1: FAMILY DETAILS (STARTS WITH 4 OPTIONS, CAN ADD MORE)
                    ========================================================================= */}
                  <div className="space-y-3.5">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                        <Users className="w-3.5 h-3.5" />
                      </span>
                      <div>
                        <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-gray-900 dark:text-white">
                          Family Details (Starts with 4 Options, Can Add More)
                        </h4>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400">
                          Person Name, Relation, Gender, Date of Birth
                        </p>
                      </div>
                    </div>

                    {/* 2x2 Grid of Family Member Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
                      {familyMembersList.map((m) => (
                        <div
                          key={m.id}
                          className="p-3.5 sm:p-4 rounded-2xl border border-gray-200/90 dark:border-white/10 bg-white dark:bg-[#121A28]/40 shadow-2xs hover:border-gray-300 dark:hover:border-white/20 transition-all space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
                              {m.title}
                            </span>
                          </div>

                          {/* Row 1: Person Name & Relation */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <div>
                              <label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 block mb-1">
                                A) Person Name
                              </label>
                              <input
                                type="text"
                                value={m.name}
                                onChange={(e) => handleUpdateFamilyMember(m.id, 'name', e.target.value)}
                                placeholder="Full Name"
                                className="w-full h-9 px-3 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all shadow-2xs"
                              />
                            </div>

                            <div>
                              <label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 block mb-1">
                                B) Relation
                              </label>
                              <input
                                type="text"
                                value={m.relation}
                                onChange={(e) => handleUpdateFamilyMember(m.id, 'relation', e.target.value)}
                                placeholder="Relation"
                                className="w-full h-9 px-3 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all shadow-2xs"
                              />
                            </div>
                          </div>

                          {/* Row 2: Gender & DOB */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <div className="relative">
                              <label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 block mb-1">
                                C) Gender
                              </label>
                              <div className="relative">
                                <select
                                  value={m.gender}
                                  onChange={(e) => handleUpdateFamilyMember(m.id, 'gender', e.target.value)}
                                  className="w-full h-9 pl-3 pr-8 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs text-gray-900 dark:text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all shadow-2xs"
                                >
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                  <option value="Other">Other</option>
                                </select>
                                <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                              </div>
                            </div>

                            <div>
                              <label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 block mb-1">
                                D) DOB
                              </label>
                              <input
                                type="date"
                                value={m.dob}
                                onChange={(e) => handleUpdateFamilyMember(m.id, 'dob', e.target.value)}
                                className="w-full h-9 px-3 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all shadow-2xs"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Add More Family Member Button Bellow Topic */}
                    <div className="pt-1 flex justify-start">
                      <button
                        type="button"
                        onClick={handleAddFamilyMember}
                        className="px-4 py-2 rounded-xl border border-gray-300 hover:border-[#2563EB] dark:border-white/15 dark:hover:border-blue-400 bg-white hover:bg-gray-50 dark:bg-white/5 dark:hover:bg-white/10 text-gray-800 dark:text-gray-200 hover:text-[#2563EB] dark:hover:text-blue-400 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-2xs group"
                      >
                        <Plus className="w-4 h-4 text-[#2563EB] dark:text-blue-400 group-hover:scale-110 transition-transform" />
                        <span>+ Add Family Member</span>
                      </button>
                    </div>
                  </div>

                  {/* =========================================================================
                    TOPIC 2: FOR HEALTH AND WELL BEING (STARTS WITH 4 OPTIONS, CAN ADD MORE)
                    ========================================================================= */}
                  <div className="space-y-3.5 pt-4 border-t border-gray-100 dark:border-white/5">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                        <HeartPulse className="w-3.5 h-3.5" />
                      </span>
                      <div>
                        <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-gray-900 dark:text-white">
                          For Health and Well Being (Starts with 4 Options, Can Add More)
                        </h4>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400">
                          Person Name, Relation, Gender, DOB, Age, Health Issue
                        </p>
                      </div>
                    </div>

                    {/* 2x2 Grid of Health Record Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
                      {healthRecordsList.map((r) => (
                        <div
                          key={r.id}
                          className="p-3.5 sm:p-4 rounded-2xl border border-gray-200/90 dark:border-white/10 bg-white dark:bg-[#121A28]/40 shadow-2xs hover:border-gray-300 dark:hover:border-white/20 transition-all space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
                              {r.title}
                            </span>
                          </div>

                          {/* Row 1: Person Name, Relation, Gender (3 cols) */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <div>
                              <label className="text-[10.5px] font-semibold text-gray-500 dark:text-gray-400 block mb-1 truncate">
                                A) Person Name
                              </label>
                              <input
                                type="text"
                                value={r.name}
                                onChange={(e) => handleUpdateHealthRecord(r.id, 'name', e.target.value)}
                                placeholder="Person Name"
                                className="w-full h-9 px-2.5 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all shadow-2xs"
                              />
                            </div>

                            <div>
                              <label className="text-[10.5px] font-semibold text-gray-500 dark:text-gray-400 block mb-1 truncate">
                                B) Relation
                              </label>
                              <input
                                type="text"
                                value={r.relation}
                                onChange={(e) => handleUpdateHealthRecord(r.id, 'relation', e.target.value)}
                                placeholder="Self / Father"
                                className="w-full h-9 px-2.5 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all shadow-2xs"
                              />
                            </div>

                            <div className="relative">
                              <label className="text-[10.5px] font-semibold text-gray-500 dark:text-gray-400 block mb-1 truncate">
                                C) Gender
                              </label>
                              <div className="relative">
                                <select
                                  value={r.gender}
                                  onChange={(e) => handleUpdateHealthRecord(r.id, 'gender', e.target.value)}
                                  className="w-full h-9 pl-2.5 pr-6 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs text-gray-900 dark:text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all shadow-2xs"
                                >
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                  <option value="Other">Other</option>
                                </select>
                                <ChevronDown className="w-3 h-3 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                              </div>
                            </div>
                          </div>

                          {/* Row 2: DOB, Age, Health Issue (3 cols) */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <div>
                              <label className="text-[10.5px] font-semibold text-gray-500 dark:text-gray-400 block mb-1 truncate">
                                D) DOB
                              </label>
                              <input
                                type="date"
                                value={r.dob}
                                onChange={(e) => handleUpdateHealthRecord(r.id, 'dob', e.target.value)}
                                className="w-full h-9 px-2 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all shadow-2xs"
                              />
                            </div>

                            <div>
                              <label className="text-[10.5px] font-semibold text-gray-500 dark:text-gray-400 block mb-1 truncate">
                                E) Age
                              </label>
                              <input
                                type="text"
                                value={r.age}
                                onChange={(e) => handleUpdateHealthRecord(r.id, 'age', e.target.value)}
                                placeholder="Age"
                                className="w-full h-9 px-2.5 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all shadow-2xs"
                              />
                            </div>

                            <div>
                              <label className="text-[10.5px] font-semibold text-gray-500 dark:text-gray-400 block mb-1 truncate">
                                F) Health Issue
                              </label>
                              <input
                                type="text"
                                value={r.issue}
                                onChange={(e) => handleUpdateHealthRecord(r.id, 'issue', e.target.value)}
                                placeholder="None"
                                className="w-full h-9 px-2.5 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all shadow-2xs"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Add More Health Record Button Bellow Topic */}
                    <div className="pt-1 flex justify-start">
                      <button
                        type="button"
                        onClick={handleAddHealthRecord}
                        className="px-4 py-2 rounded-xl border border-gray-300 hover:border-[#2563EB] dark:border-white/15 dark:hover:border-blue-400 bg-white hover:bg-gray-50 dark:bg-white/5 dark:hover:bg-white/10 text-gray-800 dark:text-gray-200 hover:text-[#2563EB] dark:hover:text-blue-400 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-2xs group"
                      >
                        <Plus className="w-4 h-4 text-[#2563EB] dark:text-blue-400 group-hover:scale-110 transition-transform" />
                        <span>+ Add Health Record</span>
                      </button>
                    </div>
                  </div>

                  {/* =========================================================================
                    TOPIC 3: MEDICLAIM COVERAGE (DEFAULT 2 OPTIONS + CAN ADD MORE)
                    ========================================================================= */}
                  <div className="space-y-3.5 pt-4 border-t border-gray-100 dark:border-white/5">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-blue-500/10 text-[#2563EB] dark:text-blue-400 flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </span>
                      <div>
                        <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-gray-900 dark:text-white">
                          Mediclaim Coverage (For Immediate Family) (Default 2 Options + Can Add More)
                        </h4>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400">
                          Nominated immediate dependents for corporate group insurance coverage.
                        </p>
                      </div>
                    </div>

                    {/* 2-Column Grid of Mediclaim Beneficiary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
                      {mediclaimList.map((b) => (
                        <div
                          key={b.id}
                          className="p-3.5 sm:p-4 rounded-2xl border border-gray-200/90 dark:border-white/10 bg-white dark:bg-[#121A28]/40 shadow-2xs hover:border-gray-300 dark:hover:border-white/20 transition-all space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
                              {b.title}
                            </span>
                          </div>

                          {/* Row 1: Person Name & Relation */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <div>
                              <label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 block mb-1">
                                A) Person Name
                              </label>
                              <input
                                type="text"
                                value={b.name}
                                onChange={(e) => handleUpdateMediclaim(b.id, 'name', e.target.value)}
                                placeholder="Dependent Name"
                                className="w-full h-9 px-3 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all shadow-2xs"
                              />
                            </div>

                            <div>
                              <label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 block mb-1">
                                B) Relation
                              </label>
                              <input
                                type="text"
                                value={b.relation}
                                onChange={(e) => handleUpdateMediclaim(b.id, 'relation', e.target.value)}
                                placeholder="Self / Spouse"
                                className="w-full h-9 px-3 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all shadow-2xs"
                              />
                            </div>
                          </div>

                          {/* Row 2: Gender & DOB */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <div className="relative">
                              <label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 block mb-1">
                                C) Gender
                              </label>
                              <div className="relative">
                                <select
                                  value={b.gender}
                                  onChange={(e) => handleUpdateMediclaim(b.id, 'gender', e.target.value)}
                                  className="w-full h-9 pl-3 pr-8 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs text-gray-900 dark:text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all shadow-2xs"
                                >
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                  <option value="Other">Other</option>
                                </select>
                                <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                              </div>
                            </div>

                            <div>
                              <label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 block mb-1">
                                D) DOB
                              </label>
                              <input
                                type="date"
                                value={b.dob}
                                onChange={(e) => handleUpdateMediclaim(b.id, 'dob', e.target.value)}
                                className="w-full h-9 px-3 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all shadow-2xs"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Add More Beneficiary Button Bellow Topic */}
                    <div className="pt-1 flex justify-start">
                      <button
                        type="button"
                        onClick={handleAddMediclaim}
                        className="px-4 py-2 rounded-xl border border-gray-300 hover:border-[#2563EB] dark:border-white/15 dark:hover:border-blue-400 bg-white hover:bg-gray-50 dark:bg-white/5 dark:hover:bg-white/10 text-gray-800 dark:text-gray-200 hover:text-[#2563EB] dark:hover:text-blue-400 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-2xs group"
                      >
                        <Plus className="w-4 h-4 text-[#2563EB] dark:text-blue-400 group-hover:scale-110 transition-transform" />
                        <span>+ Add Beneficiary</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 flex-1 items-start">
                  {activeSection.questions.map((q) => {
                    const currentValue = candidateResponses[q.id] || '';

                    // Question 22 (Languages Known) check
                    const isLanguagesKnown =
                      q.id === 'q-pers-22' ||
                      q.type === 'languages' ||
                      Boolean(q.label && q.label.toLowerCase().includes('languages known'));

                    const isAnswered = isLanguagesKnown
                      ? candidateLanguages.some((l) => l && (l.read || l.write || l.speak))
                      : currentValue !== '' &&
                      (Array.isArray(currentValue) ? currentValue.length > 0 : true);

                    // Detect Question 1 (Full Name) in Personal Details to integrate the Circular Profile Photo Uploader
                    const isPersonalFullName =
                      (activeSection.id === 'sec-personal' || activeSectionId === 'sec-personal') &&
                      q.id === 'q-pers-1';

                    const profilePhoto =
                      candidateFiles['candidate_profile_photo'] ||
                      candidateFiles['q-upl-1'] ||
                      candidateFiles['q-pers-photo'];

                    if (isPersonalFullName) {
                      return (
                        <div key={q.id} className="col-span-1 flex items-center gap-3 sm:gap-3.5">
                          {/* Hidden Native File Input for Profile Photo */}
                          <input
                            id="candidate-profile-photo-input"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const reader = new FileReader();
                              reader.onload = (uploadEv) => {
                                const photoData = {
                                  name: file.name,
                                  url: uploadEv.target?.result,
                                };
                                handleCandidateFileUpload('candidate_profile_photo', photoData);
                                handleCandidateFileUpload('q-upl-1', photoData);
                              };
                              reader.readAsDataURL(file);
                            }}
                          />

                          {/* Circular Profile Photo Upload Trigger with Sticked "Rules" Label Button */}
                          <div className="relative shrink-0 flex flex-col items-center">
                            <div
                              onClick={() => document.getElementById('candidate-profile-photo-input')?.click()}
                              className="relative w-24 sm:w-28 h-24 sm:h-28 rounded-full border border-gray-300 hover:border-[#2563EB] dark:border-white/20 dark:hover:border-blue-400 bg-gray-100/80 hover:bg-gray-200/70 dark:bg-white/5 dark:hover:bg-white/10 flex items-center justify-center text-center cursor-pointer transition-all group shadow-2xs overflow-hidden select-none"
                              title="Click to upload profile photograph"
                            >
                              {profilePhoto?.url ? (
                                <>
                                  <img
                                    src={profilePhoto.url}
                                    alt="Profile Photo"
                                    className="absolute inset-0 w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[11px] font-bold">
                                    <span>Change</span>
                                  </div>
                                </>
                              ) : (
                                <span className="p-2 text-[11.5px] sm:text-xs font-bold text-gray-700 dark:text-gray-300 group-hover:text-[#2563EB] transition-colors leading-tight">
                                  Upload<br />Your Photo
                                </span>
                              )}
                            </div>

                            {/* Sticked Small Label Button Named "Rules" at the Bottom Edge */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowPhotoRulesModal(true);
                              }}
                              className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-500 hover:bg-orange-600 text-white border border-orange-400/80 shadow-xs flex items-center gap-1 cursor-pointer z-10 whitespace-nowrap transition-all select-none hover:scale-105 active:scale-95"
                              title="Click to view candidate photograph rules and guidelines"
                            >
                              <HelpCircle className="w-2.5 h-2.5 text-white stroke-[2.5]" />
                              <span>Rules</span>
                            </button>
                          </div>

                          {/* Shifted Full Name Question Card */}
                          <div className="flex-1 min-w-0 p-3.5 sm:p-4 rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white dark:bg-[#121A28]/40 transition-all shadow-2xs hover:border-gray-300 dark:hover:border-white/20 flex flex-col justify-between">
                            <div className="flex items-start justify-between gap-2 mb-1.5">
                              <label className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200 flex items-center gap-1.5 flex-wrap">
                                <span>{q.label}</span>
                                {q.required && (
                                  <span className="text-rose-500 font-black" title="Required Field">
                                    *
                                  </span>
                                )}
                              </label>
                              {isAnswered && (
                                <span className="text-[9.5px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                                  <Check className="w-3 h-3 stroke-[3]" />
                                  <span>Filled</span>
                                </span>
                              )}
                            </div>

                            {q.helpText && (
                              <p className="text-[11px] text-gray-500 dark:text-gray-400 mb-2.5 leading-relaxed">
                                {q.helpText}
                              </p>
                            )}

                            <div>
                              <input
                                type="text"
                                value={currentValue}
                                onChange={(e) => handleCandidateChange(q.id, e.target.value)}
                                placeholder={q.placeholder || "Candidate's Full Name"}
                                className="w-full h-10 px-3.5 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all shadow-2xs"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    }

                    // Legal declaration / long terms / Languages Known span full width (2 columns); regular questions take 1 column (2 per row)
                    const isFullWidth =
                      q.fullWidth ||
                      isLanguagesKnown ||
                      q.type === 'declaration' ||
                      (q.type === 'checkbox' &&
                        (q.label?.toLowerCase().includes('declaration') ||
                          (q.options && q.options.length === 1 && q.label?.length > 40)));

                    const isDeclaration =
                      q.id === 'q-dec-1' ||
                      q.type === 'declaration' ||
                      (q.type === 'checkbox' &&
                        q.label?.toLowerCase().includes('declaration'));

                    return (
                      <div
                        key={q.id}
                        className={`p-3.5 sm:p-4 rounded-2xl transition-all flex flex-col justify-between ${isFullWidth ? 'md:col-span-2' : 'col-span-1'
                          } ${isDeclaration
                            ? 'relative overflow-hidden border border-emerald-500/30 dark:border-emerald-400/30 bg-gradient-to-br from-emerald-500/[0.08] via-teal-500/[0.04] to-blue-500/[0.08] dark:from-emerald-500/[0.14] dark:via-teal-500/[0.07] dark:to-blue-500/[0.14] shadow-xs'
                            : 'border border-gray-200/80 dark:border-white/10 bg-white dark:bg-[#121A28]/40 shadow-2xs hover:border-gray-300 dark:hover:border-white/20'
                          }`}
                      >
                        {isDeclaration && (
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-[#2563EB]" />
                        )}

                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <label className={`text-xs sm:text-sm font-bold flex items-center gap-1.5 flex-wrap ${isDeclaration ? 'text-emerald-950 dark:text-emerald-200' : 'text-gray-800 dark:text-gray-200'
                            }`}>
                            {isDeclaration && (
                              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                            )}
                            <span>{q.label}</span>
                            {q.required && (
                              <span className="text-rose-500 font-black" title="Required Field">
                                *
                              </span>
                            )}
                          </label>
                          {isAnswered && (
                            <span className="text-[9.5px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                              <Check className="w-3 h-3 stroke-[3]" />
                              <span>Filled</span>
                            </span>
                          )}
                        </div>

                        {q.helpText && (
                          <p className={`text-[11px] mb-2.5 leading-relaxed ${isDeclaration
                            ? 'text-gray-700 dark:text-gray-300 italic p-2.5 rounded-xl bg-white/70 dark:bg-white/[0.04] border border-emerald-500/15 dark:border-teal-500/20'
                            : 'text-gray-500 dark:text-gray-400'
                            }`}>
                            {q.helpText}
                          </p>
                        )}

                        {/* Interactive Form Components */}
                        <div>
                          {isLanguagesKnown ? (
                            <div className="space-y-2.5 pt-1">
                              {/* Header Legend for Read, Write, Speak */}
                              <div className="hidden sm:flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                <span>Languages Known</span>
                                <div className="flex items-center gap-2 sm:gap-3 text-center">
                                  <span className="w-20">Read</span>
                                  <span className="w-20">Write</span>
                                  <span className="w-20">Speak</span>
                                </div>
                              </div>

                              {/* Languages Rows */}
                              {candidateLanguages.map((l) => {
                                const hasAny = Boolean(l.read || l.write || l.speak);
                                const isAll = Boolean(l.read && l.write && l.speak);

                                return (
                                  <div
                                    key={l.id}
                                    className={`p-3 rounded-xl border transition-all ${hasAny
                                      ? 'border-[#2563EB]/40 bg-[#2563EB]/[0.03] dark:bg-[#2563EB]/[0.08] shadow-2xs'
                                      : 'border-gray-200/90 dark:border-white/10 bg-white dark:bg-white/[0.02] hover:border-gray-300 dark:hover:border-white/20'
                                      }`}
                                  >
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                      {/* Left: Language Name or Input */}
                                      <div className="flex items-center gap-2.5 flex-1 min-w-0">
                                        <button
                                          type="button"
                                          onClick={() => handleToggleAllForLang(l.id)}
                                          className="group flex items-center gap-2.5 text-left cursor-pointer select-none shrink-0"
                                          title={`Click to ${isAll ? 'deselect' : 'select'} all capabilities`}
                                        >
                                          <span
                                            className={`w-4 h-4 rounded-md flex items-center justify-center border text-[10px] transition-all ${isAll
                                              ? 'bg-[#2563EB] border-[#2563EB] text-white font-bold shadow-2xs'
                                              : hasAny
                                                ? 'bg-[#2563EB]/15 border-[#2563EB] text-[#2563EB] font-bold'
                                                : 'border-gray-300 dark:border-white/20 group-hover:border-[#2563EB]'
                                              }`}
                                          >
                                            {isAll ? '✓' : hasAny ? '–' : ''}
                                          </span>
                                        </button>

                                        {l.isFixed ? (
                                          <div className="flex items-center gap-2">
                                            <span className={`text-xs sm:text-sm font-bold ${hasAny ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
                                              }`}>
                                              {l.name}
                                            </span>
                                            {hasAny && (
                                              <span className="hidden md:inline-flex text-[9.5px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-[#2563EB] dark:text-blue-300 font-bold border border-blue-500/20">
                                                {[l.read && 'Read', l.write && 'Write', l.speak && 'Speak'].filter(Boolean).join(' • ')}
                                              </span>
                                            )}
                                          </div>
                                        ) : (
                                          <div className="flex items-center gap-2 flex-1 max-w-sm">
                                            <input
                                              type="text"
                                              value={l.name}
                                              onChange={(e) => handleUpdateLanguageName(l.id, e.target.value)}
                                              placeholder="Enter Language (e.g. Gujarati, Tamil, Urdu, Punjabi...)"
                                              className="w-full h-8 px-2.5 rounded-lg border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                                            />
                                            <button
                                              type="button"
                                              onClick={() => handleRemoveLanguage(l.id)}
                                              className="p-1 rounded-md text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors cursor-pointer"
                                              title="Remove language"
                                            >
                                              <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                          </div>
                                        )}
                                      </div>

                                      {/* Right: 3 Interactive Buttons (Read, Write, Speak) */}
                                      <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                                        {/* Read */}
                                        <button
                                          type="button"
                                          onClick={() => handleToggleLangCapability(l.id, 'read')}
                                          className={`w-20 sm:w-20 py-1.5 px-2 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer select-none ${l.read
                                            ? 'bg-[#2563EB] border-[#2563EB] text-white shadow-2xs font-bold scale-[1.02]'
                                            : 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-800 dark:hover:text-white'
                                            }`}
                                        >
                                          <span className={`w-3 h-3 rounded flex items-center justify-center text-[8.5px] ${l.read ? 'bg-white text-[#2563EB] font-black' : 'border border-gray-300 dark:border-white/20'
                                            }`}>
                                            {l.read && '✓'}
                                          </span>
                                          <span>Read</span>
                                        </button>

                                        {/* Write */}
                                        <button
                                          type="button"
                                          onClick={() => handleToggleLangCapability(l.id, 'write')}
                                          className={`w-20 sm:w-20 py-1.5 px-2 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer select-none ${l.write
                                            ? 'bg-[#2563EB] border-[#2563EB] text-white shadow-2xs font-bold scale-[1.02]'
                                            : 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-800 dark:hover:text-white'
                                            }`}
                                        >
                                          <span className={`w-3 h-3 rounded flex items-center justify-center text-[8.5px] ${l.write ? 'bg-white text-[#2563EB] font-black' : 'border border-gray-300 dark:border-white/20'
                                            }`}>
                                            {l.write && '✓'}
                                          </span>
                                          <span>Write</span>
                                        </button>

                                        {/* Speak */}
                                        <button
                                          type="button"
                                          onClick={() => handleToggleLangCapability(l.id, 'speak')}
                                          className={`w-20 sm:w-20 py-1.5 px-2 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer select-none ${l.speak
                                            ? 'bg-[#2563EB] border-[#2563EB] text-white shadow-2xs font-bold scale-[1.02]'
                                            : 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-800 dark:hover:text-white'
                                            }`}
                                        >
                                          <span className={`w-3 h-3 rounded flex items-center justify-center text-[8.5px] ${l.speak ? 'bg-white text-[#2563EB] font-black' : 'border border-gray-300 dark:border-white/20'
                                            }`}>
                                            {l.speak && '✓'}
                                          </span>
                                          <span>Speak</span>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}

                              {/* + Add More Language Option Button */}
                              <div className="pt-1 flex justify-start">
                                <button
                                  type="button"
                                  onClick={handleAddLanguage}
                                  className="px-4 py-2 rounded-xl border border-gray-300 hover:border-[#2563EB] dark:border-white/15 dark:hover:border-blue-400 bg-white hover:bg-gray-50 dark:bg-white/5 dark:hover:bg-white/10 text-gray-800 dark:text-gray-200 hover:text-[#2563EB] dark:hover:text-blue-400 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-2xs group"
                                >
                                  <Plus className="w-4 h-4 text-[#2563EB] dark:text-blue-400 group-hover:scale-110 transition-transform" />
                                  <span>+ Add More Language</span>
                                </button>
                              </div>
                            </div>
                          ) : (
                            <>
                              {q.type === 'text' && (
                                <input
                                  type="text"
                                  value={currentValue}
                                  onChange={(e) => handleCandidateChange(q.id, e.target.value)}
                                  placeholder={q.placeholder || 'Type your response here...'}
                                  className="w-full h-10 px-3.5 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all shadow-2xs"
                                />
                              )}

                              {q.type === 'date' && (
                                <input
                                  type="date"
                                  value={currentValue}
                                  onChange={(e) => handleCandidateChange(q.id, e.target.value)}
                                  className="w-full h-10 px-3.5 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs sm:text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all shadow-2xs"
                                />
                              )}

                              {q.type === 'number' && (
                                <div className="relative">
                                  <input
                                    type="number"
                                    value={currentValue}
                                    onChange={(e) => handleCandidateChange(q.id, e.target.value)}
                                    placeholder={q.placeholder || '0.00'}
                                    className="w-full h-10 pl-3.5 pr-12 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs sm:text-sm font-mono text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all shadow-2xs"
                                  />
                                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-gray-400 font-bold">
                                    NUM
                                  </span>
                                </div>
                              )}

                              {q.type === 'textarea' && (
                                <textarea
                                  rows={3}
                                  value={currentValue}
                                  onChange={(e) => handleCandidateChange(q.id, e.target.value)}
                                  placeholder={q.placeholder || 'Please provide detailed information...'}
                                  className="w-full p-3.5 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all shadow-2xs"
                                />
                              )}

                              {q.type === 'dropdown' && (
                                <div className="relative">
                                  <select
                                    value={currentValue}
                                    onChange={(e) => handleCandidateChange(q.id, e.target.value)}
                                    className="w-full h-10 pl-3.5 pr-10 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs sm:text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all shadow-2xs appearance-none cursor-pointer"
                                  >
                                    <option value="">{q.placeholder || 'Select option...'}</option>
                                    {(q.options || []).map((opt, oIdx) => (
                                      <option key={oIdx} value={opt}>
                                        {opt}
                                      </option>
                                    ))}
                                  </select>
                                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                              )}

                              {q.type === 'radio' && (
                                <div className="space-y-2">
                                  {(q.options || ['Option 1', 'Option 2']).map((opt, oIdx) => {
                                    const isChecked = currentValue === opt;
                                    return (
                                      <label
                                        key={oIdx}
                                        onClick={() => handleCandidateChange(q.id, opt)}
                                        className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all cursor-pointer shadow-2xs ${isChecked
                                          ? 'border-[#2563EB] bg-[#2563EB]/10 dark:bg-[#2563EB]/20 text-[#2563EB] dark:text-blue-300'
                                          : 'border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.03] hover:border-[#2563EB]/40 text-gray-800 dark:text-gray-200'
                                          }`}
                                      >
                                        <input
                                          type="radio"
                                          name={`candidate-radio-${q.id}`}
                                          checked={isChecked}
                                          onChange={() => handleCandidateChange(q.id, opt)}
                                          className="w-4 h-4 text-[#2563EB] focus:ring-[#2563EB] cursor-pointer"
                                        />
                                        <span className="text-xs sm:text-sm font-medium">
                                          {opt}
                                        </span>
                                      </label>
                                    );
                                  })}
                                </div>
                              )}

                              {q.type === 'checkbox' && (
                                <div className="space-y-2">
                                  {(q.options || ['Choice 1', 'Choice 2']).map((opt, oIdx) => {
                                    const selectedList = Array.isArray(currentValue) ? currentValue : [];
                                    const isChecked = selectedList.includes(opt);
                                    const toggleOption = () => {
                                      if (isChecked) {
                                        handleCandidateChange(
                                          q.id,
                                          selectedList.filter((item) => item !== opt)
                                        );
                                      } else {
                                        handleCandidateChange(q.id, [...selectedList, opt]);
                                      }
                                    };

                                    return (
                                      <label
                                        key={oIdx}
                                        onClick={toggleOption}
                                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer shadow-2xs ${isChecked
                                          ? isDeclaration
                                            ? 'border-emerald-500 dark:border-emerald-400 bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-blue-500/15 text-emerald-950 dark:text-emerald-100 font-medium shadow-xs'
                                            : 'border-[#2563EB] bg-[#2563EB]/10 dark:bg-[#2563EB]/20 text-[#2563EB] dark:text-blue-300'
                                          : isDeclaration
                                            ? 'border-emerald-500/25 dark:border-emerald-400/20 bg-white/90 dark:bg-white/[0.04] hover:border-emerald-500/45 dark:hover:border-blue-400/40 text-gray-800 dark:text-gray-200'
                                            : 'border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.03] hover:border-[#2563EB]/40 text-gray-800 dark:text-gray-200'
                                          }`}
                                      >
                                        <input
                                          type="checkbox"
                                          checked={isChecked}
                                          onChange={toggleOption}
                                          className={`w-4 h-4 rounded cursor-pointer ${isDeclaration
                                            ? 'text-emerald-600 focus:ring-emerald-500 accent-emerald-600'
                                            : 'text-[#2563EB] focus:ring-[#2563EB]'
                                            }`}
                                        />
                                        <span className="text-xs sm:text-sm font-medium leading-relaxed">
                                          {opt}
                                        </span>
                                      </label>
                                    );
                                  })}
                                </div>
                              )}

                              {q.type === 'upload' && (() => {
                                const fileObj = candidateFiles[q.id];
                                const hasFile = Boolean(fileObj);
                                const fileName = typeof fileObj === 'string' ? fileObj : fileObj?.name || '';
                                const fileUrl = typeof fileObj === 'object' && fileObj?.url ? fileObj.url : getDocMock(q.label, currentValue);
                                const fileInputId = `real-system-file-input-${q.id}`;

                                // Government ID questions (Aadhaar, PAN, Passport, DL) have a document number input text field.
                                // Pure document uploads (Bank Cancelled Cheque / Passbook, Profile Photo, Resume, Signature, etc.) do NOT have a text field.
                                const hasNumberInput =
                                  Boolean(q.hasNumberInput) ||
                                  (q.id.startsWith('q-pers-') &&
                                    (q.label?.toLowerCase().includes('& upload') ||
                                      q.label?.toLowerCase().includes('number')));

                                const handleRealFileSelect = (e) => {
                                  const file = e.target.files?.[0];
                                  if (!file) return;
                                  const isImg = file.type.startsWith('image/');
                                  if (isImg) {
                                    const reader = new FileReader();
                                    reader.onload = (uploadEv) => {
                                      handleCandidateFileUpload(q.id, {
                                        name: file.name,
                                        url: uploadEv.target?.result,
                                      });
                                    };
                                    reader.readAsDataURL(file);
                                  } else {
                                    handleCandidateFileUpload(q.id, {
                                      name: file.name,
                                      url: getDocMock(q.label, currentValue),
                                    });
                                  }
                                };

                                return (
                                  <div className="w-full">
                                    {/* Real Native File Input connected to System Folder */}
                                    <input
                                      id={fileInputId}
                                      type="file"
                                      accept="image/*,.pdf"
                                      onChange={handleRealFileSelect}
                                      className="hidden"
                                    />

                                    {hasNumberInput ? (
                                      /* Number Input on Left + Upload Action on Right (for Aadhaar, PAN, Passport, DL) */
                                      <div className="flex items-center gap-2 sm:gap-2.5">
                                        <input
                                          type="text"
                                          value={currentValue}
                                          onChange={(e) => handleCandidateChange(q.id, e.target.value)}
                                          placeholder={q.placeholder || `Enter ${q.label.replace(/^\d+\.\s*/, '').replace(/\s*&.*$/, '')} Number...`}
                                          className="flex-1 min-w-0 h-10 px-3.5 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all shadow-2xs"
                                        />

                                        {hasFile ? (
                                          <div className="flex items-center gap-1.5 shrink-0">
                                            {/* Uploaded Button: 100% black fill, image thumbnail over it at 60% opacity, white text "View" */}
                                            <button
                                              type="button"
                                              onClick={() =>
                                                setViewingDocModal({
                                                  title: q.label,
                                                  fileName: fileName || `${q.label.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 18)}_Scan.jpg`,
                                                  imageUrl: fileUrl,
                                                  number: currentValue || 'Recorded',
                                                })
                                              }
                                              className="relative overflow-hidden w-24 sm:w-28 h-10 rounded-xl bg-black border border-black flex items-center justify-center cursor-pointer transition-all shadow-xs group shrink-0"
                                              title="Click to view uploaded document in popout"
                                            >
                                              <img
                                                src={fileUrl}
                                                alt="Document Thumbnail"
                                                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-75 group-hover:scale-105 transition-all"
                                              />
                                              <span className="relative z-10 flex items-center gap-1.5 text-white font-extrabold text-xs drop-shadow-md tracking-wide">
                                                <Eye className="w-3.5 h-3.5 text-white" />
                                                <span>View</span>
                                              </span>
                                            </button>

                                            {/* Re-upload button with Repeat icon to open system folder to replace file */}
                                            <button
                                              type="button"
                                              onClick={() => document.getElementById(fileInputId)?.click()}
                                              className="h-10 w-10 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 hover:text-[#2563EB] flex items-center justify-center cursor-pointer transition-all shadow-2xs shrink-0"
                                              title="Click to open system folder and choose another file to replace"
                                            >
                                              <Repeat className="w-4 h-4" />
                                            </button>
                                          </div>
                                        ) : (
                                          /* Neutral, non-highlighted upload button (triggers system file picker) */
                                          <button
                                            type="button"
                                            onClick={() => document.getElementById(fileInputId)?.click()}
                                            className="h-10 px-3.5 sm:px-4 rounded-xl border border-gray-300 dark:border-white/15 bg-gray-100 hover:bg-gray-200/80 dark:bg-white/10 dark:hover:bg-white/15 text-gray-700 dark:text-gray-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 shadow-2xs"
                                            title="Click to open system folder and select document"
                                          >
                                            <UploadCloud className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                            <span>Upload Photo</span>
                                          </button>
                                        )}
                                      </div>
                                    ) : (
                                      /* Pure Upload Layout (NO Text Field) for Bank Cheque / Passbook & Documents */
                                      <div>
                                        {hasFile ? (
                                          <div className="flex items-center gap-2 sm:gap-2.5">
                                            {/* Uploaded Button: 100% black fill, image thumbnail over it at 60% opacity, white text "View" */}
                                            <button
                                              type="button"
                                              onClick={() =>
                                                setViewingDocModal({
                                                  title: q.label,
                                                  fileName: fileName || `${q.label.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 18)}_Scan.jpg`,
                                                  imageUrl: fileUrl,
                                                  number: 'Bank Passbook / Cheque',
                                                })
                                              }
                                              className="relative overflow-hidden flex-1 h-10 rounded-xl bg-black border border-black flex items-center justify-center cursor-pointer transition-all shadow-xs group"
                                              title="Click to view uploaded document in popout"
                                            >
                                              <img
                                                src={fileUrl}
                                                alt="Document Thumbnail"
                                                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-all"
                                              />
                                              <span className="relative z-10 flex items-center gap-2 text-white font-extrabold text-xs drop-shadow-md tracking-wide">
                                                <Eye className="w-3.5 h-3.5 text-white" />
                                                <span>View</span>
                                              </span>
                                            </button>

                                            {/* Re-upload button with Repeat icon to open system folder to replace file */}
                                            <button
                                              type="button"
                                              onClick={() => document.getElementById(fileInputId)?.click()}
                                              className="h-10 w-10 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 hover:text-[#2563EB] flex items-center justify-center cursor-pointer transition-all shadow-2xs shrink-0"
                                              title="Click to open system folder and choose another file to replace"
                                            >
                                              <Repeat className="w-4 h-4" />
                                            </button>
                                          </div>
                                        ) : (
                                          /* Pure Upload Button without any text field */
                                          <button
                                            type="button"
                                            onClick={() => document.getElementById(fileInputId)?.click()}
                                            className="w-full h-10 px-4 rounded-xl border border-gray-300 hover:border-gray-400 dark:border-white/15 dark:hover:border-white/25 bg-gray-100 hover:bg-gray-200/80 dark:bg-white/10 dark:hover:bg-white/15 text-gray-700 dark:text-gray-200 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                                            title="Click to open system folder and select document"
                                          >
                                            <UploadCloud className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                            <span>Upload Photo</span>
                                          </button>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                );
                              })()}
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Functional Preview Section Navigation */}
              <div className="mt-8 pt-5 border-t border-gray-100 dark:border-white/10 flex items-center justify-between flex-wrap gap-3">
                <button
                  type="button"
                  disabled={sections.findIndex((s) => s.id === activeSectionId) === 0}
                  onClick={() => {
                    const currentIdx = sections.findIndex((s) => s.id === activeSectionId);
                    if (currentIdx > 0) setActiveSectionId(sections[currentIdx - 1].id);
                  }}
                  className={`px-4 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${sections.findIndex((s) => s.id === activeSectionId) === 0
                    ? 'opacity-40 cursor-not-allowed border-gray-200 dark:border-white/10 text-gray-400'
                    : 'border-gray-300 dark:border-white/15 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 cursor-pointer'
                    }`}
                >
                  <ChevronLeft className="w-4 h-4 mr-0.5" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 font-mono hidden sm:inline">
                    Step {sections.findIndex((s) => s.id === activeSectionId) + 1} of {sections.length}
                  </span>

                  {sections.findIndex((s) => s.id === activeSectionId) === sections.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => setPreviewSubmitted(true)}
                      className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Test Submit Form</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        const currentIdx = sections.findIndex((s) => s.id === activeSectionId);
                        if (currentIdx < sections.length - 1)
                          setActiveSectionId(sections[currentIdx + 1].id);
                      }}
                      className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Next Section</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {previewSubmitted && (
                <div className="mt-4 p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 flex items-center justify-between gap-3 animate-fadeIn">
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Candidate preview application submitted successfully! All fields validated.</span>
                  </div>
                  <button
                    onClick={() => setPreviewSubmitted(false)}
                    className="text-xs underline font-bold cursor-pointer hover:opacity-80"
                  >
                    Dismiss
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MODAL: DOCUMENT IMAGE VIEWER POPOUT
          ========================================================================= */}
      {viewingDocModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div
            className={`w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden relative flex flex-col ${isDark ? 'bg-[#0E1420] border-white/15 text-white' : 'bg-white border-gray-200 text-gray-900'
              }`}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 dark:border-white/10 flex items-center justify-between bg-gray-50/70 dark:bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-[#2563EB]/15 text-[#2563EB] flex items-center justify-center border border-[#2563EB]/25">
                  <Eye className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-sm font-extrabold tracking-tight text-gray-900 dark:text-white">
                    {viewingDocModal.title}
                  </h3>
                  <span className="text-[11px] font-mono text-gray-400">
                    {viewingDocModal.fileName} • High-Resolution Scan Preview
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setViewingDocModal(null)}
                className="p-1.5 rounded-xl text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer transition-all"
                title="Close Viewer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Document Image Display */}
            <div className="p-6 flex flex-col items-center justify-center bg-gray-950/5 dark:bg-black/30">
              <div className="w-full max-w-lg rounded-2xl overflow-hidden border border-gray-200/80 dark:border-white/15 shadow-xl bg-white">
                <img
                  src={viewingDocModal.imageUrl}
                  alt={viewingDocModal.title}
                  className="w-full h-auto object-contain select-none"
                />
              </div>

              <div className="mt-4 flex items-center gap-2 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified SHA-256 Cloud Encryption • Transvolt Mobility Protocol</span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 border-t border-gray-100 dark:border-white/10 flex items-center justify-between bg-gray-50/70 dark:bg-white/[0.02]">
              <span className="text-xs font-mono text-gray-500">
                Document Identifier: {viewingDocModal.number || 'Synchronized'}
              </span>
              <button
                type="button"
                onClick={() => setViewingDocModal(null)}
                className="px-4 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 dark:text-gray-900 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                Close Viewer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: CANDIDATE PROFILE PHOTO RULES & SPECIFICATIONS (40% LARGER + PROFESSIONAL SHOWCASE)
          ========================================================================= */}
      {showPhotoRulesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-[1080px] rounded-3xl bg-white dark:bg-[#121A28] border border-gray-200 dark:border-white/15 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 max-h-[92vh] flex flex-col">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 dark:border-white/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-orange-500/15 text-orange-500 dark:text-orange-400 flex items-center justify-center">
                  <Camera className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-base font-extrabold text-gray-900 dark:text-white">
                    Profile Photo Guidelines
                  </h3>
                  <p className="text-xs text-gray-500">Official Candidate Specifications & ID Verification</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowPhotoRulesModal(false)}
                className="w-8 h-8 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 flex items-center justify-center cursor-pointer transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body: Left (Image + Friendly Note + ID Card Requirement) | Right (The Perfect Professional Photo + Rules) */}
            <div className="p-6 sm:p-7 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Left Side: Photo with Top Line + ID Card Requirement */}
              <div className="flex flex-col gap-3">
                {/* User Requested Top Line + ID Card Notice */}
                <div className="p-3 sm:p-3.5 rounded-2xl bg-orange-500/10 border border-orange-500/25 text-orange-900 dark:text-orange-200 text-center leading-snug space-y-1 shadow-2xs">
                  <div className="text-xs sm:text-[13px] font-extrabold tracking-tight">
                    (We know you&apos;re a Top Photographer, but this platform requires your Professional Photo)
                  </div>
                  <div className="text-[11px] sm:text-xs font-semibold text-orange-700 dark:text-orange-300/90 flex items-center justify-center gap-1.5">
                    <span>Because we required this for creating you ID card</span>
                  </div>
                </div>

                {/* Photo Collage Container */}
                <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-black/30 shadow-xs group">
                  <img
                    src="/photo-rules-reference.jpg"
                    alt="Selfie Poses Reference"
                    className="w-full h-auto max-h-[360px] object-contain rounded-2xl mx-auto"
                  />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 px-3 py-1.5 rounded-xl bg-black/85 backdrop-blur-xs text-white text-[11px] font-semibold text-center flex items-center justify-center gap-2 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shrink-0" />
                    <span>Avoid mirror selfies, angled poses & covered face</span>
                  </div>
                </div>
              </div>

              {/* Right Side: The Perfect Professional Photo + Checklist & Specs */}
              <div className="flex flex-col justify-between h-full gap-4">
                {/* Right Side Showcase: The Perfect Professional Photo (Clean White BG) */}
                <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-500/50 bg-white dark:bg-white shadow-sm group flex flex-col items-center">
                  {/* Banner written on top of photo */}
                  <div className="w-full py-2 px-3.5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white text-xs sm:text-sm font-black text-center tracking-wide uppercase flex items-center justify-center gap-2 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>The Perfect Professional Photo</span>
                  </div>

                  {/* Photo of the man on Pure White Background */}
                  <div className="py-3 px-4 flex items-center justify-center w-full bg-white">
                    <img
                      src="/perfect-professional-photo.webp"
                      alt="The Perfect Professional Photo"
                      className="w-40 h-40 sm:w-48 sm:h-48 object-contain"
                    />
                  </div>

                  {/* Caption badge at bottom */}
                  <div className="w-full py-1.5 px-3 bg-emerald-50 border-t border-emerald-200 text-emerald-800 text-[11px] font-bold text-center flex items-center justify-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    <span>Front-facing, well-lit, plain white background & formal attire</span>
                  </div>
                </div>

                {/* Professional Photo Checklist & Specs */}
                <div className="space-y-2 text-xs text-gray-700 dark:text-gray-300">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="flex items-start gap-2 p-2 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5">
                      <span className="w-4.5 h-4.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 font-bold text-[9.5px]">
                        ✓
                      </span>
                      <span className="text-[11px] leading-tight"><strong>Front-Facing:</strong> Head & shoulders visible, centered passport style.</span>
                    </div>
                    <div className="flex items-start gap-2 p-2 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5">
                      <span className="w-4.5 h-4.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 font-bold text-[9.5px]">
                        ✓
                      </span>
                      <span className="text-[11px] leading-tight"><strong>Plain Background:</strong> Light-colored / white background, even lighting.</span>
                    </div>
                    <div className="flex items-start gap-2 p-2 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5">
                      <span className="w-4.5 h-4.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 font-bold text-[9.5px]">
                        ✓
                      </span>
                      <span className="text-[11px] leading-tight"><strong>No Accessories:</strong> Avoid sunglasses, hats, masks, or lens glare.</span>
                    </div>
                    <div className="flex items-start gap-2 p-2 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5">
                      <span className="w-4.5 h-4.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 font-bold text-[9.5px]">
                        ✓
                      </span>
                      <span className="text-[11px] leading-tight"><strong>Recent Photo:</strong> Taken within last 6 months for official identity records.</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[#2563EB] dark:text-blue-300">
                    <span className="w-4.5 h-4.5 rounded-full bg-blue-500/20 text-[#2563EB] dark:text-blue-400 flex items-center justify-center shrink-0 font-bold text-[10px]">
                      i
                    </span>
                    <span className="text-[11px]"><strong>File Specs:</strong> JPG, JPEG, or PNG formats up to 5 MB.</span>
                  </div>
                </div>

                {/* Footer Button inside Right Column */}
                <div className="pt-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowPhotoRulesModal(false)}
                    className="w-full sm:w-auto px-7 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition-all shadow-xs cursor-pointer text-center hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Got It, I Understand
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: SEND HIRING FORM TO CANDIDATE (PERSON NAME, EMAIL ID, NOTE, SENDER)
          ========================================================================= */}
      {isSendModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-[#121A28] border border-gray-200 dark:border-white/15 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 dark:border-white/10 flex items-center justify-between shrink-0 bg-gray-50/50 dark:bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-2xl bg-[#548235]/15 text-[#548235] dark:text-[#76B84A] flex items-center justify-center border border-[#548235]/25">
                  <Send className="w-5 h-5 stroke-[2.5]" />
                </span>
                <div>
                  <h3 className="text-base font-extrabold text-gray-900 dark:text-white">
                    Send Hiring Form
                  </h3>
                  <p className="text-xs text-gray-500">Dispatch candidate application link via email</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsSendModalOpen(false);
                  setSendSuccessState(false);
                }}
                className="w-8 h-8 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 flex items-center justify-center cursor-pointer transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            {sendSuccessState ? (
              <div className="p-8 flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border-2 border-emerald-500/30 animate-in zoom-in-75 duration-200">
                  <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-gray-900 dark:text-white">
                    Hiring Form Dispatched Successfully!
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-sm">
                    An official candidate application link has been sent to{' '}
                    <span className="font-bold text-[#548235]">{sendFormData.emailId}</span> from{' '}
                    <span className="font-mono text-gray-700 dark:text-gray-300">{sendFormData.senderEmail}</span>.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsSendModalOpen(false);
                    setSendSuccessState(false);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#548235] hover:bg-[#44692a] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!sendFormData.personName.trim() || !sendFormData.emailId.trim()) {
                    alert('Please provide Person Name and Email ID.');
                    return;
                  }
                  setIsSending(true);
                  setTimeout(() => {
                    setIsSending(false);
                    setSendSuccessState(true);
                  }, 500);
                }}
                className="p-6 space-y-4"
              >
                {/* 1. Person Name (Text box) */}
                <div>
                  <label className="block text-xs font-bold text-gray-800 dark:text-gray-200 mb-1.5">
                    1. Person Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                      <User className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      required
                      value={sendFormData.personName}
                      onChange={(e) => setSendFormData((prev) => ({ ...prev, personName: e.target.value }))}
                      placeholder="Candidate's Full Name (e.g. Rahul Sharma)"
                      className="w-full h-10 pl-10 pr-3.5 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#548235] transition-all shadow-2xs"
                    />
                  </div>
                </div>

                {/* 2. Email ID (Text box) */}
                <div>
                  <label className="block text-xs font-bold text-gray-800 dark:text-gray-200 mb-1.5">
                    2. Email ID <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                      <Mail className="w-4 h-4" />
                    </span>
                    <input
                      type="email"
                      required
                      value={sendFormData.emailId}
                      onChange={(e) => setSendFormData((prev) => ({ ...prev, emailId: e.target.value }))}
                      placeholder="candidate.email@example.com"
                      className="w-full h-10 pl-10 pr-3.5 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#548235] transition-all shadow-2xs"
                    />
                  </div>
                </div>

                {/* 3. Add Note (Text box) */}
                <div>
                  <label className="block text-xs font-bold text-gray-800 dark:text-gray-200 mb-1.5">
                    3. Add Note
                  </label>
                  <div className="relative">
                    <textarea
                      rows={3}
                      value={sendFormData.addNote}
                      onChange={(e) => setSendFormData((prev) => ({ ...prev, addNote: e.target.value }))}
                      placeholder="Add custom notes, role details, or deadline instructions..."
                      className="w-full p-3 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#548235] transition-all shadow-2xs resize-none"
                    />
                  </div>
                </div>

                {/* 4. Send from this Email (Default HR email and user can change it) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-gray-800 dark:text-gray-200">
                      4. Send from this Email
                    </label>
                    <span className="text-[10.5px] font-mono text-[#548235] font-semibold bg-[#548235]/10 px-2 py-0.5 rounded-md">
                      Default HR email (editable)
                    </span>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                      <Building2 className="w-4 h-4" />
                    </span>
                    <input
                      type="email"
                      required
                      value={sendFormData.senderEmail}
                      onChange={(e) => setSendFormData((prev) => ({ ...prev, senderEmail: e.target.value }))}
                      placeholder="hr@transvolt.in"
                      className="w-full h-10 pl-10 pr-3.5 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#548235] transition-all shadow-2xs font-medium"
                    />
                  </div>
                  <p className="text-[10.5px] text-gray-500 dark:text-gray-400 mt-1">
                    Pre-filled with official Transvolt HR email. You can change this to your email address.
                  </p>
                </div>

                {/* Footer Buttons */}
                <div className="pt-3 border-t border-gray-100 dark:border-white/10 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsSendModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 text-xs font-semibold transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSending}
                    className="px-6 py-2.5 rounded-xl bg-[#548235] hover:bg-[#44692a] disabled:opacity-60 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Send className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>{isSending ? 'Sending...' : 'Send Hiring Form'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
      {
        isPreviewOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div
              className={`w-full max-w-4xl rounded-3xl p-6 sm:p-8 border shadow-2xl relative max-h-[90vh] overflow-y-auto no-scrollbar ${isDark ? 'bg-[#0E1420] border-white/15 text-white' : 'bg-white border-gray-200 text-gray-900'
                }`}
            >
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="absolute right-5 top-5 p-1 rounded-full text-gray-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-white/10">
                <span className="w-10 h-10 rounded-xl bg-[#548235]/15 text-[#548235] dark:text-[#76B84A] flex items-center justify-center border border-[#548235]/30">
                  <Eye className="w-5 h-5" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold">Official Candidate Form Preview</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#4472C4]/15 text-[#4472C4] dark:text-[#6893db] font-bold">
                      Full Preview Mode
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">
                    Interactive candidate submission flow across all {sections.length} sections
                  </p>
                </div>
              </div>

              {/* Stepper preview */}
              <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-gray-100 dark:border-white/5 scrollbar-none">
                {sections.map((sec, idx) => (
                  <div
                    key={sec.id}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 ${sec.id === activeSectionId
                      ? 'bg-[#548235] text-white shadow-xs'
                      : 'bg-gray-100 dark:bg-white/5 text-gray-500'
                      }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-white/20 text-[9px] font-mono font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span>{sec.title}</span>
                  </div>
                ))}
              </div>

              {/* Form body */}
              <div className="space-y-4">
                <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                    {activeSection.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{activeSection.description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeSection.questions.map((q) => (
                    <div key={q.id} className="space-y-1">
                      <label className="block text-xs font-bold text-gray-900 dark:text-gray-100">
                        {q.label} {q.required && <span className="text-rose-500">*</span>}
                      </label>
                      {q.helpText && <p className="text-[10px] text-gray-400">{q.helpText}</p>}
                      <input
                        type="text"
                        disabled
                        placeholder={q.placeholder || 'Candidate response...'}
                        className="w-full h-9 px-3 rounded-xl border text-xs bg-gray-50 dark:bg-white/5 border-gray-300 dark:border-white/15 opacity-80"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-100 dark:border-white/10 flex justify-between items-center">
                <span className="text-xs text-gray-400 font-mono">Viewing Section {sections.findIndex(s => s.id === activeSectionId) + 1} of {sections.length}</span>
                <button
                  onClick={() => setIsPreviewOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#548235] hover:bg-[#44692a] text-white font-bold text-xs cursor-pointer"
                >
                  Exit Preview
                </button>
              </div>
            </div>
          </div>
        )
      }

      {/* =========================================================================
          SUCCESS TOAST
          ========================================================================= */}
      {
        showSaveToast && (
          <div className="fixed bottom-24 right-6 z-50 p-4 rounded-2xl bg-[#0D1525] border border-[#548235] text-white shadow-2xl flex items-center gap-3 animate-bounce">
            <span className="w-8 h-8 rounded-xl bg-[#548235]/20 text-[#85e14d] flex items-center justify-center border border-[#548235]/40">
              <Check className="w-4 h-4 stroke-[3]" />
            </span>
            <div>
              <h4 className="text-xs font-bold">Hiring Form Architecture Saved!</h4>
              <p className="text-[11px] text-gray-300 font-mono">
                All questions and sections synchronized with Transvolt Branding Portal V4.
              </p>
            </div>
          </div>
        )
      }
    </div >
  );
};

export default HiringFormBuilderPage;

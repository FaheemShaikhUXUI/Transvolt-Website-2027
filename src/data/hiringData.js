// Transvolt Hiring Process Seed Data & Configuration - Ported from Transvolt Branding Portal V4
export const INITIAL_CANDIDATES = [
  {
    "id": "TV-HR-2026-001",
    "token": "tv-rec-vikram-9912a",
    "fullName": "Vikram Sharma",
    "email": "vikram.sharma.ev@gmail.com",
    "phone": "+91 98201 44521",
    "appliedPosition": "Senior EV Systems Engineer",
    "department": "EV Engineering & Powertrain",
    "status": "HIRED",
    "invitation": {
      "sentAt": "2026-10-10T10:30:00.000Z",
      "sentBy": "HR Recruitment Cell",
      "emailStatus": "OPENED"
    },
    "documents": {
      "photoUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      "photoFileName": "vikram_profile.jpg",
      "resumeUrl": "#",
      "resumeFileName": "Vikram_Sharma_EV_Resume.pdf"
    },
    "personalInfo": {
      "fullName": "Vikram Sharma",
      "fatherName": "Rajendra Sharma",
      "dob": "1994-06-15",
      "gender": "Male",
      "mobile": "+91 98201 44521",
      "email": "vikram.sharma.ev@gmail.com",
      "currentAddress": "Flat 402, Green Meadows, Powai",
      "permanentAddress": "Flat 402, Green Meadows, Powai, Mumbai",
      "city": "Mumbai",
      "state": "Maharashtra",
      "pincode": "400076",
      "nationality": "Indian"
    },
    "education": [
      {
        "id": "edu-1",
        "highestQual": "Post Graduation",
        "degree": "M.Tech in Electric Vehicle Technology",
        "specialization": "Battery Thermal Management",
        "institution": "IIT Bombay",
        "passingYear": "2018",
        "score": "9.2 CGPA"
      }
    ],
    "experience": {
      "isExperienced": true,
      "totalYears": "6.5 Years",
      "records": [
        {
          "id": "exp-1",
          "company": "Mahindra Electric",
          "designation": "Systems Engineer",
          "duration": "2018 - 2024",
          "responsibilities": "Managed BMS telemetry and motor controller integration.",
          "currentCtc": "18 LPA",
          "expectedCtc": "24 LPA",
          "noticePeriod": "30 Days"
        }
      ]
    },
    "jobSpecific": {
      "positionApplied": "Senior EV Systems Engineer",
      "department": "EV Engineering & Powertrain",
      "preferredLocation": "Mumbai HQ",
      "relevantSkills": "BMS, CAN Bus, Motor Controllers, Python, Matlab",
      "technicalSkills": "High Voltage Architecture, Automotive Diagnostics",
      "toolsKnowledge": "Vector CANoe, Altium Designer",
      "whyTransvolt": "Transvolt is pioneering electric commercial transport at scale in India.",
      "whyHireYou": "Over 6 years of hands-on EV powertrain validation experience.",
      "relevantExperience": "Designed BMS algorithms for commercial transit buses.",
      "comfortableWithDuties": true,
      "willingToTravel": true
    },
    "additionalInfo": {
      "languages": [
        "English",
        "Hindi",
        "Marathi"
      ],
      "englishProficiency": "Fluent",
      "drivingLicence": "Yes (Four Wheeler)",
      "linkedinUrl": "https://linkedin.com/in/vikramsharma-ev",
      "emergencyContactName": "Rajendra Sharma (Father)",
      "emergencyContactPhone": "+91 98201 99887"
    },
    "interviewPreferences": {
      "preferredDate": "2026-10-18",
      "preferredTime": "11:00 AM",
      "modePreference": "ONLINE"
    },
    "interviewSchedule": {
      "roundNumber": 2,
      "roundName": "Technical & Leadership Round",
      "date": "2026-10-20",
      "startTime": "11:00 AM",
      "endTime": "12:00 PM",
      "mode": "ONLINE",
      "platform": "Google Meet",
      "meetingUrl": "https://meet.google.com/tv-vikram-tech",
      "contactPerson": "Faheem S. (HR Lead)",
      "contactPhone": "+91 98200 12345",
      "instructions": "Please be ready to share past BMS architecture diagrams.",
      "scheduledAt": "2026-10-16T14:00:00.000Z",
      "scheduledBy": "HR Lead"
    },
    "evaluations": [
      {
        "id": "eval-1",
        "roundName": "Technical & Leadership Round",
        "evaluatedBy": "Chief Technology Officer",
        "evaluatedAt": "2026-10-20T12:30:00.000Z",
        "technicalRating": 5,
        "communicationRating": 4,
        "experienceRating": 5,
        "problemSolvingRating": 5,
        "confidenceRating": 4,
        "overallRating": 5,
        "strengths": "Exceptional mastery over EV powertrain telematics and battery safety protocols.",
        "improvements": "None of significance; great fit for Transvolt architecture.",
        "interviewerRemarks": "Strong hire recommendation. Fits our culture and technical bar.",
        "recommendation": "HIRE"
      }
    ],
    "decision": {
      "status": "HIRED",
      "decisionDate": "2026-10-24T16:00:00.000Z",
      "decidedBy": "Managing Director & HR",
      "joiningDate": "2026-11-15",
      "offeredDesignation": "Lead EV Systems Architect",
      "offeredDepartment": "EV Engineering & Powertrain",
      "joiningInstructions": "Report to Powai HQ at 9:30 AM on 15 Nov with original certificates and ID proofs."
    },
    "internalNotes": [
      {
        "id": "note-1",
        "author": "Faheem S.",
        "createdAt": "2026-10-24T16:30:00.000Z",
        "note": "Offer letter issued and accepted. Joining confirmed for Nov 15th."
      }
    ],
    "timeline": [
      {
        "id": "tl-1",
        "type": "INVITED",
        "description": "Application invitation sent",
        "timestamp": "2026-10-10T10:30:00.000Z",
        "actor": "HR"
      },
      {
        "id": "tl-2",
        "type": "SUBMITTED",
        "description": "Candidate submitted completed application",
        "timestamp": "2026-10-14T18:15:00.000Z",
        "actor": "Candidate"
      },
      {
        "id": "tl-3",
        "type": "INTERVIEW_SCHEDULED",
        "description": "Technical round scheduled on Google Meet",
        "timestamp": "2026-10-16T14:00:00.000Z",
        "actor": "HR"
      },
      {
        "id": "tl-4",
        "type": "EVALUATED",
        "description": "Evaluation completed: 5/5 Stars",
        "timestamp": "2026-10-20T12:30:00.000Z",
        "actor": "CTO"
      },
      {
        "id": "tl-5",
        "type": "HIRED",
        "description": "Offered Lead EV Systems Architect position",
        "timestamp": "2026-10-24T16:00:00.000Z",
        "actor": "HR"
      }
    ],
    "createdAt": "2026-10-10T10:30:00.000Z",
    "updatedAt": "2026-10-24T16:00:00.000Z"
  },
  {
    "id": "TV-HR-2026-002",
    "token": "tv-rec-ananya-4821b",
    "fullName": "Ananya Deshmukh",
    "email": "ananya.ux@transvolt-candidate.in",
    "phone": "+91 97654 32190",
    "appliedPosition": "Lead UI/UX Designer",
    "department": "Design & Branding",
    "status": "UNDER_REVIEW",
    "invitation": {
      "sentAt": "2026-10-25T11:00:00.000Z",
      "sentBy": "Faheem S.",
      "emailStatus": "OPENED"
    },
    "documents": {
      "photoUrl": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
      "photoFileName": "ananya_headshot.jpg",
      "resumeUrl": "#",
      "resumeFileName": "Ananya_Deshmukh_Design_Portfolio.pdf"
    },
    "personalInfo": {
      "fullName": "Ananya Deshmukh",
      "fatherName": "Prakash Deshmukh",
      "dob": "1997-03-22",
      "gender": "Female",
      "mobile": "+91 97654 32190",
      "email": "ananya.ux@transvolt-candidate.in",
      "currentAddress": "12, Palm Grove, Andheri West",
      "permanentAddress": "12, Palm Grove, Andheri West, Mumbai",
      "city": "Mumbai",
      "state": "Maharashtra",
      "pincode": "400053",
      "nationality": "Indian"
    },
    "education": [
      {
        "id": "edu-2",
        "highestQual": "Graduation",
        "degree": "B.Des in Interaction Design",
        "specialization": "User Experience & Digital Products",
        "institution": "National Institute of Design (NID)",
        "passingYear": "2019",
        "score": "8.9 CGPA"
      }
    ],
    "experience": {
      "isExperienced": true,
      "totalYears": "5 Years",
      "records": [
        {
          "id": "exp-2",
          "company": "Ather Energy",
          "designation": "Senior Product Designer",
          "duration": "2021 - 2026",
          "responsibilities": "Designed instrument cluster UI, dashboard telemetry and mobile app charging flows.",
          "currentCtc": "16 LPA",
          "expectedCtc": "21 LPA",
          "noticePeriod": "45 Days"
        }
      ]
    },
    "jobSpecific": {
      "positionApplied": "Lead UI/UX Designer",
      "department": "Design & Branding",
      "preferredLocation": "Mumbai HQ",
      "relevantSkills": "Figma, Design Systems, HMI Dashboard UI, Design Tokens",
      "technicalSkills": "Prototyping, Usability Testing, Information Architecture",
      "toolsKnowledge": "Figma, Principle, Adobe CC, Tailwind CSS",
      "whyTransvolt": "Transvolt's branding portal and vehicle telematics are setting new design standards.",
      "whyHireYou": "Proven track record in EV cluster UI and scalable corporate design systems.",
      "relevantExperience": "Shipped 3 production instrument cluster interfaces for commercial electric trucks.",
      "comfortableWithDuties": true,
      "willingToTravel": false
    },
    "additionalInfo": {
      "languages": [
        "English",
        "Hindi",
        "Marathi"
      ],
      "englishProficiency": "Fluent",
      "drivingLicence": "Yes",
      "portfolioUrl": "https://ananya-ux.design",
      "emergencyContactName": "Prakash Deshmukh",
      "emergencyContactPhone": "+91 98200 44321"
    },
    "interviewPreferences": {
      "preferredDate": "2026-11-03",
      "preferredTime": "02:30 PM",
      "modePreference": "ONLINE",
      "notes": "Available weekday afternoons."
    },
    "submission": {
      "submittedAt": "2026-10-28T15:20:00.000Z",
      "declarationAccepted": true
    },
    "internalNotes": [
      {
        "id": "note-2",
        "author": "Faheem S.",
        "createdAt": "2026-10-29T10:00:00.000Z",
        "note": "Portfolio is top-tier. Great grasp of automotive aesthetics and clean design systems. Schedule round 1."
      }
    ],
    "timeline": [
      {
        "id": "tl-201",
        "type": "INVITED",
        "description": "Application invitation sent",
        "timestamp": "2026-10-25T11:00:00.000Z",
        "actor": "HR"
      },
      {
        "id": "tl-202",
        "type": "SUBMITTED",
        "description": "Candidate submitted completed application & portfolio",
        "timestamp": "2026-10-28T15:20:00.000Z",
        "actor": "Candidate"
      }
    ],
    "createdAt": "2026-10-25T11:00:00.000Z",
    "updatedAt": "2026-10-29T10:00:00.000Z"
  },
  {
    "id": "TV-HR-2026-003",
    "token": "tv-rec-rohan-5531c",
    "fullName": "Rohan Patel",
    "email": "rohan.patel.fleet@gmail.com",
    "phone": "+91 99300 87654",
    "appliedPosition": "Fleet Operations Manager",
    "department": "Fleet Operations",
    "status": "INTERVIEW_SCHEDULED",
    "invitation": {
      "sentAt": "2026-10-22T09:00:00.000Z",
      "sentBy": "HR Cell",
      "emailStatus": "OPENED"
    },
    "documents": {
      "photoUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
      "photoFileName": "rohan_photo.jpg",
      "resumeUrl": "#",
      "resumeFileName": "Rohan_Patel_Fleet_Manager.pdf"
    },
    "personalInfo": {
      "fullName": "Rohan Patel",
      "fatherName": "Kishore Patel",
      "dob": "1992-11-04",
      "gender": "Male",
      "mobile": "+91 99300 87654",
      "email": "rohan.patel.fleet@gmail.com",
      "currentAddress": "C-201, Green Heights, Thane West",
      "permanentAddress": "C-201, Green Heights, Thane West, Maharashtra",
      "city": "Thane",
      "state": "Maharashtra",
      "pincode": "400601",
      "nationality": "Indian"
    },
    "education": [
      {
        "id": "edu-3",
        "highestQual": "Graduation",
        "degree": "B.E. in Mechanical Engineering",
        "specialization": "Automotive Maintenance",
        "institution": "VJTI Mumbai",
        "passingYear": "2014",
        "score": "78%"
      }
    ],
    "experience": {
      "isExperienced": true,
      "totalYears": "8 Years",
      "records": [
        {
          "id": "exp-3",
          "company": "BluSmart Mobility",
          "designation": "Assistant Fleet Manager",
          "duration": "2020 - 2026",
          "responsibilities": "Managed 450+ EV hubs, depot turnaround times, and driver scheduling.",
          "currentCtc": "14 LPA",
          "expectedCtc": "18 LPA",
          "noticePeriod": "15 Days"
        }
      ]
    },
    "jobSpecific": {
      "positionApplied": "Fleet Operations Manager",
      "department": "Fleet Operations",
      "preferredLocation": "Navi Mumbai Hub",
      "relevantSkills": "Fleet Telematics, Charger Depot Management, Route Optimization",
      "technicalSkills": "EV Maintenance, Driver SLA, Vendor Management",
      "toolsKnowledge": "Fleetx, Samsara, Excel Advanced",
      "whyTransvolt": "Transvolt's expanding fleet network is the premier commercial EV opportunity.",
      "whyHireYou": "Over 8 years managing commercial vehicle operations with 99.4% depot uptime.",
      "relevantExperience": "Operated 450 EV commercial vans with turnaround time under 18 minutes.",
      "comfortableWithDuties": true,
      "willingToTravel": true
    },
    "additionalInfo": {
      "languages": [
        "English",
        "Hindi",
        "Gujarati",
        "Marathi"
      ],
      "englishProficiency": "Professional",
      "drivingLicence": "Yes (Commercial & Heavy)",
      "emergencyContactName": "Kishore Patel",
      "emergencyContactPhone": "+91 99300 11223"
    },
    "interviewPreferences": {
      "preferredDate": "2026-11-02",
      "preferredTime": "11:30 AM",
      "modePreference": "IN_PERSON"
    },
    "interviewSchedule": {
      "roundNumber": 1,
      "roundName": "Hub Operations In-Person Assessment",
      "date": "2026-11-02",
      "startTime": "11:30 AM",
      "endTime": "12:45 PM",
      "mode": "IN_PERSON",
      "platform": "In-person",
      "officeAddress": "Transvolt Mobility HQ, 4th Floor, Powai Tech Park, Mumbai",
      "contactPerson": "Faheem S. (HR Lead)",
      "contactPhone": "+91 98200 12345",
      "instructions": "Please report to Reception desk 15 minutes prior. Bring hard copy of resume.",
      "scheduledAt": "2026-10-29T11:00:00.000Z",
      "scheduledBy": "HR Cell"
    },
    "timeline": [
      {
        "id": "tl-301",
        "type": "INVITED",
        "description": "Application invitation sent",
        "timestamp": "2026-10-22T09:00:00.000Z",
        "actor": "HR"
      },
      {
        "id": "tl-302",
        "type": "SUBMITTED",
        "description": "Application submitted",
        "timestamp": "2026-10-26T14:30:00.000Z",
        "actor": "Candidate"
      },
      {
        "id": "tl-303",
        "type": "APPROVED",
        "description": "HR approved application for Round 1 interview",
        "timestamp": "2026-10-29T11:00:00.000Z",
        "actor": "HR"
      }
    ],
    "createdAt": "2026-10-22T09:00:00.000Z",
    "updatedAt": "2026-10-29T11:00:00.000Z"
  },
  {
    "id": "TV-HR-2026-004",
    "token": "tv-rec-neha-7721d",
    "fullName": "Neha Verma",
    "email": "neha.verma.battery@gmail.com",
    "phone": "+91 98112 34567",
    "appliedPosition": "Battery Safety Specialist",
    "department": "Battery Technology",
    "status": "APPLICATION_PENDING",
    "invitation": {
      "sentAt": "2026-10-29T14:00:00.000Z",
      "sentBy": "HR Cell",
      "deadline": "2026-11-05",
      "emailStatus": "DELIVERED",
      "customMessage": "Dear Neha, your profile in battery safety research at ARAI caught our eye. Please complete the application."
    },
    "timeline": [
      {
        "id": "tl-401",
        "type": "INVITED",
        "description": "Invitation link generated and dispatched to neha.verma.battery@gmail.com",
        "timestamp": "2026-10-29T14:00:00.000Z",
        "actor": "HR"
      }
    ],
    "createdAt": "2026-10-29T14:00:00.000Z",
    "updatedAt": "2026-10-29T14:00:00.000Z"
  },
  {
    "id": "TV-HR-2026-005",
    "token": "tv-rec-aditya-3319e",
    "fullName": "Aditya Kulkarni",
    "email": "aditya.kulkarni@yahoo.com",
    "phone": "+91 98220 99881",
    "appliedPosition": "Branding & Marketing Specialist",
    "department": "Design & Branding",
    "status": "NOT_SELECTED",
    "invitation": {
      "sentAt": "2026-10-15T12:00:00.000Z",
      "sentBy": "HR Cell",
      "emailStatus": "OPENED"
    },
    "documents": {
      "photoUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
      "photoFileName": "aditya.jpg",
      "resumeUrl": "#",
      "resumeFileName": "Aditya_Kulkarni_CV.pdf"
    },
    "personalInfo": {
      "fullName": "Aditya Kulkarni",
      "fatherName": "Sharad Kulkarni",
      "dob": "1998-08-10",
      "gender": "Male",
      "mobile": "+91 98220 99881",
      "email": "aditya.kulkarni@yahoo.com",
      "currentAddress": "Pune",
      "permanentAddress": "Pune, Maharashtra",
      "city": "Pune",
      "state": "Maharashtra",
      "pincode": "411038",
      "nationality": "Indian"
    },
    "education": [
      {
        "id": "edu-5",
        "highestQual": "Graduation",
        "degree": "BBA in Marketing",
        "specialization": "Digital Marketing",
        "institution": "Pune University",
        "passingYear": "2020",
        "score": "68%"
      }
    ],
    "experience": {
      "isExperienced": true,
      "totalYears": "2.5 Years",
      "records": [
        {
          "id": "exp-5",
          "company": "Local Ad Agency",
          "designation": "Marketing Executive",
          "duration": "2022 - 2024",
          "responsibilities": "Social media ad management."
        }
      ]
    },
    "decision": {
      "status": "NOT_SELECTED",
      "decisionDate": "2026-10-22T17:00:00.000Z",
      "decidedBy": "Branding Head",
      "rejectionReason": "Experience does not match commercial automotive B2B branding requirements.",
      "feedbackMessage": "Candidate has primarily FMCG social media experience; Transvolt requires commercial fleet EV brand positioning expertise."
    },
    "timeline": [
      {
        "id": "tl-501",
        "type": "INVITED",
        "description": "Application invitation sent",
        "timestamp": "2026-10-15T12:00:00.000Z",
        "actor": "HR"
      },
      {
        "id": "tl-502",
        "type": "SUBMITTED",
        "description": "Application submitted",
        "timestamp": "2026-10-18T16:00:00.000Z",
        "actor": "Candidate"
      },
      {
        "id": "tl-503",
        "type": "NOT_SELECTED",
        "description": "HR closed application as not selected",
        "timestamp": "2026-10-22T17:00:00.000Z",
        "actor": "HR"
      }
    ],
    "createdAt": "2026-10-15T12:00:00.000Z",
    "updatedAt": "2026-10-22T17:00:00.000Z"
  },
  {
    "id": "TV-HR-2026-006",
    "token": "tv-app-v2i05pbn03nl",
    "fullName": "Priya Sengupta",
    "email": "priya.sengupta@example.com",
    "appliedPosition": "Battery Safety Specialist",
    "department": "Battery Technology",
    "status": "HIRED",
    "invitation": {
      "sentAt": "2026-10-30T15:38:36.801Z",
      "sentBy": "HR Recruitment Cell (Faheem S.)",
      "deadline": "2026-11-06",
      "emailStatus": "SENT"
    },
    "timeline": [
      {
        "id": "tl-1793374763874",
        "type": "HIRED",
        "description": "Candidate marked HIRED as Senior Battery Safety Specialist. Joining date: 2026-11-20",
        "timestamp": "2026-10-30T15:39:23.874Z",
        "actor": "HR Leadership"
      },
      {
        "id": "tl-1793374750935",
        "type": "INTERVIEW_RESCHEDULED",
        "description": "Interview rescheduled to 2026-11-05 at 02:00 PM. Reason: Panel CTO on transit fleet audit.",
        "timestamp": "2026-10-30T15:39:10.935Z",
        "actor": "HR"
      },
      {
        "id": "tl-1793374736504",
        "type": "INTERVIEW_SCHEDULED",
        "description": "Interview scheduled on 2026-11-04 at 10:30 AM (ONLINE)",
        "timestamp": "2026-10-30T15:38:56.504Z",
        "actor": "HR"
      },
      {
        "id": "tl-1793374723696",
        "type": "SUBMITTED",
        "description": "Application and supporting documents submitted by candidate",
        "timestamp": "2026-10-30T15:38:43.696Z",
        "actor": "Priya Sengupta"
      },
      {
        "id": "tl-1793374716801",
        "type": "INVITED",
        "description": "Invitation sent to priya.sengupta@example.com for position Battery Safety Specialist",
        "timestamp": "2026-10-30T15:38:36.801Z",
        "actor": "HR Recruitment"
      }
    ],
    "createdAt": "2026-10-30T15:38:36.801Z",
    "updatedAt": "2026-10-30T15:39:23.874Z",
    "documents": {
      "resumeFileName": "Priya_CV.pdf"
    },
    "personalInfo": {
      "fullName": "Priya Sengupta",
      "email": "priya.sengupta@example.com",
      "mobile": "+91 98765 00000",
      "city": "Bangalore",
      "state": "Karnataka",
      "pincode": "560001",
      "nationality": "Indian"
    },
    "jobSpecific": {
      "whyTransvolt": "Excited about EV Battery safety systems"
    },
    "submission": {
      "submittedAt": "2026-10-30T15:38:43.696Z",
      "declarationAccepted": true
    },
    "phone": "+91 98765 00000",
    "interviewSchedule": {
      "roundNumber": 1,
      "roundName": "Round 1 Interview",
      "date": "2026-11-05",
      "startTime": "02:00 PM",
      "endTime": "03:00 PM",
      "mode": "ONLINE",
      "platform": "Google Meet",
      "meetingUrl": "https://meet.google.com/tv-priya-eval",
      "officeAddress": "Transvolt Mobility HQ, 4th Floor, Tech Park, Powai, Mumbai, Maharashtra 400076",
      "contactPerson": "HR Recruitment Cell (Faheem S.)",
      "contactPhone": "+91 98200 12345",
      "scheduledAt": "2026-10-30T15:38:56.504Z",
      "scheduledBy": "HR Recruitment",
      "previousSchedules": [
        {
          "date": "2026-11-04",
          "startTime": "10:30 AM",
          "endTime": "11:30 AM",
          "mode": "ONLINE",
          "platform": "Google Meet",
          "rescheduledAt": "2026-10-30T15:39:10.935Z",
          "rescheduledBy": "HR",
          "rescheduleReason": "Panel CTO on transit fleet audit.",
          "meetingUrl": "https://meet.google.com/tv-priya-eval",
          "officeAddress": "Transvolt Mobility HQ, 4th Floor, Tech Park, Powai, Mumbai, Maharashtra 400076"
        }
      ]
    },
    "decision": {
      "status": "HIRED",
      "decisionDate": "2026-10-30T15:39:23.874Z",
      "decidedBy": "HR Leadership",
      "joiningDate": "2026-11-20",
      "offeredDesignation": "Senior Battery Safety Specialist",
      "offeredDepartment": "Battery Technology",
      "joiningInstructions": "Report to Powai HQ with original documents."
    }
  }
];

export const INITIAL_SETTINGS = {
  "companyName": "Transvolt Mobility Private Limited",
  "hrContactPerson": "HR Recruitment Cell (Faheem S.)",
  "hrContactPhone": "+91 98200 12345",
  "officeAddress": "Transvolt Mobility HQ, 4th Floor, Tech Park, Powai, Mumbai, Maharashtra 400076",
  "recruitmentEmail": "careers@transvoltmobility.com",
  "defaultDeadlineDays": 7,
  "maxUploadSizeMb": 10,
  "allowedFileTypes": [
    ".pdf",
    ".jpg",
    ".jpeg",
    ".png",
    ".doc",
    ".docx"
  ],
  "departments": [
    "Design & Branding",
    "EV Engineering & Powertrain",
    "Fleet Operations",
    "Software & IoT",
    "Sales & Business Development",
    "Battery Technology",
    "Supply Chain & Procurement",
    "Human Resources"
  ],
  "positions": [
    "Senior EV Systems Engineer",
    "Lead UI/UX Designer",
    "Fleet Operations Manager",
    "Battery Safety Specialist",
    "Full Stack IoT Developer",
    "Branding & Marketing Specialist",
    "Field Quality Inspector",
    "B2B Key Account Manager"
  ],
  "interviewPlatforms": [
    "Google Meet",
    "Microsoft Teams",
    "Zoom",
    "In-person",
    "Other"
  ],
  "questionCategories": [
    {
      "id": "cat-general",
      "name": "General & Motivation",
      "description": "Core alignment with Transvolt EV mission and culture",
      "order": 1
    },
    {
      "id": "cat-technical",
      "name": "Technical & Tool Proficiency",
      "description": "Hands-on engineering, diagnostic tools, and technical domain proficiency",
      "order": 2
    },
    {
      "id": "cat-logistics",
      "name": "Operations & Work Logistics",
      "description": "Hub location, duty commitments, and site visit readiness",
      "order": 3
    },
    {
      "id": "cat-volume",
      "name": "Skill Volume & Rating Gauges",
      "description": "Self-assessed volume/rating scale sliders for quick calibration",
      "order": 4
    }
  ],
  "candidateQuestions": [
    {
      "id": "q-why-transvolt",
      "categoryId": "cat-general",
      "title": "Why do you want to join Transvolt?",
      "description": "Describe what excites you about commercial fleet electrification.",
      "fieldType": "PARAGRAPH",
      "required": true,
      "placeholder": "Explain your motivation and alignment with our green mobility mission...",
      "order": 1
    },
    {
      "id": "q-why-hire-you",
      "categoryId": "cat-general",
      "title": "Why should Transvolt hire you for this role?",
      "description": "Highlight your key strengths and readiness to deliver impact.",
      "fieldType": "PARAGRAPH",
      "required": true,
      "placeholder": "Share what makes your background uniquely qualified...",
      "order": 2
    },
    {
      "id": "q-powertrain-volume",
      "categoryId": "cat-volume",
      "title": "EV Powertrain & Battery Telematics Proficiency",
      "description": "Adjust the volume level from 1 (Novice) to 10 (Master Architect).",
      "fieldType": "VOLUME_SLIDER",
      "required": true,
      "sliderConfig": {
        "min": 1,
        "max": 10,
        "step": 1,
        "unit": " / 10",
        "leftLabel": "1 - Novice",
        "rightLabel": "10 - Master Architect"
      },
      "order": 3
    },
    {
      "id": "q-tools-checkbox",
      "categoryId": "cat-technical",
      "title": "Primary Engineering & Telematics Software You Master",
      "description": "Select all software and tools you have hands-on production experience with.",
      "fieldType": "MULTI_CHECKBOX",
      "required": false,
      "options": [
        "Vector CANoe",
        "Altium Designer",
        "MATLAB / Simulink",
        "AutoCAD",
        "SolidWorks",
        "Python / C++",
        "Fleetx / Samsara"
      ],
      "order": 4
    },
    {
      "id": "q-preferred-hub",
      "categoryId": "cat-logistics",
      "title": "Preferred Transvolt Base Site / Hub",
      "description": "Choose your primary preferred reporting site.",
      "fieldType": "DROPDOWN",
      "required": true,
      "options": [
        "Mumbai HQ (Powai)",
        "Navi Mumbai Hub",
        "Thane Depot",
        "Pune Regional Office",
        "Hybrid"
      ],
      "order": 5
    },
    {
      "id": "q-duties-comfort",
      "categoryId": "cat-logistics",
      "title": "Are you comfortable with the core responsibilities outlined in the job description?",
      "fieldType": "CHECKBOX",
      "required": true,
      "order": 6
    },
    {
      "id": "q-travel-willingness",
      "categoryId": "cat-logistics",
      "title": "Are you willing to travel for fleet depot audits or emergency technical visits if required?",
      "fieldType": "YES_NO",
      "required": true,
      "order": 7
    },
    {
      "id": "q-hv-safety-volume",
      "categoryId": "cat-volume",
      "title": "High-Voltage Battery Safety & ARAI Compliance Familiarity",
      "description": "Volume gauge for automotive high-voltage compliance and safety standards.",
      "fieldType": "VOLUME_SLIDER",
      "required": true,
      "sliderConfig": {
        "min": 1,
        "max": 10,
        "step": 1,
        "unit": " / 10",
        "leftLabel": "1 - Basic",
        "rightLabel": "10 - Deep Specialist"
      },
      "order": 8
    }
  ],
  "settings": {
    "companyName": "Transvolt Mobility Private Limited",
    "hrContactPerson": "HR Recruitment Cell (Faheem S.)",
    "hrContactPhone": "+91 98200 12345",
    "officeAddress": "Transvolt Mobility HQ, 4th Floor, Tech Park, Powai, Mumbai, Maharashtra 400076",
    "recruitmentEmail": "careers@transvoltmobility.com",
    "defaultDeadlineDays": 7,
    "maxUploadSizeMb": 10,
    "allowedFileTypes": [
      ".pdf",
      ".jpg",
      ".jpeg",
      ".png",
      ".doc",
      ".docx"
    ],
    "departments": [
      "Design & Branding",
      "EV Engineering & Powertrain",
      "Fleet Operations",
      "Software & IoT",
      "Sales & Business Development",
      "Battery Technology",
      "Supply Chain & Procurement",
      "Human Resources"
    ],
    "positions": [
      "Senior EV Systems Engineer",
      "Lead UI/UX Designer",
      "Fleet Operations Manager",
      "Battery Safety Specialist",
      "Full Stack IoT Developer",
      "Branding & Marketing Specialist",
      "Field Quality Inspector",
      "B2B Key Account Manager"
    ],
    "interviewPlatforms": [
      "Google Meet",
      "Microsoft Teams",
      "Zoom",
      "In-person",
      "Other"
    ],
    "questionCategories": [
      {
        "id": "cat-general",
        "name": "General & Motivation",
        "description": "Core alignment with Transvolt EV mission and culture",
        "order": 1
      },
      {
        "id": "cat-technical",
        "name": "Technical & Tool Proficiency",
        "description": "Hands-on engineering, diagnostic tools, and technical domain proficiency",
        "order": 2
      },
      {
        "id": "cat-logistics",
        "name": "Operations & Work Logistics",
        "description": "Hub location, duty commitments, and site visit readiness",
        "order": 3
      },
      {
        "id": "cat-volume",
        "name": "Skill Volume & Rating Gauges",
        "description": "Self-assessed volume/rating scale sliders for quick calibration",
        "order": 4
      }
    ],
    "candidateQuestions": [
      {
        "id": "q-why-transvolt",
        "categoryId": "cat-general",
        "title": "Why do you want to join Transvolt?",
        "description": "Describe what excites you about commercial fleet electrification.",
        "fieldType": "PARAGRAPH",
        "required": true,
        "placeholder": "Explain your motivation and alignment with our green mobility mission...",
        "order": 1
      },
      {
        "id": "q-why-hire-you",
        "categoryId": "cat-general",
        "title": "Why should Transvolt hire you for this role?",
        "description": "Highlight your key strengths and readiness to deliver impact.",
        "fieldType": "PARAGRAPH",
        "required": true,
        "placeholder": "Share what makes your background uniquely qualified...",
        "order": 2
      },
      {
        "id": "q-powertrain-volume",
        "categoryId": "cat-volume",
        "title": "EV Powertrain & Battery Telematics Proficiency",
        "description": "Adjust the volume level from 1 (Novice) to 10 (Master Architect).",
        "fieldType": "VOLUME_SLIDER",
        "required": true,
        "sliderConfig": {
          "min": 1,
          "max": 10,
          "step": 1,
          "unit": " / 10",
          "leftLabel": "1 - Novice",
          "rightLabel": "10 - Master Architect"
        },
        "order": 3
      },
      {
        "id": "q-tools-checkbox",
        "categoryId": "cat-technical",
        "title": "Primary Engineering & Telematics Software You Master",
        "description": "Select all software and tools you have hands-on production experience with.",
        "fieldType": "MULTI_CHECKBOX",
        "required": false,
        "options": [
          "Vector CANoe",
          "Altium Designer",
          "MATLAB / Simulink",
          "AutoCAD",
          "SolidWorks",
          "Python / C++",
          "Fleetx / Samsara"
        ],
        "order": 4
      },
      {
        "id": "q-preferred-hub",
        "categoryId": "cat-logistics",
        "title": "Preferred Transvolt Base Site / Hub",
        "description": "Choose your primary preferred reporting site.",
        "fieldType": "DROPDOWN",
        "required": true,
        "options": [
          "Mumbai HQ (Powai)",
          "Navi Mumbai Hub",
          "Thane Depot",
          "Pune Regional Office",
          "Hybrid"
        ],
        "order": 5
      },
      {
        "id": "q-duties-comfort",
        "categoryId": "cat-logistics",
        "title": "Are you comfortable with the core responsibilities outlined in the job description?",
        "fieldType": "CHECKBOX",
        "required": true,
        "order": 6
      },
      {
        "id": "q-travel-willingness",
        "categoryId": "cat-logistics",
        "title": "Are you willing to travel for fleet depot audits or emergency technical visits if required?",
        "fieldType": "YES_NO",
        "required": true,
        "order": 7
      },
      {
        "id": "q-hv-safety-volume",
        "categoryId": "cat-volume",
        "title": "High-Voltage Battery Safety & ARAI Compliance Familiarity",
        "description": "Volume gauge for automotive high-voltage compliance and safety standards.",
        "fieldType": "VOLUME_SLIDER",
        "required": true,
        "sliderConfig": {
          "min": 1,
          "max": 10,
          "step": 1,
          "unit": " / 10",
          "leftLabel": "1 - Basic",
          "rightLabel": "10 - Deep Specialist"
        },
        "order": 8
      }
    ]
  }
};

/**
 * ============================================================================
 * INFINITY BANGLADESH - VOLUNTEER & MEMBERSHIP APPLICATION GOOGLE BACKEND
 * ============================================================================
 * 
 * এই Google Apps Script-টি ইনফিনিটি বাংলাদেশের ওয়েবসাইট থেকে সাবমিট করা
 * সদস্যপদ ও স্বেচ্ছাসেবী আবেদন সরাসরি Google Sheet-এ সংরক্ষণ করে এবং
 * আপলোডকৃত ছবি Google Drive-এর নির্দিষ্ট ফোল্ডারে সেভ করে তার লিঙ্ক শিটে বসিয়ে দেয়।
 * 
 * ----------------------------------------------------------------------------
 * এটি সেটআপ করার সহজ ধাপসমূহ (মাত্র ১ মিনিট লাগবে):
 * ----------------------------------------------------------------------------
 * ১. একটি নতুন Google Sheet খুলুন (যেমন নাম দিন: "Infinity Bangladesh Volunteer Database")।
 * ২. উপরের মেনু থেকে: Extensions > Apps Script-এ ক্লিক করুন।
 * ৩. কোড এডিটরে থাকা আগের কোড মুছে এই সম্পূর্ণ ফাইলের কোডটি পেস্ট করুন।
 * ৪. উপরে ডানপাশে "Deploy" বাটনে ক্লিক করুন > "New deployment" নির্বাচন করুন।
 * ৫. "Select type" (গিয়ার আইকন) থেকে "Web app" সিলেক্ট করুন।
 * ৬. নিচের সেটিংস ঠিক করুন:
 *    - Description: Infinity Volunteer Webhook Backend
 *    - Execute as: Me (আপনার গুগল অ্যাকাউন্ট)
 *    - Who has access: Anyone (যেকোনো ব্যক্তি - এটি অত্যন্ত জরুরি যাতে ওয়েবসাইট থেকে ডাটা আসতে পারে)
 * ৭. "Deploy" বাটনে ক্লিক করুন এবং পারমিশন চাইলে "Authorize access" দিন (Advanced > Go to script (unsafe) > Allow)।
 * ৮. তৈরি হওয়া "Web app URL" (যেমন: https://script.google.com/macros/s/AKfycb.../exec) কপি করুন।
 * ৯. ইনফিনিটি বাংলাদেশ অ্যাডমিন প্যানেলে (Admin > Volunteer Settings) অথবা ওয়েবসাইটে পেস্ট করুন।
 * ============================================================================
 */

// (ঐচ্ছিক) যদি সরাসরি script.google.com থেকে প্রজেক্ট তৈরি করেন, তবে আপনার গুগল শিটের URL বা ID এখানে দিতে পারেন
var TARGET_SPREADSHEET_ID_OR_URL = "";

// Google Drive ফোল্ডারের নাম যেখানে আবেদনকারীদের ছবি সংরক্ষিত হবে
var DRIVE_FOLDER_NAME = "Infinity Bangladesh Volunteer Photos";

// Google Sheet-এর কলাম হেডারের তালিকা (ক্রম অনুযায়ী)
var SHEET_HEADERS = [
  "Timestamp (জমার সময়)",
  "Tracking Ref (রেফারেন্স নং)",
  "Full Name (সম্পূর্ণ নাম)",
  "Full Name Bangla (বাংলা নাম)",
  "Full Name English (ইংরেজি নাম)",
  "Email (ইমেইল)",
  "Mobile Phone (মোবাইল নম্বর)",
  "WhatsApp Number (হোয়াটসঅ্যাপ)",
  "Facebook Profile (ফেসবুক লিংক)",
  "Photo Link (গুগল ড্রাইভ ছবি)",
  "Father's Name (পিতার নাম)",
  "Mother's Name (মাতার নাম)",
  "Guardian Phone (অভিভাবকের ফোন)",
  "Present District (বর্তমান জেলা)",
  "Present Upazila (বর্তমান উপজেলা)",
  "Present Address Details (বর্তমান বিস্তারিত ঠিকানা)",
  "Permanent District (স্থায়ী জেলা)",
  "Permanent Upazila (স্থায়ী উপজেলা)",
  "Permanent Address Details (স্থায়ী বিস্তারিত ঠিকানা)",
  "Date of Birth (জন্ম তারিখ)",
  "Gender (লিঙ্গ)",
  "Blood Group (রক্তের গ্রুপ)",
  "NID / Birth Certificate (জাতীয় পরিচয়পত্র/জন্ম সনদ)",
  "Educational Status (শিক্ষাগত অবস্থা)",
  // High School
  "School Name (বিদ্যালয়ের নাম)",
  "Current Class (বর্তমান শ্রেণি)",
  "Expected SSC Year (সম্ভাব্য SSC বছর)",
  // SSC
  "SSC Institution (SSC প্রতিষ্ঠান)",
  "SSC Group (SSC বিভাগ)",
  "SSC Passing Year (SSC পাশের বছর)",
  "SSC Board (SSC বোর্ড)",
  // HSC
  "HSC Institution (HSC প্রতিষ্ঠান)",
  "HSC Group (HSC বিভাগ)",
  "HSC Passing Year (HSC পাশের বছর)",
  "HSC Board (HSC বোর্ড)",
  // Diploma
  "Diploma Technology (ডিপ্লোমা বিষয়/টেকনোলজি)",
  "Diploma Institute (পলিটেকনিক/ইনস্টিটিউট)",
  "Diploma Department (ডিপ্লোমা বিভাগ)",
  "Diploma Semester (ডিপ্লোমা সেমিস্টার/পর্ব)",
  "Diploma Status (ডিপ্লোমা স্ট্যাটাস)",
  "Diploma Passing/Expected Year (ডিপ্লোমা পাশের বছর)",
  // Honours
  "Honours Institute (স্নাতক প্রতিষ্ঠান)",
  "Honours Subject (স্নাতক বিষয়)",
  "Honours Department (স্নাতক বিভাগ)",
  "Honours Year/Semester (স্নাতক বর্ষ/সেমিস্টার)",
  "Honours Status (স্নাতক স্ট্যাটাস)",
  "Honours Passing/Expected Year (স্নাতক পাশের বছর)",
  // Masters
  "Masters Institute (মাস্টার্স প্রতিষ্ঠান)",
  "Masters Subject (মাস্টার্স বিষয়)",
  "Masters Department (মাস্টার্স বিভাগ)",
  "Masters Status (মাস্টার্স স্ট্যাটাস)",
  "Masters Passing Year (মাস্টার্স পাশের বছর)",
  // Other Education
  "Other Education (অন্যান্য শিক্ষাগত বিবরণ)",
  // Skills & Engagement
  "Skills (দক্ষতাসমূহ)",
  "Availability (সময় দেওয়ার সক্ষমতা)",
  "Referral Source (যেভাবে জেনেছেন)",
  "Previous Experience (পূর্ব অভিজ্ঞতা)",
  "Motivation / Reason (যোগদানের কারণ ও প্রত্যাশা)",
  "Agreed Terms (শর্তাবলিতে সম্মতি)",
  "Status (আবেদনের অবস্থা)"
];

/**
 * HTTP POST রিকোয়েস্ট হ্যান্ডলার (ওয়েবসাইট থেকে ফর্ম সাবমিটের সময় কল হয়)
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    // একই সাথে একাধিক সাবমিট হ্যান্ডেল করার জন্য 30 সেকেন্ড লক রাখা হয়
    lock.waitLock(30000);

    var data;
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        data = e.parameter || {};
      }
    } else {
      data = e.parameter || {};
    }

    var sheet = getOrCreateVolunteerSheet();
    var timestamp = new Date();
    var trackingRef = data.trackingRef || data.id || ("INF-VOL-" + Utilities.formatDate(timestamp, "Asia/Dhaka", "yyyyMMdd-HHmmss"));

    // ১. ছবি Google Drive-এ আপলোড ও শেয়ারেবল লিংক তৈরি
    var photoUrl = "";
    if (data.photoBase64 && data.photoBase64.length > 50) {
      photoUrl = saveImageToDrive(data.photoBase64, data.fullNameEn || data.fullName || "Applicant", trackingRef);
    } else if (data.photoUrl) {
      photoUrl = data.photoUrl;
    }

    // ২. শিটের রো ডাটা প্রস্তুতকরণ
    var rowData = [
      timestamp,
      trackingRef,
      data.fullName || "",
      data.fullNameBn || "",
      data.fullNameEn || "",
      data.email || "",
      data.phone || "",
      data.whatsapp || "",
      data.facebookUrl || "",
      photoUrl,
      data.fatherName || "",
      data.motherName || "",
      data.guardianPhone || "",
      data.district || data.presentDistrict || "",
      data.upazila || data.presentUpazila || "",
      data.presentAddressDetails || "",
      data.permanentDistrict || (data.isSameAddress ? (data.district || data.presentDistrict) : ""),
      data.permanentUpazila || (data.isSameAddress ? (data.upazila || data.presentUpazila) : ""),
      data.permanentAddressDetails || (data.isSameAddress ? data.presentAddressDetails : ""),
      data.dob || "",
      data.gender || "",
      data.bloodGroup || "",
      data.nidOrBirthCert || "",
      getEducationCategoryLabel(data.educationCategory),
      // High School
      data.schoolName || "",
      data.currentClass || "",
      data.expectedSscYear || "",
      // SSC
      data.sscInstitution || "",
      data.sscGroup || "",
      data.sscPassingYear || "",
      data.sscBoard || "",
      // HSC
      data.hscInstitution || "",
      data.hscGroup || "",
      data.hscPassingYear || "",
      data.hscBoard || "",
      // Diploma
      data.diplomaTechnology || "",
      data.diplomaInstitute || "",
      data.diplomaDepartment || "",
      data.diplomaSemester || "",
      data.diplomaStatus || "",
      data.diplomaPassingYear || "",
      // Honours
      data.honoursInstitute || "",
      data.honoursSubject || "",
      data.honoursDepartment || "",
      data.honoursYear || "",
      data.honoursStatus || "",
      data.honoursPassingYear || "",
      // Masters
      data.mastersInstitute || "",
      data.mastersSubject || "",
      data.mastersDepartment || "",
      data.mastersStatus || "",
      data.mastersPassingYear || "",
      // Other
      data.otherEducation || "",
      // Skills & Engagement
      Array.isArray(data.skills) ? data.skills.join(", ") : (data.skills || ""),
      data.availability || "",
      data.referralSource || "",
      data.hasPreviousVolunteering ? (data.previousExperience ? "Yes: " + data.previousExperience : "Yes") : "No",
      data.motivation || data.message || "",
      data.agreedCodeOfConduct ? "Yes (Accepted)" : "No",
      data.status || "New"
    ];

    // ৩. গুগল শিটে ডাটা সংরক্ষণ
    sheet.appendRow(rowData);

    // ৪. সফল রেসপন্স রিটার্ন
    var responseOutput = {
      status: "success",
      trackingRef: trackingRef,
      photoUrl: photoUrl,
      message: "আপনার সদস্যপদ আবেদন সফলভাবে জমা হয়েছে। আমাদের টিম আপনার তথ্য যাচাই করে প্রয়োজনীয় যোগাযোগ করবে। ধন্যবাদ।"
    };

    return ContentService
      .createTextOutput(JSON.stringify(responseOutput))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    var errorOutput = {
      status: "error",
      message: error.toString()
    };
    return ContentService
      .createTextOutput(JSON.stringify(errorOutput))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

/**
 * HTTP GET রিকোয়েস্ট হ্যান্ডলার (হেলথ চেক ও স্ট্যাটাস যাচাইয়ের জন্য)
 */
function doGet(e) {
  var responseOutput = {
    status: "active",
    service: "Infinity Bangladesh Volunteer Webhook Backend",
    timestamp: new Date().toISOString(),
    instructions: "POST json data to this endpoint to record volunteer application into Google Sheets and Drive."
  };

  return ContentService
    .createTextOutput(JSON.stringify(responseOutput))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * ছবি Google Drive-এ সংরক্ষণ করে পাবলিক ভিউ লিঙ্ক প্রদান করে
 */
function saveImageToDrive(base64Data, applicantName, trackingRef) {
  try {
    // ডাটা URI ফরম্যাট ক্লিন করা (e.g. data:image/jpeg;base64,...)
    var contentType = "image/jpeg";
    var cleanBase64 = base64Data;

    if (base64Data.indexOf(",") > -1) {
      var parts = base64Data.split(",");
      var header = parts[0];
      cleanBase64 = parts[1];
      if (header.indexOf("image/png") > -1) contentType = "image/png";
      else if (header.indexOf("image/webp") > -1) contentType = "image/webp";
    }

    var decodedBytes = Utilities.base64Decode(cleanBase64);
    var blob = Utilities.newBlob(decodedBytes, contentType);
    var safeName = applicantName.replace(/[^a-zA-Z0-9_\u0980-\u09FF]/g, "_");
    var extension = contentType === "image/png" ? ".png" : (contentType === "image/webp" ? ".webp" : ".jpg");
    blob.setName("Photo_" + safeName + "_" + trackingRef + extension);

    // ফোল্ডার খোঁজা বা তৈরি করা
    var folder;
    var folders = DriveApp.getFoldersByName(DRIVE_FOLDER_NAME);
    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder(DRIVE_FOLDER_NAME);
    }

    var file = folder.createFile(blob);
    // ফাইলকে ভিউ এক্সেস দেওয়া
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return file.getUrl();
  } catch (err) {
    Logger.log("Error saving photo: " + err.toString());
    return "";
  }
}

/**
 * শিট খোঁজা বা হেডারসহ নতুন শিট তৈরি করা
 */
function getOrCreateVolunteerSheet() {
  var ss;
  if (TARGET_SPREADSHEET_ID_OR_URL && TARGET_SPREADSHEET_ID_OR_URL.trim() !== "") {
    var input = TARGET_SPREADSHEET_ID_OR_URL.trim();
    if (input.indexOf("http") === 0) {
      ss = SpreadsheetApp.openByUrl(input);
    } else {
      ss = SpreadsheetApp.openById(input);
    }
  } else {
    ss = SpreadsheetApp.getActiveSpreadsheet();
  }

  if (!ss) {
    throw new Error("No active spreadsheet found. Please specify TARGET_SPREADSHEET_ID_OR_URL.");
  }

  var sheet = ss.getSheetByName("Applications") || ss.getActiveSheet();

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(SHEET_HEADERS);
    // হেডার স্টাইলিং (সবুজ ব্যাকগ্রাউন্ড ও বোল্ড টেক্সট)
    var headerRange = sheet.getRange(1, 1, 1, SHEET_HEADERS.length);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#006A4E");
    headerRange.setFontColor("#FFFFFF");
    sheet.setFrozenRows(1);
  }

  return sheet;
}

/**
 * এডুকেশন ক্যাটাগরির পাঠযোগ্য লেবেল রূপান্তর
 */
function getEducationCategoryLabel(cat) {
  switch (cat) {
    case "high_school": return "উচ্চ বিদ্যালয়ে অধ্যয়নরত (SSC পাস করেনি)";
    case "ssc": return "SSC / সমমান পাস";
    case "hsc": return "HSC / সমমান পাস";
    case "diploma": return "Diploma (ডিপ্লোমা)";
    case "honours": return "Honours (স্নাতক / অনার্স)";
    case "masters": return "Masters (স্নাতকোত্তর / মাস্টার্স)";
    case "other": return "অন্যান্য";
    default: return cat || "অনির্দিষ্ট";
  }
}

"use client";

import { ArrowLeft, LogIn, Minus, Plus, UserPlus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// create auth.users: email*, password*
// create public.profiles: role (talent), first_name*, middle_name, last_name*, suffix, username (unique)*, phone*, birthday, address_list1*, address_list2, city*, province*, country*, bio
// create talents: display_name (reuse from profile), headline*, bio (talent biography),
// location (reuse from city + country), timezone (use default, PH timezone), primary_role*, skills (at least 1), years_experience (default 0), hourly_rate*, currency (defaults to USD anyway), availability*, onboarded_at (onboarded on data creation)

const NAME_SUFFIX_OPTIONS = [
  "Sr.",
  "Jr.",
  "I",
  "II",
  "III",
  "IV",
  "V",
  "MD",
  "PhD",
  "JD",
  "DDS",
  "RN",
  "CPA",
  "Esq.",
];

// Onboarding first page
function OnboardingFirstPage() {
  return (
    <>
      <label className="text-xs font-semibold text-gray-700 uppercase flex items-center gap-1">
        ONBOARDING FORM
      </label>
      <div className="flex-1 flex-col border border-slate-300 bg-white rounded-lg p-6 flex items-start justify-left text-gray-400 space-y-1">
        <h1 className="text-lg text-slate-900 font-bold transition-colors flex items-center gap-2 leading-tight uppercase">
          <UserPlus size={20} />
          <span>Talent Onboarding</span>
        </h1>
        <p className="w-2xl text-justify text-xs text-slate-500 italic tracking-wide flex items-center gap-1.5 mb-4">
          To onboard the talent successfully, please filled out the form below.
          All fields are not required with only the inputs with the red asterisk
          are necessary for a successful onboarding. Additional details can be
          added eventually post-onboarding.
        </p>
        <form className="w-full min-h-16 grid grid-cols-3 gap-2 space-y-2">
          <div className="w-full h-fit flex flex-col col-span-3 justify-center items-left">
            <label className="text-md font-semibold text-gray-700 uppercase items-center mt-3 flex flex-row gap-2">
              <LogIn size={20} />
              User Authentication
            </label>
          </div>
          <div className="w-full h-fit flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              name="emailAddress"
              className="w-full border border-gray-300 rounded-lg bg-white text-slate-800 text-sm px-4 py-1.5 transition focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
              placeholder="talent@example.com"
            />
          </div>
          <div className="w-full h-fit flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              className="w-full border border-gray-300 rounded-lg bg-white text-slate-800 text-sm px-4 py-1.5 transition focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
              placeholder="••••••••"
            />
          </div>
          <div className="w-full h-fit flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              name="confirmPassword"
              type="password"
              className="w-full border border-gray-300 rounded-lg bg-white text-slate-800 text-sm px-4 py-1.5 transition focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
              placeholder="••••••••"
            />
          </div>
          <div className="w-full h-fit flex flex-col col-span-3 justify-center items-left">
            <label className="text-md font-semibold text-gray-700 uppercase items-center  mt-3 flex flex-row gap-2">
              <LogIn size={20} />
              User Profile
            </label>
          </div>
          {/* First Name */}
          <div className="w-full h-fit flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              name="firstName"
              className="w-full border border-gray-300 rounded-lg bg-white text-slate-800 text-sm px-4 py-1.5 transition focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
              placeholder="John"
              required
            />
          </div>
          {/* Middle Name */}
          <div className="w-full h-fit flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Middle Name
            </label>
            <input
              name="middleName"
              className="w-full border border-gray-300 rounded-lg bg-white text-slate-800 text-sm px-4 py-1.5 transition focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
              placeholder="Michael"
            />
          </div>
          {/* Last Name */}
          <div className="w-full h-fit flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              name="lastName"
              className="w-full border border-gray-300 rounded-lg bg-white text-slate-800 text-sm px-4 py-1.5 transition focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
              placeholder="Doe"
              required
            />
          </div>
          {/* Suffix */}
          <div className="w-full h-fit flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Suffix
            </label>
            <select className="w-full border border-gray-300 rounded-lg bg-white text-slate-800 text-sm px-4 py-1.5 transition focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]">
              <option value="">Select suffix...</option>
              {NAME_SUFFIX_OPTIONS.map((suffix) => (
                <option key={suffix} value={suffix}>
                  {suffix}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full h-fill col-span-2"></div>
          {/* Username */}
          <div className="w-full h-fit flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              name="username"
              className="w-full border border-gray-300 rounded-lg bg-white text-slate-800 text-sm px-4 py-1.5 transition focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
              placeholder="johndoe_dev"
              required
            />
          </div>
          {/* Phone */}
          <div className="w-full h-fit flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              name="phone"
              className="w-full border border-gray-300 rounded-lg bg-white text-slate-800 text-sm px-4 py-1.5 transition focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
              placeholder="+1 (555) 000-0000"
              required
            />
          </div>
          {/* Birthday */}
          <div className="w-full h-fit flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Birthday
            </label>
            <input
              name="birthday"
              type="date"
              className="w-full border border-gray-300 rounded-lg bg-white text-slate-800 text-sm px-4 py-1.5 transition focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
            />
          </div>
          {/* Address Line 1 */}
          <div className="w-full h-fit flex flex-col col-span-3">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Address Line 1 <span className="text-red-500">*</span>
            </label>
            <input
              name="addressLine1"
              className="w-full border border-gray-300 rounded-lg bg-white text-slate-800 text-sm px-4 py-1.5 transition focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
              placeholder="123 Main Street"
              required
            />
          </div>
          {/* Address Line 2 */}
          <div className="w-full h-fit flex flex-col col-span-3">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Address Line 2
            </label>
            <input
              name="addressLine2"
              className="w-full border border-gray-300 rounded-lg bg-white text-slate-800 text-sm px-4 py-1.5 transition focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
              placeholder="Apt 4B (optional)"
            />
          </div>
          {/* City */}
          <div className="w-full h-fit flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              City <span className="text-red-500">*</span>
            </label>
            <input
              name="city"
              className="w-full border border-gray-300 rounded-lg bg-white text-slate-800 text-sm px-4 py-1.5 transition focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
              placeholder="Manila"
              required
            />
          </div>
          {/* Province */}
          <div className="w-full h-fit flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Province <span className="text-red-500">*</span>
            </label>
            <input
              name="province"
              className="w-full border border-gray-300 rounded-lg bg-white text-slate-800 text-sm px-4 py-1.5 transition focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
              placeholder="NCR"
              required
            />
          </div>
          {/* Country */}
          <div className="w-full h-fit flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Country <span className="text-red-500">*</span>
            </label>
            <input
              name="country"
              className="w-full border border-gray-300 rounded-lg bg-white text-slate-800 text-sm px-4 py-1.5 transition focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
              placeholder="Philippines"
              defaultValue="Philippines"
              required
            />
          </div>
          {/* Bio */}
          <div className="w-full h-fit flex flex-col col-span-3">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              name="bio"
              className="w-full border border-gray-300 rounded-lg bg-white text-slate-800 text-sm px-4 py-1.5 resize-none transition focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
              rows={3}
              placeholder="Tell us about yourself..."
            />
          </div>
        </form>
      </div>
    </>
  );
}

interface SkillsController {
  skills: string[];
  currentSkill: string;
  setCurrentSkill: React.Dispatch<React.SetStateAction<string>>;
  addSkill: () => void;
  removeSkill: (skill: string) => void;
}

interface OnboardingSecondPageProps {
  skills: SkillsController;
}

function OnboardingSecondPage({ skills }: OnboardingSecondPageProps) {
  return (
    <>
      <label className="text-xs font-semibold text-gray-700 uppercase flex items-center gap-1">
        TALENT INFORMATION
      </label>
      <div className="flex-1 flex-col border border-slate-300 bg-white rounded-lg p-6 flex items-start justify-left text-gray-400 space-y-1">
        <h1 className="text-lg text-slate-900 font-bold transition-colors flex items-center gap-2 leading-tight uppercase">
          <UserPlus size={20} />
          <span>Talent Profile Details</span>
        </h1>
        <p className="w-2xl text-justify text-xs text-slate-500 italic tracking-wide flex items-center gap-1.5 mb-4">
          Complete the talent-specific information below. These details will be
          used for profile visibility, rate matching, and client matching across
          the platform.
        </p>
        <form className="w-full min-h-16 grid grid-cols-3 gap-2 space-y-2">
          <div className="w-full h-fit flex flex-col col-span-3 justify-center items-left">
            <label className="text-md font-semibold text-gray-700 uppercase items-center mt-3 flex flex-row gap-2">
              <UserPlus size={20} />
              Talent Information
            </label>
          </div>
          {/* Headline */}
          <div className="w-full h-fit flex flex-col col-span-2">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Headline <span className="text-red-500">*</span>
            </label>
            <input
              name="headline"
              className="w-full border border-gray-300 rounded-lg bg-white text-slate-800 text-sm px-4 py-1.5 transition focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
              placeholder="Enter the headline here..."
              required
            />
          </div>
          {/* Primary Role */}
          <div className="w-full h-fit flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Primary Role <span className="text-red-500">*</span>
            </label>
            <input
              name="primaryRole"
              className="w-full border border-gray-300 rounded-lg bg-white text-slate-800 text-sm px-4 py-1.5 transition focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
              placeholder="Enter the talent's primary role here..."
              required
            />
          </div>
          {/* Hourly Rate */}
          <div className="w-full h-fit flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Hourly Rate <span className="text-red-500">*</span>
            </label>
            <input
              name="hourlyRate"
              type="number"
              step="0.01"
              className="w-full border border-gray-300 rounded-lg bg-white text-slate-800 text-sm px-4 py-1.5 transition focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
              placeholder="Enter the talent's hourly rate here..."
              required
            />
          </div>
          {/* Currency */}
          <div className="w-full h-fit flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Currency
            </label>
            <input
              name="currency"
              className="w-full border border-gray-300 rounded-lg bg-white text-slate-800 text-sm px-4 py-1.5 transition focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
              placeholder="Enter the currency here (USD is default)..."
              defaultValue="USD"
              maxLength={3}
            />
          </div>
          {/* Skills */}
          <div className="w-full h-fit flex flex-col row-span-2">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Skills <span className="text-red-500">*</span>
            </label>
            <div className="w-full flex items-center gap-1">
              <input
                name="skills"
                className="flex-1 border border-gray-300 rounded-lg bg-white text-slate-800 text-sm px-4 py-1.5 transition focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
                placeholder="Enter the skills of the talent..."
                onChange={(e) => skills.setCurrentSkill(e.target.value)}
                required
              />

              <button
                type="button"
                className="border border-slate-300 rounded-lg p-1 cursor-pointer hover:bg-slate-100"
                onClick={skills.addSkill}
              >
                <Plus size={24} />
              </button>
            </div>
            <div className="w-full min-h-12 mt-2 overflow-y-scroll flex flex-wrap gap-2">
              {skills.skills.map((skill) => (
                <span
                  key={skill}
                  className="w-fit h-fit rounded-xl py-0.5 px-2 bg-slate-600 text-white text-sm flex flex-row gap-1"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => skills.removeSkill(skill)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
          {/* Years of Experience */}
          <div className="w-full h-fit flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Years of Experience
            </label>
            <input
              name="yearsExperience"
              type="number"
              min="0"
              className="w-full border border-gray-300 rounded-lg bg-white text-slate-800 text-sm px-4 py-1.5 transition focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
              placeholder="Enter a number for the talent's YoE..."
              defaultValue={0}
            />
          </div>
          {/* Availability */}
          <div className="w-full h-fit flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Availability <span className="text-red-500">*</span>
            </label>
            <input
              name="availability"
              className="w-full border border-gray-300 rounded-lg bg-white text-slate-800 text-sm px-4 py-1.5 transition focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
              placeholder="Enter the talent's availability..."
              required
            />
          </div>

          {/* Bio */}
          <div className="w-full h-fit flex flex-col col-span-3">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Talent Biography
            </label>
            <textarea
              name="talentBio"
              className="w-full border border-gray-300 rounded-lg bg-white text-slate-800 text-sm px-4 py-1.5 resize-none transition focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
              rows={4}
              placeholder="Tell us about your experience, skills, and what makes you unique..."
            />
          </div>
          {/* Timezone */}
          <div className="w-full h-fit flex flex-col col-span-3">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Timezone
            </label>
            <input
              name="timezone"
              className="w-full border border-gray-300 rounded-lg bg-white text-slate-800 text-sm px-4 py-1.5 transition focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
              placeholder="e.g. Asia/Manila (default)"
              defaultValue="Asia/Manila"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export function OnboardingPageClient() {
  // Pagination
  const [formPage, setFormPage] = useState<number>(1);

  // Skills
  const [currentSkill, setCurrentSkill] = useState("");
  const [skills, setSkills] = useState<string[]>([]);

  function addSkill() {
    const trimmed = currentSkill.trim();

    if (!trimmed) return;

    setSkills((prev) => [...prev, trimmed]);
    setCurrentSkill("");
  }

  function removeSkill(skillToRemove: string) {
    setSkills((prev) => prev.filter((skill) => skill !== skillToRemove));
  }

  return (
    <div className="h-fit bg-slate-100 px-4 pt-4 space-y-3 pb-12">
      <div className="w-full flex flex-row justify-between mb-2">
        <span className="text-sm text-slate-500 uppercase flex items-left gap-2">
          <Link
            href={"/polaris/dash/talents"}
            className="flex flex-row gap-2 border-b border-transparent hover:border-slate-500"
          >
            <ArrowLeft size={18} /> Talents
          </Link>
          <span>/</span>
          <span className="font-semibold">ONBOARDING</span>
        </span>
      </div>
      <div className="w-full min-h-full grid grid-cols-12 space-x-2">
        <div className="col-span-8 flex flex-col">
          {formPage == 1 && <OnboardingFirstPage />}
          {formPage == 2 && (
            <OnboardingSecondPage
              skills={{
                skills,
                currentSkill,
                setCurrentSkill,
                addSkill,
                removeSkill,
              }}
            />
          )}
        </div>
        <div className="col-span-4">
          <label className="text-xs font-semibold text-gray-700 uppercase flex items-center gap-1">
            FORM NAVIGATION
          </label>
          <div className="flex-1 flex-col border border-slate-300 bg-white rounded-lg p-6 flex items-start justify-left text-gray-400 space-y-4">
            {/* Page Indicator */}
            <div className="w-full flex flex-col gap-2">
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                Progress
              </span>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${(formPage / 2) * 100}%` }}
                ></div>
              </div>
              <span className="text-xs text-slate-500 text-center">
                Page {formPage} of 2
              </span>
            </div>
            {/* Navigation Buttons */}
            <div className="w-full flex flex-col gap-2">
              {formPage > 1 && (
                <button
                  onClick={() => setFormPage(formPage - 1)}
                  className="w-full px-4 py-2 bg-slate-200 text-slate-700 hover:bg-slate-300 rounded-lg text-sm font-semibold uppercase transition"
                >
                  ← Previous
                </button>
              )}
              {formPage < 2 && (
                <button
                  onClick={() => setFormPage(formPage + 1)}
                  className="w-full px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-sm font-semibold uppercase transition"
                >
                  Next →
                </button>
              )}
              {formPage === 2 && (
                <button className="w-full px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg text-sm font-semibold uppercase transition">
                  Submit Onboarding
                </button>
              )}
            </div>
            {/* Form Steps */}
            <div className="w-full flex flex-col gap-2 border-t border-slate-300 pt-4">
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                Steps
              </span>
              <button
                onClick={() => setFormPage(1)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold uppercase transition ${
                  formPage === 1
                    ? "bg-blue-100 text-blue-700 border border-blue-300"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                1. User Authentication & Profile
              </button>
              <button
                onClick={() => setFormPage(2)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold uppercase transition ${
                  formPage === 2
                    ? "bg-blue-100 text-blue-700 border border-blue-300"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                2. Talent Information
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

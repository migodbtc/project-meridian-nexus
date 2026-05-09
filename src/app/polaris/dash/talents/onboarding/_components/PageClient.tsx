"use client";

import { queueFlashToast, showErrorToast, useFlashToast } from "@/utils/toast";
import {
  ArrowLeft,
  LogIn,
  Minus,
  Plus,
  UserPlus,
  User,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { OnboardingPayload, storeTalent } from "../page";

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
        <p className="w-full break-words text-xs text-slate-500 italic tracking-wide leading-relaxed mb-4">
          To onboard the talent successfully, please filled out the form below.
          All fields are not required with only the inputs with the red asterisk
          are necessary for a successful onboarding. Additional details can be
          added eventually post-onboarding.
        </p>
        <form className="w-full min-h-16 grid grid-cols-3 gap-2 space-y-2">
          <div className="w-full h-fit flex flex-col col-span-3 justify-center items-left">
            <label className="text-md font-semibold text-gray-700 uppercase items-center mt-3 flex flex-row gap-2">
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
  skillsInputRef: React.RefObject<HTMLInputElement | null>;
  addSkill: () => void;
  removeSkill: (skill: string) => void;
}

interface OnboardingSecondPageProps {
  skills: SkillsController;
}

function OnboardingSecondPage({ skills }: OnboardingSecondPageProps) {
  // Skill Input
  const skillInputRef = skills.skillsInputRef;

  function clearSkill() {
    if (skillInputRef.current) {
      skillInputRef.current.value = "";
    }
  }

  function focusSkill() {
    skillInputRef.current?.focus();
  }

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
        <p className="w-full wrap-break-word text-xs text-slate-500 italic tracking-wide leading-relaxed mb-4">
          Complete the talent-specific information below. These details will be
          used for profile visibility, rate matching, and client matching across
          the platform.
        </p>
        <form className="w-full min-h-16 grid grid-cols-3 gap-2 space-y-2">
          <div className="w-full h-fit flex flex-col col-span-3 justify-center items-left">
            <label className="text-md font-semibold text-gray-700 uppercase items-center mt-3 flex flex-row gap-2">
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
                ref={skillInputRef}
                className="flex-1 border border-gray-300 rounded-lg bg-white text-slate-800 text-sm px-4 py-1.5 transition focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
                placeholder="Enter the skills of the talent..."
                required
              />

              <button
                type="button"
                className="border border-slate-300 rounded-lg p-1 cursor-pointer hover:bg-slate-100"
                onClick={() => {
                  skills.addSkill();
                  clearSkill();
                  focusSkill();
                }}
              >
                <Plus size={24} />
              </button>
            </div>
            <div className="w-full min-h-16 mt-2 overflow-y-scroll flex flex-wrap gap-2">
              {skills.skills.map((skill) => (
                <span
                  key={skill}
                  className="w-fit h-fit rounded-xl py-0.5 px-2 bg-slate-600 text-white text-xs font-semibold flex flex-row gap-1 uppercase"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => skills.removeSkill(skill)}
                    className="cursor-pointer"
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

// OnboardingPageClient: contains the dynamic client-side UI for the onboarding page to separate server operations
// with the client operations such as useRef, useState, data mutation, etc
export function OnboardingPageClient() {
  // Utils
  useFlashToast();

  // onboarding: anything related to the top level of the form scope goes here
  // including (obvoiusly) payload + submission handler
  const [onboardingForm, setOnboardingForm] = useState<OnboardingPayload>({
    emailAddress: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    username: "",
    phone: "",
    birthday: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    province: "",
    country: "Philippines",
    bio: "",
    headline: "",
    primaryRole: "",
    hourlyRate: 0,
    currency: "USD",
    skills: [],
    yearsExperience: 0,
    availability: "",
    talentBio: "",
    timezone: "Asia/Manila",
  });

  const handleOnboardingSubmission = (payload: OnboardingPayload) => {
    storeTalent(payload);
  };

  // onboarding/skills: anything relevant to the skills section of the onboarding
  // form
  const skillInputRef = useRef<HTMLInputElement>(null);

  // onboarding/skills/addSkill: add a skill to the talent onboarding form
  // has validation to check for duplicates as of 5-9-2026
  function addSkill() {
    const value = skillInputRef.current?.value.trim();
    // validation
    if (!value) {
      showErrorToast("Please enter a non-empty input to parse a skill!");
      return;
    }

    if (onboardingForm.skills.includes(value.toLowerCase())) {
      showErrorToast(
        "The skill you have tried to add is already existing in the form. Try another skill!",
      );
      return;
    }

    // main logic
    setOnboardingForm((prev) => ({
      ...prev,
      skills: [...prev.skills, value.toLowerCase()],
    }));
    if (skillInputRef.current) skillInputRef.current.value = "";
  }

  // onboarding/skills/removeSkill: remove a skill to the current talent skill pool
  // within the onboarding form
  function removeSkill(skillToRemove: string) {
    setOnboardingForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  }

  // onboarding/pagination: for the navigation between the pages of the form
  const [formPage, setFormPage] = useState<number>(1);

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
                skills: onboardingForm.skills,
                skillsInputRef: skillInputRef,
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
          <div className="flex-1 flex-col flex items-start justify-left text-gray-400 space-y-2 border border-slate-300 bg-white p-2 rounded-lg">
            {/* Form Steps */}
            <div className="w-full flex gap-1">
              <button
                onClick={() => setFormPage(1)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-semibold  cursor-pointer transition ${
                  formPage === 1
                    ? "bg-[#3B4FBF]/10 text-[#2F3FA0]"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
                title="User Authentication & Profile"
              >
                <User size={20} />
              </button>
              <button
                onClick={() => setFormPage(2)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-semibold  cursor-pointer transition ${
                  formPage === 2
                    ? "bg-[#3B4FBF]/10 text-[#2F3FA0]"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
                title="Talent Information"
              >
                <Briefcase size={20} />
              </button>
            </div>
            {/* Navigation Buttons */}
            <div className="w-full flex flex-row gap-2 rounded-lg transition select-none">
              {formPage < 2 && (
                <div className="flex flex-row text-xs font-semibold gap-2 w-full">
                  <button
                    onClick={() => setFormPage(formPage + 1)}
                    className="flex-1 px-3 py-2 rounded-lg bg-[#3B4FBF]/10 text-[#2F3FA0] hover:bg-[#3B4FBF]/20 transition uppercase"
                  >
                    Next →
                  </button>
                  <button
                    className="flex-1 px-3 py-2 rounded-lg bg-slate-100 text-slate-400 cursor-not-allowed transition uppercase"
                    disabled
                  >
                    Submit Onboarding
                  </button>
                </div>
              )}
              {formPage > 1 && (
                <div className="flex flex-row text-xs font-semibold gap-2 w-full">
                  <button
                    onClick={() => setFormPage(formPage - 1)}
                    className="flex-1 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition uppercase"
                  >
                    ← Previous
                  </button>
                  <button
                    className="flex-1 px-3 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition uppercase"
                    onClick={(e) => {
                      handleOnboardingSubmission(onboardingForm);
                    }}
                  >
                    Submit Onboarding
                  </button>
                </div>
              )}
            </div>
          </div>
          <label className="text-xs font-semibold text-gray-700 uppercase flex items-center gap-1 mt-4">
            FORM PROGRESS
          </label>
        </div>
      </div>
    </div>
  );
}

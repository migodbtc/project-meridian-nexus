"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ArrowLeft,
  Check,
  Lock,
  Mail,
  ShieldCheck,
  UserPlus,
} from "lucide-react";
import { useFormStatus } from "react-dom";
import Layout from "@/layouts/AuthLayout";
import {
  isValidEmailFormat,
  passesPasswordRule,
  PASSWORD_RULE_MESSAGE,
} from "@/utils/validation/auth";
import { RegisterPayload } from "@/types/auth";
import { queueFlashToast, showErrorToast } from "@/utils/toast";

type SubmitButtonProps = {
  disabled: boolean;
};

type PolicySection = {
  heading: string;
  paragraphs: string[];
};

const PRIVACY_POLICY_SECTIONS: PolicySection[] = [
  {
    heading: "1. Collection and Purpose of Data",
    paragraphs: [
      "Account identity data (email address and authentication metadata) is collected to create, secure, and recover user accounts.",
      "Operational profile data (role, access scope, and audit context) is used to enforce role-based permissions and prevent unauthorized actions.",
      "Product activity data (login timestamps, module usage, and action history) is used to maintain platform integrity, investigate incidents, and improve workflow reliability.",
      "Business records entered by authorized users (CRM, finance, ledger, task, and project entries) are processed only to deliver requested service functions inside the Communeye platform.",
    ],
  },
  {
    heading: "2. Data Processing and Storage",
    paragraphs: [
      "Data is processed within the Next.js and Supabase application stack for authentication, authorization, data retrieval, and transaction history.",
      "Sensitive authentication operations use Supabase Auth and encrypted transport, while application records are stored in managed PostgreSQL services.",
      "Only data necessary for active modules and operational safeguards is retained, with access constrained by role-based controls and audit visibility.",
    ],
  },
  {
    heading: "3. Third-Party Disclosures",
    paragraphs: [
      "Communeye shares data only with infrastructure and service subprocessors necessary to operate the system (for example, secure hosting, authentication, and database services).",
      "No sale of personal data is performed. Disclosure may occur only when legally required or to protect security, rights, and lawful investigations.",
    ],
  },
  {
    heading: "4. Data Subject Rights",
    paragraphs: [
      "Users may request access, correction, or deletion of personal data, subject to legal and operational retention constraints.",
      "Users may request processing clarifications, data export for account-held records, and withdrawal from optional processing where applicable.",
      "Rights requests can be routed to Communeye through account administration channels defined by the service provider.",
    ],
  },
];

const TERMS_AND_CONDITIONS_SECTIONS: PolicySection[] = [
  {
    heading: "1. Service Provider Identity",
    paragraphs: [
      "This platform and related services are provided and operated by Communeye.",
      "Communeye delivers software functionality for authorized business operations including workflow management, data tracking, and system administration tools.",
    ],
  },
  {
    heading: "2. Intellectual Property",
    paragraphs: [
      "All platform software, interface elements, workflows, content structure, and underlying technology are owned by or licensed to Communeye.",
      "Users may access and use the service only within granted authorization and may not copy, reverse engineer, redistribute, or commercially exploit protected assets without written permission.",
    ],
  },
  {
    heading: "3. Limitation of Liability",
    paragraphs: [
      "Communeye provides the service in good faith with operational safeguards but does not guarantee uninterrupted availability or error-free operation at all times.",
      "To the maximum extent permitted by law, Communeye is not liable for indirect, incidental, special, or consequential damages arising from service use, interruptions, or third-party dependencies.",
      "Users remain responsible for lawful use, account security practices, and data submitted through authorized workflows.",
    ],
  },
];

type PolicyModalProps = {
  title: string;
  sections: PolicySection[];
  alreadyAccepted: boolean;
  onBack: () => void;
  onAccept: () => void;
};

function PolicyModal({
  title,
  sections,
  alreadyAccepted,
  onBack,
  onAccept,
}: PolicyModalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canAccept, setCanAccept] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const container = scrollRef.current;
      if (!container) return;
      const reachedBottom =
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 12;
      setCanAccept(reachedBottom);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    const reachedBottom =
      container.scrollTop + container.clientHeight >=
      container.scrollHeight - 12;
    setCanAccept(reachedBottom);
  };

  const isAcceptEnabled = alreadyAccepted || canAccept;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 px-4 py-8 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center">
          <span className="flex h-10 w-10 items-center justify-center text-[#3B4FBF]">
            <ShieldCheck size={22} />
          </span>
          <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
        </div>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="max-h-[58vh] space-y-5 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-4"
        >
          {sections.map((section) => (
            <section key={section.heading} className="space-y-2">
              <h4 className="text-sm font-semibold text-slate-900">
                {section.heading}
              </h4>
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-sm leading-relaxed text-slate-700"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <button
            type="button"
            onClick={onAccept}
            disabled={!isAcceptEnabled}
            className="rounded-lg bg-[#3B4FBF] px-5 py-2 text-sm font-semibold text-white  transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50  hover:cursor-pointer"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

function SubmitButton({ disabled }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  const isDisabled = pending || disabled;

  return (
    <button
      type="submit"
      disabled={isDisabled}
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-[#3B4FBF] to-amber-400 py-2 font-semibold text-white transition hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <UserPlus size={18} />
      {pending ? "CREATING..." : "CREATE ACCOUNT"}
    </button>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [registerForm, setRegisterForm] = useState<RegisterPayload>({
    RegisterEmail: "",
    RegisterPassword: "",
    RegisterConfirmPassword: "",
    RegisterAgreeToTerms: false,
    RegisterAgreeToPrivacy: false,
  });
  const [activeModal, setActiveModal] = useState<"terms" | "privacy" | null>(
    null,
  );

  useEffect(() => {
    if (!activeModal) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [activeModal]);

  const handleRegisterInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = event.target;
    setRegisterForm(
      (prev) =>
        ({
          ...prev,
          [name]: type === "checkbox" ? checked : value,
        }) as RegisterPayload,
    );
  };

  const registerAction = async (prevState: string[], formData: FormData) => {
    void prevState;
    void formData;

    const errors: string[] = [];

    if (!isValidEmailFormat(registerForm.RegisterEmail)) {
      errors.push("Email: invalid email format.");
    }

    if (!passesPasswordRule(registerForm.RegisterPassword)) {
      errors.push(`Password: ${PASSWORD_RULE_MESSAGE}`);
    }

    if (
      registerForm.RegisterPassword !== registerForm.RegisterConfirmPassword
    ) {
      errors.push("Confirm Password: must match Password.");
    }

    if (!registerForm.RegisterAgreeToTerms) {
      errors.push("Terms and Conditions: must be accepted.");
    }

    if (!registerForm.RegisterAgreeToPrivacy) {
      errors.push("Privacy Policy: must be accepted.");
    }

    if (errors.length > 0) return errors;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerForm),
      });

      const data = await res.json();

      if (!res.ok) return [data.error || "Registration failed"];

      queueFlashToast({
        type: "success",
        title: "Registration complete",
        description:
          "Account created successfully. Confirm your email before signing in.",
      });
      router.push("/polaris/auth/login");
      return [];
    } catch (err) {
      console.error("Register error:", err);
      return ["An error occurred. Please try again."];
    }
  };

  const [registerErrors, action] = useActionState(registerAction, []);

  useEffect(() => {
    if (registerErrors.length === 0) return;
    showErrorToast("Invalid input fields", registerErrors.join(" "));
  }, [registerErrors]);

  const openTermsModal = () => setActiveModal("terms");
  const openPrivacyModal = () => setActiveModal("privacy");
  const closeActiveModal = () => setActiveModal(null);

  const acceptTerms = () => {
    setRegisterForm((prev) => ({ ...prev, RegisterAgreeToTerms: true }));
    closeActiveModal();
  };

  const acceptPrivacy = () => {
    setRegisterForm((prev) => ({ ...prev, RegisterAgreeToPrivacy: true }));
    closeActiveModal();
  };

  const consentMissing =
    !registerForm.RegisterAgreeToTerms || !registerForm.RegisterAgreeToPrivacy;

  return (
    <Layout cardTitle="Register">
      {activeModal === "terms" ? (
        <PolicyModal
          title="Terms and Conditions"
          sections={TERMS_AND_CONDITIONS_SECTIONS}
          alreadyAccepted={registerForm.RegisterAgreeToTerms}
          onBack={closeActiveModal}
          onAccept={acceptTerms}
        />
      ) : null}

      {activeModal === "privacy" ? (
        <PolicyModal
          title="Privacy Policy"
          sections={PRIVACY_POLICY_SECTIONS}
          alreadyAccepted={registerForm.RegisterAgreeToPrivacy}
          onBack={closeActiveModal}
          onAccept={acceptPrivacy}
        />
      ) : null}

      <form className="space-y-4" action={action}>
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
            <Mail size={18} />
            Email
          </label>
          <input
            type="email"
            name="RegisterEmail"
            placeholder="you@example.com"
            value={registerForm.RegisterEmail}
            onChange={handleRegisterInputChange}
            autoComplete="email"
            className="w-full rounded-lg border border-gray-300 text-slate-800 px-4 py-1.5 transition focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
          />
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
            <Lock size={18} />
            Password
          </label>
          <input
            type="password"
            name="RegisterPassword"
            placeholder="Create password"
            value={registerForm.RegisterPassword}
            onChange={handleRegisterInputChange}
            autoComplete="new-password"
            className="w-full rounded-lg border border-gray-300 text-slate-800 px-4 py-1.5 transition focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
          />
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
            <Lock size={18} />
            Confirm password
          </label>
          <input
            type="password"
            name="RegisterConfirmPassword"
            placeholder="Repeat password"
            value={registerForm.RegisterConfirmPassword}
            onChange={handleRegisterInputChange}
            autoComplete="new-password"
            className="w-full rounded-lg border border-gray-300 text-slate-800 px-4 py-1.5 transition focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-start gap-3 text-sm text-gray-700">
            <button
              type="button"
              onClick={openTermsModal}
              aria-label="Open Terms and Conditions"
              className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-md border border-slate-300 transition hover:border-[#3B4FBF] hover:cursor-pointer"
            >
              {registerForm.RegisterAgreeToTerms ? (
                <Check size={13} className="text-[#3B4FBF]" />
              ) : null}
            </button>
            <p>
              I agree to the{" "}
              <button
                type="button"
                onClick={openTermsModal}
                className="font-semibold text-[#3B4FBF] hover:underline  hover:cursor-pointer"
              >
                Terms and Conditions
              </button>
              .
            </p>
          </div>

          <div className="flex items-start gap-3 text-sm text-gray-700">
            <button
              type="button"
              onClick={openPrivacyModal}
              aria-label="Open Privacy Policy"
              className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-md border border-slate-300 transition hover:border-[#3B4FBF] hover:cursor-pointer"
            >
              {registerForm.RegisterAgreeToPrivacy ? (
                <Check size={13} className="text-[#3B4FBF]" />
              ) : null}
            </button>
            <p>
              I agree to the{" "}
              <button
                type="button"
                onClick={openPrivacyModal}
                className="font-semibold text-[#3B4FBF] hover:underline  hover:cursor-pointer"
              >
                Privacy Policy
              </button>
              .
            </p>
          </div>
        </div>

        <SubmitButton disabled={consentMissing} />
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have account?{" "}
        <Link
          href="/polaris/auth/login"
          className="font-semibold text-[#3B4FBF] hover:underline hover:cursor-pointer"
        >
          Sign in
        </Link>
      </p>
    </Layout>
  );
}

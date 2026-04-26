import Link from "next/link";
import { Mail, Phone, MessageSquare, Users, Code, Share2 } from "lucide-react";

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {

  return (
    <footer className="border-t-0 bg-linear-to-t from-black/20 to-[#0F1117]">
      <div className="max-w-7xl mx-auto px-16 py-12 flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand section */}
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-slate-200">
              Project North Star
            </h3>
            <p className="text-xs text-slate-400 text-justify">
              A comprehensive TaaS platform case study demonstrating unified
              financial ledger architecture for freelancer lifecycle
              management—from acquisition through payout.
            </p>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Socials
            </h4>
            <Link
              href="https://www.instagram.com/communeye.software"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-slate-400 hover:text-slate-200 transition-colors"
            >
              <MessageSquare size={16} />
              Instagram
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 text-xs text-slate-400 hover:text-slate-200 transition-colors"
            >
              <Users size={16} />
              LinkedIn
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 text-xs text-slate-400 hover:text-slate-200 transition-colors"
            >
              <Code size={16} />
              GitHub
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 text-xs text-slate-400 hover:text-slate-200 transition-colors"
            >
              <Share2 size={16} />
              Facebook
            </Link>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Contact
            </h4>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Phone size={16} />
              <span>+1 (555) 000-0000</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Mail size={16} />
              <span>contact@communeye.dev</span>
            </div>
          </div>

          {/* About */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              About
            </h4>
            <p className="text-xs text-slate-400 text-justify">
              Project North Star demonstrates Communeye Software's expertise in
              delivering comprehensive, end-to-end software solutions that
              address complex business challenges, integrate the full
              development lifecycle, and drive tangible real-world impact.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700" />

        {/* Bottom section */}
        <div className="flex justify-between items-center">
          <p className="text-xs text-slate-500">
            &copy; {CURRENT_YEAR} Communeye Software. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-slate-500">
            <Link href="#" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            |
            <Link href="#" className="hover:text-slate-300 transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

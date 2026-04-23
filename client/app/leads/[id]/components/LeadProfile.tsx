"use client";

import Image from "next/image";
import { MoreHorizontal, Mail, Phone, MapPin, MessageCircle, Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dropdown, DropdownItem } from "@/components/Dropdown";

interface LeadProfileProps {
  onEdit: () => void;
  onArchive: () => void;
  onMessage: () => void;
}

export function LeadProfile({ onEdit, onArchive, onMessage }: LeadProfileProps) {
  return (
    <div className="bg-white dark:bg-surface-dark p-8 rounded-3xl shadow-soft flex flex-col items-center text-center relative overflow-hidden border border-gray-100 dark:border-gray-800">
      <div className="absolute top-6 right-6">
        <Dropdown
          trigger={
            <button className="text-gray-400 hover:text-black dark:hover:text-white transition-colors">
              <MoreHorizontal className="w-6 h-6" />
            </button>
          }
        >
          <DropdownItem icon={Edit} onClick={onEdit}>Edit Lead</DropdownItem>
          <DropdownItem icon={Trash2} variant="danger" onClick={onArchive}>Archive Lead</DropdownItem>
        </Dropdown>
      </div>
      <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-xl mb-6 relative">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAHTfXMFV2Zew57yjLQG2yVXvlbgrL0VqzI_zJSAum9FRT0Xjusy2ax6HAGuMJj5KiB8GRz79KDq1R6GotjRe4WrslLh5J4BUdBSADcM1yMIulWE3dv99k5K6AI7Czx69A7ZBwh6HpXYXe1Gu8GvmnnZCO7XeAwp_8t11LSMdESkIkH1ljdVOPdn51pcN7p0C-8jfpMSFlzyAtlmjtf38Vr-yj1SWziqiZKBT5A91Igkfld1Q2odXKR7zsOoNZMf6gTqGWY-cngkU"
          alt="Devon"
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      <h2 className="text-2xl font-bold dark:text-white">Devon Lindsay</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-4">Unit 87 Interest</p>
      <span className="px-4 py-1.5 bg-red-50 text-red-600 text-[10px] font-bold rounded-full flex items-center gap-2 dark:bg-red-900/20 dark:text-red-400 border border-red-100 dark:border-red-900/30">
        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span> HOT LEAD
      </span>

      <div className="w-full border-t border-gray-100 dark:border-gray-800 my-8"></div>

      <div className="w-full flex flex-col gap-6">
        <div className="flex items-center gap-4 group">
          <div className="w-10 h-10 rounded-2xl bg-gray-50 dark:bg-gray-900 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-black transition-all">
            <Mail className="w-5 h-5" />
          </div>
          <div className="text-left">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email</p>
            <p className="text-sm font-bold dark:text-gray-200">devon.l@mail.com</p>
          </div>
        </div>
        <div className="flex items-center gap-4 group">
          <div className="w-10 h-10 rounded-2xl bg-gray-50 dark:bg-gray-900 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-black transition-all">
            <Phone className="w-5 h-5" />
          </div>
          <div className="text-left">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phone</p>
            <p className="text-sm font-bold dark:text-gray-200">+1 (555) 098-3321</p>
          </div>
        </div>
        <div className="flex items-center gap-4 group">
          <div className="w-10 h-10 rounded-2xl bg-gray-50 dark:bg-gray-900 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-black transition-all">
            <MapPin className="w-5 h-5" />
          </div>
          <div className="text-left">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Current</p>
            <p className="text-sm font-bold dark:text-gray-200">San Francisco, CA</p>
          </div>
        </div>
      </div>

      <button
        onClick={onMessage}
        className="w-full mt-8 bg-black text-white dark:bg-white dark:text-black py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-95 shadow-lg"
      >
        <MessageCircle className="w-5 h-5" /> Message
      </button>
    </div>
  );
}

"use client";

import { useState } from "react";

import DashboardLayout from "@/components/DashboardLayout";
import {
    MoreHorizontal,
    Mail,
    Phone,
    MapPin,
    TrendingUp,
    DollarSign,
    Map as MapIcon,
    Clock,
    Filter,
    ArrowRight,
    MessageCircle,
    Zap,
    ChevronDown,
    Calendar as CalendarIcon,
    Edit,
    Trash2,
    Eye,
    FileText
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import LeadPriceChart from "@/components/LeadPriceChart";
import { useStore } from "@/store/useStore";
import { Modal } from "@/components/Modal";
import { ActionButton } from "@/components/ActionComponents";
import { Dropdown, DropdownItem } from "@/components/Dropdown";

const activityLog = [
    { title: "Property Tour: Unit 87", desc: "Showed the client the master bedroom and terrace.", time: "2h ago", type: "In Person", active: true },
    { title: "Email Sent: Floor Plans", desc: "Sent requested PDF for 2-bedroom layout.", time: "Yesterday" },
    { title: "Phone Call", desc: "Discussed budget flexibility (+10%).", time: "Oct 24" },
    { title: "Lead Created", desc: "Inbound form submission.", time: "Oct 20", initial: true },
];

const propertyMatches = [
    { name: "The Skyline Loft", unit: "Unit 87 • 2 Bed • 2 Bath", price: "$2,600", match: "98%", tags: ["Balcony", "Gym"], img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmpiQHgBMAy9Ode0KKGgkseOm2d12byLj5NpgZ0x_GEEjfO6PINZ-4ySFNtsepQ8bIefY8qWT3NgDRdtqC1LkhI4tGkxSt3Wy0IJguGeNZi9CJN4pvIFHVE80j3n8M-pHMX5xnIZRqOBNFgP9kOlRNKxTVEzoxOvtaDUAA_zs6j26FzyEs98lsT1rIw_5--Z5Im_qzBN3A6ZDdAPIp3PSie5j3_8ZO9j_7e6I6IMWIYsFvYCrEm28Qf65K7hnlyoa6TwTVte7OIVw" },
    { name: "Modern Heights", unit: "Unit 12 • 1 Bed • 1 Bath", price: "$2,450", match: "85%", tags: ["Pool", "Parking"], img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCmy4tabf881P9NsV0f25Pwmdq91t-kWSwUqPK1iOuAu-beS09VvThswIk95FFIQ6x1gJoVUHDl3rrEHJ8Myq4Uzf3uCMH1wuBk9mj-JESQuzKJuaAFvrocziloOvtFrDrlX0o2ukV6FBJOPmvBaQF9QagzTdcHhTLRvaInGomtmQqn-mHI1xLPo3pr6VqTSOVWa1XHucISo6nY2ShBE4x95XxVJDGYchYzy51gDVxIHxrwrDuwpzCuJSrYx9hiWqs9m8An8kS7vS8" },
];

export default function LeadDetailsPage() {
    const { toggleDarkMode, showToast } = useStore();
    const [isViewingModalOpen, setIsViewingModalOpen] = useState(false);
    const [isContractModalOpen, setIsContractModalOpen] = useState(false);

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-8">
                {/* Custom Page Header */}
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-6">
                        <h1 className="text-3xl font-bold dark:text-white tracking-tight">Lead Details</h1>
                        <span className="px-4 py-1.5 text-[10px] font-bold bg-primary text-black rounded-full shadow-glow font-inter">ACTIVE DEAL</span>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-8">
                    {/* Lead Profile Sidebar */}
                    <div className="col-span-12 lg:col-span-3 flex flex-col gap-6">
                        <div className="bg-white dark:bg-surface-dark p-8 rounded-3xl shadow-soft flex flex-col items-center text-center relative overflow-hidden border border-gray-100 dark:border-gray-800">
                            <div className="absolute top-6 right-6">
                                <Dropdown
                                    trigger={
                                        <button className="text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                                            <MoreHorizontal className="w-6 h-6" />
                                        </button>
                                    }
                                >
                                    <DropdownItem icon={Edit} onClick={() => showToast("Editing lead details...")}>Edit Lead</DropdownItem>
                                    <DropdownItem icon={Trash2} variant="danger" onClick={() => showToast("Archiving lead...")}>Archive Lead</DropdownItem>
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
                                onClick={() => showToast("Opening chat with Devon Lindsay...")}
                                className="w-full mt-8 bg-black text-white dark:bg-white dark:text-black py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-95 shadow-lg"
                            >
                                <MessageCircle className="w-5 h-5" /> Message
                            </button>
                        </div>

                        <div className="bg-white dark:bg-surface-dark p-8 rounded-3xl shadow-soft border border-gray-100 dark:border-gray-800">
                            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Quick Actions</h3>
                            <div className="space-y-4">
                                <button
                                    onClick={() => setIsViewingModalOpen(true)}
                                    className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-all border border-gray-50 dark:border-gray-800 font-bold text-sm"
                                >
                                    Schedule Viewing
                                    <CalendarIcon className="w-4 h-4 text-primary" />
                                </button>
                                <button
                                    onClick={() => setIsContractModalOpen(true)}
                                    className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-all border border-gray-50 dark:border-gray-800 font-bold text-sm"
                                >
                                    Create Contract
                                    <FileText className="w-4 h-4 text-primary" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Middle Content */}
                    <div className="col-span-12 lg:col-span-9 flex flex-col gap-8">
                        {/* Top Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="bg-primary p-8 rounded-[2rem] flex flex-col justify-between relative group overflow-hidden shadow-glow">
                                <div className="absolute top-6 right-6 bg-black/10 p-1.5 rounded-full">
                                    <TrendingUp className="w-4 h-4 text-black" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-black/70 mb-2 uppercase tracking-widest">Lead Score</p>
                                    <h3 className="text-5xl font-black text-black">92<span className="text-xl font-bold opacity-40 ml-1">/100</span></h3>
                                </div>
                                <p className="text-[10px] font-bold text-black mt-6 tracking-wide">+5% VS LAST WEEK</p>
                                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
                            </div>

                            <div className="bg-surface-dark dark:bg-card-dark p-8 rounded-[2rem] flex flex-col justify-between shadow-soft">
                                <div className="flex justify-between items-start mb-4">
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Total Budget</p>
                                    <DollarSign className="w-4 h-4 text-primary" />
                                </div>
                                <h3 className="text-3xl font-bold text-white tracking-tight">$850k</h3>
                                <div className="w-full bg-gray-800 h-2 rounded-full mt-6 overflow-hidden">
                                    <div className="bg-primary h-full w-3/4 rounded-full shadow-glow"></div>
                                </div>
                                <p className="text-[10px] font-bold text-gray-500 mt-2 uppercase">PRE-APPROVED</p>
                            </div>

                            <div className="bg-surface-dark dark:bg-card-dark p-8 rounded-[2rem] flex flex-col justify-between shadow-soft">
                                <div className="flex justify-between items-start mb-4">
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Pref. Location</p>
                                    <MapIcon className="w-4 h-4 text-primary" />
                                </div>
                                <h3 className="text-2xl font-bold text-white tracking-tight">Downtown</h3>
                                <p className="text-[10px] font-bold text-gray-500 mt-2 uppercase tracking-wide">WITHIN 2mi RADIUS</p>
                                <div className="mt-4 flex -space-x-3">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="w-8 h-8 rounded-full bg-gray-800 border-2 border-surface-dark flex items-center justify-center text-[10px] font-bold text-white">
                                            {i === 1 ? 'A' : i === 2 ? 'B' : '+2'}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-surface-dark dark:bg-card-dark p-8 rounded-[2rem] flex flex-col justify-between shadow-soft border-2 border-primary/20">
                                <div className="flex justify-between items-start mb-4">
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Timeline</p>
                                    <Clock className="w-4 h-4 text-primary" />
                                </div>
                                <h3 className="text-3xl font-bold text-white tracking-tight">ASAP</h3>
                                <p className="text-[10px] font-bold text-primary mt-4 flex items-center gap-1 uppercase tracking-widest">
                                    <Zap className="w-3 h-3 animate-pulse" /> High Urgency
                                </p>
                                <p className="text-[10px] font-bold text-gray-500 mt-1 uppercase">MOVE IN BY NOV 1</p>
                            </div>
                        </div>

                        {/* Activity and Matches Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Activity Log */}
                            <div className="bg-white dark:bg-surface-dark p-8 rounded-3xl shadow-soft flex flex-col h-full border border-gray-100 dark:border-gray-800">
                                <div className="flex justify-between items-center mb-10">
                                    <h3 className="text-xl font-bold dark:text-white">Activity Log</h3>
                                    <button
                                        onClick={() => showToast("Filtering activity log")}
                                        className="w-10 h-10 rounded-2xl bg-gray-50 dark:bg-gray-900 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                                    >
                                        <Filter className="w-4 h-4 text-gray-400" />
                                    </button>
                                </div>
                                <div className="space-y-10 relative border-l-2 border-gray-100 dark:border-gray-800 ml-4 pl-10 pb-4">
                                    {activityLog.map((log, i) => (
                                        <div key={i} className="relative">
                                            <div className={cn(
                                                "absolute -left-[51px] top-0 w-5 h-5 rounded-full border-4 border-white dark:border-surface-dark shadow-md z-10",
                                                log.active ? "bg-black dark:bg-white" : log.initial ? "bg-primary" : "bg-gray-300 dark:bg-gray-700"
                                            )}></div>
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="text-sm font-bold dark:text-white leading-tight">{log.title}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">{log.desc}</p>
                                                </div>
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap ml-4">{log.time}</span>
                                            </div>
                                            {log.type && (
                                                <div className="mt-4 flex gap-2">
                                                    <span className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-900 text-[10px] font-bold text-gray-500 dark:text-gray-300 uppercase tracking-widest transition-all hover:bg-primary hover:text-black">
                                                        {log.type}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={() => showToast("Viewing full activity history...")}
                                    className="mt-auto w-full py-4 text-xs font-bold text-gray-400 hover:text-primary transition-all uppercase tracking-widest border-t border-gray-50 dark:border-gray-900"
                                >
                                    View all history
                                </button>
                            </div>

                            {/* Property Matches */}
                            <div className="flex flex-col gap-6 h-full">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-bold dark:text-white">Property Matches</h3>
                                    <div className="flex items-center gap-2 group cursor-pointer">
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest transition-colors group-hover:text-primary">Sort by match</span>
                                        <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                                    </div>
                                </div>

                                {propertyMatches.map((property, i) => (
                                    <div key={i} className="bg-white dark:bg-surface-dark p-4 rounded-[2rem] shadow-soft flex gap-6 items-center group cursor-pointer hover:shadow-xl transition-all border border-transparent hover:border-primary/30 relative active:scale-[0.98]">
                                        <div className="w-28 h-28 rounded-2xl overflow-hidden shrink-0 relative shadow-md">
                                            <Image src={property.img} alt={property.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" unoptimized />
                                            <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-md text-white text-[9px] font-black px-2 py-1 rounded-lg shadow-lg">
                                                {property.match} MATCH
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <h4 className="text-base font-bold dark:text-white group-hover:text-primary transition-colors">{property.name}</h4>
                                                <span className="text-sm font-black text-primary">{property.price}<span className="text-[10px] text-gray-400 font-bold ml-1">/MO</span></span>
                                            </div>
                                            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mt-1">{property.unit}</p>
                                            <div className="flex gap-2 mt-4">
                                                {property.tags.map((tag, ti) => (
                                                    <span key={ti} className="px-3 py-1 bg-gray-100 dark:bg-gray-900 rounded-lg text-[9px] font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <button className="w-10 h-10 rounded-full border border-gray-100 dark:border-gray-800 flex items-center justify-center bg-white dark:bg-surface-dark shadow-sm group-hover:bg-primary group-hover:border-primary group-hover:text-black transition-all absolute -right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:right-4">
                                            <ArrowRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}

                                <button
                                    onClick={() => showToast("Fetching more property matches...")}
                                    className="w-full py-5 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800 text-gray-400 text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-900 transition-all uppercase tracking-widest hover:border-primary hover:text-primary group"
                                >
                                    See 4 other matches <ArrowRight className="w-4 h-4 inline ml-2 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>

                        {/* Price Interest Trend Chart */}
                        <div className="bg-white dark:bg-surface-dark p-10 rounded-3xl shadow-soft mb-6 border border-gray-100 dark:border-gray-800">
                            <div className="flex flex-col md:flex-row justify-between md:items-center mb-10 gap-6">
                                <div>
                                    <h3 className="text-2xl font-bold dark:text-white">Price Interest Trend</h3>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2">Neighborhood average vs Lead Budget</p>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
                                        <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-glow"></span>
                                        <span className="text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest">Budget</span>
                                    </div>
                                    <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
                                        <span className="w-2.5 h-2.5 rounded-full bg-gray-400"></span>
                                        <span className="text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest">Market Avg</span>
                                    </div>
                                    <div className="relative">
                                        <select className="appearance-none bg-black dark:bg-white text-white dark:text-black pl-4 pr-10 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-primary cursor-pointer border-none shadow-lg">
                                            <option>Last 6 Months</option>
                                            <option>Last Year</option>
                                        </select>
                                        <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full h-64 relative">
                                <LeadPriceChart />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isViewingModalOpen}
                onClose={() => setIsViewingModalOpen(false)}
                title="Schedule Property Viewing"
            >
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Select Property</label>
                        <select className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-black/40 border-none focus:ring-2 focus:ring-primary text-sm appearance-none">
                            <option>The Skyline Loft - Unit 87</option>
                            <option>Modern Heights - Unit 12</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Date</label>
                            <input type="date" className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-black/40 border-none focus:ring-2 focus:ring-primary text-sm" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Time</label>
                            <input type="time" className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-black/40 border-none focus:ring-2 focus:ring-primary text-sm" />
                        </div>
                    </div>
                    <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-4">
                        <button onClick={() => setIsViewingModalOpen(false)} className="px-8 py-4 rounded-full text-sm font-bold text-gray-500 transition-colors">Cancel</button>
                        <ActionButton onClick={() => { setIsViewingModalOpen(false); showToast("Viewing scheduled for Devon Lindsay"); }}>Schedule Viewing</ActionButton>
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={isContractModalOpen}
                onClose={() => setIsContractModalOpen(false)}
                title="Generate New Contract"
            >
                <div className="space-y-6">
                    <div className="space-y-4">
                        <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
                            <p className="text-sm font-medium">Drafting contract for <span className="font-bold">Unit 87 at The Skyline Loft</span> for Devon Lindsay.</p>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Contract Type</label>
                            <select className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-black/40 border-none focus:ring-2 focus:ring-primary text-sm appearance-none">
                                <option>Standard Residential Lease</option>
                                <option>Short-term Rental Agreement</option>
                                <option>Commercial Lease</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Monthly Rent</label>
                                <input type="text" defaultValue="$2,600" className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-black/40 border-none focus:ring-2 focus:ring-primary text-sm font-bold" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Security Deposit</label>
                                <input type="text" defaultValue="$5,200" className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-black/40 border-none focus:ring-2 focus:ring-primary text-sm font-bold" />
                            </div>
                        </div>
                    </div>
                    <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-4">
                        <button onClick={() => setIsContractModalOpen(false)} className="px-8 py-4 rounded-full text-sm font-bold text-gray-500 transition-colors">Cancel</button>
                        <ActionButton onClick={() => { setIsContractModalOpen(false); showToast("Contract PDF generated and sent to lead"); }}>Generate & Send</ActionButton>
                    </div>
                </div>
            </Modal>
        </DashboardLayout>
    );
}

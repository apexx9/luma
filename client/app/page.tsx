"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { ArrowUpRight, X, ChevronDown, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import PriceTrendChart from "@/components/PriceTrendChart";
import { useStore } from "@/store/useStore";

const stats = [
  { name: "Rent", value: "$102,054.00", trend: "+5% vs last month", primary: true },
  { name: "Additional services", value: "$15,502.00", trend: "+2% vs last month" },
  { name: "Maintenance", value: "$42,612.08", trend: "-3% vs last month" },
  { name: "Debt", value: "$6,323.12", trend: "-3,108.42% vs last month" },
];

const requests = [
  { name: "Jaden Fischer", unit: "Unit 171", status: "New", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDahpOa39hkq5sS-B5_cRO7jtlpr8J7ZR5JduOTrwxC9jgwUTHTiI5D4uLzsxyDLd6slJd4MWFm-a0xT_95MSd46AQUBtqvHklMZPlgLYTaEuHny6vMYIoDrEcybFYZY4DlRvXdFvrP8DxVWSna-quAXwUxjE80WbGi0TrgwanWqMl0pR4rx4BeGZOE1Bax1Ddy0cODj6A6EYFcU9NqB0njMQ-RLMMzCmoQS49_Lr5chkE63lWXz7Px_yQMhpsN6s3vO6NHRtgv9Ug" },
  { name: "Aron Levine", unit: "Unit 49", status: "In Progress", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNJU_RoFDH1_NNO8GzLtVY29QSwgiZdmy28kZjJFO8-Fu-vMblvmFuwpgawHD5fo1qHvh0YaiXPRSXRwu10jezVBTCofV9424SD5As-7kMI6bv_rBteOry2q9eXHVyv2pCcrpGlnO93AOyRPYIQIjMKXhzQE3YM1IsNpV5i5ZasS-dSiir3QMbdsY1-E9kBaqW73awFl5HoEv3l3RQx8wbCsJp0qkfbJdIa_XRtlofMedFsv2Dqi3jxi7Py1oWPkCc1FtVMPb4WvI" },
  { name: "Tessa Tucker", unit: "Unit 65", status: "Pending", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBq_XKoFjDSyedqiEYVUTbELJfvPty4NAuqB2YyqiXfZrX1KbJwzKU8ZWBeBqmMcXW76tm2-Gr_53gkt3KtwQ-O3VczpPI-HfJzViq_XGO5Le8AcnR4zE648d5jG2tk9FxNDIcnRHscmbxGjLz7mT3G0O6jnINucKj3OKDDu2_RFDcjlkGA-BmEZOZaMK7MLz-TNcYbI5yHWdQF1QY0v2N8nUg9URbAZTtBjQjJcgaMD0HfyKB7tK5Zxbc3C2K_JvG5IeMC9cMXCDE" },
];

export default function OverviewPage() {
  const { showToast } = useStore();

  return (
    <DashboardLayout>
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold dark:text-white">Payments</h2>
            <button
              onClick={() => showToast("Filtering by current month")}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-surface-dark rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow dark:text-white border border-gray-100 dark:border-gray-800"
            >
              This month
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.name}
                className={cn(
                  "p-6 rounded-3xl relative overflow-hidden group border transition-all",
                  stat.primary
                    ? "bg-primary border-transparent shadow-glow"
                    : "bg-white dark:bg-surface-dark border-transparent dark:border-gray-800 shadow-soft"
                )}
              >
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <span className={cn("font-semibold", stat.primary ? "text-black/80" : "text-gray-500 dark:text-gray-400")}>
                    {stat.name}
                  </span>
                  <div className={cn(
                    "p-1.5 rounded-full transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform",
                    stat.primary ? "bg-black/10 text-black" : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-white"
                  )}>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
                <div className="relative z-10">
                  <h3 className={cn("text-3xl font-bold mb-1", stat.primary ? "text-black" : "dark:text-white")}>
                    {stat.value}
                  </h3>
                  <p className={cn("text-sm font-medium", stat.primary ? "text-black/60" : "text-gray-500 dark:text-gray-400")}>
                    {stat.trend}
                  </p>
                </div>
                {stat.primary && <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>}
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          <div className="lg:col-span-7 relative group rounded-3xl overflow-hidden shadow-soft h-[360px]">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLHulxMh37xuqTxLQr7DKIRvWvgU6QKyn_FqdD-eU1AEfuxBZYsCAeDs0GJ1E9td0PXAkh6UuvSz8Wf6jLXoev3xoNp9jOYWfW6R-EiwNAMhfeMsvcgoa7hHKJ2oXhKlpdkVRw8dldz-ODQRJaqmLmKjlZLklFMJALdtztSy1uWbBSAqKTW6oDyu0kHAs6qcMsreVN67AHsw0XNlnrWJnDDTV5OsPCHmzefop5GZh99qQBUYSt7UQkDUu6M_hGstbvCML7tX5Zt3M"
              alt="Modern Residential Complex"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              unoptimized
            />
            <button
              onClick={() => showToast("Gallery closed")}
              className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
            >
              <X className="w-5 h-5 text-black" />
            </button>
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-linear-to-t from-black/80 to-transparent">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary rounded-full mb-2">
                <span className="w-2 h-2 rounded-full bg-black"></span>
                <span className="text-[10px] font-bold text-black uppercase">Now Leasing</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Modern Residential Complex</h3>
              <p className="text-white/80 mt-1">12 new units available next month</p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white dark:bg-surface-dark p-6 rounded-3xl shadow-soft flex flex-col border border-transparent dark:border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold dark:text-white">Requests</h3>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <ArrowUpRight className="w-4 h-4 dark:text-white" />
              </button>
            </div>
            <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {requests.map((request, i) => (
                <Link
                  key={request.name}
                  href={`/leads/${i + 1}`}
                  className="flex items-center justify-between group cursor-pointer hover:bg-gray-100/50 dark:hover:bg-gray-800/50 p-2 -m-2 rounded-2xl transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <Image src={request.avatar} alt={request.name} fill sizes="40px" className="object-cover" unoptimized />
                    </div>
                    <div>
                      <p className="font-semibold dark:text-white group-hover:text-primary-hover transition-colors">{request.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{request.unit}</p>
                    </div>
                  </div>
                  <span className={cn(
                    "px-4 py-1.5 text-[10px] font-bold rounded-full",
                    request.status === "New" ? "bg-black dark:bg-white text-white dark:text-black" :
                      request.status === "In Progress" ? "bg-primary text-black" : "bg-blue-400 text-white"
                  )}>
                    {request.status}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 bg-white dark:bg-surface-dark p-8 rounded-3xl shadow-soft border border-transparent dark:border-gray-800">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-bold dark:text-white">Modern Residential Complex</h3>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <ArrowUpRight className="w-4 h-4 dark:text-white" />
              </button>
            </div>
            <div className="flex gap-8 mb-8 border-b border-gray-100 dark:border-gray-800 pb-6 overflow-x-auto no-scrollbar">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Residents</p>
                <p className="text-xl font-bold dark:text-white">1054</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Units</p>
                <p className="text-xl font-bold dark:text-white">512</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Vacant</p>
                <p className="text-xl font-bold dark:text-white">102</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Upcoming</p>
                <p className="text-xl font-bold dark:text-white">54</p>
              </div>
            </div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold dark:text-white">Price Trend</h4>
              <button
                onClick={() => showToast("Switching trend timescale")}
                className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-black rounded-lg text-xs font-medium dark:text-gray-300"
              >
                Last year
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            <div className="relative h-48 w-full">
              <PriceTrendChart />
            </div>
          </div>

          <div className="lg:col-span-6 bg-white dark:bg-surface-dark p-6 rounded-3xl shadow-soft border border-transparent dark:border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold dark:text-white">Upcoming units</h3>
              <button
                onClick={() => showToast("Showing upcoming units")}
                className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-black rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow dark:text-white border border-gray-200 dark:border-gray-700"
              >
                Next 6 months
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <div key={i} className="bg-gray-50 dark:bg-black/50 rounded-2xl overflow-hidden pb-3 border border-gray-100 dark:border-gray-800 group">
                  <div className="h-32 w-full overflow-hidden mb-3 relative">
                    <Image
                      src={i === 1 ? "https://lh3.googleusercontent.com/aida-public/AB6AXuBrtSgylNnExyqjzTFv3SduK578-QM7Rr_i-wYlrpQyNfHwaRCeKTWJqjJsAlNnw2Mhs2TTTOn9SSCtm0otTVjYm-bk8yvShzLdcq5BcV6QCPhSw_-KtdiqCl_rYQ85Xx-vGXnqRyyl4sfL_SYtbX3CNiNhGS2zXgirw8PSOWx-b5jT5dr65cmKmcfb32r0MvffYTn6DGVbyLLVbwlad07iCkppYvjTGiCYiz1bkTePkmRBujscVjeEYtcyreWz1tquQLmaBPkXxWk" : "https://lh3.googleusercontent.com/aida-public/AB6AXuDI83GJYjOYS-ziXkUei9WPLyw9X3DyF59UOiyEIGrf6MxZEpEWwsOWTpD4wy74xVxsraZ1-DYwg6aoSWQLBs-c_cFD-80NM4gIzhKAEMtajO_EyikBc87GKkLyPMeX1vJWU2mgFQVELL5zcp0fOnJgPywmKm9C6-4RrvKNSSRh091EWvvpp5-BAb-aBI1iK7G84dwTuxI_Ez6DTbnfTIPmdChP5ooUqLwerKwLynu8GyFHfM_0VgBGGdh8yAKcZgpM5fE2L4dWA2E"}
                      alt="Unit"
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      unoptimized
                    />
                  </div>
                  <div className="px-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-sm dark:text-gray-200">Unit {i === 1 ? '87' : '128'}</span>
                      <span className="font-bold text-sm dark:text-white">${i === 1 ? '2.600' : '3.450'} / m</span>
                    </div>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">Available from {i === 1 ? 'February 12' : 'March 1'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
    </DashboardLayout>
  );
}

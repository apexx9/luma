export interface Payment {
  id: string;
  resident: string;
  amount: string;
  date: string;
  status: string;
  method: string;
  avatar: string;
}

export const mockPayments: Payment[] = [
  {
    id: "PAY-9921",
    resident: "Jaden Fischer",
    amount: "$2,450.00",
    date: "Dec 01, 2024",
    status: "Paid",
    method: "Auto-pay (ACH)",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDahpOa39hkq5sS-B5_cRO7jtlpr8J7ZR5JduOTrwxC9jgwUTHTiI5D4uLzsxyDLd6slJd4MWFm-a0xT_95MSd46AQUBtqvHklMZPlgLYTaEuHny6vMYIoDrEcybFYZY4DlRvXdFvrP8DxVWSna-quAXwUxjE80WbGi0TrgwanWqMl0pR4rx4BeGZOE1Bax1Ddy0cODj6A6EYFcU9NqB0njMQ-RLMMzCmoQS49_Lr5chkE63lWXz7Px_yQMhpsN6s3vO6NHRtgv9Ug"
  },
  {
    id: "PAY-9918",
    resident: "Aron Levine",
    amount: "$2,100.00",
    date: "Dec 01, 2024",
    status: "Pending",
    method: "Credit Card",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNJU_RoFDH1_NNO8GzLtVY29QSwgiZdmy28kZjJFO8-Fu-vMblvmFuwpgawHD5fo1qHvh0YaiXPRSXRwu10jezVBTCofV9424SD5As-7kMI6bv_rBteOry2q9eXHVyv2pCcrpGlnO93AOyRPYIQIjMKXhzQE3YM1IsNpV5i5ZasS-dSiir3QMbdsY1-E9kBaqW73awFl5HoEv3l3RQx8wbCsJp0qkfbJdIa_XRtlofMedFsv2Dqi3jxi7Py1oWPkCc1FtVMPb4WvI"
  },
  {
    id: "PAY-9915",
    resident: "Tessa Tucker",
    amount: "$1,850.00",
    date: "Nov 30, 2024",
    status: "Paid",
    method: "ACH Transfer",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBq_XKoFjDSyedqiEYVUTbELJfvPty4NAuqB2YyqiXfZrX1KbJwzKU8ZWBeBqmMcXW76tm2-Gr_53gkt3KtwQ-O3VczpPI-HfJzViq_XGO5Le8AcnR4zE648d5jG2tk9FxNDIcnRHscmbxGjLz7mT3G0O6jnINucKj3OKDDu2_RFDcjlkGA-BmEZOZaMK7MLz-TNcYbI5yHWdQF1QY0v2N8nUg9URbAZTtBjQjJcgaMD0HfyKB7tK5Zxbc3C2K_JvG5IeMC9cMXCDE"
  }
];

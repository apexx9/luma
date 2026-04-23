export interface WorkOrder {
  id: string;
  title: string;
  priority: string;
  status: string;
  issued: string;
  building: string;
  unit: string;
  assignedTo: string;
  type: string;
}

export const mockWorkOrders: WorkOrder[] = [
  {
    id: "WO-4821",
    title: "Leaking Faucet",
    priority: "High",
    status: "In Progress",
    issued: "2h ago",
    building: "The Skyline Loft",
    unit: "Unit 171",
    assignedTo: "Mike Rodriguez",
    type: "Plumbing"
  },
  {
    id: "WO-4819",
    title: "AC Unit Noise",
    priority: "Medium",
    status: "Pending",
    issued: "5h ago",
    building: "Modern Heights",
    unit: "Unit 49",
    assignedTo: "Sarah Jenkins",
    type: "HVAC"
  },
  {
    id: "WO-4815",
    title: "Broken Window Seal",
    priority: "Low",
    status: "Completed",
    issued: "Yesterday",
    building: "Serene Gardens",
    unit: "Unit 65",
    assignedTo: "David Chen",
    type: "Repair"
  },
  {
    id: "WO-4812",
    title: "Light Fixture Replacement",
    priority: "Medium",
    status: "In Progress",
    issued: "Oct 24",
    building: "The Skyline Loft",
    unit: "Unit 87",
    assignedTo: "Mike Rodriguez",
    type: "Electrical"
  }
];

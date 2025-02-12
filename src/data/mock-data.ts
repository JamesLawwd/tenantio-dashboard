export interface Tenant {
  id: string;
  name: string;
  unit: string;
  rentAmount: number;
  hasPaidRent?: boolean;
  moveInDate: string;
}

export interface RentPayment {
  id: string;
  tenantId: string;
  tenantName: string;
  amount: number;
  date: string;
  unit: string;
}

export const tenants: Tenant[] = [
  { id: "1", name: "John Kamau", unit: "A1", rentAmount: 45000, hasPaidRent: true, moveInDate: "2024-01-15" },
  { id: "2", name: "Sarah Wanjiku", unit: "B2", rentAmount: 38000, hasPaidRent: true, moveInDate: "2024-02-01" },
  { id: "3", name: "Michael Odhiambo", unit: "C3", rentAmount: 42000, hasPaidRent: false, moveInDate: "2023-12-10" },
  { id: "4", name: "Alice Muthoni", unit: "A4", rentAmount: 40000, hasPaidRent: true, moveInDate: "2024-01-20" },
  { id: "5", name: "David Kiprop", unit: "B5", rentAmount: 45000, hasPaidRent: false, moveInDate: "2023-11-05" },
  { id: "6", name: "Grace Akinyi", unit: "C6", rentAmount: 38000, hasPaidRent: true, moveInDate: "2024-02-15" },
  { id: "7", name: "Peter Njoroge", unit: "A7", rentAmount: 42000, hasPaidRent: false, moveInDate: "2023-10-30" },
  { id: "8", name: "Mary Adhiambo", unit: "B8", rentAmount: 40000, hasPaidRent: true, moveInDate: "2024-01-10" },
  { id: "9", name: "James Maina", unit: "C9", rentAmount: 45000, hasPaidRent: false, moveInDate: "2023-12-20" },
  { id: "10", name: "Lucy Wairimu", unit: "A10", rentAmount: 38000, hasPaidRent: true, moveInDate: "2024-02-05" },
];

export const recentPayments: RentPayment[] = [
  {
    id: "p1",
    tenantId: "1",
    tenantName: "John Kamau",
    amount: 45000,
    date: "2024-02-28",
    unit: "A1"
  },
  {
    id: "p2",
    tenantId: "2",
    tenantName: "Sarah Wanjiku",
    amount: 38000,
    date: "2024-02-27",
    unit: "B2"
  },
  {
    id: "p3",
    tenantId: "3",
    tenantName: "Michael Odhiambo",
    amount: 42000,
    date: "2024-02-26",
    unit: "C3"
  },
  {
    id: "p4",
    tenantId: "4",
    tenantName: "Alice Muthoni",
    amount: 40000,
    date: "2024-02-25",
    unit: "A4"
  },
  {
    id: "p5",
    tenantId: "5",
    tenantName: "David Kiprop",
    amount: 45000,
    date: "2024-02-24",
    unit: "B5"
  }
];

export const calculateStats = () => {
  const totalTenants = tenants.length;
  const totalRevenue = recentPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const occupiedUnits = new Set(tenants.map(t => t.unit)).size;
  const totalUnits = 12; // Assuming total units is 12
  const vacantUnits = totalUnits - occupiedUnits;

  return {
    totalTenants,
    totalRevenue,
    vacantUnits,
    waterUsage: "1,240L" // This would come from a real water meter reading
  };
};

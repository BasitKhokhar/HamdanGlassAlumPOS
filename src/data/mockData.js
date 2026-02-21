import { ShoppingCart, TrendingUp, AlertTriangle } from "lucide-react-native";

export const stats = [
  { label: "Today's Sales", value: "₹45,200", icon: ShoppingCart, color: "#10b981" }, // Emerald-500
  { label: "Today Profit", value: "₹8,400", icon: TrendingUp, color: "#3b82f6", highlight: true }, // Blue-500
  { label: "Low Stock", value: "12 Items", icon: AlertTriangle, color: "#ef4444" }, // Red-500
];

export const lowStockItems = [
  { name: '1" Aluminum Section (Silver)', stock: '12 kg', min: '50 kg' },
  { name: 'Glass Handle H-Type', stock: '5 pcs', min: '20 pcs' },
];

export const recentBills = [
  { id: 'AL-9082', customer: 'Rajesh Kumar', date: '24 Oct, 02:30 PM', amount: '₹12,400', status: 'Paid' },
  { id: 'AL-9081', customer: 'Suresh Interiors', date: '24 Oct, 11:15 AM', amount: '₹45,000', status: 'Unpaid' },
];

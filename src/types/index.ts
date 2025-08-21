export interface User {
  id: string;
  email: string;
  name: string;
  role: 'client' | 'manager' | 'admin';
  avatar?: string;
  phone?: string;
  company?: string;
  createdAt: string;
  isActive: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  category: string;
  minOrderQuantity: number;
  pricePerUnit: number;
  currency: 'USD' | 'CNY' | 'RUB';
  specifications: Record<string, string>;
  factoryInfo: {
    name: string;
    location: string;
    rating: number;
  };
  isActive: boolean;
  createdAt: string;
}

export interface GroupPurchase {
  id: string;
  productId: string;
  product: Product;
  managerId: string;
  manager: User;
  participants: GroupParticipant[];
  status: 'collecting' | 'confirmed' | 'production' | 'shipping' | 'delivered' | 'completed' | 'cancelled';
  minQuantity: number;
  currentQuantity: number;
  pricePerUnit: number;
  deadline: string;
  createdAt: string;
  updatedAt: string;
}

export interface GroupParticipant {
  id: string;
  userId: string;
  user: User;
  quantity: number;
  totalAmount: number;
  paymentStatus: 'pending' | 'partial' | 'paid';
  paidAmount: number;
  joinedAt: string;
}

export interface Order {
  id: string;
  groupPurchaseId: string;
  groupPurchase: GroupPurchase;
  status: 'pending' | 'confirmed' | 'production' | 'quality_check' | 'shipping' | 'customs' | 'delivered' | 'completed';
  stages: OrderStage[];
  totalAmount: number;
  documents: OrderDocument[];
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
}

export interface OrderStage {
  id: string;
  name: string;
  status: 'pending' | 'in_progress' | 'completed' | 'delayed';
  startDate?: string;
  completedDate?: string;
  description?: string;
  progress: number;
}

export interface OrderDocument {
  id: string;
  name: string;
  type: 'contract' | 'invoice' | 'payment_receipt' | 'shipping_doc' | 'customs_doc' | 'quality_cert' | 'other';
  url: string;
  uploadedBy: string;
  uploadedAt: string;
  size: number;
}

export interface ChatMessage {
  id: string;
  groupPurchaseId: string;
  senderId: string;
  sender: User;
  content: string;
  type: 'text' | 'file' | 'system';
  fileUrl?: string;
  fileName?: string;
  createdAt: string;
  isRead: boolean;
}

export interface Payment {
  id: string;
  userId: string;
  groupPurchaseId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'confirmed' | 'failed';
  method: 'bank_transfer' | 'card' | 'crypto';
  transactionId?: string;
  receipt?: string;
  createdAt: string;
  confirmedAt?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  actionUrl?: string;
  createdAt: string;
}
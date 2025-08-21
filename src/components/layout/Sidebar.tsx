import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  ShoppingCart, 
  Package, 
  Users, 
  MessageCircle, 
  FileText, 
  CreditCard,
  BarChart3,
  Settings,
  UserCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: string[];
}

const navigation: NavItem[] = [
  // Клиентские разделы
  { name: 'Каталог товаров', href: '/catalog', icon: Package, roles: ['client'] },
  { name: 'Мои закупки', href: '/my-purchases', icon: ShoppingCart, roles: ['client'] },
  { name: 'Чаты', href: '/chats', icon: MessageCircle, roles: ['client'] },
  { name: 'Документы', href: '/documents', icon: FileText, roles: ['client'] },
  { name: 'Платежи', href: '/payments', icon: CreditCard, roles: ['client'] },
  
  // Менеджерские разделы
  { name: 'Управление каталогом', href: '/manage-catalog', icon: Package, roles: ['manager'] },
  { name: 'Группы клиентов', href: '/client-groups', icon: Users, roles: ['manager'] },
  { name: 'Заказы', href: '/orders', icon: ShoppingCart, roles: ['manager'] },
  { name: 'Чаты с клиентами', href: '/manager-chats', icon: MessageCircle, roles: ['manager'] },
  { name: 'Документооборот', href: '/document-management', icon: FileText, roles: ['manager'] },
  { name: 'Платежи клиентов', href: '/client-payments', icon: CreditCard, roles: ['manager'] },
  
  // Админские разделы
  { name: 'Пользователи', href: '/admin/users', icon: UserCheck, roles: ['admin'] },
  { name: 'Аналитика', href: '/admin/analytics', icon: BarChart3, roles: ['admin'] },
  { name: 'Настройки системы', href: '/admin/settings', icon: Settings, roles: ['admin'] },
];

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const filteredNavigation = navigation.filter(item => 
    item.roles.includes(user?.role || '')
  );

  return (
    <div className="flex flex-col w-64 bg-gray-900 text-white">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {filteredNavigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
                  isActive
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                )
              }
            >
              <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
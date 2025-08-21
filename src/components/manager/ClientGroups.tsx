import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  Package, 
  DollarSign, 
  Clock, 
  MessageCircle, 
  FileText,
  Settings,
  Search,
  Plus
} from 'lucide-react';
import { GroupPurchase, User } from '@/types';

// Моковые данные для групп клиентов
const mockClientGroups: (GroupPurchase & { 
  totalRevenue: number;
  messagesCount: number;
  documentsCount: number;
})[] = [
  {
    id: '1',
    productId: '1',
    product: {
      id: '1',
      name: 'Беспроводные наушники TWS',
      description: 'Качественные беспроводные наушники с активным шумоподавлением',
      images: ['https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400'],
      category: 'Электроника',
      minOrderQuantity: 100,
      pricePerUnit: 25.50,
      currency: 'USD',
      specifications: {},
      factoryInfo: {
        name: 'Shenzhen Audio Tech',
        location: 'Шэньчжэнь, Китай',
        rating: 4.8
      },
      isActive: true,
      createdAt: '2024-01-15T10:00:00Z'
    },
    managerId: 'manager1',
    manager: {
      id: 'manager1',
      email: 'manager@example.com',
      name: 'Анна Менеджер',
      role: 'manager',
      createdAt: '2024-01-01T00:00:00Z',
      isActive: true
    },
    participants: [
      {
        id: '1',
        userId: 'user1',
        user: {
          id: 'user1',
          email: 'client1@example.com',
          name: 'Иван Петров',
          role: 'client',
          company: 'ООО "Торг"',
          createdAt: '2024-01-01T00:00:00Z',
          isActive: true
        },
        quantity: 50,
        totalAmount: 1275.00,
        paymentStatus: 'paid',
        paidAmount: 1275.00,
        joinedAt: '2024-01-16T10:00:00Z'
      },
      {
        id: '2',
        userId: 'user2',
        user: {
          id: 'user2',
          email: 'client2@example.com',
          name: 'Мария Сидорова',
          role: 'client',
          company: 'ИП Сидорова',
          createdAt: '2024-01-02T00:00:00Z',
          isActive: true
        },
        quantity: 30,
        totalAmount: 765.00,
        paymentStatus: 'partial',
        paidAmount: 400.00,
        joinedAt: '2024-01-17T14:30:00Z'
      },
      {
        id: '3',
        userId: 'user3',
        user: {
          id: 'user3',
          email: 'client3@example.com',
          name: 'Алексей Козлов',
          role: 'client',
          company: 'ООО "Электро"',
          createdAt: '2024-01-03T00:00:00Z',
          isActive: true
        },
        quantity: 40,
        totalAmount: 1020.00,
        paymentStatus: 'pending',
        paidAmount: 0,
        joinedAt: '2024-01-18T09:15:00Z'
      }
    ],
    status: 'production',
    minQuantity: 100,
    currentQuantity: 120,
    pricePerUnit: 25.50,
    deadline: '2024-02-15T23:59:59Z',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z',
    totalRevenue: 3060.00,
    messagesCount: 24,
    documentsCount: 8
  },
  {
    id: '2',
    productId: '2',
    product: {
      id: '2',
      name: 'Умные часы спортивные',
      description: 'Спортивные умные часы с мониторингом здоровья',
      images: ['https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400'],
      category: 'Электроника',
      minOrderQuantity: 50,
      pricePerUnit: 45.00,
      currency: 'USD',
      specifications: {},
      factoryInfo: {
        name: 'Guangzhou Smart Devices',
        location: 'Гуанчжоу, Китай',
        rating: 4.6
      },
      isActive: true,
      createdAt: '2024-01-10T10:00:00Z'
    },
    managerId: 'manager1',
    manager: {
      id: 'manager1',
      email: 'manager@example.com',
      name: 'Анна Менеджер',
      role: 'manager',
      createdAt: '2024-01-01T00:00:00Z',
      isActive: true
    },
    participants: [
      {
        id: '4',
        userId: 'user4',
        user: {
          id: 'user4',
          email: 'client4@example.com',
          name: 'Елена Волкова',
          role: 'client',
          company: 'ООО "Спорт"',
          createdAt: '2024-01-04T00:00:00Z',
          isActive: true
        },
        quantity: 25,
        totalAmount: 1125.00,
        paymentStatus: 'paid',
        paidAmount: 1125.00,
        joinedAt: '2024-01-11T11:00:00Z'
      },
      {
        id: '5',
        userId: 'user5',
        user: {
          id: 'user5',
          email: 'client5@example.com',
          name: 'Дмитрий Орлов',
          role: 'client',
          company: 'ИП Орлов',
          createdAt: '2024-01-05T00:00:00Z',
          isActive: true
        },
        quantity: 10,
        totalAmount: 450.00,
        paymentStatus: 'pending',
        paidAmount: 0,
        joinedAt: '2024-01-12T16:20:00Z'
      }
    ],
    status: 'collecting',
    minQuantity: 50,
    currentQuantity: 35,
    pricePerUnit: 45.00,
    deadline: '2024-02-20T23:59:59Z',
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-18T12:00:00Z',
    totalRevenue: 1575.00,
    messagesCount: 12,
    documentsCount: 3
  }
];

const ClientGroups: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusBadge = (status: string) => {
    const statusMap = {
      'collecting': { label: 'Сбор заявок', color: 'bg-blue-100 text-blue-800' },
      'confirmed': { label: 'Подтверждено', color: 'bg-green-100 text-green-800' },
      'production': { label: 'Производство', color: 'bg-yellow-100 text-yellow-800' },
      'shipping': { label: 'Доставка', color: 'bg-purple-100 text-purple-800' },
      'delivered': { label: 'Доставлено', color: 'bg-green-100 text-green-800' },
      'completed': { label: 'Завершено', color: 'bg-gray-100 text-gray-800' }
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap] || { label: status, color: 'bg-gray-100 text-gray-800' };
    return <Badge className={statusInfo.color}>{statusInfo.label}</Badge>;
  };

  const getPaymentStatusBadge = (status: string) => {
    const statusMap = {
      'pending': { label: 'Ожидает', color: 'bg-orange-100 text-orange-800' },
      'partial': { label: 'Частично', color: 'bg-yellow-100 text-yellow-800' },
      'paid': { label: 'Оплачено', color: 'bg-green-100 text-green-800' }
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap] || { label: status, color: 'bg-gray-100 text-gray-800' };
    return <Badge variant="outline" className={statusInfo.color}>{statusInfo.label}</Badge>;
  };

  const filteredGroups = mockClientGroups.filter(group => {
    const matchesSearch = group.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.participants.some(p => p.user.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || group.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const calculateGroupStats = (group: typeof mockClientGroups[0]) => {
    const totalPaid = group.participants.reduce((sum, p) => sum + p.paidAmount, 0);
    const totalAmount = group.participants.reduce((sum, p) => sum + p.totalAmount, 0);
    const paymentProgress = totalAmount > 0 ? (totalPaid / totalAmount) * 100 : 0;
    const collectionProgress = (group.currentQuantity / group.minQuantity) * 100;
    
    return { totalPaid, totalAmount, paymentProgress, collectionProgress };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Группы клиентов</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Создать группу
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Поиск по товару или клиенту..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Статус" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все статусы</SelectItem>
            <SelectItem value="collecting">Сбор заявок</SelectItem>
            <SelectItem value="confirmed">Подтверждено</SelectItem>
            <SelectItem value="production">Производство</SelectItem>
            <SelectItem value="shipping">Доставка</SelectItem>
            <SelectItem value="delivered">Доставлено</SelectItem>
            <SelectItem value="completed">Завершено</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6">
        {filteredGroups.map((group) => {
          const stats = calculateGroupStats(group);
          
          return (
            <Card key={group.id} className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <img
                      src={group.product.images[0]}
                      alt={group.product.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <CardTitle className="text-lg">{group.product.name}</CardTitle>
                      <CardDescription className="mt-1">
                        ID группы: #{group.id} • Создана {new Date(group.createdAt).toLocaleDateString()}
                      </CardDescription>
                      <div className="flex items-center gap-2 mt-2">
                        {getStatusBadge(group.status)}
                        <Badge variant="outline">
                          {group.participants.length} участников
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Управление
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Статистика группы */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center">
                    <Package className="h-5 w-5 mr-3 text-blue-500" />
                    <div>
                      <div className="text-sm font-medium">{group.currentQuantity}/{group.minQuantity}</div>
                      <div className="text-xs text-gray-500">Количество</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-3 text-green-500" />
                    <div>
                      <div className="text-sm font-medium">${stats.totalPaid.toFixed(2)}</div>
                      <div className="text-xs text-gray-500">Получено</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <MessageCircle className="h-5 w-5 mr-3 text-purple-500" />
                    <div>
                      <div className="text-sm font-medium">{group.messagesCount}</div>
                      <div className="text-xs text-gray-500">Сообщений</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-3 text-orange-500" />
                    <div>
                      <div className="text-sm font-medium">{group.documentsCount}</div>
                      <div className="text-xs text-gray-500">Документов</div>
                    </div>
                  </div>
                </div>

                {/* Прогресс сбора и оплат */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span>Прогресс сбора</span>
                      <span>{Math.round(stats.collectionProgress)}%</span>
                    </div>
                    <Progress value={stats.collectionProgress} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span>Прогресс оплат</span>
                      <span>{Math.round(stats.paymentProgress)}%</span>
                    </div>
                    <Progress value={stats.paymentProgress} className="h-2" />
                  </div>
                </div>

                {/* Список участников */}
                <div>
                  <h4 className="text-sm font-medium mb-3">Участники группы</h4>
                  <div className="space-y-2">
                    {group.participants.map((participant) => (
                      <div key={participant.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-blue-600">
                              {participant.user.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <div className="text-sm font-medium">{participant.user.name}</div>
                            <div className="text-xs text-gray-500">{participant.user.company}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="text-right">
                            <div className="font-medium">{participant.quantity} шт.</div>
                            <div className="text-gray-500">${participant.totalAmount}</div>
                          </div>
                          {getPaymentStatusBadge(participant.paymentStatus)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Действия */}
                <div className="flex items-center gap-2 pt-4 border-t">
                  <Button size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Групповой чат
                  </Button>
                  <Button size="sm" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Документы
                  </Button>
                  <Button size="sm" variant="outline">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Платежи
                  </Button>
                  <Button size="sm" variant="outline">
                    Изменить статус
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredGroups.length === 0 && (
        <Card className="p-12 text-center">
          <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Группы не найдены
          </h3>
          <p className="text-gray-500 mb-4">
            Попробуйте изменить параметры поиска или создайте новую группу
          </p>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Создать группу
          </Button>
        </Card>
      )}
    </div>
  );
};

export default ClientGroups;
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Package, 
  Users, 
  Clock, 
  DollarSign, 
  FileText, 
  MessageCircle,
  Eye
} from 'lucide-react';
import { GroupPurchase, Order } from '@/types';

// Моковые данные для закупок пользователя
const mockUserPurchases: (GroupPurchase & { userQuantity: number; userAmount: number; paymentStatus: string })[] = [
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
    participants: [],
    status: 'production',
    minQuantity: 100,
    currentQuantity: 120,
    pricePerUnit: 25.50,
    deadline: '2024-02-15T23:59:59Z',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z',
    userQuantity: 20,
    userAmount: 510.00,
    paymentStatus: 'paid'
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
    participants: [],
    status: 'collecting',
    minQuantity: 50,
    currentQuantity: 35,
    pricePerUnit: 45.00,
    deadline: '2024-02-20T23:59:59Z',
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-18T12:00:00Z',
    userQuantity: 10,
    userAmount: 450.00,
    paymentStatus: 'pending'
  }
];

const MyPurchases: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('active');

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
      'pending': { label: 'Ожидает оплаты', color: 'bg-orange-100 text-orange-800' },
      'partial': { label: 'Частично оплачено', color: 'bg-yellow-100 text-yellow-800' },
      'paid': { label: 'Оплачено', color: 'bg-green-100 text-green-800' }
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap] || { label: status, color: 'bg-gray-100 text-gray-800' };
    return <Badge variant="outline" className={statusInfo.color}>{statusInfo.label}</Badge>;
  };

  const activePurchases = mockUserPurchases.filter(p => 
    ['collecting', 'confirmed', 'production', 'shipping'].includes(p.status)
  );
  
  const completedPurchases = mockUserPurchases.filter(p => 
    ['delivered', 'completed'].includes(p.status)
  );

  const renderPurchaseCard = (purchase: typeof mockUserPurchases[0]) => {
    const progress = (purchase.currentQuantity / purchase.minQuantity) * 100;
    
    return (
      <Card key={purchase.id} className="overflow-hidden">
        <div className="flex">
          <div className="w-32 h-32 flex-shrink-0">
            <img
              src={purchase.product.images[0]}
              alt={purchase.product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold mb-1">{purchase.product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{purchase.product.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>Менеджер: {purchase.manager.name}</span>
                  <span>ID: #{purchase.id}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                {getStatusBadge(purchase.status)}
                {getPaymentStatusBadge(purchase.paymentStatus)}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center">
                <Package className="h-4 w-4 mr-2 text-gray-400" />
                <div>
                  <div className="text-sm font-medium">{purchase.userQuantity} шт.</div>
                  <div className="text-xs text-gray-500">Мой заказ</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                <div>
                  <div className="text-sm font-medium">${purchase.userAmount}</div>
                  <div className="text-xs text-gray-500">К оплате</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-gray-400" />
                <div>
                  <div className="text-sm font-medium">{purchase.currentQuantity}/{purchase.minQuantity}</div>
                  <div className="text-xs text-gray-500">Общий сбор</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-gray-400" />
                <div>
                  <div className="text-sm font-medium">
                    {new Date(purchase.deadline).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-gray-500">Дедлайн</div>
                </div>
              </div>
            </div>

            {purchase.status === 'collecting' && (
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>Прогресс сбора</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Детали заказа
              </Button>
              <Button size="sm" variant="outline">
                <MessageCircle className="h-4 w-4 mr-2" />
                Чат
              </Button>
              <Button size="sm" variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Документы
              </Button>
              {purchase.paymentStatus === 'pending' && (
                <Button size="sm">
                  Оплатить
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Мои закупки</h1>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            Активные: {activePurchases.length}
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            Завершенные: {completedPurchases.length}
          </div>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="active">Активные ({activePurchases.length})</TabsTrigger>
          <TabsTrigger value="completed">Завершенные ({completedPurchases.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activePurchases.length > 0 ? (
            activePurchases.map(renderPurchaseCard)
          ) : (
            <Card className="p-12 text-center">
              <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Нет активных закупок
              </h3>
              <p className="text-gray-500 mb-4">
                Присоединитесь к групповым закупкам в каталоге товаров
              </p>
              <Button>Перейти к каталогу</Button>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedPurchases.length > 0 ? (
            completedPurchases.map(renderPurchaseCard)
          ) : (
            <Card className="p-12 text-center">
              <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Нет завершенных закупок
              </h3>
              <p className="text-gray-500">
                Здесь будут отображаться ваши завершенные заказы
              </p>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyPurchases;
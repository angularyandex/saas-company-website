import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Users, Clock, Star } from 'lucide-react';
import { Product, GroupPurchase } from '@/types';

// Моковые данные
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Беспроводные наушники TWS',
    description: 'Качественные беспроводные наушники с активным шумоподавлением',
    images: ['https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400'],
    category: 'Электроника',
    minOrderQuantity: 100,
    pricePerUnit: 25.50,
    currency: 'USD',
    specifications: {
      'Время работы': '8 часов',
      'Bluetooth': '5.0',
      'Водозащита': 'IPX4'
    },
    factoryInfo: {
      name: 'Shenzhen Audio Tech',
      location: 'Шэньчжэнь, Китай',
      rating: 4.8
    },
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Умные часы спортивные',
    description: 'Спортивные умные часы с мониторингом здоровья',
    images: ['https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400'],
    category: 'Электроника',
    minOrderQuantity: 50,
    pricePerUnit: 45.00,
    currency: 'USD',
    specifications: {
      'Экран': '1.4" AMOLED',
      'Батарея': '7 дней',
      'Водозащита': '5ATM'
    },
    factoryInfo: {
      name: 'Guangzhou Smart Devices',
      location: 'Гуанчжоу, Китай',
      rating: 4.6
    },
    isActive: true,
    createdAt: '2024-01-10T10:00:00Z'
  },
  {
    id: '3',
    name: 'Портативная колонка Bluetooth',
    description: 'Мощная портативная колонка с отличным звуком',
    images: ['https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=400'],
    category: 'Электроника',
    minOrderQuantity: 200,
    pricePerUnit: 18.75,
    currency: 'USD',
    specifications: {
      'Мощность': '20W',
      'Время работы': '12 часов',
      'Bluetooth': '5.0'
    },
    factoryInfo: {
      name: 'Dongguan Audio Solutions',
      location: 'Дунгуань, Китай',
      rating: 4.7
    },
    isActive: true,
    createdAt: '2024-01-05T10:00:00Z'
  }
];

const mockGroupPurchases: GroupPurchase[] = [
  {
    id: '1',
    productId: '1',
    product: mockProducts[0],
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
    minQuantity: 100,
    currentQuantity: 67,
    pricePerUnit: 25.50,
    deadline: '2024-02-15T23:59:59Z',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z'
  },
  {
    id: '2',
    productId: '2',
    product: mockProducts[1],
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
    currentQuantity: 23,
    pricePerUnit: 45.00,
    deadline: '2024-02-20T23:59:59Z',
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-18T12:00:00Z'
  }
];

const ProductCatalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...Array.from(new Set(mockProducts.map(p => p.category)))];

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getGroupPurchaseForProduct = (productId: string) => {
    return mockGroupPurchases.find(gp => gp.productId === productId);
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      'collecting': { label: 'Сбор заявок', color: 'bg-blue-100 text-blue-800' },
      'confirmed': { label: 'Подтверждено', color: 'bg-green-100 text-green-800' },
      'production': { label: 'Производство', color: 'bg-yellow-100 text-yellow-800' },
      'shipping': { label: 'Доставка', color: 'bg-purple-100 text-purple-800' },
      'delivered': { label: 'Доставлено', color: 'bg-green-100 text-green-800' }
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap] || { label: status, color: 'bg-gray-100 text-gray-800' };
    return <Badge className={statusInfo.color}>{statusInfo.label}</Badge>;
  };

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Просрочено';
    if (diffDays === 0) return 'Сегодня';
    if (diffDays === 1) return 'Завтра';
    return `${diffDays} дней`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Поиск товаров..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Категория" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все категории</SelectItem>
            {categories.filter(cat => cat !== 'all').map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const groupPurchase = getGroupPurchaseForProduct(product.id);
          const progress = groupPurchase ? (groupPurchase.currentQuantity / groupPurchase.minQuantity) * 100 : 0;
          
          return (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {groupPurchase && (
                  <div className="absolute top-2 right-2">
                    {getStatusBadge(groupPurchase.status)}
                  </div>
                )}
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                  <div className="flex items-center text-sm text-yellow-600 ml-2">
                    <Star className="h-4 w-4 fill-current mr-1" />
                    {product.factoryInfo.rating}
                  </div>
                </div>
                <CardDescription className="line-clamp-2">
                  {product.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Фабрика:</span>
                  <span className="font-medium">{product.factoryInfo.name}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-600">
                    ${product.pricePerUnit}
                  </span>
                  <span className="text-sm text-gray-500">
                    мин. {product.minOrderQuantity} шт.
                  </span>
                </div>

                {groupPurchase && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{groupPurchase.currentQuantity}/{groupPurchase.minQuantity}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{formatDeadline(groupPurchase.deadline)}</span>
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                    
                    <Button className="w-full" size="sm">
                      Присоединиться к закупке
                    </Button>
                  </div>
                )}

                {!groupPurchase && (
                  <Button variant="outline" className="w-full" size="sm">
                    Запросить групповую закупку
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">Товары не найдены</div>
          <div className="text-gray-400 text-sm mt-2">
            Попробуйте изменить параметры поиска
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCatalog;
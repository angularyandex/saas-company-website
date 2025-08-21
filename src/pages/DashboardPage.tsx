import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ShoppingCart, 
  Package, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Clock,
  MessageCircle,
  FileText,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const renderClientDashboard = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Добро пожаловать, {user?.name}!
        </h1>
        <p className="text-gray-600 mt-2">
          Управляйте своими групповыми закупками
        </p>
      </div>

      {/* Статистика клиента */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Активные закупки</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              +1 за последний месяц
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Общая сумма</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,450</div>
            <p className="text-xs text-muted-foreground">
              В активных заказах
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Непрочитанные</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              Новых сообщений
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Документы</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Доступно для скачивания
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Активные закупки */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Активные закупки</CardTitle>
              <CardDescription>
                Ваши текущие групповые заказы
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              Все закупки
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4 p-4 border rounded-lg">
            <img
              src="https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=100"
              alt="Наушники"
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-medium">Беспроводные наушники TWS</h3>
              <p className="text-sm text-gray-500">20 шт. • $510.00</p>
              <div className="flex items-center mt-2">
                <Badge className="bg-yellow-100 text-yellow-800">Производство</Badge>
                <span className="ml-2 text-sm text-gray-500">120/100 собрано</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Прогресс</div>
              <Progress value={75} className="w-20 mt-1" />
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 border rounded-lg">
            <img
              src="https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=100"
              alt="Умные часы"
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-medium">Умные часы спортивные</h3>
              <p className="text-sm text-gray-500">10 шт. • $450.00</p>
              <div className="flex items-center mt-2">
                <Badge className="bg-blue-100 text-blue-800">Сбор заявок</Badge>
                <span className="ml-2 text-sm text-gray-500">35/50 собрано</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Прогресс</div>
              <Progress value={70} className="w-20 mt-1" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Быстрые действия */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader>
            <Package className="h-8 w-8 text-blue-500" />
            <CardTitle className="text-lg">Каталог товаров</CardTitle>
            <CardDescription>
              Найдите новые товары для закупки
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader>
            <MessageCircle className="h-8 w-8 text-green-500" />
            <CardTitle className="text-lg">Чаты</CardTitle>
            <CardDescription>
              Общайтесь с менеджерами
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader>
            <FileText className="h-8 w-8 text-purple-500" />
            <CardTitle className="text-lg">Документы</CardTitle>
            <CardDescription>
              Просмотрите документы по заказам
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );

  const renderManagerDashboard = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Панель менеджера
        </h1>
        <p className="text-gray-600 mt-2">
          Управление групповыми закупками и клиентами
        </p>
      </div>

      {/* Статистика менеджера */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Активные группы</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              +2 за неделю
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Общий оборот</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231</div>
            <p className="text-xs text-muted-foreground">
              +20.1% от прошлого месяца
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Клиенты</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              +12 новых клиентов
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Конверсия</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">73%</div>
            <p className="text-xs text-muted-foreground">
              +5% от прошлого месяца
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Активные группы */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Активные группы</CardTitle>
              <CardDescription>
                Требующие внимания групповые закупки
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              Все группы
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-4">
              <img
                src="https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=100"
                alt="Наушники"
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-medium">Беспроводные наушники TWS</h3>
                <p className="text-sm text-gray-500">3 участника • $3,060</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-yellow-100 text-yellow-800">Производство</Badge>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                2 дня до дедлайна
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-4">
              <img
                src="https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=100"
                alt="Умные часы"
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-medium">Умные часы спортивные</h3>
                <p className="text-sm text-gray-500">2 участника • $1,575</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-blue-100 text-blue-800">Сбор заявок</Badge>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                5 дней до дедлайна
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Быстрые действия для менеджера */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader>
            <Users className="h-8 w-8 text-blue-500" />
            <CardTitle className="text-lg">Группы клиентов</CardTitle>
            <CardDescription>
              Управление активными группами
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader>
            <Package className="h-8 w-8 text-green-500" />
            <CardTitle className="text-lg">Каталог</CardTitle>
            <CardDescription>
              Управление товарами
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader>
            <FileText className="h-8 w-8 text-purple-500" />
            <CardTitle className="text-lg">Документооборот</CardTitle>
            <CardDescription>
              Загрузка и управление документами
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );

  const renderAdminDashboard = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Панель администратора
        </h1>
        <p className="text-gray-600 mt-2">
          Управление системой и пользователями
        </p>
      </div>

      {/* Системная статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего пользователей</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +180 за месяц
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Активные заказы</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">
              В обработке
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Общий оборот</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$234,567</div>
            <p className="text-xs text-muted-foreground">
              За текущий месяц
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Конверсия</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">
              Средняя по платформе
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Быстрые действия для админа */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader>
            <Users className="h-8 w-8 text-blue-500" />
            <CardTitle className="text-lg">Пользователи</CardTitle>
            <CardDescription>
              Управление пользователями и ролями
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader>
            <TrendingUp className="h-8 w-8 text-green-500" />
            <CardTitle className="text-lg">Аналитика</CardTitle>
            <CardDescription>
              Отчеты и статистика
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader>
            <Package className="h-8 w-8 text-purple-500" />
            <CardTitle className="text-lg">Настройки</CardTitle>
            <CardDescription>
              Конфигурация системы
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );

  const renderDashboard = () => {
    switch (user?.role) {
      case 'client':
        return renderClientDashboard();
      case 'manager':
        return renderManagerDashboard();
      case 'admin':
        return renderAdminDashboard();
      default:
        return renderClientDashboard();
    }
  };

  return (
    <Layout>
      {renderDashboard()}
    </Layout>
  );
};

export default DashboardPage;
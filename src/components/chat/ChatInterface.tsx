import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Send, 
  Paperclip, 
  Image, 
  File,
  Users,
  Phone,
  Video,
  MoreVertical
} from 'lucide-react';
import { ChatMessage, User, GroupPurchase } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

// Моковые данные для чата
const mockMessages: ChatMessage[] = [
  {
    id: '1',
    groupPurchaseId: '1',
    senderId: 'manager1',
    sender: {
      id: 'manager1',
      email: 'manager@example.com',
      name: 'Анна Менеджер',
      role: 'manager',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
      createdAt: '2024-01-01T00:00:00Z',
      isActive: true
    },
    content: 'Добро пожаловать в групповой чат по закупке беспроводных наушников! Здесь мы будем обсуждать все вопросы по заказу.',
    type: 'text',
    createdAt: '2024-01-20T09:00:00Z',
    isRead: true
  },
  {
    id: '2',
    groupPurchaseId: '1',
    senderId: 'user1',
    sender: {
      id: 'user1',
      email: 'client1@example.com',
      name: 'Иван Петров',
      role: 'client',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      createdAt: '2024-01-01T00:00:00Z',
      isActive: true
    },
    content: 'Здравствуйте! Когда планируется отправка заказа с фабрики?',
    type: 'text',
    createdAt: '2024-01-20T10:15:00Z',
    isRead: true
  },
  {
    id: '3',
    groupPurchaseId: '1',
    senderId: 'manager1',
    sender: {
      id: 'manager1',
      email: 'manager@example.com',
      name: 'Анна Менеджер',
      role: 'manager',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
      createdAt: '2024-01-01T00:00:00Z',
      isActive: true
    },
    content: 'Производство началось на прошлой неделе. Ожидаемая дата готовности - 15 февраля. Отправка планируется 16-17 февраля.',
    type: 'text',
    createdAt: '2024-01-20T10:30:00Z',
    isRead: true
  },
  {
    id: '4',
    groupPurchaseId: '1',
    senderId: 'user2',
    sender: {
      id: 'user2',
      email: 'client2@example.com',
      name: 'Мария Сидорова',
      role: 'client',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      createdAt: '2024-01-02T00:00:00Z',
      isActive: true
    },
    content: 'Отлично! А можно получить фото с производства для отчетности?',
    type: 'text',
    createdAt: '2024-01-20T11:00:00Z',
    isRead: true
  },
  {
    id: '5',
    groupPurchaseId: '1',
    senderId: 'manager1',
    sender: {
      id: 'manager1',
      email: 'manager@example.com',
      name: 'Анна Менеджер',
      role: 'manager',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
      createdAt: '2024-01-01T00:00:00Z',
      isActive: true
    },
    content: 'Конечно! Вот фото с производственной линии.',
    type: 'file',
    fileUrl: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=400',
    fileName: 'production_line.jpg',
    createdAt: '2024-01-20T11:15:00Z',
    isRead: true
  },
  {
    id: '6',
    groupPurchaseId: '1',
    senderId: 'system',
    sender: {
      id: 'system',
      email: 'system@groupbuy.com',
      name: 'Система',
      role: 'admin',
      createdAt: '2024-01-01T00:00:00Z',
      isActive: true
    },
    content: 'Статус заказа изменен на "Производство"',
    type: 'system',
    createdAt: '2024-01-20T11:20:00Z',
    isRead: true
  }
];

const mockGroupPurchase: GroupPurchase = {
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
        createdAt: '2024-01-02T00:00:00Z',
        isActive: true
      },
      quantity: 30,
      totalAmount: 765.00,
      paymentStatus: 'partial',
      paidAmount: 400.00,
      joinedAt: '2024-01-17T14:30:00Z'
    }
  ],
  status: 'production',
  minQuantity: 100,
  currentQuantity: 120,
  pricePerUnit: 25.50,
  deadline: '2024-02-15T23:59:59Z',
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-01-20T15:30:00Z'
};

interface ChatInterfaceProps {
  groupPurchaseId?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ groupPurchaseId = '1' }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !user) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      groupPurchaseId,
      senderId: user.id,
      sender: user,
      content: newMessage,
      type: 'text',
      createdAt: new Date().toISOString(),
      isRead: false
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Имитация ответа менеджера
    if (user.role === 'client') {
      setTimeout(() => {
        const managerReply: ChatMessage = {
          id: (Date.now() + 1).toString(),
          groupPurchaseId,
          senderId: 'manager1',
          sender: mockGroupPurchase.manager,
          content: 'Спасибо за ваше сообщение! Я обработаю ваш запрос и отвечу в ближайшее время.',
          type: 'text',
          createdAt: new Date().toISOString(),
          isRead: false
        };
        setMessages(prev => [...prev, managerReply]);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      groupPurchaseId,
      senderId: user.id,
      sender: user,
      content: `Отправлен файл: ${file.name}`,
      type: 'file',
      fileName: file.name,
      fileUrl: URL.createObjectURL(file),
      createdAt: new Date().toISOString(),
      isRead: false
    };

    setMessages(prev => [...prev, message]);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Сегодня';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Вчера';
    } else {
      return date.toLocaleDateString('ru-RU');
    }
  };

  const renderMessage = (message: ChatMessage, index: number) => {
    const isOwnMessage = message.senderId === user?.id;
    const isSystemMessage = message.type === 'system';
    const showDate = index === 0 || 
      formatDate(message.createdAt) !== formatDate(messages[index - 1].createdAt);

    return (
      <div key={message.id}>
        {showDate && (
          <div className="flex justify-center my-4">
            <Badge variant="outline" className="text-xs">
              {formatDate(message.createdAt)}
            </Badge>
          </div>
        )}
        
        {isSystemMessage ? (
          <div className="flex justify-center my-2">
            <Badge variant="secondary" className="text-xs">
              {message.content}
            </Badge>
          </div>
        ) : (
          <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}>
            <div className={`flex max-w-[70%] ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
              {!isOwnMessage && (
                <Avatar className="w-8 h-8 mr-2">
                  <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                  <AvatarFallback>
                    {message.sender.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              )}
              
              <div className={`${isOwnMessage ? 'mr-2' : ''}`}>
                {!isOwnMessage && (
                  <div className="text-xs text-gray-500 mb-1">
                    {message.sender.name}
                    {message.sender.role === 'manager' && (
                      <Badge variant="outline" className="ml-2 text-xs">
                        Менеджер
                      </Badge>
                    )}
                  </div>
                )}
                
                <div
                  className={`rounded-lg px-3 py-2 ${
                    isOwnMessage
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {message.type === 'file' ? (
                    <div className="space-y-2">
                      {message.fileUrl && message.fileName?.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                        <img
                          src={message.fileUrl}
                          alt={message.fileName}
                          className="max-w-full h-auto rounded"
                        />
                      ) : (
                        <div className="flex items-center space-x-2">
                          <File className="h-4 w-4" />
                          <span className="text-sm">{message.fileName}</span>
                        </div>
                      )}
                      <div className="text-sm">{message.content}</div>
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  )}
                </div>
                
                <div className={`text-xs text-gray-500 mt-1 ${isOwnMessage ? 'text-right' : 'text-left'}`}>
                  {formatTime(message.createdAt)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-[600px]">
      {/* Заголовок чата */}
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={mockGroupPurchase.product.images[0]}
              alt={mockGroupPurchase.product.name}
              className="w-10 h-10 rounded-lg object-cover"
            />
            <div>
              <CardTitle className="text-lg">{mockGroupPurchase.product.name}</CardTitle>
              <div className="flex items-center text-sm text-gray-500">
                <Users className="h-4 w-4 mr-1" />
                {mockGroupPurchase.participants.length + 1} участников
                <span className="mx-2">•</span>
                <span>ID: #{mockGroupPurchase.id}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {/* Область сообщений */}
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full p-4">
          {messages.map((message, index) => renderMessage(message, index))}
          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={mockGroupPurchase.manager.avatar} />
                  <AvatarFallback>АМ</AvatarFallback>
                </Avatar>
                <div className="bg-gray-100 rounded-lg px-3 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </ScrollArea>
      </CardContent>

      {/* Поле ввода */}
      <div className="border-t p-4">
        <div className="flex items-end space-x-2">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Image className="h-4 w-4" />
              </Button>
            </div>
            <Input
              placeholder="Введите сообщение..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="resize-none"
            />
          </div>
          <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileUpload}
          accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
        />
      </div>
    </div>
  );
};

export default ChatInterface;
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import ChatInterface from '@/components/chat/ChatInterface';

const ChatsPage: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Чаты</h1>
          <p className="text-gray-600 mt-2">
            Общение с менеджерами по вашим заказам
          </p>
        </div>
        
        <Card>
          <ChatInterface />
        </Card>
      </div>
    </Layout>
  );
};

export default ChatsPage;
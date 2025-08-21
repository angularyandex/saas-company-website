import React from 'react';
import Layout from '@/components/layout/Layout';
import MyPurchases from '@/components/client/MyPurchases';

const MyPurchasesPage: React.FC = () => {
  return (
    <Layout>
      <MyPurchases />
    </Layout>
  );
};

export default MyPurchasesPage;
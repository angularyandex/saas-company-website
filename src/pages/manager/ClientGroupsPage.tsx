import React from 'react';
import Layout from '@/components/layout/Layout';
import ClientGroups from '@/components/manager/ClientGroups';

const ClientGroupsPage: React.FC = () => {
  return (
    <Layout>
      <ClientGroups />
    </Layout>
  );
};

export default ClientGroupsPage;
import React from 'react';
import Layout from '@/components/layout/Layout';
import ProductCatalog from '@/components/client/ProductCatalog';

const CatalogPage: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Каталог товаров</h1>
          <p className="text-gray-600 mt-2">
            Выберите товары для участия в групповых закупках
          </p>
        </div>
        <ProductCatalog />
      </div>
    </Layout>
  );
};

export default CatalogPage;
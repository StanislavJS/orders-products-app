import React, { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import { setProducts, deleteProduct } from '../slices/productsSlice';
// import { products as mockProducts } from '../data/productData';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal,/ConfirmDeleteModal'; // виправлено імпорт
import styles from './ProductsPage.module.css';
import { FaDesktop } from 'react-icons/fa';
import { generateRandomProducts } from '../utils/generateRandomProducts';

const ProductsPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const randomProducts = generateRandomProducts(10); // генерує 10 випадкових
    dispatch(setProducts(randomProducts));
  }, [dispatch]);

  const products = useSelector((state: RootState) => state.products.products);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | ''>('');
  const [expandedProductId, setExpandedProductId] = useState<number | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const productTypes = useMemo(() => {
    return Array.from(new Set(products.map(p => p.type)));
  }, [products]);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (searchTerm.trim()) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(p => p.title.toLowerCase().includes(lowerSearch));
    }
    if (filterType) {
      filtered = filtered.filter(p => p.type === filterType);
    }
    if (sortOrder) {
      filtered = [...filtered].sort((a, b) => {
        const priceA = a.price.find(pr => pr.symbol === 'USD')?.value ?? 0;
        const priceB = b.price.find(pr => pr.symbol === 'USD')?.value ?? 0;
        return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
      });
    }

    return filtered;
  }, [searchTerm, filterType, sortOrder, products]);

  const openDeleteModal = (id: number) => {
    setSelectedProductId(id);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setSelectedProductId(null);
  };

  const confirmDelete = () => {
    if (selectedProductId !== null) {
      dispatch(deleteProduct(selectedProductId));
    }
    closeDeleteModal();
  };

  const toggleExpand = (id: number) => {
    setExpandedProductId(prev => (prev === id ? null : id));
  };

  // Отримуємо вибраний продукт для модалки, щоб передати ім'я та серійний номер
  const selectedProduct = selectedProductId !== null
    ? products.find(p => p.id === selectedProductId)
    : null;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Products</h2>

      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className={styles.input}
        />

        <select
          value={filterType}
          onChange={e => setFilterType(e.target.value)}
          className={styles.select}
        >
          <option value="">All Types</option>
          {productTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <select
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value as 'asc' | 'desc' | '')}
          className={styles.select}
        >
          <option value="">Sort by Price (USD)</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      <table className={`table table-hover mt-3 ${styles.table}`}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Type</th>
            <th>Guarantee Start</th>
            <th>Guarantee End</th>
            <th>Price (USD)</th>
            <th>Price (UAH)</th>
            <th>Order ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
  {filteredProducts.map(product => {
    const priceUSD = product.price.find(p => p.symbol === 'USD')?.value ?? 0;
    const priceUAH = product.price.find(p => p.symbol === 'UAH')?.value ?? 0;
    const isExpanded = expandedProductId === product.id;

    return (
      <React.Fragment key={product.id}>
        <tr
          className={styles.row}
          onClick={() => toggleExpand(product.id)}
          style={{ cursor: 'pointer' }}
        >
          <td data-label="ID">{product.id}</td>
          <td data-label="Title">
            <FaDesktop style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            {product.title}
          </td>
          <td data-label="Type">{product.type}</td>
          <td data-label="Guarantee Start">{product.guarantee.start}</td>
          <td data-label="Guarantee End">{product.guarantee.end}</td>
          <td data-label="Price (USD)">{priceUSD.toFixed(2)}</td>
          <td data-label="Price (UAH)">{priceUAH.toFixed(2)}</td>
          <td data-label="Order ID">{product.order}</td>
          <td data-label="Action">
            <button
              className="btn btn-sm btn-danger"
              onClick={(e) => {
                e.stopPropagation();
                openDeleteModal(product.id);
              }}
            >
              Delete
            </button>
          </td>
        </tr>
        {isExpanded && (
          <tr className={styles.expandedRow}>
            <td colSpan={9}>
              <div className={styles.details}>
                <p><strong>Specification:</strong> {product.specification}</p>
                <p>Some additional information about this product could go here.</p>
              </div>
            </td>
          </tr>
        )}
      </React.Fragment>
    );
  })}
</tbody>
      </table>

      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        productName={selectedProduct?.title ?? ''}
        serialNumber={selectedProduct?.serialNumber ?? ''}
      />
    </div>
  );
};

export default ProductsPage;

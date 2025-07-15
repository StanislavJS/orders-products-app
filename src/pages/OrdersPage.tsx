import React, { useState, useMemo } from 'react';
import { orders } from '../data/ordersData';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './OrdersPage.module.css';
import type { Order } from '../types/order';
import { FaTrash } from 'react-icons/fa';
import ConfirmDeleteOrderModal from '../components/ConfirmDeleteModal,/ConfirmDeleteOrderModal';

const OrdersPage: React.FC = () => {
  const [ordersData, setOrdersData] = useState(orders);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'completed' | 'cancelled'>('all');
  const [sortDateOrder, setSortDateOrder] = useState<'asc' | 'desc' | ''>('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Для модалки удаления
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const toggleDetails = (orderId: string) => {
    setExpandedOrderId(prev => (prev === orderId ? null : orderId));
  };

  const openDeleteModal = (id: string) => {
    setSelectedOrderId(id);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setSelectedOrderId(null);
  };

  const confirmDelete = () => {
    if (selectedOrderId) {
      setOrdersData(prev => prev.filter(order => order.id !== selectedOrderId));
      closeDeleteModal();
      if (expandedOrderId === selectedOrderId) setExpandedOrderId(null);
    }
  };

  const filteredAndSortedOrders = useMemo(() => {
    let filtered = ordersData;

    if (filterStatus !== 'all') {
      filtered = filtered.filter(order => order.status === filterStatus);
    }

    if (dateFrom) {
      const from = new Date(dateFrom);
      filtered = filtered.filter(order => new Date(order.createdAt) >= from);
    }

    if (dateTo) {
      const to = new Date(dateTo);
      filtered = filtered.filter(order => new Date(order.createdAt) <= to);
    }

    if (sortDateOrder) {
      filtered = [...filtered].sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortDateOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });
    }

    return filtered;
  }, [filterStatus, sortDateOrder, dateFrom, dateTo, ordersData]);

  return (
    <div className={styles.container}>
      <h2>Orders</h2>

      <div className={styles.filters}>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value as any)} className={styles.select}>
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <select value={sortDateOrder} onChange={e => setSortDateOrder(e.target.value as any)} className={styles.select}>
          <option value="">Sort by Date</option>
          <option value="asc">Oldest First</option>
          <option value="desc">Newest First</option>
        </select>

        <input
          type="date"
          value={dateFrom}
          onChange={e => setDateFrom(e.target.value)}
          className={styles.input}
        />
        <input
          type="date"
          value={dateTo}
          onChange={e => setDateTo(e.target.value)}
          className={styles.input}
        />
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Created At</th>
            <th>Products</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedOrders.map((order: Order) => (
            <React.Fragment key={order.id}>
              <tr onClick={() => toggleDetails(order.id)} className={styles.orderRow}>
                <td data-label="ID">{order.id}</td>
                <td data-label="Name">{order.name}</td>
                <td data-label="Created At">{new Date(order.createdAt).toLocaleString('en-GB')}</td>
                <td data-label="Products">{order.products.length}</td>
                <td data-label="Status">{order.status}</td>
                <td data-label="Actions">
                  <button
                    className={styles.deleteBtn}
                    onClick={e => {
                      e.stopPropagation();
                      openDeleteModal(order.id);
                    }}
                    aria-label={`Delete ${order.name}`}
                    title="Delete Order"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>

              <AnimatePresence>
                {expandedOrderId === order.id && (
                  <motion.tr
                    className={styles['details-row']}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td colSpan={6}>
                      <div className={styles.details}>
                        <strong>Products in this order:</strong>
                        <ul>
                          {order.products.map(product => (
                            <li key={product.id}>
                              {product.name} — {product.type}, ${product.priceUSD} / €{product.priceEUR}
                              <br />
                              Warranty: {new Date(product.warrantyStart).toLocaleDateString()} – {new Date(product.warrantyEnd).toLocaleDateString()}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </td>
                  </motion.tr>
                )}
              </AnimatePresence>
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {selectedOrderId && (
        <ConfirmDeleteOrderModal
          isOpen={isModalOpen}
          onClose={closeDeleteModal}
          onConfirm={confirmDelete}
          orderName={ordersData.find(o => o.id === selectedOrderId)?.name || ''}
        />
      )}
    </div>
  );
};

export default OrdersPage;

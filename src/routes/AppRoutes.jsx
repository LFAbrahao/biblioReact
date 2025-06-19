import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Search from '../pages/Search';
import BookDetails from '../pages/BookDetails';
import Account from '../pages/Account';
import NotFound from '../pages/NotFound';

import AdminLayout from '../layouts/AdminLayout';
import AdminDashboard from '../pages/AdminDashboard';
import ManageBooks from '../pages/ManageBooks';
import ManageUsers from '../pages/ManageUsers';
import Login from '../pages/Login';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/books/:bookId" element={<BookDetails />} />
      <Route path="/account" element={<Account />} />
      <Route path="/login" element={<Login />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
      <Route path="/admin/books" element={<AdminLayout><ManageBooks /></AdminLayout>} />
      <Route path="/admin/users" element={<AdminLayout><ManageUsers /></AdminLayout>} />

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

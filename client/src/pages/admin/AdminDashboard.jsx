import "./admin.css"
import AdminSidebar from './AdminSidebar';
import AdminMain from './AdminMain';

export default function AdminDashboard() {
  return (
    <section className='admin-dashboard'>
      <AdminSidebar/>
      <AdminMain/>
    </section>
  )
}

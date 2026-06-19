import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../context/LanguageContext';
import { api } from '../utils/api';
import PageHeader from '../components/ui/PageHeader';
import { ClipboardList, ChevronDown, ChevronUp, CheckCircle, Clock, XCircle, MapPin, Phone, CreditCard } from 'lucide-react';

export default function OrdersPage() {
  const { isAuthenticated, t } = useAuth();
  const { lang } = useTranslation();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState({});

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/kirish?redirect=/buyurtmalar');
      return;
    }

    const fetchOrders = async () => {
      try {
        const data = await api.orders.getAll();
        setOrders(data);
      } catch (err) {
        console.error(err);
        setError(lang === 'uz' ? 'Buyurtmalarni yuklashda xatolik yuz berdi' : lang === 'ru' ? 'Ошибка при загрузке заказов' : 'Error loading orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated, navigate, lang]);

  const toggleOrderDetails = async (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
      return;
    }

    if (orderDetails[orderId]) {
      setExpandedOrder(orderId);
      return;
    }

    try {
      const details = await api.orders.getById(orderId);
      setOrderDetails(prev => ({ ...prev, [orderId]: details }));
      setExpandedOrder(orderId);
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusBadge = (status) => {
    const base = "flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ";
    if (status === 'paid') {
      return (
        <span className={base + "bg-emerald-50 text-emerald-700 border-emerald-100"}>
          <CheckCircle size={14} />
          {lang === 'uz' ? 'To\'langan' : lang === 'ru' ? 'Оплачено' : 'Paid'}
        </span>
      );
    }
    if (status === 'cancelled') {
      return (
        <span className={base + "bg-rose-50 text-rose-700 border-rose-100"}>
          <XCircle size={14} />
          {lang === 'uz' ? 'Bekor qilingan' : lang === 'ru' ? 'Отменено' : 'Cancelled'}
        </span>
      );
    }
    return (
      <span className={base + "bg-amber-50 text-amber-700 border-amber-100"}>
        <Clock size={14} />
        {lang === 'uz' ? 'Kutilmoqda' : lang === 'ru' ? 'В ожидании' : 'Pending'}
      </span>
    );
  };

  const formatPrice = (price) => {
    return String(price).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " " + t('currency');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[50vh]">
        <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500">{lang === 'uz' ? 'Buyurtmalar yuklanmoqda...' : lang === 'ru' ? 'Загрузка заказов...' : 'Loading orders...'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream/30 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <PageHeader 
          title={lang === 'uz' ? 'Buyurtmalar tarixi' : lang === 'ru' ? 'История заказов' : 'Order History'} 
          breadcrumbs={[{ label: t('breadcrumb.home'), to: '/' }, { label: lang === 'uz' ? 'Buyurtmalar' : 'Orders' }]} 
        />

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl mb-6 text-center">
            {error}
          </div>
        )}

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-black/5 shadow-soft">
            <div className="bg-brand-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-600">
              <ClipboardList size={30} />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              {lang === 'uz' ? 'Buyurtmalar topilmadi' : lang === 'ru' ? 'Заказы не найдены' : 'No orders found'}
            </h3>
            <p className="text-gray-500 mb-6 text-sm">
              {lang === 'uz' ? 'Siz hali hech qanday buyurtma bermagansiz.' : lang === 'ru' ? 'Вы еще не делали заказов.' : 'You have not placed any orders yet.'}
            </p>
            <button 
              onClick={() => navigate('/katalog')} 
              className="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3 rounded-full transition shadow-soft cursor-pointer"
            >
              {t('cart.start_shopping')}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const isExpanded = expandedOrder === order.id;
              const details = orderDetails[order.id];

              return (
                <div key={order.id} className="bg-white rounded-2xl border border-black/5 shadow-soft overflow-hidden transition-all duration-300">
                  {/* Order Header Summary */}
                  <div 
                    onClick={() => toggleOrderDetails(order.id)} 
                    className="p-5 flex flex-wrap items-center justify-between gap-4 cursor-pointer hover:bg-black/[0.01] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-brand-50 p-2.5 rounded-xl text-brand-600">
                        <ClipboardList size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm md:text-base">
                          {lang === 'uz' ? 'Buyurtma' : lang === 'ru' ? 'Заказ' : 'Order'} #{order.id}
                        </h4>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {new Date(order.created_at).toLocaleDateString(lang === 'uz' ? 'uz-UZ' : lang === 'ru' ? 'ru-RU' : 'en-US', {
                            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-extrabold text-gray-800">{formatPrice(order.total_amount)}</div>
                        <div className="text-[10px] text-gray-400 mt-0.5">
                          {lang === 'uz' ? 'Jami summa' : lang === 'ru' ? 'Итоговая сумма' : 'Total Amount'}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {getStatusBadge(order.status)}
                        {isExpanded ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Order Details */}
                  {isExpanded && details && (
                    <div className="border-t border-black/5 bg-cream/10 p-5 space-y-5 animate-fade-in">
                      {/* Shipping and Delivery details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-600 bg-white p-4 rounded-xl border border-black/5">
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <MapPin size={14} className="text-brand-600 shrink-0 mt-0.5" />
                            <span>
                              <strong>{lang === 'uz' ? 'Manzil: ' : lang === 'ru' ? 'Адрес: ' : 'Address: '}</strong>
                              {order.address}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone size={14} className="text-brand-600 shrink-0" />
                            <span>
                              <strong>{lang === 'uz' ? 'Telefon: ' : lang === 'ru' ? 'Телефон: ' : 'Phone: '}</strong>
                              {order.phone}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <CreditCard size={14} className="text-brand-600 shrink-0" />
                            <span>
                              <strong>{lang === 'uz' ? 'Yetkazish narxi: ' : 'Delivery fee: '}</strong>
                              {order.delivery_fee > 0 ? formatPrice(order.delivery_fee) : (lang === 'uz' ? 'Bepul' : 'Free')}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle size={14} className="text-brand-600 shrink-0" />
                            <span>
                              <strong>{lang === 'uz' ? 'Holati: ' : 'Status: '}</strong>
                              {order.status.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Products breakdown */}
                      <div className="space-y-3">
                        <h5 className="font-bold text-gray-800 text-xs uppercase tracking-wider">
                          {lang === 'uz' ? 'Mahsulotlar ro\'yxati' : lang === 'ru' ? 'Список товаров' : 'Items List'}
                        </h5>
                        <div className="space-y-2">
                          {details.items && details.items.map((item) => (
                            <div key={item.id} className="flex items-center justify-between gap-4 bg-white p-3 rounded-xl border border-black/5">
                              <div className="flex items-center gap-3">
                                <img 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="w-12 h-12 rounded-lg object-cover border border-black/5" 
                                />
                                <div>
                                  <h6 className="font-bold text-gray-800 text-xs md:text-sm">{item.name}</h6>
                                  <p className="text-[10px] text-gray-400 mt-0.5">
                                    {formatPrice(item.price)} / {item.unit}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className="text-xs font-semibold text-gray-500 mr-4">x{item.qty}</span>
                                <span className="font-bold text-gray-800 text-xs md:text-sm">
                                  {formatPrice(item.price * item.qty)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

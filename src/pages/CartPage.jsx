import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Home, ChevronRight, Plus, Minus, Trash2, Check,
  ShoppingBag, Truck, ShieldCheck, Sprout, Loader2, AlertCircle, CreditCard, ArrowLeft
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../context/LanguageContext';
import { api } from '../utils/api';

const parsePrice = (s) => parseInt(String(s).replace(/\s/g, ''), 10);
const formatPrice = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

const FREE_DELIVERY_FROM = 100000;
const DELIVERY_FEE = 15000;

// Standard pure JS MD5 helper for Click payment verification
const md5 = (string) => {
  var k = [], i = 0;
  for (; i < 64; ) {
    k[i] = 0 | (Math.abs(Math.sin(++i)) * 4294967296);
  }
  var a = 0x67452301, b = 0xefcdab89, c = 0x98badcfe, d = 0x10325476;
  var words = [];
  var str = unescape(encodeURIComponent(string));
  var len = str.length;
  for (i = 0; i < len; i++) {
    words[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);
  }
  words[len >> 2] |= 0x80 << ((len % 4) * 8);
  words[(((len + 8) >> 6) << 4) + 14] = len * 8;
  var rotateLeft = function(lValue, iShiftBits) {
    return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
  };
  var addUnsigned = function(lX, lY) {
    var lX4, lY4, lX8, lY8, lResult;
    lX8 = (lX & 0x80000000);
    lY8 = (lY & 0x80000000);
    lX4 = (lX & 0x40000000);
    lY4 = (lY & 0x40000000);
    lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
    if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
    if (lX4 | lY4) {
      if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
      return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
    }
    return (lResult ^ lX8 ^ lY8);
  };
  var F = function(x, y, z) { return (x & y) | (~x & z); };
  var G = function(x, y, z) { return (x & z) | (y & ~z); };
  var H = function(x, y, z) { return (x ^ y ^ z); };
  var I = function(x, y, z) { return (y ^ (x | ~z)); };
  var FF = function(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  };
  var GG = function(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  };
  var HH = function(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  };
  var II = function(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  };
  for (i = 0; i < words.length; i += 16) {
    var aa = a, bb = b, cc = c, dd = d;
    a = FF(a, b, c, d, words[i+0], 7, k[0]); d = FF(d, a, b, c, words[i+1], 12, k[1]); c = FF(c, d, a, b, words[i+2], 17, k[2]); b = FF(b, c, d, a, words[i+3], 22, k[3]);
    a = FF(a, b, c, d, words[i+4], 7, k[4]); d = FF(d, a, b, c, words[i+5], 12, k[5]); c = FF(c, d, a, b, words[i+6], 17, k[6]); b = FF(b, c, d, a, words[i+7], 22, k[7]);
    a = FF(a, b, c, d, words[i+8], 7, k[8]); d = FF(d, a, b, c, words[i+9], 12, k[9]); c = FF(c, d, a, b, words[i+10], 17, k[10]); b = FF(b, c, d, a, words[i+11], 22, k[11]);
    a = FF(a, b, c, d, words[i+12], 7, k[12]); d = FF(d, a, b, c, words[i+13], 12, k[13]); c = FF(c, d, a, b, words[i+14], 17, k[14]); b = FF(b, c, d, a, words[i+15], 22, k[15]);
    a = GG(a, b, c, d, words[i+1], 5, k[16]); d = GG(d, a, b, c, words[i+6], 9, k[17]); c = GG(c, d, a, b, words[i+11], 14, k[18]); b = GG(b, c, d, a, words[i+0], 20, k[19]);
    a = GG(a, b, c, d, words[i+5], 5, k[20]); d = GG(d, a, b, c, words[i+10], 9, k[21]); c = GG(c, d, a, b, words[i+15], 14, k[22]); b = GG(b, c, d, a, words[i+4], 20, k[23]);
    a = GG(a, b, c, d, words[i+9], 5, k[24]); d = GG(d, a, b, c, words[i+14], 9, k[25]); c = GG(c, d, a, b, words[i+3], 14, k[26]); b = GG(b, c, d, a, words[i+8], 20, k[27]);
    a = GG(a, b, c, d, words[i+13], 5, k[28]); d = GG(d, a, b, c, words[i+2], 9, k[29]); c = GG(c, d, a, b, words[i+7], 14, k[30]); b = GG(b, c, d, a, words[i+12], 20, k[31]);
    a = HH(a, b, c, d, words[i+5], 4, k[32]); d = HH(d, a, b, c, words[i+8], 11, k[33]); c = HH(c, d, a, b, words[i+11], 16, k[34]); b = HH(b, c, d, a, words[i+14], 23, k[35]);
    a = HH(a, b, c, d, words[i+1], 4, k[36]); d = HH(d, a, b, c, words[i+4], 11, k[37]); c = HH(c, d, a, b, words[i+7], 16, k[38]); b = HH(b, c, d, a, words[i+10], 23, k[39]);
    a = HH(a, b, c, d, words[i+13], 4, k[40]); d = HH(d, a, b, c, words[i+0], 11, k[41]); c = HH(c, d, a, b, words[i+3], 16, k[42]); b = HH(b, c, d, a, words[i+6], 23, k[43]);
    a = HH(a, b, c, d, words[i+9], 4, k[44]); d = HH(d, a, b, c, words[i+12], 11, k[45]); c = HH(c, d, a, b, words[i+15], 16, k[46]); b = HH(b, c, d, a, words[i+2], 23, k[47]);
    a = II(a, b, c, d, words[i+0], 6, k[48]); d = II(d, a, b, c, words[i+7], 10, k[49]); c = II(c, d, a, b, words[i+14], 15, k[50]); b = II(b, c, d, a, words[i+5], 21, k[51]);
    a = II(a, b, c, d, words[i+12], 6, k[52]); d = II(d, a, b, c, words[i+3], 10, k[53]); c = II(c, d, a, b, words[i+10], 15, k[54]); b = II(b, c, d, a, words[i+1], 21, k[55]);
    a = II(a, b, c, d, words[i+8], 6, k[56]); d = II(d, a, b, c, words[i+15], 10, k[57]); c = II(c, d, a, b, words[i+6], 15, k[58]); b = II(b, c, d, a, words[i+13], 21, k[59]);
    a = II(a, b, c, d, words[i+4], 6, k[60]); d = II(d, a, b, c, words[i+11], 10, k[61]); c = II(c, d, a, b, words[i+2], 15, k[62]); b = II(b, c, d, a, words[i+9], 21, k[63]);
    a = addUnsigned(a, aa); b = addUnsigned(b, bb); c = addUnsigned(c, cc); d = addUnsigned(d, dd);
  }
  var temp = [a, b, c, d];
  var hex = '';
  for (i = 0; i < 16; i++) {
    var val = (temp[i >> 2] >> ((i % 4) * 8)) & 255;
    hex += (val < 16 ? '0' : '') + val.toString(16);
  }
  return hex;
};

export default function CartPage() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { lang, t } = useTranslation();
  
  const { items, addToCart, decrement, removeFromCart, clearCart } = useCart();
  const [selected, setSelected] = useState(() => new Set(items.map((i) => i.id)));
  
  // Checkout & Payment states: 'cart', 'form', 'payment', 'success'
  const [step, setStep] = useState('cart');
  const [paymentMethod, setPaymentMethod] = useState('click'); // 'click', 'payme', 'cash'
  
  // Checkout Form Details
  const [checkoutForm, setCheckoutForm] = useState({
    address: '',
    phone: user?.phone || '',
  });

  // Simulated Payment State
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  
  // Completed Order Details
  const [createdOrder, setCreatedOrder] = useState(null);

  // Card Simulator Form
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvc: '', smsCode: '' });
  const [paymentStage, setPaymentStage] = useState('card_input'); // 'card_input', 'sms_verify'

  const toggle = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const allSelected = items.length > 0 && items.every((i) => selected.has(i.id));
  const toggleAll = () => {
    setSelected(allSelected ? new Set() : new Set(items.map((i) => i.id)));
  };

  const selectedItems = items.filter((i) => selected.has(i.id));
  const subtotal = selectedItems.reduce((sum, i) => sum + parsePrice(i.price) * i.qty, 0);
  const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE;
  const total = subtotal + delivery;
  const selectedCount = selectedItems.reduce((sum, i) => sum + i.qty, 0);

  const handleCheckoutClick = () => {
    if (!isAuthenticated) {
      navigate('/kirish?redirect=/savatcha');
      return;
    }
    setStep('form');
  };

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    if (!checkoutForm.address || !checkoutForm.phone) {
      alert(lang === 'uz' ? 'Iltimos, manzil va telefon raqamingizni kiriting.' : 'Пожалуйста, введите адрес и номер телефона.');
      return;
    }

    try {
      const orderItems = selectedItems.map(item => ({ id: item.id, qty: item.qty }));
      const orderResult = await api.orders.create({
        items: orderItems,
        address: checkoutForm.address,
        phone: checkoutForm.phone
      });

      setCreatedOrder(orderResult);

      if (paymentMethod === 'cash') {
        // Cash order immediately finishes successfully
        setStep('success');
        clearCart();
      } else {
        // Redirect to Simulated Payment Gateway (Click or Payme)
        setStep('payment');
        setPaymentStage('card_input');
      }
    } catch (err) {
      alert(err.message || 'Order creation failed');
    }
  };

  const handleSimulatedPayment = async () => {
    if (paymentStage === 'card_input') {
      if (cardDetails.number.replace(/\s/g, '').length < 16) {
        setPaymentError(lang === 'uz' ? 'Karta raqami noto\'g\'ri' : 'Неверный номер карты');
        return;
      }
      setPaymentError(null);
      setProcessingPayment(true);
      // Simulate SMS OTP trigger delay
      setTimeout(() => {
        setProcessingPayment(false);
        setPaymentStage('sms_verify');
      }, 1500);
      return;
    }

    // Processing SMS Code
    if (!cardDetails.smsCode) {
      setPaymentError(lang === 'uz' ? 'Tasdiqlash kodini kiriting' : 'Введите код подтверждения');
      return;
    }

    setProcessingPayment(true);
    setPaymentError(null);

    try {
      if (paymentMethod === 'click') {
        // 💳 CLICK SIMULATION CALLS TO BACKEND
        const clickTransId = Math.floor(10000000 + Math.random() * 90000000).toString();
        const clickPaydocId = Math.floor(100000 + Math.random() * 900000).toString();
        const serviceId = '1234';
        const secretKey = 'TEST_CLICK_SECRET_KEY_HERE';
        const signTime = new Date().toISOString().replace('T', ' ').substring(0, 19);

        // Click payload action=0 (Prepare)
        const signStringPrepare = md5(`${clickTransId}${serviceId}${clickPaydocId}${createdOrder.orderId}${createdOrder.totalAmount}0${signTime}${secretKey}`);
        const prepRes = await fetch('http://localhost:5000/api/payment/click', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            click_trans_id: clickTransId,
            service_id: serviceId,
            click_paydoc_id: clickPaydocId,
            merchant_trans_id: String(createdOrder.orderId),
            amount: String(createdOrder.totalAmount),
            action: '0',
            error: '0',
            sign_time: signTime,
            sign_string: signStringPrepare
          })
        });
        const prepData = await prepRes.json();
        if (prepData.error < 0) {
          throw new Error(prepData.error_note || 'Click prepare failed');
        }

        // Click payload action=1 (Complete)
        const signStringComplete = md5(`${clickTransId}${serviceId}${clickPaydocId}${createdOrder.orderId}${createdOrder.totalAmount}1${signTime}${secretKey}`);
        const compRes = await fetch('http://localhost:5000/api/payment/click', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            click_trans_id: clickTransId,
            service_id: serviceId,
            click_paydoc_id: clickPaydocId,
            merchant_trans_id: String(createdOrder.orderId),
            amount: String(createdOrder.totalAmount),
            action: '1',
            error: '0',
            sign_time: signTime,
            sign_string: signStringComplete
          })
        });
        const compData = await compRes.json();
        if (compData.error < 0) {
          throw new Error(compData.error_note || 'Click complete failed');
        }

      } else if (paymentMethod === 'payme') {
        // 💳 PAYME SIMULATION CALLS (JSON-RPC 2.0) TO BACKEND
        const paymeId = 'payme_tx_' + Math.random().toString(36).substr(2, 9);
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Basic UGF5Y29tOlRFU1RfUEFZTUVSX1NFQ1JFVF9LRVlfSEVSRQ==' // Paycom:TEST_PAYME_SECRET_KEY_HERE
        };

        // 1. CheckPerformTransaction
        const checkRes = await fetch('http://localhost:5000/api/payment/payme', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'CheckPerformTransaction',
            params: {
              amount: createdOrder.totalAmount * 100,
              account: { order_id: String(createdOrder.orderId) }
            }
          })
        });
        const checkData = await checkRes.json();
        if (checkData.error) throw new Error(checkData.error.message.uz || 'Payme CheckPerform failed');

        // 2. CreateTransaction
        const createRes = await fetch('http://localhost:5000/api/payment/payme', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 2,
            method: 'CreateTransaction',
            params: {
              id: paymeId,
              amount: createdOrder.totalAmount * 100,
              account: { order_id: String(createdOrder.orderId) }
            }
          })
        });
        const createData = await createRes.json();
        if (createData.error) throw new Error(createData.error.message.uz || 'Payme CreateTransaction failed');

        // 3. PerformTransaction
        const performRes = await fetch('http://localhost:5000/api/payment/payme', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 3,
            method: 'PerformTransaction',
            params: { id: paymeId }
          })
        });
        const performData = await performRes.json();
        if (performData.error) throw new Error(performData.error.message.uz || 'Payme PerformTransaction failed');
      }

      setStep('success');
      clearCart();
    } catch (err) {
      setPaymentError(err.message || 'Payment simulation failed');
    } finally {
      setProcessingPayment(false);
    }
  };

  // 1. Bo'sh savatcha
  if (items.length === 0 && step !== 'success') {
    return (
      <section className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-[28px] shadow-soft py-16 px-8 text-center max-w-lg mx-auto">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-6">
            <ShoppingBag size={30} />
          </div>
          <h1 className="text-2xl font-extrabold text-brand-900 mb-2">
            {lang === 'uz' ? 'Savatchangiz bo\'sh' : lang === 'ru' ? 'Ваша корзина пуста' : 'Your cart is empty'}
          </h1>
          <p className="text-gray-500 mb-8">
            {lang === 'uz' ? 'Hali hech qanday mahsulot qo\'shmadingiz. Keling, xaridni boshlaymiz!' : lang === 'ru' ? 'Вы еще не добавили ни одного товара. Давайте начнем покупки!' : 'You haven\'t added any items yet. Let\'s start shopping!'}
          </p>
          <Link to="/katalog" className="inline-flex items-center gap-2 bg-brand-600 text-white font-semibold px-7 py-3.5 rounded-full hover:bg-brand-700 transition shadow-soft">
            <Sprout size={18} /> {lang === 'uz' ? 'Xaridni boshlash' : lang === 'ru' ? 'Начать покупки' : 'Start Shopping'}
          </Link>
        </div>
      </section>
    );
  }

  // 2. SAVATCHA RO'YXATI
  if (step === 'cart') {
    return (
      <section className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
          <Link to="/" className="flex items-center gap-1 hover:text-brand-600 transition">
            <Home size={13} /> {t('breadcrumb.home')}
          </Link>
          <ChevronRight size={13} />
          <span className="text-gray-700 font-medium">{lang === 'uz' ? 'Savatcha' : lang === 'ru' ? 'Корзина' : 'Cart'}</span>
        </nav>

        <h1 className="text-2xl font-extrabold text-brand-900 mb-6">
          {lang === 'uz' ? 'Savatcha' : lang === 'ru' ? 'Корзина' : 'Cart'} <span className="text-gray-400 font-semibold text-lg">({items.length} {lang === 'uz' ? 'mahsulot' : lang === 'ru' ? 'товаров' : 'products'})</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Items */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {/* Select all bar */}
            <div className="bg-white rounded-2xl shadow-soft px-4 py-3 flex items-center justify-between">
              <div
                onClick={toggleAll}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleAll();
                  }
                }}
                role="button"
                tabIndex={0}
                className="flex items-center gap-2.5 text-sm font-medium text-gray-700 cursor-pointer select-none focus:outline-none"
              >
                <Checkbox checked={allSelected} />
                {lang === 'uz' ? 'Barchasini tanlash' : lang === 'ru' ? 'Выбрать все' : 'Select All'}
              </div>
              <span className="text-xs text-gray-400">{selectedItems.length} {lang === 'uz' ? 'ta tanlandi' : lang === 'ru' ? 'выбрано' : 'selected'}</span>
            </div>

            {items.map((item) => {
              const displayName = item['name_' + lang] || item.name;
              const displayUnit = item.unit || (lang === 'uz' ? 'dona' : lang === 'ru' ? 'шт' : 'pcs');
              const itemPrice = typeof item.price === 'string' ? parsePrice(item.price) : (item.price || 0);

              return (
                <div key={item.id} className="bg-white rounded-3xl p-3 shadow-soft flex items-center gap-3">
                  <Checkbox checked={selected.has(item.id)} onClick={() => toggle(item.id)} />

                  <Link to={`/mahsulot/${item.id}`} className="shrink-0 w-20 h-20 rounded-2xl overflow-hidden bg-cream">
                    <img src={item.image} alt={displayName} className="w-full h-full object-cover" />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link to={`/mahsulot/${item.id}`} className="font-semibold text-gray-900 text-sm leading-tight line-clamp-1 hover:text-brand-700 transition">
                      {displayName}
                    </Link>
                    <p className="text-xs text-gray-400 mt-0.5">{displayUnit}</p>
                    <p className="text-sm text-gray-500 mt-1">{formatPrice(itemPrice)} {t('currency')}</p>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="font-extrabold text-gray-900 whitespace-nowrap">
                      {formatPrice(itemPrice * item.qty)} <span className="text-[11px] font-medium text-gray-400">{t('currency')}</span>
                    </span>
                    <div className="flex items-center gap-0.5 bg-brand-50 rounded-full p-1">
                      <button onClick={() => decrement(item.id)} className="w-7 h-7 rounded-full flex items-center justify-center text-brand-700 hover:bg-white transition active:scale-90 cursor-pointer" aria-label="Kamaytirish">
                        <Minus size={14} />
                      </button>
                      <span className="min-w-6 text-center text-sm font-bold text-brand-800 tabular-nums">{item.qty}</span>
                      <button onClick={() => addToCart(item)} className="w-7 h-7 rounded-full flex items-center justify-center text-brand-700 hover:bg-white transition active:scale-90 cursor-pointer" aria-label="Ko'paytirish">
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition cursor-pointer"
                    aria-label="O'chirish"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="lg:sticky lg:top-28">
            <div className="bg-white rounded-[28px] shadow-soft p-6">
              <h2 className="font-extrabold text-brand-900 text-lg mb-5">{lang === 'uz' ? 'Buyurtma xulosasi' : lang === 'ru' ? 'Детали заказа' : 'Order Summary'}</h2>

              <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>{lang === 'uz' ? `Mahsulotlar (${selectedCount} dona)` : lang === 'ru' ? `Товары (${selectedCount} шт)` : `Products (${selectedCount} pcs)`}</span>
                  <span className="font-semibold text-gray-800">{formatPrice(subtotal)} {t('currency')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>{lang === 'uz' ? 'Yetkazib berish' : lang === 'ru' ? 'Доставка' : 'Delivery'}</span>
                  {delivery === 0 ? (
                    <span className="font-semibold text-brand-600">{lang === 'uz' ? 'Bepul' : lang === 'ru' ? 'Бесплатно' : 'Free'}</span>
                  ) : (
                    <span className="font-semibold text-gray-800">{formatPrice(delivery)} {t('currency')}</span>
                  )}
                </div>
                {delivery > 0 && (
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {lang === 'uz' 
                      ? `${formatPrice(FREE_DELIVERY_FROM)} so'mdan yuqori buyurtmalar uchun yetkazib berish bepul.`
                      : `${formatPrice(FREE_DELIVERY_FROM)} сум для бесплатной доставки.`}
                  </p>
                )}
              </div>

              <div className="border-t border-gray-100 my-5" />

              <div className="flex justify-between items-end mb-6">
                <span className="font-semibold text-gray-700">{lang === 'uz' ? 'Jami' : lang === 'ru' ? 'Итого' : 'Total'}</span>
                <span className="text-2xl font-extrabold text-brand-900">{formatPrice(total)} <span className="text-sm font-medium text-gray-400">{t('currency')}</span></span>
              </div>

              <button
                type="button"
                onClick={handleCheckoutClick}
                disabled={selectedItems.length === 0}
                className="w-full inline-flex items-center justify-center gap-2 bg-brand-600 text-white font-semibold py-3.5 rounded-full hover:bg-brand-700 transition shadow-soft active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 cursor-pointer"
              >
                <Check size={18} /> {lang === 'uz' ? 'Rasmiylashtirish' : lang === 'ru' ? 'Оформить заказ' : 'Checkout'}
              </button>

              <Link to="/katalog" className="block text-center text-sm font-medium text-brand-700 hover:text-brand-800 transition mt-4">
                {lang === 'uz' ? 'Xaridni davom ettirish' : lang === 'ru' ? 'Продолжить покупки' : 'Continue Shopping'}
              </Link>

              {/* Trust */}
              <div className="flex items-center justify-center gap-4 mt-6 pt-5 border-t border-gray-100 text-gray-400">
                <span className="flex items-center gap-1.5 text-xs"><Truck size={14} /> {lang === 'uz' ? 'Tez yetkazish' : 'Быстрая доставка'}</span>
                <span className="flex items-center gap-1.5 text-xs"><ShieldCheck size={14} /> {lang === 'uz' ? 'Xavfsiz to\'lov' : 'Безопасная оплата'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // 3. CHECKOUT FORM DETAILS ENTRY
  if (step === 'form') {
    return (
      <section className="container mx-auto px-4 py-8 max-w-xl">
        <button onClick={() => setStep('cart')} className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-brand-600 transition mb-6 cursor-pointer">
          <ArrowLeft size={14} /> {lang === 'uz' ? 'Savatchaga qaytish' : 'Назад в корзину'}
        </button>

        <div className="bg-white rounded-[28px] shadow-soft p-6 sm:p-8">
          <h1 className="text-2xl font-extrabold text-brand-900 mb-2">
            {lang === 'uz' ? 'Buyurtmani rasmiylashtirish' : 'Оформление заказа'}
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            {lang === 'uz' ? 'Iltimos, yetkazib berish ma\'lumotlarini to\'ldiring.' : 'Пожалуйста, заполните данные доставки.'}
          </p>

          <form onSubmit={handleCreateOrder} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">{lang === 'uz' ? 'Yetkazib berish manzili' : 'Адрес доставки'}</label>
              <textarea
                value={checkoutForm.address}
                onChange={(e) => setCheckoutForm(f => ({ ...f, address: e.target.value }))}
                required
                rows={2}
                placeholder={lang === 'uz' ? 'Shahar, ko\'cha, uy raqami, xonadon...' : 'Город, улица, дом, квартира...'}
                className="w-full bg-cream border border-black/5 rounded-2xl px-4 py-3 outline-none text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">{lang === 'uz' ? 'Telefon raqam' : 'Номер телефона'}</label>
              <input
                type="tel"
                value={checkoutForm.phone}
                onChange={(e) => setCheckoutForm(f => ({ ...f, phone: e.target.value }))}
                required
                placeholder="+998 90 123 45 67"
                className="w-full bg-cream border border-black/5 rounded-2xl px-4 py-3 outline-none text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-800 mb-3">{lang === 'uz' ? 'To\'lov turi' : 'Способ оплаты'}</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'click', name: 'Click', color: 'border-blue-500 text-blue-600 bg-blue-50/20' },
                  { id: 'payme', name: 'Payme', color: 'border-teal-500 text-teal-600 bg-teal-50/20' },
                  { id: 'cash', name: lang === 'uz' ? 'Naqd' : 'Наличные', color: 'border-gray-500 text-gray-700 bg-gray-50/20' },
                ].map((pm) => (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setPaymentMethod(pm.id)}
                    className={`border-2 rounded-2xl py-3.5 px-4 font-bold text-sm transition text-center cursor-pointer ${
                      paymentMethod === pm.id ? pm.color : 'border-gray-100 hover:border-brand-300'
                    }`}
                  >
                    {pm.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 mt-2">
              <div className="flex justify-between items-end mb-5">
                <span className="font-semibold text-gray-700">{lang === 'uz' ? 'Jami to\'lov' : 'Итого к оплате'}</span>
                <span className="text-xl font-extrabold text-brand-900">{formatPrice(total)} {t('currency')}</span>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-600 text-white font-semibold py-4 rounded-full hover:bg-brand-700 transition shadow-soft active:scale-[0.98] cursor-pointer"
              >
                {lang === 'uz' ? 'Buyurtma berish' : 'Оформить заказ'}
              </button>
            </div>
          </form>
        </div>
      </section>
    );
  }

  // 4. SANDBOXED CARD/PAYMENT GATEWAY SIMULATOR
  if (step === 'payment') {
    const isClick = paymentMethod === 'click';
    const accentColor = isClick ? 'bg-blue-600' : 'bg-teal-500';
    const logoText = isClick ? 'CLICK' : 'PAYME';

    return (
      <section className="container mx-auto px-4 py-12 max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Simulated Merchant Header */}
          <div className={`${accentColor} text-white px-6 py-8 text-center relative`}>
            <div className="text-xs uppercase tracking-widest font-bold opacity-80 mb-1">
              {lang === 'uz' ? 'Sandbok To\'lov Simulatori' : 'Симулятор Оплаты Sandboxed'}
            </div>
            <h2 className="text-3xl font-black italic tracking-wider">{logoText}</h2>
            <div className="mt-4 bg-white/10 rounded-2xl py-2.5 px-4 inline-block text-sm font-semibold backdrop-blur-sm">
              {lang === 'uz' ? 'Buyurtma' : 'Заказ'} #{createdOrder?.orderId} • {formatPrice(createdOrder?.totalAmount)} {t('currency')}
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {paymentError && (
              <div className="flex items-center gap-2 bg-red-50 text-red-700 border border-red-200 p-3 rounded-2xl text-xs mb-5 animate-shake">
                <AlertCircle size={16} className="shrink-0" />
                <span className="font-semibold">{paymentError}</span>
              </div>
            )}

            {paymentStage === 'card_input' ? (
              <div className="flex flex-col gap-4">
                <h3 className="font-bold text-gray-800 text-sm">{lang === 'uz' ? 'Karta orqali to\'lov' : 'Оплата картой'}</h3>
                
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">{lang === 'uz' ? 'Karta raqami' : 'Номер карты'}</label>
                  <div className="relative">
                    <CreditCard size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      maxLength={19}
                      placeholder="8600 0000 0000 0000"
                      value={cardDetails.number}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
                        setCardDetails(c => ({ ...c, number: val }));
                      }}
                      className="w-full bg-cream border border-black/5 rounded-2xl pl-10 pr-4 py-3 outline-none text-sm font-semibold tracking-wider focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">{lang === 'uz' ? 'Muddati' : 'Срок действия'}</label>
                    <input
                      type="text"
                      maxLength={5}
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={(e) => {
                        let val = e.target.value.replace(/\D/g, '');
                        if (val.length > 2) val = val.substring(0, 2) + '/' + val.substring(2, 4);
                        setCardDetails(c => ({ ...c, expiry: val }));
                      }}
                      className="w-full bg-cream border border-black/5 rounded-2xl px-4 py-3 outline-none text-sm text-center font-semibold tracking-wider focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">CVC</label>
                    <input
                      type="password"
                      maxLength={3}
                      placeholder="***"
                      value={cardDetails.cvc}
                      onChange={(e) => setCardDetails(c => ({ ...c, cvc: e.target.value.replace(/\D/g, '') }))}
                      className="w-full bg-cream border border-black/5 rounded-2xl px-4 py-3 outline-none text-sm text-center font-semibold tracking-wider focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSimulatedPayment}
                  disabled={processingPayment}
                  className={`w-full text-white font-bold py-3.5 rounded-full ${accentColor} hover:brightness-105 transition mt-3 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75`}
                >
                  {processingPayment ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    lang === 'uz' ? 'SMS Kod yuborish' : 'Получить код SMS'
                  )}
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4 text-center">
                <h3 className="font-bold text-gray-800 text-sm">{lang === 'uz' ? 'SMS tasdiqlash' : 'Подтверждение SMS'}</h3>
                <p className="text-xs text-gray-500">
                  {lang === 'uz' ? 'Karta ulangan telefon raqamiga yuborilgan tasdiqlash kodini kiriting (Test uchun: istalgan kod).' : 'Введите код подтверждения из SMS (для теста: любой код).'}
                </p>

                <input
                  type="text"
                  maxLength={6}
                  placeholder="••••"
                  value={cardDetails.smsCode}
                  onChange={(e) => setCardDetails(c => ({ ...c, smsCode: e.target.value.replace(/\D/g, '') }))}
                  className="w-32 mx-auto bg-cream border border-black/5 rounded-2xl px-4 py-3 outline-none text-lg text-center font-black tracking-widest focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition"
                />

                <button
                  onClick={handleSimulatedPayment}
                  disabled={processingPayment}
                  className={`w-full text-white font-bold py-3.5 rounded-full ${accentColor} hover:brightness-105 transition mt-3 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75`}
                >
                  {processingPayment ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    lang === 'uz' ? 'To\'lovni tasdiqlash' : 'Подтвердить оплату'
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // 5. SUCCESS SCREEN
  if (step === 'success') {
    return (
      <section className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-[28px] shadow-soft py-16 px-8 text-center max-w-lg mx-auto">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 ring-8 ring-emerald-500/10">
            <Check size={36} strokeWidth={3} />
          </div>
          <h1 className="text-2xl font-extrabold text-brand-900 mb-2">
            {lang === 'uz' ? 'Buyurtmangiz muvaffaqiyatli qabul qilindi!' : 'Ваш заказ успешно оформлен!'}
          </h1>
          <p className="text-gray-500 mb-6 text-sm">
            {lang === 'uz' 
              ? `Buyurtma ID: #${createdOrder?.orderId}. To'lov holati: muvaffaqiyatli to'landi. Biz tez orada siz bilan bog'lanamiz.`
              : `ID заказа: #${createdOrder?.orderId}. Статус оплаты: оплачено успешно. Мы свяжемся с вами в ближайшее время.`}
          </p>

          <div className="bg-cream rounded-2xl p-4 text-left text-xs mb-8 flex flex-col gap-2 border border-black/5 font-semibold text-gray-700">
            <div className="flex justify-between">
              <span>{lang === 'uz' ? 'Buyurtma raqami' : 'Номер заказа'}:</span>
              <span className="text-brand-950 font-black">#{createdOrder?.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span>{lang === 'uz' ? 'Manzil' : 'Адрес'}:</span>
              <span>{checkoutForm.address}</span>
            </div>
            <div className="flex justify-between">
              <span>{lang === 'uz' ? 'Telefon raqam' : 'Телефон'}:</span>
              <span>{checkoutForm.phone}</span>
            </div>
            <div className="flex justify-between">
              <span>{lang === 'uz' ? 'To\'lov usuli' : 'Метод оплаты'}:</span>
              <span className="uppercase text-brand-700">{paymentMethod}</span>
            </div>
            <div className="border-t border-gray-200/50 my-1" />
            <div className="flex justify-between text-sm font-bold text-brand-950">
              <span>{lang === 'uz' ? 'Jami summa' : 'Итоговая сумма'}:</span>
              <span>{formatPrice(total)} {t('currency')}</span>
            </div>
          </div>

          <Link to="/" className="inline-flex items-center gap-2 bg-brand-600 text-white font-semibold px-7 py-3.5 rounded-full hover:bg-brand-700 transition shadow-soft cursor-pointer">
            <Home size={16} /> {lang === 'uz' ? 'Bosh sahifaga qaytish' : 'На главную'}
          </Link>
        </div>
      </section>
    );
  }
}

function Checkbox({ checked, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={checked}
      aria-label="Tanlash"
      className={`w-6 h-6 shrink-0 rounded-lg border-2 flex items-center justify-center transition cursor-pointer ${
        checked ? 'bg-brand-600 border-brand-600 text-white' : 'border-gray-300 text-transparent hover:border-brand-400'
      }`}
    >
      <Check size={15} strokeWidth={3} />
    </button>
  );
}

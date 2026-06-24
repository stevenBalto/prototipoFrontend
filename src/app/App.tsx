import { useState } from "react";
import {
  Mail, Lock, Eye, EyeOff, ArrowRight, User, ArrowLeft,
  Home, ShoppingCart, Tag, CircleUserRound, SlidersHorizontal, X,
  Plus, Minus, UtensilsCrossed, CreditCard, HelpCircle, UsersRound,
  FileText, ShieldCheck, Smartphone, LogOut, Flame, Utensils,
  LayoutDashboard, ClipboardList, ChefHat, BarChart2, Bell, Star,
  Settings, Menu as MenuIcon, Download, Pencil, Trash2, UserPlus,
  RefreshCw, CheckCircle, Clock, AlertTriangle, Package, Search,
  ChevronDown, TrendingUp, Globe, Phone, Shield, MessageSquare,
  Store, Tag as TagIcon,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import roosterLogo from "@/imports/Screenshot_2026-06-19_113234-Photoroom.png";

// ─── Palette ─────────────────────────────────────────────────────────────────
const C = {
  red:    "#E13642",
  orange: "#F58220",
  gold:   "#F2B134",
  brown:  "#A8895E",
  dark:   "#1E1E1E",
  green:  "#2e9e4f",
  amber:  "#F59E0B",
  bg:     "#FAF7F2",
  white:  "#FFFFFF",
  border: "rgba(168,137,94,0.25)",
  muted:  "#6b6b6b",
};

// ─── Admin Palette (SaaS neutral + red accent) ───────────────────────────────
const A = {
  panel:    "#F7F5F2",
  card:     "#FFFFFF",
  border:   "#E5E7EB",
  text:     "#1E1E1E",
  textMuted:"#6B7280",
  textSoft: "#9CA3AF",
  neutral1: "#E5E7EB",
  neutral2: "#9CA3AF",
  neutral3: "#6B7280",
  neutral4: "#374151",
  sidebar:  "#1E1E1E",
  accent:   "#E13642",
  green:    "#16A34A",
  amber:    "#F59E0B",
  red:      "#DC2626",
};
const FF = { serif: "'Playfair Display', serif", sans: "'Nunito', sans-serif" };

// ─── Data ────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: "todos", label: "Todos", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=200&fit=crop&auto=format" },
  { id: "pizza", label: "Pizza", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop&auto=format" },
  { id: "grill", label: "Grill", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=200&h=200&fit=crop&auto=format" },
  { id: "pasta", label: "Pasta", img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=200&h=200&fit=crop&auto=format" },
];
const DISHES = [
  { id: 1, name: "Pizza Pepperoni",       category: "pizza", price: 155, img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop&auto=format",  desc: "Masa artesanal, salsa de tomate y pepperoni premium" },
  { id: 2, name: "Pizza 4 Quesos",        category: "pizza", price: 165, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&auto=format",  desc: "Mozzarella, gouda, parmesano y gorgonzola" },
  { id: 3, name: "Pizza Margarita",       category: "pizza", price: 140, img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop&auto=format",  desc: "Salsa de tomate fresco, mozzarella y albahaca" },
  { id: 4, name: "Costillas BBQ",         category: "grill", price: 210, img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop&auto=format",  desc: "Costillas de cerdo con salsa BBQ ahumada y papas" },
  { id: 5, name: "Filete a la Parrilla",  category: "grill", price: 245, img: "https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=300&fit=crop&auto=format",  desc: "Filete de res angus con mantequilla de hierbas" },
  { id: 6, name: "Pollo a las Brasas",    category: "grill", price: 178, img: "https://images.unsplash.com/photo-1598103442097-8b74394b95c3?w=400&h=300&fit=crop&auto=format",  desc: "Pollo entero marinado con especias de la casa" },
  { id: 7, name: "Pasta Carbonara",       category: "pasta", price: 138, img: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop&auto=format",  desc: "Spaghetti, panceta, yema de huevo y parmesano" },
  { id: 8, name: "Fettuccine Alfredo",    category: "pasta", price: 132, img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop&auto=format",  desc: "Fettuccine en salsa cremosa de mantequilla y queso" },
  { id: 9, name: "Penne Arrabbiata",      category: "pasta", price: 125, img: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=300&fit=crop&auto=format",  desc: "Penne con salsa de tomate picante y ajo" },
];
const OPTIONS: Record<string, { sizes: { label: string; extra: number }[]; variants: { label: string; extra: number }[]; extras: { label: string; extra: number }[]; variantLabel: string }> = {
  pizza: {
    sizes: [{ label: "Personal", extra: 0 }, { label: "Mediana", extra: 200 }, { label: "Grande", extra: 400 }],
    variantLabel: "Tipo de masa",
    variants: [{ label: "Tradicional", extra: 0 }, { label: "Delgada", extra: 0 }, { label: "Integral", extra: 80 }],
    extras: [{ label: "Extra queso", extra: 90 }, { label: "Hongos", extra: 70 }, { label: "Jalapeño", extra: 50 }, { label: "Aceitunas", extra: 60 }],
  },
  grill: {
    sizes: [{ label: "Porción individual", extra: 0 }, { label: "Porción doble", extra: 180 }],
    variantLabel: "Término",
    variants: [{ label: "Rojo", extra: 0 }, { label: "Medio", extra: 0 }, { label: "3/4", extra: 0 }, { label: "Bien cocido", extra: 0 }],
    extras: [{ label: "Papas fritas", extra: 80 }, { label: "Ensalada", extra: 60 }, { label: "Salsa extra", extra: 40 }, { label: "Pan de ajo", extra: 50 }],
  },
  pasta: {
    sizes: [{ label: "Media porción", extra: 0 }, { label: "Porción completa", extra: 100 }],
    variantLabel: "Tipo de pasta",
    variants: [{ label: "Spaghetti", extra: 0 }, { label: "Fettuccine", extra: 0 }, { label: "Penne", extra: 0 }, { label: "Sin gluten", extra: 90 }],
    extras: [{ label: "Extra queso parmesano", extra: 70 }, { label: "Pollo grillado", extra: 120 }, { label: "Tocino", extra: 80 }, { label: "Champiñones", extra: 60 }],
  },
};
type Dish = typeof DISHES[number];
type CartItem = { cartId: string; dish: Dish; size: string; variant: string; extras: string[]; notes: string; qty: number; unitPrice: number };

// ─── Admin Types & Data ───────────────────────────────────────────────────────
type AdminModule = "dashboard" | "pedidos" | "menu" | "ofertas" | "usuarios" | "analiticas" | "notificaciones" | "resenas" | "configuracion";

const NEW_ORDERS = [
  { id: "#1045", client: "Laura M.",    time: "hace 1 min", total: "₡9.450",  mode: "aqui" },
  { id: "#1044", client: "Andrés R.",   time: "hace 3 min", total: "₡14.200", mode: "llevar" },
  { id: "#1043", client: "Carolina J.", time: "hace 5 min", total: "₡7.800",  mode: "aqui" },
];

const ADMIN_ORDERS = [
  { id: "#1042", date: "23/06 · 12:41", client: "Mechones B.", mode: "aqui", qty: 2, total: "₡17.854", status: "process" as const },
  { id: "#1041", date: "23/06 · 12:38", client: "Bryan V.",    mode: "llevar", qty: 2, total: "₡6.900", status: "completed" as const },
  { id: "#1040", date: "23/06 · 12:30", client: "Steven B.",   mode: "aqui", qty: 3, total: "₡11.300", status: "completed" as const },
  { id: "#1039", date: "23/06 · 12:25", client: "Christian P.",mode: "llevar", qty: 1, total: "₡9.450",  status: "cancelled" as const },
];
const ADMIN_PRODUCTS = [
  { id: 1, name: "Pizza Pepperoni",  cat: "Pizza",  price: "₡4.900", featured: true,  available: true,  color: "#6B7280" },
  { id: 2, name: "Pizza 4 Quesos",   cat: "Pizza",  price: "₡5.500", featured: false, available: true,  color: "#6B7280" },
  { id: 3, name: "Costillas BBQ",    cat: "Grill",  price: "₡8.500", featured: true,  available: false, color: "#6B7280" },
  { id: 4, name: "Pasta Alfredo",    cat: "Pasta",  price: "₡5.650", featured: false, available: true,  color: "#6B7280" },
  { id: 5, name: "Filete Parrilla",  cat: "Grill",  price: "₡9.200", featured: true,  available: true,  color: "#6B7280" },
];
const ADMIN_USERS = [
  { id: 1, name: "Admin Rooster",   email: "admin@rooster.com",          role: "superadmin", branch: "Todas",   active: true },
  { id: 2, name: "Reyman Barquero", email: "reyman@rooster.com",         role: "superadmin", branch: "Liberia", active: true },
  { id: 3, name: "Mechones B.",     email: "mechones@correo.com",        role: "user",       branch: "—",       active: true },
  { id: 4, name: "Jorge Pérez",     email: "jorge.perez@correo.com",     role: "user",       branch: "—",       active: false },
];
const ADMIN_COMBOS = [
  { id: 1, name: "Combo Pizza Personal + Bebida", price: "₡4.950", products: "2 productos", discount: "Precio fijo", expires: "Sin fecha fin", active: true },
  { id: 2, name: "2x1 Pizzas Medianas",            price: "₡6.900", products: "1 producto",  discount: "% descuento", expires: "Vence en 3 días", active: true },
  { id: 3, name: "Combo Costillas Verano",          price: "₡7.900", products: "2 productos", discount: "Precio fijo", expires: "Venció 10/06", active: false },
];
const ADMIN_COUPONS = [
  { id: 1, code: "ROOSTER20",   type: "Porcentaje", value: "20%",     min: "₡10.000",   expires: "Hasta 30/06", uses: 142, maxUses: 200, active: true },
  { id: 2, code: "PRIMERPEDIDO",type: "Monto fijo", value: "₡2.000",  min: "Sin mínimo",expires: "Hasta 15/07", uses: 38,  maxUses: null, active: true },
  { id: 3, code: "PIZZAMARTES", type: "Porcentaje", value: "50%",     min: "₡5.000",    expires: "Hasta 31/05", uses: 100, maxUses: 100, active: false },
];
const ADMIN_REVIEWS = [
  { id: 1, client: "Carlos M.",  rating: 5, text: "Excelente servicio y comida deliciosa. La pizza pepperoni es increíble.", date: "hace 2 horas",   replied: false },
  { id: 2, client: "Laura P.",   rating: 4, text: "Muy buena atención. El tiempo de espera fue un poco largo.",            date: "hace 5 horas",   replied: true },
  { id: 3, client: "Ricardo V.", rating: 5, text: "La mejor comida del lugar. Definitivamente vuelvo.",                    date: "hace 1 día",     replied: false },
  { id: 4, client: "Ana G.",     rating: 3, text: "La comida estuvo bien pero las costillas llegaron frías.",              date: "hace 2 días",    replied: true },
  { id: 5, client: "David R.",   rating: 5, text: "Increíble! La pasta carbonara es lo mejor que he probado.",             date: "hace 3 días",    replied: false },
];
const ADMIN_NOTIFS = [
  { id: 1, type: "order",   text: "Nuevo pedido #1043 recibido — Comer aquí",           time: "hace 2 min",  read: false },
  { id: 2, type: "alert",   text: "Producto 'Costillas BBQ' marcado como agotado",       time: "hace 15 min", read: false },
  { id: 3, type: "coupon",  text: "Cupón ROOSTER20 a punto de vencer (hoy a las 23:59)", time: "hace 1 h",    read: false },
  { id: 4, type: "review",  text: "Nueva reseña de 5 estrellas — Carlos M.",             time: "hace 2 h",    read: true },
  { id: 5, type: "order",   text: "Pedido #1041 marcado como completado",                time: "hace 3 h",    read: true },
  { id: 6, type: "review",  text: "Nueva reseña de 3 estrellas pendiente de respuesta", time: "ayer",         read: true },
];

const WEEKLY_BARS = [
  { h: 40, c: A.neutral2 }, { h: 55, c: A.neutral2 }, { h: 48, c: A.neutral2 },
  { h: 70, c: A.neutral2 }, { h: 60, c: A.neutral2 }, { h: 92, c: A.neutral3 }, { h: 100, c: A.accent },
];
const DAYS = ["L","M","M","J","V","S","D"];
const WEEKLY_ORDERS = [
  { day: "L", val: 18 }, { day: "M", val: 24 }, { day: "M", val: 21 },
  { day: "J", val: 32 }, { day: "V", val: 27 }, { day: "S", val: 42 }, { day: "D", val: 47 },
];

// ─── Admin Shared Components ──────────────────────────────────────────────────

function AdminKpiCard({ label, value, sub, subColor, icon: Icon, iconBg, iconColor, accent }: {
  label: string; value: string | number; sub?: string; subColor?: string;
  icon?: React.ElementType; iconBg?: string; iconColor?: string; accent?: boolean;
}) {
  return (
    <div className="rounded-xl p-4 transition-all hover:shadow-md" style={{ background: A.card, border: `1px solid ${A.border}` }}>
      {Icon && (
        <div className="flex items-center justify-center rounded-lg mb-3" style={{ width: 34, height: 34, background: iconBg ?? `${A.neutral3}14` }}>
          <Icon size={16} style={{ color: iconColor ?? A.neutral3 }} />
        </div>
      )}
      <p style={{ fontSize: 11, color: A.textMuted, fontFamily: FF.sans, fontWeight: 500 }}>{label}</p>
      <p className="font-bold mt-1" style={{ fontSize: 22, fontFamily: FF.sans, color: accent ? A.accent : A.text }}>{value}</p>
      {sub && <p style={{ fontSize: 10, color: subColor || A.textMuted, marginTop: 4, fontFamily: FF.sans, fontWeight: 500 }}>{sub}</p>}
    </div>
  );
}

function MiniBar({ bars, days, height = 100 }: { bars: { h: number; c: string }[]; days?: string[]; height?: number }) {
  const max = Math.max(...bars.map(b => b.h));
  return (
    <div>
      <div className="flex items-end gap-1.5 relative" style={{ height }}>
        {[25, 50, 75].map(g => (
          <div key={g} className="absolute left-0 right-0" style={{ bottom: `${g}%`, borderTop: `1px dashed ${A.border}`, opacity: 0.6 }} />
        ))}
        {bars.map((b, i) => {
          const isMax = b.h === max;
          return (
            <div key={i} className="flex-1 flex flex-col items-center justify-end group cursor-pointer relative" style={{ height: "100%" }}>
              {isMax && (
                <span className="mb-1 px-1.5 py-0.5 rounded" style={{ fontSize: 8, fontWeight: 700, color: "#fff", background: b.c, fontFamily: FF.sans }}>{b.h}</span>
              )}
              <div className="w-full rounded-t-md transition-all duration-300 group-hover:opacity-80" style={{
                height: `${b.h}%`,
                background: `linear-gradient(180deg, ${b.c} 0%, ${b.c}cc 100%)`,
                boxShadow: `inset 0 -2px 0 ${b.c}`,
                minHeight: 4,
              }} />
            </div>
          );
        })}
      </div>
      {days && (
        <div className="flex gap-1.5 mt-2">
          {days.map((d, i) => <span key={i} className="flex-1 text-center" style={{ fontSize: 9, fontWeight: 600, color: A.textMuted, fontFamily: FF.sans }}>{d}</span>)}
        </div>
      )}
    </div>
  );
}

function BarChart({ data, height = 140 }: { data: { day: string; val: number }[]; height?: number }) {
  const maxVal = Math.max(...data.map(d => d.val));
  const yTop   = Math.ceil(maxVal / 10) * 10;
  const steps  = [0, yTop * 0.25, yTop * 0.5, yTop * 0.75, yTop].map(Math.round);
  const barH   = height - 22;

  return (
    <div className="flex gap-2">
      {/* Y-axis */}
      <div className="flex flex-col-reverse justify-between" style={{ height, paddingBottom: 22, minWidth: 20 }}>
        {steps.map((s, i) => (
          <span key={i} style={{ fontSize: 8, color: A.textSoft, fontFamily: FF.sans, lineHeight: 1 }}>{s}</span>
        ))}
      </div>

      {/* Chart body */}
      <div className="flex-1 flex flex-col">
        <div className="relative flex items-end gap-1.5" style={{ height: barH }}>
          {/* Grid lines */}
          {steps.slice(1).map((s, i) => (
            <div key={i} className="absolute left-0 right-0 pointer-events-none"
              style={{ bottom: `${(s / yTop) * 100}%`, borderTop: `1px dashed ${A.border}` }} />
          ))}
          {/* Bars */}
          {data.map((d, i) => {
            const pct   = (d.val / yTop) * 100;
            const isMax = d.val === maxVal;
            return (
              <div key={i} className="flex-1 flex flex-col items-center justify-end group relative" style={{ height: "100%" }}>
                {isMax && (
                  <span className="mb-1 rounded px-1.5 py-0.5"
                    style={{ fontSize: 8, fontWeight: 700, color: "#fff", background: A.accent, fontFamily: FF.sans }}>
                    {d.val}
                  </span>
                )}
                {/* Hover tooltip para el resto */}
                {!isMax && (
                  <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded px-1.5 py-0.5"
                    style={{ bottom: `calc(${pct}% + 6px)`, left: "50%", transform: "translateX(-50%)", fontSize: 8, fontWeight: 700, color: "#fff", background: A.text, fontFamily: FF.sans, whiteSpace: "nowrap" }}>
                    {d.val}
                  </span>
                )}
                <div className="w-full transition-opacity duration-150 group-hover:opacity-75"
                  style={{ height: `${pct}%`, background: isMax ? A.accent : A.neutral1, borderRadius: "4px 4px 0 0", minHeight: 4 }} />
              </div>
            );
          })}
        </div>
        {/* Day labels */}
        <div className="flex gap-1.5 mt-1.5">
          {data.map((d, i) => (
            <span key={i} className="flex-1 text-center"
              style={{ fontSize: 9, fontWeight: 600, color: A.textMuted, fontFamily: FF.sans }}>{d.day}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function DonutChart({ pct, label, size = 110, primary = A.accent, secondary = A.neutral2 }: { pct: number; label: string; size?: number; primary?: string; secondary?: string }) {
  const inner = size - 36;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <div style={{
        width: size, height: size, borderRadius: "50%",
        background: `conic-gradient(${primary} 0% ${pct}%, ${secondary}55 ${pct}% 100%)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: `0 4px 12px ${primary}22`,
      }}>
        <div style={{
          width: inner, height: inner, borderRadius: "50%",
          background: A.card, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          boxShadow: `inset 0 0 0 1px ${A.border}`,
        }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: primary, fontFamily: FF.sans, lineHeight: 1 }}>{pct}%</span>
          <span style={{ fontSize: 8, color: A.textMuted, fontFamily: FF.sans, marginTop: 2, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</span>
        </div>
      </div>
    </div>
  );
}

function ProgressBar({ value, max, color = A.accent, height = 6 }: { value: number; max: number; color?: string; height?: number }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="w-full rounded-full overflow-hidden" style={{ height, background: `${color}1a` }}>
      <div className="h-full rounded-full transition-all duration-500" style={{
        width: `${pct}%`,
        background: `linear-gradient(90deg, ${color} 0%, ${color}cc 100%)`,
      }} />
    </div>
  );
}

function DropdownBtn({ label }: { label: string }) {
  return (
    <button
      className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all hover:bg-gray-50"
      style={{ background: A.card, border: `1px solid ${A.border}`, color: A.text, fontSize: 11, fontFamily: FF.sans, fontWeight: 600 }}
    >
      {label}
      <ChevronDown size={14} style={{ color: A.textMuted }} />
    </button>
  );
}

function AreaChart({
  data,
  peakIdx,
  peakValue,
  yLabels = [100, 80, 60, 40, 20],
  xLabels = ["5k","10k","15k","20k","25k","30k","35k","40k","45k","50k","55k","60k"],
}: {
  data: number[];
  peakIdx?: number;
  peakValue?: string;
  yLabels?: number[];
  xLabels?: string[];
}) {
  const W = 640, H = 260;
  const padL = 52, padR = 24, padT = 36, padB = 42;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const yMin = Math.min(...yLabels);
  const yMax = Math.max(...yLabels);
  const gradId = "areaGrad-" + Math.round(data[0] * 1000);

  const xAt = (i: number) => padL + (i * innerW) / (data.length - 1);
  const yAt = (v: number) => padT + innerH * (1 - (v - yMin) / (yMax - yMin));

  const points = data.map((v, i) => `${xAt(i).toFixed(1)},${yAt(v).toFixed(1)}`);
  const linePath = `M ${points.join(" L ")}`;
  const baseY = yAt(yMin);
  const areaPath = `M ${xAt(0)},${baseY} L ${points.join(" L ")} L ${xAt(data.length - 1)},${baseY} Z`;
  const markerIndices = data.map((_, i) => i).filter(i => i === 0 || i === data.length - 1 || i % 3 === 0 || i === peakIdx);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={A.accent} stopOpacity="0.32" />
          <stop offset="100%" stopColor={A.accent} stopOpacity="0" />
        </linearGradient>
      </defs>

      {yLabels.map(y => (
        <g key={y}>
          <line x1={padL} y1={yAt(y)} x2={W - padR} y2={yAt(y)} stroke={A.border} strokeDasharray="3 4" strokeWidth="1" />
          <text x={padL - 10} y={yAt(y) + 4} textAnchor="end" fontSize="10" fill={A.textSoft} fontFamily="Nunito, system-ui" fontWeight="600">{y}%</text>
        </g>
      ))}

      {xLabels.map((l, i) => (
        <text key={l + i} x={xAt(i)} y={H - padB + 20} textAnchor="middle" fontSize="9" fill={A.textSoft} fontFamily="Nunito, system-ui" fontWeight="600">{l}</text>
      ))}

      <path d={areaPath} fill={`url(#${gradId})`} />
      <path d={linePath} stroke={A.accent} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />

      {markerIndices.map(i => (
        <circle key={i} cx={xAt(i)} cy={yAt(data[i])} r="3.5" fill={A.card} stroke={A.accent} strokeWidth="2" />
      ))}

      {peakIdx !== undefined && peakValue && (
        <g>
          <circle cx={xAt(peakIdx)} cy={yAt(data[peakIdx])} r="5.5" fill={A.accent} stroke="#fff" strokeWidth="2.5" />
          <g transform={`translate(${xAt(peakIdx)}, ${yAt(data[peakIdx]) - 14})`}>
            <path d="M -5 0 L 0 6 L 5 0 Z" fill={A.text} />
            <g transform="translate(-34, -26)">
              <rect width="68" height="26" rx="6" fill={A.text} />
              <text x="34" y="17.5" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#fff" fontFamily="Nunito, system-ui">{peakValue}</text>
            </g>
          </g>
        </g>
      )}
    </svg>
  );
}

function AdminSectionCard({ title, children, action }: { title?: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="rounded-xl p-5" style={{ background: A.card, border: `1px solid ${A.border}` }}>
      {(title || action) && (
        <div className="flex items-center justify-between mb-4">
          {title && <span style={{ fontSize: 13, fontWeight: 700, color: A.text, fontFamily: FF.sans }}>{title}</span>}
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

function FilterTab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
      style={{ background: active ? A.accent : A.card, color: active ? "#fff" : A.textMuted, border: active ? "none" : `1px solid ${A.border}`, fontFamily: FF.sans }}
    >
      {label}
    </button>
  );
}

function StatusBadge({ type }: { type: "completed" | "process" | "cancelled" | "active" | "inactive" | "expired" | "cooking" }) {
  const map = {
    completed: { bg: "#DCFCE7", dot: A.green, c: "#15803D", label: "Completado" },
    process:   { bg: "#FEF3C7", dot: A.amber, c: "#92400E", label: "En proceso" },
    cancelled: { bg: "#FEE2E2", dot: A.red,   c: "#991B1B", label: "Cancelado" },
    active:    { bg: "#DCFCE7", dot: A.green, c: "#15803D", label: "Activo" },
    inactive:  { bg: "#F3F4F6", dot: A.neutral3, c: A.neutral4, label: "Inactivo" },
    expired:   { bg: "#F3F4F6", dot: A.neutral3, c: A.neutral4, label: "Vencida" },
    cooking:   { bg: "#FEF3C7", dot: A.amber, c: "#92400E", label: "En cocina" },
  };
  const s = map[type];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full font-semibold whitespace-nowrap" style={{ background: s.bg, color: s.c, fontSize: 9, padding: "3px 9px", fontFamily: FF.sans }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.dot, flexShrink: 0 }} />
      {s.label}
    </span>
  );
}

function AdminBtn({ children, onClick, outline, small }: { children: React.ReactNode; onClick?: () => void; outline?: boolean; small?: boolean }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-lg font-semibold transition-all active:scale-95"
      style={{
        background: outline ? A.card : A.accent,
        color: outline ? A.text : "#fff",
        border: outline ? `1px solid ${A.border}` : "none",
        padding: small ? "6px 14px" : "9px 16px",
        fontSize: small ? 11 : 12,
        fontFamily: FF.sans,
      }}
    >
      {children}
    </button>
  );
}

function ModalityPill({ mode }: { mode: string }) {
  const isHere = mode === "aqui";
  const c = isHere ? A.neutral4 : A.neutral3;
  const label = isHere ? "Comer aquí" : "Para llevar";
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full" style={{ background: A.neutral1, color: c, fontSize: 9, padding: "3px 9px", fontFamily: FF.sans, fontWeight: 600 }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: c }} />
      {label}
    </span>
  );
}

function AdminPageHeader({ title, subtitle, right }: { title: string; subtitle?: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pb-4" style={{ borderBottom: `1px solid ${A.border}` }}>
      <div className="flex items-center gap-3">
        <ImageWithFallback src={roosterLogo} alt="Rooster" className="object-contain flex-shrink-0" style={{ width: 44, height: 44 }} />
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: A.text, fontFamily: FF.serif, lineHeight: 1.1 }}>{title}</h2>
          {subtitle && <p style={{ fontSize: 11, color: A.textMuted, fontFamily: FF.sans, marginTop: 3 }}>{subtitle}</p>}
        </div>
      </div>
      {right && <div className="flex items-center gap-2 flex-wrap">{right}</div>}
    </div>
  );
}

function SearchInput({ placeholder }: { placeholder: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ background: A.card, border: `1px solid ${A.border}` }}>
      <Search size={13} style={{ color: A.textSoft }} />
      <input placeholder={placeholder} className="bg-transparent outline-none text-xs w-32" style={{ fontFamily: FF.sans, color: A.text }} />
    </div>
  );
}

// ─── Admin Dashboard ──────────────────────────────────────────────────────────

function AdminDashboard({ onGoToPedidos }: { onGoToPedidos?: () => void }) {
  return (
    <div className="flex flex-col gap-5">
      <AdminPageHeader title="Dashboard" subtitle="Resumen del día · Sucursal Liberia" />

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <AdminKpiCard label="Pedidos hoy"    value={47}          sub="↑ 12% vs ayer" subColor={A.green} icon={ClipboardList} iconBg={`${A.neutral3}14`} iconColor={A.neutral4} />
        <AdminKpiCard label="Ventas hoy"     value="₡412.300"    sub="↑ 8% vs ayer"  subColor={A.green} icon={TrendingUp}    iconBg={`${A.green}1a`}    iconColor={A.green} />
        <AdminKpiCard label="Ticket promedio"value="₡8.770"      icon={TagIcon}       iconBg={`${A.neutral3}14`} iconColor={A.neutral4} />
        <AdminKpiCard label="Pedidos activos"value={6}           sub="en preparación" subColor={A.textMuted} icon={Clock}        iconBg={`${A.amber}1f`}    iconColor={A.amber} />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3">
          <AdminSectionCard title="Ventas de la semana" action={<DropdownBtn label="Esta semana" />}>
            <AreaChart
              data={[28, 35, 52, 44, 60, 78, 92.5, 84, 70, 76, 64, 58]}
              peakIdx={6}
              peakValue="92.5%"
            />
          </AdminSectionCard>
        </div>

        {/* New orders reminder card */}
        <div className="lg:col-span-2 rounded-xl p-5 flex flex-col" style={{ background: A.card, border: `1px solid ${A.border}` }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="relative flex-shrink-0">
                <div className="flex items-center justify-center rounded-lg" style={{ width: 34, height: 34, background: `${A.accent}1a` }}>
                  <Bell size={16} style={{ color: A.accent }} />
                </div>
                <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: A.accent }} />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: A.accent }} />
                </span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: A.text, fontFamily: FF.sans }}>Pedidos nuevos</span>
            </div>
            <span className="rounded-full px-2 py-0.5" style={{ background: `${A.accent}14`, color: A.accent, fontSize: 10, fontWeight: 700, fontFamily: FF.sans }}>
              {NEW_ORDERS.length} nuevo{NEW_ORDERS.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="flex-1 flex flex-col gap-2 mb-4">
            {NEW_ORDERS.map(o => (
              <button
                key={o.id}
                onClick={onGoToPedidos}
                className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition-all hover:bg-[#F9FAFB]"
                style={{ background: A.panel, border: `1px solid ${A.border}` }}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="flex items-center justify-center rounded-md flex-shrink-0" style={{ width: 28, height: 28, background: A.card, border: `1px solid ${A.border}` }}>
                    <ClipboardList size={13} style={{ color: A.neutral4 }} />
                  </div>
                  <div className="min-w-0">
                    <p style={{ fontSize: 12, fontWeight: 700, color: A.text, fontFamily: FF.sans }}>
                      {o.id} <span style={{ color: A.textMuted, fontWeight: 500 }}>· {o.client}</span>
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="flex items-center gap-1" style={{ fontSize: 10, color: A.textMuted, fontFamily: FF.sans }}>
                        <Clock size={9} /> {o.time}
                      </span>
                      <span style={{ fontSize: 10, color: A.textSoft }}>·</span>
                      <span style={{ fontSize: 10, color: A.textMuted, fontFamily: FF.sans }}>{o.total}</span>
                    </div>
                  </div>
                </div>
                <ChevronDown size={14} className="flex-shrink-0 -rotate-90" style={{ color: A.textSoft }} />
              </button>
            ))}
          </div>

          <button
            onClick={onGoToPedidos}
            className="w-full flex items-center justify-center gap-2 rounded-lg py-2.5 transition-all active:scale-[0.98]"
            style={{ background: A.accent, color: "#fff", fontFamily: FF.sans, fontSize: 12, fontWeight: 700 }}
          >
            Ver todos los pedidos
            <ArrowRight size={14} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Recent orders */}
      <AdminSectionCard title="Últimos pedidos">
        <div className="overflow-x-auto rounded-xl" style={{ border: `1px solid ${C.border}` }}>
          <table className="w-full" style={{ borderCollapse: "collapse", fontFamily: FF.sans }}>
            <thead>
              <tr style={{ background: A.panel, borderBottom: `1px solid ${A.border}` }}>
                {["ID Pedido","Fecha","Cliente","Modalidad","Total","Estado"].map(h => (
                  <th key={h} className="text-left py-2.5 px-3" style={{ fontSize: 9, color: A.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.4 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ADMIN_ORDERS.map((o, idx) => (
                <tr key={o.id} className="transition-colors hover:bg-[#F9FAFB]" style={{ borderBottom: idx === ADMIN_ORDERS.length - 1 ? "none" : `1px solid ${A.border}` }}>
                  <td className="py-2.5 px-3" style={{ fontSize: 11, color: A.text, fontWeight: 700 }}>{o.id}</td>
                  <td className="px-3" style={{ fontSize: 9, color: C.muted }}>{o.date}</td>
                  <td className="px-3" style={{ fontSize: 11, color: "#1E1E1E", fontWeight: 600 }}>{o.client}</td>
                  <td className="px-3"><ModalityPill mode={o.mode} /></td>
                  <td className="px-3" style={{ fontSize: 11, color: "#1E1E1E", fontWeight: 700 }}>{o.total}</td>
                  <td className="px-3"><StatusBadge type={o.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminSectionCard>
    </div>
  );
}

// ─── Order Detail Modal ───────────────────────────────────────────────────────

function OrderDetailModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.55)" }}>
      <div className="w-full max-w-md rounded-2xl overflow-hidden" style={{ background: C.bg }}>
        {/* Dark header */}
        <div className="flex items-center justify-between px-5 py-4" style={{ background: "#1E1E1E" }}>
          <div>
            <p style={{ fontSize: 15, fontWeight: 700, color: "#fff", fontFamily: FF.sans }}>Pedido #1042</p>
            <p style={{ fontSize: 9, color: "#bbb", marginTop: 2, fontFamily: FF.sans }}>23/06/2026 · 12:41 · Sucursal Liberia</p>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge type="cooking" />
            <button onClick={onClose}><X size={18} style={{ color: "#fff" }} /></button>
          </div>
        </div>

        <div className="p-5 overflow-y-auto" style={{ maxHeight: "70vh" }}>
          {/* Customer */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center justify-center rounded-full font-bold text-sm" style={{ width: 36, height: 36, background: C.red, color: "#fff", fontFamily: FF.sans }}>M</div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#1E1E1E", fontFamily: FF.sans }}>Mechones Barquero</p>
              <p style={{ fontSize: 10, color: C.brown, fontFamily: FF.sans }}>Comer aquí</p>
            </div>
          </div>

          <p className="uppercase mb-3" style={{ fontSize: 10, fontWeight: 700, color: C.brown, fontFamily: FF.sans, letterSpacing: "0.05em" }}>Productos</p>

          {/* Product 1 */}
          <div className="rounded-2xl p-4 mb-3" style={{ background: C.white, border: `0.5px solid ${C.border}` }}>
            <div className="flex justify-between mb-2">
              <span style={{ fontSize: 12, fontWeight: 700, color: "#1E1E1E", fontFamily: FF.sans }}>1x Pizza Pepperoni (Mediana)</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#1E1E1E", fontFamily: FF.sans }}>₡7.800</span>
            </div>
            <div className="pl-3 mb-2" style={{ borderLeft: `2px solid ${C.gold}` }}>
              <p style={{ fontSize: 10, color: C.muted, fontFamily: FF.sans }}>+ Masa tradicional</p>
              <div className="flex justify-between"><span style={{ fontSize: 10, color: C.muted, fontFamily: FF.sans }}>+ Extra queso</span><span style={{ fontSize: 10, color: C.orange, fontFamily: FF.sans }}>₡900</span></div>
              <div className="flex justify-between"><span style={{ fontSize: 10, color: C.muted, fontFamily: FF.sans }}>+ Jalapeño</span><span style={{ fontSize: 10, color: C.orange, fontFamily: FF.sans }}>₡500</span></div>
            </div>
            <div className="flex items-start gap-2 rounded-xl px-3 py-2" style={{ background: C.bg }}>
              <MessageSquare size={12} style={{ color: C.brown, marginTop: 1, flexShrink: 0 }} />
              <span style={{ fontSize: 10, color: "#1E1E1E", fontFamily: FF.sans }}>"Sin cebolla, bien cocida"</span>
            </div>
          </div>

          {/* Product 2 */}
          <div className="rounded-2xl p-4 mb-4" style={{ background: C.white, border: `0.5px solid ${C.border}` }}>
            <div className="flex justify-between mb-2">
              <span style={{ fontSize: 12, fontWeight: 700, color: "#1E1E1E", fontFamily: FF.sans }}>1x Costillas BBQ</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#1E1E1E", fontFamily: FF.sans }}>₡8.500</span>
            </div>
            <div className="pl-3" style={{ borderLeft: `2px solid ${C.gold}` }}>
              <p style={{ fontSize: 10, color: C.muted, fontFamily: FF.sans }}>+ Término medio</p>
              <p style={{ fontSize: 10, color: C.muted, fontFamily: FF.sans }}>+ Acompañamiento: Papas fritas</p>
              <div className="flex justify-between"><span style={{ fontSize: 10, color: C.muted, fontFamily: FF.sans }}>+ Salsa BBQ extra</span><span style={{ fontSize: 10, color: C.orange, fontFamily: FF.sans }}>₡600</span></div>
            </div>
          </div>

          {/* Summary */}
          <div className="rounded-2xl p-4 mb-4" style={{ background: C.white, border: `0.5px solid ${C.border}` }}>
            {[
              { label: "Subtotal", value: "₡17.800", color: C.muted },
              { label: "Descuento (ROOSTER20)", value: "-₡2.000", color: C.green },
              { label: "IVA (13%)", value: "₡2.054", color: C.muted },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex justify-between mb-1.5">
                <span style={{ fontSize: 11, color, fontFamily: FF.sans }}>{label}</span>
                <span style={{ fontSize: 11, color, fontFamily: FF.sans }}>{value}</span>
              </div>
            ))}
            <div className="my-2" style={{ height: 0.5, background: C.border }} />
            <div className="flex justify-between">
              <span style={{ fontSize: 14, fontWeight: 700, color: "#1E1E1E", fontFamily: FF.sans }}>Total</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: C.red, fontFamily: FF.sans }}>₡17.854</span>
            </div>
          </div>

          <button className="w-full py-3.5 rounded-2xl font-bold text-white active:scale-95 transition-all" style={{ background: C.red, fontFamily: FF.sans, fontSize: 13, boxShadow: "0 6px 20px rgba(225,54,66,0.28)" }}>
            Marcar como listo
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Admin Pedidos ────────────────────────────────────────────────────────────

function AdminPedidos() {
  const [filterTab, setFilterTab] = useState("todos");
  const [selectedOrder, setSelectedOrder] = useState<null | typeof ADMIN_ORDERS[number]>(null);

  const filtered = filterTab === "todos" ? ADMIN_ORDERS : ADMIN_ORDERS.filter(o => o.status === filterTab);

  return (
    <div className="flex flex-col gap-5">
      {selectedOrder && <OrderDetailModal onClose={() => setSelectedOrder(null)} />}

      <AdminPageHeader title="Pedidos" subtitle="Dashboard / Pedidos de clientes" right={<SearchInput placeholder="Buscar pedido..." />} />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <AdminKpiCard label="Pedidos totales" value={200} icon={ClipboardList} iconBg={`${A.neutral3}14`} iconColor={A.neutral4} />
        <AdminKpiCard label="En proceso"      value={12}  icon={Clock}         iconBg={`${A.amber}1f`}    iconColor={A.amber} />
        <AdminKpiCard label="Completados"     value={182} icon={CheckCircle}   iconBg={`${A.green}1a`}    iconColor={A.green} />
        <AdminKpiCard label="Cancelados"      value={6}   icon={X}             iconBg={`${A.red}1a`}      iconColor={A.red} />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <AdminSectionCard
            title="Pedidos por día — Esta semana"
            action={
              <span style={{ fontSize: 10, fontWeight: 700, color: A.green, fontFamily: FF.sans }}>
                211 total · ↑ 8%
              </span>
            }
          >
            <BarChart data={WEEKLY_ORDERS} height={150} />
          </AdminSectionCard>
        </div>
        <AdminSectionCard title="Modalidad hoy">
          <div className="flex flex-col items-center gap-3">
            <DonutChart pct={56} label="Comer aquí" size={100} primary={A.accent} secondary={A.neutral2} />
            <div className="flex flex-col gap-2 w-full">
              {[{ label: "Comer aquí", n: 26, c: A.accent, bg: `${A.accent}0d` }, { label: "Para llevar", n: 21, c: A.neutral4, bg: A.neutral1 }].map(({ label, n, c, bg }) => (
                <div key={label} className="flex items-center gap-2 rounded-lg px-2 py-1.5" style={{ background: bg }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: c, flexShrink: 0 }} />
                  <span style={{ fontSize: 10, color: A.text, flex: 1, fontFamily: FF.sans, fontWeight: 600 }}>{label}</span>
                  <span style={{ fontSize: 11, fontWeight: 800, color: c, fontFamily: FF.sans }}>{n}</span>
                </div>
              ))}
            </div>
          </div>
        </AdminSectionCard>
      </div>

      {/* Orders table */}
      <AdminSectionCard>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex flex-wrap gap-2">
            {["todos","process","completed","cancelled"].map(t => (
              <FilterTab key={t} label={t === "todos" ? "Todos" : t === "process" ? "En proceso" : t === "completed" ? "Completados" : "Cancelados"} active={filterTab === t} onClick={() => setFilterTab(t)} />
            ))}
          </div>
          <span style={{ fontSize: 10, color: C.brown, fontFamily: FF.sans }}>Esta semana ▾</span>
        </div>

        <div className="overflow-x-auto rounded-xl" style={{ border: `1px solid ${C.border}` }}>
          <table className="w-full" style={{ borderCollapse: "collapse", fontFamily: FF.sans }}>
            <thead>
              <tr style={{ background: A.panel, borderBottom: `1px solid ${A.border}` }}>
                {["ID Pedido","Fecha","Cliente","Modalidad","Cant.","Total","Estado",""].map(h => (
                  <th key={h} className="text-left py-2.5 px-3" style={{ fontSize: 9, color: A.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.4 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((o, idx) => (
                <tr
                  key={o.id}
                  onClick={() => setSelectedOrder(o)}
                  className="cursor-pointer transition-colors hover:bg-[#F9FAFB]"
                  style={{ borderBottom: idx === filtered.length - 1 ? "none" : `1px solid ${A.border}` }}
                >
                  <td className="py-3 px-3" style={{ fontSize: 11, color: A.text, fontWeight: 700 }}>{o.id}</td>
                  <td className="px-3" style={{ fontSize: 9, color: C.muted }}>{o.date}</td>
                  <td className="px-3" style={{ fontSize: 11, color: "#1E1E1E", fontWeight: 600 }}>{o.client}</td>
                  <td className="px-3"><ModalityPill mode={o.mode} /></td>
                  <td className="px-3" style={{ fontSize: 11, color: "#1E1E1E" }}>{o.qty}</td>
                  <td className="px-3" style={{ fontSize: 11, color: "#1E1E1E", fontWeight: 700 }}>{o.total}</td>
                  <td className="px-3"><StatusBadge type={o.status} /></td>
                  <td className="px-3"><button className="text-xs font-semibold" style={{ color: C.red, fontFamily: FF.sans }}>Ver →</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span style={{ fontSize: 10, color: C.brown, fontFamily: FF.sans }}>Mostrando {filtered.length} de 200</span>
          <div className="flex gap-1.5">
            {[1,2,3].map(p => (
              <span key={p} className="flex items-center justify-center rounded-lg" style={{ width: 24, height: 24, background: p === 1 ? C.red : "transparent", color: p === 1 ? "#fff" : "#1E1E1E", border: p !== 1 ? `0.5px solid ${C.border}` : "none", fontSize: 9, fontFamily: FF.sans }}>
                {p}
              </span>
            ))}
          </div>
        </div>
      </AdminSectionCard>
    </div>
  );
}

// ─── Admin Menu ───────────────────────────────────────────────────────────────

function AdminMenu() {
  const [products, setProducts] = useState(ADMIN_PRODUCTS);
  const [catFilter, setCatFilter] = useState("Todos");

  const toggle = (id: number) => setProducts(prev => prev.map(p => p.id === id ? { ...p, available: !p.available } : p));
  const toggleFeatured = (id: number) => setProducts(prev => prev.map(p => p.id === id ? { ...p, featured: !p.featured } : p));

  const filtered = catFilter === "Todos" ? products : products.filter(p => p.cat === catFilter);

  return (
    <div className="flex flex-col gap-5">
      <AdminPageHeader title="Menú / Catálogo" subtitle="Dashboard / Menú" right={<AdminBtn><Plus size={14} /> Nuevo producto</AdminBtn>} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <AdminKpiCard label="Productos totales" value={38} icon={Package}    iconBg={`${A.neutral3}14`} iconColor={A.neutral4} />
        <AdminKpiCard label="Disponibles"        value={34} icon={CheckCircle}iconBg={`${A.green}1a`}    iconColor={A.green} />
        <AdminKpiCard label="Agotados"           value={4}  icon={AlertTriangle} iconBg={`${A.red}1a`}    iconColor={A.red} />
        <AdminKpiCard label="Destacados"         value={6}  icon={Star}       iconBg={`${A.amber}1f`}    iconColor={A.amber} />
      </div>

      <AdminSectionCard>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex flex-wrap gap-2">
            {["Todos","Pizza","Grill","Pasta","Bebidas"].map(cat => (
              <FilterTab key={cat} label={cat} active={catFilter === cat} onClick={() => setCatFilter(cat)} />
            ))}
          </div>
          <SearchInput placeholder="Buscar producto..." />
        </div>

        <div className="overflow-x-auto rounded-xl" style={{ border: `1px solid ${C.border}` }}>
          <table className="w-full" style={{ borderCollapse: "collapse", fontFamily: FF.sans }}>
            <thead>
              <tr style={{ background: A.panel, borderBottom: `1px solid ${A.border}` }}>
                {["","Producto","Categoría","Precio base","Destacado","Disponible","Acciones"].map(h => (
                  <th key={h} className="text-left py-2.5 px-3" style={{ fontSize: 9, color: A.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.4 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, idx) => (
                <tr key={p.id} className="transition-colors hover:bg-[#F9FAFB]" style={{ borderBottom: idx === filtered.length - 1 ? "none" : `1px solid ${A.border}`, opacity: p.available ? 1 : 0.6 }}>
                  <td className="py-3 px-3">
                    <div className="flex items-center justify-center rounded-lg" style={{ width: 38, height: 38, background: A.neutral1 }}>
                      <ChefHat size={16} style={{ color: A.neutral4 }} />
                    </div>
                  </td>
                  <td className="px-3" style={{ fontSize: 12, color: A.text, fontWeight: 700 }}>{p.name}</td>
                  <td className="px-3">
                    <span className="rounded-full px-2 py-0.5" style={{ fontSize: 9, color: A.neutral4, background: A.neutral1, fontWeight: 600 }}>{p.cat}</span>
                  </td>
                  <td className="px-3" style={{ fontSize: 12, color: "#1E1E1E", fontWeight: 600 }}>{p.price}</td>
                  <td className="px-3">
                    <button onClick={() => toggleFeatured(p.id)} style={{ fontSize: 20, color: p.featured ? C.gold : "#ddd", lineHeight: 1 }}>
                      {p.featured ? "★" : "☆"}
                    </button>
                  </td>
                  <td className="px-3">
                    <div className="flex flex-col gap-0.5">
                      <button onClick={() => toggle(p.id)} className="flex items-center" style={{ width: 34, height: 18, borderRadius: 9, background: p.available ? C.green : C.brown + "55", padding: "0 2px", transition: "background 0.2s" }}>
                        <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#fff", transform: p.available ? "translateX(16px)" : "translateX(0)", transition: "transform 0.2s" }} />
                      </button>
                      {!p.available && <span style={{ fontSize: 8, color: C.red, fontFamily: FF.sans, fontWeight: 700 }}>Agotado</span>}
                    </div>
                  </td>
                  <td className="px-3">
                    <div className="flex gap-2">
                      <button className="flex items-center justify-center rounded-lg transition-all hover:scale-110" style={{ width: 28, height: 28, background: A.neutral1 }}><Pencil size={13} style={{ color: A.neutral4 }} /></button>
                      <button className="flex items-center justify-center rounded-lg transition-all hover:scale-110" style={{ width: 28, height: 28, background: `${A.red}14` }}><Trash2 size={13} style={{ color: A.red }} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span style={{ fontSize: 10, color: C.brown, fontFamily: FF.sans }}>Mostrando {filtered.length} de 38</span>
          <div className="flex gap-1.5">
            {[1,2].map(p => (
              <span key={p} className="flex items-center justify-center rounded-lg" style={{ width: 24, height: 24, background: p === 1 ? C.red : "transparent", color: p === 1 ? "#fff" : "#1E1E1E", border: p !== 1 ? `0.5px solid ${C.border}` : "none", fontSize: 9, fontFamily: FF.sans }}>{p}</span>
            ))}
          </div>
        </div>
      </AdminSectionCard>
    </div>
  );
}

// ─── Admin Ofertas y Cupones ──────────────────────────────────────────────────

function AdminOfertasCupones() {
  const [tab, setTab] = useState<"ofertas" | "cupones">("ofertas");

  return (
    <div className="flex flex-col gap-5">
      <AdminPageHeader title="Ofertas y cupones" subtitle="Dashboard / Ofertas y cupones" right={<AdminBtn><Plus size={14} /> {tab === "ofertas" ? "Nueva oferta" : "Nuevo cupón"}</AdminBtn>} />

      {/* Tab switcher */}
      <div className="flex gap-2">
        <button onClick={() => setTab("ofertas")} className="px-5 py-2.5 rounded-xl font-semibold text-sm transition-all" style={{ background: tab === "ofertas" ? C.red : C.white, color: tab === "ofertas" ? "#fff" : "#1E1E1E", border: `0.5px solid ${tab === "ofertas" ? C.red : C.border}`, fontFamily: FF.sans }}>Ofertas (combos)</button>
        <button onClick={() => setTab("cupones")} className="px-5 py-2.5 rounded-xl font-semibold text-sm transition-all" style={{ background: tab === "cupones" ? C.red : C.white, color: tab === "cupones" ? "#fff" : "#1E1E1E", border: `0.5px solid ${tab === "cupones" ? C.red : C.border}`, fontFamily: FF.sans }}>Cupones (códigos)</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {tab === "ofertas" ? <>
          <AdminKpiCard label="Ofertas totales"    value={9} icon={Store}        iconBg={`${A.neutral3}14`} iconColor={A.neutral4} />
          <AdminKpiCard label="Activas"            value={6} icon={CheckCircle}  iconBg={`${A.green}1a`}    iconColor={A.green} />
          <AdminKpiCard label="Por vencer (7 días)"value={2} icon={Clock}        iconBg={`${A.amber}1f`}    iconColor={A.amber} />
          <AdminKpiCard label="Vencidas"           value={1} icon={AlertTriangle}iconBg={`${A.neutral2}26`} iconColor={A.neutral4} />
        </> : <>
          <AdminKpiCard label="Cupones totales"    value={12} icon={TagIcon}      iconBg={`${A.neutral3}14`} iconColor={A.neutral4} />
          <AdminKpiCard label="Activos"            value={8}  icon={CheckCircle}  iconBg={`${A.green}1a`}    iconColor={A.green} />
          <AdminKpiCard label="Usos totales"       value={280}icon={TrendingUp}   iconBg={`${A.green}1a`}    iconColor={A.green} />
          <AdminKpiCard label="Agotados"           value={1}  icon={AlertTriangle}iconBg={`${A.red}1a`}      iconColor={A.red} />
        </>}
      </div>

      {tab === "ofertas" && (
        <AdminSectionCard title="Combos activos" action={<SearchInput placeholder="Buscar oferta..." />}>
          <div className="overflow-x-auto">
            <table className="w-full" style={{ borderCollapse: "collapse", fontFamily: FF.sans }}>
              <thead>
                <tr style={{ borderBottom: `0.5px solid ${C.border}` }}>
                  {["","Oferta","Productos","Tipo desc.","Vigencia","Estado","Acciones"].map(h => (
                    <th key={h} className="text-left pb-2 pr-3" style={{ fontSize: 9, color: C.brown, fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ADMIN_COMBOS.map(c => (
                  <tr key={c.id} style={{ borderBottom: `0.5px solid rgba(168,137,94,0.1)`, opacity: c.active ? 1 : 0.55 }}>
                    <td className="py-3 pr-3">
                      <div className="flex items-center justify-center rounded-xl" style={{ width: 36, height: 36, background: c.active ? C.red : "#1E1E1E" }}>
                        <ChefHat size={16} style={{ color: "#fff" }} />
                      </div>
                    </td>
                    <td className="pr-3">
                      <p style={{ fontSize: 12, fontWeight: 700, color: "#1E1E1E" }}>{c.name}</p>
                      <p style={{ fontSize: 9, color: C.red, fontWeight: 600 }}>{c.price}</p>
                    </td>
                    <td className="pr-3" style={{ fontSize: 10, color: C.muted }}>{c.products}</td>
                    <td className="pr-3" style={{ fontSize: 10, color: C.muted }}>{c.discount}</td>
                    <td className="pr-3" style={{ fontSize: 10, color: c.active && c.expires.includes("Vence") ? C.red : C.muted, fontWeight: c.active && c.expires.includes("Vence") ? 600 : 400 }}>{c.expires}</td>
                    <td className="pr-3"><StatusBadge type={c.active ? "active" : "expired"} /></td>
                    <td>
                      <div className="flex gap-2">
                        <button className="flex items-center justify-center rounded-lg" style={{ width: 28, height: 28, background: "rgba(168,137,94,0.1)" }}><Pencil size={13} style={{ color: C.brown }} /></button>
                        <button className="flex items-center justify-center rounded-lg" style={{ width: 28, height: 28, background: "rgba(225,54,66,0.08)" }}><Trash2 size={13} style={{ color: C.red }} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AdminSectionCard>
      )}

      {tab === "cupones" && (
        <AdminSectionCard title="Cupones de descuento" action={<SearchInput placeholder="Buscar código..." />}>
          <div className="overflow-x-auto">
            <table className="w-full" style={{ borderCollapse: "collapse", fontFamily: FF.sans }}>
              <thead>
                <tr style={{ borderBottom: `0.5px solid ${C.border}` }}>
                  {["Código","Tipo","Valor","Mín. compra","Vigencia","Usos","Estado","Acciones"].map(h => (
                    <th key={h} className="text-left pb-2 pr-3" style={{ fontSize: 9, color: C.brown, fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ADMIN_COUPONS.map(c => (
                  <tr key={c.id} style={{ borderBottom: `0.5px solid rgba(168,137,94,0.1)`, opacity: c.active ? 1 : 0.55 }}>
                    <td className="py-3 pr-3" style={{ fontSize: 11, fontWeight: 700, color: "#1E1E1E" }}>{c.code}</td>
                    <td className="pr-3" style={{ fontSize: 10, color: C.muted }}>{c.type}</td>
                    <td className="pr-3" style={{ fontSize: 11, color: "#1E1E1E" }}>{c.value}</td>
                    <td className="pr-3" style={{ fontSize: 10, color: C.muted }}>{c.min}</td>
                    <td className="pr-3" style={{ fontSize: 10, color: C.muted }}>{c.expires}</td>
                    <td className="pr-3">
                      <p style={{ fontSize: 10, color: !c.active ? C.red : "#1E1E1E", fontFamily: FF.sans }}>{c.uses} / {c.maxUses ?? "∞"}</p>
                      {c.maxUses && (
                        <div style={{ width: 60, height: 4, background: "#eee", borderRadius: 2, marginTop: 3 }}>
                          <div style={{ width: `${(c.uses / c.maxUses) * 100}%`, height: 4, background: c.uses >= c.maxUses ? C.red : C.orange, borderRadius: 2 }} />
                        </div>
                      )}
                    </td>
                    <td className="pr-3"><StatusBadge type={c.active ? "active" : "cancelled"} /></td>
                    <td>
                      <div className="flex gap-2">
                        <button className="flex items-center justify-center rounded-lg" style={{ width: 28, height: 28, background: "rgba(168,137,94,0.1)" }}><Pencil size={13} style={{ color: C.brown }} /></button>
                        <button className="flex items-center justify-center rounded-lg" style={{ width: 28, height: 28, background: "rgba(225,54,66,0.08)" }}><Trash2 size={13} style={{ color: C.red }} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AdminSectionCard>
      )}
    </div>
  );
}

// ─── Create User Modal ────────────────────────────────────────────────────────

function CreateUserModal({ onClose }: { onClose: () => void }) {
  const [role, setRole] = useState<"user" | "admin">("user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.55)" }}>
      <div className="w-full max-w-sm rounded-2xl overflow-hidden" style={{ background: C.bg }}>
        <div className="flex items-center justify-between px-5 py-4" style={{ background: "#1E1E1E" }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: "#fff", fontFamily: FF.sans }}>Crear usuario</span>
          <button onClick={onClose}><X size={18} style={{ color: "#fff" }} /></button>
        </div>

        <div className="p-5 flex flex-col gap-3">
          {[
            { label: "Nombre completo", val: name, set: setName, ph: "Ej: Bryan Vega Ordoñez" },
            { label: "Correo electrónico", val: email, set: setEmail, ph: "correo@rooster.com" },
            { label: "Teléfono (opcional)", val: phone, set: setPhone, ph: "8888-8888" },
          ].map(({ label, val, set, ph }) => (
            <div key={label}>
              <p style={{ fontSize: 10, color: C.brown, marginBottom: 4, fontFamily: FF.sans }}>{label}</p>
              <input
                value={val} onChange={e => set(e.target.value)}
                placeholder={ph}
                className="w-full rounded-xl px-3 py-2.5 outline-none text-sm"
                style={{ background: C.white, border: `0.5px solid ${C.border}`, fontFamily: FF.sans, color: "#1E1E1E", fontSize: 11 }}
              />
            </div>
          ))}

          <div>
            <p style={{ fontSize: 10, color: C.brown, marginBottom: 4, fontFamily: FF.sans }}>Contraseña temporal</p>
            <div className="flex items-center justify-between rounded-xl px-3 py-2.5" style={{ background: C.white, border: `0.5px solid ${C.border}` }}>
              <span style={{ fontSize: 11, color: C.muted, fontFamily: FF.sans }}>••••••••</span>
              <button><RefreshCw size={13} style={{ color: C.red }} /></button>
            </div>
            <p style={{ fontSize: 8, color: C.brown, marginTop: 3, fontFamily: FF.sans }}>Se enviará por correo, el usuario deberá cambiarla</p>
          </div>

          <div>
            <p style={{ fontSize: 10, color: C.brown, marginBottom: 6, fontFamily: FF.sans }}>Rol</p>
            <div className="flex gap-3">
              {[{ id: "user", label: "Usuario", Icon: User }, { id: "admin", label: "Superadministrador", Icon: Shield }].map(({ id, label, Icon }) => (
                <button
                  key={id}
                  onClick={() => setRole(id as "user" | "admin")}
                  className="flex-1 flex flex-col items-center py-3 rounded-xl transition-all"
                  style={{ border: role === id ? `2px solid ${C.red}` : `1px solid ${C.border}`, background: C.white }}
                >
                  <Icon size={18} style={{ color: role === id ? C.red : C.brown }} />
                  <span style={{ fontSize: 10, fontWeight: role === id ? 700 : 400, color: role === id ? C.red : "#1E1E1E", marginTop: 4, fontFamily: FF.sans }}>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {role === "admin" && (
            <div>
              <p style={{ fontSize: 10, color: C.brown, marginBottom: 4, fontFamily: FF.sans }}>Sucursal asignada</p>
              <div className="flex items-center justify-between rounded-xl px-3 py-2.5" style={{ background: C.white, border: `0.5px solid ${C.border}` }}>
                <span style={{ fontSize: 11, color: "#1E1E1E", fontFamily: FF.sans }}>Sucursal Liberia</span>
                <ChevronDown size={13} style={{ color: C.brown }} />
              </div>
            </div>
          )}

          <button className="w-full py-3.5 rounded-2xl font-bold text-white active:scale-95 transition-all mt-1" style={{ background: C.red, fontFamily: FF.sans, fontSize: 13, boxShadow: "0 6px 20px rgba(225,54,66,0.22)" }}>
            Crear usuario
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Admin Usuarios ───────────────────────────────────────────────────────────

function AdminUsuarios() {
  const [roleFilter, setRoleFilter] = useState("todos");
  const [showCreate, setShowCreate] = useState(false);

  const filtered = roleFilter === "todos" ? ADMIN_USERS
    : roleFilter === "superadmin" ? ADMIN_USERS.filter(u => u.role === "superadmin")
    : ADMIN_USERS.filter(u => u.role === "user");

  return (
    <div className="flex flex-col gap-5">
      {showCreate && <CreateUserModal onClose={() => setShowCreate(false)} />}

      <AdminPageHeader title="Usuarios y roles" subtitle="Dashboard / Usuarios y roles" right={<AdminBtn onClick={() => setShowCreate(true)}><UserPlus size={14} /> Crear usuario</AdminBtn>} />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <AdminKpiCard label="Usuarios totales"     value={316} icon={UsersRound} iconBg={`${A.neutral3}14`} iconColor={A.neutral4} />
        <AdminKpiCard label="Superadministradores" value={4}   icon={Shield}     iconBg={`${A.accent}1a`}   iconColor={A.accent} />
        <AdminKpiCard label="Usuarios (clientes)"  value={312} icon={User}       iconBg={`${A.neutral3}14`} iconColor={A.neutral4} />
      </div>

      <AdminSectionCard>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex flex-wrap gap-2">
            {[["todos","Todos"],["superadmin","Superadministradores"],["user","Usuarios"]].map(([id, label]) => (
              <FilterTab key={id} label={label} active={roleFilter === id} onClick={() => setRoleFilter(id)} />
            ))}
          </div>
          <SearchInput placeholder="Buscar usuario..." />
        </div>

        <div className="overflow-x-auto rounded-xl" style={{ border: `1px solid ${C.border}` }}>
          <table className="w-full" style={{ borderCollapse: "collapse", fontFamily: FF.sans }}>
            <thead>
              <tr style={{ background: A.panel, borderBottom: `1px solid ${A.border}` }}>
                {["","Nombre","Email","Rol","Sucursal","Estado","Acciones"].map(h => (
                  <th key={h} className="text-left py-2.5 px-3" style={{ fontSize: 9, color: A.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.4 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((u, idx) => (
                <tr key={u.id} className="transition-colors hover:bg-[#F9FAFB]" style={{ borderBottom: idx === filtered.length - 1 ? "none" : `1px solid ${A.border}`, opacity: u.active ? 1 : 0.6 }}>
                  <td className="py-3 px-3">
                    <div className="flex items-center justify-center rounded-full font-bold" style={{ width: 34, height: 34, background: u.role === "superadmin" ? A.accent : A.neutral3, color: "#fff", fontSize: 12, fontFamily: FF.sans }}>
                      {u.name[0]}
                    </div>
                  </td>
                  <td className="px-3" style={{ fontSize: 12, fontWeight: 700, color: "#1E1E1E" }}>{u.name}</td>
                  <td className="px-3" style={{ fontSize: 10, color: C.muted }}>{u.email}</td>
                  <td className="px-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full font-semibold" style={{ background: u.role === "superadmin" ? `${A.accent}14` : A.neutral1, color: u.role === "superadmin" ? A.accent : A.neutral4, fontSize: 9, padding: "3px 9px", fontFamily: FF.sans, whiteSpace: "nowrap" }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: u.role === "superadmin" ? A.accent : A.neutral3 }} />
                      {u.role === "superadmin" ? "Superadmin" : "Usuario"}
                    </span>
                  </td>
                  <td className="px-3" style={{ fontSize: 10, color: C.muted }}>{u.branch}</td>
                  <td className="px-3"><StatusBadge type={u.active ? "active" : "inactive"} /></td>
                  <td className="px-3">
                    <div className="flex gap-2">
                      <button className="flex items-center justify-center rounded-lg transition-all hover:scale-110" style={{ width: 28, height: 28, background: A.neutral1 }}><Pencil size={13} style={{ color: A.neutral4 }} /></button>
                      <button className="flex items-center justify-center rounded-lg transition-all hover:scale-110" style={{ width: 28, height: 28, background: u.role === "superadmin" && u.id === 1 ? "transparent" : `${A.red}14`, cursor: u.role === "superadmin" && u.id === 1 ? "not-allowed" : "pointer" }}>
                        <Trash2 size={13} style={{ color: u.role === "superadmin" && u.id === 1 ? "#ddd" : A.red }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span style={{ fontSize: 10, color: C.brown, fontFamily: FF.sans }}>Mostrando {filtered.length} de 316</span>
          <div className="flex gap-1.5">
            {[1,2].map(p => (
              <span key={p} className="flex items-center justify-center rounded-lg" style={{ width: 24, height: 24, background: p === 1 ? C.red : "transparent", color: p === 1 ? "#fff" : "#1E1E1E", border: p !== 1 ? `0.5px solid ${C.border}` : "none", fontSize: 9, fontFamily: FF.sans }}>{p}</span>
            ))}
          </div>
        </div>
      </AdminSectionCard>
    </div>
  );
}

// ─── Admin Analíticas ─────────────────────────────────────────────────────────

const DAILY_BARS = [
  {h:35,c:A.neutral2},{h:50,c:A.neutral2},{h:42,c:A.neutral2},{h:58,c:A.neutral2},{h:48,c:A.neutral2},
  {h:85,c:A.neutral3},{h:95,c:A.accent},{h:40,c:A.neutral2},{h:52,c:A.neutral2},{h:46,c:A.neutral2},
  {h:80,c:A.neutral3},{h:98,c:A.accent},
];
const PEAK_BARS = [
  {h:20,c:A.neutral1},{h:30,c:A.neutral2},{h:65,c:A.neutral2},{h:90,c:A.neutral3},
  {h:100,c:A.accent},{h:60,c:A.neutral2},{h:35,c:A.neutral1},
];
const DAILY_SALES_DATA = [
  { day: "L",  val: 280 }, { day: "M",  val: 390 }, { day: "M",  val: 320 },
  { day: "J",  val: 450 }, { day: "V",  val: 370 }, { day: "S",  val: 680 },
  { day: "D",  val: 760 }, { day: "L",  val: 310 }, { day: "M",  val: 400 },
  { day: "J",  val: 355 }, { day: "S",  val: 620 }, { day: "D",  val: 785 },
];
const PEAK_HOURS_DATA = [
  { day: "11a", val: 12 }, { day: "1p",  val: 28 }, { day: "3p",  val: 35 },
  { day: "5p",  val: 65 }, { day: "7p",  val: 58 }, { day: "9p",  val: 32 }, { day: "11p", val: 15 },
];
const TOP_PRODUCTS = [
  { name: "Pizza Pepperoni", units: 312, color: A.accent },
  { name: "Costillas BBQ",   units: 248, color: A.neutral4 },
  { name: "Pizza 4 Quesos",  units: 201, color: A.neutral3 },
  { name: "Pasta Alfredo",   units: 156, color: A.neutral2 },
];

function AdminAnaliticas() {
  return (
    <div className="flex flex-col gap-5">
      <AdminPageHeader
        title="Reportes y analíticas"
        subtitle="Dashboard / Reportes"
        right={
          <>
            <button className="px-3 py-2 rounded-xl text-xs font-semibold" style={{ background: C.white, border: `0.5px solid ${C.border}`, color: "#1E1E1E", fontFamily: FF.sans }}>
              Este mes ▾
            </button>
            <AdminBtn small><Download size={13} /> Exportar</AdminBtn>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <AdminKpiCard label="Ventas del mes"       value="₡8.420.500" sub="↑ 14% vs anterior" subColor={A.green}      accent />
        <AdminKpiCard label="Pedidos del mes"      value={962}         sub="↑ 9% vs anterior"  subColor={A.green}      />
        <AdminKpiCard label="Ticket promedio"      value="₡8.760"      sub="↓ 2% vs anterior"  subColor={A.red}        />
        <AdminKpiCard label="Calificación promedio"value="4.6 ★"       sub="312 reseñas"        subColor={A.textMuted}  />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-3">
          <AdminSectionCard
            title="Ventas por día"
            action={<span style={{ fontSize: 10, fontWeight: 700, color: A.textMuted, fontFamily: FF.sans }}>Pico: vie–sáb</span>}
          >
            <BarChart data={DAILY_SALES_DATA} height={150} />
          </AdminSectionCard>
        </div>
        <div className="md:col-span-2">
          <AdminSectionCard
            title="Horas pico"
            action={<span style={{ fontSize: 10, fontWeight: 700, color: A.green, fontFamily: FF.sans }}>Pico: 5p–7p</span>}
          >
            <BarChart data={PEAK_HOURS_DATA} height={150} />
          </AdminSectionCard>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AdminSectionCard title="Productos más vendidos">
          <div className="flex flex-col gap-4">
            {TOP_PRODUCTS.map((p, i) => {
              const maxUnits = TOP_PRODUCTS[0].units;
              return (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center justify-center rounded-full font-bold" style={{ width: 18, height: 18, background: p.color, color: "#fff", fontSize: 9, fontFamily: FF.sans }}>{i + 1}</span>
                      <span style={{ fontSize: 11, color: "#1E1E1E", fontFamily: FF.sans, fontWeight: 600 }}>{p.name}</span>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: p.color, fontFamily: FF.sans }}>{p.units} uds</span>
                  </div>
                  <ProgressBar value={p.units} max={maxUnits} color={p.color} />
                </div>
              );
            })}
          </div>
        </AdminSectionCard>

        <AdminSectionCard title="Modalidad de pedido">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <DonutChart pct={58} label="Comer aquí" primary={A.accent} secondary={A.neutral2} />
            <div className="flex flex-col gap-3 w-full">
              {[{ label: "Comer aquí", pct: "58%", value: "558", c: A.accent, bg: `${A.accent}0d` }, { label: "Para llevar", pct: "42%", value: "404", c: A.neutral4, bg: A.neutral1 }].map(({ label, pct, value, c, bg }) => (
                <div key={label} className="flex items-center gap-2.5 rounded-xl p-2.5" style={{ background: bg }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: c, flexShrink: 0 }} />
                  <div className="flex-1 min-w-0">
                    <span style={{ fontSize: 11, color: A.text, fontFamily: FF.sans, fontWeight: 600 }}>{label}</span>
                    <p style={{ fontSize: 9, color: A.textMuted, fontFamily: FF.sans }}>{value} pedidos</p>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 800, color: c, fontFamily: FF.sans }}>{pct}</span>
                </div>
              ))}
            </div>
          </div>
        </AdminSectionCard>
      </div>
    </div>
  );
}

// ─── Admin Notificaciones ─────────────────────────────────────────────────────

function AdminNotificaciones() {
  const [notifs, setNotifs] = useState(ADMIN_NOTIFS);

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })));

  const iconFor = (type: string) => {
    if (type === "order")  return { Icon: ClipboardList, bg: `${A.neutral3}14`, c: A.neutral4 };
    if (type === "alert")  return { Icon: AlertTriangle, bg: `${A.red}1a`,      c: A.red };
    if (type === "coupon") return { Icon: TagIcon,        bg: `${A.amber}1f`,    c: A.amber };
    return                        { Icon: Star,           bg: `${A.green}1a`,    c: A.green };
  };

  return (
    <div className="flex flex-col gap-5">
      <AdminPageHeader
        title="Notificaciones"
        subtitle={`${notifs.filter(n => !n.read).length} sin leer`}
        right={
          <button onClick={markAllRead} style={{ fontSize: 12, color: C.red, fontFamily: FF.sans, fontWeight: 600 }}>
            Marcar todas como leídas
          </button>
        }
      />

      <div className="flex flex-col gap-3">
        {notifs.map(n => {
          const { Icon, bg, c } = iconFor(n.type);
          return (
            <div
              key={n.id}
              className="flex items-start gap-4 rounded-2xl p-4 transition-all"
              style={{ background: n.read ? C.white : "#FFF8F8", border: `0.5px solid ${n.read ? C.border : "rgba(225,54,66,0.2)"}` }}
            >
              <div className="flex items-center justify-center rounded-xl flex-shrink-0" style={{ width: 38, height: 38, background: bg }}>
                <Icon size={17} style={{ color: c }} />
              </div>
              <div className="flex-1 min-w-0">
                <p style={{ fontSize: 12, color: "#1E1E1E", fontFamily: FF.sans, fontWeight: n.read ? 400 : 600 }}>{n.text}</p>
                <p style={{ fontSize: 10, color: C.brown, marginTop: 2, fontFamily: FF.sans }}>{n.time}</p>
              </div>
              {!n.read && <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.red, flexShrink: 0, marginTop: 4 }} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Admin Reseñas ────────────────────────────────────────────────────────────

function AdminResenas() {
  const [filter, setFilter] = useState("todas");

  const filtered = filter === "todas" ? ADMIN_REVIEWS
    : filter === "pendientes" ? ADMIN_REVIEWS.filter(r => !r.replied)
    : ADMIN_REVIEWS.filter(r => r.replied);

  return (
    <div className="flex flex-col gap-5">
      <AdminPageHeader
        title="Reseñas y calificaciones"
        subtitle={<>Calificación promedio: <strong style={{ color: C.gold }}>4.6 ★</strong> · 312 reseñas</>}
      />

      {/* Summary row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <AdminKpiCard label="Calificación promedio" value="4.6 ★"  icon={Star}     iconBg={`${A.amber}1f`}    iconColor={A.amber} />
        <AdminKpiCard label="Total reseñas"         value={312}    icon={MessageSquare} iconBg={`${A.neutral3}14`} iconColor={A.neutral4} />
        <AdminKpiCard label="Sin responder"         value={3}      icon={AlertTriangle} iconBg={`${A.red}1a`}     iconColor={A.red} />
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {[["todas","Todas"],["pendientes","Sin responder"],["respondidas","Respondidas"]].map(([id, label]) => (
          <FilterTab key={id} label={label} active={filter === id} onClick={() => setFilter(id)} />
        ))}
      </div>

      {/* Reviews */}
      <div className="flex flex-col gap-3">
        {filtered.map(r => (
          <div key={r.id} className="rounded-2xl p-4" style={{ background: C.white, border: `0.5px solid ${C.border}` }}>
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center rounded-full font-bold" style={{ width: 36, height: 36, background: C.red, color: "#fff", fontSize: 13, fontFamily: FF.sans, flexShrink: 0 }}>
                  {r.client[0]}
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#1E1E1E", fontFamily: FF.sans }}>{r.client}</p>
                  <p style={{ fontSize: 10, color: C.brown, fontFamily: FF.sans }}>{r.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} style={{ color: i < r.rating ? C.gold : "#ddd", fontSize: 14 }}>★</span>
                ))}
              </div>
            </div>

            <p style={{ fontSize: 12, color: "#1E1E1E", fontFamily: FF.sans, lineHeight: 1.6, marginBottom: 12 }}>{r.text}</p>

            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold" style={{ background: r.replied ? "rgba(46,158,79,0.1)" : "rgba(225,54,66,0.08)", color: r.replied ? C.green : C.red, fontFamily: FF.sans }}>
                {r.replied ? <CheckCircle size={11} /> : <Clock size={11} />}
                {r.replied ? "Respondida" : "Pendiente"}
              </span>
              {!r.replied && (
                <AdminBtn small outline><MessageSquare size={12} /> Responder</AdminBtn>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Admin Configuración ──────────────────────────────────────────────────────

function AdminConfiguracion() {
  const [restaurantName, setRestaurantName] = useState("Rooster");
  const [phone, setPhone] = useState("8888-8888");
  const [address, setAddress] = useState("Liberia, Guanacaste");
  const [website, setWebsite] = useState("rooster.cr");
  const [openTime, setOpenTime] = useState("11:00");
  const [closeTime, setCloseTime] = useState("22:00");
  const [taxPct, setTaxPct] = useState("13");
  const [orderNotifs, setOrderNotifs] = useState(true);
  const [reviewNotifs, setReviewNotifs] = useState(true);
  const [stockAlerts, setStockAlerts] = useState(true);

  function ConfigToggle({ on, setOn }: { on: boolean; setOn: (v: boolean) => void }) {
    return (
      <button onClick={() => setOn(!on)} style={{ width: 40, height: 22, borderRadius: 11, background: on ? C.red : "#ddd", padding: "0 3px", transition: "background 0.2s", flexShrink: 0 }}>
        <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", transform: on ? "translateX(18px)" : "translateX(0)", transition: "transform 0.2s" }} />
      </button>
    );
  }

  function ConfigInput({ label, value, onChange, icon: Icon }: { label: string; value: string; onChange: (v: string) => void; icon?: React.ElementType }) {
    return (
      <div>
        <p style={{ fontSize: 11, color: C.brown, marginBottom: 4, fontFamily: FF.sans }}>{label}</p>
        <div className="flex items-center gap-2 rounded-xl px-3 py-2.5" style={{ background: C.white, border: `0.5px solid ${C.border}` }}>
          {Icon && <Icon size={14} style={{ color: C.brown, flexShrink: 0 }} />}
          <input value={value} onChange={e => onChange(e.target.value)} className="flex-1 outline-none bg-transparent text-sm" style={{ fontFamily: FF.sans, color: "#1E1E1E" }} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <AdminPageHeader title="Configuración general" subtitle="Dashboard / Configuración" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Info general */}
        <div className="rounded-2xl p-5" style={{ background: C.white, border: `0.5px solid ${C.border}` }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#1E1E1E", fontFamily: FF.sans, marginBottom: 16 }}>Información general</p>
          <div className="flex flex-col gap-4">
            <ConfigInput label="Nombre del restaurante" value={restaurantName} onChange={setRestaurantName} icon={Store} />
            <ConfigInput label="Teléfono de contacto" value={phone} onChange={setPhone} icon={Phone} />
            <ConfigInput label="Dirección" value={address} onChange={setAddress} icon={Globe} />
            <ConfigInput label="Sitio web" value={website} onChange={setWebsite} icon={Globe} />
          </div>
        </div>

        {/* Horario */}
        <div className="rounded-2xl p-5" style={{ background: C.white, border: `0.5px solid ${C.border}` }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#1E1E1E", fontFamily: FF.sans, marginBottom: 16 }}>Horario y operación</p>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <ConfigInput label="Hora de apertura" value={openTime} onChange={setOpenTime} icon={Clock} />
              <ConfigInput label="Hora de cierre" value={closeTime} onChange={setCloseTime} icon={Clock} />
            </div>
            <ConfigInput label="IVA (%)" value={taxPct} onChange={setTaxPct} />
          </div>
        </div>

        {/* Notificaciones */}
        <div className="rounded-2xl p-5" style={{ background: C.white, border: `0.5px solid ${C.border}` }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#1E1E1E", fontFamily: FF.sans, marginBottom: 16 }}>Notificaciones</p>
          <div className="flex flex-col gap-4">
            {[
              { label: "Nuevos pedidos", sub: "Recibir alerta al llegar un pedido", on: orderNotifs, set: setOrderNotifs },
              { label: "Reseñas nuevas",  sub: "Recibir alerta cuando hay reseñas",  on: reviewNotifs, set: setReviewNotifs },
              { label: "Stock bajo",      sub: "Alertar cuando un producto se agota", on: stockAlerts, set: setStockAlerts },
            ].map(({ label, sub, on, set }) => (
              <div key={label} className="flex items-center justify-between gap-3">
                <div>
                  <p style={{ fontSize: 12, fontWeight: 600, color: "#1E1E1E", fontFamily: FF.sans }}>{label}</p>
                  <p style={{ fontSize: 10, color: C.brown, fontFamily: FF.sans }}>{sub}</p>
                </div>
                <ConfigToggle on={on} setOn={set} />
              </div>
            ))}
          </div>
        </div>

        {/* Sucursales */}
        <div className="rounded-2xl p-5" style={{ background: C.white, border: `0.5px solid ${C.border}` }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#1E1E1E", fontFamily: FF.sans, marginBottom: 16 }}>Sucursales</p>
          {[{ name: "Sucursal Liberia", address: "Liberia, Guanacaste", active: true }, { name: "Sucursal Nicoya", address: "Nicoya, Guanacaste", active: false }].map(s => (
            <div key={s.name} className="flex items-center justify-between rounded-xl p-3 mb-2" style={{ background: C.bg, border: `0.5px solid ${C.border}` }}>
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: "#1E1E1E", fontFamily: FF.sans }}>{s.name}</p>
                <p style={{ fontSize: 10, color: C.brown, fontFamily: FF.sans }}>{s.address}</p>
              </div>
              <span style={{ fontSize: 9, fontWeight: 700, color: s.active ? C.green : C.brown, background: s.active ? "rgba(46,158,79,0.1)" : "rgba(168,137,94,0.1)", padding: "3px 8px", borderRadius: 6, fontFamily: FF.sans }}>
                {s.active ? "Activa" : "Inactiva"}
              </span>
            </div>
          ))}
          <AdminBtn small outline><Plus size={12} /> Agregar sucursal</AdminBtn>
        </div>
      </div>

      <div className="flex justify-end">
        <AdminBtn><CheckCircle size={14} /> Guardar cambios</AdminBtn>
      </div>
    </div>
  );
}

// ─── Admin Panel ──────────────────────────────────────────────────────────────

const NAV_ITEMS: { id: AdminModule; label: string; Icon: React.ElementType }[] = [
  { id: "dashboard",      label: "Dashboard",         Icon: LayoutDashboard },
  { id: "pedidos",        label: "Pedidos",           Icon: ClipboardList },
  { id: "menu",           label: "Menú",              Icon: ChefHat },
  { id: "ofertas",        label: "Ofertas y cupones", Icon: Tag },
  { id: "usuarios",       label: "Usuarios y roles",  Icon: Shield },
  { id: "analiticas",     label: "Analíticas",        Icon: BarChart2 },
  { id: "notificaciones", label: "Notificaciones",    Icon: Bell },
  { id: "resenas",        label: "Reseñas",           Icon: Star },
  { id: "configuracion",  label: "Configuración",     Icon: Settings },
];

function AdminPanel({ onLogout }: { onLogout: () => void }) {
  const [activeModule, setActiveModule] = useState<AdminModule>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: A.panel, fontFamily: FF.sans }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative z-50 lg:z-auto flex flex-col flex-shrink-0 h-full transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        style={{ width: 220, background: A.sidebar }}
      >
        {/* Brand */}
        <div className="flex items-center gap-2 px-4 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <ImageWithFallback src={roosterLogo} alt="Rooster" className="object-contain flex-shrink-0" style={{ width: 32, height: 32 }} />
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 14, fontFamily: FF.sans }}>Rooster Admin</span>
          <button className="ml-auto lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={14} style={{ color: "#aaa" }} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-2" style={{ scrollbarWidth: "none" }}>
          {NAV_ITEMS.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => { setActiveModule(id); setSidebarOpen(false); }}
              className="flex items-center gap-3 w-full px-4 py-3 transition-all"
              style={{
                background: activeModule === id ? A.accent : "transparent",
                borderLeft: activeModule === id ? `3px solid rgba(255,255,255,0.4)` : "3px solid transparent",
              }}
            >
              <Icon size={15} style={{ color: activeModule === id ? "#fff" : "#9CA3AF", flexShrink: 0 }} />
              <span style={{ fontSize: 12, fontWeight: activeModule === id ? 700 : 500, color: activeModule === id ? "#fff" : "#D1D5DB", fontFamily: FF.sans }}>
                {label}
              </span>
              {id === "notificaciones" && (
                <span className="ml-auto flex items-center justify-center rounded-full" style={{ width: 16, height: 16, background: A.accent, fontSize: 8, color: "#fff", fontFamily: FF.sans, marginLeft: "auto" }}>3</span>
              )}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-4 w-full transition-all hover:bg-white/5"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <LogOut size={15} style={{ color: "#666" }} />
          <span style={{ fontSize: 12, color: "#888", fontFamily: FF.sans }}>Salir al app</span>
        </button>
      </aside>

      {/* Main */}
      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        {/* Header */}
        <header className="flex items-center justify-between px-4 md:px-6 py-4 flex-shrink-0" style={{ background: A.card, borderBottom: `1px solid ${A.border}` }}>
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-1.5 rounded-lg" style={{ background: A.panel }} onClick={() => setSidebarOpen(true)}>
              <MenuIcon size={18} style={{ color: A.text }} />
            </button>
            <div>
              <p style={{ fontSize: 15, fontWeight: 700, color: A.text, fontFamily: FF.sans }}>Buenas tardes, Admin</p>
              <p style={{ fontSize: 10, color: A.textMuted, fontFamily: FF.sans }}>Sucursal Liberia · martes 24 de junio</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex items-center justify-center rounded-lg p-2" style={{ background: A.panel }}>
                <Bell size={16} style={{ color: A.text }} />
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full" style={{ background: A.accent }} />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center rounded-full font-bold" style={{ width: 32, height: 32, background: A.accent, color: "#fff", fontSize: 12, fontFamily: FF.sans }}>A</div>
              <div className="hidden sm:block">
                <p style={{ fontSize: 11, fontWeight: 700, color: A.text, fontFamily: FF.sans }}>Admin Rooster</p>
                <p style={{ fontSize: 9, color: A.textMuted, fontFamily: FF.sans }}>Superadmin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Module content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6" style={{ scrollbarWidth: "none" }}>
          {activeModule === "dashboard"      && <AdminDashboard onGoToPedidos={() => setActiveModule("pedidos")} />}
          {activeModule === "pedidos"        && <AdminPedidos />}
          {activeModule === "menu"           && <AdminMenu />}
          {activeModule === "ofertas"        && <AdminOfertasCupones />}
          {activeModule === "usuarios"       && <AdminUsuarios />}
          {activeModule === "analiticas"     && <AdminAnaliticas />}
          {activeModule === "notificaciones" && <AdminNotificaciones />}
          {activeModule === "resenas"        && <AdminResenas />}
          {activeModule === "configuracion"  && <AdminConfiguracion />}
        </div>
      </div>
    </div>
  );
}

// ─── User App Components ──────────────────────────────────────────────────────

function DishDetailScreen({ dish, onBack, onAddToCart }: { dish: Dish; onBack: () => void; onAddToCart: (item: CartItem) => void }) {
  const opts = OPTIONS[dish.category] ?? OPTIONS.pizza;
  const [sizeIdx, setSizeIdx] = useState(0);
  const [variantIdx, setVariantIdx] = useState(0);
  const [selExtras, setSelExtras] = useState<Set<number>>(new Set());
  const [notes, setNotes] = useState("");
  const [qty, setQty] = useState(1);
  const [notesFocused, setNotesFocused] = useState(false);
  const toggleExtra = (i: number) => setSelExtras(prev => { const s = new Set(prev); s.has(i) ? s.delete(i) : s.add(i); return s; });
  const unitPrice = dish.price + opts.sizes[sizeIdx].extra + opts.variants[variantIdx].extra + [...selExtras].reduce((sum, i) => sum + opts.extras[i].extra, 0);
  const total = unitPrice * qty;
  const addToCart = () => { onAddToCart({ cartId: `${dish.id}-${Date.now()}`, dish, size: opts.sizes[sizeIdx].label, variant: opts.variants[variantIdx].label, extras: [...selExtras].map(i => opts.extras[i].label), notes, qty, unitPrice }); onBack(); };
  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <div className="flex-1">
        <div className="lg:hidden relative" style={{ height: "220px" }}>
          <img src={dish.img} alt={dish.name} className="w-full h-full object-cover" />
          <button onClick={onBack} className="absolute top-4 left-4 flex items-center justify-center rounded-full transition-all active:scale-95" style={{ width: "36px", height: "36px", background: "rgba(255,255,255,0.9)", backdropFilter: "blur(6px)" }}>
            <ArrowLeft size={18} style={{ color: "#1E1E1E" }} />
          </button>
        </div>
        <div className="px-5 md:px-8 pt-3 md:pt-6 pb-32 lg:pb-8 max-w-7xl mx-auto w-full">
          <button onClick={onBack} className="hidden lg:flex items-center gap-2 mb-4 px-3 py-2 rounded-xl transition-all active:scale-95" style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.07)" }}>
            <ArrowLeft size={16} style={{ color: "#1E1E1E" }} />
            <span style={{ fontFamily: FF.sans, fontSize: 13, fontWeight: 600, color: "#1E1E1E" }}>Volver</span>
          </button>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
            <div className="hidden lg:block">
              <div className="rounded-3xl overflow-hidden sticky top-6" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}>
                <img src={dish.img} alt={dish.name} className="w-full h-[400px] xl:h-[480px] object-cover" />
              </div>
            </div>
            <div>
              <div className="flex items-start justify-between mb-1">
                <h2 className="text-xl md:text-3xl leading-tight flex-1 pr-3" style={{ fontFamily: FF.serif, fontWeight: 700, color: "#1E1E1E" }}>{dish.name}</h2>
                <span className="text-lg md:text-2xl font-bold flex-shrink-0" style={{ fontFamily: FF.sans, color: "#E13642" }}>${dish.price}</span>
              </div>
              <p className="text-sm md:text-base mb-5" style={{ color: "#A8895E", fontFamily: FF.sans }}>{dish.desc}</p>
              <Section label="Tamaño" badge="Obligatorio">
                <div className="flex flex-col gap-2">{opts.sizes.map((s, i) => <RadioRow key={i} label={s.label} extra={s.extra} selected={sizeIdx === i} onSelect={() => setSizeIdx(i)} />)}</div>
              </Section>
              <Section label={opts.variantLabel} badge="Obligatorio">
                <div className="flex flex-col gap-2">{opts.variants.map((v, i) => <RadioRow key={i} label={v.label} extra={v.extra} selected={variantIdx === i} onSelect={() => setVariantIdx(i)} />)}</div>
              </Section>
              <Section label="Extras" badge="Opcional">
                <div className="flex flex-col gap-2">{opts.extras.map((e, i) => <CheckRow key={i} label={e.label} extra={e.extra} checked={selExtras.has(i)} onToggle={() => toggleExtra(i)} />)}</div>
              </Section>
              <Section label="Notas" badge="Opcional">
                <textarea rows={2} placeholder="Ej: sin cebolla, bien cocida..." value={notes} onChange={e => setNotes(e.target.value)} onFocus={() => setNotesFocused(true)} onBlur={() => setNotesFocused(false)} className="w-full rounded-xl px-4 py-3 resize-none outline-none text-sm" style={{ fontFamily: FF.sans, color: "#1E1E1E", border: notesFocused ? "1.5px solid #E13642" : "1.5px solid #D1D1D1", background: "#FAFAFA" }} />
              </Section>
              <div className="hidden lg:block rounded-2xl p-4 mt-2" style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 4px 16px rgba(0,0,0,0.05)" }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <button onClick={() => setQty(q => Math.max(1, q - 1))} className="flex items-center justify-center rounded-xl transition-all active:scale-90" style={{ width: "36px", height: "36px", background: qty === 1 ? "#F3F3F3" : "#FFF1F2", border: qty === 1 ? "1.5px solid #E5E5E5" : "1.5px solid #E13642" }}>
                      <Minus size={16} style={{ color: qty === 1 ? "#A8895E" : "#E13642" }} />
                    </button>
                    <span className="text-lg font-bold w-5 text-center" style={{ fontFamily: FF.sans, color: "#1E1E1E" }}>{qty}</span>
                    <button onClick={() => setQty(q => q + 1)} className="flex items-center justify-center rounded-xl transition-all active:scale-90" style={{ width: "36px", height: "36px", background: "#E13642" }}>
                      <Plus size={16} style={{ color: "#FFFFFF" }} />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-xs" style={{ color: "#A8895E", fontFamily: FF.sans }}>Total</p>
                    <p className="text-xl font-bold" style={{ fontFamily: FF.sans, color: "#1E1E1E" }}>${total}</p>
                  </div>
                </div>
                <button onClick={addToCart} className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white transition-all active:scale-95" style={{ background: "#E13642", fontFamily: FF.sans, fontSize: "1rem", boxShadow: "0 6px 20px rgba(225,54,66,0.28)" }}>
                  <ShoppingCart size={18} strokeWidth={2.5} />
                  Agregar al carrito · ${total}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden flex-shrink-0 px-5 py-4 sticky bottom-0" style={{ background: "#FFFFFF", borderTop: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 -4px 20px rgba(0,0,0,0.06)" }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <button onClick={() => setQty(q => Math.max(1, q - 1))} className="flex items-center justify-center rounded-xl transition-all active:scale-90" style={{ width: "36px", height: "36px", background: qty === 1 ? "#F3F3F3" : "#FFF1F2", border: qty === 1 ? "1.5px solid #E5E5E5" : "1.5px solid #E13642" }}>
              <Minus size={16} style={{ color: qty === 1 ? "#A8895E" : "#E13642" }} />
            </button>
            <span className="text-lg font-bold w-5 text-center" style={{ fontFamily: FF.sans, color: "#1E1E1E" }}>{qty}</span>
            <button onClick={() => setQty(q => q + 1)} className="flex items-center justify-center rounded-xl transition-all active:scale-90" style={{ width: "36px", height: "36px", background: "#E13642" }}>
              <Plus size={16} style={{ color: "#FFFFFF" }} />
            </button>
          </div>
          <div className="text-right">
            <p className="text-xs" style={{ color: "#A8895E", fontFamily: FF.sans }}>Total</p>
            <p className="text-xl font-bold" style={{ fontFamily: FF.sans, color: "#1E1E1E" }}>${total}</p>
          </div>
        </div>
        <button onClick={addToCart} className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white transition-all active:scale-95" style={{ background: "#E13642", fontFamily: FF.sans, fontSize: "1rem", boxShadow: "0 6px 20px rgba(225,54,66,0.28)" }}>
          <ShoppingCart size={18} strokeWidth={2.5} />
          Agregar al carrito · ${total}
        </button>
      </div>
    </div>
  );
}

function Section({ label, badge, children }: { label: string; badge: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 mb-2.5">
        <span className="text-sm font-bold" style={{ fontFamily: FF.sans, color: "#1E1E1E" }}>{label}</span>
        <span className="text-xs px-2 py-0.5 rounded-full" style={{ fontFamily: FF.sans, fontWeight: 600, background: badge === "Obligatorio" ? "#FFF1F2" : "#F5F5F5", color: badge === "Obligatorio" ? "#E13642" : "#A8895E" }}>{badge}</span>
      </div>
      {children}
    </div>
  );
}

function RadioRow({ label, extra, selected, onSelect }: { label: string; extra: number; selected: boolean; onSelect: () => void }) {
  return (
    <button onClick={onSelect} className="flex items-center justify-between px-4 py-3 rounded-xl transition-all w-full" style={{ background: selected ? "#FFF1F2" : "#FAFAFA", border: selected ? "1.5px solid #E13642" : "1.5px solid #EBEBEB" }}>
      <span className="text-sm" style={{ fontFamily: FF.sans, fontWeight: selected ? 700 : 500, color: selected ? "#E13642" : "#1E1E1E" }}>{label}</span>
      <div className="flex items-center gap-2">
        {extra > 0 && <span className="text-xs" style={{ fontFamily: FF.sans, color: "#A8895E" }}>+${extra}</span>}
        <div className="rounded-full flex items-center justify-center flex-shrink-0" style={{ width: "18px", height: "18px", border: selected ? "none" : "2px solid #D1D1D1", background: selected ? "#E13642" : "transparent" }}>
          {selected && <div className="rounded-full bg-white" style={{ width: "6px", height: "6px" }} />}
        </div>
      </div>
    </button>
  );
}

function CheckRow({ label, extra, checked, onToggle }: { label: string; extra: number; checked: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className="flex items-center justify-between px-4 py-3 rounded-xl transition-all w-full" style={{ background: checked ? "#FFF1F2" : "#FAFAFA", border: checked ? "1.5px solid #E13642" : "1.5px solid #EBEBEB" }}>
      <span className="text-sm" style={{ fontFamily: FF.sans, fontWeight: checked ? 700 : 500, color: checked ? "#E13642" : "#1E1E1E" }}>{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-xs" style={{ fontFamily: FF.sans, color: "#A8895E" }}>+${extra}</span>
        <div className="rounded-md flex items-center justify-center flex-shrink-0" style={{ width: "18px", height: "18px", border: checked ? "none" : "2px solid #D1D1D1", background: checked ? "#E13642" : "transparent" }}>
          {checked && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
        </div>
      </div>
    </button>
  );
}

function InputField({ label, type = "text", placeholder, value, onChange, icon: Icon, right, focused, onFocus, onBlur }: {
  label: string; type?: string; placeholder: string; value: string; onChange: (v: string) => void;
  icon: React.ElementType; right?: React.ReactNode; focused: boolean; onFocus: () => void; onBlur: () => void;
}) {
  return (
    <div className="w-full mb-4">
      <div className="flex items-center justify-between mb-1">
        <label className="text-xs" style={{ color: "#1E1E1E", fontFamily: FF.sans, fontWeight: 600 }}>{label}</label>
        {right}
      </div>
      <div className="flex items-center gap-2 rounded-xl px-4 py-3.5 transition-all duration-200 w-full" style={{ border: focused ? "1.5px solid #E13642" : "1.5px solid #D1D1D1", background: "#FFFFFF" }}>
        <Icon size={16} style={{ color: focused ? "#E13642" : "#A8895E", flexShrink: 0 }} />
        <input type={type} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} onFocus={onFocus} onBlur={onBlur} className="flex-1 bg-transparent outline-none" style={{ fontFamily: FF.sans, fontSize: "0.875rem", color: "#1E1E1E" }} />
      </div>
    </div>
  );
}

function Shell({ children, centered = false }: { children: React.ReactNode; centered?: boolean }) {
  if (centered) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center px-4 py-8" style={{ background: C.bg }}>
        <div className="relative flex flex-col w-full max-w-md rounded-3xl overflow-hidden" style={{ background: "#FFFFFF", boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}>
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen w-full flex flex-col" style={{ background: C.bg }}>
      {children}
    </div>
  );
}

function SideNav({ activeTab, setActiveTab, cartCount }: { activeTab: string; setActiveTab: (t: string) => void; cartCount: number }) {
  const tabs = [
    { id: "inicio",  label: "Inicio",    Icon: Home },
    { id: "carrito", label: "Carrito",   Icon: ShoppingCart },
    { id: "cupones", label: "Cupones",   Icon: Tag },
    { id: "cuenta",  label: "Mi cuenta", Icon: CircleUserRound },
  ];
  return (
    <aside className="hidden lg:flex flex-col flex-shrink-0 h-screen sticky top-0" style={{ width: 240, background: "#FFFFFF", borderRight: "1px solid rgba(0,0,0,0.07)" }}>
      <div className="flex items-center gap-3 px-6 py-6" style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
        <ImageWithFallback src={roosterLogo} alt="Rooster" className="object-contain" style={{ width: 38, height: 38 }} />
        <span className="text-lg" style={{ fontFamily: FF.serif, fontWeight: 700, color: "#E13642" }}>Rooster</span>
      </div>
      <nav className="flex-1 py-4 px-3 flex flex-col gap-1">
        {tabs.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative"
            style={{ background: activeTab === id ? "#FFF1F2" : "transparent" }}
          >
            <Icon size={20} strokeWidth={activeTab === id ? 2.5 : 1.8} style={{ color: activeTab === id ? "#E13642" : "#A8895E" }} />
            <span style={{ fontFamily: FF.sans, fontSize: 14, fontWeight: activeTab === id ? 700 : 500, color: activeTab === id ? "#E13642" : "#1E1E1E" }}>{label}</span>
            {id === "carrito" && cartCount > 0 && (
              <span className="ml-auto flex items-center justify-center rounded-full text-white" style={{ minWidth: 20, height: 20, padding: "0 6px", background: "#E13642", fontSize: 10, fontWeight: 700, fontFamily: FF.sans }}>{cartCount}</span>
            )}
          </button>
        ))}
      </nav>
    </aside>
  );
}

function LoginScreen({ onCreateAccount, onHome, onAdmin }: { onCreateAccount: () => void; onHome: () => void; onAdmin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleLogin = () => {
    if (email.toLowerCase().trim() === "admin" && password === "123") {
      onAdmin();
    } else {
      onHome();
    }
  };

  return (
    <div className="flex flex-col items-center px-7 pt-6 pb-10 flex-1">
      <ImageWithFallback src={roosterLogo} alt="Rooster logo" className="object-contain mb-2" style={{ width: "180px", height: "180px" }} />
      <h1 className="text-3xl mb-1" style={{ fontFamily: FF.serif, fontWeight: 700, color: "#E13642" }}>Rooster</h1>
      <p className="text-sm mb-8 text-center" style={{ color: "#A8895E", fontFamily: FF.sans }}>Tu comida favorita, al instante.</p>
      <InputField label="Correo electrónico" type="text" placeholder="ejemplo@correo.com" value={email} onChange={setEmail} icon={Mail} focused={emailFocused} onFocus={() => setEmailFocused(true)} onBlur={() => setEmailFocused(false)} />
      <div className="w-full mb-6">
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs" style={{ color: "#1E1E1E", fontFamily: FF.sans, fontWeight: 600 }}>Contraseña</label>
          <button className="text-xs font-semibold" style={{ color: "#E13642", fontFamily: FF.sans }}>¿Olvidaste tu contraseña?</button>
        </div>
        <div className="flex items-center gap-2 rounded-xl px-4 py-3.5 transition-all duration-200" style={{ border: passwordFocused ? "1.5px solid #E13642" : "1.5px solid #D1D1D1" }}>
          <Lock size={16} style={{ color: passwordFocused ? "#E13642" : "#A8895E", flexShrink: 0 }} />
          <input type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} onFocus={() => setPasswordFocused(true)} onBlur={() => setPasswordFocused(false)} className="flex-1 bg-transparent outline-none" style={{ fontFamily: FF.sans, fontSize: "0.875rem", color: "#1E1E1E" }} />
          <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ color: showPassword ? "#E13642" : "#A8895E" }}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button>
        </div>
      </div>
      <button onClick={handleLogin} className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white transition-all active:scale-95 mb-5" style={{ background: "#E13642", fontFamily: FF.sans, fontSize: "1rem", boxShadow: "0 6px 20px rgba(225,54,66,0.28)" }}>
        Iniciar Sesión <ArrowRight size={18} strokeWidth={2.5} />
      </button>
      <div className="flex items-center justify-center gap-1 mb-6">
        <span className="text-sm" style={{ color: "#A8895E", fontFamily: FF.sans }}>¿No tienes cuenta?</span>
        <button onClick={onCreateAccount} className="text-sm font-bold" style={{ color: "#E13642", fontFamily: FF.sans }}>Crear cuenta</button>
      </div>
      <div className="flex items-center gap-3 w-full mb-6">
        <div className="flex-1 h-px" style={{ background: "#E5E5E5" }} />
        <span className="text-xs" style={{ color: "#A8895E", fontFamily: FF.sans }}>O</span>
        <div className="flex-1 h-px" style={{ background: "#E5E5E5" }} />
      </div>
      <button onClick={onHome} className="w-full py-4 rounded-2xl font-bold text-white text-base transition-all active:scale-95" style={{ background: "#1E1E1E", fontFamily: FF.sans, fontSize: "1rem" }}>
        Iniciar sin registrarme
      </button>
    </div>
  );
}

function RegisterScreen({ onBack }: { onBack: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmFocused, setConfirmFocused] = useState(false);
  const passwordsMatch = confirm.length === 0 || password === confirm;
  return (
    <div className="flex flex-col items-center px-7 pt-6 pb-10 flex-1">
      <div className="w-full flex items-center mb-2">
        <button onClick={onBack} className="flex items-center gap-1" style={{ color: "#A8895E", fontFamily: FF.sans, fontSize: "0.875rem", fontWeight: 600 }}>
          <ArrowLeft size={16} /> Volver
        </button>
      </div>
      <ImageWithFallback src={roosterLogo} alt="Rooster logo" className="object-contain mb-2" style={{ width: "130px", height: "130px" }} />
      <h1 className="text-3xl mb-1" style={{ fontFamily: FF.serif, fontWeight: 700, color: "#E13642" }}>Rooster</h1>
      <p className="text-sm mb-6 text-center" style={{ color: "#A8895E", fontFamily: FF.sans }}>Crea tu cuenta y empieza a pedir.</p>
      <InputField label="Nombre completo" placeholder="Tu nombre" value={name} onChange={setName} icon={User} focused={nameFocused} onFocus={() => setNameFocused(true)} onBlur={() => setNameFocused(false)} />
      <InputField label="Correo electrónico" type="email" placeholder="ejemplo@correo.com" value={email} onChange={setEmail} icon={Mail} focused={emailFocused} onFocus={() => setEmailFocused(true)} onBlur={() => setEmailFocused(false)} />
      <div className="w-full mb-4">
        <label className="block text-xs mb-1" style={{ color: "#1E1E1E", fontFamily: FF.sans, fontWeight: 600 }}>Contraseña</label>
        <div className="flex items-center gap-2 rounded-xl px-4 py-3.5 transition-all" style={{ border: passwordFocused ? "1.5px solid #E13642" : "1.5px solid #D1D1D1" }}>
          <Lock size={16} style={{ color: passwordFocused ? "#E13642" : "#A8895E", flexShrink: 0 }} />
          <input type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} onFocus={() => setPasswordFocused(true)} onBlur={() => setPasswordFocused(false)} className="flex-1 bg-transparent outline-none" style={{ fontFamily: FF.sans, fontSize: "0.875rem", color: "#1E1E1E" }} />
          <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ color: showPassword ? "#E13642" : "#A8895E" }}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button>
        </div>
      </div>
      <div className="w-full mb-6">
        <label className="block text-xs mb-1" style={{ color: "#1E1E1E", fontFamily: FF.sans, fontWeight: 600 }}>Confirmar contraseña</label>
        <div className="flex items-center gap-2 rounded-xl px-4 py-3.5 transition-all" style={{ border: !passwordsMatch ? "1.5px solid #F58220" : confirmFocused ? "1.5px solid #E13642" : "1.5px solid #D1D1D1" }}>
          <Lock size={16} style={{ color: !passwordsMatch ? "#F58220" : confirmFocused ? "#E13642" : "#A8895E", flexShrink: 0 }} />
          <input type={showConfirm ? "text" : "password"} placeholder="••••••••" value={confirm} onChange={e => setConfirm(e.target.value)} onFocus={() => setConfirmFocused(true)} onBlur={() => setConfirmFocused(false)} className="flex-1 bg-transparent outline-none" style={{ fontFamily: FF.sans, fontSize: "0.875rem", color: "#1E1E1E" }} />
          <button type="button" onClick={() => setShowConfirm(!showConfirm)} style={{ color: showConfirm ? "#E13642" : "#A8895E" }}>{showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}</button>
        </div>
        {!passwordsMatch && <p className="text-xs mt-1.5" style={{ color: "#F58220", fontFamily: FF.sans }}>Las contraseñas no coinciden</p>}
      </div>
      <button className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white transition-all active:scale-95 mb-5" style={{ background: "#E13642", fontFamily: FF.sans, fontSize: "1rem", boxShadow: "0 6px 20px rgba(225,54,66,0.28)" }}>
        Crear cuenta <ArrowRight size={18} strokeWidth={2.5} />
      </button>
      <div className="flex items-center justify-center gap-1">
        <span className="text-sm" style={{ color: "#A8895E", fontFamily: FF.sans }}>¿Ya tienes cuenta?</span>
        <button onClick={onBack} className="text-sm font-bold" style={{ color: "#E13642", fontFamily: FF.sans }}>Iniciar sesión</button>
      </div>
    </div>
  );
}

function BottomNav({ activeTab, setActiveTab, cartCount }: { activeTab: string; setActiveTab: (t: string) => void; cartCount: number }) {
  const tabs = [
    { id: "inicio",  label: "Inicio",    Icon: Home },
    { id: "carrito", label: "Carrito",   Icon: ShoppingCart },
    { id: "cupones", label: "Cupones",   Icon: Tag },
    { id: "cuenta",  label: "Mi cuenta", Icon: CircleUserRound },
  ];
  return (
    <div className="lg:hidden flex-shrink-0 flex items-center justify-around px-2 pt-3 pb-1 sticky bottom-0" style={{ background: "#FFFFFF", borderTop: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 -4px 20px rgba(0,0,0,0.05)" }}>
      {tabs.map(({ id, label, Icon }) => (
        <button key={id} onClick={() => setActiveTab(id)} className="flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl transition-all relative">
          <div className="relative">
            <Icon size={22} strokeWidth={activeTab === id ? 2.5 : 1.8} style={{ color: activeTab === id ? "#E13642" : "#A8895E" }} />
            {id === "carrito" && cartCount > 0 && (
              <div className="absolute -top-1.5 -right-1.5 flex items-center justify-center rounded-full" style={{ width: "16px", height: "16px", background: "#E13642" }}>
                <span className="text-white" style={{ fontSize: "9px", fontWeight: 700, fontFamily: FF.sans }}>{cartCount}</span>
              </div>
            )}
          </div>
          <span className="text-xs" style={{ fontFamily: FF.sans, fontWeight: activeTab === id ? 700 : 500, color: activeTab === id ? "#E13642" : "#A8895E" }}>{label}</span>
          {activeTab === id && <div className="rounded-full" style={{ width: "4px", height: "4px", background: "#E13642" }} />}
        </button>
      ))}
    </div>
  );
}

function HomeScreen({ activeTab, setActiveTab, onSelectDish, cartCount }: { activeTab: string; setActiveTab: (t: string) => void; onSelectDish: (d: Dish) => void; cartCount: number }) {
  const [activeCat, setActiveCat] = useState("todos");
  const [showFilter, setShowFilter] = useState(false);
  const [filterCat, setFilterCat] = useState("todos");
  const filtered = DISHES.filter(d => { const cat = showFilter ? filterCat : activeCat; return cat === "todos" || d.category === cat; });
  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <div className="flex-1">
        <div className="px-5 md:px-8 pt-4 md:pt-8 pb-3 flex items-center justify-between max-w-7xl mx-auto w-full">
          <div>
            <p className="text-xs md:text-sm" style={{ color: "#A8895E", fontFamily: FF.sans }}>Bienvenido 👋</p>
            <h2 className="text-xl md:text-3xl" style={{ fontFamily: FF.serif, fontWeight: 700, color: "#1E1E1E" }}>¿Qué vas a pedir hoy?</h2>
          </div>
          <ImageWithFallback src={roosterLogo} alt="Rooster" className="object-contain lg:hidden" style={{ width: "44px", height: "44px" }} />
        </div>
        <div className="px-5 md:px-8 mb-4 max-w-7xl mx-auto w-full">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm md:text-base font-bold" style={{ color: "#1E1E1E", fontFamily: FF.sans }}>Categorías</span>
            <button className="text-xs font-bold" style={{ color: "#E13642", fontFamily: FF.sans }}>Ver todas</button>
          </div>
          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => { setActiveCat(cat.id); setFilterCat(cat.id); }} className="flex flex-col items-center gap-1.5 flex-shrink-0 transition-all active:scale-95">
                <div className="rounded-full overflow-hidden transition-all duration-200 w-20 h-20 md:w-24 md:h-24" style={{ border: activeCat === cat.id ? "2.5px solid #E13642" : "2.5px solid transparent", boxShadow: activeCat === cat.id ? "0 0 0 2px rgba(225,54,66,0.15)" : "none" }}>
                  <img src={cat.img} alt={cat.label} className="w-full h-full object-cover" />
                </div>
                <span className="text-xs md:text-sm" style={{ fontFamily: FF.sans, fontWeight: activeCat === cat.id ? 700 : 500, color: activeCat === cat.id ? "#E13642" : "#1E1E1E" }}>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="px-5 md:px-8 mb-3 flex items-center justify-between max-w-7xl mx-auto w-full">
          <span className="text-sm md:text-lg font-bold" style={{ color: "#1E1E1E", fontFamily: FF.sans }}>{activeCat === "todos" ? "Platillos populares" : CATEGORIES.find(c => c.id === activeCat)?.label}</span>
          <button onClick={() => setShowFilter(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all active:scale-95" style={{ background: "#FFF1F2", border: "1px solid rgba(225,54,66,0.15)" }}>
            <SlidersHorizontal size={13} style={{ color: "#E13642" }} />
            <span className="text-xs font-bold" style={{ color: "#E13642", fontFamily: FF.sans }}>Filtrar</span>
          </button>
        </div>
        <div className="px-5 md:px-8 pb-6 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
            {filtered.map(dish => (
              <div key={dish.id} onClick={() => onSelectDish(dish)} className="flex md:flex-col gap-3 md:gap-0 rounded-2xl overflow-hidden transition-all hover:shadow-lg active:scale-95 cursor-pointer" style={{ background: "#FFFFFF", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", border: "1px solid rgba(0,0,0,0.05)" }}>
                <div className="flex-shrink-0 w-[100px] h-[100px] md:w-full md:h-44">
                  <img src={dish.img} alt={dish.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-center md:justify-start py-3 md:p-4 pr-3 md:pr-4 flex-1 gap-0.5">
                  <span className="text-sm md:text-base font-bold leading-tight" style={{ color: "#1E1E1E", fontFamily: FF.sans }}>{dish.name}</span>
                  <span className="text-xs md:text-sm leading-snug line-clamp-2" style={{ color: "#A8895E", fontFamily: FF.sans }}>{dish.desc}</span>
                  <div className="flex items-center mt-1.5">
                    <span className="text-sm md:text-lg font-bold" style={{ color: "#E13642", fontFamily: FF.sans }}>${dish.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} cartCount={cartCount} />
      {showFilter && (
        <div className="fixed inset-0 flex items-start lg:items-center justify-center z-50 px-4 py-6" style={{ background: "rgba(0,0,0,0.4)" }} onClick={() => setShowFilter(false)}>
          <div className="w-full max-w-md rounded-3xl px-6 pt-5 pb-6" style={{ background: "#FFFFFF" }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <span className="text-base font-bold" style={{ color: "#1E1E1E", fontFamily: FF.sans }}>Filtrar por categoría</span>
              <button onClick={() => setShowFilter(false)} style={{ color: "#A8895E" }}><X size={20} /></button>
            </div>
            <div className="flex flex-col gap-2">
              {CATEGORIES.map(cat => (
                <button key={cat.id} onClick={() => { setFilterCat(cat.id); setActiveCat(cat.id); setShowFilter(false); }} className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all" style={{ background: filterCat === cat.id ? "#FFF1F2" : "#F9F9F9", border: filterCat === cat.id ? "1.5px solid #E13642" : "1.5px solid transparent" }}>
                  <div className="rounded-full overflow-hidden flex-shrink-0" style={{ width: "36px", height: "36px" }}><img src={cat.img} alt={cat.label} className="w-full h-full object-cover" /></div>
                  <span className="text-sm" style={{ fontFamily: FF.sans, fontWeight: filterCat === cat.id ? 700 : 500, color: filterCat === cat.id ? "#E13642" : "#1E1E1E" }}>{cat.label}</span>
                  {filterCat === cat.id && <div className="ml-auto w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "#E13642" }}><div className="w-1.5 h-1.5 rounded-full bg-white" /></div>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CartScreen({ cart, onUpdateQty, onGoToMenu }: { cart: CartItem[]; onUpdateQty: (cartId: string, qty: number) => void; onGoToMenu: () => void }) {
  const total = cart.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);
  const [showOrderType, setShowOrderType] = useState(false);
  const [orderType, setOrderType] = useState<"aqui" | "llevar" | null>(null);
  if (cart.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center min-h-[60vh]">
        <ImageWithFallback src={roosterLogo} alt="Rooster" className="object-contain mb-6 opacity-20" style={{ width: "100px", height: "100px" }} />
        <div className="flex items-center justify-center rounded-full mb-5" style={{ width: "72px", height: "72px", background: "#FFF1F2" }}>
          <ShoppingCart size={32} style={{ color: "#E13642" }} strokeWidth={1.5} />
        </div>
        <h2 className="text-xl mb-2" style={{ fontFamily: FF.serif, fontWeight: 700, color: "#1E1E1E" }}>Tu carrito está vacío</h2>
        <p className="text-sm mb-8" style={{ color: "#A8895E", fontFamily: FF.sans, lineHeight: 1.6 }}>¡Comencemos! Agrega tu primer pedido y empieza a disfrutar.</p>
        <button onClick={onGoToMenu} className="flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-white transition-all active:scale-95" style={{ background: "#E13642", fontFamily: FF.sans, fontSize: "0.95rem", boxShadow: "0 6px 20px rgba(225,54,66,0.28)" }}>
          <UtensilsCrossed size={18} strokeWidth={2} />
          Ver menú
        </button>
      </div>
    );
  }
  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1 px-5 md:px-8 pt-4 md:pt-8 pb-4 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl md:text-3xl" style={{ fontFamily: FF.serif, fontWeight: 700, color: "#1E1E1E" }}>Mi pedido</h2>
            <p className="text-xs md:text-sm" style={{ color: "#A8895E", fontFamily: FF.sans }}>{cart.reduce((s, i) => s + i.qty, 0)} ítem(s)</p>
          </div>
          <ImageWithFallback src={roosterLogo} alt="Rooster" className="object-contain lg:hidden" style={{ width: "42px", height: "42px" }} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 flex flex-col gap-3">
            {cart.map(item => (
              <div key={item.cartId} className="flex gap-3 rounded-2xl overflow-hidden" style={{ background: "#FFFFFF", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", border: "1px solid rgba(0,0,0,0.05)" }}>
                <div className="flex-shrink-0 w-[90px] h-[90px] md:w-[120px] md:h-[120px]"><img src={item.dish.img} alt={item.dish.name} className="w-full h-full object-cover" /></div>
                <div className="flex flex-col justify-between py-2.5 pr-3 md:pr-4 md:py-4 flex-1">
                  <div>
                    <p className="text-sm md:text-base font-bold leading-tight" style={{ fontFamily: FF.sans, color: "#1E1E1E" }}>{item.dish.name}</p>
                    <p className="text-xs md:text-sm mt-0.5" style={{ color: "#A8895E", fontFamily: FF.sans }}>{item.size} · {item.variant}{item.extras.length > 0 && ` · ${item.extras.join(", ")}`}</p>
                    {item.notes ? <p className="text-xs italic mt-0.5" style={{ color: "#A8895E", fontFamily: FF.sans }}>"{item.notes}"</p> : null}
                  </div>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-sm md:text-base font-bold" style={{ fontFamily: FF.sans, color: "#1E1E1E" }}>${item.unitPrice * item.qty}</span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => onUpdateQty(item.cartId, item.qty - 1)} className="flex items-center justify-center rounded-lg transition-all active:scale-90" style={{ width: "28px", height: "28px", background: item.qty === 1 ? "#F3F3F3" : "#FFF1F2", border: item.qty === 1 ? "1.5px solid #E5E5E5" : "1.5px solid #E13642" }}>
                        <Minus size={12} style={{ color: item.qty === 1 ? "#A8895E" : "#E13642" }} />
                      </button>
                      <span className="text-sm font-bold w-4 text-center" style={{ fontFamily: FF.sans, color: "#1E1E1E" }}>{item.qty}</span>
                      <button onClick={() => onUpdateQty(item.cartId, item.qty + 1)} className="flex items-center justify-center rounded-lg transition-all active:scale-90" style={{ width: "28px", height: "28px", background: "#E13642" }}>
                        <Plus size={12} style={{ color: "#FFFFFF" }} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button onClick={onGoToMenu} className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold transition-all active:scale-95" style={{ background: "transparent", border: "1.5px solid #E13642", color: "#E13642", fontFamily: FF.sans, fontSize: "0.95rem" }}>
              <Plus size={16} strokeWidth={2.5} />
              Seguir pidiendo
            </button>
          </div>
          <div className="lg:sticky lg:top-6 lg:self-start flex flex-col gap-3">
            <div className="rounded-2xl p-4 md:p-5" style={{ background: "#FAFAFA", border: "1px solid #EBEBEB" }}>
              <p className="text-sm md:text-base font-bold mb-3" style={{ fontFamily: FF.sans, color: "#1E1E1E" }}>Resumen</p>
              {cart.map(item => (
                <div key={item.cartId} className="flex justify-between mb-1.5">
                  <span className="text-xs md:text-sm" style={{ color: "#A8895E", fontFamily: FF.sans }}>{item.dish.name} x{item.qty}</span>
                  <span className="text-xs md:text-sm font-semibold" style={{ color: "#1E1E1E", fontFamily: FF.sans }}>${item.unitPrice * item.qty}</span>
                </div>
              ))}
              <div className="h-px my-2" style={{ background: "#EBEBEB" }} />
              <div className="flex justify-between">
                <span className="text-sm md:text-base font-bold" style={{ fontFamily: FF.sans, color: "#1E1E1E" }}>Total</span>
                <span className="text-sm md:text-base font-bold" style={{ fontFamily: FF.sans, color: "#E13642" }}>${total}</span>
              </div>
            </div>
            <button onClick={() => setShowOrderType(true)} className="hidden lg:flex w-full items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white transition-all active:scale-95" style={{ background: "#E13642", fontFamily: FF.sans, fontSize: "1rem", boxShadow: "0 6px 20px rgba(225,54,66,0.28)" }}>
              Realizar pedido · ${total}
            </button>
          </div>
        </div>
      </div>
      <div className="lg:hidden flex-shrink-0 px-5 py-4 sticky bottom-0" style={{ background: "#FFFFFF", borderTop: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 -4px 20px rgba(0,0,0,0.06)" }}>
        <button onClick={() => setShowOrderType(true)} className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white transition-all active:scale-95" style={{ background: "#E13642", fontFamily: FF.sans, fontSize: "1rem", boxShadow: "0 6px 20px rgba(225,54,66,0.28)" }}>
          Realizar pedido · ${total}
        </button>
      </div>
      {showOrderType && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-6" style={{ background: "rgba(0,0,0,0.5)" }} onClick={() => setShowOrderType(false)}>
          <div className="w-full max-w-md rounded-3xl px-5 pt-7 pb-7" style={{ background: "#FFFFFF" }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-lg" style={{ fontFamily: FF.serif, fontWeight: 700, color: "#1E1E1E" }}>¿Cómo lo disfrutas?</h3>
              <button onClick={() => setShowOrderType(false)} style={{ color: "#A8895E" }}><X size={20} /></button>
            </div>
            <p className="text-xs mb-6" style={{ color: "#A8895E", fontFamily: FF.sans }}>Selecciona una opción para continuar</p>
            <div className="flex gap-3 mb-6">
              {[{ id: "aqui", label: "Comer aquí", Icon: Utensils }, { id: "llevar", label: "Para llevar", Icon: ShoppingCart }].map(({ id, label, Icon }) => (
                <button key={id} onClick={() => setOrderType(id as "aqui" | "llevar")} className="flex-1 flex flex-col items-center justify-center py-6 rounded-2xl gap-3 transition-all active:scale-95" style={{ border: orderType === id ? "2px solid #E13642" : "2px solid #EBEBEB", background: orderType === id ? "#FFF1F2" : "#FAFAFA" }}>
                  <Icon size={28} strokeWidth={1.6} style={{ color: orderType === id ? "#E13642" : "#A8895E" }} />
                  <span className="text-sm font-bold" style={{ fontFamily: FF.sans, color: orderType === id ? "#E13642" : "#1E1E1E" }}>{label}</span>
                </button>
              ))}
            </div>
            <button disabled={!orderType} className="w-full py-4 rounded-2xl font-bold text-white transition-all active:scale-95" style={{ background: orderType ? "#E13642" : "#E5E5E5", fontFamily: FF.sans, fontSize: "1rem", boxShadow: orderType ? "0 6px 20px rgba(225,54,66,0.28)" : "none" }}>
              Confirmar pedido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Illustrations
function IlluPizza() { return (<svg width="72" height="72" viewBox="0 0 72 72" fill="none"><circle cx="36" cy="36" r="26" fill="#FFF1F2"/><path d="M36 14 L58 52 L14 52 Z" fill="#F2B134"/><path d="M36 14 L58 52 L14 52 Z" fill="none" stroke="#E13642" strokeWidth="2" strokeLinejoin="round"/><path d="M14 52 Q36 60 58 52" stroke="#A8895E" strokeWidth="3" strokeLinecap="round" fill="none"/><circle cx="36" cy="36" r="3.5" fill="#E13642"/><circle cx="28" cy="42" r="2.5" fill="#E13642"/><circle cx="44" cy="42" r="2.5" fill="#E13642"/></svg>); }
function IlluGrill() { return (<svg width="72" height="72" viewBox="0 0 72 72" fill="none"><circle cx="36" cy="36" r="26" fill="#FFF5EE"/><path d="M22 34 Q36 26 50 34 L50 42 Q36 48 22 42 Z" fill="#F58220"/><path d="M22 34 Q36 26 50 34" stroke="#E13642" strokeWidth="1.5" fill="none"/><rect x="48" y="28" width="6" height="16" rx="3" fill="#F2EBE3"/><circle cx="51" cy="26" r="3" fill="#F2EBE3"/><circle cx="51" cy="46" r="3" fill="#F2EBE3"/></svg>); }
function IlluPasta() { return (<svg width="72" height="72" viewBox="0 0 72 72" fill="none"><circle cx="36" cy="36" r="26" fill="#FFFBF0"/><path d="M18 36 Q20 56 36 56 Q52 56 54 36" stroke="#A8895E" strokeWidth="2" fill="none" strokeLinecap="round"/><line x1="18" y1="36" x2="54" y2="36" stroke="#A8895E" strokeWidth="2" strokeLinecap="round"/><path d="M24 36 Q26 28 30 32 Q34 36 36 28 Q38 20 42 28 Q44 32 48 36" stroke="#F2B134" strokeWidth="2.5" fill="none" strokeLinecap="round"/><circle cx="30" cy="33" r="3" fill="#E13642" opacity="0.85"/><circle cx="40" cy="30" r="2.5" fill="#E13642" opacity="0.85"/></svg>); }
function IlluCombo() { return (<svg width="72" height="72" viewBox="0 0 72 72" fill="none"><circle cx="36" cy="36" r="26" fill="#F0FFF8"/><path d="M42 26 L44 50 L54 50 L56 26 Z" fill="#F2B134"/><rect x="50" y="14" width="2.5" height="18" rx="1.2" fill="#E13642"/><path d="M20 48 L32 24 L44 48 Z" fill="#F2B134"/><path d="M20 48 L32 24 L44 48 Z" fill="none" stroke="#E13642" strokeWidth="1.5" strokeLinejoin="round"/><circle cx="32" cy="38" r="2.5" fill="#E13642"/></svg>); }
function IlluDescuento() { return (<svg width="72" height="72" viewBox="0 0 72 72" fill="none"><circle cx="36" cy="36" r="26" fill="#FFF1F2"/><path d="M20 20 L46 20 L54 36 L46 52 L20 52 Z" stroke="#E13642" strokeWidth="2" strokeLinejoin="round" fill="none"/><circle cx="26" cy="36" r="3" fill="none" stroke="#E13642" strokeWidth="2"/><circle cx="30" cy="30" r="3" fill="#E13642"/><circle cx="42" cy="42" r="3" fill="#E13642"/><line x1="44" y1="28" x2="30" y2="44" stroke="#E13642" strokeWidth="2" strokeLinecap="round"/></svg>); }
function IlluPizzaCupon() { return (<svg width="72" height="72" viewBox="0 0 72 72" fill="none"><circle cx="36" cy="36" r="26" fill="#FFF5EE"/><circle cx="28" cy="38" r="13" fill="#F2B134" opacity="0.3"/><circle cx="44" cy="38" r="13" fill="#F2B134" opacity="0.3"/><circle cx="25" cy="36" r="2" fill="#E13642"/><circle cx="30" cy="41" r="2" fill="#E13642"/><circle cx="41" cy="36" r="2" fill="#E13642"/><circle cx="46" cy="41" r="2" fill="#E13642"/><rect x="28" y="18" width="20" height="12" rx="6" fill="#E13642"/><text x="38" y="27.5" textAnchor="middle" fill="white" fontSize="8" fontWeight="800" fontFamily="sans-serif">2x1</text></svg>); }
function IlluGift() { return (<svg width="72" height="72" viewBox="0 0 72 72" fill="none"><circle cx="36" cy="36" r="26" fill="#F0F8FF"/><rect x="20" y="36" width="32" height="22" rx="3" stroke="#F2B134" strokeWidth="2" fill="none"/><rect x="18" y="30" width="36" height="8" rx="3" stroke="#F2B134" strokeWidth="2" fill="none"/><rect x="33" y="30" width="6" height="28" rx="3" fill="#E13642" opacity="0.85"/><rect x="18" y="32" width="36" height="5" rx="2.5" fill="#E13642" opacity="0.85"/><path d="M36 30 Q28 22 24 26 Q22 30 36 30" fill="#E13642"/><path d="M36 30 Q44 22 48 26 Q50 30 36 30" fill="#E13642"/><circle cx="36" cy="30" r="3" fill="#F2B134"/></svg>); }

const OFERTAS_USER = [
  { label: "COMBO PIZZA PERSONAL + BEBIDA", badge: "PRECIO ESPECIAL", price: "$155", color: "#E13642", Illus: IlluCombo },
  { label: "COMBO COSTILLAS + PAPAS",       badge: "PRECIO ESPECIAL", price: "$290", color: "#F58220", Illus: IlluGrill },
  { label: "2x1 PIZZAS MEDIANAS",           badge: "SOLO LOS MARTES", price: "$280", color: "#A8895E", Illus: IlluPizzaCupon },
  { label: "PASTA + POSTRE",                badge: "PRECIO ESPECIAL", price: "$210", color: "#F2B134", Illus: IlluPasta },
];
const CUPONES_USER = [
  { code: "ROOSTER10", desc: "10% de descuento en tu próximo pedido", expira: "Vence: 30 jun 2026", Illus: IlluDescuento, color: "#E13642" },
  { code: "PIZZA2X1",  desc: "2x1 en pizzas medianas los martes",      expira: "Vence: 31 jul 2026", Illus: IlluPizzaCupon, color: "#F58220" },
  { code: "BIENVENIDO",desc: "₡500 de descuento en tu primer pedido",  expira: "Vence: 15 jul 2026", Illus: IlluGift, color: "#F2B134" },
];

function CuponesScreen() {
  const [tab, setTab] = useState<"ofertas" | "cupones">("ofertas");
  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <div className="flex-shrink-0 flex items-center justify-between px-5 md:px-8 py-4 lg:hidden" style={{ background: "#E13642" }}>
        <Flame size={22} color="#FFFFFF" strokeWidth={1.8} />
        <span style={{ fontFamily: FF.serif, fontWeight: 700, fontSize: "1.1rem", color: "#FFFFFF" }}>Rooster</span>
        <ShoppingCart size={22} color="#FFFFFF" strokeWidth={1.8} />
      </div>
      <div className="hidden lg:block px-8 pt-8 pb-2 max-w-7xl mx-auto w-full">
        <h2 className="text-3xl mb-1" style={{ fontFamily: FF.serif, fontWeight: 700, color: "#1E1E1E" }}>Ofertas y cupones</h2>
        <p className="text-sm" style={{ color: "#A8895E", fontFamily: FF.sans }}>Aprovecha estas promociones exclusivas</p>
      </div>
      <div className="flex-shrink-0 flex max-w-7xl mx-auto w-full px-5 md:px-8" style={{ background: "transparent", borderBottom: "1px solid #EBEBEB" }}>
        {(["ofertas","cupones"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className="flex-1 lg:flex-none lg:px-8 py-3.5 text-sm font-bold capitalize transition-all" style={{ fontFamily: FF.sans, color: tab === t ? "#E13642" : "#A8895E", borderBottom: tab === t ? "2.5px solid #E13642" : "2.5px solid transparent" }}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
      <div className="flex-1 px-5 md:px-8 py-4 md:py-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
          {tab === "ofertas" && OFERTAS_USER.map((o, i) => (
            <div key={i} className="flex rounded-2xl overflow-hidden" style={{ background: "#FFFFFF", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
              <div className="flex-shrink-0 flex items-center justify-center" style={{ width: "96px", minHeight: "100px", background: o.color }}><o.Illus /></div>
              <div className="flex flex-col justify-center px-4 py-4 flex-1">
                <p className="text-xs font-black uppercase tracking-wide leading-tight mb-1.5" style={{ fontFamily: FF.sans, color: "#E13642" }}>{o.label}</p>
                <p className="text-xs font-bold uppercase mb-1" style={{ fontFamily: FF.sans, color: "#F58220" }}>{o.badge}</p>
                <p className="text-xl font-black" style={{ fontFamily: FF.sans, color: "#1E1E1E" }}>{o.price}</p>
              </div>
            </div>
          ))}
          {tab === "cupones" && CUPONES_USER.map((c, i) => (
            <div key={i} className="rounded-2xl overflow-hidden" style={{ background: "#FFFFFF", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", border: "1.5px dashed rgba(225,54,66,0.3)" }}>
              <div className="flex">
                <div className="flex-shrink-0 flex items-center justify-center" style={{ width: "90px", background: c.color + "18" }}><c.Illus /></div>
                <div className="flex flex-col justify-center" style={{ width: "1px" }}>
                  {Array.from({ length: 6 }).map((_, j) => <div key={j} style={{ width: "1px", height: "6px", background: j % 2 === 0 ? "#E13642" : "transparent", marginBottom: "3px" }} />)}
                </div>
                <div className="flex-1 px-3 py-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black tracking-widest" style={{ fontFamily: FF.sans, color: c.color }}>{c.code}</span>
                    <button className="px-2.5 py-1 rounded-lg text-xs font-bold transition-all active:scale-95" style={{ background: c.color, color: "#FFFFFF", fontFamily: FF.sans }}>Usar</button>
                  </div>
                  <p className="text-xs leading-snug mb-1.5" style={{ fontFamily: FF.sans, color: "#1E1E1E", fontWeight: 600 }}>{c.desc}</p>
                  <p className="text-xs" style={{ fontFamily: FF.sans, color: "#A8895E" }}>{c.expira}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AccountRow({ icon: Icon, label, danger = false }: { icon: React.ElementType; label: string; danger?: boolean }) {
  return (
    <button className="flex items-center justify-between w-full px-4 py-3.5 transition-all active:bg-gray-50" style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center rounded-xl" style={{ width: "34px", height: "34px", background: danger ? "#FFF1F2" : "#F5F5F5" }}>
          <Icon size={16} style={{ color: danger ? "#E13642" : "#A8895E" }} strokeWidth={1.8} />
        </div>
        <span className="text-sm" style={{ fontFamily: FF.sans, fontWeight: 600, color: danger ? "#E13642" : "#1E1E1E" }}>{label}</span>
      </div>
      {!danger && <svg width="7" height="12" viewBox="0 0 7 12" fill="none"><path d="M1 1L6 6L1 11" stroke="#A8895E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
    </button>
  );
}

function AccountSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <p className="text-xs font-bold uppercase tracking-widest mb-2 px-1" style={{ color: "#A8895E", fontFamily: FF.sans }}>{title}</p>
      <div className="rounded-2xl overflow-hidden" style={{ background: "#FFFFFF", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.05)" }}>
        {children}
      </div>
    </div>
  );
}

function AccountScreen() {
  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <div className="flex-1 px-5 md:px-8 pt-5 md:pt-8 pb-6 max-w-3xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-3xl" style={{ fontFamily: FF.serif, fontWeight: 700, color: "#1E1E1E" }}>Mi cuenta</h2>
          <ImageWithFallback src={roosterLogo} alt="Rooster" className="object-contain lg:hidden" style={{ width: "42px", height: "42px" }} />
        </div>
        <div className="flex items-center gap-4 rounded-2xl p-4 mb-6" style={{ background: "#FFFFFF", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.05)" }}>
          <div className="flex items-center justify-center rounded-2xl flex-shrink-0" style={{ width: "56px", height: "56px", background: "#FFF1F2" }}>
            <CircleUserRound size={28} style={{ color: "#E13642" }} strokeWidth={1.5} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-base font-bold truncate" style={{ fontFamily: FF.sans, color: "#1E1E1E" }}>Nombre de usuario</p>
            <p className="text-xs truncate" style={{ fontFamily: FF.sans, color: "#A8895E" }}>usuario@correo.com</p>
          </div>
          <button className="flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95" style={{ background: "#FFF1F2", color: "#E13642", fontFamily: FF.sans, border: "1px solid rgba(225,54,66,0.15)" }}>Editar</button>
        </div>
        <AccountSection title="Tu cuenta">
          <AccountRow icon={ShoppingCart} label="Mis pedidos" />
          <AccountRow icon={CreditCard} label="Métodos de pago" />
          <AccountRow icon={HelpCircle} label="Preguntas frecuentes" />
        </AccountSection>
        <AccountSection title="Rooster">
          <AccountRow icon={UtensilsCrossed} label="Productos" />
          <AccountRow icon={UsersRound} label="Quiénes somos" />
          <AccountRow icon={FileText} label="Términos y condiciones" />
          <AccountRow icon={ShieldCheck} label="Privacidad y protección de datos" />
          <AccountRow icon={Smartphone} label="Sobre la app" />
        </AccountSection>
        <div className="rounded-2xl overflow-hidden" style={{ background: "#FFFFFF", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.05)" }}>
          <AccountRow icon={LogOut} label="Cerrar sesión" danger />
        </div>
        <p className="text-center text-xs mt-6" style={{ color: "#A8895E", fontFamily: FF.sans }}>Rooster App · versión 1.0.0</p>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState<"login" | "register" | "home" | "admin">("login");
  const [activeTab, setActiveTab] = useState("inicio");
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => setCart(prev => [...prev, item]);
  const updateQty = (cartId: string, qty: number) => {
    if (qty <= 0) setCart(prev => prev.filter(i => i.cartId !== cartId));
    else setCart(prev => prev.map(i => i.cartId === cartId ? { ...i, qty } : i));
  };
  const goToMenu = () => setActiveTab("inicio");

  if (screen === "admin") {
    return <AdminPanel onLogout={() => { setScreen("login"); }} />;
  }

  if (screen === "login") {
    return (
      <Shell centered>
        <LoginScreen
          onCreateAccount={() => setScreen("register")}
          onHome={() => setScreen("home")}
          onAdmin={() => setScreen("admin")}
        />
      </Shell>
    );
  }

  if (screen === "register") {
    return (
      <Shell centered>
        <RegisterScreen onBack={() => setScreen("login")} />
      </Shell>
    );
  }

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="min-h-screen w-full flex" style={{ background: C.bg }}>
      <SideNav activeTab={activeTab} setActiveTab={setActiveTab} cartCount={cartCount} />
      <div className="flex flex-col flex-1 min-w-0 min-h-screen">
        {selectedDish ? (
          <DishDetailScreen
            dish={selectedDish}
            onBack={() => setSelectedDish(null)}
            onAddToCart={item => { addToCart(item); setSelectedDish(null); }}
          />
        ) : (
          <>
            {activeTab === "inicio" && <HomeScreen activeTab={activeTab} setActiveTab={setActiveTab} onSelectDish={setSelectedDish} cartCount={cartCount} />}
            {activeTab === "carrito" && <CartScreen cart={cart} onUpdateQty={updateQty} onGoToMenu={goToMenu} />}
            {activeTab === "cuenta" && <AccountScreen />}
            {activeTab === "cupones" && <CuponesScreen />}
            {activeTab !== "inicio" && <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} cartCount={cartCount} />}
          </>
        )}
      </div>
    </div>
  );
}

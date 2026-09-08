import { Route, Routes } from "react-router-dom";
import PublicLayout from "./components/PublicLayout";
import RequireAuth from "./components/RequireAuth";
import AdminLayout from "./components/admin/AdminLayout";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Registro from "./pages/Registro/Registro";
import Productos from "./pages/Productos/Productos";
import ProductoDetalle from "./pages/Productos/ProductoDetalle";
import Carrito from "./pages/Carrito/Carrito";
import Checkout from "./pages/Checkout/Checkout";
import Pedidos from "./pages/Pedidos/Pedidos";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin/Admin";
import AdminProductos from "./pages/Admin/Productos/AdminProductos";
import NuevoProducto from "./pages/Admin/Productos/Nuevo/NuevoProducto";
import EditarProducto from "./pages/Admin/Productos/Editar/EditarProducto";
import AdminPedidos from "./pages/Admin/Pedidos/AdminPedidos";
import AdminUsuarios from "./pages/Admin/Usuarios/AdminUsuarios";

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/productos/:id" element={<ProductoDetalle />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route
          path="/checkout"
          element={
            <RequireAuth>
              <Checkout />
            </RequireAuth>
          }
        />
        <Route
          path="/pedidos"
          element={
            <RequireAuth>
              <Pedidos />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route
        path="/admin"
        element={
          <RequireAuth adminOnly>
            <AdminLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Admin />} />
        <Route path="productos" element={<AdminProductos />} />
        <Route path="productos/nuevo" element={<NuevoProducto />} />
        <Route path="productos/editar/:id" element={<EditarProducto />} />
        <Route path="pedidos" element={<AdminPedidos />} />
        <Route path="usuarios" element={<AdminUsuarios />} />
      </Route>
    </Routes>
  );
}

export default App;

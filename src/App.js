import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './pages/home/components/Homepage';
import Dashboard from './pages/dashboard/components/Dashboard';
import Analytics from './pages/analytics/components/Analytics';
import Materials from './pages/materials/components/Materials';
import UploadMaterial from './pages/upload materials/components/UploadMaterial';
import CustomText from './pages/custom text/components/CustomText';
import UserEdit from './pages/edit/components/UserEdit';
import BookDetails from './pages/book details/components/BookDetails'

import AdminDashboard from './pages/admin/dashboard/components/AdminDashboard';
import Account from './pages/admin/account/Account';
import CreateAccount from './pages/admin/create/components/CreateAccount';
import UpdateAccount from './pages/admin/update/UpdateAccount';
import AuditTrail from './pages/admin/audit trail/AuditTrail';

import MaterialsCharacter from './pages/materials character/MaterialsCharacter';
import Home from './pages/trylang/home'

function App() {
  return (
    <>
      
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Homepage />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/analytics' element={<Analytics />}></Route>
          <Route path='/materials' element={<Materials />}></Route>
          <Route path='/upload' element={<UploadMaterial />}></Route>
          <Route path='/custom' element={<CustomText />}></Route>
          <Route path='/profile/edit' element={<UserEdit />}></Route>
          <Route path='/bd' element={<BookDetails />}></Route>
          <Route path='/char' element={<MaterialsCharacter />}></Route>

          <Route path='/admin/dashboard' element={<AdminDashboard/>}></Route>
          <Route path='/admin/account' element={<Account/>}></Route>
          <Route path='/admin/create' element={<CreateAccount/>}></Route>
          <Route path='/admin/update' element={<UpdateAccount/>}></Route>
          <Route path='/admin/audittrail' element={<AuditTrail/>}></Route>

          <Route path='/try' element={<Home/>}></Route>
        </Routes>
      </BrowserRouter>

      
    </>

  );
}

export default App;

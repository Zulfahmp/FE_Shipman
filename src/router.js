import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/pages/Login.vue'
import Dashboard from '@/pages/Dashboard.vue'
import ManagementUser from '@/pages/management_user/ManagementUser.vue'
import MasterData from '@/pages/master_data/MasterData.vue'
import MasterDataDetail from '@/pages/master_data/MasterDataDetail.vue'
import NegativeFeedback from '@/pages/negatif_feedback/NegativeFeedback.vue'
import NegativeFeedbackInput from '@/pages/negatif_feedback/NegativeFeedbackInput.vue'
import NegativeFeedbackApproval from '@/pages/negatif_feedback/NegativeFeedbackApproval.vue'
import SSCL from './pages/sscl/SSCL.vue'
import TermsAndCond from './pages/sscl/TermsAndCond.vue'
import ChecklistSSCL from './pages/sscl/ChecklistSSCL.vue'
import { AuthConfig } from './authconfig'
import AddNextPort from './pages/negatif_feedback/AddNextPort.vue'

const routes = [
  {path: '/', name: '', component: Login, meta: { title: 'Login',auth:false,allowed:'0'}},
  {path: '/login', name: 'Login', component: Login, meta: { title: 'Login',auth:false,allowed:'0' }},
  {path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { title: 'Dashboard',auth:true,allowed:'1,2,3'}},

  {path: '/sscl', name: 'SSCL', component: SSCL, meta: { title: 'SSCL' ,auth:true,allowed:'1,2,3'}},
  {path: '/checklist-sscl', name: 'Checklist SSCL', component: ChecklistSSCL, meta: { title: 'Checklist SSCL' ,auth:true,allowed:'1,2,3'}},
  {path: '/sscl-terms-and-conditions', name: 'SSCL Terms and Conditions', component: TermsAndCond, meta: { title: 'SSCL Terms And Condition' ,auth:true,allowed:'1,2,3'}},
  
  {path: '/management-user', name: 'Management User', component: ManagementUser, meta: { title: 'Management User' ,auth:true,allowed:'1'}},

  {path: '/master-data', name: 'Master Data', component: MasterData, meta: { title: 'Master Data' ,auth:true,allowed:'1'}},
  {path: '/master-data-detail/:master', name: 'Master Data Detail', component: MasterDataDetail, meta: { title: 'Master Data Detail' ,auth:true,allowed:'1'}},

  {path: '/negative-feedback', name: 'Negative Feedback', component: NegativeFeedback, meta: { title: 'Negative Feedback' ,auth:true,allowed:'1,2,3'}},
  {path: '/negative-feedback-input', name: 'Negative Feedback Input', component: NegativeFeedbackInput, meta: { title: 'Negative Feedback' ,auth:true,allowed:'1,2,3'}},
  {path: '/negative-feedback-next-port', name: 'Negative Feedback Next Port', component: AddNextPort, meta: { title: 'Negative Feedback' ,auth:true,allowed:'1,2,3'}},
  {path: '/negative-feedback-action', name: 'Negative Feedback Action', component: NegativeFeedbackApproval, meta: { title: 'Negative Feedback Approval',auth:true,allowed:'1,2,3'}}
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

function Page(page,route) {
    route.push('/'+page) // atau router.push({ name: 'Tentang' })
}

router.beforeEach((to, from, next) => {
  const Auth = AuthConfig()
  const token = localStorage.getItem('auth_token');
  
  if(token){
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (Date.now() < payload.exp * 1000) {
      Auth.setAuth(payload)
      payload.authenticated = true
      if((to.path!='/login' || to.path!='') && to.meta.allowed.includes(Auth.role)){
        return next()
      }else{
        return next('/dashboard')
      }
    }else{
      Auth.setAuth({is_authenticated:false,role:0,full_name:'',position:''})
      localStorage.removeItem('auth_token');
      return next('/login')
    }
  
  }else if(!Auth.is_authenticated && to.path !== '/login') {
    next('/login'); 
  }else{
    next()
  }



  // if (to.meta.auth) {
  //   if (!token) {
  //     return next('/login');
  //   }
  // }
  // if(Auth.is_authenticated && !to.meta.allowed.includes(Auth.role)){
  //   next(false)
  //   return
  // }
  // try {
  //   if (to.meta.auth && !Auth.is_authenticated) {
  //     next('login')
  //   } else if (Auth.is_authenticated) {
  //     const defaultTitle = 'Shipman'
  //     console.log(Auth.is_authenticated)
  //     document.title = to.meta.title || defaultTitle
  //     next()
  //   }else {
  //     const defaultTitle = 'Shipman'
  //     document.title = to.meta.title || defaultTitle
  //     next()
  //   }
  // } catch (error) {
    
  // } 
})

export default router
export {Page}
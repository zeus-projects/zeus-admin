import { ref, reactive } from 'vue'
import { useUserInfoStore } from '@/store/userInfo'
import { useMessageBox, useNotification } from "@/hooks/message";
import { updatePassword, logout } from "@/api/admin";
import { useRouter } from "vue-router";

export const store = useUserInfoStore()
export const notify = useNotification()
export function useUpdatepassword() {
   const router = useRouter()
   const drawerRef = ref()
   const formRef = ref()
   const form = reactive({
      oldPassword: '',
      password: '',
      repassword: '',
   })
   const rules = {
      oldPassword: [
         {
            required: true,
            message: '旧密码不能为空',
            trigger: 'blur'
         }
      ],
      password: [
         {
            required: true,
            message: '新密码不能为空',
            trigger: 'blur'
         }
      ],
      repassword: [
         {
            required: true,
            message: '确认密码不能为空',
            trigger: 'blur'
         }
      ],
   }
   const openDrawer = () => drawerRef.value.open()
   const closeDrawer = () => drawerRef.value.close()
   const showLoading = () => drawerRef.value.showLoading()
   const hideLoading = () => drawerRef.value.hideLoading()
   const onSubmit = () => {
      formRef.value.validate((valid) => {
         if (!valid) {
            return false
         }
         showLoading()
         updatePassword(form).then(() => {
            notify.success("密码修改成功，请重新登录")
            store.logout()
            router.push("/login")
         }).finally(() => {
            hideLoading()
            closeDrawer()
         })
      })
   }
   return {
      drawerRef,
      formRef,
      form,
      rules,
      openDrawer,
      closeDrawer,
      onSubmit
   }
}

export function useLogout() {
   const router = useRouter()
   const handleLogout = () => {
      useMessageBox().confirm("确认退出登录？").then(() => {
         logout().then(() => {
            store.logout()
            router.push("/login")
            notify.success("退出登录成功")
         })
      })
   }
   return {
      handleLogout
   }
}
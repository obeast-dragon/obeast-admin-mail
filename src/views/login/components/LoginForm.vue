<template>
	<el-form ref="loginFormRef" class="form-parent" :rules="loginRules" :model="loginForm">
		<el-form-item prop="username">
			<el-input class="login-input" v-model="loginForm.username" placeholder="用户名或者邮箱" />
		</el-form-item>
		<el-form-item prop="password">
			<el-input show-password type="password" class="login-input" v-model="loginForm.password" placeholder="密码" />
		</el-form-item>
		<el-form-item prop="code">
			<div class="login-code">
				<el-input type="code" class="login-input" v-model="loginForm.code" placeholder="验证码" />
				<img class="code-img" :src="validateCode.img" @click="refreshCode()" alt="code" />
			</div>
		</el-form-item>
	</el-form>
	<div class="login-btn">
		<el-button :icon="CircleClose" round @click="resetForm(loginFormRef)" size="large">重置</el-button>
		<el-button :icon="UserFilled" round @click="login(loginFormRef)" size="large" type="primary" :loading="loading">
			登录
		</el-button>
	</div>
	<div class="login-text">
		<span class="login-text-span">忘记密码</span>
		<span class="login-text-span">立刻注册 </span>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { ElNotification } from "element-plus";
import { loginByPassword } from "@/api/modules/login";
import { GlobalStore } from "@/stores";
import { TabsStore } from "@/stores/modules/tabs";
import { KeepAliveStore } from "@/stores/modules/keepAlive";
import { getTimeState, randomLenNum } from "@/utils/util";
import { HOME_URL, AES_KEY } from "@/config/constant";
import { initDynamicRouter } from "@/routers/modules/dynamicRouter";
import { CircleClose, UserFilled } from "@element-plus/icons-vue";
import type { ElForm } from "element-plus";
import { VerificationCode } from "@/api/interface/common";
import { Login } from "@/api/interface/user";
import { aes } from "@/utils/oauth";

const router = useRouter();
const tabsStore = TabsStore();
const keepAlive = KeepAliveStore();
const globalStore = GlobalStore();

// 定义 formRef（校验规则）
type FormInstance = InstanceType<typeof ElForm>;
const loginFormRef = ref<FormInstance>();
let codeTime: number | NodeJS.Timer;
const loginRules = reactive({
	username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
	password: [{ required: true, message: "请输入密码", trigger: "blur" }],
	code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
});

const validateCode = ref<VerificationCode>({
	key: "",
	img: "",
	len: 4
});
const loading = ref<boolean>(false);
const loginForm = reactive<Login.From>({ username: "admin", password: "1234qwer", code: "" });

// resetForm
const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.resetFields();
};

/**
 * 登录
 */
const login = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate(async valid => {
		if (!valid) return;
		loading.value = true;
		try {
			if (!validateCode.value.key) {
				throw new Error("系统异常请联系管理员");
			}
			// 1.执行登录接口
			const data = await loginByPassword({ ...loginForm, password: aes(loginForm.password, AES_KEY) }, validateCode.value.key);
			globalStore.setToken(data.access_token);
			globalStore.setUserInfo(data.user_info);

			// 2.添加动态路由
			await initDynamicRouter();

			// 3.清空 tabs、keepAlive 保留的数据
			tabsStore.closeMultipleTab();
			keepAlive.setKeepAliveName();

			// 4.跳转到首页
			router.push(HOME_URL);
			ElNotification({
				title: getTimeState(),
				message: "欢迎登录 OBeast-Admin",
				type: "success",
				duration: 3000
			});
			window.clearInterval(codeTime);
		}catch(error: any) {
			refreshCode();
		} finally {
			loading.value = false;
		}
	});
};

/**
 * 刷新验证码
 */
const refreshCode = () => {
	window.clearInterval(codeTime);
	validateCode.value.key = randomLenNum(validateCode.value.len, true);
	validateCode.value.img = `${import.meta.env.VITE_HOST}/code?randomStr=${validateCode.value.key}`;
	codeTime = setInterval(() => {
		validateCode.value.key = randomLenNum(validateCode.value.len, true);
		validateCode.value.img = `${import.meta.env.VITE_HOST}/code?randomStr=${validateCode.value.key}`;
	}, 60000);
};

onBeforeMount(() => {
	refreshCode();
});

onMounted(() => {
	// 监听enter事件（调用登录）
	document.onkeydown = (e: any) => {
		e = window.event || e;
		if (e.code === "Enter" || e.code === "enter" || e.code === "NumpadEnter") {
			if (loading.value) return;
			login(loginFormRef.value);
		}
	};
});
</script>

<style lang="scss" scoped>
@import "../index.scss";
</style>

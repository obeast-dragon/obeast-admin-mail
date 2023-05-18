<template>
	<div class="login-container flx-center">
		<div class="login-box">
			<div class="login-form-box">
				<div class="login-form">
					<div class="login-logo">
						<img class="login-img" src="@/assets/images/logo.png" alt="login" />
						<h2 class="login-title">OBeast-admin</h2>
					</div>
					<LoginForm />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import LoginForm from "./components/LoginForm.vue";
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>

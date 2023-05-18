<template>
	<el-dialog v-model="dialogVisible" :destroy-on-close="true" size="450px" :title="`${dialogProps.title}文件`">
		<div style="display: flex; justify-content: center">
			<UploadImg
				:image-url="dialogProps.imageUrl"
				:success-handler="successHandler"
				width="100%"
				height="300px"
				disabled
			>
				<template #empty>
					<el-icon><Picture /></el-icon>
					<span>将文件拖到此处，或<span style="color: blue">点击上传</span></span>
				</template>
				<template #tip> 请上传 大小不超过 3MB格式为 png、jpg、jpeg、doc、xls、ppt、txt、pdf、docx、xlsx、pptx 的文件 </template>
			</UploadImg>
		</div>
		<template #footer>
			<el-button @click="dialogVisible = false">取消</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts" name="FileDrawer">
import {  ref } from "vue";
import { SysFile } from "@/api/interface/file";
import UploadImg from "@/components/Upload/Img.vue";

interface DialogProps {
	title: string;
	isView: boolean;
	rowData: Partial<SysFile.Entity>;
	getTableList?: () => void;
	imageUrl?: string;
}

const dialogVisible = ref(false);

const dialogProps = ref<DialogProps>({
	isView: false,
	title: "",
	rowData: {}
});

const successHandler = () => {
	dialogVisible.value = false;
	dialogProps.value.getTableList();
};

// 接收父组件传过来的参数
const acceptParams = (params: DialogProps) => {
	dialogProps.value = params;
	dialogVisible.value = true;
};

defineExpose({
	acceptParams
});
</script>

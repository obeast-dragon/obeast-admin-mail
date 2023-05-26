<template>
	<input ref="uplaodFile" hidden type="file" name="upload" id="files" style="display: none" @change="uploadInput" />
	<el-button @click="clickBtn">选择图集</el-button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ElNotification } from "element-plus";
import { File } from "buffer";
import { upload } from "@/api/modules/admin/file";

const uplaodFile = ref();

const clickBtn = () => {
	uplaodFile.value.click();
};

interface UploadFileProps {
	isFiles: boolean;
	imageUrl?: string; // 图片地址 ==> 必传
	imageUrls?: string[]; // 图片地址 ==> 必传
	api?: (params: any) => Promise<any>; // 上传图片的 api 方法，一般项目上传都是同一个 api 方法，在组件里直接引入即可 ==> 非必传
	fileSize?: number; // 图片大小限制 ==> 非必传（默认为 5M）
	fileType?: File.ImageMimeType[]; // 图片类型限制 ==> 非必传（默认为 ["image/jpeg", "image/png", "image/gif"]）
	height?: string; // 组件高度 ==> 非必传（默认为 150px）
	width?: string; // 组件宽度 ==> 非必传（默认为 150px）
	borderRadius?: string; // 组件边框圆角 ==> 非必传（默认为 8px）
}

// 接受父组件参数
const props = withDefaults(defineProps<UploadFileProps>(), {
	isFiles: false,
	imageUrl: "",
    imageUrls: () => [],
	drag: true,
	disabled: false,
	fileSize: 5,
	fileType: () => ["image/jpeg", "image/png", "image/gif"],
	height: "150px",
	width: "150px",
	borderRadius: "8px"
});

const uploadInput = async () => {
	let uploadFile = (document.getElementById("files") as any).files[0];
	console.log(uploadFile);
	if (beforeUpload(uploadFile)) {
		let formData = new FormData();
		formData.append("file", uploadFile);
		try {
			const api = props.api ?? upload;
			const { data } = await api(formData);
            props.imageUrls.push(import.meta.env.VITE_HOST + data.url);
			uploadSuccess();
		} catch (error) {
			uploadError();
		}
	}
};

/**
 * @description 图片上传成功
 * */
const uploadSuccess = () => {
	ElNotification({
		title: "温馨提示",
		message: "图片上传成功！",
		type: "success"
	});
};

/**
 * @description 图片上传错误
 * */
const uploadError = () => {
	ElNotification({
		title: "温馨提示",
		message: "图片上传失败，请您重新上传！",
		type: "error"
	});
};

/**
 * @description 文件上传之前判断
 * @param rawFile 选择的文件
 * */
const beforeUpload = (rawFile: File) => {
	const imgSize = rawFile.size / 1024 / 1024 < props.fileSize;
	const imgType = props.fileType.includes(rawFile.type as File.ImageMimeType);
	if (!imgType)
		ElNotification({
			title: "温馨提示",
			message: "上传图片不符合所需的格式！",
			type: "warning"
		});
	if (!imgSize)
		setTimeout(() => {
			ElNotification({
				title: "温馨提示",
				message: `上传图片大小不能超过 ${props.fileSize}M！`,
				type: "warning"
			});
		}, 0);
	return imgType && imgSize;
};
</script>

<style lang="scss" scoped></style>

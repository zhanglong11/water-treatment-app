import ImageSelect from 'react-native-image-picker';

const photoOptions = {
    title: '请选择',
    quality: 0.8,
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '选择相册',
    allowsEditing: false,
    noData: true,
    maxWidth: 1920,
    maxHeight: 1920,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

const  choosePicker = () => {
    ImageSelect.showImagePicker(photoOptions, (response) => {
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        } else {
            const source = {uri: response.uri, fileName: response.fileName};
            //此处上传图片
            console.log(source)
        }
    });
}

export {choosePicker}



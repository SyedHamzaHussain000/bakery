import ImagePicker from 'react-native-image-crop-picker';
export const PickImage = async () => {
  try {
    const image = await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    });
    console.log(image.mime);
    console.log(image.path);
    return image;
  } catch (error) {
    console.log('Image pick error:', error);
    return null;
  }
};

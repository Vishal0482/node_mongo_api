const { async } = require("@firebase/util");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const storage = require("../configuration/firebase.config");

// file will be stored in folder named as user id.
exports.uploadImageToFirebase = async(userId, file) => {
    try {
        const refrence = ref(storage, userId+'/profile-pic/'+file.originalname);
        const metatype = { contentType: file.mimetype, name: file.originalname };
        const data = await uploadBytes(refrence, file.buffer, metatype);
        let imageUrl;
        if(data) {
            await getDownloadURL(data.ref).then((downloadURL) => {
                imageUrl = downloadURL;
            });            
            return imageUrl;
        }
    } catch (error) {
        console.log(error);
        return 0;
    }
}
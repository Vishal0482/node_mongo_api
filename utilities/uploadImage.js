const { async } = require("@firebase/util");
const { ref, uploadBytes, getDownloadURL, StringFormat, uploadBytesResumable } = require("firebase/storage");
const storage = require("../configuration/firebase.config");

// file will be stored in folder named as user id.
exports.uploadImageToFirebase = async (userId, file) => {
    try {
        const refrence = ref(storage, userId + '/profile-pic/' + file.originalname);
        const metaData = { contentType: file.mimetype, name: file.originalname };
        const data = await uploadBytes(refrence, file.buffer, metaData);
        let imageUrl;
        if (data) {
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

// file upload progress
exports.uploadImageToFirebaseWithProgress = async (userId, file) => {
    const refrence = ref(storage, userId + '/profile-pic/' + file.originalname);
    const metaData = { contentType: file.mimetype, name: file.originalname };
    const uploadTask = uploadBytesResumable(refrence, file.buffer, metaData);

    let url;

    uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);

        switch (snapshot.state) {
            case 'paused':
                console.log("Paused");
                break;

            case 'running':
                console.log("Running");
                break

            default:
                console.log("Default");
                break;
        }

    }, (error) => {
        console.log(error);
    }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
        });
    })

}
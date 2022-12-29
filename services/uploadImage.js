const { IMAGE_TYPES } = require("../shared/constants");
const { ref, uploadBytes, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const storage = require("../configuration/firebase.config");
const { badrequest } = require("../utilities/responseManager");

// file will be stored in folder named as user id.
exports.uploadImageToFirebase = async (req, res, next) => {
    const size = 1; // size in MB
    const file = req.file;
    if (file) {
        if (IMAGE_TYPES.includes(file.mimetype)) {
            if (file.size < size * 1024 * 1024) {
                try {
                    const refrence = ref(storage, req.token.id + '/profile-pic/' + file.originalname);
                    const metaData = { contentType: file.mimetype, name: file.originalname };
                    const data = await uploadBytes(refrence, file.buffer, metaData);
                    let imageUrl;
                    if (data) {
                        await getDownloadURL(data.ref).then((downloadURL) => {
                            imageUrl = downloadURL;
                        });
                        req.imageUrl = imageUrl;
                        next();
                    }
                } catch (error) {
                    console.log(error);
                    return badrequest({ message: "Error Occured While Uploading." }, res);
                }
            } else {
                return badrequest({ message: "File size is greater than " + size }, res);
            }
        } else {
            return badrequest({ message: "Invalid File Formate." }, res);
        }
    } else {
        return badrequest({ message: "File Not Found." }, res);
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
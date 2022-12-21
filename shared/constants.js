// REGEX
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const USER_TYPES = ['Admin', 'Regular'];

const IMAGE_TYPES = ['image/webp', 'image/png', 'image/jpeg', 'image/gif', 'image/bmp', 'image/tiff'];

module.exports = { EMAIL_REGEX, USER_TYPES, IMAGE_TYPES };
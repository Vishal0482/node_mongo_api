// REGEX
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const DIGIT_ONLY_REGEX = /^[0-9]+$/;
const PICODE_REGEX = /^[1-9]{1}[0-9]{5}$/;

const USER_TYPES = ['Admin', 'Regular'];

const IMAGE_TYPES = ['image/webp', 'image/png', 'image/jpeg', 'image/gif', 'image/bmp', 'image/tiff'];

module.exports = { EMAIL_REGEX, DIGIT_ONLY_REGEX, PICODE_REGEX, USER_TYPES, IMAGE_TYPES };
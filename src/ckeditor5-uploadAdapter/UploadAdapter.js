import axios from 'axios';

class UploadAdapter {
    constructor(loader) {
        this.loader = loader
    }

    async upload() {

        return this.loader.file.then((file) => {

            const genericError = `Couldn't upload file: ${file.name}.`

            let formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', `lqnrixho`);

            return axios
                .post("https://api.cloudinary.com/v1_1/gilianimagestorage/image/upload", formData)
                .then(({ data }) => (
                    {
                        default: data.url
                    }
                ))
                .catch(({ error }) => Promise.reject(error?.message ?? genericError))
        })
    }

    abort() {
        return Promise.reject()
    }

}

export default UploadAdapter
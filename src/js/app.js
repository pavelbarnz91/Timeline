import GetPosts from "./GetPosts.js";
import validitiInputGeolocation from "./validitiInputGeolocation.js";

export default class Timeline {
    constructor() {
        this.postBox = document.querySelector('.posts-box__posts');
        this.textArea = document.querySelector('.input-box__enter-message');
        this.sendBtn = document.querySelector('.add-buttons__send');
        this.btnsBox = document.querySelector('.input-box__add-buttons');
        this.addImageBtn = document.querySelector('.add-buttons__add-file-input');
        this.addVideoBtn = document.querySelector('.video-btn');
        this.addAudioBtn = document.querySelector('.voice-btn');
        this.getPost = new GetPosts(this.postBox);

        this.geoData;
        this.recorder;
        this.stream;
        this.image = null;
        this.video = null;
        this.chunks = [];

        this.startAudio();
        this.startVideo()
        this.addImage();
        this.editPost();
        this.enterBtnSend();
        this.sendMessage();
    }

    enterBtnSend() {
        this.textArea.addEventListener('keydown', e => {
            if(e.key === 'Enter') {
                e.preventDefault();

                const clickEvent = new Event('click');
                this.sendBtn.dispatchEvent(clickEvent);
            }
        })
    }

    sendMessage() {
        const sendMessage = () => {
            const text = this.textArea.value;
            this.textArea.value = "";

            this.getGeolocation().then((geolocation) => {
                if(this.image) {
                    const imageUrl = URL.createObjectURL(this.image);
                    this.getPost.getImagePost(text, this.getDate(), geolocation, imageUrl);
                    URL.revokeObjectURL(this.image.src);
                    this.image = null;
                } else {
                    this.getPost.getTextPost(text, this.getDate(), geolocation);
                }
            }).catch(() => {
                this.notGeolocation().then(location => {
                    if(this.geoData){
                        if(this.image){
                            const imageUrl = URL.createObjectURL(this.image);
                            this.getPost.getImagePost(text, this.getDate(), this.geoData, imageUrl);
                            URL.revokeObjectURL(this.image.src);
                            this.image = null;
                        } else {
                            this.getPost.getTextPost(text, this.getDate(), this.geoData);
                        }
                        
                        this.geoData = null;
                    } else {
                        this.notGeolocation().then(location => {
                            if(this.image){
                                const imageUrl = URL.createObjectURL(this.image);
                                this.getPost.getImagePost(text, this.getDate(), this.geoData, imageUrl);
                                URL.revokeObjectURL(this.image.src);
                                this.image = null;
                            } else {
                                this.getPost.getTextPost(text, this.getDate(), this.geoData);
                            }
                            
                            this.geoData = null;
                        })
                    }
                })
            });
        }

        this.sendBtn.addEventListener('click', sendMessage)
    }

    getDate() {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

        return `${hours}:${minutes} ${day}.${month}.${year}`;
    }

    getGeolocation() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                location => {
                    const { latitude, longitude } = location.coords;
                    resolve(`[${latitude}, ${longitude}]`);
                },
                () => {
                    reject('false');
                }, 
                { enableHighAccuracy: true }
            )
        })
    }

    notGeolocation() {
        return new Promise(resolve => {
            this.getPost.getModalNotLocation();
            const modalWindow = document.querySelector('.not-location-modal-wrapper');

            modalWindow.addEventListener('click', e => {
                if(e.target.classList.contains('btns-box__ok')) {
                    const input = document.querySelector('.geolocation-input');

                    const validResult = validitiInputGeolocation(input.value)
                    if(validResult.status) {
                        this.removeTooltip();
                        modalWindow.remove();
                        this.geoData = validResult.coords;

                        resolve(validResult.coords);
                    } else {
                        const input = document.querySelector('.geolocation-input');
                        this.showTooltip('Введите корректные данные!', input);
                    }    
                }
        
                if(e.target.classList.contains('btns-box__cancel')) {
                    const input = document.querySelector('.geolocation-input');
                    const validResult = validitiInputGeolocation(input.value)
                    this.removeTooltip();
                    modalWindow.remove();
                    this.geoData = validResult.coords;
                    
                    resolve(validResult.coords);
                }
            })
        })
    }

    editPost() {
        this.postBox.addEventListener('click', e => {
            if(e.target.classList.contains('post__edit')) {
                const post = e.target.closest('.post');
                const postOkBtn = post.querySelector('.post__ok');
                const postTextBox = post.querySelector('.post-text__box');
                const postText = postTextBox.querySelector('.post-text');

                const textarea = document.createElement('textarea');
                textarea.classList.add('textarea-edit-post');
                textarea.value = postText.textContent;

                postText.classList.add('hidden');
                postTextBox.append(textarea)
                postOkBtn.classList.remove('hidden');
            };

            if(e.target.classList.contains('post__ok')) {
                const post = e.target.closest('.post');
                const postOkBtn = post.querySelector('.post__ok');
                const postText = post.querySelector('.post-text');

                const textArea = post.querySelector('textarea');
                postText.textContent = textArea.value;

                textArea.remove();

                postText.classList.remove('hidden');
                postOkBtn.classList.add('hidden');
            };

            if(e.target.classList.contains('post__delete')) {
                e.target.closest('.post').remove();
            }
        })
    }

    addImage() {
        this.addImageBtn.addEventListener('change', e => {
            this.image = e.target.files[0];
            e.target.value = '';
        })
    }

    recordVideo() {
        return new Promise(async resolve => {
            if(this.addVideoBtn.classList.contains('add-buttons__stop-video')) {
                this.textArea.value = "";
                this.addVideoBtn.classList.remove('add-buttons__stop-video');
                this.addVideoBtn.classList.add('add-buttons__add-video');

                this.recorder.stop();
                this.stream.getTracks().forEach(track => track.stop());
                this.recorder = null;
                this.stream = null;

                return;
            }

            this.stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });

            this.recorder = new MediaRecorder(this.stream);
            
            this.recorder.addEventListener('dataavailable', e => {
                this.chunks.push(e.data);
            })
            
            this.recorder.addEventListener('stop', () => {
                const blob = this.chunks[this.chunks.length - 1];
                resolve(URL.createObjectURL(blob));
            })

            this.recorder.start();

            this.addVideoBtn.classList.remove('add-buttons__add-video');
            this.addVideoBtn.classList.add('add-buttons__stop-video');
        })    
    }

    startVideo() {
        this.addVideoBtn.addEventListener('click', () => {
            const text = this.textArea.value;

            this.getGeolocation().then(location => {
                this.recordVideo().then(url => this.getPost.getVideoPost(text, this.getDate(), location, url));
            }).catch(() => {
                if(this.geoData){
                    this.recordVideo().then(url => this.getPost.getVideoPost(text, this.getDate(), this.geoData, url));
                    this.geoData = null;
                } else {
                    this.notGeolocation().then(location => {
                        this.recordVideo().then(url => this.getPost.getVideoPost(text, this.getDate(), location, url));
                    })
                }
            })
        })
    }

    recordAudio() {
        return new Promise(async resolve => {
            if(this.addAudioBtn.classList.contains('add-buttons__stop-video')) {
                this.textArea.value = "";
                this.addAudioBtn.classList.remove('add-buttons__stop-video');
                this.addAudioBtn.classList.add('add-buttons__add-voice');

                this.recorder.stop();
                this.stream.getTracks().forEach(track => track.stop());
                this.recorder = null;
                this.stream = null;

                return;
            }

            this.stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });

            this.recorder = new MediaRecorder(this.stream);
            
            this.recorder.addEventListener('dataavailable', e => {
                this.chunks.push(e.data);
            })
            
            this.recorder.addEventListener('stop', () => {
                const blob = this.chunks[this.chunks.length - 1];
                this.file = URL.createObjectURL(blob);
                console.log(this.file);
                resolve(URL.createObjectURL(blob));
            })

            this.recorder.start();

            this.addAudioBtn.classList.remove('add-buttons__add-video');
            this.addAudioBtn.classList.add('add-buttons__stop-video');
        })    
    }

    startAudio() {
        this.addAudioBtn.addEventListener('click', () => {
            const text = this.textArea.value;

            this.getGeolocation().then(location => {
                this.recordAudio().then(url => this.getPost.getAudioPost(text, this.getDate(), location, url));
            }).catch(() => {
                if(this.geoData){
                    this.recordAudio().then(url => this.getPost.getAudioPost(text, this.getDate(), this.geoData, url));
                    this.geoData = null;
                } else {
                    this.notGeolocation().then(location => {
                        this.recordAudio().then(url => this.getPost.getAudioPost(text, this.getDate(), location, url));
                    })
                }
            })
        })
    }

    showTooltip(message, el) {
        this.removeTooltip();

        const tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        tooltip.textContent = message;

        const { right, top } = el.getBoundingClientRect();

        document.body.append(tooltip);
        
        tooltip.style.left = right + 5 + 'px';
        tooltip.style.top = top + el.offsetHeight / 2 - tooltip.offsetHeight / 2 + 'px';
    }

    removeTooltip() {
        const existingTooltip = document.querySelector('.tooltip');
        if(existingTooltip) existingTooltip.remove();
    }
}

new Timeline();
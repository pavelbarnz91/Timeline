export default class GetPosts {
    constructor(area) {
        this.postBox = area;
    }

    getTextPost(text, date, geolocation) {
        const postBox = document.querySelector('.posts-box__posts');

        const postHtml = `<div class="post">
            <div class="post__edit-box">
                <div class="post__ok edit-box__item hidden"></div>
                <div class="post__edit edit-box__item"></div>
                <div class="post__delete edit-box__item"></div>
            </div>

            <div class="post-text__box">
                <span class="post-text">${text}</span>
            </div>
            
            <div class="post-information">
                <div class="post-geolocation">
                    <span class="post-geolocation__data">${geolocation}</span>
                </div>
                <div class="post-time">
                    <span class="post-geolocation__time">${date}</span>
                </div>
            </div>
        </div>`

        postBox.insertAdjacentHTML('afterbegin', postHtml);
    }

    getImagePost(text, date, geolocation, path) {
        const postBox = document.querySelector('.posts-box__posts');
        const postHtml = `
                <div class="post">
                    <div class="post__edit-box">
                        <div class="post__ok edit-box__item hidden"></div>
                        <div class="post__edit edit-box__item"></div>
                        <div class="post__delete edit-box__item"></div>
                    </div>

                    <div class="post-media-box">
                        <img class="image" src="${path}">
                    </div>

                    <div class="post-text__box">
                        <span class="post-text">${text}</span>
                    </div>
                    
                    <div class="post-information">
                        <div class="post-geolocation">
                            <span class="post-geolocation__data">${geolocation}</span>
                        </div>
                        <div class="post-time">
                            <span class="post-geolocation__time">${date}</span>
                        </div>
                    </div>
                </div>`

        postBox.insertAdjacentHTML('afterbegin', postHtml);
    }

    getVideoPost(text, date, geolocation, path) {
        const postBox = document.querySelector('.posts-box__posts');
        const postHtml = `
                <div class="post">
                    <div class="post__edit-box">
                        <div class="post__ok edit-box__item hidden"></div>
                        <div class="post__edit edit-box__item"></div>
                        <div class="post__delete edit-box__item"></div>
                    </div>

                    <div class="post-media-box">
                        <video class="video" src="${path}" controls></video>
                    </div>

                    <div class="post-text__box">
                        <span class="post-text">${text}</span>
                    </div>
                    
                    <div class="post-information">
                        <div class="post-geolocation">
                            <span class="post-geolocation__data">${geolocation}</span>
                        </div>
                        <div class="post-time">
                            <span class="post-geolocation__time">${date}</span>
                        </div>
                    </div>
                </div>`

        postBox.insertAdjacentHTML('afterbegin', postHtml);
    }

    getAudioPost(text, date, geolocation, path) {
        const postBox = document.querySelector('.posts-box__posts');
        const postHtml = `
                <div class="post">
                    <div class="post__edit-box">
                        <div class="post__ok edit-box__item hidden"></div>
                        <div class="post__edit edit-box__item"></div>
                        <div class="post__delete edit-box__item"></div>
                    </div>

                    <div class="post-media-box">
                        <audio class="video" src="${path}" controls></audio>
                    </div>

                    <div class="post-text__box">
                        <span class="post-text">${text}</span>
                    </div>
                    
                    <div class="post-information">
                        <div class="post-geolocation">
                            <span class="post-geolocation__data">${geolocation}</span>
                        </div>
                        <div class="post-time">
                            <span class="post-geolocation__time">${date}</span>
                        </div>
                    </div>
                </div>`

        postBox.insertAdjacentHTML('afterbegin', postHtml);
    }
    
    getModalNotLocation() {
        const modalWindow = `<div class="not-location-modal-wrapper">
            <div class="not-location">
                <span class="not-location__title">К сожалению, нам не удалось получить вше местоположение, пожалуйста, дайте разрешение на использование геолокации, или введите координаты в ручную.</span>

                <div class="not-location-box">
                    <div class="not-location__geolocation-box">
                        <span class="geolocation-box__text">Широта и долгота через запятую:</span>
                        <span class="geolocation-box__text">Формат ввода: [60.4012544, -26.44288]</span>
                        <input class="geolocation-input" type="text" name="geolocation-input" required>
                    </div>
                </div>

                <div class="not-location__btns-box">
                    <button class="btns-box__ok btns-box-item">Ок</button>
                    <button class="btns-box__cancel btns-box-item">Отмена</button>
                </div>
            </div>
        </div>`

        document.querySelector('.timeline').insertAdjacentHTML('beforeend', modalWindow);
    }
}
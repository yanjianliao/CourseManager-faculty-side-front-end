const MODULE_API_URL_LID = 'https://first-yanjianliao.herokuapp.com/api/course/CID/module/MID/lesson/LID/topic';
const MODULE_API_URL = 'https://first-yanjianliao.herokuapp.com/api/topic';
let _singleton = Symbol();


export default class  TopicServiceClient{

    constructor(singleToken) {
        if(_singleton !== singleToken) {
            throw new Error('Cannot instantiate directly.');
        }
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new TopicServiceClient(_singleton);
        return this[_singleton];
    }

    createTopic(lessonId, topic) {
        return fetch(MODULE_API_URL_LID.replace('LID', lessonId), {
            method: 'post',
            body: JSON.stringify(topic),
            headers: {
                'Content-Type' : 'application/json'
            }
        }).then(
            (response) => response.json()
        );
    }

    findAllTopicsForLesson(lessonId) {
        return fetch(MODULE_API_URL_LID.replace('LID', lessonId))
            .then(
                (response) => response.json()
            );
    }

    deleteTopic(id) {
        return fetch(MODULE_API_URL + '/' + id, {
            method: 'delete',
        });
    }

    findAllTopics() {
        return fetch(MODULE_API_URL)
            .then((response) => {
                return response.json();
            })
    }

    findTopicById(id) {
        return fetch(MODULE_API_URL + '/' + id)
            .then((response) => {
                return response.json();
            })
    }

    updateTopic(topic, topicId) {
        return fetch(MODULE_API_URL + '/' + topicId, {
            method : 'put',
            body: JSON.stringify(topic)
        }).then(
            (response) => response.json()
        )
    }


}
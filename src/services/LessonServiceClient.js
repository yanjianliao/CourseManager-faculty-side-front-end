
let _singleton = Symbol();
const LESSON_API_URL = 'http://localhost:8080/api/lesson';
const LESSON_API_URL_MID = 'http://localhost:8080/api/course/CID/module/MID/lesson';

export default class LessonServiceClient {

    constructor(_singleToken) {
        if(_singleton !== _singleToken) {
            throw new Error('Singleton!!!!');
        }
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new LessonServiceClient(_singleton);
        return this[_singleton];
    }

    findAllLessonsForModule(mid) {
        console.log('find');
        return fetch(LESSON_API_URL_MID.replace('MID', mid))
            .then(
                (response) => response.json()
            );
    }

    createLesson(mid, lesson) {
        return fetch(LESSON_API_URL_MID.replace('MID', mid), {
            method: 'post',
            body: JSON.stringify(lesson),
            headers: {
                'Content-Type' : 'application/json'
            }
        });
    }

    deleteLesson(id) {
        return fetch(LESSON_API_URL + '/' + id, {
            method: 'delete'
        });
    }

    findAllLessons() {
        return fetch(LESSON_API_URL)
            .then(
                (response) => response.json()
            );
    }

    findLessonById(id) {
        return fetch(LESSON_API_URL + '/' + id)
            .then(
                (response) => response.json()
            );
    }

    updateLesson(id, lesson) {
        return fetch(LESSON_API_URL + '/' + id, {
            method: 'put',
            body: JSON.stringify(lesson)
        }).then(
            (response) => response.json()
        );
    }

}

const MODULE_API_URL_CID = 'https://first-yanjianliao.herokuapp.com/api/course/CID/module';
const MODULE_API_URL = 'https://first-yanjianliao.herokuapp.com/api/module';
let _singleton = Symbol();


export default class ModuleServiceClient {

    constructor(singleToken) {
        if(_singleton !== singleToken) {
            throw new Error('Singleton!!!!')
        }

        // this.deleteAllModulesForCourse = this.deleteAllModulesForCourse.bind(this);
    }

    static get instance() {
        if(!this[_singleton]) {
            this[_singleton] = new ModuleServiceClient(_singleton);
        }
        return this[_singleton];
    }

    createModule(courseId, module) {
        return fetch(MODULE_API_URL_CID.replace('CID', courseId), {
            method: 'post',
            body: JSON.stringify(module),
            headers: {
                'Content-Type' : 'application/json'
            }
        }).then(function (response) {
            return response.json();
        });
    }

    findAllModulesForCourse(courseId) {
        return fetch(
            MODULE_API_URL_CID.replace('CID', courseId),
        ).then(function (response) {
            return response.json();
        });
    }

    // deleteAllModulesForCourse(courseId) {
    //     return this.findAllModulesForCourse(courseId)
    //         .then(
    //             (modules) => {
    //                 for(let i = 0; i < modules.length; i++) {
    //                     this.deleteModuleById(modules[i].id);
    //                 }
    //                 return new Promise((resolve) => {setTimeout(() =>{
    //                     console.log('here');
    //                     resolve(1);
    //                 }
    //                   , 300)
    //                 });
    //             }
    //         ).then((val) => {
    //             console.log(val);
    //         })
    // }



    deleteModuleById(id) {
        return fetch(
            MODULE_API_URL + '/' + id,{
                method: 'delete'
            }
        )
    }

}
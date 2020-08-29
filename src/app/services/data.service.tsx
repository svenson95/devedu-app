import {basePath} from "./http.service";

const DataService = {
    getUserProgress() {
        return fetch(basePath + "/user/progress", {
            credentials: 'include'
        }).then(async res => {
            if (res.ok) {
                const json = await res.json();
                console.log(json);
                return json;
            } else {
                throw new Error('Get user progress failed')
            }
        })
    },
    addProgressUnit(unitData: any) {
        return fetch(basePath + "/user/add-progress", {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(unitData) // body data type must match "Content-Type" header
        }).then(async res => {
            if (res.ok) {
                const json = await res.json();
                console.log(json);
                return json;
            } else {
                throw new Error('Add progress unit failed')
            }
        })
    },
    getAllLessons() {
        return fetch(basePath + "/user/all-lessons").then(async res => {
            if (res.ok) {
                const json = await res.json();
                console.log(json);
                return json;
            } else {
                throw new Error('Get max progress failed')
            }
        })
    },
    getPost(postUrl: string) {
        return fetch(
            basePath + "/posts" + postUrl
        ).then(async res => {
            if (res.ok) {
                const json = await res.json();
                console.log(json);
                return json;
            } else {
                throw new Error('Get post failed')
            }
        });
    },
    searchPost(text: string) {
        return fetch(
            basePath + "/search/" + text
        ).then(async res => {
            if (res.ok) {
                const json = await res.json();
                console.log(json);
                return json;
            } else {
                throw new Error('Get post failed')
            }
        });
    },
    editPost(url: string, post: any) {
        return fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(post) // body data type must match "Content-Type" header
        }).then(async res => {
            if (res.ok) {
                const json = await res.json();
                console.log(json);
                return json;
            } else {
                throw new Error('Edit (PATCH) subject failed')
            }
        });
    },
    createPost(subject: string, topic: string, post: any) {
        console.log('Create post: ', basePath + "/posts/" + subject + "/" + topic + "/new");
        return fetch(
            basePath + "/posts/" + subject + "/" + topic + "/new",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(post) // body data type must match "Content-Type" header
            }
        ).then(async res => {
            if (res.ok) {
                const json = await res.json();
                console.log(json);
                return json;
            } else {
                throw new Error('Create (PUT) post failed')
            }
        });
    },
    deletePost(url: string) {
        return fetch(basePath + "/posts/" + url, {
            method: 'DELETE'
        }).then(async res => {
            if (res.ok) {
                const json = await res.json();
                console.log(json);
                return json;
            } else {
                throw new Error('Remove (DELETE) post failed')
            }
        })
    },
    getSubject(subject: string) {
        return fetch(
            basePath + "/subjects" + subject
        ).then(async res => {
            if (res.ok) {
                const json = await res.json();
                console.log(json);
                return json;
            } else {
                throw new Error('Get subject failed')
            }
        });
    },
    editSubject(subject: string, editedObject: any) {
        return fetch(
            basePath + "/subjects/" + subject + "/edit",
        {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(editedObject) // body data type must match "Content-Type" header
            }
        ).then(async res => {
            if (res.ok) {
                const json = await res.json();
                console.log(json);
                return json;
            } else {
                throw new Error('Edit (PATCH) subject failed')
            }
        });
    },
    getSubjectPost(postId: string) {
        return fetch(
            basePath + "/subjects/post/" + postId
        ).then(async res => {
            if (res.ok) {
                const json = await res.json();
                console.log(json);
                return json;
            } else {
                throw new Error('Get subject-post failed')
            }
        });
    },
    getLatestPost() {
        return fetch(
            basePath + "/posts/latest-post"
        ).then(async res => {
            if (res.ok) {
                const json = await res.json();
                console.log(json);
                return json;
            } else {
                throw new Error('Get all-posts failed')
            }
        });
    },
    getQuiz(quizUrl: string) {
        return fetch(basePath + "/quiz" + quizUrl).then(async res => {
            if (res.ok) {
                const json = await res.json();
                console.log(json);
                return json;
            } else {
                throw new Error('Get quiz failed');
            }
        });
    },
    getImage(url: string) {
        return fetch(url, {
            headers: { "Content-Type" : "image/png" }
        }).then(async res => {
            if (res.ok) {
                const json = await res.json();
                console.log(json);
                return json;
            } else {
                throw new Error('Get image failed')
            }
        });
    },
    uploadImage(file: any) {
        const formData = new FormData();
        formData.append('file', file);

        return fetch(basePath + '/images/upload', {
            method: 'POST',
            body: formData
        })
    },
    deleteImage(fileId: string) {
        return fetch(basePath + "/images/" + fileId + "/delete", {
            method: 'DELETE'
        })
    },
    getSubstitutionSchedule() {
        return fetch(basePath + "/substitution-schedule").then(async res => {
            if (res.ok) {
                const json = await res.json();
                console.log(json);
                return json;
            } else {
                throw new Error('Get post failed')
            }
        });
    }
};

export default DataService;

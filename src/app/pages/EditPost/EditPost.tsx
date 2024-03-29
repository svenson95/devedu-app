import React, {useContext, useEffect, useState} from "react";
import {
    IonButton,
    IonCard,
    IonContent,
    IonIcon,
    IonLabel,
    IonList,
    IonPage,
} from "@ionic/react";
import {useHistory} from "react-router";
import './EditPost.scss';

import {ErrorContext} from "../../app-common/split-pane/Content";
import {LoadContext} from "../../../App";
import {AuthContext} from "../../context/auth.context";
import DataService from "../../services/data.service";
import {Elements} from "../../components/Elements/Elements";
import {
    newCode,
    newFile,
    newHint,
    newImage,
    newLine,
    newList,
    newSubtitle,
    newTable,
    newText,
    newTitle
} from "./PostExamples";
import {PopoverChangeImage} from "../../components/Popover-ChangeImage/Popover-ChangeImage";
import {basePath} from "../../services/http.service";
import {save, trash} from "ionicons/icons";
import AlertDeletePost from "../../components/Alert-DeletePost/Alert-DeletePost";

const EditPost = ({ ...props }) => {

    const [postDetails, setPostDetails] = useState(null as any);
    const [post, setPost] = useState([] as any);
    const [showPopover, setShowPopover] = useState(false as any);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const loadContext = useContext(LoadContext);
    const errorContext = useContext(ErrorContext);
    const authContext = useContext(AuthContext);
    const history = useHistory();
    const postUrl = (basePath + "/posts" + props.match.url).replace("/edit", "");

    useEffect(() => {
        if (authContext?.user?.role !== 'admin') {
            history.push('/dashboard');
            errorContext.setMessage('Nicht autorisiert')
        }
        return () => {
            setPost([]);
        }
    }, []);

    useEffect(() => {

        loadContext.setLoading(true);
        DataService.getPost(props.match.url.replace("/edit", ""))
            .then(data => {
                setPost(data?.elements);
                setPostDetails({
                    title: data.title,
                    description: data.description,
                    topic: data.topic,
                    subject: data.subject,
                    lessonDate: data.lessonDate,
                    url: data.url
                });
            })
            .catch(error => errorContext.setMessage(error))
            .finally(() => loadContext.setLoading(false));

        return () => {
            setPost(null);
        }

    }, [props.match.url]);

    function saveNewPost() {
        const editedPost = {
            "url": postDetails.url,
            "topic": postDetails.topic,
            "subject": postDetails.subject,
            "lessonDate": postDetails.lessonDate,
            "elements": post,
            "_id": postDetails._id
        };

        DataService.editPost(postUrl + "/edit", editedPost)
            .then(() => {
                errorContext.setMessage("Artikel gespeichert");
                history.push(props.match.url.replace("/edit", ""));
            })
            .catch(error => errorContext.setMessage("Artikel konnte nicht gespeichert werden |" + error));
    }

    function deletePost() {
        const postUrl = props.match.url.replace("/edit", "");
        const titleStartIndex = postUrl.indexOf('/', 1);
        const subjectPath = postUrl.substring(0, titleStartIndex);
        DataService.deletePost(postUrl).then(result => {

            DataService.getSubject(subjectPath).then(subjectResult => {
                subjectResult.topics.forEach((topic: any) => {
                    topic.links = topic.links.filter((link: any) => link.url !== postUrl.replace(subjectPath+"/", ""));
                });

                DataService.editSubject(subjectPath.substring(1), subjectResult)
                    .then(() => {
                        history.push(subjectPath);
                        errorContext.setMessage('Artikel gelöscht');
                    })
                    .catch(error => console.log(error));
            });
        });
    }

    return (
        <IonPage id="main">
            <PopoverChangeImage
                post={post}
                setPost={setPost}
                showPopover={showPopover}
                setShowPopover={setShowPopover}
            />
            <AlertDeletePost showDeleteAlert={showDeleteAlert} setShowDeleteAlert={setShowDeleteAlert} deletePost={deletePost}/>
            <UtilCard post={post} setPost={setPost}/>
            <IonContent className="article__content">
                <IonCard className="newPost__card">
                    <IonList className="article__list">
                        <div className="article-header">
                            <div className="article-details">
                                <h1>{postDetails?.title}</h1>
                                <h4>{postDetails?.description}</h4>
                            </div>
                            <IonButton fill="outline" mode="md" onClick={() => setShowDeleteAlert(true)}>
                                <IonIcon slot="start" icon={trash}/>
                            </IonButton>
                        </div>
                        {post && post.map((el: string | any, index: number) =>
                            <Elements
                                key={index}
                                elements={post}
                                el={el}
                                setElements={setPost}
                                setShowPopover={setShowPopover}
                                isEditable={true}
                            />
                        )}
                    </IonList>
                </IonCard>
            </IonContent>
            <IonCard className="bottom__toolbar">
                {authContext?.user?.role === "admin" ?
                    <div className="button__wrapper">
                        <IonButton className="text-button" fill="outline" onClick={saveNewPost}>
                            <p>Speichern</p>
                            <IonIcon slot="end" icon={save}/>
                        </IonButton>
                    </div>
                    :
                    <div className="button__wrapper">
                        <IonButton className="text-button" fill="outline" disabled>
                            <p>Speichern</p>
                        </IonButton>
                    </div>
                }
            </IonCard>
        </IonPage>
    )
};

const UtilCard = ({ ...props }) => {
    const post = props.post;
    const setPost = props.setPost;

    return (
        <IonCard className="utils__card">
            <div className="utils__wrapper">
                <div className="utils__title">
                    <IonLabel>Elemente</IonLabel>
                </div>
                <div className="button__wrapper">
                    <IonButton className="text-button" fill="outline" onClick={() => setPost([...post, newText])}>
                        <p>Text</p>
                    </IonButton>
                    <IonButton className="text-button" fill="outline" onClick={() => setPost([...post, newHint])}>
                        <p>Hint</p>
                    </IonButton>
                    <IonButton className="text-button" fill="outline" onClick={() => setPost([...post, newTitle])}>
                        <p>Title</p>
                    </IonButton>
                    <IonButton className="text-button" fill="outline" onClick={() => setPost([...post, newSubtitle])}>
                        <p>Subtitle</p>
                    </IonButton>
                    <IonButton className="text-button" fill="outline" onClick={() => setPost([...post, newImage])}>
                        <p>Image</p>
                    </IonButton>
                    <IonButton className="text-button" fill="outline" onClick={() => setPost([...post, newLine])}>
                        <p>Linie</p>
                    </IonButton>
                    <IonButton className="text-button" fill="outline" onClick={() => setPost([...post, newList])}>
                        <p>Liste</p>
                    </IonButton>
                    <IonButton className="text-button" fill="outline" onClick={() => setPost([...post, newTable])}>
                        <p>Tabelle</p>
                    </IonButton>
                    <IonButton className="text-button" fill="outline" onClick={() => setPost([...post, newCode])}>
                        <p>Code</p>
                    </IonButton>
                    <IonButton className="text-button" fill="outline" onClick={() => setPost([...post, newFile])}>
                        <p>File</p>
                    </IonButton>
                </div>
            </div>
        </IonCard>
    )
}

export default EditPost;

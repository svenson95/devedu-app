import React, {useContext, useEffect, useState} from "react";
import {
    IonCard,
    IonContent,
    IonList,
    IonPage,
    IonSpinner,
} from "@ionic/react";
import {useRouteMatch} from "react-router";

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import './Post.scss';
import {subjectsData} from "../../../data/subjectsData";
import {articleData} from "../../../data/posts/articleData";
import {ErrorContext, LoadContext} from "../../split-pane/Content";
import {basePath, fetchData} from "../../../helper/http.service";
import {Elements} from "../../Elements";

const Post = ({ ...props }) => {

    const [post, setPost] = useState(null as any);
    const [isDataArticle, setDataSource] = useState("local");
    const [showImage, setShowImage] = useState(false as any);

    const loadContext = useContext(LoadContext);
    const errorContext = useContext(ErrorContext);
    const { path } = useRouteMatch();

    const article2 = articleData.find(el => props.match.url.includes(el.url));
    const subject = subjectsData.find(el => path.includes(el.subject));
    const topic = subject?.topics.find(el => el.links.find(el => path.includes(el.url)));
    const articleTitle = topic?.links.find(link => path.includes(link.url))?.title;
    const articleDescription = topic?.links.find(link => path.includes(link.url))?.description;
    const testTitle = subject?.tests?.find(el => path.includes(el.url))?.title;
    const testDescription = subject?.tests?.find(el => path.includes(el.url))?.description;

    useEffect(() => {

        if (
            path.startsWith("/lf-1/") ||
            path === "/lf-2/geschaeftsprozesse_und_betriebliche_organisation/aufgaben_des_projektmanagements"
        ) {
            loadContext.setLoading(true);
            setDataSource("server");

            loadContext.setLoading(true);
            fetchData(basePath + "posts/" + path)
                .then(data => {
                    setPost(data[0]);
                })
                .catch(error => errorContext.setMessage(error))
                .finally(() => loadContext.setLoading(false));
        } else {
            setDataSource("local");
        }

        return () => {
            setPost(null);
            setDataSource("local");
        }

    }, [path]);

    return (
        <IonPage id="main">
            <IonContent>
                <div className="article__container">
                    <IonCard>
                        <div className="article__list">
                            <IonList>
                                <div className="article__header__container">
                                    <div className="article__title">
                                        <h1>{post?.title || articleTitle || testTitle}</h1>
                                        <h4>{articleDescription || testDescription}</h4>
                                    </div>
                                </div>
                                {loadContext.isLoading && !post && <div className="spinner__wrapper"><IonSpinner/></div>}
                                {isDataArticle === "local" ?
                                    article2?.elements.map((el: string | any, index: number) =>
                                        <Elements key={index} el={el} setShowImage={setShowImage}/>
                                    )
                                    :
                                    post && post?.elements.map((el: string | any, index: number) =>
                                        <Elements key={index} el={el} setShowImage={setShowImage}/>
                                    )
                                }
                            </IonList>
                        </div>
                    </IonCard>
                </div>
                {showImage && (
                    <Lightbox
                        mainSrc={showImage}
                        onCloseRequest={() => setShowImage(false)}
                    />
                )}
            </IonContent
        ></IonPage>
    )
};

export default Post;

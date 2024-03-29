import React, {useEffect, useState, useContext} from "react";
import {
    IonButton,
    IonCard,
    IonContent,
    IonIcon,
    IonItem,
    IonList,
    IonPage,
} from "@ionic/react";
import {add} from "ionicons/icons";
import './Subject.scss';

import {AuthContext} from "../../context/auth.context";
import {ErrorContext, SearchPostContext, SelectedPostContext} from "../../app-common/split-pane/Content";
import {LoadContext} from "../../../App";
import {PopoverCreatePost} from "../../components/Popover-CreatePost/Popover-CreatePost";
import {LoadingSpinner} from "../../components/Spinner";
import DataService from "../../services/data.service";
import {pages} from "../../../data/menuTitles";
import {useHistory} from "react-router";
import typeName from "../../app-common/type-name";

export const Subject = ({ ...props }) => {

    const [subject, setSubject] = useState(null as any);
    const [showPopover, setShowPopover] = useState(false);

    const loadContext = useContext(LoadContext);
    const errorContext = useContext(ErrorContext);
    const searchPostContext = useContext(SearchPostContext);
    const history = useHistory();

    useEffect(() => {
        loadContext.setLoading(true);
        DataService.getSubject(props.match.url)
            .then(data => setSubject(data))
            .catch(error => errorContext.setMessage(error))
            .finally(() => loadContext.setLoading(false));

        return () => setSubject(null);

    }, [props.match.url]);

    useEffect(() => {
        document.title = "tecbook - " + pages.find(el => el.url === props.match.url)?.shortTitle;
    }, [history.location.key]);

    return (
        <IonPage id="main">
            <PopoverCreatePost
                subject={subject}
                showPopover={showPopover}
                setShowPopover={setShowPopover}
            />
            <IonContent className={searchPostContext.isSearching_mobile ? "mobile-search-content--open" : ""}>
                <div className="subject__container">
                    {loadContext.isLoading && !subject && <LoadingSpinner/>}
                    {subject &&
                        <TopicCard
                            url={props.match.url}
                            subject={subject}
                            showPopover={showPopover}
                            setShowPopover={setShowPopover}
                        />
                    }
                    {subject?.tests &&
                        <TestCard
                            url={props.match.url}
                            subject={subject}
                            showPopover={showPopover}
                            setShowPopover={setShowPopover}
                        />
                    }
                </div>
            </IonContent>
        </IonPage>
    )
};

const TopicCard = ({ ...props }) => {
    const selectedPost = useContext(SelectedPostContext);
    const authContext = useContext(AuthContext);

    return (
        <IonCard>
            <div className="subjects__list">
                <IonList className="list">
                    <div className="header__wrapper">
                        <h1>Themen</h1>
                        {authContext?.user?.role === "admin" &&
                            <IonButton fill="outline" mode="md" onClick={() => props.setShowPopover(true)}>
                                <IonIcon slot="start" icon={add}/>
                            </IonButton>
                        }
                    </div>
                    {props.subject?.topics?.map((topic: any, index: number) =>
                        <div className="subjects__topic" key={index}>
                            <h2>{topic.title}</h2>
                            <ul>
                                {topic.links.map((post: any, index: number) =>
                                    <IonItem
                                        key={index}
                                        routerLink={props.url + "/" + post.url}
                                        routerDirection="forward"
                                        lines="none"
                                        detail={true}
                                        onClick={() => {
                                            selectedPost.setPostId(props.url + "/" + post.url);
                                        }}
                                    >
                                        <div className="element__wrapper">
                                            <div className="title">{post.title}</div>
                                            <div className="tbk-post-description">
                                                <span className="tbk-description-label">{post.description}</span>
                                                <span className={`tbk-post-type ${post.type}`}>
                                                    {typeName(post.type)}
                                                </span>
                                            </div>
                                        </div>
                                    </IonItem>
                                )}
                            </ul>
                        </div>
                    )}
                </IonList>
            </div>
        </IonCard>
    )
};

const TestCard = ({ ...props }) => (
    <IonCard>
        <div className="subjects__list">
            <IonList>
                <div>
                    <div className="header__wrapper">
                        <h1>Tests</h1>
                    </div>
                    <ul>
                        {props.subject?.tests.map((test: any, index: number) =>
                            <IonItem
                                key={index}
                                routerLink={props.url + "/" + test.url}
                                routerDirection="forward"
                                lines="none"
                                detail={true}
                            >
                                <div className="element__wrapper">
                                    <div className="title">{test.title}</div>
                                    <div className="tbk-post-description">{test.description}</div>
                                </div>
                            </IonItem>
                        )}
                    </ul>
                </div>
            </IonList>
        </div>
    </IonCard>
);

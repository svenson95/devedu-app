import React, {useContext, useEffect, useRef} from "react";
import {LoadContext} from "../../App";
import {IonCard, IonContent, IonItem, IonList, IonBadge} from "@ionic/react";
import {LoadingSpinner} from "./Spinner";
import {subjects} from "../../data/menuTitles";
import Interweave from "interweave";
import {useHistory} from "react-router";

const SearchPost = ({...props}) => {
    const loadContext = useContext(LoadContext);
    const history = useHistory();

    const previousPath = useRef(history.location.pathname);
    useEffect(() => {
        if (previousPath.current !== history.location.pathname) {
            props.setSearching(false);
            if (props.isSearching_mobile) props.setSearching_mobile(false);
        }
    }, [history.location.pathname]);

    function getFullSubjectName(subject: string) {
        return subjects.find(el => el.url === "/" + subject)?.title;
    }

    return (
        <IonContent className={props.isSearching_mobile ? "results-content mobile-search-content--open" : "results-content"}>
            <div className="results-container">
                <div className="title-container">
                    {loadContext.isLoading ?
                        <LoadingSpinner/>
                        :
                        <h1>{props.searchResults?.length > 1 || props.searchResults?.length === 0 ?
                            `${props.searchResults?.length} Ergebnisse`
                            :
                            `${props.searchResults?.length} Ergebnis`}
                        </h1>
                    }
                </div>
                <div className="search-results">
                    <IonList className="article__list">
                        {props.searchResults && props.searchResults.map((post: any, index: number) =>
                            <IonCard className="search-element" key={index}>
                                <IonItem lines="none"
                                         routerLink={"/" + post.subject + "/" + post.url}
                                         onClick={() => {
                                             props.setSearching(false);
                                             props.setSearching_mobile(false);
                                         }}>
                                    <div className="search-element-content">
                                        <div className="search-element-header">
                                            <div className="post-details">
                                                <div className="ddu-post-title">
                                                    <h1>{post.title}</h1>
                                                    <IonBadge>{getFullSubjectName(post.subject)}</IonBadge>
                                                </div>
                                                <h4>{post.description}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </IonItem>
                            </IonCard>
                        )}
                    </IonList>
                </div>
            </div>
        </IonContent>
    )
};

export default SearchPost;

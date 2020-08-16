import {Post} from "../../app/models/post";

export const lf7_posts: Post[] = [
    {
        "url": "vernetzte_systeme/einfuehrung",
        "topic": "Vernetzte Systeme",
        "elements": [
            {
                "type": "title",
                "content": "Themen"
            },
            {
                "type": "list",
                "content": "1. Teil",
                "list": [
                    "Wiederholung der Grundlagen | Gemischte Schaltunge | Spannungsteiler",
                    "Wiederholung der Bauteile im Gleichstromkreis",
                    "Grundlagen Wechselstromtechnik | Sinusgrößen",
                    "Bauteile im Wechselstromkreis"
                ]
            },
            {
                "type": "line",
                "content": "<hr/>"
            },
            {
                "type": "list",
                "content": "2. Teil",
                "list": [
                    "Grundbegriffe der ÜT",
                    "Übertragungstechnik | Pegel | Wellenwiderstand",
                    "Modulation | analog | digital"
                ]
            }
        ]
    },








    {
        "url": "/lf-7/test",
        "topic": "test",
        "elements": [
            {
                "type": "title",
                "content": "test"
            },
            {
                "type": "subtitle",
                "content": "test"
            },
            {
                "type": "text",
                "content": "test"
            },
            {
                "type": "image",
                "content": "http://159.65.105.150:3000/images/"
            },
            {
                "type": "line",
                "content": "<hr/>"
            },
            {
                "type": "code",
                "language": "javascript",
                "content": "test"
            },
            {
                "type": "list",
                "content": "test",
                "list": [
                    "test",
                    "test",
                    {
                        "content": "test",
                        "sublist": [
                            "test",
                            "test"
                        ]
                    }
                ]
            },
            {
                "type": "table",
                "content": "test",
                "rows": [
                    {
                        "type": "default",
                        "columns": [
                            { "align": "middle", "content": "test" }
                        ]
                    }
                ]
            }
        ]
    }
];
'use client'
import React, { Component } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import "react-vertical-timeline-component/style.min.css";

const Timeline = ({ Events }) => {


    return (
        <>
            <div >
                <VerticalTimeline>
                    {Events.map(event => (
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            date={event.date}
                            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                        >
                            <h3
                                className="vertical-timeline-element-title"
                                dangerouslySetInnerHTML={{ __html: event.event_name }}
                            />
                            <h4 className="vertical-timeline-element-subtitle">{event.summary}</h4>
                        </VerticalTimelineElement>
                    ))}

                </VerticalTimeline>
            </div>
        </>

    )
}

export default Timeline
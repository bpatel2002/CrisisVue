'use client'
import React, { Component } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import "react-vertical-timeline-component/style.min.css";
import Link from 'next/link';

const Timeline = ({ Events }) => {


    return (
        <>
        <div>
            <h3 style={{textAlign: 'center'}}>Timeline</h3>
            <div style={{overflowY: 'auto', height: '100%'}}>
                
                <VerticalTimeline>
                    {Events.map(event => (
                        
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            date={event.date}
                            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                        >
                           <Link href={`../../events/${event._id.$oid}`} passHref>
                            <h3 className="vertical-timeline-element-title">{event.event_name}</h3>
                            <p className="vertical-timeline-element-subtitle">{event.summary}</p>
                            </Link>
                        </VerticalTimelineElement>
                        
                    ))}

                </VerticalTimeline>
            </div>
            </div>
        </>

    )
}

export default Timeline
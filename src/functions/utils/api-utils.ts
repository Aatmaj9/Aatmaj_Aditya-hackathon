/*
 * Copyright (c) 2023 DevRev, Inc. All rights reserved.
 */

import axios, { AxiosResponse } from 'axios';
import twilio from 'twilio';

require('dotenv').config();

// Add your Twilio Account SID and Auth Token here
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN; 
const twilio_phone_no = process.env.TWILIO_PHONE_NUMBER;


const twilioClient = twilio(accountSid, authToken);


export async function postCall(
    url: string,
    payload: any,
    authorization: string
) {
    if (payload.body) payload.body = JSON.stringify(payload.body);
    const config = {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${authorization}`,
        },
    };
    try {
        const response: AxiosResponse = await axios.post(url, payload, config);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            console.error(response.data);
        }
    } catch (error) {
        console.error(error);
    }
    return;
}

export async function getCall(
    url: string,
    authorization: string
) {
    const config = {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${authorization}`,
        },
    };
    try {
        const response: AxiosResponse = await axios.get(url, config);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            console.error(response.data);
        }
    } catch (error) {
        console.error(error);
    }
    return;
}

export function generateQueryString(params: { [key: string]: any }): string {
    const queryString = Object.keys(params)
        .map(
            (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
        )
        .join('&');
    return queryString;
}

export async function sendTwilioSMS(to: string, body: string) {
    try {
        await twilioClient.messages.create({
            body,
            from: twilio_phone_no,
            to,
        });
        console.log(`SMS sent to ${to}: ${body}`);
    } catch (error) {
        console.error('Error sending SMS:', error);
    }
}


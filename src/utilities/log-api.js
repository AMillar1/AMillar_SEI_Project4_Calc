import sendRequest from './send-request';

const BASE_URL = '/api/logs';

export function saveLog(logs) {
    return sendRequest(BASE_URL, 'POST',  { items: logs });
}

export function getAll() {
    return sendRequest(BASE_URL)
}
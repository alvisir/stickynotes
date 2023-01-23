export const isJson = response => {
    return response.headers.get('content-type')?.includes('application/json');
}
